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
const st = IMPORTED.get('unitools:zagorski-strukli');
t('Strukli separate dough and filling eggs unchanged', st.src.lines.find(l=>l.name==='Egg').quantity===1 && st.src.lines.find(l=>l.name==='Eggs for the filling').quantity===2);
t('Strukli original boil retained with explicit adapted bake endpoint',st.src.steps[4].text.en.includes('five minutes after they float') && st.safety.replacements[6].includes('71°C') && st.safety.note.includes('not a universal legal threshold'));
t('Strukli dry curd not converted to another cheese',st.src.lines.find(l=>l.name==='Dry curd cheese').quantity===600 && st.limitation.detail.includes('not a pre-drain weight'));
t('Strukli shared fat and process water caveats reach groceries',importedShoppingRows(st,base).every(x=>x.aisleLabel.includes('shared totals')));
t('Strukli unknown diet and fixed base retained',st.diet==='unknown' && st.baseServings===6 && st.time===null);
console.log(`strukli contract: ${pass} passed, ${fail} failed`);
const jr = IMPORTED.get('unitools:jollof-rice');
t('Jollof stock remains chicken with visible contradiction',jr.src.lines.find(l=>l.name==='Chicken stock').quantity===600 && jr.limitation.detail.includes('contradict') && jr.diet==='unknown');
t('Jollof rice source amount and rinsed note remain',jr.src.lines.find(l=>l.name==='Long-grain rice').quantity===500 && jr.src.lines.find(l=>l.name==='Long-grain rice').note.en==='rinsed');
t('Jollof handling distinguishes cumulative 2-4h from refrigerating',jr.limitation.handling.includes('not refrigerate for later') && jr.limitation.handling.includes('only once') && jr.limitation.handling.includes('within 1 day'));
t('Jollof grocery explicitly chicken stock',importedShoppingRows(jr,base).every(x=>x.aisleLabel.includes('chicken stock')));
console.log(`jollof contract: ${pass} passed, ${fail} failed`);
const sv=IMPORTED.get('unitools:souvla');
t('Souvla explicit pork classification without summary lamb substitution',sv.diet==='nonveg' && displayKind(sv,true)==='pork' && sv.src.lines[0].name==='Pork shoulder' && sv.src.lines[0].quantity===2.5);
t('Souvla practical endpoint replaces fixed time and final serving',sv.safety.replacements[5].includes('71°C') && sv.safety.replacements[7].includes('confirm the measured endpoint'));
t('Souvla fire restrictions active before lighting and no current status claim',sv.safety.replacements[3].includes('Before lighting') && sv.safety.note.includes('does not check current restrictions'));
t('Souvla standalone pork class in weekly text',weeklyNoteText({...base,plan:{slots:[{id:sv.id,planKind:'chicken'}]}}).includes('Pork:'));
t('Souvla fixed base and grocery equipment caveat',sv.baseServings===6 && importedShoppingRows(sv,base).every(x=>x.aisleLabel.includes('food thermometer required')));
console.log(`souvla contract: ${pass} passed, ${fail} failed`);
const ot=IMPORTED.get('unitools:ohridska-pastrmka');
t('Ohrid retains count of whole gutted trout, not guessed mass',ot.src.lines[0].quantity===4 && ot.src.lines[0].unit==='piece' && ot.src.lines[0].note.en==='whole, gutted');
t('Ohrid active fish endpoint avoids bones for every fish',ot.safety.replacements[6].includes('63°C in every fish') && ot.safety.replacements[6].includes('avoiding the spine'));
t('Ohrid potato juice contact separately checked',ot.safety.replacements[6].includes('70°C') && ot.safety.note.includes('not a tested potato-specific standard'));
t('Ohrid shared totals and wine caveats travel to groceries',importedShoppingRows(ot,base).every(x=>x.aisleLabel.includes('shared totals; contains wine')));
t('Ohrid actual Fish display and fixed four servings',displayKind(ot,true)==='fish' && ot.baseServings===4 && ot.time===null);
console.log(`Ohrid contract: ${pass} passed, ${fail} failed`);
// Wikibooks source-native contract (pinned revisions, monolingual source)
const wb = (id) => IMPORTED.get('wikibooks:' + id);
const wbIds = ['paprika-chicken', 'vegetarian-soft-tacos', 'adult-mac-and-cheese', 'agnolotti-in-brodo', 'galician-garbanzo-soup', 'pork-and-lima-skillet', 'spaghetti-bolognese', 'barbecued-spare-ribs', 'poutine', 'penne-meat-sauce', 'jambalaya-i',
  'asparagus-soup', 'bean-soup-vegetarian', 'beef-gravy-soup', 'black-peppered-chicken-spaghetti', 'creamy-tomato-bean-soup', 'crock-pot-potato-soup', 'hot-and-sour-soup', 'mushroom-soup', 'pasta-soup-for-kids', 'pepper-soup', 'potato-soup', 'spiced-pumpkin-soup', 'sausage-and-tortellini-soup', 'tom-kha-kai', 'vichyssoise', 'ertesuppe-pea-soup',
  'lengua-de-res', 'bacon-wrapped-scallops', 'chicken-fried-steak', 'chipsi-mayai', 'chuu-chee-fish', 'cuban-picadillo', 'garlic-pork-chops-black-mushrooms', 'honey-peppered-salmon', 'lemon-rosemary-pork-tenderloin', 'maple-planked-salmon', 'meatloaf-iv', 'mediterranean-green-chicken', 'poppyseed-chicken', 'schweinsbraten', 'shrimp-scampi-angel-hair', 'simple-italian-sausage-spaghetti', 'spicy-chicken-cutlets', 'sweet-italian-sausage-skillet', 'tuna-glop', 'wine-roasted-pork-roast',
  'bean-and-bacon-bake', 'brown-rice-casserole', 'cazuela-gallega', 'chuck-wagon-beans', 'cioppino-italian-seafood-stew', 'corny-souffle', 'crock-pot-beef-stew', 'cucumber-sprout-sandwich', 'dutch-oven-beans', 'fabes-con-almejas', 'keralan-vegetable-stew', 'macaroni-pie', 'malvani-chicken-curry', 'meatless-sloppy-joes', 'mini-three-cheese-english-muffin-pizzas', 'mozzarella-tuna-melts', 'parmesan-cheese-souffle', 'mostaccioli', 'potato-chickpea-curry', 'potato-curry-aloo-masala', 'radish-pie', 'reuben-sandwich', 'risotto-alla-milanese', 'sloppy-joes', 'spaghetti-bake', 'tripes-a-la-mode-de-caen', 'yetsom-shiro', 'yogurt-curry-soup-kadhi'];
