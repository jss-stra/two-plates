// Meal logging with portions: item maths, unknowns never counted as zero,
// older single-field entries still read, fibre coverage and food data sanity.
import assert from 'node:assert/strict';
import { INGREDIENTS, RECIPES, RECIPE_BY_ID } from '../js/data.js';
import { FOODS } from '../data/foods.js';
import { defaultState } from '../js/state.js';
import { makeCustomDish } from '../js/custom.js';
import { isLogged, monthStats } from '../js/log.js';
import {
  itemNutrition, dayTotals, mealsOf, setMeals, hasMeals, recentItems, searchFoods, foodGrams, fibreTarget, portionText,
} from '../js/nutrition.js';

const close = (a, b, msg) => assert.ok(Math.abs(a - b) < 1e-6, `${msg}: ${a} vs ${b}`);

// Every ingredient has a fibre value; every recipe gets fibre per serving.
assert.deepEqual(Object.entries(INGREDIENTS).filter(([, v]) => v.fi == null).map(([k]) => k), [], 'fibre for every ingredient');
assert.ok(RECIPES.every((r) => Number.isFinite(r.fibre)), 'every recipe has fibre');

// Food table: energy roughly matches its macros (catches typos), portions valid.
for (const [id, f] of Object.entries(FOODS)) {
  const est = 4 * f.p + 4 * f.c + 9 * f.f + 2 * f.fi + 7 * f.alc;
  assert.ok(Math.abs(f.kcal - est) <= Math.max(15, f.kcal * 0.12), `${id}: ${f.kcal} kcal vs ${est.toFixed(0)} from macros`);
  assert.ok(f.portions.length && f.portions.every(([l, g]) => l && g > 0), `${id} portions`);
  assert.ok(['g', 'ml'].includes(f.unit), `${id} unit`);
}

const s = defaultState();
const dish = RECIPE_BY_ID['methi-paneer'];

// Dish: standard servings scale every nutrient.
{
  const nu = itemNutrition(s, { t: 'dish', id: dish.id, s: 1.5 });
  close(nu.protein, dish.protein * 1.5, 'dish protein');
  close(nu.kcal, dish.kcal * 1.5, 'dish kcal');
  close(nu.carbs, dish.carbs * 1.5, 'dish carbs');
  close(nu.fibre, dish.fibre * 1.5, 'dish fibre');
  assert.equal(nu.known, true);
}

// Food: named portions and grams agree.
{
  const two = itemNutrition(s, { t: 'food', id: 'roti', n: 2, u: 'roti' });
  const grams = itemNutrition(s, { t: 'food', id: 'roti', n: 80, u: 'g' });
  close(two.protein, grams.protein, 'roti portion = grams');
  close(two.kcal, FOODS.roti.kcal * 0.8, 'roti kcal');
  assert.equal(foodGrams(FOODS.whey, 1, 'scoop'), 30);
  assert.equal(portionText(FOODS.roti, 2, 'roti'), '2 × roti');
  assert.equal(portionText(FOODS.milk_light, 300, 'ml'), '300 ml');
}

// Your own dish has no numbers: known=false, never zero.
{
  const own = makeCustomDish({ name: 'Nani khichdi', ingredients: ['moong'], diet: 'veg' });
  s.customDishes[own.id] = own;
  const nu = itemNutrition(s, { t: 'dish', id: own.id, s: 1 });
  assert.equal(nu.known, false);
  assert.equal(nu.protein, null);
}

// Typed-in item: blanks stay unknown.
{
  const nu = itemNutrition(s, { t: 'own', name: 'Subway', p: 30, kcal: 450, c: null, fi: null });
  assert.equal(nu.known, true);
  assert.equal(nu.carbs, null);
  assert.equal(itemNutrition(s, { t: 'own', name: 'Party food' }).known, false);
}

