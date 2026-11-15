// Usage journal: records only allowlisted slug details, never free text or
// content; respects the Settings off switch; prunes by age and count.
import assert from 'node:assert/strict';
import { recordEvent, journalEvents, journalSummary, clearJournal, _setStorageForTest } from '../js/journal.js';

const fake = () => ({
  d: {},
  getItem(k) { return this.d[k] ?? null; },
  setItem(k, v) { this.d[k] = String(v); },
  removeItem(k) { delete this.d[k]; },
});
const DAY = 24 * 60 * 60 * 1000;

{
  const s = fake();
  _setStorageForTest(s);
  clearJournal();

  // Known kinds record with their allowlisted keys.
  assert.equal(recordEvent('tab', { t: 'week' }), true);
  assert.equal(recordEvent('act', { a: 'shuffle' }), true);
  assert.equal(recordEvent('gesture', { g: 'swipe-left', result: 'blocked' }), true);
  assert.equal(recordEvent('app-open'), true);
  assert.equal(journalEvents().length, 4, 'four events kept');

  // Rogue keys and unknown kinds are dropped.
  assert.equal(recordEvent('act', { a: 'cooked', id: 'my-secret-dish', note: 'typed text' }), true);
  const acts = journalEvents().filter((e) => e.k === 'act');
  assert.deepEqual(Object.keys(acts.at(-1)).sort(), ['a', 'id', 'k', 'ts'], 'only allowlisted keys survive');
  assert.ok(/^[\w-]{8,40}$/.test(acts.at(-1).id), 'id is slug-shaped for server validation');
  assert.equal(recordEvent('keystroke', { a: 'x' }), false, 'unknown kind rejected');
  assert.equal(recordEvent('act', { a: 'what I cooked for dinner' }), true);
  assert.equal(journalEvents().filter((e) => e.k === 'act').at(-1).a, undefined, 'free text value dropped, event still counts');

  // Timestamps and age pruning.
  const old = Date.now() - 15 * DAY;
  s.d['twoplates.journal.v1'] = JSON.stringify([{ ts: old, k: 'app-open' }]);
  recordEvent('app-open');
  assert.equal(journalEvents().length, 1, 'two-week-old events pruned on write');
  assert.equal(journalEvents(old).length, 1, 'since filter works on kept events');

  // Count cap keeps the newest.
  const base = Date.now() - 1000;
  s.d['twoplates.journal.v1'] = JSON.stringify(Array.from({ length: 1000 }, (_, i) => ({ ts: base + i + 1, k: 'app-open' })));
  recordEvent('app-open');
  const list = journalEvents();
  assert.equal(list.length, 1000, 'capped at 1000');
  assert.equal(list.at(-1).ts > base, true, 'newest kept');
  assert.equal(list[0].ts, base + 2, 'oldest dropped');

  // Settings off switch stops recording.
  clearJournal();
  s.d['twoplates.state.v1'] = JSON.stringify({ rules: { usageJournal: false } });
  assert.equal(recordEvent('tab', { t: 'week' }), false, 'off switch honoured');
  assert.equal(journalEvents().length, 0, 'nothing recorded while off');
  s.d['twoplates.state.v1'] = JSON.stringify({ rules: { usageJournal: true } });
  assert.equal(recordEvent('tab', { t: 'week' }), true, 'back on');
  delete s.d['twoplates.state.v1'];
  assert.equal(recordEvent('tab', { t: 'home' }), true, 'missing state defaults to on');

  // Corrupt storage recovers to empty.
  s.d['twoplates.journal.v1'] = '{broken';
  assert.deepEqual(journalEvents(), [], 'corrupt journal reads as empty');
  assert.equal(recordEvent('app-open'), true, 'and still records after');

  // Summary counts without sequences or content.
  clearJournal();
  recordEvent('tab', { t: 'week' });
  recordEvent('tab', { t: 'week' });
  recordEvent('gesture', { g: 'swipe-left', result: 'blocked' });
  const sum = journalSummary();
  assert.equal(sum['tab/week'], 2);
  assert.equal(sum['gesture/swipe-left:blocked'], 1);
}
console.log('journal tests passed');
