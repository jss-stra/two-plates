// Writes data/recipes.json and data/ingredients.json: plain dish details (no code) for scheduled tasks and
// other tools to read. Re-run after changing recipes: node tools/build-json.mjs
import { writeFileSync } from 'node:fs';
import { RECIPES, INGREDIENTS, youtubeUrl } from '../js/data.js';

const out = {};
for (const r of RECIPES) {
  out[r.id] = { name: r.name, cuisine: r.cuisine, group: r.group, minutes: r.time, protein: r.protein, kcal: r.kcal, diet: r.diet, recipe: youtubeUrl(r) };
}
writeFileSync(new URL('../data/recipes.json', import.meta.url), JSON.stringify(out, null, 0) + '\n');
console.log(`data/recipes.json: ${Object.keys(out).length} dishes`);

// Ingredient ids, for matching receipt lines to the grocery list.
const ings = {};
for (const [id, i] of Object.entries(INGREDIENTS)) ings[id] = { name: i.name, aisle: i.aisle, unit: i.unit };
writeFileSync(new URL('../data/ingredients.json', import.meta.url), JSON.stringify(ings, null, 0) + '\n');
console.log(`data/ingredients.json: ${Object.keys(ings).length} ingredients`);
