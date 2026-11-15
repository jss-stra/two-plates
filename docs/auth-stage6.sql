-- Two Plates auth + privacy schema, STAGE 6 (household plan sync + legacy migration)
-- New objects only. meal_state and every existing table are untouched.
-- Apply in the Supabase SQL editor or via the Management API, then run the
-- synthetic-identity checks at the bottom before enabling the app flow.

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

-- ============ legacy migration ============
-- Backups of migrated legacy rows. RLS enabled with NO policies: no client
-- (anon or authenticated) can read or write this table. Only the
-- security-definer migration function and the service role touch it.
create table if not exists public.legacy_state_backup (
  id text primary key,
  data jsonb not null,
  backed_up_at timestamptz default now()
);
alter table public.legacy_state_backup enable row level security;

-- Pending migration challenges. Same lock-down: clients never touch it.
create table if not exists public.legacy_claims (
  code text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  challenge text not null,
  created_at timestamptz default now(),
  primary key (code, user_id)
);
alter table public.legacy_claims enable row level security;

-- Step 1: the signed-in owner-to-be asks for a one-time challenge. Knowing the
-- household code alone grants nothing: the challenge is issued to THIS user,
-- and only they can complete with it. Every failure says the same thing, so
-- the function never reveals whether a code exists or was already migrated.
create or replace function public.begin_legacy_claim(code text)
returns text language plpgsql security definer set search_path = public as
$$
declare
  uid uuid := auth.uid();
  ch text;
begin
  if uid is null then raise exception 'sign in first'; end if;
  if exists (select 1 from household_members where user_id = uid) then
    raise exception 'migration not available';
  end if;
  if exists (select 1 from households where legacy_code = code) then
    raise exception 'migration not available';
  end if;
  ch := md5(random()::text || clock_timestamp()::text || uid::text);
  insert into legacy_claims (code, user_id, challenge) values (code, uid, ch)
  on conflict (code, user_id) do update set challenge = excluded.challenge, created_at = now();
  return ch;
end $$;

-- Step 2: the device proves it currently holds the legacy sync by writing the
-- challenge into the shared row, then completes. The function verifies the
-- challenge is the one it issued to this caller, copies the plan state into
-- household_state, backs up every legacy row for the code (plan + receipts),
-- and tombstones ONLY the plan row so receipt rows keep working for the old
-- reader until the legacy channel is retired (a separate decision).
create or replace function public.complete_legacy_claim(code text)
returns uuid language plpgsql security definer set search_path = public as
$$
declare
  uid uuid := auth.uid();
  cl public.legacy_claims%rowtype;
  row_data jsonb;
  hh uuid;
begin
  if uid is null then raise exception 'sign in first'; end if;
  select * into cl from public.legacy_claims
    where legacy_claims.code = code and user_id = uid
      and created_at > now() - interval '10 minutes';
  if not found then raise exception 'migration not available'; end if;
  select data into row_data from public.meal_state where id = code;
  if not found or row_data is null
     or row_data->>'_migrate_challenge' is distinct from cl.challenge then
    raise exception 'migration not available';
  end if;
  if exists (select 1 from public.households where legacy_code = code) then
    raise exception 'migration not available';
  end if;
  insert into public.households (legacy_code, created_by) values (code, uid) returning id into hh;
  insert into public.household_members (household_id, user_id, role, added_by)
    values (hh, uid, 'owner', uid);
  insert into public.legacy_state_backup (id, data)
    select id, data from public.meal_state where id = code or id like code || ':%'
  on conflict (id) do nothing;
  insert into public.household_state (household_id, data, updated_by)
    values (hh, (row_data - '_device' - '_migrate_challenge'), uid);
  update public.meal_state
    set data = jsonb_build_object('_migrated', true), updated_at = now()
    where id = code;
  delete from public.legacy_claims where legacy_claims.code = code;
  return hh;
end $$;

revoke all on function public.begin_legacy_claim(text) from public, anon;
revoke all on function public.complete_legacy_claim(text) from public, anon;
grant execute on function public.begin_legacy_claim(text) to authenticated;
grant execute on function public.complete_legacy_claim(text) to authenticated;

-- ============ synthetic-identity checks (run after applying) ============
-- With two test users A (household H1) and B (household H2):
--   as A: select from household_state -> only H1's row.
--   as A: update H2's row -> 0 rows / policy violation.
--   as anon: select from household_state -> permission denied / 0 rows.
--   as B: rpc begin_legacy_claim(<H1's code>) after migration -> 'migration not available'.
--   as B: rpc complete_legacy_claim with a guessed challenge -> 'migration not available'.
--   as B: select from legacy_state_backup / legacy_claims -> permission denied.
-- Rollback for a migration mistake: restore the row from legacy_state_backup
-- via the service role, then delete the created household.
