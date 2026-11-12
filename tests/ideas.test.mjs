// Dish-ideas contract: ideas are discovery entries only and must never
// duplicate or masquerade as recipes.
import { IDEAS, IDEA_BY_ID, ideaMatches } from '../js/ideas.js';
import { RECIPES } from '../js/data.js';
import { IMPORTED, importedList } from '../js/imported.js';

let pass = 0, fail = 0;
const t = (name, ok) => { if (ok) pass++; else { fail++; console.log('FAIL:', name); } };

const norm = (s) => s.normalize('NFKD').toLowerCase()
  .replace(/[̀-ͯ]/g, '')
  .replace(/\([^)]*\)/g, ' ')
  .replace(/[^a-z0-9 ]/g, ' ')
  .replace(/\s+/g, ' ').trim();

t('at least 1000 dish ideas', IDEAS.length >= 1000);
t('every idea id resolves', IDEAS.every((i) => IDEA_BY_ID.get(i.id) === i));
t('idea ids unique', new Set(IDEAS.map((i) => i.id)).size === IDEAS.length);
t('idea names unique after normalisation', new Set(IDEAS.map((i) => norm(i.name))).size === IDEAS.length);

for (const i of IDEAS) {
  if (!(i.name && i.blurb && i.countries?.length && i.source?.url)) { fail++; console.log('FAIL: incomplete idea', i.id); continue; }
  pass++;
}
t('blurbs are descriptive sentences', IDEAS.every((i) => i.blurb.length >= 15 && i.blurb.endsWith('.')));
t('every idea carries a Wikidata source link matching its id', IDEAS.every((i) => i.source.url === 'https://www.wikidata.org/wiki/' + i.id.slice(3).toUpperCase() && i.source.license === 'CC0 1.0'));
t('ideas carry no recipe fields', IDEAS.every((i) => !('steps' in i) && !('ingredients' in i) && !('lines' in i) && !('nutrition' in i) && !('baseServings' in i) && !('safety' in i)));

// No overlap with any existing dish (curated or imported), exact or containment.
const existing = [...RECIPES.map((r) => r.name), ...importedList().map((r) => r.name)].map(norm);
const clashes = IDEAS.filter((i) => {
  const k = norm(i.name);
  if (k.length < 5) return false;
  return existing.some((e) => e.length >= 5 && (k.includes(e) || e.includes(k)));
});
t('no idea duplicates an existing dish name', clashes.length === 0);
if (clashes.length) console.log('clashes:', clashes.slice(0, 10).map((c) => c.name).join(' | '));

// Ideas never enter the recipe/planner surfaces.
t('ideas are not in curated RECIPES', !RECIPES.some((r) => IDEA_BY_ID.has(r.id)));
t('ideas are not in IMPORTED', !importedList().some((r) => IDEA_BY_ID.has(r.id)));
t('no idea id collides with a recipe id', !IDEAS.some((i) => RECIPES.some((r) => r.id === i.id) || IMPORTED.has(i.id)));

// Search behaves.
t('ideaMatches matches name', ideaMatches(IDEAS[0], IDEAS[0].name.slice(0, 5).toLowerCase()));
t('ideaMatches matches country', IDEAS.filter((i) => ideaMatches(i, 'peru')).length >= 1);
t('ideaMatches empty query returns true', ideaMatches(IDEAS[0], ''));

// Known residuals of the automated filter stay visible as a guardrail count.
const dessertish = IDEAS.filter((i) => /dessert|ice cream|pastry|cookie|candy|mooncake|\bcakes?\b/i.test(i.blurb)).length;
t('no dessert-keyword ideas remain', dessertish === 0);

console.log(`ideas contract: ${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
