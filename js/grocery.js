// Builds the combined, scaled shopping list for the week's dishes.
import { INGREDIENTS, AISLES, BASE_SERVINGS } from './data.js';
import { planRecipes } from './planner.js';
import { HABITS, WEEKLY_STAPLES } from '../data/shopping-habits.js';
import { kindOf, youtubeUrl } from './data.js';

// How much to scale each recipe: meals per dish × everyone's portion size.
export function scaleFactor(state) {
  const portions = state.people.reduce((s, p) => s + p.portion, 0);
  return (state.rules.mealsPerDish * portions) / BASE_SERVINGS;
}

export function isPantry(state, id) {
  return state.pantry[id] ?? !!INGREDIENTS[id]?.pantry;
}

const roundUp = (x, step) => Math.ceil(x / step - 1e-9) * step;
// Counted items: 2.1 onions -> 2, 2.3 -> 3.
const countUp = (x) => Math.max(1, Math.ceil(x - 0.15));

export function formatQty(ing, qty) {
  switch (ing.unit) {
    case 'g':
    case 'ml': {
      const big = ing.unit === 'g' ? 'kg' : 'L';
      if (qty >= 1000) return { amount: Math.round(qty / 100) / 10, unit: big };
      return { amount: qty < 50 ? roundUp(qty, 5) : roundUp(qty, 10), unit: ing.unit };
    }
    case 'can': { const n = countUp(qty); return { amount: n, unit: n === 1 ? 'tin' : 'tins' }; }
    case 'bunch': { const n = countUp(qty); return { amount: n, unit: n === 1 ? 'bunch' : 'bunches' }; }
    case 'clove': { const n = countUp(qty); return { amount: n, unit: `cloves (~${Math.ceil(n / 10)} bulb${n > 10 ? 's' : ''})` }; }
    case 'sprig': { const n = countUp(qty); return { amount: n, unit: n === 1 ? 'sprig' : 'sprigs' }; }
    case 'tsp': return { amount: Math.max(0.5, Math.round(qty * 2) / 2), unit: 'tsp' };
    default: return { amount: countUp(qty), unit: '' };
  }
}

export function qtyText({ amount, unit }) {
  return unit ? `${amount} ${unit}` : `× ${amount}`;
}

export function buildGrocery(state) {
  const factor = scaleFactor(state);
  const totals = new Map();
  for (const r of planRecipes(state)) {
    for (const { id, qty } of r.items) {
      const t = totals.get(id) || { id, qty: 0, dishes: [] };
      t.qty += qty * factor;
      t.dishes.push(r.name);
      totals.set(id, t);
    }
  }
  const aisleOrder = Object.keys(AISLES);
  const rows = [...totals.values()].map((t) => {
    const ing = INGREDIENTS[t.id];
    const q = formatQty(ing, t.qty);
    return {
      key: t.id, id: t.id, name: ing.name, aisle: ing.aisle, aisleLabel: AISLES[ing.aisle],
      amount: q.amount, unit: q.unit, text: HABITS[t.id] ? `usually ${HABITS[t.id]}` : qtyText(q), dishes: t.dishes,
      pantry: isPantry(state, t.id), checked: !!state.checked[t.id], bought: state.bought[t.id] || '',
    };
  });
  WEEKLY_STAPLES.forEach((name, i) => {
    const key = `w:${i}`;
    rows.push({
      key, id: null, name, aisle: 'extra', aisleLabel: 'Every week', amount: '', unit: '', text: '', dishes: [],
      pantry: false, checked: !!state.checked[key], bought: state.bought[key] || '', staple: true,
    });
  });
  for (const x of state.extras) {
    rows.push({
      key: `x:${x.id}`, id: null, extraId: x.id, name: x.name, aisle: 'extra', aisleLabel: 'Added by you',
      amount: '', unit: '', text: '', dishes: [], pantry: false, checked: !!state.checked[`x:${x.id}`], bought: state.bought[`x:${x.id}`] || '',
    });
  }
  const order = (a) => (a === 'extra' ? -1 : aisleOrder.indexOf(a));
  rows.sort((a, b) => order(a.aisle) - order(b.aisle) || a.name.localeCompare(b.name));

  const group = (list) => {
    const out = [];
    for (const row of list) {
      let g = out[out.length - 1];
      if (!g || g.aisle !== row.aisle) out.push(g = { aisle: row.aisle, label: row.aisleLabel, items: [] });
      g.items.push(row);
    }
    return out;
  };
  const shop = rows.filter((r) => !r.pantry);
  const pantry = rows.filter((r) => r.pantry);
  return { factor, shop, pantry, shopGroups: group(shop), pantryGroups: group(pantry) };
}

export function groceryText(state, { amounts = false } = {}) {
  const { shopGroups } = buildGrocery(state);
  return shopGroups.map((g) => `${g.label.toUpperCase()}\n` + g.items
    .filter((i) => !i.checked)
    .map((i) => `☐ ${i.name}${amounts && i.text ? ' — ' + i.text : ''}`).join('\n')).join('\n\n');
}

// One note with the week's dishes and the shopping list — for Google Keep / Notes.
export function weeklyNoteText(state, { amounts = false } = {}) {
  const recipes = planRecipes(state);
  const line = (r) => `• ${r.name} (${r.cuisine}, ${r.time} min)\n  Recipe: ${youtubeUrl(r)}`;
  const chicken = recipes.filter((r) => kindOf(r, state.rules.eggsCountAsVeg) === 'chicken');
  const veg = recipes.filter((r) => kindOf(r, state.rules.eggsCountAsVeg) === 'veg');
  return [
    'THIS WEEK',
    ...(chicken.length ? ['Chicken & turkey:', ...chicken.map(line)] : []),
    ...(veg.length ? ['Veg:', ...veg.map(line)] : []),
    '',
    'GROCERIES',
    groceryText(state, { amounts }),
  ].join('\n');
}
