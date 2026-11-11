// Imported source-native recipes: fixed base, exact source units, unknown
// nutrition. These tests pin the containment contract: imported dishes never
// join the planner pools, never satisfy numeric bands, gate fail-closed on
// any restriction, and shop at exact original-base quantities.
let pass = 0, fail = 0;
const t = (n, c) => { c ? pass++ : (fail++, console.log('FAIL:', n)); };

const { RECIPES, RECIPE_BY_ID, exclusionHits } = await import('../js/data.js');
const { IMPORTED, importedList, importedAddStatus, importedShoppingRows, isImported } = await import('../js/imported.js');
const { generateSlots, planRecipes, mealFor, dailyEstimate } = await import('../js/planner.js');
const { buildGrocery } = await import('../js/grocery.js');
const rat = (await import('../data/imported/ratatouille.mjs')).default;

const base = {
  plan: { slots: [], dinners: 4 },
  rules: { chickenDishes: 2, vegDishes: 2, mealsPerDish: 2, eggsCountAsVeg: true, minProtein: 0, maxKcal: 0, cuisineWeights: {} },
  people: [{ name: 'A', portion: 1, proteinMin: 100, proteinMax: 150, kcalMin: 2000, kcalMax: 2500, outsideProtein: 0, outsideKcal: 0 }],
  hidden: [], ratings: {}, history: [], exclusions: { allergies: [], dislikes: [] },
  pantry: {}, checked: {}, bought: {}, extras: [], occasions: [],
};

// 1. registry wiring
const r = IMPORTED.get('unitools:ratatouille');
t('imported recipe registered in IMPORTED', !!r);
t('registered in RECIPE_BY_ID (slot/history lookup)', RECIPE_BY_ID['unitools:ratatouille'] === r);
t('NEVER in RECIPES (planner pool)', !RECIPES.some((x) => x.id === 'unitools:ratatouille'));
t('isImported true only for imported', isImported('unitools:ratatouille') && !isImported(RECIPES[0].id));

// 2. planner cannot emit it, even with a fully permissive state
const allHidden = { ...base, hidden: RECIPES.map((x) => x.id), plan: { slots: [], dinners: 7 }, rules: { ...base.rules, chickenDishes: 4, vegDishes: 3 } };
const slots = generateSlots(allHidden).filter(Boolean);
t('generateSlots never emits imported ids', slots.every((s) => !isImported(s.id)));

// 3. numeric bands: unknown nutrition never counts (finite guard holds for imported shape)
t('imported protein/kcal/time are null', r.protein === null && r.kcal === null && r.time === null);
t('mealFor null-safe on imported', mealFor(r, base.people[0]).protein === null);
const withSlot = { ...base, plan: { slots: [{ id: 'unitools:ratatouille' }], dinners: 1 } };
const est = dailyEstimate(withSlot)[0];
t('dailyEstimate unavailable (no imputation) with imported slot', est.protein === null && est.unavailable === true);

// 4. exclusion matching is empty by construction (no catalog mapping) and
//    the gate fails closed on ANY restriction instead of trusting that.
t('no catalog items -> no exclusion hits', exclusionHits(r, { allergies: ['cat:peanuts'], dislikes: ['garlic'] }).allergies.length === 0);
t('gate allows when no restrictions', importedAddStatus(base, r.id).allowed === true);
t('gate BLOCKS with an allergy set (fail closed, empty mapping is not clearance)',
  importedAddStatus({ ...base, exclusions: { allergies: ['cat:peanuts'], dislikes: [] } }, r.id).allowed === false);
t('gate BLOCKS with a dislike set', importedAddStatus({ ...base, exclusions: { allergies: [], dislikes: ['x'] } }, r.id).allowed === false);
t('gate handles unknown id', importedAddStatus(base, 'unitools:nope').allowed === false);

