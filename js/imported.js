// Source-native imported recipes: fixed base servings, exact source units,
// unknown nutrition. These records NEVER join the compact catalog (RECIPES),
// so auto-planning, numeric protein/kcal bands and catalog grocery scaling
// cannot see them. They are browseable, manually addable to the plan as a
// fixed base batch, and shoppable at exact source quantities.
import { RECIPE_BY_ID, isVeg, displayKind } from './data.js';
import { IMPORTED_SAFETY } from './imported-safety.js';
import ratatouille from '../data/imported/ratatouille.mjs';

import draniki from '../data/imported/draniki.mjs';
import galayet from '../data/imported/galayet-bandora.mjs';
import kaesespaetzle from '../data/imported/kaesespaetzle.mjs';
import melanzane from '../data/imported/melanzane-alla-parmigiana.mjs';
import byrek from '../data/imported/byrek-me-spinaq.mjs';
import misir from '../data/imported/misir-wat.mjs';
import tortilla from '../data/imported/tortilla-espanola.mjs';
import chicken from '../data/imported/chakhokhbili.mjs';
import irish from '../data/imported/irish-stew.mjs';
import farikal from '../data/imported/farikal.mjs';
import fish from '../data/imported/qingzheng-yu.mjs';
import lentilSoup from '../data/imported/mercimek-corbasi.mjs';
import coldSoup from '../data/imported/tarator.mjs';
import fondue from '../data/imported/fondue-moitie-moitie.mjs';
import spinachPie from '../data/imported/spanakopita.mjs';
import strukli from '../data/imported/zagorski-strukli.mjs';
import jollof from '../data/imported/jollof-rice.mjs';
import souvla from '../data/imported/souvla.mjs';
import trout from '../data/imported/ohridska-pastrmka.mjs';
import paprikaChicken from '../data/imported/paprika-chicken.mjs';
import softTacos from '../data/imported/vegetarian-soft-tacos.mjs';
import adultMac from '../data/imported/adult-mac-and-cheese.mjs';
import agnolotti from '../data/imported/agnolotti-in-brodo.mjs';
import garbanzoSoup from '../data/imported/galician-garbanzo-soup.mjs';
import porkLima from '../data/imported/pork-and-lima-skillet.mjs';
import spaghettiBolognese from '../data/imported/spaghetti-bolognese.mjs';
import spareRibs from '../data/imported/barbecued-spare-ribs.mjs';
import poutine from '../data/imported/poutine.mjs';
import penneMeatSauce from '../data/imported/penne-meat-sauce.mjs';
import jambalayaI from '../data/imported/jambalaya-i.mjs';
const SOURCES = [ratatouille, draniki, galayet, kaesespaetzle, melanzane, byrek, misir, tortilla, chicken, irish, farikal, fish, lentilSoup, coldSoup, fondue, spinachPie, strukli, jollof, souvla, trout, paprikaChicken, softTacos, adultMac, agnolotti, garbanzoSoup, porkLima, spaghettiBolognese, spareRibs, poutine, penneMeatSauce, jambalayaI];
const LIMITATIONS = {
  'unitools:ohridska-pastrmka': { summary: 'Whole fish; shared oil and lemons; wine retained', detail: 'The source lists four whole gutted trout without weights. No kg, edible yield or exact trout species is inferred, and the regional name does not establish Lake Ohrid origin. The 80 ml olive oil is shared between rubbing, greasing and the remaining pour; the three lemons supply cavity slices and serving wedges. No numeric split or extra amount is invented. The 800 g potatoes are cooked under the raw fish, not an uncooked garnish. Wine remains 150 ml with no alcohol-free claim. Follow the adapted endpoint and raw-fish separation note. Whole gutted fish still have bones; take care when serving and eating. Product formulations and cross-contact remain unreviewed.', grocery: 'Four whole gutted fish, no weight conversion; oil and lemons are shared totals; contains wine' },
  'unitools:souvla': { summary: 'Pork shoulder; charcoal spit and probe needed', detail: 'The actual ingredient is 2.5 kg pork shoulder, not a pork-or-lamb choice despite the broader source summary. The source cuts pieces of about 200 g; no exact piece count is inferred. Pita formulation and cross-contact are unverified. No marinade, oil, dressing or extra side is added. This requires suitable charcoal-spit equipment and a food thermometer, not an ordinary pan. Check current local fire restrictions before lighting; no current restriction status is checked by this recipe. Follow the separately adapted cooking steps and handling note.', grocery: 'Pork shoulder 2.5 kg; separate charcoal-spit equipment and food thermometer required' },
  'unitools:jollof-rice': { summary: 'Contains chicken stock; rice storage matters', detail: 'The source explicitly lists 600 ml chicken stock. Its vegetarian and vegan tags contradict that ingredient and are not accepted here. This is not a vegetarian dish; product formulations and cross-contact are unverified. The 500 g long-grain rice retains its source rinsed note, without a dry/rinsed-weight conversion or cooked-yield estimate. One onion is blended and the second fried, as the source says. The 600 ml stock remains unchanged; pot and rice differences may affect the result. Source cooking times are not tested doneness or yield guarantees. Salt is explicit in Russian step 4; the English says only season. No extra meat or side is included.', grocery: 'Contains 600 ml chicken stock, not a vegetarian substitution', handling: 'Two Plates rice-storage note (separate from the source method): cool promptly in small portions, cover and refrigerate below 5°C within 2 hours. Eat refrigerated cooked rice within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard. Reheat rice only once, until steaming hot throughout (at least 60°C), stirring microwaved food. Reheating does not repair unsafe or unknown storage. NSW pregnancy advice is stricter: use rice within 1 day and reheat once to at least 60°C; this note does not certify this dish for pregnancy. Follow stock and other product storage, use-by and cooking directions.', handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers', handlingLabel: 'NSW leftovers guidance', handlingExtraUrl: 'https://www.foodauthority.nsw.gov.au/consumer/life-events-and-food/pregnancy/foods-to-eat-or-avoid-when-pregnant', handlingExtraLabel: 'NSW pregnancy-specific guidance' },
  'unitools:zagorski-strukli': { summary: 'Adapted egg endpoint; divided oil and butter', detail: 'The 600 g dry curd cheese is the source ingredient, not a pre-drain weight for another cheese. The source uses the 2 tbsp oil in the dough and on its surface, and the 60 g butter for brushing and the final topping, without giving numeric allocations. These stay total source inputs; no extra oil or butter amount is invented. Salted boiling water is an unquantified cooking medium, separate from the listed 150 ml warm water for the dough. The one dough egg and two filling eggs remain separate lines. Cheese and dairy formulations and pasteurisation are not verified; this dish is not classified as vegetarian. Use the adapted egg endpoint below, not browning or the source times alone.', grocery: 'Oil 2 tbsp and butter 60 g are shared totals; prepare separate salted boiling water' },
  'unitools:fondue-moitie-moitie': { summary: 'Contains wine and kirsch; no alcohol-free claim', detail: 'The source uses 300 ml wine and 2 tbsp kirsch. No claim is made that the alcohol evaporates or that this dish is alcohol-free. Cheese and bread formulations, rennet and pasteurisation are not verified. Follow product storage, use-by and cooking directions; this recipe does not override them. A low burner setting is not a measured hot-holding temperature. The separately adapted serving step includes a thermometer check and burner-attention note.', grocery: 'Contains wine and kirsch; no alcohol-free claim' },
  'unitools:spanakopita': { summary: 'Adapted egg steps; filo sheet sizes vary', detail: 'The source gives 450 g filo but uses 13 sheets without sheet dimensions or weight. Check your pastry before starting; there is no guaranteed sheet-to-packet conversion. The 150 ml olive oil remains total source input: a spoon for onion and brushing the pastry, with no invented gram split or absorbed fraction. The final water flick is an unquantified process sprinkle, not a new fixed shopping amount. Cheese and pastry formulations are not verified. Use the adapted egg instructions, not the original raw-filling tasting cue.', grocery: 'Filo 450 g, but 13 sheets have unspecified dimensions; check before starting' },
  'unitools:melanzane-alla-parmigiana': { summary: 'Pepper has no explicit method step', detail: 'The source ingredient line is salt and pepper to taste, but its method explicitly adds salt only. No pepper instruction is supplied or invented here. Cheese formulations and strict vegetarian status are not reviewed.', grocery: 'Source gap: salt-and-pepper line has salt-only instructions' },
  'unitools:mercimek-corbasi': { summary: 'Soup only; salt/stock method gaps', detail: 'Soup only, not a nutritionally verified full meal; bread or other sides are not included. The source lists salt to taste but never explicitly adds it in the method. That gap is retained rather than inventing a step. The ingredient list says 1.4 l water or stock, but both source-method languages name only water. The stock alternative has no separate method instructions; its formulation is also unknown. This gap is not repaired here, and the listed alternative and quantity stay unchanged. The source splits 40 g butter between a spoon at the start and the rest at the finish, without a gram allocation. Extra boiling water to loosen the soup is an unquantified process instruction, not a fixed shopping quantity.', grocery: 'Source gaps: salt has no method step; water-or-stock line has water-only instructions' },
  'unitools:tarator': { summary: 'Soup only; ice needed separately', detail: 'Cold soup only, not a nutritionally verified full meal; bread or other sides are not included. The source method serves an ice cube in each bowl, but ice is absent from its ingredient list. Prepare ice separately for the bowls you serve; this is not included in the listed 200 ml cold water, which stays unchanged. The grocery heading repeats this reminder. Yoghurt formulation and pasteurisation are not verified.', grocery: 'Source-method reminder: ice cube per bowl, separate from listed 200 ml water', handling: 'Two Plates handling note (not a change to the source method): wash cucumber and herbs under running water, use clean utensils, follow the yoghurt label storage and use-by directions, and keep the soup at 5°C or colder until serving. These steps do not certify the recipe or clear allergies.', handlingUrl: 'https://www.foodstandards.gov.au/consumer/prevention-of-foodborne-illness/food-safety-basics' },
  'unitools:kaesespaetzle': { summary: 'Salad unquantified; milk method gap', detail: 'The source suggests a green salad with vinegar dressing but supplies no quantities. That optional side is not in the groceries for this dish. The ingredient list gives water or milk, but the dough method names only water in both languages; no separate milk instructions are supplied. This gap is not repaired here. Emmental or Bergkäse remain source choices; no formulation or strict vegetarian clearance is implied.', grocery: 'Source gap: water-or-milk line has water-only instructions; suggested salad unquantified' },
  'unitools:byrek-me-spinaq': { summary: 'Filo sheet sizes vary: see recipe', detail: 'The source supplies 500 g of prepared filo but describes layers by sheet count. It does not specify sheet dimensions or weight per sheet, so those counts cannot be converted into a guaranteed packet size. Check your pastry before starting. Cheese and pastry formulations are not reviewed.' },
  'unitools:misir-wat': { summary: 'Stew only: bread not included', detail: 'This is the stew only. The source suggests injera or flatbread to serve, but gives no bread quantity or recipe. Bread is not included in these groceries. Berbere and neutral-oil formulations are unspecified; no verified vegan or allergy-free claim is made.' },
  'wikibooks:paprika-chicken': { summary: 'Unquantified salt, parsley and pan water', detail: 'The source lists salt and fresh parsley without quantities; both stay unquantified rather than inventing amounts. The water added to cover the meat and any later top-ups are unquantified process instructions, not fixed shopping amounts; the source asks for only a thin layer of gravy at the end. Paprika (2–4 tbsp) and olive oil (5–7 tbsp) are source ranges, kept unchanged. The green pepper, red pepper, carrot and second onion are marked optional in the source. Sour cream replaces the traditional lard in this source version; dairy formulations are unverified. The source gives the 6–8 serving yield as a range. Use the adapted poultry endpoint below, not the source time or tenderness cue alone.', grocery: 'Salt and parsley quantities not stated; pan water unquantified; paprika and oil are source ranges' },
  'wikibooks:vegetarian-soft-tacos': { summary: 'Bean can size and sour cream amount not stated', detail: 'The source lists one can of refried beans without a can size and sour cream without a quantity; both stay as written rather than inventing amounts. The beef substitute is a branded vegetarian product example; its formulation, and the tortilla and refried-bean formulations, are unverified, so this dish is not classified as vegetarian despite the source category. Cheese is a suggested topping; dairy formulation is unverified. Toppings are the source suggestions and stay optional.', grocery: 'Refried beans: 1 can, size not stated; sour cream amount not stated' },
  'wikibooks:adult-mac-and-cheese': { summary: 'Cheese formulations unverified', detail: 'The butter is a source-divided total: 2 tbsp melted first, then the rest whisked in 1 tbsp at a time; no other split is invented. The salted pasta water is an unquantified process medium beyond the listed ½ tsp. Cheese formulations, including rennet, are unverified; this dish is not classified as vegetarian. The source page carries its own nutrition summary, which is not verified or used here; nutrition stays unknown.', grocery: 'Five cheeses; formulations unverified; extra salt needed for pasta water' },
  'wikibooks:agnolotti-in-brodo': { summary: 'Soup only; pasta cooks per its package; contains sherry', detail: 'Soup only, not a nutritionally verified full meal; the garlic bread and salad the source suggests are not included. The pasta cooking time comes from the package directions of the product, which govern doneness of the filling; filling composition is unspecified and often meat, so diet stays unclassified. The broth line is a source alternative: ½ litre chicken broth or ½ litre water with 2 stock cubes; both are covered by the source method. The sherry dash is an unquantified amount the source leaves to the cook; the dish contains alcohol and no alcohol-free claim is made. Parsley is a source handful; Parmesan is an unquantified garnish.', grocery: 'Soup only; pasta doneness follows its package; contains a dash of sherry' },
  'wikibooks:galician-garbanzo-soup': { summary: 'Soup only; broth formulation unverified', detail: 'Soup only, not a nutritionally verified full meal; the salad, bread and wine the source suggests alongside are not included. The 3 cans of beans total 45 oz / 1.26 kg per the source. The broth line is a source alternative: vegetable broth, water, or a combination; both are covered by the source method, and the broth formulation is unverified, so diet stays unclassified despite the source vegetarian and gluten-free category claims. The basil garnish appears only in the source serving notes, not the numbered method; that gap is kept visible rather than inventing a step. The tomato line is a source alternative: 2 fresh tomatoes or 1 cup canned.', grocery: 'Soup only; basil garnish has no method step; broth or water both work' },
  'wikibooks:pork-and-lima-skillet': { summary: 'Adapted pork endpoint; gravy-base formulation unverified', detail: 'The source gives no browning time for the chops and finishes with a short covered heat-through; use the adapted measured endpoint below rather than time or colour. Chop thickness is unspecified. The frozen lima beans cook per their package directions. The gravy base is a manufactured product whose formulation is unverified. The source wording is 2 packages (10 ounces) of lima beans, kept as written.', grocery: 'Gravy base formulation unverified; lima beans cook per package' },
  'wikibooks:spaghetti-bolognese': { summary: 'Adapted mince endpoint; contains wine', detail: 'The source boils then gently simmers the sauce for an hour or more; use the adapted mince endpoint below rather than relying on that time alone. The ¼ lb (125 g) ham or bacon is a source choice of either meat, and both are covered by the source method. The fennel bulb is marked optional in the source ("if available"). The red wine (125 ml) stays in the dish; no alcohol-free claim is made. The beef stock line prefers fresh but accepts canned per the source; stock formulation is unverified. Salt and pepper are genuinely to taste per the source. The one-gallon pasta water is an unquantified-salt process medium, separate from the listed salt. The sauce is a northern Italian Ragu Bolognese per the source summary; this version is served over spaghetti.', grocery: 'Contains red wine; stock fresh or canned per source; fennel optional' },
  'wikibooks:barbecued-spare-ribs': { summary: 'Overnight marinade unrefrigerated in source; adapted pork endpoint', detail: 'The source says "marinate overnight" without saying where: refrigerate the marinating ribs at 5°C or colder (handling note below); the marinade contacts raw pork and is not reused as a sauce. Use the adapted pork endpoint below, not the source 45-plus-15-minute roast alone. The source tip bullets (alternative oven schedule and grilling) are not part of the imported numbered method. The source carries a gluten-free category claim, but soy sauce and hoisin are manufactured products whose formulations are unverified; that claim is shown as an unverified source claim only and is not accepted here. Sake remains in the marinade; no alcohol-free claim. "Serve hot or cold": if serving cold, follow the cooling and refrigeration handling note below. Cumin is optional per the source.', grocery: 'Marinate refrigerated; soy/hoisin formulations unverified despite source gluten-free tag; contains sake', handling: 'Two Plates handling note (not a change to the source method): refrigerate the ribs at 5°C or colder during the overnight marinade, in a covered non-reactive dish. Discard the used marinade; it contacted raw pork. If serving cold, cool promptly in small portions, cover and refrigerate below 5°C within 2 hours and eat within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard. Reheat only once, until steaming hot throughout (at least 60°C). Reheating does not repair unsafe or unknown storage.', handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers', handlingLabel: 'NSW leftovers guidance' },
  'wikibooks:poutine': { summary: 'Deep-frying; fresh curds and canned sauce formulations unverified', detail: 'The potatoes are deep-fried in 1 L of oil at 185°C; follow the deep-frying fire-safety note below and never leave the hot oil unattended. The source fries twice: about 5 minutes, then about 1 minute to crisp. The canned poutine sauce (mélange à sauce poutine) or gravy is a manufactured product whose formulation, including any meat content, is unverified, so diet stays unclassified. Fresh cheddar cheese curds are a perishable dairy product; buy them fresh, keep refrigerated at 5°C or colder, follow the package use-by, and limit their time at room temperature to the assembly described. The 2-cup curd measure and the 290 g can are the source quantities, kept as written. Mozzarella is the source alternative for curds.', grocery: 'Deep-frying: see fire-safety note; gravy formulation unverified; keep curds refrigerated' },
  'wikibooks:penne-meat-sauce': { summary: 'Adapted sausage endpoint; sausage species and sauce formulation unverified', detail: 'The source browns the sausage until "browned and crumbled"; use the adapted sausage endpoint below rather than colour. The Italian sausage species (pork, beef, chicken or other) and its seasoning are not stated, and the meat-flavored spaghetti sauce is a manufactured product whose formulation is unverified, so diet stays unclassified. The pasta cooks per its own package directions; the salted pasta water is an unquantified process medium. The ½ cup hot water, 20 oz sausage package, 26½ oz sauce can and 6 oz tomato-paste can are source quantities, kept as written.', grocery: 'Sausage species unstated; sauce formulation unverified; pasta cooks per package' },
  'wikibooks:jambalaya-i': { summary: 'Uses already-cooked poultry; rice storage matters', detail: 'The 2 cups of turkey or chicken are already-cooked meat: prepare it safely fresh, or use leftovers with a known safe cooling and storage history (handling note below); unknown or unsafe storage is not repaired by the 20-minute simmer. The mushroom line is an unquantified "small can", kept as written rather than inventing a size; it is optional and drained per the source. The rice absorbs the cooking liquid; source rice quantity (⅔ cup) is the dry measure, kept unchanged. The herb-spice powder, celery, canned tomatoes and broth are per the source. Cooked rice leftovers need prompt cooling and refrigeration; follow the rice handling note below. Broth formulation is unverified.', grocery: 'Cooked poultry must be safely prepared or stored; mushrooms: small can, size not stated', handling: 'Two Plates handling note (not a change to the source method): the cooked turkey or chicken must be freshly and safely cooked, or refrigerated leftovers with a known safe history: cooled promptly in small portions, covered, refrigerated below 5°C within 2 hours and used within 2 days. Count all time between 5°C and 60°C cumulatively: under 2 hours, use or refrigerate; 2 to 4 hours, use immediately or discard, not refrigerate for later; after 4 hours, discard. Cool leftover jambalaya promptly the same way; cooked rice supports growth of Bacillus cereus if left warm. Reheat leftovers only once, until steaming hot throughout (at least 60°C), stirring microwaved food. Reheating does not repair unsafe or unknown storage. NSW pregnancy advice is stricter: use rice within 1 day and reheat once to at least 60°C; this note does not certify this dish for pregnancy.', handlingUrl: 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers', handlingLabel: 'NSW leftovers guidance', handlingExtraUrl: 'https://www.foodauthority.nsw.gov.au/consumer/life-events-and-food/pregnancy/foods-to-eat-or-avoid-when-pregnant', handlingExtraLabel: 'NSW pregnancy-specific guidance' },
};
export const IMPORTED = new Map();

// Reviewed per-record diet classifications. A dish gets a diet class ONLY
// when a reviewer derived it from the actual retained lines (never from
// source diet tags). Anything unreviewed or uncertain - meat, egg, cheese,
// bread, stock, dressings - stays 'unknown' and is never shown as veg or
// chicken. Keyed by record id; the source modules stay verbatim.
const REVIEWED_DIET = {
  'unitools:ohridska-pastrmka': { diet: 'nonveg', meatKind: 'fish', basis: 'Four whole gutted trout explicit in ingredient line 1; all ten source lines independently read. No fish weight, origin, product formulation or cross-contact clearance inferred.' },
  'unitools:souvla': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork shoulder explicit in ingredient line 1; not the summary pork-or-lamb wording. Pita formulation and cross-contact not cleared.' },
  'unitools:qingzheng-yu': { diet: 'nonveg', meatKind: 'fish', basis: 'Whole gutted sea bass or bream explicit in source line1. Sauce and oil formulations not cleared.' },
  'unitools:tortilla-espanola': { diet: 'egg', basis: 'All five source lines reviewed: potato, onion, eggs, olive oil, salt. Egg present; no meat named.' },
  'unitools:chakhokhbili': { diet: 'nonveg', meatKind: 'chicken', basis: 'Chicken explicit in source line1; no cut or bone assumption. Blend formulation not cleared.' },
  'unitools:irish-stew': { diet: 'nonveg', meatKind: 'lamb', basis: 'Bone-in lamb neck or shoulder explicit in source line1. Vegetable stock alternative does not clear lamb.' },
  'unitools:farikal': { diet: 'nonveg', meatKind: 'mutton', basis: 'Bone-in mutton explicit in source line1. Not renamed lamb. Optional flour retained.' },
  'unitools:draniki': { diet: 'veg', basis: '2026-11-11: all six retained lines reviewed: potatoes, onion, vegetable oil, soured cream, dill, salt/pepper. Dairy present; purchased product formulation and cross-contact not cleared.' },
  // Galayet includes flatbreads of unspecified formulation: leave unknown.
  // All 10 retained lines are plant foods, olive oil and salt/pepper.
  'unitools:ratatouille': { diet: 'veg', basis: 'lines reviewed 2026-11-11: aubergine, courgette, pepper, tomatoes, onion, garlic, olive oil, thyme, basil, salt/pepper - no meat/fish/egg/dairy/grain line' },
  'wikibooks:paprika-chicken': { diet: 'nonveg', meatKind: 'chicken', basis: 'Whole chicken explicit in source line 1; all thirteen source lines independently read 2026-11-12. Dairy formulations and cross-contact not cleared.' },
  'wikibooks:pork-and-lima-skillet': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork loin chops explicit in source line 2; all six source lines independently read 2026-11-12. Gravy-base formulation and cross-contact not cleared.' },
  'wikibooks:spaghetti-bolognese': { diet: 'nonveg', meatKind: 'beef', basis: 'Ground beef explicit in source line 2 and ham-or-bacon in line 1; all eighteen source lines independently read 2026-11-12. Stock and cheese formulations and cross-contact not cleared.' },
  'wikibooks:barbecued-spare-ribs': { diet: 'nonveg', meatKind: 'pork', basis: 'Pork spare ribs explicit in source line 1; all twelve source lines independently read 2026-11-12. Soy, hoisin and stock formulations and cross-contact not cleared; source gluten-free category not accepted.' },
  'wikibooks:jambalaya-i': { diet: 'nonveg', meatKind: 'chicken', basis: 'Cooked turkey or chicken explicit in source line 12; all thirteen source lines independently read 2026-11-12. Broth formulation and cross-contact not cleared.' },
  // Poutine: canned poutine sauce/gravy formulation unverified (meat content possible); fresh-curd dairy noted but diet stays unknown.
  // Penne: Italian sausage species unstated; sauce formulation unverified.
  // Tacos: beef-substitute, tortilla, bean and cheese formulations unverified despite source vegetarian category.
  // Mac and cheese: five-cheese dish, rennet/formulations unverified. Agnolotti: filling composition unspecified, often meat.
  // Garbanzo soup: all plant lines, but manufactured broth formulation unverified.
};

function adapt(src) {
  return {
    id: src.id,
    name: src.name + (src.id === 'unitools:misir-wat' ? ' (stew only)' : ['unitools:mercimek-corbasi', 'unitools:tarator', 'wikibooks:agnolotti-in-brodo', 'wikibooks:galician-garbanzo-soup'].includes(src.id) ? ' (soup only)' : ''),
    limitation: LIMITATIONS[src.id] || null,
    cuisine: src.cuisine,
    group: src.cuisine, // picker "same cuisine" chip label only; never scored
    country: src.country,
    diet: REVIEWED_DIET[src.id]?.diet || 'unknown',
    dietBasis: REVIEWED_DIET[src.id]?.basis || null,
    meatKind: REVIEWED_DIET[src.id]?.meatKind || null,
    safety: IMPORTED_SAFETY[src.id] || null,
    mainProtein: null,
    protein: null,
    kcal: null,
    time: null, // source prep/cook times shown in the detail view, not summed
    tags: [],
    items: [], // no catalog mapping: exclusionHits returns empty; gating below
    nutritionApproximate: false,
    imported: true,
    baseServings: src.baseServings,
    src,
  };
}

for (const s of SOURCES) {
  const r = adapt(s);
  IMPORTED.set(r.id, r);
  // Slot/history lookups resolve through RECIPE_BY_ID; planner pools iterate
  // RECIPES, which this never touches.
  RECIPE_BY_ID[r.id] = r;
}

export const isImported = (id) => IMPORTED.has(id);
export const importedList = () => [...IMPORTED.values()];

// Manual fixed-base add gate. Fails closed on ANY active allergy/dislike
// restriction: imported lines have no reviewed catalog/allergen mapping yet,
// so they cannot be checked - empty mappings are never treated as no hits.
export function importedAddStatus(state, id) {
  const r = IMPORTED.get(id);
  if (!r) return { allowed: false, reason: 'Unknown dish.' };
  const x = state.exclusions || {};
  if ((x.allergies?.length || 0) + (x.dislikes?.length || 0) > 0) {
    return { allowed: false, reason: 'Allergy and dislike checks are not reviewed for imported dishes yet. Choose a dish with reviewed ingredient checks instead.' };
  }
  return { allowed: true };
}

// Exact original-base shopping rows: no rescaling, no unit conversion, no
// mass guesses. Adding the dish to the plan means cooking the original batch.
export function importedShoppingRows(recipe, state) {
  return recipe.src.lines.map((line) => ({
    key: line.lineRef,
    id: null,
    name: line.name + (line.note?.en ? ` (${line.note.en})` : ''),
    aisle: `extra:Imported:${recipe.id}`,
    aisleLabel: `Imported: ${recipe.name} (exact source amounts, ${recipe.baseServings} servings)${recipe.limitation?.grocery ? ` · ${recipe.limitation.grocery}` : ''}`,
    amount: '',
    unit: '',
    text: line.unit === 'toTaste' ? 'to taste' : line.unit === 'unstated' ? 'quantity not stated' : `${line.quantity} ${line.unit}`,
    dishes: [recipe.name],
    pantry: false,
    checked: !!state.checked[line.lineRef],
    bought: state.bought[line.lineRef] || '',
  }));
}

// Unknown time/diet is never a positive match for a browse filter.
export function importedMatches(r, state, { query = '', vegOnly = false, quick = false, kind = null, group = null } = {}) {
  const q = query.trim().toLowerCase();
  if (vegOnly && !isVeg(r, state.rules.eggsCountAsVeg)) return false;
  if (quick && (!Number.isFinite(r.time) || r.time > 30)) return false;
  if (kind === 'veg' && !isVeg(r, state.rules.eggsCountAsVeg)) return false;
  if (kind && kind !== 'veg' && displayKind(r, state.rules.eggsCountAsVeg) !== kind) return false;
  if (group && r.group !== group) return false;
  return !q || r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)
    || r.src.lines.some(l => l.name.toLowerCase().includes(q));
}
