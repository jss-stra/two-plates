// Source-native imported recipes: fixed base servings, exact source units,
// unknown nutrition. These records NEVER join the compact catalog (RECIPES),
// so auto-planning, numeric protein/kcal bands and catalog grocery scaling
// cannot see them. They are browseable, manually addable to the plan as a
// fixed base batch, and shoppable at exact source quantities.
import { RECIPE_BY_ID } from './data.js';
import { IMPORTED_SAFETY } from './imported-safety.js';
import ratatouille from '../data/imported/ratatouille.mjs';

import draniki from '../data/imported/draniki.mjs';
import galayet from '../data/imported/galayet-bandora.mjs';
import kaesespaetzle from '../data/imported/kaesespaetzle.mjs';
import melanzane from '../data/imported/melanzane-alla-parmigiana.mjs';
import byrek from '../data/imported/byrek-me-spinaq.mjs';
import misir from '../data/imported/misir-wat.mjs';
import tortilla from '../data/imported/tortilla-espanola.mjs';
import chicken from '../data/imported/chakhokhbili.mjs';
import irish from '../data/imported/irish-stew.mjs';
import farikal from '../data/imported/farikal.mjs';
import fish from '../data/imported/qingzheng-yu.mjs';
const SOURCES = [ratatouille, draniki, galayet, kaesespaetzle, melanzane, byrek, misir, tortilla, chicken, irish, farikal, fish];
const LIMITATIONS = {
  'unitools:kaesespaetzle': { summary: 'Suggested salad not included', detail: 'The source suggests a green salad with vinegar dressing but supplies no quantities. That optional side is not in the groceries for this dish. Water or milk and Emmental or Bergkäse remain source choices; no formulation or strict vegetarian clearance is implied.' },
  'unitools:byrek-me-spinaq': { summary: 'Filo sheet sizes vary: see recipe', detail: 'The source supplies 500 g of prepared filo but describes layers by sheet count. It does not specify sheet dimensions or weight per sheet, so those counts cannot be converted into a guaranteed packet size. Check your pastry before starting. Cheese and pastry formulations are not reviewed.' },
  'unitools:misir-wat': { summary: 'Stew only: bread not included', detail: 'This is the stew only. The source suggests injera or flatbread to serve, but gives no bread quantity or recipe. Bread is not included in these groceries. Berbere and neutral-oil formulations are unspecified; no verified vegan or allergy-free claim is made.' },
};
export const IMPORTED = new Map();

// Reviewed per-record diet classifications. A dish gets a diet class ONLY
// when a reviewer derived it from the actual retained lines (never from
// source diet tags). Anything unreviewed or uncertain - meat, egg, cheese,
// bread, stock, dressings - stays 'unknown' and is never shown as veg or
// chicken. Keyed by record id; the source modules stay verbatim.
const REVIEWED_DIET = {
  'unitools:qingzheng-yu': { diet: 'nonveg', meatKind: 'fish', basis: 'Whole gutted sea bass or bream explicit in source line1. Sauce and oil formulations not cleared.' },
  'unitools:tortilla-espanola': { diet: 'egg', basis: 'All five source lines reviewed: potato, onion, eggs, olive oil, salt. Egg present; no meat named.' },
  'unitools:chakhokhbili': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line1; no cut or bone assumption. Blend formulation not cleared.' },
  'unitools:irish-stew': { diet: 'nonveg', meatKind: 'lamb', basis: 'Bone-in lamb neck or shoulder explicit in source line1. Vegetable stock alternative does not clear lamb.' },
  'unitools:farikal': { diet: 'nonveg', meatKind: 'mutton', basis: 'Bone-in mutton explicit in source line1. Not renamed lamb. Optional flour retained.' },
  'unitools:draniki': { diet: 'veg', basis: '2026-11-11: all six retained lines reviewed: potatoes, onion, vegetable oil, soured cream, dill, salt/pepper. Dairy present; purchased product formulation and cross-contact not cleared.' },
  // Galayet includes flatbreads of unspecified formulation: leave unknown.
  // All 10 retained lines are plant foods, olive oil and salt/pepper.
  'unitools:ratatouille': { diet: 'veg', basis: 'lines reviewed 2026-11-11: aubergine, courgette, pepper, tomatoes, onion, garlic, olive oil, thyme, basil, salt/pepper - no meat/fish/egg/dairy/grain line' },
};

function adapt(src) {
  return {
    id: src.id,
    name: src.name + (src.id === 'unitools:misir-wat' ? ' (stew only)' : ''),
    limitation: LIMITATIONS[src.id] || null,
    cuisine: src.cuisine,
    group: src.cuisine, // picker "same cuisine" chip label only; never scored
    country: src.country,
    diet: REVIEWED_DIET[src.id]?.diet || 'unknown',
    dietBasis: REVIEWED_DIET[src.id]?.basis || null,
    meatKind: REVIEWED_DIET[src.id]?.meatKind || null,
    safety: IMPORTED_SAFETY[src.id] || null,
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
    return { allowed: false, reason: 'Allergy and dislike checks are not reviewed for imported dishes yet. Choose a dish with reviewed ingredient checks instead.' };
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
    aisle: `extra:Imported:${recipe.id}`,
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
