// Fixed meals: the breakfast, shakes and snacks a person has every day, outside
// the planned lunches and dinners. When a person has a list, its totals become
// their outsideProtein/outsideKcal, so the per-meal goal and the week maths use
// the real items instead of a typed guess. An empty list keeps the typed numbers.

// Starting lists, editable after loading. Values are per item, per day.
export const FIXED_MEAL_PRESETS = {
  jatin: {
    label: "Jatin's plan",
    items: [
      { time: '10:30 am', name: 'Whey shake (ON Gold Standard)', qty: '1 scoop + 250 ml light milk + 1 banana', protein: 34, kcal: 320, carbs: 38, fibre: 3, note: 'Take B12 with it' },
      { time: 'After gym', name: 'Protein water + creatine', qty: '1 scoop + 3-5 g creatine', protein: 21, kcal: 180, carbs: 6, fibre: 0, note: 'Rest days: 170 g plain Greek yogurt + 1 fruit, creatine in water' },
      { time: 'Any time', name: 'Extras', qty: 'Tea or coffee with milk, sauces, a little extra oil', protein: 3, kcal: 150, carbs: 10, fibre: 0, note: '' },
    ],
  },
  divya: {
    label: "Divya's plan",
    items: [
      { time: 'Breakfast', name: 'Boiled eggs + oats', qty: '2 eggs + 30 g oats in unsweetened almond milk, 1 tsp chia or flax, a few berries', protein: 18, kcal: 355, carbs: 27, fibre: 6, note: 'Or 2 moong dal chillas + a little yogurt' },
      { time: 'After gym', name: 'Greek yogurt + creatine', qty: '150 g plain Greek yogurt or hung curd, 3-5 g creatine in water', protein: 13, kcal: 130, carbs: 6, fibre: 0, note: 'Or 1 boiled egg + a small handful of roasted chana. No protein powder' },
      { time: 'Afternoon', name: 'Fruit, nuts and seeds', qty: '1 fruit + 1-2 Brazil nuts + 1 tbsp pumpkin seeds', protein: 6, kcal: 190, carbs: 22, fibre: 5, note: 'No more than 2 Brazil nuts' },
    ],
  },
};

export const fixedMealsOf = (person) => (Array.isArray(person?.fixedMeals) ? person.fixedMeals : []);

const amount = (v) => (Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : 0);

export function fixedTotals(person) {
  return fixedMealsOf(person).reduce(
    (t, m) => ({
      protein: t.protein + amount(m.protein), kcal: t.kcal + amount(m.kcal),
      carbs: t.carbs + amount(m.carbs), fibre: t.fibre + amount(m.fibre),
    }),
    { protein: 0, kcal: 0, carbs: 0, fibre: 0 },
  );
}

// What a person eats outside the plan: the fixed-meal totals when there is a
// list, otherwise the typed numbers.
export function outsideOf(person) {
  if (fixedMealsOf(person).length) return fixedTotals(person);
  // Typed numbers have no carbs/fibre: those stay unknown (null), never 0.
  return { protein: Number(person?.outsideProtein) || 0, kcal: Number(person?.outsideKcal) || 0, carbs: null, fibre: null };
}

export const blankFixedMeal = () => ({ time: '', name: '', qty: '', protein: 0, kcal: 0, carbs: 0, fibre: 0, note: '' });

export const presetItems = (key) => structuredClone(FIXED_MEAL_PRESETS[key]?.items || []);

// Copy each person's fixed-meal totals into outsideProtein/outsideKcal.
// People without a list keep whatever they typed. Mutates the given state.
export function syncFixedTotals(state) {
  for (const p of state.people || []) {
    if (!fixedMealsOf(p).length) continue;
    const t = fixedTotals(p);
    p.outsideProtein = Math.round(t.protein);
    p.outsideKcal = Math.round(t.kcal);
  }
  return state;
}
