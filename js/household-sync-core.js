// Pure helpers shared by the legacy sync and the account-based household sync.
// No imports: safe to unit-test in Node and to use from either sync layer.

// The legacy plan row is replaced with this marker when a household moves to
// account sync. Legacy clients must stop pushing the plan once they see it.
export const isTombstone = (data) => data?._migrated === true;

// Strip per-device and migration metadata from a state blob before adopting it.
export const stripSyncMeta = (data) => {
  const { _device, _migrate_challenge, ...rest } = data || {};
  return rest;
};

// Food-log entries are per person per day; keep whichever side edited each one
// last, so two people logging the same evening don't overwrite each other.
export function mergeDays(local = {}, remote = {}) {
  const out = structuredClone(remote || {});
  for (const [day, people] of Object.entries(local || {})) {
    out[day] ||= {};
    for (const [p, e] of Object.entries(people)) {
      if (!out[day][p] || (e.at || 0) > (out[day][p].at || 0)) out[day][p] = e;
    }
  }
  return out;
}
