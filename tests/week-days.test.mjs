import assert from 'node:assert/strict';
import { defaultState } from '../js/state.js';
import { RECIPES, kindOf } from '../js/data.js';
import { portionFor, mealFor, arrangeDays, weekendMisses, plannedOnDay, cookFrom, dayISO, isWeekendISO, slotKind, WEEK_DAYS } from '../js/planner.js';
import { scaleFactor } from '../js/grocery.js';
import { presetItems } from '../js/fixed-meals.js';
import { foodsTotal } from '../js/quick-foods.js';
import { supplementStatus, presetSupplements } from '../js/supplements.js';
import { dayIntake } from '../js/intake.js';

let n = 0;
const t = (name, fn) => { fn(); n++; };
const MONDAY = '2026-11-23';
const jatin = { name: 'J', proteinMin: 150, proteinMax: 170, kcalMin: 1750, kcalMax: 1900, portion: 1.2, fixedMeals: presetItems('jatin') };
const rules = { ...defaultState().rules };
const withProtein = (p) => RECIPES.find((r) => r.protein === p);

t('auto portion lands a dish in the middle of the per-meal goal', () => {
  // goal (150-58)/2=46 to (170-58)/2=56, middle 51
  const r = withProtein(34) || RECIPES.find((x) => x.protein > 30 && x.protein < 40);
  const want = Math.min(2.5, Math.max(0.5, Math.round((51 / r.protein) * 4) / 4));
  assert.equal(portionFor(jatin, r, rules), want);
  const m = mealFor(r, jatin, rules);
  assert.equal(m.portion, want);
  assert.equal(m.protein, Math.round(r.protein * want));
  assert.ok(m.carbs != null && m.fibre != null, 'carbs and fibre counted');
});

t('portions clamp to 0.5-2.5 and fall back to the slider when off or unknown', () => {
  const low = RECIPES.filter((r) => r.protein > 0).sort((a, b) => a.protein - b.protein)[0];
  assert.equal(portionFor(jatin, low, rules), 2.5);
  assert.equal(portionFor(jatin, low, { ...rules, autoPortion: false }), 1.2);
  assert.equal(portionFor(jatin, { protein: null }, rules), 1.2);
});

t('groceries scale each dish by both portions of it', () => {
  const s = defaultState();
  s.people[0] = { ...s.people[0], ...jatin };
  const r = RECIPES.find((x) => x.protein > 20);
  const expect = (s.rules.mealsPerDish * (portionFor(s.people[0], r, s.rules) + portionFor(s.people[1], r, s.rules))) / 4;
  assert.equal(scaleFactor(s, r), expect);
});

function week(chicken, veg) {
  const s = defaultState();
  s.plan.weekOf = MONDAY;
  const c = RECIPES.filter((r) => kindOf(r, false) === 'chicken').slice(0, chicken);
  const v = RECIPES.filter((r) => kindOf(r, false) === 'veg').slice(0, veg);
  s.plan.slots = [...c, ...v].map((r) => ({ id: r.id, locked: false }));
  return s;
}
const kindsByDay = (s, slots) => [...Array(WEEK_DAYS).keys()].map((d) => {
  const x = slots.find((y) => y.day === d);
  return x ? slotKind(x, RECIPES.find((r) => r.id === x.id), s.rules) : null;
});

t('7 dishes get 7 days, and the weekend has exactly one non-veg meal a day', () => {
  for (const [c, v] of [[4, 3], [3, 4], [5, 2], [2, 5]]) {
    const s = week(c, v);
    const out = arrangeDays(s);
    assert.deepEqual(out.map((x) => x.day), [0, 1, 2, 3, 4, 5, 6]);
    assert.equal(weekendMisses(kindsByDay(s, out), MONDAY), 0, `${c} chicken / ${v} veg`);
  }
  assert.ok(isWeekendISO(dayISO(MONDAY, 5)) && isWeekendISO(dayISO(MONDAY, 6)) && !isWeekendISO(dayISO(MONDAY, 4)));
});

t('a pinned dish keeps its day', () => {
  const s = week(4, 3);
  const veg = s.plan.slots[5];
  veg.day = 5; veg.pinned = true;
  const out = arrangeDays(s);
  assert.equal(out.find((x) => x.id === veg.id).day, 5);
  assert.equal(weekendMisses(kindsByDay(s, out), MONDAY), 0);
});

t('an all-veg week still gets days (rule simply cannot apply)', () => {
  const s = week(0, 7);
  const out = arrangeDays(s);
  assert.equal(out.length, 7);
  assert.equal(weekendMisses(kindsByDay(s, out), MONDAY), 0, 'no non-veg at all: the rule does not apply');
});

t('lunch is yesterday’s dish, dinner today’s', () => {
  const s = week(4, 3);
  s.plan.slots = arrangeDays(s);
  const tue = plannedOnDay(s, dayISO(MONDAY, 1));
  assert.equal(tue.lunch, s.plan.slots.find((x) => x.day === 0).id);
  assert.equal(tue.dinner, s.plan.slots.find((x) => x.day === 1).id);
  assert.equal(plannedOnDay(s, MONDAY).lunch, null);
});

t('cook from what we have puts paneer + spinach dishes first', () => {
  const s = defaultState();
  const top = cookFrom(s, ['paneer', 'spinach']).slice(0, 5);
  assert.ok(top.length > 0);
  assert.ok(top[0].used.includes('paneer'), 'a protein you have ranks first');
  assert.ok(top.some((x) => /palak|saag/i.test(x.r.name)), 'palak paneer is near the top');
});

t('quick foods add up by portions', () => {
  assert.deepEqual(foodsTotal([{ food: 'roti', n: 2 }, { food: 'dal', n: 1 }, { food: 'nope', n: 3 }]),
    { protein: 17, kcal: 400, carbs: 68, fibre: 11 });
});

t('day intake: fixed breakfast + planned lunch + other dinner', () => {
  const s = defaultState();
  s.people[0] = { ...s.people[0], ...jatin };
  const r = RECIPES.find((x) => x.protein > 20 && x.carbs != null);
  const e = { breakfast: 'usual', lunch: r.id, dinner: 'other', dinnerFoods: [{ food: 'grilled-chicken', n: 2 }] };
  const d = dayIntake(s, e, 0);
  const m = mealFor(r, s.people[0], s.rules);
  assert.equal(d.protein, 58 + m.protein + 62);
  assert.equal(d.logged, 3);
  assert.deepEqual(d.partial, {});
  const typed = dayIntake(defaultState(), { breakfast: 'usual' }, 1);
  assert.equal(typed.protein, 30);
  assert.ok(typed.partial.carbs && typed.partial.fibre, 'typed outside numbers have no carbs/fibre');
});

t('monthly supplements come back when due', () => {
  const s = defaultState();
  const vitd = presetSupplements('divya').find((x) => x.id === 'vitd');
  s.days = { '2026-11-12': { 1: { supps: { vitd: true } } } };
  const st = supplementStatus(s, 1, vitd, '2026-11-22');
  assert.equal(st.due, false);
  assert.equal(st.nextIn, 18);
  assert.equal(supplementStatus(s, 1, vitd, '2026-12-10').due, true);
  const omega = presetSupplements('divya')[0];
  assert.equal(supplementStatus(s, 1, omega, '2026-11-22').due, true);
});

console.log(`week-days: ${n} passed`);
