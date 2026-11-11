import { INGREDIENTS } from '../data/ingredients.js';

// --- fixtures ---
INGREDIENTS.test_fish_unknown = { name: 'Mystery fish', aisle: 'meat', unit: 'g', kcal: null, p: null, c: null, f: null, diet: 'meat', src: 'fish', allergenCats: ['fish'], basis: 'unknown' };
INGREDIENTS.test_tahini = { name: 'Test tahini', aisle: 'sauces', unit: 'g', kcal: 595, p: 17, c: 21, f: 54, derivedFrom: ['sesame_seeds'] };
INGREDIENTS.test_wrap_sauce = { name: 'Test wrap sauce', aisle: 'sauces', unit: 'g', kcal: 100, p: 1, c: 10, f: 5, derivedFrom: ['test_tahini'] }; // transitive
INGREDIENTS.test_approx = { name: 'Approx grain', aisle: 'grains', unit: 'g', kcal: 350, p: 10, c: 70, f: 2, basis: 'approximate' };
const spinachBackup = INGREDIENTS.spinach.kcal;
INGREDIENTS.spinach.kcal = null; // simulate an unknown-macro existing ingredient

const { RECIPES, RECIPE_BY_ID, exclusionHits, DATA_ERRORS } = await import('../js/data.js');
const { mealFor, dailyEstimate } = await import('../js/planner.js');

let pass = 0, fail = 0;
const t = (name, cond) => { cond ? pass++ : (fail++, console.log('FAIL:', name)); };

// 1. null propagation: any recipe using spinach now has null macros
const spinachDish = RECIPES.find(r => r.items.some(it => it.id === 'spinach'));
t('spinach dish found', !!spinachDish);
t('null macros propagate to dish', spinachDish.protein === null && spinachDish.kcal === null && spinachDish.carbs === null && spinachDish.fat === null);
t('nutritionUnknown flag set', spinachDish.nutritionUnknown === true);
t('null is not zero', spinachDish.protein !== 0);

// 2. dishes without spinach unchanged
const clean = RECIPES.find(r => !r.items.some(it => it.id === 'spinach'));
t('clean dish keeps numbers', typeof clean.protein === 'number' && clean.protein > 0 && !clean.nutritionUnknown);

// 3. exclusion semantics on synthetic recipes
const rTahini = { items: [{ id: 'test_tahini', qty: 10 }] };
const rSauce = { items: [{ id: 'test_wrap_sauce', qty: 10 }] };
const rFish = { items: [{ id: 'test_fish_unknown', qty: 100 }] };
t('allergy: derivedFrom hit (tahini->sesame)', exclusionHits(rTahini, { allergies: ['sesame_seeds'], dislikes: [] }).allergies.includes('sesame_seeds'));
t('dislike: derivedFrom NOT hit', exclusionHits(rTahini, { allergies: [], dislikes: ['sesame_seeds'] }).dislikes.length === 0);
t('allergy: transitive derivedFrom (sauce->tahini->sesame)', exclusionHits(rSauce, { allergies: ['sesame_seeds'], dislikes: [] }).allergies.includes('sesame_seeds'));
t('allergy: cat:fish catches unknown-species fish', exclusionHits(rFish, { allergies: ['cat:fish'], dislikes: [] }).allergies.includes('cat:fish'));
t('dislike: cat:fish does not match', exclusionHits(rFish, { allergies: [], dislikes: ['cat:fish'] }).dislikes.length === 0);
t('allergy: sameAs still works (peanut_butter)', exclusionHits({ items: [{ id: 'peanut_butter', qty: 10 }] }, { allergies: ['peanuts'], dislikes: [] }).allergies.includes('peanuts'));
t('dislike: sameAs still works', exclusionHits({ items: [{ id: 'peanut_butter', qty: 10 }] }, { allergies: [], dislikes: ['peanuts'] }).dislikes.includes('peanuts'));

// 4. mealFor null-safe
t('mealFor null for unknown dish', mealFor(spinachDish, { portion: 1 }).protein === null);
t('mealFor numbers for clean dish', typeof mealFor(clean, { portion: 1 }).protein === 'number');

