// Your own dishes: the user writes a dish the catalog doesn't have (name +
// ingredients in their own words, nothing invented by the app). They must
// survive every path a planned dish travels: slot resolution, shuffle
// keeping locked slots, kind bookkeeping, groceries as written, menu links.
import assert from 'node:assert/strict';
import { RECIPES } from '../js/data.js';
import { slugify, customId, parseIngredientLines, makeCustomDish, dishById, customDishList, customMatches, customDishRows } from '../js/custom.js';
import { defaultState } from '../js/state.js';
import { generateSlots, slotKind, planRecipes } from '../js/planner.js';

// --- slug / id ---
assert.equal(slugify('  Chicken 65! '), 'chicken-65');
assert.equal(customId('My Dal!'), 'custom:my-dal');

// --- ingredient parsing: kept verbatim, blanks dropped ---
assert.deepEqual(parseIngredientLines(' chicken thighs 500g \n\n greek yogurt\t\n'), ['chicken thighs 500g', 'greek yogurt']);

// --- makeCustomDish: no invented nutrition ---
{
  const r = makeCustomDish({ name: 'Test Curry', ingredients: ['a', 'b'], diet: 'nonveg' });
  assert.equal(r.id, 'custom:test-curry');
  assert.equal(r.custom, true);
  assert.equal(r.cuisine, 'Your dish');
  assert.equal(r.protein, null);
  assert.equal(r.kcal, null);
  assert.equal(r.time, null);
  assert.deepEqual(r.items, [], 'no catalog items');
  assert.deepEqual(r.customIngredients, ['a', 'b']);
  assert.equal(makeCustomDish({ name: 'x', diet: 'nonsense' }).diet, 'unknown', 'diet constrained');
}

// --- resolver: custom wins after catalog miss, catalog untouched ---
{
  const s = defaultState();
  const r = makeCustomDish({ name: 'Solo Pasta', ingredients: ['pasta'], diet: 'veg' });
  s.customDishes[r.id] = r;
  assert.equal(dishById(s, r.id), r);
  assert.equal(dishById(s, RECIPES[0].id).id, RECIPES[0].id, 'catalog still resolves');
  assert.equal(dishById(s, 'custom:missing'), null);
}

// --- matching ---
{
  const r = makeCustomDish({ name: 'Egg Fried Rice', ingredients: ['rice', 'soy sauce'], diet: 'unknown' });
  assert.ok(customMatches(r, 'fried'));
  assert.ok(customMatches(r, 'SOY'));
  assert.ok(!customMatches(r, 'dal'));
  assert.ok(customMatches(r, ''), 'empty query lists all');
}

// --- generateSlots keeps a locked custom slot, never replaces it ---
{
  const s = defaultState();
  const r = makeCustomDish({ name: 'Week Dal', ingredients: ['toor dal'], diet: 'veg' });
  s.customDishes[r.id] = r;
  s.plan.slots = [{ id: r.id, locked: true }];
  generateSlots(s);
  assert.ok(s.plan.slots.some((x) => x.id === r.id && x.locked), 'custom dish survives a shuffle');
  assert.ok(s.plan.slots.every((x) => dishById(s, x.id)), 'every slot resolves after generate');
}

// --- slotKind honours planKind for custom dishes, else kindOf ---
{
  const s = defaultState();
  const r = makeCustomDish({ name: 'Mystery', ingredients: [], diet: 'unknown' });
  s.customDishes[r.id] = r;
  const slot = { id: r.id, locked: true, planKind: 'veg' };
  assert.equal(slotKind(slot, r, s.rules), 'veg', 'planKind wins');
  assert.equal(slotKind({ id: r.id, locked: true }, r, s.rules), 'unknown', 'unknown diet stays unknown');
}

// --- grocery rows: user's lines exactly, under their own aisle ---
{
  const s = defaultState();
  const r = makeCustomDish({ name: 'Toastie Night', ingredients: ['sourdough', 'cheese slices'], diet: 'veg' });
  const rows = customDishRows(r, s);
  assert.equal(rows.length, 2);
  assert.deepEqual(rows.map((x) => x.name), ['sourdough', 'cheese slices']);
  assert.ok(rows.every((x) => x.aisle === 'extra:Custom:custom:toastie-night'));
  assert.ok(rows.every((x) => x.aisleLabel === 'Your dish: Toastie Night (as you wrote it)'));
  assert.ok(rows.every((x) => x.amount === '' && x.unit === ''), 'no invented quantities');
  assert.ok(rows.every((x) => x.checked === false && x.bought === ''));
}

// --- planRecipes includes planned custom dishes ---
{
  const s = defaultState();
  const r = makeCustomDish({ name: 'Plan Me', ingredients: [], diet: 'veg' });
  s.customDishes[r.id] = r;
  s.plan.slots = [{ id: r.id, locked: true }];
  assert.deepEqual(planRecipes(s).map((x) => x.id), [r.id]);
}

// --- customDishList sorted, only customs ---
{
  const s = defaultState();
  s.customDishes['custom:b-dish'] = makeCustomDish({ name: 'B dish', ingredients: [], diet: 'veg' });
  s.customDishes['custom:a-dish'] = makeCustomDish({ name: 'A dish', ingredients: [], diet: 'veg' });
  assert.deepEqual(customDishList(s).map((r) => r.name), ['A dish', 'B dish']);
}

console.log('custom-dish.test.mjs: all passed');
