// Picks the week's mix of chicken and veg dishes and works out per-person nutrition.
import { RECIPES, RECIPE_BY_ID, INGREDIENTS, isVeg, kindOf, hasExclusions } from './data.js';
import { dishById } from './custom.js';
import { outsideOf } from './fixed-meals.js';

const isIndianVeg = (r, rules) => r.group === 'Indian' && isVeg(r, rules.eggsCountAsVeg);
const kindFilter = (kind, rules) => (kind === 'veg'
  ? (r) => isVeg(r, rules.eggsCountAsVeg)
  : (r) => r.diet === 'nonveg');

// A manual import or your own dish occupies the plan position the user
// replaced. This is quota bookkeeping only, never a dietary classification or
// filter clearance.
export const slotKind = (slot, recipe, rules) => (recipe?.imported || recipe?.custom) && ['veg', 'chicken'].includes(slot.planKind)
  ? slot.planKind : kindOf(recipe, rules.eggsCountAsVeg);

export const targetDishes = (rules) => rules.chickenDishes + rules.vegDishes;

export function planRecipes(state) {
  return state.plan.slots.map((s) => dishById(state, s.id)).filter(Boolean);
}

// Average of both people's stars, or null if nobody has rated it.
export function ratingOf(state, id) {
  const vals = (state.ratings[id]?.r || []).filter(Boolean);
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
}

function ratingWeight(state, r) {
  const avg = ratingOf(state, r.id);
  if (avg === null) return r.regular ? 2 : 1;
  if (avg >= 4.5) return 3;
  if (avg >= 3.5) return 1.8;
  if (avg >= 2.5) return 1;
  if (avg >= 1.5) return 0.3;
  return 0.05;
}

function eligible(state, r) {
  const { rules } = state;
  return !state.hidden.includes(r.id)
    && !hasExclusions(r, state.exclusions)
    // Unknown nutrition can't satisfy a numeric band, including 0: only a
    // finite protein value may pass minProtein (null >= 0 is true in JS), so
    // auto-planning never quietly promises protein it can't verify. The dish
    // stays manually addable from the dish picker, with its unknown marker.
    // Your own dishes are never auto-picked either: they enter the week only
    // when you search for them and choose them yourself.
    && Number.isFinite(r.protein) && r.protein >= rules.minProtein
    && (rules.cuisineWeights[r.group] ?? 1) > 0;
}

function recentIds(state) {
  return new Set(state.history.slice(-2).flatMap((h) => h.ids));
}

// Higher = more likely to be picked. Balances cuisine preference, your ratings,
// variety within the week, and protein density.
export function score(state, r, chosen, recent = recentIds(state)) {
  const { rules } = state;
  let w = rules.cuisineWeights[r.group] ?? 1;
  if (w <= 0) return 0;
  w *= ratingWeight(state, r);
  if (recent.has(r.id)) w *= 0.15;
  const sameGroup = chosen.filter((c) => c.group === r.group).length;
  w *= 0.3 ** sameGroup;
  const sameProtein = chosen.filter((c) => c.mainProtein === r.mainProtein).length;
  if (r.mainProtein !== 'chicken' && sameProtein >= rules.maxSameProtein) return 0;
  w *= r.mainProtein === 'chicken' ? 1 : 0.6 ** sameProtein;
  if (r.protein != null && r.kcal != null && r.kcal > 0) {
    const proteinShare = (r.protein * 4) / r.kcal; // share of calories from protein
    w *= Math.min(1.6, Math.max(0.6, proteinShare / 0.28));
  } // unknown nutrition: no protein-share nudge either way
  return w;
}

function weightedPick(cands, weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  if (total <= 0) return cands[Math.floor(Math.random() * cands.length)];
  let x = Math.random() * total;
  for (let i = 0; i < cands.length; i++) { x -= weights[i]; if (x <= 0) return cands[i]; }
  return cands[cands.length - 1];
}

function pickOne(state, chosen, filters, longLeft) {
  const { rules } = state;
  const recent = recentIds(state);
  const taken = new Set(chosen.map((c) => c.id));
  const base = RECIPES.filter((r) => eligible(state, r) && !taken.has(r.id)
    && (r.time <= rules.maxTime || longLeft > 0));
  // Long cooks only when nothing else fits as well.
  const bias = (r) => (r.time > rules.maxTime ? 0.5 : 1);
  for (const f of filters) {
    const cands = base.filter(f);
    const weights = cands.map((r) => score(state, r, chosen, recent) * bias(r));
    if (cands.length && weights.some((w) => w > 0)) return weightedPick(cands, weights);
  }
  return null;
}