// 5. dailyEstimate partial handling
const state = {
  plan: { slots: [{ id: spinachDish.id }, { id: clean.id }], dinners: 2 },
  rules: { mealsPerDish: 2, eggsCountAsVeg: true },
  people: [{ name: 'A', portion: 1, proteinMin: 100, proteinMax: 150, kcalMin: 2000, kcalMax: 2500, outsideProtein: 40, outsideKcal: 800 }],
  hidden: [], ratings: {}, history: [],
};
const est = dailyEstimate(state)[0];
t('dailyEstimate UNAVAILABLE when any dish unknown (no imputation)', est.protein === null && est.kcal === null && est.unavailable === true && est.unknownCount === 1);
const stateAllKnown = { ...state, plan: { slots: [{ id: clean.id }], dinners: 1 } };
const est3 = dailyEstimate(stateAllKnown)[0];
t('dailyEstimate original behavior when all known', typeof est3.protein === 'number' && !est3.unavailable);
const stateAllUnknown = { ...state, plan: { slots: [{ id: spinachDish.id }], dinners: 1 } };
const est2 = dailyEstimate(stateAllUnknown)[0];
t('dailyEstimate null when all unknown', est2.protein === null && est2.unavailable === true);

// 6. approximate marker
INGREDIENTS.spinach.kcal = spinachBackup; // restore
console.log(`DATA_ERRORS: ${DATA_ERRORS.length}`);
console.log(`\n${pass} passed, ${fail} failed`);


// --- planner smoke: full plan generation with unknown dishes in the pool ---
const { generateSlots } = await import('../js/planner.js');
INGREDIENTS.spinach.kcal = null; // re-break before planner test
const bigState = {
  plan: { slots: [], dinners: 5 },
  rules: { mealsPerDish: 2, eggsCountAsVeg: true, minProtein: 35, maxSameProtein: 2, cuisineWeights: {}, vegDishes: 2, chickenDishes: 3, longPerWeek: 1, maxTime: 60, indianVeg: 0 },
  people: [{ name: 'A', portion: 1, proteinMin: 100, proteinMax: 150, kcalMin: 2000, kcalMax: 2500, outsideProtein: 40, outsideKcal: 800 }],
  hidden: [], ratings: {}, history: [], exclusions: { allergies: [], dislikes: [] },
};
const slots = generateSlots(bigState);
const allFinite = slots.every((s) => s && typeof s.id === 'string');
const { RECIPE_BY_ID: R2 } = await import('../js/data.js');
const bandRespected = slots.every((s) => R2[s.id].protein != null && R2[s.id].protein >= 35);
console.log('planner smoke:', slots.length, 'slots, all valid:', allFinite, '| unknown dishes excluded from protein band:', bandRespected);
if (!bandRespected) { console.log('FAIL: unknown/low-protein dish satisfied the protein band'); fail++; }

// Regression: a 0 min-protein band must still exclude unknown nutrition
// (in JS null >= 0 is true, so the guard must require a finite value).
// Deterministic: hide every known-protein dish, so any generated slot can
// only come from the null-protein pool if the guard leaks.
const { RECIPES: ALL_R } = await import('../js/data.js');
const hiddenKnown = ALL_R.filter((r) => r.protein != null).map((r) => r.id);
const zeroBandSlots = generateSlots({ ...bigState, hidden: hiddenKnown, rules: { ...bigState.rules, minProtein: 0 } });
const leaked = zeroBandSlots.filter((s) => s && R2[s.id] && R2[s.id].protein == null);
const zeroBandOk = zeroBandSlots.length === 0 && leaked.length === 0;
console.log('zero-band regression: slots from null-only pool:', zeroBandSlots.length, '| leaked unknown dishes:', leaked.length, '| ok:', zeroBandOk);
if (!zeroBandOk) { console.log('FAIL: null protein satisfied a 0 protein band'); fail++; }
process.exit(allFinite ? 0 : 2);
process.exit(fail || !allFinite ? 1 : 0);
