-- Two Plates reminders: one-time setup (water nudges + 10pm beverage check-in).
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
create policy "household resubscribe" on public.push_subscriptions
  for update to anon using (true) with check (true);
grant insert, update, delete on public.push_subscriptions to anon;

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
--  * water: in 9am-9pm local, if no water was logged in the previous 3 hours
--    and no water nudge went out in the previous 3 hours. Due moments are
--    9am/noon/3pm/6pm/9pm minus any logged water; 5-minute ticks keep each
--    nudge within 5 minutes of its due moment (checkpoint times land exactly
--    on tick marks, so a dry day fires on time).
--  * evening: at 10pm local, once per day, the beverage check-in.
create or replace function public.two_plates_reminder_check() returns void language plpgsql as $$
declare
  s record;
  lt timestamp;
  entry jsonb;
  recent_log boolean;
  last_nudge timestamptz;
  due jsonb := '[]'::jsonb;
  pname text;
begin
  for s in select * from public.push_subscriptions loop
    lt := now() at time zone s.tz;
    select m.data #> array['days', to_char(lt, 'YYYY-MM-DD'), s.person::text]
      into entry from public.meal_state m where m.id = s.household;
    select m.data #>> array['people', s.person::text, 'name'] into pname
      from public.meal_state m where m.id = s.household;

    -- Water nudges, 9am-9pm local.
    if extract(hour from lt) between 9 and 21
       and not (extract(hour from lt) = 21 and extract(minute from lt) > 0) then
      select coalesce(bool_or((extract(epoch from now()) * 1000 - t::bigint) < 3 * 3600 * 1000), false)
        into recent_log
        from jsonb_array_elements_text(coalesce(entry -> 'waterTs', '[]'::jsonb)) as t;
      if not recent_log then
        select r.last_at into last_nudge from public.reminder_log r where r.id = s.id and r.kind = 'water';
        if last_nudge is null or now() - last_nudge >= interval '3 hours' then
          due := due || jsonb_build_object('id', s.id, 'subscription', s.subscription,
            'title', 'Two Plates — water break',
            'body', 'No water logged in the last 3 hours' || case when pname is not null then ', ' || pname else '' end || ' — time for a glass');
          insert into public.reminder_log (id, kind, last_at) values (s.id, 'water', now())
            on conflict (id, kind) do update set last_at = now();
        end if;
      end if;
    end if;

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
    perform net.http_post(
      url := 'https://PROJECT_REF.supabase.co/functions/v1/water-reminders',
      headers := jsonb_build_object('Content-Type', 'application/json', 'x-water-secret', 'CRON_SECRET_PLACEHOLDER'),
      body := jsonb_build_object('due', due)
    );
  end if;
end;
$$;

select cron.schedule('two-plates-reminders', '*/5 * * * *', $$select public.two_plates_reminder_check()$$);
