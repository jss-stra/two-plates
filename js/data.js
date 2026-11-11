// Turns the compact recipe rows into full recipe objects with computed nutrition.
import { INGREDIENTS, AISLES } from '../data/ingredients.js';
import indian from '../data/recipes/indian.js';
import mexican from '../data/recipes/mexican.js';
import italian from '../data/recipes/italian.js';
import indoChinese from '../data/recipes/indo-chinese.js';
import thai from '../data/recipes/thai.js';
import exploreAsian from '../data/recipes/explore-asian.js';
import grillWraps from '../data/recipes/grill-wraps.js';
import { REGULARS } from '../data/regulars.js';

export { INGREDIENTS, AISLES };

// Every recipe row is written for this many standard servings.
export const BASE_SERVINGS = 4;
export const MAIN_CUISINES = ['Indian', 'Mexican', 'Italian', 'Indo-Chinese', 'Thai'];
export const GRILL = 'Grill & Wraps';
export const EXPLORE = 'Explore Asian';
export const GROUPS = ['Indian', 'Mexican', 'Italian', GRILL, 'Indo-Chinese', 'Thai', EXPLORE];

// Broad allergy categories (allergies only). Excluding one catches every
// catalog ingredient tagged with that category - including items whose exact
// species or recipe is unknown - plus made-from forms via derivedFrom.
export const ALLERGEN_CATS = {
  peanuts: 'Peanuts', tree_nuts: 'Tree nuts', fish: 'Fish', shellfish: 'Shellfish',
  dairy: 'Dairy', egg: 'Egg', soy: 'Soy', sesame: 'Sesame', gluten: 'Gluten', mustard: 'Mustard',
  celery: 'Celery',
};

export const DIET_LABEL = { veg: 'Veg', egg: 'Egg', nonveg: 'Non-veg', unknown: 'Not classified' };

// The two kinds of slot in a week: chicken/turkey dishes and veg dishes.
export const kindOf = (r, eggsCountAsVeg) => (isVeg(r, eggsCountAsVeg) ? 'veg' : (DIET_LABEL[r.diet] && r.diet !== 'unknown' ? 'chicken' : 'unknown'));
export const PROTEIN_LABEL = {
  chicken: 'Chicken', turkey: 'Turkey', paneer: 'Paneer', tofu: 'Tofu / soy', soya: 'Soya chunks',
  egg: 'Egg', legume: 'Beans & dal', cheese: 'Cheese',
  beef: 'Beef', lamb: 'Lamb', pork: 'Pork', fish: 'Fish', shellfish: 'Shellfish',
  duck: 'Duck', rabbit: 'Rabbit', game: 'Game',
};

export const DATA_ERRORS = [];

