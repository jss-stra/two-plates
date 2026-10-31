// Writes data/recipes.json: plain dish details (no code) for scheduled tasks and
// other tools to read. Re-run after changing recipes: node tools/build-json.mjs
import { writeFileSync } from 'node:fs';
import { RECIPES, youtubeUrl } from '../js/data.js';

const out = {};
for (const r of RECIPES) {
  out[r.id] = { name: r.name, cuisine: r.cuisine, group: r.group, minutes: r.time, protein: r.protein, kcal: r.kcal, diet: r.diet, recipe: youtubeUrl(r) };
}
writeFileSync(new URL('../data/recipes.json', import.meta.url), JSON.stringify(out, null, 0) + '\n');
console.log(`data/recipes.json: ${Object.keys(out).length} dishes`);
