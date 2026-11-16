-- OPERATOR PROCEDURE: migrate the ONE existing legacy household to account
-- sync. Runs only in the Supabase SQL editor / Management API with privileged
-- access, only after the owner approves the concrete transition fresh (with
-- the Mac/receipt/device effects known). The previously verified Google
-- account is only a LEAD that identifies WHICH account to bind; it is not
-- authorization to run this. There is no client-callable equivalent: the
-- legacy channel is anonymously writable, so nothing a client presents
-- through it can prove ownership.
--
-- Parameters (fill in before running):
--   :owner_email  the approved owner Google account email (verified during
--                 the 11 Nov sign-in setup from his own iPhone)
--   :code         the legacy household code from the owner's device config

-- Step 0 - verify the owner binding independently. Must return exactly one
-- row, matching the approved account. STOP if it does not.
select id, email, created_at from auth.users where email = :owner_email;

-- Step 1 - snapshot current legacy rows (plan + receipts) for comparison and
-- rollback. Save the output before proceeding.
select id, updated_at, length(data::text) as bytes from public.meal_state
  where id = :code or id like :code || ':%' order by id;

-- Step 2 - back up every legacy row for the code (client-inaccessible table).
insert into public.legacy_state_backup (id, data)
  select id, data from public.meal_state where id = :code or id like :code || ':%'
on conflict (id) do nothing;

-- Step 3 - create the household bound to the verified owner id from step 0.
insert into public.households (legacy_code, created_by)
  values (:code, :owner_id) returning id; -- -> :hh

-- Step 4 - owner membership.
insert into public.household_members (household_id, user_id, role, added_by)
  values (:hh, :owner_id, 'owner', :owner_id);

-- Step 5 - copy the plan state into household_state.
insert into public.household_state (household_id, data, updated_by)
  select :hh, data - '_device', :owner_id from public.meal_state where id = :code;

-- Step 6 - verify the copy matches the backup before tombstoning.
select (select data from public.household_state where household_id = :hh)
     = (select data - '_device' from public.legacy_state_backup where id = :code)
     as copy_matches; -- must be true. STOP if false.

-- Step 7 - tombstone ONLY the plan row. Receipt rows stay live so the old
-- reader keeps working until the separate legacy-retirement decision.
update public.meal_state
  set data = jsonb_build_object('_migrated', true), updated_at = now()
  where id = :code;

-- Rollback (if verification fails after step 7):
--   update public.meal_state m set data = b.data, updated_at = now()
--     from public.legacy_state_backup b where m.id = :code and b.id = :code;
--   delete from public.household_state where household_id = :hh;
--   delete from public.household_members where household_id = :hh;
--   delete from public.households where id = :hh;
