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


for (const r of importedList()) {
 t(`${r.id}: full line source objects preserved`, JSON.stringify(r.src.lines.map(l=>l.source)) === JSON.stringify(r.src.sourceRecord.ingredients));
 t(`${r.id}: full bilingual steps preserved`, JSON.stringify(r.src.steps) === JSON.stringify(r.src.sourceRecord.steps));
 t(`${r.id}: source base preserved`, r.baseServings === r.src.sourceRecord.baseServings);
}
t('Misir explicitly stew only in name and limitation', IMPORTED.get('unitools:misir-wat').name.includes('(stew only)') && IMPORTED.get('unitools:misir-wat').limitation.detail.includes('Bread is not included'));
t('Byrek sheet dimensions gap visible', IMPORTED.get('unitools:byrek-me-spinaq').limitation.detail.includes('sheet dimensions'));
t('Kasespaetzle optional side not fabricated', IMPORTED.get('unitools:kaesespaetzle').limitation.detail.includes('no quantities'));
console.log(`full imported contract: ${pass} passed, ${fail} failed`);
const { displayKind, DISPLAY_GROUPS } = await import('../js/data.js');
for (const [id,kind] of [['tortilla-espanola','egg'],['chakhokhbili','chicken'],['irish-stew','lamb'],['farikal','mutton'],['qingzheng-yu','fish']]) {
 const r = IMPORTED.get('unitools:'+id);
 t(`${id}: safety note is separate from source`, !!r.safety && !!r.safety.sources.length && !r.src.safety);
 t(`${id}: actual display class, not chicken fallback`, displayKind(r,true) === kind && DISPLAY_GROUPS.some(([k])=>k===kind));
 t(`${id}: weekly text uses actual class`, weeklyNoteText({...base,plan:{slots:[{id:r.id,planKind:'chicken'}]}}).includes(DISPLAY_GROUPS.find(([k])=>k===kind)[1]+':'));
 t(`${id}: replacement indices are real source steps`, Object.keys(r.safety.replacements).every(k=>Number(k)>=1 && Number(k)<=r.src.steps.length));
}
t('tortilla adapted endpoint no loose centre', IMPORTED.get('unitools:tortilla-espanola').safety.replacements[5].includes('not runny'));
t('poultry endpoint before off-heat rest', IMPORTED.get('unitools:chakhokhbili').safety.replacements[5].includes('75°C'));
t('lamb names 71C editorial medium scope', IMPORTED.get('unitools:irish-stew').safety.note.includes('medium endpoint for lamb'));
t('mutton not silently renamed lamb', IMPORTED.get('unitools:farikal').safety.note.includes('not a named-mutton standard'));
t('fish smoking oil replaced explicitly', IMPORTED.get('unitools:qingzheng-yu').safety.replacements[7].includes('do not deliberately'));
console.log(`safety and grouping contract: ${pass} passed, ${fail} failed`);
const { importedMatches } = await import('../js/imported.js');
const lambda = IMPORTED.get('unitools:irish-stew');
t('Veg-only never shows lamb', !importedMatches(lambda,base,{vegOnly:true}));
t('Veg-only never shows unknown formulation', !importedMatches(galayet,base,{vegOnly:true}));
t('Veg-only shows reviewed plant dish', importedMatches(r,base,{vegOnly:true}));
t('Egg follows eggsCountAsVeg on Veg-only', importedMatches(IMPORTED.get('unitools:tortilla-espanola'),base,{vegOnly:true}) && !importedMatches(IMPORTED.get('unitools:tortilla-espanola'),{...base,rules:{...base.rules,eggsCountAsVeg:false}},{vegOnly:true}));
t('Quick never matches unknown imported time', importedList().every(x=>!importedMatches(x,base,{quick:true})));
t('Chicken picker never shows lamb or unknown', !importedMatches(lambda,base,{kind:'chicken'}) && !importedMatches(galayet,base,{kind:'chicken'}));
t('Anything allows cross-kind manual replacement', importedMatches(lambda,base,{kind:null}) && importedMatches(galayet,base,{kind:null}));
t('Imported ingredient-name search uses retained source lines', importedMatches(lambda,base,{query:'carrots'}));
t('Veg picker honors eggsCountAsVeg without changing Egg display group', importedMatches(IMPORTED.get('unitools:tortilla-espanola'),base,{kind:'veg'}) && displayKind(IMPORTED.get('unitools:tortilla-espanola'),true)==='egg');
console.log(`imported filters contract: ${pass} passed, ${fail} failed`);
for (const id of ['mercimek-corbasi','tarator']) {
 const soup=IMPORTED.get('unitools:'+id);
 t(`${id} explicitly soup-only and unknown`,soup.name.includes('(soup only)') && soup.diet==='unknown' && !!soup.limitation.detail);
}
const tarator = IMPORTED.get('unitools:tarator');
t('Tarator coldwater source amount not increased for ice',tarator.src.lines.find(l=>l.name==='Cold water').quantity===200);
t('Tarator grocery carries separate method ice reminder',importedShoppingRows(tarator,base).every(x=>x.aisleLabel.includes('ice cube per bowl')));
t('Mercimek missing salt-method is visible, not silently repaired',IMPORTED.get('unitools:mercimek-corbasi').limitation.detail.includes('never explicitly adds'));
t('Mercimek salt has no fabricated trace',IMPORTED.get('unitools:mercimek-corbasi').src.lines.find(l=>l.name==='Salt').methodSteps.length===0);
t('Mercimek stock alternative gap visible before cooking and shopping',IMPORTED.get('unitools:mercimek-corbasi').limitation.detail.includes('no separate method instructions') && importedShoppingRows(IMPORTED.get('unitools:mercimek-corbasi'),base).every(x=>x.aisleLabel.includes('water-only instructions')));
t('Mercimek stock trace records partial alternative',IMPORTED.get('unitools:mercimek-corbasi').src.lines.find(l=>l.name==='Water or stock').methodTraceStatus==='partial_alternative_water_only');
console.log(`soups contract: ${pass} passed, ${fail} failed`);
t('Kaesespaetzle milk alternative method gap recorded',IMPORTED.get('unitools:kaesespaetzle').src.lines.find(l=>l.name==='Water or milk').methodTraceStatus==='partial_alternative_water_only' && IMPORTED.get('unitools:kaesespaetzle').limitation.detail.includes('no separate milk instructions'));
t('Melanzane pepper composite gap recorded',IMPORTED.get('unitools:melanzane-alla-parmigiana').src.lines.find(l=>l.name==='Salt and pepper').methodTraceStatus==='partial_composite_salt_only' && IMPORTED.get('unitools:melanzane-alla-parmigiana').limitation.detail.includes('No pepper instruction'));
console.log(`partial source traces: ${pass} passed, ${fail} failed`);
const sp = IMPORTED.get('unitools:spanakopita'), fo = IMPORTED.get('unitools:fondue-moitie-moitie');
t('Spanakopita raw tasting removed from active instruction',sp.safety.replacements[3].includes('Do not taste') && sp.src.steps[2].text.en.includes('Taste before salting'));
t('Spanakopita set/probed endpoint separate from crust/time',sp.safety.replacements[6].includes('71°C') && sp.safety.note.includes('pregnancy-specific'));
t('Spanakopita sheet dimensions retained as gap',sp.limitation.detail.includes('13 sheets') && sp.limitation.detail.includes('450 g'));
t('Fondue alcohol retained and holding measured',fo.limitation.detail.includes('2 tbsp kirsch') && fo.safety.replacements[6].includes('above 60°C'));
t('Both new cheese recipes stay unknown diet',sp.diet==='unknown' && fo.diet==='unknown');
console.log(`fondue/pie contract: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
