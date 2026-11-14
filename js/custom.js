// Your own dishes: written by the user during menu creation when the catalog
// doesn't have what they decided to eat. They live in the synced app state
// (same audience as the plan itself), never in the public recipe bundle.
// They carry no invented data: no quantities beyond what the user wrote, no
// nutrition, no allergy clearance.
import { RECIPE_BY_ID } from './data.js';

export const slugify = (name) => name.trim().toLowerCase()
  .replace(/['’]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '') || 'dish';

export const customId = (name) => `custom:${slugify(name)}`;

// One ingredient per line, exactly as written. Empty lines dropped.
export function parseIngredientLines(text) {
  return String(text || '').split('\n').map((l) => l.trim()).filter(Boolean);
}

// diet: 'veg' | 'nonveg' | 'unknown' (only what the user told us).
export function makeCustomDish({ name, ingredients = [], diet = 'unknown' }) {
  const id = customId(name);
  return {
    id,
    name: name.trim(),
    custom: true,
    cuisine: 'Your dish',
    diet: ['veg', 'nonveg'].includes(diet) ? diet : 'unknown',
    mainProtein: null,
    protein: null,
    kcal: null,
    time: null,
    items: [], // no catalog mapping: nothing to scale, check or invent
    customIngredients: ingredients,
    createdAt: Date.now(),
  };
}

// Resolve a plan/history dish id against the catalog (incl. imported) first,
// then the user's own dishes in state.
export function dishById(state, id) {
  return RECIPE_BY_ID[id] || state?.customDishes?.[id] || null;
}

export function customDishList(state) {
  return Object.values(state?.customDishes || {}).sort((a, b) => a.name.localeCompare(b.name));
}

export function customMatches(r, query) {
  const q = (query || '').trim().toLowerCase();
  return !q || r.name.toLowerCase().includes(q)
    || r.customIngredients.some((l) => l.toLowerCase().includes(q));
}

// Grocery rows: the ingredient lines exactly as the user wrote them - no
// amounts, no scaling, no catalog merge. They sit with the other
// user-authored extras, grouped under the dish's name.
export function customDishRows(dish, state) {
  return dish.customIngredients.map((line, i) => ({
    key: `cust:${dish.id}:${i}`,
    id: null,
    name: line,
    aisle: `extra:Custom:${dish.id}`,
    aisleLabel: `Your dish: ${dish.name} (as you wrote it)`,
    amount: '',
    unit: '',
    text: '',
    dishes: [],
    pantry: false,
    checked: !!state.checked[`cust:${dish.id}:${i}`],
    bought: state.bought[`cust:${dish.id}:${i}`] || '',
  }));
}
