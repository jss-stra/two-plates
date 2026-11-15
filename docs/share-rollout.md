# Share-readiness rollout runbook

Order matters. Nothing below touches production before its gate says so.

## Gate 1: schema (needs the Supabase Management API token)
1. Apply `docs/auth-stage6.sql` (new objects only; nothing existing is modified).
2. Run the synthetic-identity checks listed at the bottom of that file:
   two test users, two households; verify cross-household read/write fails,
   anon has no access, locked-down tables refuse clients, migration functions
   reject strangers and guessed challenges.
3. Capacity check (database size vs plan limits) before calling anything free.

## Gate 2: app deploy (needs Gate 1 green)
4. Deploy the `household-sync` branch as the next version and verify the
   signed-out app is unchanged.
5. Synthetic end-to-end: test user A starts a household, invites test user B
   by email, B signs in and accepts, plan edits sync both ways, B cannot see
   A's cookbook and no one outside the household can read the plan.

## Gate 3: his household migration (his action, after Gate 2)
6. He signs in on his phone and taps "Move sync to my account".
7. Verify: household_state has the plan, the legacy plan row is tombstoned,
   backup rows exist in legacy_state_backup, receipts still read on every
   device that used them.
8. He invites family by email; they sign in and accept; their devices adopt
   the household plan (their unsaved food-log entries merge in).
9. Rollback if anything is wrong: restore from legacy_state_backup via the
   service role, delete the created household, redeploy previous version.

## Gate 4: legacy retirement (separate owner decision, prepared after Gate 3)
10. Present the concrete decision: what still uses the legacy channel
    (receipt rows, the Mac reader), what closing it changes, and the exact
    steps. Retirement = tighten/replace the permissive legacy policies.
    Only after his yes.

## Sign-in availability check (before telling him it is share-ready)
11. Confirm the Google consent screen state (console, read-only) or run the
    empirical check: a non-allowlisted Google account signs in. If blocked,
    publish the consent screen (his console action; privacy.html and
    terms.html are ready to link, pending his wording review).