const sortSlots = (slots, rules, state) => slots.sort((a, b) =>
  (kindOf(dishById(state, a.id), rules.eggsCountAsVeg) === 'chicken' ? 0 : 1)
  - (kindOf(dishById(state, b.id), rules.eggsCountAsVeg) === 'chicken' ? 0 : 1));

// Fills the week up to the chicken/veg counts, keeping locked dishes.
export function generateSlots(state, { keepLocked = true } = {}) {
  const { rules } = state;
  const counts = { chicken: 0, veg: 0 };
  const kept = [];
  for (const s of state.plan.slots) {
    const r = dishById(state, s.id);
    if (!keepLocked || !s.locked || !r) continue;
    const k = slotKind(s, r, rules);
    const max = k === 'veg' ? rules.vegDishes : rules.chickenDishes;
    if (counts[k] < max) { kept.push(s); counts[k]++; }
  }
  const chosen = kept.map((s) => dishById(state, s.id));
  let longLeft = rules.longPerWeek - chosen.filter((r) => r.time > rules.maxTime).length;
  let needIndianVeg = Math.max(0, Math.min(rules.indianVeg, rules.vegDishes)
    - chosen.filter((r) => isIndianVeg(r, rules)).length);

  const add = (r) => {
    if (!r) return;
    if (r.time > rules.maxTime) longLeft--;
    chosen.push(r);
    kept.push({ id: r.id, locked: false });
  };
  for (let i = counts.veg; i < rules.vegDishes; i++) {
    const veg = kindFilter('veg', rules);
    const filters = needIndianVeg > 0 ? [(r) => isIndianVeg(r, rules), veg] : [(r) => veg(r) && r.group !== 'Indian', veg];
    if (needIndianVeg > 0) needIndianVeg--;
    add(pickOne(state, chosen, filters, longLeft));
  }
  for (let i = counts.chicken; i < rules.chickenDishes; i++) {
    add(pickOne(state, chosen, [kindFilter('chicken', rules)], longLeft));
  }
  return arrangeDays(state, sortSlots(kept, rules, state));
}

// Swipe-left on a week card: take the dish out of the week and drop the
// matching chicken/veg target with it, so Shuffle doesn't refill the gap.
// Unknown-diet custom dishes never filled a target, so none moves for them.
export function removeSlot(state, index) {
  const slot = state.plan.slots[index];
  if (!slot) return null;
  const r = dishById(state, slot.id);
  const k = r ? slotKind(slot, r, state.rules) : null;
  state.plan.slots.splice(index, 1);
  if (k === 'veg' && state.rules.vegDishes > 0) state.rules.vegDishes--;
  if (k === 'chicken' && state.rules.chickenDishes > 0) state.rules.chickenDishes--;
  return r;
}

// Candidates for swapping one slot (pass index null/-1 for a week-level
// search that isn't replacing a specific slot yet): best first, taking turns
// between cuisines so the list isn't six Italian dishes in a row.
export function alternatives(state, index, { kind = null, group = null, query = '' } = {}) {
  const others = planRecipes(state).filter((_, i) => i !== index);
  const taken = new Set(state.plan.slots.map((s) => s.id));
  const q = query.trim().toLowerCase();
  const ofKind = kind ? kindFilter(kind, state.rules) : () => true;
  // Matches name, cuisine or any listed ingredient - same reach as the
  // Recipes tab search, so "paneer" finds Saag Paneer too.
  const matches = (r) => !q || r.name.toLowerCase().includes(q) || (r.cuisine || '').toLowerCase().includes(q)
    || (r.items || []).some((it) => INGREDIENTS[it.id]?.name.toLowerCase().includes(q));
  const ranked = RECIPES
    .filter((r) => !taken.has(r.id) && !state.hidden.includes(r.id) && !hasExclusions(r, state.exclusions) && ofKind(r)
      && (!group || r.group === group)
      && matches(r))
    .map((r) => ({ r, w: score(state, r, others) + (r.protein != null && r.protein >= state.rules.minProtein ? 0.01 : 0) }))
    .sort((a, b) => b.w - a.w)
    .map((x) => x.r);
  const queues = new Map();
  for (const r of ranked) (queues.get(r.group) || queues.set(r.group, []).get(r.group)).push(r);
  const out = [];
  while (out.length < ranked.length) {
    for (const qu of queues.values()) if (qu.length) out.push(qu.shift());
  }
  return out;
}

