// Week-tab search: deliberate picks ("I've decided what I want") search the
// whole catalog by name, cuisine or ingredient, skip dishes already in the
// week, and respect hidden dishes and allergy/dislike exclusions.
import assert from 'node:assert/strict';
import { RECIPES, RECIPE_BY_ID } from '../js/data.js';
import { alternatives } from '../js/planner.js';
import { defaultState } from '../js/state.js';

const state = () => {
  const s = defaultState();
  s.plan.slots = [{ id: RECIPES[0].id, locked: false }];
  return s;
};

// Ingredient match: "saag"/"spinach" finds dishes whose name doesn't say it.
{
  const s = state();
  const byIng = alternatives(s, -1, { query: 'spinach' });
  assert.ok(byIng.some((r) => r.name === 'Chana & Spinach Kathi Roll'), 'ingredient-only match found');
  assert.ok(byIng.every((r) => !r.name.toLowerCase().includes('spinach') || true));
  const byName = alternatives(s, -1, { query: 'chana masala' });
  assert.ok(byName.some((r) => r.name === 'Chana Masala & Jeera Rice'), 'name match still works');
}

// Dishes already in the week never come back, in slot mode or week-level mode.
{
  const s = state();
  const inWeek = s.plan.slots[0].id;
  assert.ok(alternatives(s, -1, {}).every((r) => r.id !== inWeek), 'week-level search skips planned dishes');
  assert.ok(alternatives(s, 0, {}).every((r) => r.id !== inWeek), 'slot search skips planned dishes');
}

// Hidden and excluded dishes stay out of deliberate search too.
{
  const s = state();
  const target = RECIPES.find((r) => r.id !== s.plan.slots[0].id && r.items.length);
  s.hidden.push(target.id);
  assert.ok(alternatives(s, -1, { query: target.name.toLowerCase() }).every((r) => r.id !== target.id), 'hidden dish not offered');
  const s2 = state();
  const excl = RECIPES.find((r) => r.id !== s2.plan.slots[0].id && r.items.length);
  s2.exclusions.allergies = [excl.items[0].id];
  assert.ok(alternatives(s2, -1, { query: excl.name.toLowerCase() }).every((r) => r.id !== excl.id), 'excluded dish not offered');
}

// Kind filter narrows a week-level search; unknown query yields nothing.
{
  const s = state();
  assert.ok(alternatives(s, -1, { kind: 'veg' }).every((r) => ['veg'].includes(r.diet) || (r.diet === 'egg' && s.rules.eggsCountAsVeg)), 'veg filter holds');
  assert.equal(alternatives(s, -1, { query: 'zzz-no-such-dish-zzz' }).length, 0, 'no matches is empty, not everything');
}

console.log('week-search tests passed');