export function slug(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function gramsOf(ing, qty) {
  return ing.unit === 'g' || ing.unit === 'ml' ? qty : qty * (ing.g ?? 0);
}

function parseIngredients(str, recipeName) {
  const items = [];
  for (const part of str.split(',')) {
    const [id, q] = part.trim().split(/\s+/);
    if (!id) continue;
    const qty = Number(q);
    if (!INGREDIENTS[id]) { DATA_ERRORS.push(`${recipeName}: unknown ingredient "${id}"`); continue; }
    if (!Number.isFinite(qty) || qty <= 0) { DATA_ERRORS.push(`${recipeName}: bad quantity for "${id}"`); continue; }
    items.push({ id, qty });
  }
  return items;
}

function buildRecipe(row, file) {
  const [name, time, ingStr, tagStr = '', cuisineOverride] = row;
  const cuisine = cuisineOverride || file.cuisine;
  const items = parseIngredients(ingStr, name);
  // Unknown macros stay unknown: any item with a null macro makes the dish's
  // macros null (never silently zero). Approximate items mark the dish approximate.
  let kcal = 0, p = 0, c = 0, f = 0, unknown = false, approximate = false;
  let diet = 'veg';
  const proteinBySrc = {};
  for (const { id, qty } of items) {
    const ing = INGREDIENTS[id];
    const g = gramsOf(ing, qty) / 100;
    if (ing.kcal == null || ing.p == null || ing.c == null || ing.f == null) unknown = true;
    else { kcal += ing.kcal * g; p += ing.p * g; c += ing.c * g; f += ing.f * g; }
    if (ing.basis === 'approximate') approximate = true;
    if (ing.diet === 'meat') diet = 'nonveg';
    else if (ing.diet === 'egg' && diet === 'veg') diet = 'egg';
    if (ing.src && ing.p != null) proteinBySrc[ing.src] = (proteinBySrc[ing.src] || 0) + ing.p * g;
  }
  // Label fallback: when macros are unknown there's no protein mass to rank by,
  // so use the first declared protein source rather than a misleading default.
  const firstSrc = items.map((it) => INGREDIENTS[it.id].src).find(Boolean);
  const mainProtein = Object.entries(proteinBySrc).sort((a, b) => b[1] - a[1])[0]?.[0] || firstSrc || 'legume';
  const per = (x) => (unknown ? null : Math.round(x / BASE_SERVINGS));
  return {
    id: slug(name),
    name,
    cuisine,
    group: file.group || (MAIN_CUISINES.includes(cuisine) ? cuisine : EXPLORE),
    time,
    tags: tagStr.split(/\s+/).filter(Boolean),
    items,
    diet,
    mainProtein,
    nutritionUnknown: unknown || undefined,
    nutritionApproximate: (!unknown && approximate) || undefined,
    // Per standard serving (null when any ingredient's macros are unknown)
    kcal: per(kcal), protein: per(p), carbs: per(c), fat: per(f),
  };
}

const FILES = [indian, mexican, italian, grillWraps, indoChinese, thai, exploreAsian];

export const RECIPES = [];
export const RECIPE_BY_ID = {};
for (const file of FILES) {
  for (const row of file.recipes) {
    const r = buildRecipe(row, file);
    if (RECIPE_BY_ID[r.id]) { DATA_ERRORS.push(`Duplicate recipe name: ${r.name}`); continue; }
    RECIPES.push(r);
    RECIPE_BY_ID[r.id] = r;
  }
}
for (const name of REGULARS) {
  const r = RECIPE_BY_ID[slug(name)];
  if (r) r.regular = true;
  else DATA_ERRORS.push(`Regular dish not found: ${name}`);
}

export function youtubeUrl(recipe) {
  const q = recipe.name.replace(/\(.*?\)/g, '').replace(/["&]/g, ' ').replace(/\s+/g, ' ').trim();
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(`${q} recipe`);
}

export function isVeg(recipe, eggsCountAsVeg) {
  return recipe.diet === 'veg' || (eggsCountAsVeg && recipe.diet === 'egg');
}

// Which excluded ingredients (Settings → Allergies & dislikes) a dish contains,
// split by list. Only checks the recipe's own ingredient list — it can't see
// what's inside packaged sauces, pastes or bread, and cross-contact isn't tracked.
export function exclusionHits(recipe, exclusions) {
  const hits = { allergies: [], allergiesPossible: [], dislikes: [] };
  if (!exclusions) return hits;
  // sameAs (definitional identity) applies to both lists. derivedFrom
  // (made-from / known-constituent), allergenCats (definite) and possibleCats
  // (brand-varying, disclosed as "may contain") apply to allergies only.
  const have = new Set();
  const haveAllergy = new Set();
  const cats = new Set();
  const possCats = new Set();
  for (const it of recipe.items) {
    have.add(it.id);
    haveAllergy.add(it.id);
    const ing = INGREDIENTS[it.id];
    for (const id of ing?.sameAs || []) { have.add(id); haveAllergy.add(id); }
    for (const c of ing?.allergenCats || []) cats.add(c);
    for (const c of ing?.possibleCats || []) possCats.add(c);
    // transitive made-from chain (guarded against cycles)
    const queue = [...(ing?.derivedFrom || [])];
    const seen = new Set();
    while (queue.length) {
      const src = queue.shift();
      if (seen.has(src)) continue;
      seen.add(src);
      haveAllergy.add(src);
      for (const c2 of INGREDIENTS[src]?.allergenCats || []) cats.add(c2);
      for (const c2 of INGREDIENTS[src]?.possibleCats || []) possCats.add(c2);
      queue.push(...(INGREDIENTS[src]?.derivedFrom || []));
    }
  }
  for (const id of exclusions.dislikes || []) if (have.has(id)) hits.dislikes.push(id);
  for (const id of exclusions.allergies || []) {
    if (id.startsWith('cat:')) {
      const c = id.slice(4);
      if (cats.has(c)) hits.allergies.push(id);
      else if (possCats.has(c)) hits.allergiesPossible.push(id);
    } else if (haveAllergy.has(id)) hits.allergies.push(id);
  }
  return hits;
}

export const hasExclusions = (recipe, exclusions) => {
  const h = exclusionHits(recipe, exclusions);
  // Possible constituents exclude conservatively too; the UI discloses them
  // as "may contain" rather than confirmed.
  return h.allergies.length + h.allergiesPossible.length + h.dislikes.length > 0;
};

// Display classification is separate from the plan position replaced by a
// manual imported dish. Never caption imported egg/lamb/mutton as chicken.
export const DISPLAY_GROUPS = [
  ['chicken', 'Chicken & turkey'], ['veg', 'Veg'], ['egg', 'Egg'],
  ['lamb', 'Lamb'], ['mutton', 'Mutton'], ['pork', 'Pork'], ['beef', 'Beef'],
  ['fish', 'Fish'], ['nonveg', 'Other non-veg'], ['unknown', 'Diet not classified'],
];
export const displayKind = (r, eggsCountAsVeg) => !r.imported ? kindOf(r, eggsCountAsVeg)
  : r.diet === 'veg' ? 'veg' : r.diet === 'egg' ? 'egg'
  : r.diet === 'nonveg' ? (r.meatKind || 'nonveg') : 'unknown';
