// Evening goal check: infers the day's goal from journal actions, asks once,
// in the evening only, and stops after an answer or skip.
import assert from 'node:assert/strict';
import { _setStorageForTest, journalEvents } from '../js/journal.js';
import { inferGoal, todaysAnswer, answerGoal, goalCard, GOALS } from '../js/goalcheck.js';

const fake = () => ({
  d: {},
  getItem(k) { return this.d[k] ?? null; },
  setItem(k, v) { this.d[k] = String(v); },
  removeItem(k) { delete this.d[k]; },
});
const s = fake();
_setStorageForTest(s);
const now = Date.now();
const ev = (k, extra) => ({ ts: now, k, ...extra });

// Goal inference: needs a leading goal with at least two matching actions.
assert.equal(inferGoal([ev('app-open'), ev('tab', { t: 'week' })]), null, 'thin day asks nothing');
assert.equal(inferGoal([ev('act', { a: 'shuffle' })]), null, 'one action is not enough');
assert.equal(inferGoal([ev('act', { a: 'shuffle' }), ev('act', { a: 'lock' })]), 'plan-week', 'shuffle + lock = planning');
assert.equal(inferGoal([ev('act', { a: 'check' }), ev('act', { a: 'check' }), ev('act', { a: 'shuffle' })]), 'groceries', 'dominant goal wins');
assert.equal(inferGoal([ev('act', { a: 'note' }), ev('act', { a: 'rate' })]), null, 'unmapped actions give no goal');

// Recording answers through the journal.
s.d = {};
assert.equal(todaysAnswer([]), null);
answerGoal('plan-week', 'yes');
const ans = todaysAnswer(journalEvents());
assert.deepEqual(ans, { goal: 'plan-week', result: 'yes' }, 'answer recorded');

// Card gating: evening only, once answered never again.
s.d = {};
const evening = new Date(); evening.setHours(19, 0, 0, 0);
const morning = new Date(); morning.setHours(10, 0, 0, 0);
assert.equal(goalCard({}, morning), '', 'no card in the morning');
assert.equal(goalCard({}, evening), '', 'no card without a goal');
s.d['twoplates.journal.v1'] = JSON.stringify([ev('act', { a: 'shuffle' }), ev('act', { a: 'open-sheet' })]);
const card = goalCard({}, evening);
assert(card.includes('planning the week'), 'card names the inferred goal');
assert(card.includes('data-v="yes"') && card.includes('data-v="no"'), 'yes/no offered');
assert(card.includes('goal-wrong'), 'correction offered');
const shown = journalEvents().filter((e) => e.k === 'goal-check' && e.result === 'shown');
assert.equal(shown.length, 1, 'card impression recorded once');
goalCard({}, evening);
assert.equal(journalEvents().filter((e) => e.k === 'goal-check' && e.result === 'shown').length, 1, 'still once');
answerGoal('plan-week', 'skip');
assert.equal(goalCard({}, evening), '', 'skip closes it for the day');

// Correction path: picking another goal asks about that one instead.
s.d['twoplates.journal.v1'] = JSON.stringify([ev('act', { a: 'shuffle' }), ev('act', { a: 'lock' })]);
const pick = goalCard({ goalPick: true }, evening);
assert(pick.includes('What were you actually doing?'), 'correction view');
assert(GOALS.filter((g) => g.id !== 'plan-week').every((g) => pick.includes(g.label)), 'other goals offered');
const corrected = goalCard({ goalGoal: 'cooking' }, evening);
assert(corrected.includes('cooking from the plan'), 'corrected goal asked');
console.log('goalcheck tests passed');
