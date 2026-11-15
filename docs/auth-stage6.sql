-- Two Plates auth + privacy schema, STAGE 6 (household plan sync)
-- New objects only. meal_state and every existing table are untouched.
-- Apply in the Supabase SQL editor or via the Management API, then run the
-- synthetic-identity checks at the bottom before enabling the app flow.
--
-- NOTE: there is deliberately NO client-callable migration/claim function.
-- The legacy meal_state table is anonymously readable AND writable, so any
-- proof a client could present through it (including a challenge written into
-- the shared row) is forgeable by anyone holding the public key. Migrating an
-- existing household is a privileged operator procedure bound to an
-- independently verified owner account - see docs/operator-migration.sql -
-- and runs only after explicit owner approval. New households never need it:
-- they start clean and authenticated.

-- ============ household plan state ============
-- One row per household: the whole meal-plan state blob, readable and writable
-- by members of that household only. This is the replacement for the shared-key
-- meal_state plan row.
create table if not exists public.household_state (
  household_id uuid primary key references public.households(id) on delete cascade,
  data jsonb not null,
  updated_by uuid references auth.users(id),
  updated_at timestamptz default now()
);

alter table public.household_state enable row level security;

create policy hs_member_reads on public.household_state
  for select to authenticated using (public.is_household_member(household_id));
create policy hs_member_inserts on public.household_state
  for insert to authenticated with check (public.is_household_member(household_id));
create policy hs_member_updates on public.household_state
  for update to authenticated using (public.is_household_member(household_id))
  with check (public.is_household_member(household_id));
-- No delete policy: state survives membership changes; removing a household
-- cascades. Anon gets nothing: no policies mention anon.

-- Live updates between household members' devices.
alter publication supabase_realtime add table public.household_state;

-- Backups of migrated legacy rows (written only by the privileged operator
-- procedure). RLS enabled with NO policies: no client (anon or authenticated)
-- can read or write this table.
create table if not exists public.legacy_state_backup (
  id text primary key,
  data jsonb not null,
  backed_up_at timestamptz default now()
);
alter table public.legacy_state_backup enable row level security;

-- ============ synthetic-identity checks (run after applying) ============
-- With two test users A (household H1) and B (household H2):
--   as A: select from household_state -> only H1's row.
--   as A: update/insert H2's row -> 0 rows / policy violation.
--   as A: delete H1's row -> 0 rows (no delete policy).
--   as anon: select from household_state -> 0 rows / permission denied.
--   as A and as B: select from legacy_state_backup -> permission denied.
--   realtime: A subscribed to H1 receives changes; B subscribed to H2 does
--   not receive H1 changes.
