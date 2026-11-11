// Source-native imported recipes: fixed base servings, exact source units,
// unknown nutrition. These records NEVER join the compact catalog (RECIPES),
// so auto-planning, numeric protein/kcal bands and catalog grocery scaling
// cannot see them. They are browseable, manually addable to the plan as a
// fixed base batch, and shoppable at exact source quantities.
import { RECIPE_BY_ID } from './data.js';
import ratatouille from '../data/imported/ratatouille.mjs';

const SOURCES = [ratatouille];
export const IMPORTED = new Map();

// Reviewed per-record diet classifications. A dish gets a diet class ONLY
// when a reviewer derived it from the actual retained lines (never from
// source diet tags). Anything unreviewed or uncertain - meat, egg, cheese,
// bread, stock, dressings - stays 'unknown' and is never shown as veg or
// chicken. Keyed by record id; the source modules stay verbatim.
const REVIEWED_DIET = {
  // All 10 retained lines are plant foods, olive oil and salt/pepper.
  'unitools:ratatouille': { diet: 'veg', basis: 'lines reviewed 2026-11-11: aubergine, courgette, pepper, tomatoes, onion, garlic, olive oil, thyme, basil, salt/pepper - no meat/fish/egg/dairy/grain line' },
};

function adapt(src) {
  return {
    id: src.id,
    name: src.name,
    cuisine: src.cuisine,
    group: src.cuisine, // picker "same cuisine" chip label only; never scored
    country: src.country,
    diet: REVIEWED_DIET[src.id]?.diet || 'unknown',
    dietBasis: REVIEWED_DIET[src.id]?.basis || null,
    mainProtein: null,
    protein: null,
    kcal: null,
    time: null, // source prep/cook times shown in the detail view, not summed
    tags: [],
    items: [], // no catalog mapping: exclusionHits returns empty; gating below
    nutritionApproximate: false,
    imported: true,
    baseServings: src.baseServings,
    src,
  };
}

for (const s of SOURCES) {
  const r = adapt(s);
  IMPORTED.set(r.id, r);
  // Slot/history lookups resolve through RECIPE_BY_ID; planner pools iterate
  // RECIPES, which this never touches.
  RECIPE_BY_ID[r.id] = r;
}

export const isImported = (id) => IMPORTED.has(id);
export const importedList = () => [...IMPORTED.values()];

// Manual fixed-base add gate. Fails closed on ANY active allergy/dislike
// restriction: imported lines have no reviewed catalog/allergen mapping yet,
// so they cannot be checked - empty mappings are never treated as no hits.
export function importedAddStatus(state, id) {
  const r = IMPORTED.get(id);
  if (!r) return { allowed: false, reason: 'Unknown dish.' };
  const x = state.exclusions || {};
  if ((x.allergies?.length || 0) + (x.dislikes?.length || 0) > 0) {
    return { allowed: false, reason: 'Allergy and dislike checks are not reviewed for imported dishes yet. Clear your exclusions to add it, or pick a checked dish.' };
  }
  return { allowed: true };
}

// Exact original-base shopping rows: no rescaling, no unit conversion, no
// mass guesses. Adding the dish to the plan means cooking the original batch.
export function importedShoppingRows(recipe, state) {
  return recipe.src.lines.map((line) => ({
    key: line.lineRef,
    id: null,
    name: line.name + (line.note?.en ? ` (${line.note.en})` : ''),
    aisle: 'extra:Imported',
    aisleLabel: `Imported: ${recipe.name} (exact source amounts, ${recipe.baseServings} servings)`,
    amount: '',
    unit: '',
    text: line.unit === 'toTaste' ? 'to taste' : `${line.quantity} ${line.unit}`,
    dishes: [recipe.name],
    pantry: false,
    checked: !!state.checked[line.lineRef],
    bought: state.bought[line.lineRef] || '',
  }));
}