// 5. grocery: exact original-base rows, no scaling, no conversion
const g = buildGrocery(withSlot);
const flat = (res) => [...res.shop, ...res.pantry];
const rows = flat(g).filter((i) => i.key.startsWith('src:unitools:ratatouille:'));
t('grocery has one row per source line', rows.length === rat.lines.length);
t('grocery rows are exact source quantities', rows.every((row) => {
  const line = rat.lines.find((l) => l.lineRef === row.key);
  return line && row.text === (line.unit === 'toTaste' ? 'to taste' : `${line.quantity} ${line.unit}`);
}));
t('imported rows carry fixed-base aisle label', rows.every((row) => row.aisleLabel.includes('Ratatouille') && row.aisleLabel.includes('exact source amounts')));
t('no scaling applied (amounts independent of household portions)',
  flat(buildGrocery({ ...withSlot, people: [base.people[0], { ...base.people[0], name: 'B', portion: 1.5 }] }))
    .filter((i) => i.key.startsWith('src:unitools:ratatouille:'))
    .every((row) => row.text === rows.find((x) => x.key === row.key)?.text));

// 6. source fidelity: shipped module is the worker-verified record verbatim
t('source lines preserved verbatim (10 lines)', rat.lines.length === 10);
t('source steps preserved verbatim (6 steps)', rat.steps.length === 6);
t('fixed base servings preserved', rat.baseServings === 4 && r.baseServings === 4);
t('license and credit travel with the record', rat.rights.license === 'CC BY-SA 4.0' && /theunitools\.com/.test(rat.rights.credit));
t('review flags preserved (diet not independently reviewed)', rat.review.dietIndependentlyReviewed === false);
t('diet shown as veg is derived from lines, not source claims', rat.diet === null && r.diet === 'veg');

console.log(`imported: ${pass} passed, ${fail} failed (pre diet-class)`);

// 7. diet classification is reviewed per-record, never defaulted (Main/worker contract)
const { kindOf, isVeg, DIET_LABEL } = await import('../js/data.js');
t('ratatouille veg comes from the reviewed-lines table, with its basis recorded', r.diet === 'veg' && typeof r.dietBasis === 'string' && r.dietBasis.length > 20);
t("'unknown' diet is a first-class label", DIET_LABEL.unknown === 'Not classified');
t("kindOf never files an unclassified dish under chicken or veg", kindOf({ diet: 'unknown' }, false) === 'unknown' && kindOf({ diet: undefined }, true) === 'unknown');
t("isVeg never treats unclassified as veg", isVeg({ diet: 'unknown' }, true) === false);
t("known diets unchanged", kindOf({ diet: 'nonveg' }, false) === 'chicken' && kindOf({ diet: 'veg' }, false) === 'veg' && kindOf({ diet: 'egg' }, true) === 'veg');
console.log(`imported (with diet-class): ${pass} passed, ${fail} failed`);


// Unknown-diet manual replacement survives quota bookkeeping and locking.
const { slotKind } = await import('../js/planner.js');
const { weeklyNoteText } = await import('../js/grocery.js');
const galayet = IMPORTED.get('unitools:galayet-bandora');
const manualSlot = { id: galayet.id, locked: true, planKind: 'chicken' };
const manualState = { ...base, rules: { ...base.rules, chickenDishes: 1, vegDishes: 0 }, plan: { slots: [manualSlot] } };
t('unknown is not a dietary chicken/veg claim', galayet.diet === 'unknown' && kindOf(galayet, true) === 'unknown');
t('manual replacement tracks the replaced plan position, separately from diet', slotKind(manualSlot, galayet, manualState.rules) === 'chicken');
t('locked unknown manual replacement survives regenerate', generateSlots(manualState).some(s => s.id === galayet.id && s.planKind === 'chicken'));
t('unknown appears in weekly text', weeklyNoteText(manualState).includes('Diet not classified:') && weeklyNoteText(manualState).includes(galayet.name));
const multi = buildGrocery({ ...base, plan: { slots: [{id:r.id}, {id:galayet.id}] } });
t('each import gets a separate correctly named grocery group', multi.shopGroups.some(g=>g.label.includes('Ratatouille') && g.items.length===10) && multi.shopGroups.some(g=>g.label.includes(galayet.name) && g.items.length===8));
for (const source of importedList()) {
 t(`${source.name} never joins RECIPES`, !RECIPES.some(r=>r.id===source.id));
 t(`${source.name} restriction gate blocks`, !importedAddStatus({...base, exclusions:{allergies:['cat:milk'],dislikes:[]}},source.id).allowed);
}
console.log(`imported complete: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
