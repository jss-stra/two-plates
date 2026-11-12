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
const lambSausages = IMPORTED.get('wikibooks:lamb-sausages-and-grilled-potatoes');
t('Lamb Sausages source grounds no cuisine and stays null', lambSausages.cuisine == null);
t('Null cuisine never breaks non-empty search by name', importedMatches(lambSausages,base,{query:'lamb sausages'}));
t('Null cuisine never breaks non-empty search miss', !importedMatches(lambSausages,base,{query:'definitely-not-in-this-recipe'}));
t('Null cuisine never breaks All-group non-empty search (group omitted, matching app.js caller)', importedMatches(lambSausages,base,{query:'lamb sausages',vegOnly:false,quick:false}));
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
t('Tortellini soup species-open sausage probes to 75C', sts.safety.replacements[2].includes('75°C') && sts.safety.note.includes('might contain poultry'));
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
t('Mostaccioli species-open sausage probes to 75C (possibly poultry)', mo.safety.replacements[2].includes('75°C') && mo.safety.note.includes('might contain poultry') && mo.safety.sources.some(x=>x[0].includes('FSANZ: poultry 75°C')));
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
const pm2 = wb('penne-meat-sauce');
t('Penne species-open sausage probes to 75C', pm2.safety.note.includes('might contain poultry') && JSON.stringify(pm2.safety.replacements).includes('75°C'));
const si2 = wb('simple-italian-sausage-spaghetti');
t('Simple-sausage species-open probes to 75C', si2.safety.note.includes('might contain poultry') && JSON.stringify(si2.safety.replacements).includes('75°C'));
const sk = wb('sweet-italian-sausage-skillet');
t('Skillet species-open sausage probes to 75C', sk.safety.note.includes('might contain poultry') && JSON.stringify(sk.safety.replacements).includes('75°C'));
const bl = wb('spaghetti-bolognese');
t('Known-beef bolognese endpoint unchanged at 71C, no poultry wording', JSON.stringify(bl.safety).includes('71°C') && !JSON.stringify(bl.safety).includes('might contain poultry'));
const cwk = wb('chuck-wagon-beans');
t('Known-beef chuck-wagon endpoint unchanged, no poultry wording', !JSON.stringify(cwk.safety).includes('might contain poultry'));
// es.wikibooks batch1 contract (pinned revisions, ES verbatim + EN translation layer)
const wes = (id) => IMPORTED.get('wikibooks-es:' + id);
const esIds = ['es-arroz-con-gandules', 'es-sopa-de-lima', 'es-pepian', 'es-marmitako-de-bonito', 'es-rocoto-relleno-a-la-cusquena', 'es-seco-de-gallina', 'es-fabada-asturiana-olla-a-presion', 'es-gazpacho-andaluz', 'es-bandeja-paisa', 'es-tacos-de-pollo-al-pastor'];
for (const id of esIds) {
  const r = wes(id);
  t(`${id} registered`, !!r);
  t(`${id} attribution pinned`, r.src.rights.credit.includes('es.wikibooks') && /es\.wikibooks\.org/.test(r.src.rights.sourceUrl) && Number.isInteger(r.src.sourceRecord.revid));
  t(`${id} license retained`, r.src.rights.license === 'CC BY-SA 4.0');
  t(`${id} ES verbatim raws and steps kept`, r.src.lines.every(l => typeof l.source.raw === 'string' && l.source.raw.length > 0) && Array.isArray(r.src.sourceRecord.sourceStepsEs) && r.src.sourceRecord.sourceStepsEs.length === r.src.steps.length);
  t(`${id} fixed base, no time band`, r.time === null && r.src.sourceTimes.guaranteedElapsedTime === false);
}
const gand = wes('es-arroz-con-gandules');
t('Gandules rice handling note and pork review', gand.limitation.handling.includes('Bacillus cereus') === false && gand.limitation.handling.includes('5C') && gand.diet === 'nonveg' && displayKind(gand, true) === 'pork');
t('Gandules boiling-liquid reuse kept', gand.src.lines.find(l => l.name === 'Pigeon-pea boiling liquid').quantity === '1.5' && gand.limitation.detail.includes('only cooking liquid'));
const lima = wes('es-sopa-de-lima');
t('Lima soup only, poultry endpoint', lima.name.includes('(soup only)') && lima.safety.replacements[1].includes('75°C') && displayKind(lima, true) === 'chicken');
t('Lima unstated salt/oil not invented', lima.src.lines.find(l => l.name === 'Salt').unit === 'unstated' && lima.src.lines.find(l => l.name === 'Oil').unit === 'unstated' && importedShoppingRows(lima, base).find(x => x.key === 'src:wikibooks-es:es-sopa-de-lima:008').text === 'quantity not stated');
const pep = wes('es-pepian');
t('Pepian species-open fails closed nonveg, salt-pepper method gap kept', pep.diet === 'nonveg' && pep.meatKind === null && pep.src.lines.find(l => l.name === 'Salt and pepper').methodTraceStatus === 'source_method_omits_line' && pep.limitation.detail.includes('never explicitly adds'));
t('Pepian species-aware endpoint', pep.safety.replacements[5].includes('71°C') && pep.safety.replacements[5].includes('75°C'));
const marm = wes('es-marmitako-de-bonito');
t('Marmitako source-stated nutrition shape (NHLBI block), unvalidated wording', marm.src.nutritionStatus === 'source-stated' && marm.src.nutritionSourceStated.perServing.calories === '300 kcal (aprox.)' && marm.src.nutritionSourceStated.variants.length === 0 && marm.src.nutritionSourceStated.basis.includes('not computed or validated') && marm.src.nutrition.kcal === null);
t('Marmitako fish endpoint and omega-3 claim not carried', marm.safety.replacements[9].includes('63°C') && marm.limitation.detail.includes('not carried'));
const roc = wes('es-rocoto-relleno-a-la-cusquena');
t('Rocoto beef endpoint, batter lines traced', roc.safety.replacements[4].includes('71°C') && roc.src.lines.find(l => l.name === 'Eggs (for the batter)').methodSteps.length === 2 && displayKind(roc, true) === 'beef');
const sec = wes('es-seco-de-gallina');
t('Seco poultry endpoint; oil method gap kept; beer visible', sec.safety.replacements[5].includes('75°C') && sec.src.lines.find(l => l.name === 'Oil').methodTraceStatus === 'source_method_omits_line' && sec.limitation.detail.includes('alcohol-free'));
const fab = wes('es-fabada-asturiana-olla-a-presion');
t('Fabada fresh tocino 71C after opening; beans fully cooked', fab.safety.replacements[5].includes('71°C') && fab.limitation.detail.includes('fully cooked'));
const gaz = wes('es-gazpacho-andaluz');
t('Gazpacho veg, source claims shown not accepted, cold handling', gaz.diet === 'veg' && gaz.src.sourceDietClaims.includes('vegan') && gaz.limitation.handling.includes('5C'));
const ban = wes('es-bandeja-paisa');
t('Bandeja egg notes-only, tray tip visible, beef endpoint', ban.src.lines.find(l => l.name === 'Egg').methodTraceStatus === 'garnish_in_notes_only' && ban.limitation.detail.includes('source tip') && ban.safety.replacements[7].includes('71°C') && ban.diet === 'nonveg' && ban.meatKind === null);
const tac = wes('es-tacos-de-pollo-al-pastor');
t('Tacos poultry endpoint with marinade discard', tac.safety.replacements[6].includes('75°C') && tac.safety.replacements[6].includes('discard the used adobo'));
// es.wikibooks batch2 contract (pinned revisions, ES verbatim + EN translation layer)
const es2Ids = ['es-albondigas-en-salsa', 'es-pollo-con-salsa-de-limon', 'es-conejo-en-salsa', 'es-caldo-tlalpeno', 'es-lentejas-de-langar', 'es-atascaburras', 'es-buseca', 'es-caldo-de-frijol', 'es-chuletas-en-naranja'];
for (const id of es2Ids) {
  const r = wes(id);
  t(`${id} registered`, !!r);
  t(`${id} attribution pinned`, r.src.rights.credit.includes('es.wikibooks') && Number.isInteger(r.src.sourceRecord.revid));
  t(`${id} ES verbatim raws and steps kept`, r.src.lines.every(l => l.source.raw.length > 0) && r.src.sourceRecord.sourceStepsEs.length === r.src.steps.length);
}
// Cuy held from the active cooking UI: no grounded species-appropriate endpoint exists (no USDA/NSW/FSA guinea-pig temperature), so it must not be in SOURCES while its record file is retained.
t('cuy held from active UI pending grounded endpoint', !IMPORTED.has('wikibooks-es:es-cuy-en-salsa-de-mani'));
const alb = wes('es-albondigas-en-salsa');
t('Albondigas mixed mince fails closed nonveg, 75C endpoint', alb.diet === 'nonveg' && alb.meatKind === null && alb.safety.replacements[7].includes('75°C'));
t('Albondigas unquantified lines not invented', alb.src.lines.filter(l => l.unit === 'unstated').length === 11 && alb.src.lines[0].quantity === null);
const pcl = wes('es-pollo-con-salsa-de-limon');
t('Pollo limon 75C endpoint, half-breast kept', pcl.safety.replacements[3].includes('75°C') && pcl.src.lines[0].quantity === '0.5' && pcl.src.lines[0].note.en.includes('300 g'));
const con = wes('es-conejo-en-salsa');
t('Conejo grounded USDA rabbit 71C, no NSW claim', con.safety.replacements[4].includes('71°C') && con.safety.replacements[4].includes('USDA rabbit guidance') && con.safety.note.includes('USDA guidance for rabbit') && !con.safety.note.includes('cautious endpoint') && con.safety.sources.some(s => s[1].includes('foodsafety.gov')));
t('Conejo livers offal note with FSA cite', con.safety.note.includes('offal must be cooked thoroughly') && con.safety.sources.some(s => s[1].includes('gov.uk')));
const cuyFile = await import('../data/imported/es-cuy-en-salsa-de-mani.mjs').then(m => m.default);
t('Cuy record retained but unpublished', cuyFile.id === 'wikibooks-es:es-cuy-en-salsa-de-mani' && cuyFile.nutritionStatus === 'unknown');
const ctl = wes('es-caldo-tlalpeno');
t('Tlalpeno 75C before shredding; accompaniments notes-only', ctl.safety.replacements[3].includes('75°C') && ctl.src.lines.find(l => l.name.startsWith('Avocado')).methodTraceStatus === 'garnish_in_notes_only');
const lan2 = wes('es-lentejas-de-langar');
t('Langar valve technique replaced with manual-first release', lan2.safety.replacements[9].includes('Never cover or obstruct the steam valve') && lan2.safety.replacements[9].includes('natural release') && lan2.safety.replacements[9].includes('manual'));
t('Langar release grounded in manufacturer guidance', lan2.safety.sources.some(s => s[1].includes('instantpot.com')) && lan2.safety.sources.some(s => s[1].includes('cuckooamerica.com')) && lan2.safety.note.includes('dangerous'));
t('Langar ES source technique preserved as reference only', lan2.src.sourceRecord.sourceStepsEs[8].includes('toalla') && lan2.limitation.detail.includes('unsafe and is replaced'));
const lan = wes('es-lentejas-de-langar');
t('Langar: no nutrition panel for unit-less energia', lan.src.nutritionStatus === 'unknown' && !('nutritionSourceStated' in lan.src) && lan.src.nutrition.kcal === null);
t('Langar energia kept as unclassified note only', lan.limitation.detail.includes('energia = 300') && lan.limitation.detail.includes('not shown as a calorie'));
const ata = wes('es-atascaburras');
t('Atascaburras 63C cod; garnish eggs/walnuts gap kept', ata.safety.replacements[1].includes('63°C') && ata.src.lines.find(l => l.name === 'Walnuts').methodTraceStatus === 'source_method_omits_line' && ata.limitation.detail.includes('not desalted'));
const bus = wes('es-buseca');
t('Buseca FSA offal endpoint 70C/2min', bus.safety.replacements[10].includes('70°C held for 2 minutes') && bus.safety.sources.some(s => s[1].includes('gov.uk')) && bus.safety.note.includes('offal'));
t('Buseca poroto/habas discrepancy kept', bus.src.lines.find(l => l.name.startsWith('Dried beans')).note.en.includes('habas'));
const cdf = wes('es-caldo-de-frijol');
t('Caldo de frijol nopales gap kept', cdf.limitation.detail.includes('never shows their cooking') && cdf.diet === 'nonveg' && cdf.meatKind === 'pork');
const chu = wes('es-chuletas-en-naranja');
t('Chuletas 71C pork endpoint', chu.safety.replacements[4].includes('71°C') && chu.diet === 'nonveg' && chu.meatKind === 'pork');
const es3Ids = ['es-almejas-a-la-marinera', 'es-amatriciana', 'es-albondigas-de-lenteja', 'es-arroz-negro', 'es-caldereta-de-cordero', 'es-cazuelita-esparragos-colmenillas', 'es-chilcano', 'es-costillas-con-papas', 'es-carne-con-papas', 'es-sopa-juliana'];
for (const id of es3Ids) {
  const r = wes(id);
  t(`${id} registered`, !!r);
  t(`${id} attribution pinned`, r.src.rights.credit.includes('es.wikibooks') && Number.isInteger(r.src.sourceRecord.revid));
  t(`${id} ES verbatim raws and steps kept`, r.src.lines.every(l => l.source.raw.length > 0) && r.src.sourceRecord.sourceStepsEs.length === r.src.steps.length);
}
const alm = wes('es-almejas-a-la-marinera');
t('Almejas shells-open endpoint, unopened discarded', alm.safety.replacements[5].includes('shells open') && alm.safety.replacements[5].includes('does not open') && alm.safety.sources.some(s => s[1].includes('foodsafety.gov')));
const ama = wes('es-amatriciana');
t('Amatriciana method-only salt kept; pancetta pork', ama.src.lines.find(l => l.name.startsWith('Salt')).source.raw === 'agua con sal a gusto' && ama.src.sourceRecord.sourceStepsEs[3].includes('30 minutos') && ama.diet === 'nonveg' && ama.meatKind === 'pork');
const alb3 = wes('es-albondigas-de-lenteja');
t('Lentil balls veg with egg; unquantified coating not invented', alb3.diet === 'veg' && alb3.src.lines.find(l => l.name === 'Eggs').unit === 'unstated' && alb3.src.lines.find(l => l.name === 'Flour').quantity === null);
const arn = wes('es-arroz-negro');
t('Arroz negro pork 71C and prawns pearly-opaque', arn.safety.replacements[6].includes('71°C') && arn.safety.replacements[6].includes('pearly and opaque') && arn.safety.sources.some(s => s[1].includes('foodsafety.gov')));
t('Arroz negro rice handling in note; mixed meats fail closed', arn.safety.note.includes('Cooked rice is a higher-risk food') && arn.diet === 'nonveg' && arn.meatKind === null);
const cal3 = wes('es-caldereta-de-cordero');
t('Caldereta lamb 71C NSW medium editorial', cal3.safety.replacements[4].includes('71°C') && cal3.safety.note.includes('conservative editorial selection of the NSW medium endpoint for lamb') && cal3.meatKind === 'lamb');
const caz9 = wes('es-cazuelita-esparragos-colmenillas');
t('Cazuelita morel thorough-cook FDA/CDC', caz9.safety.note.includes('fully cooked') && caz9.safety.replacements[2].includes('never eat morels raw or undercooked') && caz9.safety.sources.some(s => s[1].includes('fda.gov')) && caz9.safety.sources.some(s => s[1].includes('cdc.gov')));
t('Cazuelita 336 Kcal unclassified note, no panel', caz9.src.nutritionStatus === 'unknown' && !('nutritionSourceStated' in caz9.src) && caz9.limitation.detail.includes('336 Kcal') && caz9.limitation.detail.includes('not shown under Calories'));
const chi = wes('es-chilcano');
t('Chilcano fish 63C', chi.safety.replacements[1].includes('63°C') && chi.meatKind === 'fish');
const cos3 = wes('es-costillas-con-papas');
t('Costillas refrigerated desalting adapted, 71C pork', cos3.safety.replacements[1].includes('refrigerator at 5°C or colder') && cos3.safety.replacements[6].includes('71°C'));
t('Costillas potatoes unquantified, mojo not included', cos3.src.lines.find(l => l.name === 'Potatoes').unit === 'unstated' && cos3.limitation.detail.includes('mojo de cilantro'));
const car3 = wes('es-carne-con-papas');
t('Carne con papas beef 63C whole-cut', car3.safety.replacements[8].includes('63°C') && car3.meatKind === 'beef');
const sop3 = wes('es-sopa-juliana');
t('Sopa juliana vegan, template time 1 not carried', sop3.diet === 'vegan' && sop3.limitation.detail.includes('with no unit'));
console.log(`wikibooks contract: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
