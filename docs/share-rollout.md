# Share-readiness rollout runbook

Order matters. Nothing below touches production before its gate says so.

## Gate 1: schema (needs the Supabase Management API token)
1. Apply `docs/auth-stage6.sql` (new objects only; nothing existing is modified).
2. Run the synthetic-identity checks listed at the bottom of that file:
   two test users, two households; verify cross-household read/write fails,
   anon has no access, locked-down tables refuse clients, migration functions
   reject strangers and guessed challenges.
3. Capacity check (database size vs plan limits) before calling anything free.

## Gate 1.5: sign-in + security proof (needs Gate 1 green; BEFORE any deploy)
4. Verify the Google consent screen config (console, read-only). If sign-in
   is limited to test users, publish it first (his console action).
5. Run scripts/test-household-rls.mjs: synthetic two-household adversarial
   tests (cross-household read/write/insert denied, anon denied, no client
   delete, backup table locked). All must pass.

## Gate 2: app deploy (needs Gate 1.5 green)
6. Deploy the `household-sync` branch as the next version and verify the
   signed-out app is unchanged.
7. Synthetic end-to-end: test user A starts a household, invites test user B
   by email, B signs in and accepts, plan edits sync both ways, B cannot see
   A's cookbook and no one outside the household can read the plan.

## Gate 3: his household migration (operator procedure, after Gate 2 + his yes)
There is no self-service migration in the app: the legacy channel is
anonymously writable, so nothing a client presents through it can prove
ownership. Migration runs as the privileged procedure in
docs/operator-migration.sql, bound to his independently verified Google
account, only after he approves the concrete transition.
6. Run docs/operator-migration.sql with privileged access: verify the owner
   account, snapshot, back up, create the household bound to his user id,
   copy the plan, verify the copy matches the backup, tombstone the plan row.
7. Verify: household_state has the plan, the legacy plan row is tombstoned,
   backup rows exist in legacy_state_backup, receipts still read on every
   device that used them, his phone picks up household sync on next sign-in.
8. He invites family by email; they sign in and accept; their devices adopt
   the household plan (their unsaved food-log entries merge in).
9. Rollback if anything is wrong: the rollback block in
   docs/operator-migration.sql restores the row and removes the household.

## Gate 4: legacy retirement (separate owner decision, prepared after Gate 3)
10. Present the concrete decision: what still uses the legacy channel
    (receipt rows, the Mac reader), what closing it changes, and the exact
    steps. Retirement = tighten/replace the permissive legacy policies.
    Only after his yes.

## Privacy/terms (release gate)
11. privacy.html / terms.html: DRAFTS UNDER REVIEW, not in the repo, not
    linked anywhere. Publish only after his wording review and only when
    every assertion matches live behavior (household isolation live, legacy
    exposure closed, deletion path decided, contact route approved).