// A random replacement of the same kind that keeps the Indian-veg rule satisfied.
export function randomSwap(state, index) {
  const { rules } = state;
  const current = RECIPE_BY_ID[state.plan.slots[index]?.id];
  if (!current) return null;
  const others = planRecipes(state).filter((_, i) => i !== index);
  const kind = kindOf(current, rules.eggsCountAsVeg);
  let filters = [kindFilter(kind, rules)];
  if (isIndianVeg(current, rules) && others.filter((r) => isIndianVeg(r, rules)).length < rules.indianVeg) {
    filters = [(r) => isIndianVeg(r, rules), ...filters];
  }
  const longLeft = rules.longPerWeek - others.filter((r) => r.time > rules.maxTime).length;
  const withoutCurrent = { ...state, hidden: [...state.hidden, current.id] };
  return pickOne(withoutCurrent, others, filters, longLeft);
}

// How many standard servings one person eats per meal of a dish. With auto
// portions on (the default) it's sized so the dish lands in the middle of the
// person's per-meal protein goal, in quarter servings between 0.5 and 2.5;
// otherwise, or when the dish's protein is unknown, it's their portion slider.
export function portionFor(person, recipe, rules) {
  const manual = Number(person?.portion) || 1;
  if (!rules || rules.autoPortion === false || !(recipe?.protein > 0)) return manual;
  const g = perMealGoal(person, rules);
  const target = (g.min + g.max) / 2;
  if (!(target > 0)) return manual;
  return Math.min(2.5, Math.max(0.5, Math.round((target / recipe.protein) * 4) / 4));
}

// Per-person nutrition for one meal of a dish. Null when the dish's macros are
// unknown - callers must render "unknown", never a number.
export function mealFor(recipe, person, rules) {
  const portion = portionFor(person, recipe, rules);
  if (recipe.protein == null || recipe.kcal == null) return { portion, protein: null, kcal: null, carbs: null, fibre: null };
  const x = (v) => (v == null ? null : Math.round(v * portion));
  return { portion, protein: x(recipe.protein), kcal: x(recipe.kcal), carbs: x(recipe.carbs), fibre: x(recipe.fibre) };
}

// The daily target minus shake/breakfast/snacks, split across the planned meals.
export function perMealGoal(person, rules) {
  const meals = rules.mealsPerDish;
  return {
    min: Math.max(0, Math.round((person.proteinMin - outsideOf(person).protein) / meals)),
    max: Math.max(0, Math.round((person.proteinMax - outsideOf(person).protein) / meals)),
  };
}

// Estimated average day: outside-the-plan intake + planned meals, each dish at
// that person's portion. Carbs and fibre are null when anything feeding them is
// unknown (typed outside numbers carry none) - never filled in with a guess.
export function dailyEstimate(state) {
  const recipes = planRecipes(state);
  const meals = state.rules.mealsPerDish;
  return state.people.map((p) => {
    const out = outsideOf(p);
    if (!recipes.length) return { person: p, protein: out.protein, kcal: out.kcal, carbs: out.carbs, fibre: out.fibre };
    // No imputation: when any planned dish has unknown nutrition the day
    // estimate is unavailable - never fabricated from averages of other dishes.
    const unknownCount = recipes.filter((r) => r.protein == null || r.kcal == null).length;
    if (unknownCount) return { person: p, protein: null, kcal: null, carbs: null, fibre: null, unavailable: true, unknownCount };
    const ms = recipes.map((r) => mealFor(r, p, state.rules));
    const avg = (k) => (ms.some((m) => m[k] == null) ? null : ms.reduce((a, m) => a + m[k], 0) / ms.length);
    const day = (k) => { const a = avg(k); return a == null || out[k] == null ? null : Math.round(out[k] + meals * a); };
    return { person: p, protein: day('protein'), kcal: day('kcal'), carbs: day('carbs'), fibre: day('fibre') };
  });
}

// Upcoming start-of-week date (today if today is the start day).
export function weekStart(startDay, from = new Date()) {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const todayIdx = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() + ((startDay - todayIdx + 7) % 7));
  // Local date, not toISOString() — that would shift a day in Sydney's UTC+10/11.
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Most recent start-of-week date (startDay) on or before `from`.
export function currentWeekStart(startDay, from = new Date()) {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const todayIdx = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - ((todayIdx - startDay + 7) % 7));
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// How a plan week relates to today: 'this' | 'next' | 'later' | 'past'.
// After "Finish week" the new plan is usually next week's, so screens must not
// call every plan "This week". ISO dates compare correctly as strings.
export function weekRelation(weekOf, startDay, from = new Date()) {
  if (!weekOf) return 'this';
  const cur = currentWeekStart(startDay, from);
  if (weekOf === cur) return 'this';
  if (weekOf < cur) return 'past';
  const nxt = new Date(`${cur}T12:00:00`);
  nxt.setDate(nxt.getDate() + 7);
  return weekOf === localISO(nxt) ? 'next' : 'later';
}

