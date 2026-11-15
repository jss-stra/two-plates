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

-- The app may only ever write this exact event vocabulary. Every field is
-- constrained to an enumerated set of known UI names: a new kind, detail
-- key, action, tab, gesture, goal or outcome is rejected outright. Adding
-- to these lists is a deliberate migration (a review gate), never something
-- an app release can do silently. The same trigger enforces a continuous
-- volume bound, so the table stays capped even between nightly cleanups.
create or replace function public.usage_events_validate() returns trigger
language plpgsql as $$
declare
  allowed_acts constant text[] := array[
    'add','backup','bought-week','carry','cb-add','cb-close','cb-publish',
    'cb-remove','cb-save','cb-share','cdiet','check','checkin-close',
    'checkin-open','choose','choose-custom','choose-imported','close-sheet',
    'cooked','copy','count','custom-back','custom-new','custom-save',
    'del-extra','disconnect','expand','export','feed-delete','feed-hide',
    'feed-report','finalize','finish-week','fr-accept','fr-decline','fr-end',
    'fr-request','gen-code','google-signin','group','gsection','gview',
    'hh-accept','hh-create','hh-invite','hh-leave','hh-remove','hide','lock',
    'log-day','log-goto','log-month','log-person','log-view','note',
    'note-clear','note-save','note-slot','open-idea','open-imported',
    'open-sheet','pantry','pantry-toggle','pick-back','pick-replace',
    'push-disable','push-enable','rate','receipt-remove','receipt-reread',
    'recipes-more','remove-slot','reset','restore','rtoggle','search-week',
    'set','share','share-menu','sheet-filter','shuffle','signout',
    'swap-random','toggle-amounts','toggle-log','uncheck-all','unfinalize',
    'xadd','xdel'
  ];
  allowed_tabs constant text[] := array[
    'feed','home','week','prep','recipes','groceries','bought','settings'
  ];
  allowed_gestures constant text[] := array['long-press','swipe-left','swipe-right'];
  allowed_gesture_results constant text[] := array['blocked','toggled','revealed','cancelled'];
  allowed_goals constant text[] := array['plan-week','groceries','cooking','prep'];
  allowed_goal_results constant text[] := array['shown','yes','no','skip'];
begin
  if new.kind = 'app-open' then
    if new.detail <> '{}'::jsonb then
      raise exception 'usage_events: app-open takes no detail';
    end if;
  elsif new.kind = 'tab' then
    if not (new.detail ? 't') or new.detail - 't' <> '{}'::jsonb
       or jsonb_typeof(new.detail->'t') <> 'string'
       or not new.detail->>'t' = any(allowed_tabs) then
      raise exception 'usage_events: unknown tab %', new.detail;
    end if;
  elsif new.kind = 'act' then
    if not (new.detail ? 'a') or new.detail - 'a' <> '{}'::jsonb
       or jsonb_typeof(new.detail->'a') <> 'string'
       or not new.detail->>'a' = any(allowed_acts) then
      raise exception 'usage_events: unknown act %', new.detail;
    end if;
  elsif new.kind = 'gesture' then
    if not (new.detail ? 'g' and new.detail ? 'result')
       or new.detail - 'g' - 'result' <> '{}'::jsonb
       or jsonb_typeof(new.detail->'g') <> 'string'
       or jsonb_typeof(new.detail->'result') <> 'string'
       or not new.detail->>'g' = any(allowed_gestures)
       or not new.detail->>'result' = any(allowed_gesture_results) then
      raise exception 'usage_events: unknown gesture %', new.detail;
    end if;
  elsif new.kind = 'goal-check' then
    if not (new.detail ? 'g' and new.detail ? 'result')
       or new.detail - 'g' - 'result' <> '{}'::jsonb
       or jsonb_typeof(new.detail->'g') <> 'string'
       or jsonb_typeof(new.detail->'result') <> 'string'
       or not new.detail->>'g' = any(allowed_goals)
       or not new.detail->>'result' = any(allowed_goal_results) then
      raise exception 'usage_events: unknown goal-check %', new.detail;
    end if;
  else
    raise exception 'usage_events: unknown kind %', new.kind;
  end if;
  -- Continuous bounds: reject beyond 500 events/day or 5,000 rows/30 days
  -- per owner, whatever the nightly cleanup has or has not done yet.
  if (select count(*) from public.usage_events
      where user_id = new.user_id and ts > now() - interval '1 day') >= 500 then
    raise exception 'usage_events: daily volume cap reached';
  end if;
  if (select count(*) from public.usage_events
      where user_id = new.user_id and ts > now() - interval '30 days') >= 5000 then
    raise exception 'usage_events: monthly volume cap reached';
  end if;
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

-- Age-based cleanup runs nightly in-database (pg_cron is already enabled
-- for reminders); the job role owns the table, so RLS does not block it.
-- The hard volume bounds live in the validation trigger above, so the table
-- never exceeds 500 rows/day or 5,000 rows/30 days per owner, even between
-- cleanups.
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
