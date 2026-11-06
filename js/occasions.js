// Parties are separate from the weekly plan. Catalog quantities are per four servings.
import { RECIPE_BY_ID, BASE_SERVINGS, INGREDIENTS, AISLES } from './data.js';
export const uid = () => crypto.randomUUID();
export const categories = ['Drinks', 'Snacks & breakfast', 'Fruit & food', 'Household', 'Other'];
export function occasionTotals(state) {
  const totals = new Map();
  for (const party of state.occasions || []) {
    if (!party.active) continue;
    for (const dish of party.dishes || []) {
      const recipe = RECIPE_BY_ID[dish.recipeId];
      if (!recipe) continue;
      const servings = Number(dish.servings) || Number(party.guests) || 1;
      for (const item of recipe.items) {
        const t = totals.get(item.id) || { id: item.id, qty: 0, dishes: [] };
        t.qty += item.qty * servings / BASE_SERVINGS;
        t.dishes.push(`${party.name}: ${recipe.name} (${servings} servings)`);
        totals.set(item.id, t);
      }
    }
  }
  return totals;
}
export function customOccasionRows(state) {
  return (state.occasions || []).filter(p => p.active).flatMap(p => (p.items || []).map(x => ({
    key: `p:${p.id}:${x.id}`, name: x.name, id: null, text: x.amount || '', amount: '', unit: '',
    aisle: `party:${p.id}`, aisleLabel: p.name, dishes: [x.dish || 'Party extras'], pantry: false,
    checked: !!state.checked[`p:${p.id}:${x.id}`], bought: state.bought[`p:${p.id}:${x.id}`] || '',
  })));
}
