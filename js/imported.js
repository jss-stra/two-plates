// Source-native imported recipes: fixed base servings, exact source units,
// unknown nutrition. These records NEVER join the compact catalog (RECIPES),
// so auto-planning, numeric protein/kcal bands and catalog grocery scaling
// cannot see them. They are browseable, manually addable to the plan as a
// fixed base batch, and shoppable at exact source quantities.
import { RECIPE_BY_ID } from './data.js';
import ratatouille from '../data/imported/ratatouille.mjs';

const SOURCES = [ratatouille];
export const IMPORTED = new Map();

function adapt(src) {
  return {
    id: src.id,
    name: src.name,
    cuisine: src.cuisine,
    group: src.cuisine, // picker "same cuisine" chip label only; never scored
    country: src.country,
    // diet is derived from the explicit retained lines: every line is a plant
    // food or salt/pepper, no meat/fish/egg/dairy line exists. A content fact
    // about the listed lines - NOT the unverified source diet tags.
    diet: 'veg',
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
