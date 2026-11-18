// What was eaten, in numbers: turns the Today log's meal items into protein,
// calories, carbs and fibre. Pure functions - no DOM - so node tests cover them.
//
// A day entry keeps its meals as
//   e.meals = { breakfast: [item], lunch: [item], dinner: [item], snacks: [item] }
//   e.skip  = { lunch: true, ... }            (meal deliberately skipped)
// and an item is one of
//   { t: 'dish', id, s }        a Two Plates dish, s = standard servings eaten
//   { t: 'food', id, n, u }     an everyday food: n of portion u (u = 'g'/'ml' for weight)
//   { t: 'own', name, kcal, p, c, fi }  typed in by hand; any number may be null
//
// Unknown stays unknown: an item without numbers is counted as "not in the
// totals" and the totals say so - nothing is guessed to fill the gap.
import { dishById } from './custom.js';
import { FOODS } from '../data/foods.js';

export const MEAL_KEYS = [['breakfast', 'Breakfast'], ['lunch', 'Lunch'], ['dinner', 'Dinner'], ['snacks', 'Snacks']];
export const NUTRIENTS = [['protein', 'protein'], ['kcal', 'kcal'], ['carbs', 'carbs'], ['fibre', 'fibre']];

const num = (x) => (typeof x === 'number' && Number.isFinite(x) ? x : null);
const r0 = (x) => (x == null ? null : Math.round(x));

// Grams (or ml) for an everyday-food item.
export function foodGrams(food, n, u) {
  if (!food || !(n > 0)) return 0;
  if (u === 'g' || u === 'ml') return n;
  const portion = food.portions.find(([label]) => label === u) || food.portions[0];
  return n * portion[1];
}

// Numbers for one item: { kcal, protein, carbs, fibre } with null for any
// value we don't know. `known` is true only when protein and kcal are known.
export function itemNutrition(state, item) {
  const none = { kcal: null, protein: null, carbs: null, fibre: null, known: false };
  if (!item) return none;
  if (item.t === 'dish') {
    const r = dishById(state, item.id);
    const s = num(item.s);
    if (!r || s == null) return none;
    const x = (v) => (num(v) == null ? null : v * s);
    const out = { kcal: x(r.kcal), protein: x(r.protein), carbs: x(r.carbs), fibre: x(r.fibre) };
    return { ...out, known: out.kcal != null && out.protein != null };
  }
  if (item.t === 'food') {
    const f = FOODS[item.id];
    if (!f) return none;
    const g = foodGrams(f, num(item.n), item.u) / 100;
    return { kcal: f.kcal * g, protein: f.p * g, carbs: f.c * g, fibre: f.fi * g, known: true };
  }
  if (item.t === 'own') {
    const out = { kcal: num(item.kcal), protein: num(item.p), carbs: num(item.c), fibre: num(item.fi) };
    return { ...out, known: out.kcal != null && out.protein != null };
  }
  return none;
}

// Display name and portion text for an item.
export function itemLabel(state, item) {
  if (item.t === 'dish') {
    const r = dishById(state, item.id);
    return { name: r?.name || 'Dish no longer available', portion: servingsText(item.s) };
  }
  if (item.t === 'food') {
    const f = FOODS[item.id];
    if (!f) return { name: 'Food no longer available', portion: '' };
    return { name: f.name, portion: portionText(f, item.n, item.u) };
  }
  return { name: item.name || 'Something else', portion: '' };
}

export const fmtAmount = (n) => {
  const whole = Math.floor(n + 1e-9);
  const frac = Math.round((n - whole) * 100) / 100;
  const sym = { 0.25: '¼', 0.5: '½', 0.75: '¾' }[frac];
  if (!frac) return String(whole);
  if (sym) return whole ? `${whole}${sym}` : sym;
  return String(Math.round(n * 100) / 100);
};

export function servingsText(s) {
  const v = num(s) ?? 0;
  return `${fmtAmount(v)} serving${v === 1 ? '' : 's'}`;
}

export function portionText(food, n, u) {
  if (u === 'g' || u === 'ml') return `${Math.round(n)} ${u}`;
  const p = food.portions.find(([label]) => label === u) || food.portions[0];
  // "2 roti" reads fine; plural labels stay as written ("2 handful" -> "2 × handful").
  return n === 1 ? `1 ${p[0]}` : `${fmtAmount(n)} × ${p[0]}`;
}

// One line of numbers: "46 g protein · 620 kcal · 30 g carbs · 9 g fibre".
export function macroText(nu, { short = false } = {}) {
  if (!nu || (nu.protein == null && nu.kcal == null)) return 'no nutrition info';
  const parts = [];
  if (nu.protein != null) parts.push(`${r0(nu.protein)} g protein`);
  if (nu.kcal != null) parts.push(`${r0(nu.kcal).toLocaleString('en-AU')} kcal`);
  if (!short) {
    if (nu.carbs != null) parts.push(`${r0(nu.carbs)} g carbs`);
    if (nu.fibre != null) parts.push(`${r0(nu.fibre)} g fibre`);
  }
  return parts.join(' · ');
}

