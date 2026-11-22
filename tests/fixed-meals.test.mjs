import assert from 'node:assert/strict';
import { FIXED_MEAL_PRESETS, fixedMealsOf, fixedTotals, outsideOf, presetItems, syncFixedTotals, blankFixedMeal } from '../js/fixed-meals.js';
import { perMealGoal } from '../js/planner.js';

let n = 0;
const t = (name, fn) => { fn(); n++; };
const rules = { mealsPerDish: 2 };

t('no list keeps typed outside numbers', () => {
  const p = { proteinMin: 100, proteinMax: 130, outsideProtein: 40, outsideKcal: 500 };
  assert.deepEqual(fixedMealsOf(p), []);
  assert.deepEqual(outsideOf(p), { protein: 40, kcal: 500 });
  assert.deepEqual(perMealGoal(p, rules), { min: 30, max: 45 });
});

t('presets add up to the agreed daily numbers', () => {
  assert.deepEqual(fixedTotals({ fixedMeals: presetItems('jatin') }), { protein: 58, kcal: 650 });
  assert.deepEqual(fixedTotals({ fixedMeals: presetItems('divya') }), { protein: 37, kcal: 675 });
});

t('presetItems returns a copy, never the shared preset', () => {
  const a = presetItems('divya');
  a[0].protein = 999;
  assert.equal(FIXED_MEAL_PRESETS.divya.items[0].protein, 18);
});

t('list totals drive the per-meal goal and sync into the typed fields', () => {
  const p = { proteinMin: 150, proteinMax: 170, outsideProtein: 0, outsideKcal: 0, fixedMeals: presetItems('jatin') };
  assert.deepEqual(perMealGoal(p, rules), { min: 46, max: 56 });
  const s = syncFixedTotals({ people: [p, { outsideProtein: 30, outsideKcal: 500 }] });
  assert.equal(s.people[0].outsideProtein, 58);
  assert.equal(s.people[0].outsideKcal, 650);
  assert.equal(s.people[1].outsideProtein, 30, 'person without a list is untouched');
});

t('blank, missing or bad numbers count as zero', () => {
  const p = { fixedMeals: [blankFixedMeal(), { protein: 'x', kcal: -5 }, { protein: '12', kcal: 100 }] };
  assert.deepEqual(fixedTotals(p), { protein: 12, kcal: 100 });
});

console.log(`fixed-meals: ${n} passed`);
