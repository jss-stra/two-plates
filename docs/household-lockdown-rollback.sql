-- Undo docs/household-lockdown.sql: back to the original open policy.
begin;
drop policy if exists "household only" on public.meal_state;
create policy "household read/write" on public.meal_state
  for all to anon using (true) with check (true);
commit;
