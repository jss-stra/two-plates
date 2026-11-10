const { INGREDIENTS } = await import('../data/ingredients.js');
const { RECIPES, exclusionHits, hasExclusions } = await import('../js/data.js');
let pass = 0, fail = 0;
const t = (n, c) => { c ? pass++ : (fail++, console.log('FAIL:', n)); };
const tagged = Object.entries(INGREDIENTS).filter(([, i]) => i.allergenCats?.length);
t('some existing ingredients tagged', tagged.length >= 40);
const possible = Object.entries(INGREDIENTS).filter(([, i]) => i.possibleCats?.length);
t('possibleCats present on brand-varying items', possible.length >= 8);
t('definite and possible never overlap on same item+cat', Object.values(INGREDIENTS).every((i) => !(i.allergenCats || []).some((c) => (i.possibleCats || []).includes(c))));
// every cat used on existing ingredients is in the UI taxonomy
const { ALLERGEN_CATS } = await import('../js/data.js');
const UI = new Set(Object.keys(ALLERGEN_CATS));
t('all tags in UI taxonomy', tagged.every(([, i]) => i.allergenCats.every((c) => UI.has(c))));
// end-to-end: a real dish with peanut butter is caught by cat:peanuts allergy
const pbDish = RECIPES.find((r) => r.items.some((it) => it.id === 'peanut_butter'));
t('dish with peanut butter found', !!pbDish);
t('cat:peanuts catches peanut butter dish', exclusionHits(pbDish, { allergies: ['cat:peanuts'], dislikes: [] }).allergies.includes('cat:peanuts'));
const curryDish = RECIPES.find((r) => r.items.some((it) => it.id === 'red_curry'));
const curryHits = curryDish && exclusionHits(curryDish, { allergies: ['cat:shellfish'], dislikes: [] });
t('cat:shellfish marks red curry paste dish as POSSIBLE (may contain), not confirmed', !curryDish || (curryHits.allergiesPossible.includes('cat:shellfish') && !curryHits.allergies.includes('cat:shellfish')));
t('possible constituent still excludes from planner (conservative)', !curryDish || hasExclusions(curryDish, { allergies: ['cat:shellfish'], dislikes: [] }));
const pastaDish = RECIPES.find((r) => r.items.some((it) => it.id === 'wm_pasta'));
t('cat:gluten catches pasta dish', !pastaDish || exclusionHits(pastaDish, { allergies: ['cat:gluten'], dislikes: [] }).allergies.includes('cat:gluten'));
const besanDish = RECIPES.find((r) => r.items.some((it) => it.id === 'besan'));
t('besan (chickpea flour) NOT gluten-tagged', !INGREDIENTS.besan.allergenCats?.includes('gluten'));
t('dislike of cat:peanuts does not match', exclusionHits(pbDish, { allergies: [], dislikes: ['cat:peanuts'] }).dislikes.length === 0);
console.log(`${pass} passed, ${fail} failed (${tagged.length} existing ingredients tagged)`);


// --- picker (alternatives) honors category exclusions ---
const { alternatives } = await import('../js/planner.js');
const { RECIPE_BY_ID } = await import('../js/data.js');
const pastaDish2 = RECIPES.find((r) => r.items.some((it) => it.id === 'wm_pasta'));
const plainState = {
  plan: { slots: [], dinners: 5 },
  rules: { mealsPerDish: 2, eggsCountAsVeg: true, minProtein: 0, maxSameProtein: 2, cuisineWeights: {}, vegDishes: 2, chickenDishes: 3, longPerWeek: 1, maxTime: 60, indianVeg: 0 },
  people: [{ name: 'A', portion: 1, proteinMin: 100, proteinMax: 150, kcalMin: 2000, kcalMax: 2500, outsideProtein: 40, outsideKcal: 800 }],
  hidden: [], ratings: {}, history: [],
  exclusions: { allergies: ['cat:gluten'], dislikes: [] },
};
const alts = alternatives(plainState, 0, {});
t('picker excludes gluten dishes under cat:gluten', !alts.some((a) => (a.r || a).id === pastaDish2.id));
t('picker still returns non-gluten dishes', alts.length > 0);
const hummusDish = RECIPES.find((r) => r.items.some((it) => it.id === 'hummus'));
const sesameState = { ...plainState, exclusions: { allergies: ['cat:sesame'], dislikes: [] } };
const alts2 = alternatives(sesameState, 0, {});
t('picker excludes hummus dish under cat:sesame (definite)', !hummusDish || !alts2.some((a) => (a.r || a).id === hummusDish.id));
console.log(`picker tests done - total ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
