// Picks the week's dishes and works out per-person nutrition.
import { RECIPES, RECIPE_BY_ID, isVeg } from './data.js';

const isIndianVeg = (r, rules) => r.group === 'Indian' && isVeg(r, rules.eggsCountAsVeg);

export function planRecipes(state) {
  return state.plan.slots.map((s) => RECIPE_BY_ID[s.id]).filter(Boolean);
}

function eligible(state, r) {
  const { rules } = state;
  return !state.hidden.includes(r.id)
    && r.protein >= rules.minProtein
    && (rules.cuisineWeights[r.group] ?? 1) > 0;
}

function recentIds(state) {
  return new Set(state.history.slice(-2).flatMap((h) => h.ids));
}

// Higher = more likely to be picked. Balances cuisine preference, favourites,
// variety within the week, and protein density.
export function score(state, r, chosen, recent = recentIds(state)) {
  const { rules } = state;
  let w = rules.cuisineWeights[r.group] ?? 1;
  if (w <= 0) return 0;
  if (state.favourites.includes(r.id)) w *= 3;
  if (recent.has(r.id)) w *= 0.15;
  const sameGroup = chosen.filter((c) => c.group === r.group).length;
  w *= 0.3 ** sameGroup;
  const sameProtein = chosen.filter((c) => c.mainProtein === r.mainProtein).length;
  if (sameProtein >= rules.maxSameProtein) return 0;
  w *= 0.6 ** sameProtein;
  const proteinShare = (r.protein * 4) / r.kcal; // share of calories from protein
  w *= Math.min(1.6, Math.max(0.6, proteinShare / 0.28));
  return w;
}

function weightedPick(cands, weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  if (total <= 0) return cands[Math.floor(Math.random() * cands.length)];
  let x = Math.random() * total;
  for (let i = 0; i < cands.length; i++) { x -= weights[i]; if (x <= 0) return cands[i]; }
  return cands[cands.length - 1];
}

function pickOne(state, chosen, filter, longLeft) {
  const { rules } = state;
  const recent = recentIds(state);
  const taken = new Set(chosen.map((c) => c.id));
  const base = RECIPES.filter((r) => eligible(state, r) && !taken.has(r.id)
    && (r.time <= rules.maxTime || longLeft > 0));
  // Once the veg quota is met, lean towards non-veg so the week isn't mostly veg.
  const vegMet = chosen.filter((c) => isVeg(c, rules.eggsCountAsVeg)).length >= rules.vegDishes;
  const bias = (r) => (vegMet && isVeg(r, rules.eggsCountAsVeg) ? 0.3 : 1)
    // Long cooks only when nothing else fits as well.
    * (r.time > rules.maxTime ? 0.5 : 1);
  for (const f of [filter, () => true]) {
    const cands = base.filter(f);
    const weights = cands.map((r) => score(state, r, chosen, recent) * bias(r));
    if (cands.length && weights.some((w) => w > 0)) return weightedPick(cands, weights);
  }
  return base[0];
}

// Fills every unlocked slot (or all slots when keepLocked is false).
export function generateSlots(state, { keepLocked = true } = {}) {
  const { rules } = state;
  const n = rules.dishes;
  const old = state.plan.slots.slice(0, n);
  const slots = Array.from({ length: n }, (_, i) =>
    keepLocked && old[i]?.locked && RECIPE_BY_ID[old[i].id] ? old[i] : null);
  const chosen = slots.filter(Boolean).map((s) => RECIPE_BY_ID[s.id]);

  let needIndianVeg = Math.max(0, rules.indianVeg - chosen.filter((r) => isIndianVeg(r, rules)).length);
  let needVeg = Math.max(0, rules.vegDishes - chosen.filter((r) => isVeg(r, rules.eggsCountAsVeg)).length);
  let longLeft = rules.longPerWeek - chosen.filter((r) => r.time > rules.maxTime).length;

  const fresh = [];
  for (let i = 0; i < n; i++) {
    if (slots[i]) continue;
    let filter;
    if (needIndianVeg > 0) { filter = (r) => isIndianVeg(r, rules); needIndianVeg--; needVeg--; }
    else if (needVeg > 0) { filter = (r) => isVeg(r, rules.eggsCountAsVeg); needVeg--; }
    else filter = (r) => !isIndianVeg(r, rules) || rules.indianVeg === 0;
    const r = pickOne(state, chosen, filter, longLeft);
    if (!r) break;
    if (r.time > rules.maxTime) longLeft--;
    chosen.push(r);
    fresh.push(r);
  }

  // Spread the new picks across the open days so veg dishes don't always come first.
  fresh.sort(() => Math.random() - 0.5);
  return slots.map((s) => s || (fresh.length ? { id: fresh.pop().id, locked: false } : null)).filter(Boolean);
}

// Candidates for swapping one slot: best first, taking turns between cuisines
// so the list isn't six Italian dishes in a row.
export function alternatives(state, index, { group = null, vegOnly = false, query = '' } = {}) {
  const others = planRecipes(state).filter((_, i) => i !== index);
  const taken = new Set(state.plan.slots.map((s) => s.id));
  const q = query.trim().toLowerCase();
  const ranked = RECIPES
    .filter((r) => !taken.has(r.id) && !state.hidden.includes(r.id)
      && (!group || r.group === group)
      && (!vegOnly || isVeg(r, state.rules.eggsCountAsVeg))
      && (!q || r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)))
    .map((r) => ({ r, w: score(state, r, others) + (r.protein >= state.rules.minProtein ? 0.01 : 0) }))
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

// A random replacement that keeps the week's veg rules satisfied.
export function randomSwap(state, index) {
  const { rules } = state;
  const current = RECIPE_BY_ID[state.plan.slots[index]?.id];
  const others = planRecipes(state).filter((_, i) => i !== index);
  let filter = () => true;
  if (current && isIndianVeg(current, rules)
    && others.filter((r) => isIndianVeg(r, rules)).length < rules.indianVeg) filter = (r) => isIndianVeg(r, rules);
  else if (current && isVeg(current, rules.eggsCountAsVeg)
    && others.filter((r) => isVeg(r, rules.eggsCountAsVeg)).length < rules.vegDishes) filter = (r) => isVeg(r, rules.eggsCountAsVeg);
  const longLeft = rules.longPerWeek - others.filter((r) => r.time > rules.maxTime).length;
  const withoutCurrent = { ...state, hidden: [...state.hidden, current?.id].filter(Boolean) };
  return pickOne(withoutCurrent, others, filter, longLeft);
}

// Per-person nutrition for one meal of a dish.
export function mealFor(recipe, person) {
  return { protein: Math.round(recipe.protein * person.portion), kcal: Math.round(recipe.kcal * person.portion) };
}

// Estimated average day on a planned day: outside-the-plan intake + planned meals.
export function dailyEstimate(state) {
  const recipes = planRecipes(state);
  const meals = state.rules.mealsPerDish;
  return state.people.map((p) => {
    if (!recipes.length) return { person: p, protein: p.outsideProtein, kcal: p.outsideKcal };
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

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export function dayLabel(startDay, i, mealsPerDish) {
  const dinner = DAYS[(startDay + i) % 7];
  return mealsPerDish >= 2 ? `${dinner} dinner · ${DAYS[(startDay + i + 1) % 7]} lunch` : `${dinner} dinner`;
}
