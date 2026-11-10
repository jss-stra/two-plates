// Turns the compact recipe rows into full recipe objects with computed nutrition.
import { INGREDIENTS, AISLES } from '../data/ingredients.js';
import indian from '../data/recipes/indian.js';
import mexican from '../data/recipes/mexican.js';
import italian from '../data/recipes/italian.js';
import indoChinese from '../data/recipes/indo-chinese.js';
import thai from '../data/recipes/thai.js';
import exploreAsian from '../data/recipes/explore-asian.js';
import grillWraps from '../data/recipes/grill-wraps.js';
import worldEastAsian from '../data/recipes/world-east-asian.js';
import worldMiddleEastern from '../data/recipes/world-middle-eastern.js';
import worldEuropean from '../data/recipes/world-european-mediterranean.js';
import worldAfrican from '../data/recipes/world-african.js';
import worldAmericas from '../data/recipes/world-americas-caribbean.js';
import worldCentralSouthAsian from '../data/recipes/world-central-south-asian.js';
import worldOceania from '../data/recipes/world-oceania.js';
import indianAdditions from '../data/recipes/indian-additions.js';
import italianAdditions from '../data/recipes/italian-additions.js';
import mexicanAdditions from '../data/recipes/mexican-additions.js';
import thaiAdditions from '../data/recipes/thai-additions.js';
import { REGULARS } from '../data/regulars.js';

export { INGREDIENTS, AISLES };

// Every recipe row is written for this many standard servings.
export const BASE_SERVINGS = 4;
export const MAIN_CUISINES = ['Indian', 'Mexican', 'Italian', 'Indo-Chinese', 'Thai'];
export const GRILL = 'Grill & Wraps';
export const EXPLORE = 'Explore Asian';
export const WORLD_GROUPS = ['East Asian', 'Middle Eastern', 'European & Mediterranean', 'African', 'Americas & Caribbean', 'Central & South Asian', 'Oceania'];
export const GROUPS = ['Indian', 'Mexican', 'Italian', GRILL, 'Indo-Chinese', 'Thai', EXPLORE, ...WORLD_GROUPS];

export const DIET_LABEL = { veg: 'Veg', egg: 'Egg', nonveg: 'Non-veg' };

// The two kinds of slot in a week: chicken/turkey dishes and veg dishes.
export const kindOf = (r, eggsCountAsVeg) => (isVeg(r, eggsCountAsVeg) ? 'veg' : 'chicken');
export const PROTEIN_LABEL = {
  chicken: 'Chicken', turkey: 'Turkey', paneer: 'Paneer', tofu: 'Tofu / soy', soya: 'Soya chunks',
  egg: 'Egg', legume: 'Beans & dal', cheese: 'Cheese',
  beef: 'Beef', lamb: 'Lamb / mutton', pork: 'Pork', fish: 'Fish & seafood',
  goat: 'Goat', duck: 'Duck', rabbit: 'Rabbit', meat: 'Meat',
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
  let kcal = 0, p = 0, c = 0, f = 0;
  let diet = 'veg';
  const proteinBySrc = {};
  for (const { id, qty } of items) {
    const ing = INGREDIENTS[id];
    const g = gramsOf(ing, qty) / 100;
    kcal += ing.kcal * g; p += ing.p * g; c += ing.c * g; f += ing.f * g;
    if (ing.diet === 'meat') diet = 'nonveg';
    else if (ing.diet === 'egg' && diet === 'veg') diet = 'egg';
    if (ing.src) proteinBySrc[ing.src] = (proteinBySrc[ing.src] || 0) + ing.p * g;
  }
  const mainProtein = Object.entries(proteinBySrc).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  const per = (x) => Math.round(x / BASE_SERVINGS);
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
    // Per standard serving
    kcal: per(kcal), protein: per(p), carbs: per(c), fat: per(f),
  };
}

const FILES = [indian, mexican, italian, grillWraps, indoChinese, thai, exploreAsian,
  worldEastAsian, worldMiddleEastern, worldEuropean, worldAfrican, worldAmericas, worldCentralSouthAsian, worldOceania,
  indianAdditions, italianAdditions, mexicanAdditions, thaiAdditions];

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
  const hits = { allergies: [], dislikes: [] };
  if (!exclusions) return hits;
  const have = new Set();
  for (const it of recipe.items) {
    have.add(it.id);
    for (const id of INGREDIENTS[it.id]?.sameAs || []) have.add(id);
  }
  for (const kind of ['allergies', 'dislikes']) {
    for (const id of exclusions[kind] || []) if (have.has(id)) hits[kind].push(id);
  }
  return hits;
}

export const hasExclusions = (recipe, exclusions) => {
  const h = exclusionHits(recipe, exclusions);
  return h.allergies.length + h.dislikes.length > 0;
};
