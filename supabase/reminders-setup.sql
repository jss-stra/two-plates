-- Two Plates reminders: one-time setup (water yes/no check-ins + 10pm beverage check-in).
-- Phones insert/delete their own push subscriptions; only the database itself
-- (the cron job) ever reads them, so push endpoints are never exposed via the API.

create table if not exists public.push_subscriptions (
  id text primary key,            -- household:personIdx
  household text not null,
  person int not null default 0,
  subscription jsonb not null,    -- PushSubscription JSON (endpoint + keys)
  tz text not null default 'Australia/Sydney',
  created_at timestamptz not null default now()
);
alter table public.push_subscriptions enable row level security;
create policy "household subscribe" on public.push_subscriptions
  for insert to anon with check (true);
create policy "household unsubscribe" on public.push_subscriptions
  for delete to anon using (true);
grant insert, delete on public.push_subscriptions to anon;

-- One row per subscription + reminder kind: when the last one went out.
create table if not exists public.reminder_log (
  id text not null references public.push_subscriptions(id) on delete cascade,
  kind text not null,             -- 'water' | 'evening'
  last_at timestamptz not null default now(),
  primary key (id, kind)
);
alter table public.reminder_log enable row level security; -- no anon policies: database-internal

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Every 5 minutes (cron runs in-database, no billable invocations; the edge
-- function is only called when a reminder is actually due):
--  * water: a "Did you drink water?" yes/no check-in at 9am, noon, 3pm, 6pm and
--    9pm local, once per slot per day (the date guard on the per-slot log row
--    keeps the 5-minute tick from sending twice). Nothing after 10pm.
--  * evening: at 10pm local, once per day, the beverage check-in.
create or replace function public.two_plates_reminder_check() returns void language plpgsql as $$
declare
  s record;
  lt timestamp;
  slot_h int;
  last_nudge timestamptz;
  due jsonb := '[]'::jsonb;
  pname text;
begin
  for s in select * from public.push_subscriptions loop
    lt := now() at time zone s.tz;
    select m.data #>> array['people', s.person::text, 'name'] into pname
      from public.meal_state m where m.id = s.household;

    -- Water check-ins at 9am, noon, 3pm, 6pm and 9pm local, once per slot per day.
    -- The 10-minute window covers a delayed tick; the log row's date guard dedupes.
    for slot_h in select h from (values (9),(12),(15),(18),(21)) as v(h) loop
      if extract(hour from lt) = slot_h and extract(minute from lt) < 10 then
        select r.last_at into last_nudge from public.reminder_log r where r.id = s.id and r.kind = 'water-' || slot_h;
        if last_nudge is null or (last_nudge at time zone s.tz)::date < lt::date then
          due := due || jsonb_build_object('id', s.id, 'subscription', s.subscription,
            'title', 'Two Plates — water check-in',
            'body', 'Did you drink water' || case when pname is not null then ', ' || pname else '' end || '? Tap to answer yes or no',
            'tag', 'water-' || slot_h,
            'kind', 'water-checkin',
            'slot', slot_h,
            'person', s.person,
            'actions', jsonb_build_array(
              jsonb_build_object('action', 'yes', 'title', 'Yes'),
              jsonb_build_object('action', 'no', 'title', 'No')));
          insert into public.reminder_log (id, kind, last_at) values (s.id, 'water-' || slot_h, now())
            on conflict (id, kind) do update set last_at = now();
        end if;
      end if;
    end loop;

    -- Evening beverage check-in, 10pm local, once per day.
    if extract(hour from lt) = 22 then
      select r.last_at into last_nudge from public.reminder_log r where r.id = s.id and r.kind = 'evening';
      if last_nudge is null or (last_nudge at time zone s.tz)::date < lt::date then
        due := due || jsonb_build_object('id', s.id, 'subscription', s.subscription,
          'title', 'Two Plates — evening check-in',
          'body', 'How many coffees, teas, milks and shakes have you had today?');
        insert into public.reminder_log (id, kind, last_at) values (s.id, 'evening', now())
          on conflict (id, kind) do update set last_at = now();
      end if;
    end if;
  end loop;
  if jsonb_array_length(due) > 0 then
    -- Generous timeout: the edge function answers immediately and sends in the
    -- background, but a cold start may still take seconds to accept the call.
    perform net.http_post(
      url := 'https://PROJECT_REF.supabase.co/functions/v1/water-reminders',
      headers := jsonb_build_object('Content-Type', 'application/json', 'x-water-secret', 'CRON_SECRET_PLACEHOLDER'),
      body := jsonb_build_object('due', due),
      timeout_milliseconds := 20000
    );
  end if;
end;
$$;

select cron.schedule('two-plates-reminders', '*/5 * * * *', $$select public.two_plates_reminder_check()$$);
