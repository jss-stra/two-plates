// Picks the week's mix of chicken and veg dishes and works out per-person nutrition.
import { RECIPES, RECIPE_BY_ID, isVeg, kindOf, hasExclusions } from './data.js';

const isIndianVeg = (r, rules) => r.group === 'Indian' && isVeg(r, rules.eggsCountAsVeg);
const kindFilter = (kind, rules) => (kind === 'veg'
  ? (r) => isVeg(r, rules.eggsCountAsVeg)
  : (r) => r.diet === 'nonveg');

// A manual import occupies the plan position the user replaced. This is
// quota bookkeeping only, never a dietary classification or filter clearance.
export const slotKind = (slot, recipe, rules) => recipe?.imported && ['veg', 'chicken'].includes(slot.planKind)
  ? slot.planKind : kindOf(recipe, rules.eggsCountAsVeg);

export const targetDishes = (rules) => rules.chickenDishes + rules.vegDishes;

export function planRecipes(state) {
  return state.plan.slots.map((s) => RECIPE_BY_ID[s.id]).filter(Boolean);
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

const sortSlots = (slots, rules) => slots.sort((a, b) =>
  (kindOf(RECIPE_BY_ID[a.id], rules.eggsCountAsVeg) === 'chicken' ? 0 : 1)
  - (kindOf(RECIPE_BY_ID[b.id], rules.eggsCountAsVeg) === 'chicken' ? 0 : 1));

// Fills the week up to the chicken/veg counts, keeping locked dishes.
export function generateSlots(state, { keepLocked = true } = {}) {
  const { rules } = state;
  const counts = { chicken: 0, veg: 0 };
  const kept = [];
  for (const s of state.plan.slots) {
    const r = RECIPE_BY_ID[s.id];
    if (!keepLocked || !s.locked || !r) continue;
    const k = slotKind(s, r, rules);
    const max = k === 'veg' ? rules.vegDishes : rules.chickenDishes;
    if (counts[k] < max) { kept.push(s); counts[k]++; }
  }
  const chosen = kept.map((s) => RECIPE_BY_ID[s.id]);
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
  return sortSlots(kept, rules);
}

// Candidates for swapping one slot: best first, taking turns between cuisines
// so the list isn't six Italian dishes in a row.
export function alternatives(state, index, { kind = null, group = null, query = '' } = {}) {
  const others = planRecipes(state).filter((_, i) => i !== index);
  const taken = new Set(state.plan.slots.map((s) => s.id));
  const q = query.trim().toLowerCase();
  const ofKind = kind ? kindFilter(kind, state.rules) : () => true;
  const ranked = RECIPES
    .filter((r) => !taken.has(r.id) && !state.hidden.includes(r.id) && !hasExclusions(r, state.exclusions) && ofKind(r)
      && (!group || r.group === group)
      && (!q || r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)))
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

// Per-person nutrition for one meal of a dish. Null when the dish's macros are
// unknown - callers must render "unknown", never a number.
export function mealFor(recipe, person) {
  if (recipe.protein == null || recipe.kcal == null) return { protein: null, kcal: null };
  return { protein: Math.round(recipe.protein * person.portion), kcal: Math.round(recipe.kcal * person.portion) };
}

// The daily target minus shake/breakfast/snacks, split across the planned meals.
export function perMealGoal(person, rules) {
  const meals = rules.mealsPerDish;
  return {
    min: Math.max(0, Math.round((person.proteinMin - person.outsideProtein) / meals)),
    max: Math.max(0, Math.round((person.proteinMax - person.outsideProtein) / meals)),
  };
}

// Estimated average day: outside-the-plan intake + planned meals.
export function dailyEstimate(state) {
  const recipes = planRecipes(state);
  const meals = state.rules.mealsPerDish;
  return state.people.map((p) => {
    if (!recipes.length) return { person: p, protein: p.outsideProtein, kcal: p.outsideKcal };
    // No imputation: when any planned dish has unknown nutrition the day
    // estimate is unavailable - never fabricated from averages of other dishes.
    const unknownCount = recipes.filter((r) => r.protein == null || r.kcal == null).length;
    if (unknownCount) return { person: p, protein: null, kcal: null, unavailable: true, unknownCount };
    const avgP = recipes.reduce((s, r) => s + r.protein, 0) / recipes.length;
    const avgK = recipes.reduce((s, r) => s + r.kcal, 0) / recipes.length;
    return {
      person: p,
      protein: Math.round(p.outsideProtein + meals * avgP * p.portion),
      kcal: Math.round(p.outsideKcal + meals * avgK * p.portion),
    };
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
