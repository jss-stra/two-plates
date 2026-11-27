-- Two Plates: make each household's shared plan private.
--
-- Before this, the public key could list and read every household's rows
-- (names, body stats, receipt photos) and overwrite them. After this, a
-- request only sees rows whose id starts with the household code it sends in
-- the x-household header, and the table can no longer be listed.
--
-- Run ONLY after both phones have opened the app version that sends the
-- header (v112 or later); until they have, they will stop syncing.
-- Undo any time with docs/household-lockdown-rollback.sql.

begin;

create or replace function public.request_household() returns text
language sql stable as $$
  select nullif(current_setting('request.headers', true)::json ->> 'x-household', '')
$$;

drop policy if exists "household read/write" on public.meal_state;
drop policy if exists "household only" on public.meal_state;

-- Row ids are "<household>" or "<household>:<something>" (receipts, learned, photos).
create policy "household only" on public.meal_state
  for all to anon
  using (split_part(id, ':', 1) = public.request_household())
  with check (split_part(id, ':', 1) = public.request_household());

commit;