// "Mon 10 – Sun 16 Nov" for the week starting on `weekOf`.
export function weekRangeLabel(weekOf) {
  if (!weekOf) return '';
  const start = new Date(`${weekOf}T12:00:00`);
  const end = new Date(`${weekOf}T12:00:00`);
  end.setDate(end.getDate() + 6);
  // Composed by hand: en-AU's built-in format adds a comma ("Sun, 15 Nov").
  const wd = (d) => d.toLocaleDateString('en-AU', { weekday: 'short' });
  const mo = (d) => d.toLocaleDateString('en-AU', { month: 'short' });
  const fmt = (d, month) => `${wd(d)} ${d.getDate()}${month ? ` ${mo(d)}` : ''}`;
  return `${fmt(start, start.getMonth() !== end.getMonth())} – ${fmt(end, true)}`;
}

// 'YYYY-MM-DD' in local time.
export function localISO(d = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// The week's dishes that were planned around a given date (this week, or a saved week).
export function plannedFor(state, iso) {
  const inWeek = (weekOf) => {
    if (!weekOf) return false;
    const start = new Date(`${weekOf}T00:00:00`);
    start.setDate(start.getDate() - 2); // weeks are often planned and started the weekend before
    const end = new Date(`${weekOf}T00:00:00`);
    end.setDate(end.getDate() + 7);
    const day = new Date(`${iso}T12:00:00`);
    return day >= start && day < end;
  };
  const past = [...state.history].reverse().find((h) => inWeek(h.weekOf));
  if (past && !inWeek(state.plan.weekOf)) return past.ids;
  return state.plan.slots.map((x) => x.id);
}

// ---------- Days of the week ----------
// The week runs from plan.weekOf for 7 days. Each dish is cooked on its day
// for dinner and also covers the next day's lunch (cook once, eat twice).
export const WEEK_DAYS = 7;

export function dayISO(weekOf, i) {
  const d = new Date(`${weekOf}T12:00:00`);
  d.setDate(d.getDate() + i);
  return localISO(d);
}
export const isWeekendISO = (iso) => { const g = new Date(`${iso}T12:00:00`).getDay(); return g === 0 || g === 6; };

// Weekend rule: on Saturday and Sunday exactly one of the day's two meals
// (lunch from the day before, dinner from that day) is non-veg. kinds[i] is
// the kind of day i's dish ('chicken' | 'veg' | 'unknown') or null for none.
// Returns how far the arrangement is from the rule (0 = met).
export function weekendMisses(kinds, weekOf) {
  // An all-veg week has no non-veg meal to place, so the rule doesn't apply.
  if (!kinds.includes('chicken')) return 0;
  let miss = 0;
  for (let i = 0; i < WEEK_DAYS; i++) {
    if (!isWeekendISO(dayISO(weekOf, i))) continue;
    const meals = [i > 0 ? kinds[i - 1] : null, kinds[i]].filter(Boolean);
    const nonveg = meals.filter((k) => k === 'chicken').length;
    miss += meals.length === 2 ? Math.abs(nonveg - 1) : Math.max(0, nonveg - 1);
  }
  return miss;
}

// Gives every slot a day (0-6) and returns them in day order. A dish you
// pinned to a day, or locked, keeps its day. The rest are placed to meet the
// weekend rule first, then to stay where they were (so a swap doesn't reshuffle
// the week), keep long cooks on the weekend, and avoid three of a kind in a row.
export function arrangeDays(state, slots = state.plan.slots) {
  const weekOf = state.plan.weekOf || weekStart(state.rules.startDay ?? 0);
  const kindOfSlot = (x) => { const r = dishById(state, x.id); return r ? slotKind(x, r, state.rules) : 'unknown'; };
  const fixed = new Array(WEEK_DAYS).fill(null);
  const free = [];
  for (const x of slots) {
    const d = x.day;
    if ((x.pinned || x.locked) && Number.isInteger(d) && d >= 0 && d < WEEK_DAYS && !fixed[d]) fixed[d] = x;
    else free.push(x);
  }
  const open = [...Array(WEEK_DAYS).keys()].filter((d) => !fixed[d]);
  const movable = free.slice(0, open.length);
  const overflow = free.slice(open.length);
  const weekend = [...Array(WEEK_DAYS).keys()].map((d) => isWeekendISO(dayISO(weekOf, d)));
  const kinds = new Map(slots.map((x) => [x, kindOfSlot(x)]));
  const long = new Map(slots.map((x) => [x, (dishById(state, x.id)?.time || 0) > state.rules.maxTime]));
  const cur = [...fixed];
  const cost = () => {
    const k = cur.map((x) => (x ? kinds.get(x) : null));
    let c = weekendMisses(k, weekOf) * 100;
    for (let d = 0; d < WEEK_DAYS; d++) {
      const x = cur[d];
      if (!x) continue;
      if (Number.isInteger(x.day) && x.day !== d) c += 3;
      if (long.get(x) && !weekend[d]) c += 2;
      if (d >= 2 && k[d] && k[d] === k[d - 1] && k[d] === k[d - 2]) c += 1;
    }
    return c;
  };
  let best = null;
  let bestCost = Infinity;
  const used = new Array(open.length).fill(false);
  const place = (i) => {
    if (bestCost === 0) return;
    if (i === movable.length) {
      const c = cost();
      if (c < bestCost) { bestCost = c; best = [...cur]; }
      return;
    }
    for (let j = 0; j < open.length; j++) {
      if (used[j]) continue;
      used[j] = true; cur[open[j]] = movable[i];
      place(i + 1);
      used[j] = false; cur[open[j]] = null;
    }
  };
  place(0);
  const out = [];
  (best || cur).forEach((x, d) => { if (x) out.push({ ...x, day: d }); });
  for (const x of overflow) { const { day, ...rest } = x; out.push(rest); }
  return out;
}

// Which planned dishes feed a date: lunch is the previous day's dish, dinner
// that day's. Only for the current plan's week; null where nothing is planned.
export function plannedOnDay(state, iso) {
  const weekOf = state.plan.weekOf;
  if (!weekOf) return { lunch: null, dinner: null };
  const start = new Date(`${weekOf}T12:00:00`);
  const idx = Math.round((new Date(`${iso}T12:00:00`) - start) / 86400000);
  const at = (d) => state.plan.slots.find((x) => x.day === d)?.id || null;
  if (idx < 0 || idx > WEEK_DAYS) return { lunch: null, dinner: null };
  return { lunch: idx > 0 ? at(idx - 1) : null, dinner: idx < WEEK_DAYS ? at(idx) : null };
}

// "Cook from what we have": dishes ranked by how much of what's at home they
// use. Only real ingredients count (not spices or pantry basics like oil), a
// dish must use at least one of them, and using a protein you have (paneer,
// chicken, dal...) ranks it higher. Hidden and excluded dishes are left out.
// Forms of the same food you'd swap in without thinking twice.
const KIN = [
  ['spinach', 'frozen_spinach'], ['tomato', 'cherry_tomatoes', 'diced_tomatoes', 'passata'],
  ['onion', 'red_onion', 'shallot'], ['chicken_breast', 'chicken_thigh'], ['chickpeas', 'kala_chana'],
  ['tofu', 'silken_tofu'], ['basmati', 'jasmine', 'brown_rice'], ['red_lentils', 'lentils_can'],
  ['peas', 'snow_peas'], ['capsicum', 'roasted_capsicum'], ['wraps', 'tortillas', 'lebanese_bread'],
  ['cauliflower', 'cauli_rice'], ['lime', 'lemon'],
];
export function cookFrom(state, have) {
  const want = new Set(have);
  for (const group of KIN) if (group.some((id) => want.has(id))) group.forEach((id) => want.add(id));
  const counts = (id) => INGREDIENTS[id] && INGREDIENTS[id].aisle !== 'spices' && !INGREDIENTS[id].pantry;
  return RECIPES
    .filter((r) => !state.hidden.includes(r.id) && !hasExclusions(r, state.exclusions))
    .map((r) => {
      const real = [...new Set(r.items.map((it) => it.id).filter(counts))];
      const used = real.filter((id) => want.has(id));
      const protein = used.some((id) => INGREDIENTS[id].src);
      return { r, used, missing: real.filter((id) => !want.has(id)), score: (protein ? 10 : 0) + used.length * 2 + used.length / Math.max(1, real.length) };
    })
    .filter((x) => x.used.length)
    .sort((a, b) => b.score - a.score || (b.r.protein ?? 0) - (a.r.protein ?? 0));
}