// Older entries (before portions) kept one field per meal: breakfast
// 'usual'|'other'|'skipped' (+ breakfastText), lunch/dinner = dish id |
// 'other' | 'skipped' (+ lunchText/dinnerText), snacks = free text. Read them
// as items so nothing logged earlier disappears: a planned dish becomes the
// person's usual portion of it; free text becomes an item without numbers.
export function mealsOf(entry = {}, person = {}) {
  const meals = { breakfast: [], lunch: [], dinner: [], snacks: [] };
  const skip = { ...(entry.skip || {}) };
  if (entry.meals) {
    for (const [k] of MEAL_KEYS) meals[k] = Array.isArray(entry.meals[k]) ? entry.meals[k] : [];
    return { meals, skip };
  }
  const portion = num(person.portion) || 1;
  if (entry.breakfast === 'skipped') skip.breakfast = true;
  else if (entry.breakfast === 'usual') meals.breakfast.push({ t: 'own', name: 'Usual breakfast & shake' });
  else if (entry.breakfast === 'other') meals.breakfast.push({ t: 'own', name: entry.breakfastText || 'Something else' });
  for (const m of ['lunch', 'dinner']) {
    const v = entry[m];
    if (!v) continue;
    if (v === 'skipped') skip[m] = true;
    else if (v === 'other') meals[m].push({ t: 'own', name: entry[`${m}Text`] || 'Ate out / other' });
    else meals[m].push({ t: 'dish', id: v, s: portion });
  }
  if (entry.snacks) meals.snacks.push({ t: 'own', name: entry.snacks });
  return { meals, skip };
}

// Write the new shape onto an entry (dropping the old per-meal fields, which
// mealsOf has already folded in).
export function setMeals(entry, meals, skip) {
  entry.meals = meals;
  entry.skip = skip;
  for (const k of ['breakfast', 'breakfastText', 'lunch', 'lunchText', 'dinner', 'dinnerText', 'snacks']) delete entry[k];
}

export const hasMeals = (entry = {}) => {
  const { meals, skip } = mealsOf(entry);
  return MEAL_KEYS.some(([k]) => meals[k].length || skip[k]);
};

// Totals for a list of items. `missing` counts items whose protein/kcal are
// unknown; their known parts are still added, so totals are "at least".
export function sumItems(state, items) {
  const t = { kcal: 0, protein: 0, carbs: 0, fibre: 0, missing: 0, count: 0, partial: false };
  for (const it of items) {
    const nu = itemNutrition(state, it);
    t.count++;
    if (!nu.known) t.missing++;
    for (const k of ['kcal', 'protein', 'carbs', 'fibre']) {
      if (nu[k] != null) t[k] += nu[k];
      else if (nu.known) t.partial = true; // e.g. a hand-typed item with no fibre
    }
  }
  return t;
}

export function dayTotals(state, entry, person) {
  const { meals, skip } = mealsOf(entry, person);
  const byMeal = {};
  const all = [];
  for (const [k] of MEAL_KEYS) { byMeal[k] = sumItems(state, meals[k]); all.push(...meals[k]); }
  return { ...sumItems(state, all), byMeal, meals, skip };
}

// The person's fibre target (g/day). Default follows the Australian adequate
// intake: 30 g for men, 25 g for women - a placeholder until set in Settings.
export const fibreTarget = (person = {}, index = 0) => num(person.fibreTarget) ?? (index === 0 ? 30 : 25);

// Items this person logged recently (newest first, unique by what was eaten),
// for one-tap re-adding. Same-meal items come first.
export function recentItems(state, p, meal, { days = 21, limit = 8, today } = {}) {
  const all = Object.keys(state.days || {}).sort().reverse()
    .filter((d) => !today || d <= today).slice(0, days);
  const seen = new Set();
  const same = [], other = [];
  for (const d of all) {
    const { meals } = mealsOf(state.days[d]?.[p] || {}, state.people?.[p]);
    for (const [k] of MEAL_KEYS) {
      for (const it of [...meals[k]].reverse()) {
        if (it.t === 'own' && (it.kcal == null || it.p == null)) continue; // nothing to re-add with numbers
        const key = it.t === 'own' ? `own:${(it.name || '').toLowerCase()}` : `${it.t}:${it.id}`;
        if (seen.has(key)) continue;
        if (it.t === 'dish' && !dishById(state, it.id)) continue;
        if (it.t === 'food' && !FOODS[it.id]) continue;
        seen.add(key);
        (k === meal ? same : other).push(it);
      }
    }
  }
  return [...same, ...other].slice(0, limit);
}

// Everyday-food search: name, group or extra words; every word must match.
export function searchFoods(query) {
  const words = String(query || '').toLowerCase().split(/\s+/).filter(Boolean);
  return Object.entries(FOODS)
    .filter(([, f]) => words.every((w) => `${f.name} ${f.aka}`.toLowerCase().includes(w)))
    .map(([id, f]) => ({ id, ...f }));
}
