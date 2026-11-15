-- Two Plates usage journal storage (approved by Jatin, 2026-11-15): one row
-- per in-app event, each visible only to its owner. Run once. New objects
-- only - meal_state, reminders and the auth-stage tables are untouched.

create table if not exists public.usage_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) default auth.uid(),
  ts timestamptz not null,        -- when the event happened on the phone
  kind text not null,             -- app-open | tab | act | gesture | goal-check
  detail jsonb not null default '{}'::jsonb,  -- allowlisted slugs only, never content
  created_at timestamptz not null default now()
);
alter table public.usage_events enable row level security;
create policy usage_events_insert_own on public.usage_events
  for insert to authenticated with check (user_id = auth.uid());
create policy usage_events_read_own on public.usage_events
  for select to authenticated using (user_id = auth.uid());
-- No update or delete policies: events are append-only from the app.
revoke all on public.usage_events from anon;
grant insert, select on public.usage_events to authenticated;
grant usage on sequence public.usage_events_id_seq to authenticated;
create index if not exists usage_events_user_ts on public.usage_events (user_id, ts);
