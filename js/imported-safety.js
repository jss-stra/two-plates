// Editorial cooking adaptations. Original UniTools records stay unchanged.
// These endpoints are authority-backed checks, not tested recipe timings.
const NSW_TEMP = 'https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures';
const FSANZ = 'https://www.foodstandards.gov.au/consumer/prevention-of-foodborne-illness/food-safety-basics';
export const IMPORTED_SAFETY = {
  'unitools:fondue-moitie-moitie': {
    title: 'Measure hot holding; attend the burner',
    note: 'Two Plates adapts the serving instruction: if holding the fondue hot, check that the food stays above 60°C with a clean food thermometer, following FSANZ hot-holding guidance. The source lowest-flame setting alone does not prove a food temperature. Follow product storage, use-by and cooking directions, and do not override stricter product instructions. Stay beside the burner and keep children and flammable materials clear; never leave cooking unattended. This does not validate a particular burner/fuel or cheese product, or make this dish suitable for pregnancy. Wine and kirsch remain in the recipe; no alcohol-free claim is made.',
    sources: [['FSANZ: storage and food held above 60°C', FSANZ], ['Fire and Rescue NSW: cooking attention and flammable materials', 'https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/cooking-fire-safety']],
    replacements: { 6: 'Move it to the burner. If holding it hot, use a clean food thermometer to check that the food stays above 60°C; do not assume the source lowest-flame setting proves this. Follow the product directions and attend the burner, keeping children and flammable materials clear. The bread is speared through the crust rather than the crumb.' },
  },
  'unitools:spanakopita': {
    title: 'No raw egg tasting; cook the filling through',
    note: 'The original source recommends tasting after raw eggs enter the filling. Do not taste that mixture raw. Two Plates instead leaves seasoning adjustment until the pie is fully cooked. Cook until the egg filling is firm or set through the centre, not runny, checking the thickest part with a clean food thermometer. Our conservative editorial target is at least 71°C, selected from NSW pregnancy-specific cooked-egg-dish advice, not a universal legal threshold or a tested 50-minute process. This egg-focused target does not certify the cheese product or make the whole dish suitable for pregnancy. Continue cooking if needed; a deep-gold crust does not measure the filling. People under 2, pregnant, over 70 or with weakened immunity should avoid raw or lightly cooked eggs. Follow the adapted steps below, not the source tasting cue.',
    sources: [['NSW: raw and lightly cooked egg risk', 'https://www.foodauthority.nsw.gov.au/consumer/food-extra-care/eggs-enjoy-safely/higher-risk-dishes'], ["NSW: set egg dishes (children's services poster)", 'https://www.foodauthority.nsw.gov.au/sites/default/files/_Documents/retailfactsheets/cook_food_thoroughly.pdf'], ['NSW: pregnancy-specific 71°C advice', 'https://www.foodauthority.nsw.gov.au/consumer/life-events-and-food/pregnancy/foods-to-eat-or-avoid-when-pregnant']],
    replacements: {
      3: 'Mix the spinach with the onion, feta, dill, eggs, nutmeg and pepper. Do not taste this raw egg filling. Leave any further seasoning adjustment until the pie is fully cooked; the feta is already salty.',
      6: 'Score the top into portions without cutting through to the filling and flick water over it. Bake at 180°C until the filling is firm or set through the centre, not runny, and a clean food thermometer in the thickest part reads at least 71°C. The source suggests fifty minutes, but cook longer if needed. A deep-gold crust is a texture cue, not a filling-temperature check. Adjust seasoning only after full cooking.',
    },
  },
  'unitools:qingzheng-yu': {
    title: 'Probe the whole fish; do not smoke the oil',
    note: 'The active steps below replace the source time-only fish endpoint and smoking-oil instruction. Steam until the thickest flesh reaches at least 63°C with a clean food thermometer, not touching bone. The source eight-minutes-per-centimetre rule is not a safety guarantee. Keep the source instruction to discard the steaming liquid. Heat oil slowly and carefully, never deliberately until it smokes: NFPA warns that smoke means oil is too hot, so turn off the burner. Stay beside the stove, keep pan handles inward, and keep face and hands away from hot-oil splashes around the moist aromatics. This adaptation gives no replacement oil temperature or tested heating time. Never use water on an oil fire. If a pan catches fire, turn off the stove only if safe and cover the flame with a lid. If it cannot be controlled safely, leave, close the door and call 000.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['Fire and Rescue NSW: cooking fire safety', 'https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/cooking-fire-safety'], ['Fire and Rescue NSW: heat oil carefully and slowly', 'https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/festive-fires-chanukah-hazards'], ['NFPA (US): smoke means oil too hot', 'https://www.nfpa.org/education-and-research/home-fire-safety/cooking']],
    replacements: {
      4: 'Set the plate into a boiling steamer. Use a clean food thermometer to check that the thickest fish flesh reaches at least 63°C, without touching bone; continue steaming if needed. Do not rely on the source eight-minutes-per-centimetre rule.',
      7: 'Heat the oil slowly and carefully; do not deliberately heat it until it smokes. If it smokes, turn off the burner and do not pour it while smoking. Stay beside the stove and keep face and hands clear of splashes when carefully pouring the hot, non-smoking oil over the aromatics. Pour the soy and sugar around the edge of the plate. Follow the oil/fire note above.',
    },
  },
  'unitools:tortilla-espanola': {
    title: 'Fully set tortilla: adapted cooking instructions',
    note: 'The original source recommends a loose egg centre. Two Plates does not use that endpoint: cook this version until firm or set in the middle, not runny. Check the thickest part with a clean food thermometer. Our conservative editorial target is at least 71°C, drawn from NSW pregnancy-specific advice for cooked egg dishes, not a universal legal threshold or a tested time for this tortilla. People under 2, pregnant, over 70 or with weakened immunity should avoid raw or lightly cooked egg dishes. Follow the adapted steps below, not the loose-centre cue in the original source.',
    sources: [
      ['NSW: higher risk egg dishes', 'https://www.foodauthority.nsw.gov.au/consumer/food-extra-care/eggs-enjoy-safely/higher-risk-dishes'],
      ["NSW: set egg dishes (children's services poster)", 'https://www.foodauthority.nsw.gov.au/sites/default/files/_Documents/retailfactsheets/cook_food_thoroughly.pdf'],
      ['NSW: pregnancy-specific 71°C advice', 'https://www.foodauthority.nsw.gov.au/consumer/life-events-and-food/pregnancy/foods-to-eat-or-avoid-when-pregnant'],
    ],
    replacements: {
      5: 'Cover with a plate, flip carefully and slide it back with the uncooked side down. Continue cooking until the tortilla is firm or set in the middle, not runny. Use a clean food thermometer in the thickest part to check at least 71°C before serving. Do not rely on the source three-minute cue.',
    },
  },
  'unitools:chakhokhbili': {
    title: 'Probe the chicken before resting',
    note: 'Use the adapted cooking step below: before taking the chicken off the heat, check at least 75°C in the centre of the thickest pieces with a clean food thermometer, avoiding bone. FSANZ recommends 75°C for all poultry. Check more than one large piece if sizes differ and cook longer if needed. The source 30-minute stew and 10-minute off-heat rest are not safety guarantees. Keep raw chicken and its utensils separate from ready-to-eat food. Do not wash raw chicken.',
    sources: [['FSANZ: poultry at least 75°C', FSANZ]],
    replacements: {
      5: 'Stew over low heat without adding water. The source suggests thirty minutes, but do not rely on that time: before taking the chicken off the heat, use a clean food thermometer to check at least 75°C in the centre of the thickest pieces, avoiding bone. Check more than one large piece if sizes differ and continue cooking if needed.',
    },
  },
  'unitools:irish-stew': {
    title: 'Check the lamb before the rest',
    note: 'Two Plates uses at least 71°C in the centre of the thickest lamb pieces, away from bone, fat and gristle, checked with a clean food thermometer. This is a conservative editorial selection of the NSW medium endpoint for lamb, not a universal minimum for all whole-cut lamb dishes. Check more than one large piece if sizes differ and continue cooking if needed. The source 90-minute and 40-minute stages are not a safety guarantee. Keep raw lamb and its utensils separate from cooked food.',
    sources: [['NSW: lamb medium endpoint and probe placement', NSW_TEMP], ['FSANZ: keep raw and cooked food separate', FSANZ]],
    replacements: {
      5: 'Before resting, use a clean food thermometer to check that the centre of the thickest lamb pieces reaches at least 71°C, away from bone, fat and gristle. Check more than one large piece if sizes differ and continue cooking if needed. Then season, let it stand fifteen minutes, and scatter parsley over before serving.',
    },
  },
  'unitools:farikal': {
    title: 'Probe the mutton; use safely prepared potatoes',
    note: 'Two Plates uses FSANZ general guidance of 70°C in the centre as an editorial check for this stew. This is general food guidance, not a named-mutton standard or a tested two-hour process. Check the centre of the thickest pieces with a clean food thermometer, away from bone, fat and gristle; check more than one large piece if sizes differ. Continue cooking if needed. Falling away from the bone is a texture cue, not a temperature check. The source potato quantity is already-boiled weight. Serve freshly cooked hot potatoes, or potatoes with a known safe cooling/storage history: cool and refrigerate in small portions within 2 hours, below 5°C, and reheat until steaming hot throughout (at least 60°C). Unknown or unsafe storage is not repaired by reheating; use safely prepared potatoes instead.',
    sources: [['FSANZ: general 70°C-centre guidance', FSANZ], ['NSW: meat probe placement', NSW_TEMP], ['NSW: leftover cooling and reheating', 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers']],
    replacements: {
      5: 'Meat coming away from the bone is a texture cue only. Before serving, use a clean food thermometer to check at least 70°C in the centre of the thickest mutton pieces, away from bone, fat and gristle. Check more than one large piece if sizes differ and continue cooking if needed. Serve with safely prepared boiled potatoes, spooning broth from the pot over. Follow the cooling and storage note above if the potatoes were cooked earlier.',
    },
  },
};