// Day totals: unknown items are counted as missing, not as 0 contributions to "known".
{
  const e = {};
  setMeals(e, {
    breakfast: [{ t: 'food', id: 'oats', n: 1, u: '½ cup' }, { t: 'food', id: 'whey', n: 1, u: 'scoop' }],
    lunch: [{ t: 'dish', id: dish.id, s: 1.25 }],
    dinner: [{ t: 'own', name: 'Dinner out' }],
    snacks: [{ t: 'food', id: 'banana', n: 1, u: 'medium' }],
  }, {});
  const t = dayTotals(s, e, s.people[0]);
  const expectP = FOODS.oats.p * 0.4 + FOODS.whey.p * 0.3 + dish.protein * 1.25 + FOODS.banana.p * 1.2;
  close(t.protein, expectP, 'day protein');
  assert.equal(t.missing, 1, 'one item without numbers');
  assert.equal(t.count, 5);
  close(t.byMeal.lunch.protein, dish.protein * 1.25, 'lunch subtotal');
  assert.ok(isLogged(e) && hasMeals(e));
}

// Older entries still read: dish id -> usual portion, text -> item without numbers.
{
  const legacy = { breakfast: 'usual', lunch: dish.id, dinner: 'skipped', snacks: 'chai', at: 1 };
  const { meals, skip } = mealsOf(legacy, { portion: 1.2 });
  assert.deepEqual(meals.lunch, [{ t: 'dish', id: dish.id, s: 1.2 }]);
  assert.equal(skip.dinner, true);
  assert.equal(meals.breakfast[0].t, 'own');
  assert.equal(meals.snacks[0].name, 'chai');
  assert.ok(isLogged(legacy));
  // Converting on first edit drops the old fields, keeps everything else.
  const e = structuredClone(legacy);
  setMeals(e, meals, skip);
  assert.equal(e.lunch, undefined);
  assert.equal(e.at, 1);
  assert.deepEqual(mealsOf(e, {}).meals.lunch, meals.lunch);
}

// Month report reads the new shape: plan dishes vs other vs skipped, averages
// only over fully known days.
{
  const st = defaultState();
  const day = (meals, skip = {}) => { const e = {}; setMeals(e, meals, skip); return e; };
  st.days = {
    '2026-11-02': { 0: day({ breakfast: [], lunch: [{ t: 'dish', id: dish.id, s: 1 }], dinner: [{ t: 'food', id: 'dal_cooked', n: 1, u: 'bowl' }], snacks: [] }) },
    '2026-11-03': { 0: day({ breakfast: [], lunch: [], dinner: [{ t: 'own', name: 'Pizza' }], snacks: [] }, { lunch: true }) },
  };
  const m = monthStats(st, '2026-11', 0);
  assert.equal(m.logged, 2);
  assert.equal(m.fromPlan, 1);
  assert.equal(m.other, 2);
  assert.equal(m.skipped, 1);
  assert.equal(m.nuDays, 1, 'the pizza day has an unknown item: left out of averages');
  close(m.avgProtein, dish.protein + FOODS.dal_cooked.p * 1.5, 'avg protein');
}

// Recent items: newest first, same meal first, unique, nothing without numbers.
{
  const st = defaultState();
  const day = (meals) => { const e = {}; setMeals(e, { breakfast: [], lunch: [], dinner: [], snacks: [], ...meals }, {}); return e; };
  st.days = {
    '2026-11-10': { 0: day({ breakfast: [{ t: 'food', id: 'oats', n: 1, u: '½ cup' }], snacks: [{ t: 'own', name: 'mystery' }] }) },
    '2026-11-11': { 0: day({ breakfast: [{ t: 'food', id: 'oats', n: 2, u: '½ cup' }], lunch: [{ t: 'food', id: 'banana', n: 1, u: 'medium' }] }) },
  };
  const r = recentItems(st, 0, 'breakfast');
  assert.equal(r[0].id, 'oats');
  assert.equal(r[0].n, 2, 'latest portion remembered');
  assert.equal(r.filter((x) => x.id === 'oats').length, 1, 'unique');
  assert.ok(!r.some((x) => x.t === 'own'), 'typed items without numbers not offered');
  assert.equal(recentItems(st, 1, 'breakfast').length, 0, 'per person');
}

// Search: Hindi names and multi-word queries.
assert.equal(searchFoods('kela')[0].id, 'banana');
assert.ok(searchFoods('milk light').some((f) => f.id === 'milk_light'));
assert.equal(fibreTarget({}, 0), 30);
assert.equal(fibreTarget({ fibreTarget: 35 }, 1), 35);

console.log('nutrition tests passed');
