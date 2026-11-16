import assert from 'node:assert/strict';
import { isTombstone, stripSyncMeta, mergeDays } from '../js/household-sync-core.js';

// Tombstone: only the exact {_migrated: true} marker counts.
assert.equal(isTombstone({ _migrated: true }), true);
assert.equal(isTombstone({ _migrated: false }), false);
assert.equal(isTombstone({ _migrated: 1 }), false, 'truthy non-boolean is not a tombstone');
assert.equal(isTombstone({}), false);
assert.equal(isTombstone(null), false);
assert.equal(isTombstone(undefined), false);
assert.equal(isTombstone({ plan: { weeks: [] } }), false);

// stripSyncMeta removes device and challenge markers, keeps everything else.
assert.deepEqual(
  stripSyncMeta({ _device: 'abc', _migrate_challenge: 'xyz', plan: 1, days: { d: {} } }),
  { plan: 1, days: { d: {} } },
);
assert.deepEqual(stripSyncMeta({ plan: 1 }), { plan: 1 });
assert.deepEqual(stripSyncMeta(undefined), {});
assert.deepEqual(stripSyncMeta(null), {});

// mergeDays: per person per day, last writer wins.
const older = { '2026-11-15': { jatin: { v: 'yes', at: 100 } } };
const newer = { '2026-11-15': { jatin: { v: 'no', at: 200 } } };
assert.deepEqual(mergeDays(older, newer), newer, 'remote newer entry wins');
assert.deepEqual(mergeDays(newer, older), newer, 'local newer entry wins');

// Different people on the same day both survive.
const a = { '2026-11-15': { jatin: { v: 'yes', at: 100 } } };
const b = { '2026-11-15': { priya: { v: 'no', at: 50 } } };
assert.deepEqual(mergeDays(a, b), { '2026-11-15': { jatin: { v: 'yes', at: 100 }, priya: { v: 'no', at: 50 } } });

// Different days both survive; missing sides are fine.
const d1 = { '2026-11-14': { jatin: { v: 'yes', at: 1 } } };
const d2 = { '2026-11-15': { jatin: { v: 'no', at: 2 } } };
assert.deepEqual(mergeDays(d1, d2), { '2026-11-14': { jatin: { v: 'yes', at: 1 } }, '2026-11-15': { jatin: { v: 'no', at: 2 } } });
assert.deepEqual(mergeDays(undefined, d2), d2);
assert.deepEqual(mergeDays(d1, undefined), d1);
assert.deepEqual(mergeDays(undefined, undefined), {});

// mergeDays does not mutate its inputs.
const srcLocal = { '2026-11-15': { jatin: { v: 'yes', at: 5 } } };
const srcRemote = { '2026-11-15': { priya: { v: 'no', at: 6 } } };
mergeDays(srcLocal, srcRemote);
assert.deepEqual(srcLocal, { '2026-11-15': { jatin: { v: 'yes', at: 5 } } });
assert.deepEqual(srcRemote, { '2026-11-15': { priya: { v: 'no', at: 6 } } });

console.log('household-sync core tests passed');
