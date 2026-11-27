import assert from 'node:assert/strict';
import { defaultState } from '../js/state.js';
import { RECIPES } from '../js/data.js';
import { applyQuickMeal, plannedValue, nextMealToLog, renderToday } from '../js/log.js';

let n = 0;
const t = (name, fn) => { fn(); n++; };
const MON = '2026-11-23';
const [a, b, c] = RECIPES;
const mk = () => {
  const s = defaultState();
  s.people = [{ ...s.people[0], name: 'Jatin' }, { ...s.people[1], name: 'Divya' }];
  s.days = {};
  s.plan.weekOf = MON;
  s.plan.slots = [{ id: a.id, day: 0 }, { id: b.id, day: 1 }, { id: c.id, day: 2 }];
  return s;
};

t('breakfast means "as usual"; lunch/dinner mean the dish planned that day', () => {
  assert.equal(plannedValue('breakfast', { lunch: a.id }), 'usual');
  assert.equal(plannedValue('dinner', { dinner: b.id }), b.id);
  assert.equal(plannedValue('dinner', { dinner: null }), null);
});

t('one tap logs the meal for both people', () => {
  const s = mk();
  assert.equal(applyQuickMeal(s, MON, 'dinner', a.id, 111), 2);
  assert.equal(s.days[MON][0].dinner, a.id);
  assert.equal(s.days[MON][1].dinner, a.id);
  assert.equal(s.days[MON][0].at, 111);
});

t('tapping the same answer again clears it for both', () => {
  const s = mk();
  applyQuickMeal(s, MON, 'lunch', 'skipped');
  applyQuickMeal(s, MON, 'lunch', 'skipped');
  assert.equal(s.days[MON][0].lunch, null);
  assert.equal(s.days[MON][1].lunch, null);
});

t('a locked day is never changed; the other person still is', () => {
  const s = mk();
  s.days[MON] = { 0: { done: 5, dinner: 'skipped' } };
  assert.equal(applyQuickMeal(s, MON, 'dinner', a.id), 1);
  assert.equal(s.days[MON][0].dinner, 'skipped');
  assert.equal(s.days[MON][1].dinner, a.id);
  s.days[MON][1].done = 6;
  assert.equal(applyQuickMeal(s, MON, 'dinner', b.id), 0);
});

t('a different answer replaces rather than clears', () => {
  const s = mk();
  applyQuickMeal(s, MON, 'dinner', a.id);
  applyQuickMeal(s, MON, 'dinner', 'other');
  assert.equal(s.days[MON][0].dinner, 'other');
});

t('Home shortcut offers the right meal for the time of day and goes away once logged', () => {
  const s = mk();
  const at = (h) => new Date(2026, 10, 24, h, 0); // Tue 24 Nov: lunch = Mon's dish, dinner = Tue's
  assert.equal(nextMealToLog(s, at(8)).meal, 'breakfast');
  const lunch = nextMealToLog(s, at(13));
  assert.equal(lunch.meal, 'lunch');
  assert.equal(lunch.value, a.id);
  assert.equal(nextMealToLog(s, at(19)).value, b.id);
  applyQuickMeal(s, '2026-11-24', 'dinner', b.id);
  assert.equal(nextMealToLog(s, at(19)), null);
});

t('no shortcut when nothing is planned for the meal', () => {
  const s = mk();
  assert.equal(nextMealToLog(s, new Date(2026, 11, 20, 19, 0)), null); // far outside the plan
});

t('Today shows the quick log first, with one dinner button and no 14-dish wall', () => {
  const s = mk();
  const ui = { logDate: '2026-11-24', logPerson: 0, logView: 'day', logDetails: false };
  const html = renderToday(s, ui, () => '');
  assert.ok(html.indexOf('quick-log') < html.indexOf('Water'), 'quick log comes before water');
  assert.ok(html.includes('We both had it'));
  assert.ok(!html.includes('Eaten so far'), 'stats are tucked into details');
  assert.ok(!html.includes('data-act="log-set"'), 'per-dish chips only appear in details');
  const open = renderToday(s, { ...ui, logDetails: true }, () => '');
  assert.ok(open.includes('A different dish from this week'));
});

console.log(`quick-log: ${n} passed`);