for (const id of wbIds) {
  const r = wb(id);
  t(`${id} registered`, !!r);
  t(`${id} attribution pinned`, r.src.rights.credit.includes('Wikibooks') && /wikibooks\.org/.test(r.src.rights.sourceUrl) && Number.isInteger(r.src.sourceRecord.revid));
  t(`${id} license retained`, r.src.rights.license === 'CC BY-SA 4.0 and GFDL');
  t(`${id} source label for adaptation headers`, r.src.sourceLabel === 'Wikibooks Cookbook');
  t(`${id} nutrition unknown despite any source summary`, r.src.nutritionStatus === 'unknown' && r.src.nutrition.kcal === null);
  t(`${id} fixed base, no time band`, r.time === null && r.src.sourceTimes.guaranteedElapsedTime === false);
  t(`${id} verbatim source line raws kept`, r.src.lines.every(l => typeof l.source.raw === 'string' && l.source.raw.length > 0));
}
const pc = wb('paprika-chicken');
t('Paprika source serving range kept as range', pc.baseServings === '6–8' && pc.src.sourceRecord.baseServings === '6–8');
t('Paprika quantity ranges kept, not rounded', pc.src.lines.find(l=>l.name==='Sweet paprika').quantity === '2–4' && pc.src.lines.find(l=>l.name==='Olive oil').quantity === '5–7');
t('Paprika unquantified salt/parsley visible, not invented', pc.limitation.detail.includes('without quantities') && pc.src.lines.find(l=>l.name==='Salt').unit === 'unstated' && pc.src.lines.find(l=>l.name==='Fresh parsley').unit === 'unstated');
t('Unstated amount never shown as to taste or fabricated', importedShoppingRows(pc, base).find(x=>x.key==='src:wikibooks:paprika-chicken:007').text === 'quantity not stated');
t('Paprika process water gap visible', pc.limitation.detail.includes('unquantified process'));
t('Paprika poultry endpoint replaces time/tenderness cue', pc.safety.replacements[4].includes('75°C') && pc.safety.replacements[4].includes('avoiding bone'));
t('Paprika reviewed as chicken from explicit source line', pc.diet === 'nonveg' && displayKind(pc, true) === 'chicken');
const pl = wb('pork-and-lima-skillet');
t('Pork-lima endpoint measured, not brown/heated-through', pl.safety.replacements[6].includes('71°C') && pl.safety.replacements[6].includes('from the side'));
t('Pork-lima browning kept colour-only', pl.safety.replacements[2].includes('not a doneness check'));
t('Pork-lima reviewed pork', pl.diet === 'nonveg' && displayKind(pl, true) === 'pork' && pl.baseServings === '5–6');
t('Pork-lima lima package deferral visible', pl.limitation.detail.includes('package directions'));
const tx = wb('vegetarian-soft-tacos');
t('Tacos can-size gap visible', tx.limitation.detail.includes('without a can size') && tx.src.lines.find(l=>l.name==='Refried beans').quantity === '1');
t('Tacos sour cream unquantified, not called to taste', tx.src.lines.find(l=>l.name==='Sour cream').unit === 'unstated');
t('Tacos unknown diet despite source vegetarian claim', tx.diet === 'unknown' && tx.src.sourceDietClaims.includes('vegetarian'));
t('Tacos toppings traced to source steps', tx.src.lines.find(l=>l.name==='Refried beans').methodSteps.length >= 1);
const am = wb('adult-mac-and-cheese');
t('Mac source nutrition summary provenance only', typeof am.src.sourceRecord.nutritionSummaryRaw === 'string' && am.src.nutrition.kcal === null && am.limitation.detail.includes('nutrition stays unknown'));
t('Mac butter division kept from source', am.src.lines.find(l=>l.name==='Unsalted butter').note.en.includes('divided') && am.limitation.detail.includes('1 tbsp at a time'));
t('Mac unknown diet (cheese formulations)', am.diet === 'unknown');
const ag = wb('agnolotti-in-brodo');
t('Agnolotti soup only and sherry visible', ag.name.includes('(soup only)') && ag.limitation.detail.includes('sherry') && ag.limitation.detail.includes('no alcohol-free claim'));
t('Agnolotti broth alternative has method on both branches', ag.src.lines.find(l=>l.name==='Chicken broth').methodTraceStatus === 'alternative_both_with_method');
t('Agnolotti package deferral visible, diet unclassified', ag.limitation.detail.includes('package directions') && ag.diet === 'unknown');
t('Agnolotti Parmesan amount unstated, not to taste', ag.src.lines.find(l=>l.name==='Parmesan cheese').unit === 'unstated');
const gg = wb('galician-garbanzo-soup');
t('Garbanzo soup only, broth alternative traced', gg.name.includes('(soup only)') && gg.src.lines.find(l=>l.name==='Vegetable broth').methodTraceStatus === 'alternative_both_with_method');
t('Garbanzo basil notes-only gap visible, no invented step', gg.src.lines.find(l=>l.name==='Fresh basil').methodSteps.length === 0 && gg.src.lines.find(l=>l.name==='Fresh basil').methodTraceStatus === 'garnish_in_notes_only' && gg.limitation.detail.includes('serving notes'));
t('Garbanzo unknown diet despite source veg/gf claims', gg.diet === 'unknown' && gg.src.sourceDietClaims.includes('gluten-free'));
t('Garbanzo basil unstated; salt genuinely to taste per source', gg.src.lines.find(l=>l.name==='Fresh basil').unit === 'unstated' && gg.src.lines.find(l=>l.name==='Salt').unit === 'toTaste');
t('Garbanzo can total kept', gg.src.lines.find(l=>l.name==='Garbanzo beans').quantity === '3' && gg.src.lines.find(l=>l.name==='Garbanzo beans').note.en.includes('45 oz'));
const sb = wb('spaghetti-bolognese');
t('Bolognese mince endpoint named-standard 71C, not time alone', sb.safety.replacements[5].includes('71°C') && sb.safety.replacements[11].includes('71°C') && sb.safety.note.includes('NSW'));
t('Bolognese wine retained with no alcohol-free claim', sb.limitation.detail.includes('no alcohol-free claim') && sb.src.lines.find(l=>l.name==='Red wine').quantity === '½');
t('Bolognese reviewed beef from explicit source line', sb.diet === 'nonveg' && displayKind(sb, true) === 'beef' && sb.baseServings === 4);
t('Bolognese salt genuinely to taste, water kept unquantified in steps', sb.src.lines.find(l=>l.name==='Salt').unit === 'toTaste' && sb.src.steps[12].text.en.includes('a gallon (4 litres) of water'));
const br = wb('barbecued-spare-ribs');
t('Ribs unrefrigerated overnight marinade adapted, not silently kept', br.safety.replacements[1].includes('refrigerator') && br.safety.replacements[1].includes('5°C') && br.src.steps[0].text.en === 'Place spare ribs in a large baking dish in one layer. In a small bowl, combine the remaining ingredients. Pour over spare ribs and coat on both sides. Marinate overnight, basting occasionally.');
t('Ribs pork endpoint with thin-meat side probing', br.safety.replacements[4].includes('71°C') && br.safety.replacements[4].includes('from the side'));
t('Ribs source gluten-free claim shown but not accepted', br.src.sourceDietClaims.includes('gluten-free') && br.limitation.detail.includes('not accepted') && br.diet === 'nonveg' && displayKind(br, true) === 'pork');
t('Ribs cold-serve storage handling visible', br.limitation.handling.includes('cool promptly') && br.safety.note.includes('overnight'));
const po = wb('poutine');
t('Poutine deep-fry fire safety with citation, no endpoint invention', po.safety.replacements[3].includes('185°C') && po.safety.note.includes('never leave') && po.safety.sources.some(s=>s[0].includes('NFPA')));
t('Poutine serving range kept as range', po.baseServings === '2–4' && po.src.sourceRecord.baseServings === '2–4');
t('Poutine unknown diet, gravy formulation gap visible', po.diet === 'unknown' && po.limitation.detail.includes('unverified'));
t('Poutine quantities verbatim', po.src.lines.find(l=>l.name==='Poutine sauce or gravy').note.en.includes('290 g') && po.src.lines.find(l=>l.name==='Vegetable oil').quantity === '1');
const pm = wb('penne-meat-sauce');
t('Penne sausage endpoint 71C not colour', pm.safety.replacements[2].includes('71°C') && pm.safety.replacements[2].includes('not doneness checks'));
t('Penne unknown diet: sausage species unstated', pm.diet === 'unknown' && pm.limitation.detail.includes('species'));
const ja = wb('jambalaya-i');
t('Jambalaya cooked-poultry and rice handling visible', ja.limitation.handling.includes('Bacillus cereus') && ja.limitation.handlingExtraUrl.includes('pregnancy'));
t('Jambalaya small-can mushroom gap kept, not sized', ja.src.lines.find(l=>l.name==='Canned sliced mushrooms').note.en.includes('size not stated') && ja.limitation.grocery.includes('size not stated'));
t('Jambalaya reviewed chicken, no safety endpoint needed', ja.diet === 'nonveg' && displayKind(ja, true) === 'chicken' && !ja.safety);
// batch 3 (36 records: 15 soups + black-peppered pasta + 20 mains)
const b3soups = ['asparagus-soup', 'bean-soup-vegetarian', 'beef-gravy-soup', 'creamy-tomato-bean-soup', 'crock-pot-potato-soup', 'hot-and-sour-soup', 'mushroom-soup', 'pasta-soup-for-kids', 'pepper-soup', 'potato-soup', 'spiced-pumpkin-soup', 'sausage-and-tortellini-soup', 'tom-kha-kai', 'vichyssoise', 'ertesuppe-pea-soup'];
t('batch3: 15 soups get soup-only suffix, pasta does not', b3soups.every(id => wb(id).name.includes('(soup only)')) && !wb('black-peppered-chicken-spaghetti').name.includes('(soup only)'));
const spp = wb('spiced-pumpkin-soup');
t('Pumpkin garlic source gap kept visible, no invented step', spp.src.lines.find(l=>l.name==='Garlic').methodSteps.length === 0 && spp.limitation.detail.includes('never adds'));
const cu = wb('cuban-picadillo');
t('Picadillo vinegar source gap kept visible', cu.src.lines.find(l=>l.name==='Red wine vinegar').methodSteps.length === 0 && cu.limitation.grocery.includes('vinegar'));
const lr = wb('lemon-rosemary-pork-tenderloin');
t('Tenderloin source 160F endpoint kept verbatim, NSW alignment noted separately', lr.src.steps.some(st=>st.text.en.includes('160')) && lr.limitation.detail.includes('160°F converts to 71.1°C') && !lr.safety);
const lg = wb('lengua-de-res');
t('Lengua colour cue replaced with 70C probe', lg.safety.replacements[1].includes('70°C') && lg.safety.replacements[1].includes('no longer pink'));
const bp = wb('black-peppered-chicken-spaghetti');
t('Black-peppered chicken colour cue replaced with 75C', bp.safety.replacements[2].includes('75°C') && bp.diet === 'nonveg' && displayKind(bp, true) === 'chicken');
const hs = wb('hot-and-sour-soup');
t('Hot-and-sour egg streamed into simmering soup; mixed-species diet', hs.safety.replacements[6].includes('simmer') && hs.diet === 'nonveg' && displayKind(hs, true) === 'nonveg');
const as2 = wb('asparagus-soup');
t('Asparagus soup reviewed veg; chilled handling note present', as2.diet === 'veg' && as2.limitation.handling.includes('5°C'));
const cm = wb('chipsi-mayai');
t('Chipsi-mayai egg diet; fully-set endpoint and fry fire note', cm.diet === 'egg' && cm.safety.replacements[14].includes('completely set') && cm.safety.replacements[3].includes('unattended'));
const er = wb('ertesuppe-pea-soup');
t('Ertsuppe source water wording kept verbatim, smoked-pork probe', er.src.lines[1].source.raw === '12 cup water' && er.safety.replacements[3].includes('70°C') && er.diet === 'nonveg' && displayKind(er, true) === 'pork');
const sts = wb('sausage-and-tortellini-soup');
t('Tortellini soup unknown diet (species), 71C endpoint', sts.diet === 'unknown' && sts.safety.replacements[2].includes('71°C'));
const bw = wb('bacon-wrapped-scallops');
t('Scallops deep-fry fire citation and 63C endpoint', bw.safety.replacements[5].includes('63°C') && bw.safety.sources.some(x=>x[0].includes('Fire and Rescue NSW')));
const wr = wb('wine-roasted-pork-roast');
t('Wine roast 71C endpoint, wine retained, campfire caution', wr.safety.replacements[6].includes('71°C') && wr.limitation.detail.includes('no alcohol-free claim') && wr.limitation.grocery.includes('fire restrictions'));
const sc = wb('schweinsbraten');
t('Schweinsbraten no-wash adaptation replaces source wash step', sc.safety.replacements[2].includes('Do not wash') && sc.safety.replacements[8].includes('71°C') && !sc.src.steps[1].text.en.includes('Do not wash'));
const pk = wb('pepper-soup');
t('Pepper soup species-aware endpoint', pk.safety.replacements[3].includes('75°C for chicken') && pk.diet === 'nonveg');
const cf = wb('chicken-fried-steak');
t('Chicken-fried steak side-probe 63C; coating flour unstated gap visible', cf.safety.replacements[5].includes('from the side') && cf.safety.replacements[5].includes('63°C') && cf.limitation.grocery.includes('not stated'));
const gp = wb('garlic-pork-chops-black-mushrooms');
t('Pork-chops broth contradiction kept visible verbatim', gp.limitation.summary.includes('pork broth') && gp.limitation.summary.includes('chicken broth') && gp.safety.replacements[4].includes('71°C'));
const tg = wb('tuna-glop');
t('Tuna-glop reviewed fish from explicit line', tg.diet === 'nonveg' && displayKind(tg, true) === 'fish');
const mo = wb('mostaccioli');
t('Mostaccioli unknown diet fails closed on species-open sausage', mo.diet === 'unknown' && mo.meatKind === null && mo.limitation.detail.includes('fails closed'));
t('Mostaccioli mince+sausage endpoint 71C', mo.safety.replacements[2].includes('71°C'));
t('Mostaccioli dash lines kept as source wording', mo.src.lines.find(l=>l.name==='Sugar').unit === 'dash' && mo.src.lines.find(l=>l.name==='Black pepper').unit === 'dash');
const spb = wb('spaghetti-bake');
t('Spaghetti-bake species-open alternative, species-aware endpoint', spb.diet === 'nonveg' && spb.meatKind === null && spb.safety.replacements[2].includes('75°C') && spb.safety.replacements[2].includes('71°C'));
t('Spaghetti-bake turkey-or-beef traced as alternative both with method', spb.src.lines.find(l=>l.name==='Ground turkey or beef').methodTraceStatus === 'alternative_both_with_method');
const mc = wb('malvani-chicken-curry');
t('Malvani poultry 75C endpoint, water unquantified visible', mc.safety.replacements[6].includes('75°C') && mc.limitation.detail.includes('desired level of consistency'));
t('Malvani reviewed chicken from explicit line', mc.diet === 'nonveg' && displayKind(mc, true) === 'chicken');
const ci = wb('cioppino-italian-seafood-stew');
t('Cioppino 63C fish endpoint, wine visible, mussel sorting kept', ci.safety.replacements[8].includes('63°C') && ci.limitation.detail.includes('no alcohol-free claim') && ci.src.steps.some(x=>x.text.en.includes('closed mussels')));
t('Cioppino notes-only bread not in groceries', ci.src.lines.find(l=>l.name==='Sourdough bread loaves').methodTraceStatus === 'garnish_in_notes_only');
const fb = wb('fabes-con-almejas');
t('Fabes live-clam sorting before and after cooking', fb.safety.replacements[2].includes('stay open when tapped') && fb.safety.replacements[6].includes('stays closed'));
const sj = wb('sloppy-joes');
t('Sloppy-joes 71C mince endpoint; buns gap visible', sj.safety.replacements[1].includes('71°C') && sj.limitation.detail.includes('not the ingredient list'));
const brc = wb('brown-rice-casserole');
t('Brown-rice-casserole cooked-rice handling note present', typeof brc.limitation.handling === 'string' && brc.limitation.handling.includes('Bacillus cereus'));
const msj = wb('meatless-sloppy-joes');
t('Meatless sloppy joes unknown diet despite source vegetarian claim', msj.diet === 'unknown' && msj.src.sourceDietClaims.includes('vegetarian') && msj.limitation.detail.includes('unverified'));
const kv = wb('keralan-vegetable-stew');
t('Keralan vinegar gap kept visible as source omission', kv.src.lines.find(l=>l.name==='Vinegar').methodTraceStatus === 'source_method_omits_line' && kv.limitation.detail.includes('never adds it'));
t('Keralan reviewed veg', kv.diet === 'veg');
const mt = wb('mini-three-cheese-english-muffin-pizzas');
t('Mini-pizzas frankfurter species-open fail-closed', mt.diet === 'unknown' && mt.limitation.detail.includes('fails closed') && mt.safety.replacements[7].includes('60°C'));
const tr = wb('tripes-a-la-mode-de-caen');
t('Tripes alcohol visible; infobox/method time contradiction kept', tr.limitation.detail.includes('no alcohol-free claim') && tr.src.sourceTimes.prepMinutes === 25 && tr.limitation.detail.includes('10–12 hours'));
const ys = wb('yetsom-shiro');
t('Yetsom shiro broth-or-water alternative both with method', ys.src.lines.find(l=>l.name==='Vegetable broth or water'||l.name.includes('broth')).methodTraceStatus === 'alternative_both_with_method' && ys.diet === 'veg');
const ra = wb('risotto-alla-milanese');
t('Milanese unknown diet (broth formulation), wine visible', ra.diet === 'unknown' && ra.limitation.detail.includes('no alcohol-free claim'));
const rp = wb('radish-pie');
t('Radish-pie sherry visible; egg-set endpoint', rp.limitation.detail.includes('no alcohol-free claim') && rp.safety.replacements[7].includes('71°C'));
const pcc = wb('potato-chickpea-curry');
t('Potato-chickpea reviewed veg; serving rice excluded', pcc.diet === 'veg' && pcc.limitation.detail.includes('not included in the groceries'));
const caz = wb('cazuela-gallega');
t('Cazuela egg-set endpoint; source salt gap visible', caz.safety.replacements[7].includes('71°C') && caz.limitation.detail.includes('kept visible'));
console.log(`wikibooks contract: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
