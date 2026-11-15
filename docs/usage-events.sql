-- Two Plates usage journal storage. One row per in-app event, each visible
-- only to its owner. Run once. New objects only - meal_state, reminders and
-- the auth-stage tables are untouched.
--
-- user_id deliberately has NO foreign key to auth.users: ownership is
-- enforced by row-level security and the auth.uid() default, and dropping the
-- FK lets the policies be verified with synthetic identities (which cannot
-- exist in auth.users) before any real data arrives.

create table if not exists public.usage_events (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  client_id text not null,        -- stable per-event id from the phone; retries dedupe on it
  ts timestamptz not null,        -- when the event happened on the phone
  kind text not null,             -- app-open | tab | act | gesture | goal-check
  detail jsonb not null default '{}'::jsonb,  -- allowlisted slugs only, enforced below
  created_at timestamptz not null default now(),
  constraint usage_events_client_id_shape check (client_id ~ '^[\w-]{8,40}$')
);
create unique index if not exists usage_events_user_client on public.usage_events (user_id, client_id);
create index if not exists usage_events_user_ts on public.usage_events (user_id, ts);

-- The app may only ever write the fixed event vocabulary. Anything else -
-- a new kind, an unexpected detail key, free text - is rejected outright,
-- so a future app change cannot widen what is collected by accident.
create or replace function public.usage_events_validate() returns trigger
language plpgsql as $$
declare
  k text;
  v jsonb;
  allowed text[];
begin
  if new.kind not in ('app-open', 'tab', 'act', 'gesture', 'goal-check') then
    raise exception 'usage_events: unknown kind %', new.kind;
  end if;
  allowed := case new.kind
    when 'app-open' then array[]::text[]
    when 'tab' then array['t']
    when 'act' then array['a']
    when 'gesture' then array['g', 'result']
    when 'goal-check' then array['g', 'result']
  end;
  for k in select jsonb_object_keys(new.detail) loop
    if not k = any(allowed) then
      raise exception 'usage_events: detail key % not allowed for kind %', k, new.kind;
    end if;
  end loop;
  for k, v in select * from jsonb_each(new.detail) loop
    if jsonb_typeof(v) not in ('string', 'number', 'boolean') then
      raise exception 'usage_events: detail % must be a scalar', k;
    end if;
    if jsonb_typeof(v) = 'string' and v #>> '{}' !~ '^[\w-]{1,40}$' then
      raise exception 'usage_events: detail % must be a slug, not text', k;
    end if;
  end loop;
  return new;
end $$;
drop trigger if exists usage_events_validate on public.usage_events;
create trigger usage_events_validate before insert on public.usage_events
  for each row execute function public.usage_events_validate();

alter table public.usage_events enable row level security;
drop policy if exists usage_events_insert_own on public.usage_events;
create policy usage_events_insert_own on public.usage_events
  for insert to authenticated with check (user_id = auth.uid());
drop policy if exists usage_events_read_own on public.usage_events;
create policy usage_events_read_own on public.usage_events
  for select to authenticated using (user_id = auth.uid());
-- No update or delete policies: events are append-only from the app.
revoke all on public.usage_events from anon;
grant insert, select on public.usage_events to authenticated;
grant usage on sequence public.usage_events_id_seq to authenticated;

-- Cloud-side bounds, not just the phone's: keep 30 days and at most 5,000
-- rows per owner. Runs nightly in-database (pg_cron is already enabled for
-- reminders); the job role owns the table, so RLS does not block it.
create extension if not exists pg_cron;
select cron.unschedule('usage-events-cleanup') where exists
  (select 1 from cron.job where jobname = 'usage-events-cleanup');
select cron.schedule('usage-events-cleanup', '17 3 * * *', $job$
  delete from public.usage_events where ts < now() - interval '30 days';
  delete from public.usage_events a using (
    select id, row_number() over (partition by user_id order by ts desc) as rn
    from public.usage_events
  ) b where a.id = b.id and b.rn > 5000;
$job$);
