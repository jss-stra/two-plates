// Common foods for logging what you ate when it wasn't the planned dish, or
// as a snack. Each entry is ONE household portion with typical values
// (approximate - home recipes and restaurant serves vary); pick how many.
export const QUICK_FOODS = [
  // Indian home food
  { id: 'roti', name: 'Roti / chapati', unit: '1 medium', protein: 4, kcal: 120, carbs: 22, fibre: 3 },
  { id: 'rice', name: 'White rice, cooked', unit: '1 cup', protein: 4, kcal: 205, carbs: 45, fibre: 0.6 },
  { id: 'brown-rice', name: 'Brown rice, cooked', unit: '1 cup', protein: 5, kcal: 215, carbs: 45, fibre: 3.5 },
  { id: 'dal', name: 'Dal', unit: '1 katori (150 g)', protein: 9, kcal: 160, carbs: 24, fibre: 5 },
  { id: 'rajma-chole', name: 'Rajma or chole', unit: '1 katori (150 g)', protein: 10, kcal: 210, carbs: 30, fibre: 8 },
  { id: 'paneer-curry', name: 'Paneer curry', unit: '1 katori (about 75 g paneer)', protein: 15, kcal: 300, carbs: 10, fibre: 2 },
  { id: 'chicken-curry', name: 'Chicken curry', unit: '1 katori (about 100 g chicken)', protein: 25, kcal: 250, carbs: 8, fibre: 1.5 },
  { id: 'sabzi', name: 'Vegetable sabzi', unit: '1 katori (150 g)', protein: 3, kcal: 120, carbs: 12, fibre: 4 },
  { id: 'dosa', name: 'Plain dosa', unit: '1 dosa', protein: 4, kcal: 170, carbs: 28, fibre: 1.5 },
  { id: 'idli', name: 'Idli', unit: '1 idli', protein: 2, kcal: 60, carbs: 12, fibre: 0.5 },
  { id: 'sambar', name: 'Sambar', unit: '1 katori (150 g)', protein: 5, kcal: 110, carbs: 15, fibre: 4 },
  { id: 'chicken-biryani', name: 'Chicken biryani', unit: '1 plate (300 g)', protein: 25, kcal: 500, carbs: 60, fibre: 3 },
  { id: 'veg-biryani', name: 'Veg biryani / pulao', unit: '1 plate (300 g)', protein: 9, kcal: 420, carbs: 65, fibre: 4 },
  { id: 'samosa', name: 'Samosa', unit: '1 samosa', protein: 4, kcal: 260, carbs: 30, fibre: 2.5 },
  // Protein basics
  { id: 'grilled-chicken', name: 'Grilled chicken', unit: '100 g', protein: 31, kcal: 165, carbs: 0, fibre: 0 },
  { id: 'boiled-egg', name: 'Boiled egg', unit: '1 egg', protein: 6, kcal: 70, carbs: 0.5, fibre: 0 },
  { id: 'omelette', name: 'Omelette', unit: '2 eggs', protein: 13, kcal: 190, carbs: 1, fibre: 0 },
  { id: 'greek-yogurt', name: 'Plain Greek yogurt / hung curd', unit: '1 katori (150 g)', protein: 15, kcal: 100, carbs: 6, fibre: 0 },
  { id: 'curd', name: 'Curd / dahi', unit: '1 katori (150 g)', protein: 5, kcal: 90, carbs: 7, fibre: 0 },
  { id: 'tofu', name: 'Firm tofu', unit: '100 g', protein: 14, kcal: 145, carbs: 2, fibre: 1.2 },
  { id: 'roasted-chana', name: 'Roasted chana', unit: '1 handful (30 g)', protein: 6, kcal: 110, carbs: 15, fibre: 5 },
  { id: 'protein-bar', name: 'Protein bar', unit: '1 bar', protein: 20, kcal: 200, carbs: 20, fibre: 5 },
  { id: 'whey', name: 'Whey shake (water)', unit: '1 scoop', protein: 24, kcal: 120, carbs: 3, fibre: 0 },
  { id: 'milk', name: 'Light milk', unit: '1 glass (250 ml)', protein: 9, kcal: 115, carbs: 12, fibre: 0 },
  // Eating out
  { id: 'burger', name: 'Burger', unit: '1 burger', protein: 25, kcal: 500, carbs: 40, fibre: 2.5 },
  { id: 'pizza', name: 'Pizza', unit: '1 large slice', protein: 12, kcal: 280, carbs: 33, fibre: 2 },
  { id: 'wrap', name: 'Wrap / burrito', unit: '1 wrap', protein: 28, kcal: 550, carbs: 55, fibre: 6 },
  { id: 'sandwich', name: 'Sandwich', unit: '1 sandwich', protein: 18, kcal: 350, carbs: 35, fibre: 4 },
  { id: 'salad-bowl', name: 'Salad or poke bowl with protein', unit: '1 bowl', protein: 30, kcal: 450, carbs: 35, fibre: 7 },
  { id: 'noodles', name: 'Noodles or fried rice', unit: '1 plate', protein: 15, kcal: 550, carbs: 75, fibre: 3 },
  { id: 'sushi', name: 'Sushi roll', unit: '1 roll (8 pieces)', protein: 9, kcal: 300, carbs: 50, fibre: 2 },
  // Snacks
  { id: 'fruit', name: 'Fruit', unit: '1 piece', protein: 1, kcal: 80, carbs: 20, fibre: 3 },
  { id: 'nuts', name: 'Nuts', unit: '1 handful (30 g)', protein: 6, kcal: 180, carbs: 6, fibre: 3 },
  { id: 'chai', name: 'Chai with milk', unit: '1 cup', protein: 3, kcal: 80, carbs: 10, fibre: 0 },
];
export const QUICK_FOOD_BY_ID = Object.fromEntries(QUICK_FOODS.map((f) => [f.id, f]));

// Totals for a list of { food, n } picks. Unknown ids are skipped.
export function foodsTotal(list = []) {
  const t = { protein: 0, kcal: 0, carbs: 0, fibre: 0 };
  for (const { food, n } of list) {
    const f = QUICK_FOOD_BY_ID[food];
    const k = Number(n) > 0 ? Number(n) : 0;
    if (!f || !k) continue;
    for (const key of Object.keys(t)) t[key] += f[key] * k;
  }
  for (const key of Object.keys(t)) t[key] = Math.round(t[key]);
  return t;
}
