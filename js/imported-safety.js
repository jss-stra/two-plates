// Editorial cooking adaptations. Original UniTools records stay unchanged.
// These endpoints are authority-backed checks, not tested recipe timings.
const NSW_TEMP = 'https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures';
const FSANZ = 'https://www.foodstandards.gov.au/consumer/prevention-of-foodborne-illness/food-safety-basics';
export const IMPORTED_SAFETY = {
  'wikibooks-fr:fr-acras-de-rouget': {
    title: 'Probe the fritters; colour is not the check',
    note: 'Two Plates adds a measured endpoint: the source fries the fish batter balls until well golden; colour is not a doneness check for the flaked fish inside. Use a clean food thermometer in the centre of a fritter to check at least 63°C, following NSW fish guidance; continue frying and recheck if below the target. Keep the fish refrigerated at 5°C or colder before preparation. Take care with hot oil: add the balls gently, do not overfill the fryer, and never use water on an oil fire. Flaked fillet can still carry bones.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      5: 'Drop the balls into the hot oil and fry until well golden, then check the centre of a fritter with a clean food thermometer for at least 63°C. Colour is not a doneness check; continue frying and recheck if below the target.',
    },
  },
  'wikibooks-fr:fr-cassolette-de-sole-et-cabillaud': {
    title: 'Probe the fish before adding the shellfish',
    note: 'Two Plates adds a measured endpoint: the source bakes the cod and sole 10 minutes; time is not a doneness check. Use a clean food thermometer in the thickest part of each fish piece to check at least 63°C, following NSW fish guidance, before adding the shellfish; continue baking and recheck if below the target. The scallops, shrimps and mussels then get brief final heat - heat them through until the scallop slices are opaque. Keep fish and shellfish refrigerated at 5°C or colder before preparation.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      5: 'Cook in an oven preheated to 180 degrees until a clean food thermometer in the thickest part of each fish piece reads at least 63°C - the source suggests 10 minutes, but time is not a doneness check; continue baking and recheck if below the target.',
      6: 'add the shrimps, scallop slices and mussels and heat them through until the scallop slices are opaque',
    },
  },
  'wikibooks-fr:fr-cotriade': {
    title: 'Probe the fish; brief simmer is not the check',
    note: 'Two Plates adds a measured endpoint: the source gives the fish sections and fillets a brief final simmer in hot stock; time is not a doneness check. Use a clean food thermometer in the thickest flesh of the largest fish pieces, avoiding bones, to check at least 63°C, following NSW fish guidance; continue cooking and recheck if below the target. Keep the fish and shellfish chilled during preparation as the source says.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['USDA (US): thickest part, avoid bones and remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Add the fish sections and shellfish, and 5 min later the fillets, velvet crabs and langoustines; cook until a clean food thermometer in the thickest flesh of the largest fish pieces, avoiding bones, reads at least 63°C. Brief simmering time is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-fr:fr-curry-de-poisson-keralais': {
    title: 'Probe the fish; simmering time is not the check',
    note: 'Two Plates adds a measured endpoint: the source poaches the fillets 5-10 minutes in the sauce; time is not a doneness check. Use a clean food thermometer in the thickest part of a fillet to check at least 63°C, following NSW fish guidance; continue cooking and recheck if below the target. Keep the fish refrigerated at 5°C or colder before preparation.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      7: 'Cook over low heat until a clean food thermometer in the thickest part of a fillet reads at least 63°C - the source suggests five to ten minutes, but time is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-fr:fr-escalopes-de-veau-parmesan-amandes': {
    title: 'Probe the escalopes; browning is not the check',
    note: 'Two Plates adds a measured endpoint: the source browns the escalopes 3-4 minutes per side; time and browning are not doneness checks. Use a clean food thermometer in the thickest part of an escalope to check at least 63°C, a conservative editorial selection of the NSW medium endpoint for whole-cut veal, and rest 3 minutes; continue cooking and recheck if below the target. Keep the veal refrigerated at 5°C or colder before preparation.',
    sources: [['NSW: whole-cut beef/veal medium endpoint and resting', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      6: 'brown them over medium heat on each side, then use a clean food thermometer in the thickest part of an escalope to check at least 63°C. Browning is not a doneness check; continue cooking and recheck if below the target, then rest 3 minutes.',
    },
  },
  'wikibooks-fr:fr-lieu-jaune-en-papillote-de-cresson': {
    title: 'Probe the pollock in the parcel',
    note: 'Two Plates adds a measured endpoint: the source doneness cue is that the pollock should be well cooked. Open the parcel carefully away from your face (hot steam) and use a clean food thermometer in the thickest fish piece, avoiding bones, to check at least 63°C, following NSW fish guidance; reseal and continue baking if below the target.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['USDA (US): thickest part, avoid bones and remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      11: 'Bake at the stated temperature. The source suggests 45 minutes, but open the parcel carefully away from your face (hot steam) and use a clean food thermometer in the thickest fish piece, avoiding bones, to check at least 63°C. Reseal and continue baking if below the target.',
    },
  },
  'wikibooks-fr:fr-poulet-sauce-au-vin-rouge': {
    title: 'Probe the chicken; simmering time is not the check',
    note: 'Two Plates adds a measured endpoint: the source cooks the chicken about 1 hour over low heat; time is not a doneness check for poultry. Use a clean food thermometer in the thickest part of the largest piece, avoiding bone, to check at least 75°C, following NSW poultry guidance; continue cooking and recheck if below the target. Keep the chicken refrigerated at 5°C or colder before preparation and use separate boards and tools for raw chicken.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['USDA (US): thickest part, avoid bones and remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      3: 'Halfway through cooking, add the peeled tomato and the sliced mushrooms and cook about 1 hour over low heat per the source, then check the thickest part of the largest piece, avoiding bone, with a clean food thermometer for at least 75°C. Continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-fr:fr-poulet-fafa': {
    title: 'Probe the chicken; short high-heat timing is not the check',
    note: 'Two Plates adds a measured endpoint: the source cooks the chicken 5 minutes browning plus 7 minutes over high heat; time is not a doneness check for poultry. Use a clean food thermometer in the thickest part of the largest piece, avoiding bone, to check at least 75°C, following NSW poultry guidance; continue cooking and recheck if below the target. Keep the chicken refrigerated at 5°C or colder before preparation and use separate boards and tools for raw chicken.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['USDA (US): thickest part, avoid bones and remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      6: 'cook for another 7 minutes per the source, then check the thickest part of the largest piece, avoiding bone, with a clean food thermometer for at least 75°C. Time is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-fr:fr-poulet-kedjenou': {
    title: 'Probe the chicken after the sealed simmer',
    note: 'Two Plates adds a measured endpoint: the source simmers the sealed pot 30 minutes and says not to open it before then; time is not a doneness check for poultry. After the 30 minutes, use a clean food thermometer in the thickest part of the largest piece, avoiding bone, to check at least 75°C, following NSW poultry guidance; reseal and continue cooking if below the target. Keep the chicken refrigerated at 5°C or colder before preparation and use separate boards and tools for raw chicken.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['USDA (US): thickest part, avoid bones and remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      6: 'Simmer for 30 minutes per the source, then open and check the thickest part of the largest chicken piece, avoiding bone, with a clean food thermometer for at least 75°C. Time is not a doneness check; reseal and continue cooking, then recheck, if below the target.',
    },
  },
  'wikibooks-fr:fr-riz-noir': {
    title: 'Probe the shrimp and fish; brief saute is not the check',
    note: 'Two Plates adds a measured endpoint: the source sautes the shrimps and fish 5 minutes; time is not a doneness check. Use a clean food thermometer in the thickest piece of fish to check at least 63°C, following NSW fish guidance; continue cooking and recheck if below the target. Source only small dried black mushrooms from a trusted supplier - the source describes market mushrooms local to Abidjan and asserts their edibility there; do not forage lookalikes.',
    sources: [['NSW: fish and seafood 63°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      3: 'Saute the shrimps and the fish pieces with the onion, garlic, salt and half the seasoning cube, then check the thickest fish piece with a clean food thermometer for at least 63°C. Brief saute time is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-fr:fr-sauce-arachide-poulet': {
    title: 'Probe the chicken; browning and simmer time are not the check',
    note: 'Two Plates adds a measured endpoint: the source fries the chicken until brown then simmers it 20 minutes in the sauce; neither browning nor time is a doneness check for poultry. Use a clean food thermometer in the thickest part of the largest piece, avoiding bone, to check at least 75°C, following NSW poultry guidance; continue cooking and recheck if below the target. Keep the chicken refrigerated at 5°C or colder before preparation and use separate boards and tools for raw chicken. Use a deep pot as the source warns - the sauce rises during cooking.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['USDA (US): thickest part, avoid bones and remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      6: 'Cook for another 20 minutes per the source, then check the thickest part of the largest chicken piece, avoiding bone, with a clean food thermometer for at least 75°C. Browning and simmer time are not doneness checks; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-fr:fr-soupe-d-asperges-champignons-mais-et-poulet': {
    title: 'Probe the chicken; the visual cue is not the check',
    note: 'Two Plates replaces the source visual doneness cue (translucency turning opaque white) with a measured endpoint. Use a clean food thermometer in the thickest part of an escalope to check at least 75°C, following NSW poultry guidance; return it to the water and continue cooking if below the target. Keep the chicken refrigerated at 5°C or colder before preparation and use separate boards and tools for raw chicken - the source shreds the chicken partway, so clean the board and forks after shredding partly cooked chicken.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      3: 'escalopes are cooked through - check with a clean food thermometer in the thickest part for at least 75°C, not by colour alone',
    },
  },
  'wikibooks-fr:fr-torti-aux-crevettes-et-a-la-feta': {
    title: 'Cook raw prawns through; golden colour is not the check',
    note: 'The source does not state whether the prawns start raw or cooked. If raw, cook them until a clean food thermometer in the thickest prawn reads at least 63°C, following NSW seafood guidance - golden colour is not a doneness check. If using pre-cooked prawns, heat them through until hot. Keep prawns refrigerated at 5°C or colder before preparation.',
    sources: [['NSW: fish and seafood 63°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      3: 'add the shelled prawns. If they are raw, cook until a clean food thermometer in the thickest prawn reads at least 63°C - golden colour is not a doneness check; if pre-cooked, heat them through until hot',
    },
  },
  'wikibooks-fr:fr-fondue-epicee': {
    title: 'Measure hot holding; attend the burner',
    note: 'Two Plates adapts the serving instruction: if holding the fondue hot, check that the food stays above 60°C with a clean food thermometer, following FSANZ hot-holding guidance. The burner setting alone does not prove a food temperature. Follow product storage, use-by and cooking directions. Stay beside the burner and keep children and flammable materials clear; never leave cooking unattended. Wine and grappa remain in the dish; no alcohol-free claim is made.',
    sources: [['FSANZ: food held above 60°C', FSANZ], ['Fire and Rescue NSW: cooking attention and flammable materials', 'https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/cooking-fire-safety']],
    replacements: {
      3: 'Sprinkle with chilli and serve. If holding the fondue hot on a burner, use a clean food thermometer to check the food stays above 60°C, and attend the burner, keeping children and flammable materials clear.',
    },
  },
  'wikibooks-fr:fr-souffle-au-bleu-de-gex': {
    title: 'No source bake duration; cook the souffle through',
    note: 'The source states no bake duration - the only cue is that the souffle has risen. Two Plates adds a set-through check: bake until risen and the centre is set, not liquid. Our conservative editorial target is at least 71°C in the centre, selected from NSW pregnancy-specific cooked-egg-dish advice, not a universal legal threshold or a tested duration. Bleu de Gex is typically a raw-milk blue cheese; this egg-focused target does not certify the cheese or make the dish suitable for pregnancy - people who are pregnant or immunocompromised should check product pasteurisation.',
    sources: [['NSW: raw and lightly cooked egg risk', 'https://www.foodauthority.nsw.gov.au/consumer/food-extra-care/eggs-enjoy-safely/higher-risk-dishes'], ['NSW: pregnancy-specific 71°C advice', 'https://www.foodauthority.nsw.gov.au/consumer/life-events-and-food/pregnancy/foods-to-eat-or-avoid-when-pregnant']],
    replacements: {
      7: 'Fill the moulds with the preparation and bake at 200 C until risen and set through the centre, not liquid - the source states no duration, so check the centre with a clean food thermometer for at least 71°C.',
    },
  },
  'wikibooks-fr:fr-tarte-a-l-oignon': {
    title: 'Bake the egg filling until set',
    note: 'Two Plates adds a set-through check for the egg-flour filling: bake until the filling is firm or set through the centre, not runny. Our conservative editorial target is at least 71°C in the thickest filling, selected from NSW pregnancy-specific cooked-egg-dish advice, not a universal legal threshold or a tested 25-30 minute process. Continue baking if needed; a browned top is not a filling-temperature check. The source states two different oven temperatures (preheat 190°C, bake 180°C) - the discrepancy is preserved.',
    sources: [['NSW: raw and lightly cooked egg risk', 'https://www.foodauthority.nsw.gov.au/consumer/food-extra-care/eggs-enjoy-safely/higher-risk-dishes'], ['NSW: pregnancy-specific 71°C advice', 'https://www.foodauthority.nsw.gov.au/consumer/life-events-and-food/pregnancy/foods-to-eat-or-avoid-when-pregnant']],
    replacements: {
      6: 'Bake for 25 to 30 minutes per the source, until the filling is firm or set through the centre, not runny; check the thickest filling with a clean food thermometer for at least 71°C and continue baking if below the target.',
    },
  },
  'wikibooks-fr:fr-poelee-brestoise': {
    title: 'Cook the eggs until fully set',
    note: 'The source cooks the mixture like an omelette. Two Plates confirms: cook until the eggs are fully set through, not runny, following NSW guidance to cook eggs thoroughly. People under 2, pregnant, over 70 or with weakened immunity should avoid runny eggs. The knacki-type sausages are a pre-cooked product type - follow product heating, storage and use-by directions.',
    sources: [['NSW: raw and lightly cooked egg risk', 'https://www.foodauthority.nsw.gov.au/consumer/food-extra-care/eggs-enjoy-safely/higher-risk-dishes']],
    replacements: {
      6: 'cook like an omelette until the eggs are fully set through, not runny',
    },
  },
  'unitools:ohridska-pastrmka': {
    title: 'Probe every trout and cook the potatoes through',
    note: 'Two Plates replaces the source time, skin-colour and spine-test endpoint with a clean food thermometer in the thickest flesh of each trout, avoiding the spine and other bones. Check at least 63°C for every fish, following NSW fish guidance; continue baking and recheck any below the target. This is not a tested 25-minute process. Follow thermometer instructions and take the tray off the heat to check safely. The potatoes contact raw-fish juices: check they are tender and at least 70°C in the centre of the thickest potato portions before serving. The potato check is an editorial application of FSANZ general centre-temperature guidance, not a tested potato-specific standard. Keep raw fish refrigerated at 5°C or colder before preparation. Use separate boards, tools and plates for raw fish and ready-to-eat lemon wedges; reserve garnish before handling raw fish. Wash lemons, garlic, herbs and potatoes under running water before preparation. The source fish rinse is not sanitisation; avoid splashing raw-fish juices and clean hands, sink, boards and work area after handling. Follow product storage, use-by and cooking directions. No allergy, bone-free or pregnancy suitability claim is made; wine remains in the dish.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['FSANZ: clean probe, general 70°C centre, separation and produce washing', FSANZ], ['USDA (US): thickest part, avoid bones and remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      6: 'Bake at 200°C. The source suggests twenty-five minutes, but do not rely on that time or skin colour. Safely take the tray off the heat and use a clean food thermometer in the thickest flesh of each trout, avoiding the spine and other bones, to check at least 63°C in every fish. Check the potatoes are tender and at least 70°C in the centre of the thickest portions because they contact raw-fish juices. Continue baking and recheck anything below its target; follow thermometer instructions.',
      7: 'Confirm the measured fish and potato endpoints in step 6 before serving. Use clean serving utensils and plates, and lemon wedges kept separate from raw-fish preparation. Take care with bones when serving and eating; gutted does not mean boneless.',
    },
  },
  'unitools:souvla': {
    title: 'Probe the pork; check restrictions before lighting charcoal',
    note: 'Two Plates uses at least 71°C in the centre of the thickest pork pieces, away from bone, fat, gristle and the metal spit. This is a conservative editorial selection of the NSW medium endpoint for whole-cut pork, not a universal minimum or a tested two-hour spit process. Check pieces from different positions and continue cooking if any are below the target. Colour is not proof of doneness. Keep raw pork refrigerated at 5°C or colder before preparation; count the source 30-minute room-temperature stand and all other time between 5°C and 60°C cumulatively. Under 2 hours, cook or refrigerate; from 2 to 4 hours, cook and use immediately, not refrigerate for later; after 4 hours, discard. Unknown or unsafe storage is not repaired by cooking. Use separate raw-pork tools and plates from cooked pork, pita and fresh vegetables. Wash the onion, tomatoes, parsley and lemons under running water before preparing. Follow product cooking, storage and use-by directions. Use a maintained charcoal spit outdoors in a well-ventilated area on a firm, level base clear of flammables, following equipment instructions. A responsible adult must attend it throughout; keep children clear. Check current local fire restrictions before lighting and do not light when prohibited. NSW bans outdoor solid-fuel barbecues during a Total Fire Ban; other locations have their own rules. This recipe does not check current restrictions. Never add flammable liquid to the barbecue or use water on a fat or oil fire.',
    sources: [['NSW: pork medium endpoint and probe placement', NSW_TEMP], ['FSANZ: raw separation, temperature control and produce washing', FSANZ], ['Fire and Rescue NSW: barbecue equipment and attention', 'https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/bbq'], ['NSW RFS: solid-fuel rules during Total Fire Bans (not current status)', 'https://www.rfs.nsw.gov.au/fire-information/fire-danger-ratings-and-total-fire-bans/total-fire-ban-rules'], ['Fire and Rescue NSW: never water on fat or oil fires', 'https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/cooking-fire-safety']],
    replacements: {
      3: 'Before lighting charcoal, check and comply with current local fire restrictions. Do not light when prohibited. Follow the equipment and handling note above. Light the coals and rake them to the sides, leaving the centre clear, using the equipment instructions. Direct heat under the meat is not wanted.',
      5: 'Turn the spit slowly and continuously. The source suggests two hours, but this is not a tested doneness time. Use a clean food thermometer to check at least 71°C in the centre of the thickest pork pieces, clear of bone, fat, gristle and the metal spit. Check pieces from different positions and continue cooking and recheck if any are below 71°C. Gradual darkening is a texture cue, not proof of doneness.',
      7: 'Before removing the pork, confirm the measured endpoint in step 5; cook longer if needed. Take it off, cut it coarsely with clean utensils on a clean board and serve in pita with onion, tomato and parsley. Do not use plates or utensils that held raw pork without cleaning them.',
    },
  },
  'unitools:zagorski-strukli': {
    title: 'Cook the egg filling through after boiling and baking',
    note: 'Two Plates keeps the source boiling-then-baking sequence but adds a measured endpoint after baking. Cook until the egg filling is firm or set through the centre, not runny. Use a clean food thermometer in the thickest filling of the largest pieces and check more than one piece if sizes differ. Our conservative editorial target is at least 71°C, selected from NSW pregnancy-specific cooked-egg-dish advice, not a universal legal threshold or a tested five-minute boil plus 25-minute bake. This egg-focused target does not certify the cheese product or make the whole dish suitable for pregnancy. Continue baking if needed; floating and a browned top are not filling-temperature checks. People under 2, pregnant, over 70 or with weakened immunity should avoid raw or lightly cooked eggs. Follow product storage, use-by and cooking directions, including any stricter instructions.',
    sources: [['NSW: raw and lightly cooked egg risk', 'https://www.foodauthority.nsw.gov.au/consumer/food-extra-care/eggs-enjoy-safely/higher-risk-dishes'], ["NSW: set egg dishes (children's services poster)", 'https://www.foodauthority.nsw.gov.au/sites/default/files/_Documents/retailfactsheets/cook_food_thoroughly.pdf'], ['NSW: pregnancy-specific 71°C advice', 'https://www.foodauthority.nsw.gov.au/consumer/life-events-and-food/pregnancy/foods-to-eat-or-avoid-when-pregnant']],
    replacements: { 6: 'Lay them in a dish, pour the cream over and trickle on melted butter. Bake at 200°C until the egg filling is firm or set through the centre, not runny, and a clean food thermometer in the thickest filling of the largest pieces reads at least 71°C. Check more than one piece if sizes differ. The source suggests twenty-five minutes after boiling, but continue baking if needed. Floating and a browned top are not filling-temperature checks.' },
  },
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
  'wikibooks:paprika-chicken': {
    title: 'Probe the chicken pieces before the final reduction',
    note: 'Two Plates uses at least 75°C in the centre of the thickest chicken pieces, checked with a clean food thermometer, avoiding bone. FSANZ recommends 75°C for all poultry. The source cuts a whole chicken into eight bone-in pieces; check more than one large piece if sizes differ and continue simmering if any are below the target. The source 45–50 minute simmer, tenderness and the gravy-reduction cues are not safety checks. Keep raw chicken refrigerated at 5°C or colder before preparation. Do not wash raw chicken. Use separate boards, tools and plates for raw chicken and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry at least 75°C', FSANZ], ['USDA (US): thickest part, avoid bones and remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      4: 'Simmer over low heat. If using, add peppers and carrots after 10 minutes of simmering. The source suggests 45–50 minutes, but do not rely on that time, tenderness or the reduction cue: use a clean food thermometer to check at least 75°C in the centre of the thickest chicken pieces, avoiding bone. Check more than one large piece if sizes differ and continue simmering if any are below the target; follow thermometer instructions. If necessary add more water, but very sparingly. During the last 15 minutes, stop adding water and wait until the liquid is almost boiled off, keeping about a half a finger width of gravy on the bottom of the pan.',
    },
  },
  'wikibooks:pork-and-lima-skillet': {
    title: 'Probe every pork chop before serving',
    note: 'Two Plates uses at least 71°C in the centre of the thickest part of each pork chop, away from bone, fat and gristle, checked with a clean food thermometer. This is a conservative editorial selection of the NSW medium endpoint for whole-cut pork, not a universal minimum or a tested process time. The source gives no browning time and finishes with a short covered heat-through; neither browning colour nor "heated through" is a doneness check. Chop thickness is unspecified: for thin chops, insert the probe from the side into the centre, following USDA placement guidance for thin foods. Check every chop and continue cooking and recheck any below the target. Keep raw pork refrigerated at 5°C or colder before preparation. Use separate boards, tools and plates for raw pork and ready-to-eat food; do not reuse the raw-pork plate for serving without cleaning. Follow lima bean package directions and product storage, use-by and cooking directions.',
    sources: [['NSW: pork medium endpoint and probe placement', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ], ['USDA (US): thin foods probed from the side; avoid bones', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'In a skillet, brown the chops over medium heat; browning is colour only, not a doneness check. Remove chops from skillet. Pour off all but 1 tablespoon drippings.',
      6: 'Arrange chops over limas. Cover and cook over low heat. The source suggests about 5 minutes or until heated through, but do not rely on that time: before serving, use a clean food thermometer to check at least 71°C in the centre of the thickest part of each chop, away from bone, fat and gristle. For thin chops, insert the probe from the side into the centre. Continue cooking and recheck any chop below the target.',
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
  'wikibooks:spaghetti-bolognese': {
    title: 'Cook the mince through; probe the browned beef',
    note: 'Two Plates uses at least 71°C for the ground beef, checked with a clean food thermometer in the thickest part of the cooking mince and again in the centre of the finished sauce. NSW guidance names 71°C for minced meat and sausages because mince carries contamination throughout, and warns that colour and clear juices are not reliable doneness indicators. The source endpoint is time and reduction (simmer an hour or more until thick); the measured mince check is added to that, not substituted for the simmer. Stir before probing so the reading is not from one hot spot, and continue cooking if below the target. Keep raw mince and the ham or bacon refrigerated at 5°C or colder before preparation. Use separate boards and utensils for raw meat and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions, including the pasta package. Wine remains in the sauce; no alcohol-free claim.',
    sources: [['NSW: minced meat and sausages 71°C; colour unreliable', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      5: 'Heat the olive oil in the skillet the battuto was browned in and when the oil is hot, add the beef and stir to break up lumps, cooking until well browned. Browning colour is not a doneness check: use a clean food thermometer in the thickest part of the cooking mince to check at least 71°C, and continue cooking and recheck if below the target.',
      11: 'Simmer, stirring occasionally for an hour (or more), until thick. The time and thickness are texture cues: before serving, stir and use a clean food thermometer to check at least 71°C in the centre of the sauce, and continue simmering and recheck if below the target.',
    },
  },
  'wikibooks:barbecued-spare-ribs': {
    title: 'Probe the ribs away from bone; refrigerate the overnight marinade',
    note: 'Two Plates uses at least 71°C in the centre of the thickest part of the meat, away from bone, fat and gristle, checked with a clean food thermometer. This is a conservative editorial selection of the NSW medium endpoint for whole-cut pork, not a universal minimum or a tested 45-plus-15-minute roast. Check several ribs from different positions and continue roasting and recheck any below the target; colour is not proof of doneness. If the meat between the bones is too thin to probe from above, insert the probe from the side into the centre, following USDA placement guidance for thin foods. Keep raw ribs refrigerated at 5°C or colder, including during the source overnight marinade; the source does not say where to marinate, and room-temperature overnight marinating is unsafe. Discard the used marinade; it contacted raw pork and is not a sauce. Use separate boards, tools and plates for raw pork and ready-to-eat food, and clean hands and surfaces after handling. If serving cold, follow the cooling and refrigeration handling note in the limitation above. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: pork medium endpoint and probe placement', NSW_TEMP], ['USDA (US): thin foods probed from the side; avoid bones', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer'], ['NSW: leftover cooling and reheating', 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers']],
    replacements: {
      1: 'Place spare ribs in a large baking dish in one layer. In a small bowl, combine the remaining ingredients. Pour over spare ribs and coat on both sides. Marinate overnight in the refrigerator at 5°C or colder, covered, basting occasionally; do not marinate at room temperature. Discard the used marinade afterwards.',
      4: 'Raise oven temperature to 450 °F (232 °C), and roast for 15 more minutes. The source times are not doneness checks: before serving, use a clean food thermometer to check at least 71°C in the centre of the thickest meat, away from bone, fat and gristle. If the meat is too thin to probe from above, insert the probe from the side into the centre. Check several ribs from different positions and continue roasting and recheck any below the target.',
    },
  },
  'wikibooks:poutine': {
    title: 'Deep-frying: attend the oil and never use water on an oil fire',
    note: 'The source deep-fries the potatoes in 1 L of oil at 185°C (365°F). Stay beside the stove and never leave heating or hot oil unattended; keep pan handles turned inward and children clear. Heat the oil carefully and use a deep, heavy-based pan with the oil well below the rim; the stated 185°C is the source frying temperature, not a safety certification of your pot or burner. If the oil smokes, it is too hot: turn off the burner. Add fries carefully to limit splashes, and let cooked fries drain without carrying hot oil across the kitchen. Never use water on an oil fire. If the pan catches fire, turn off the stove only if it is safe, and cover the flame with a lid or baking sheet; if it cannot be controlled safely, leave, close the door and call 000. Keep the fresh cheese curds refrigerated at 5°C or colder until assembly and follow their package use-by; the gravy or sauce is a manufactured product, so follow its label storage, use-by and heating directions.',
    sources: [['Fire and Rescue NSW: cooking fire safety and never water on oil fires', 'https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/cooking-fire-safety'], ['NFPA (US): smoke means oil too hot; stay in the kitchen', 'https://www.nfpa.org/education-and-research/home-fire-safety/cooking'], ['FSANZ: keep perishables at 5°C or colder', FSANZ]],
    replacements: {
      3: 'Heat the oil carefully in a deep, heavy-based pan to 185°C (365°F), with the oil level well below the rim. Stay beside the stove; never leave the oil unattended. If the oil smokes, it is too hot: turn off the burner and let it cool before continuing. Follow the fire-safety note above.',
    },
  },
  'wikibooks:penne-meat-sauce': {
    title: 'Cook the sausage through; browning is not the check',
    note: 'Two Plates adds a measured check to the source endpoint "browned and crumbled". Because the sausage species is unstated, it might contain poultry: use at least 75°C as the check (FSANZ names 75°C for poultry, including minced poultry). If the package confirms the sausage contains no poultry, NSW guidance names at least 71°C for minced meat and sausages, because ground sausage carries contamination throughout; colour is not a reliable doneness indicator either way. Stir before probing so the reading is not from one hot spot, and continue cooking and recheck if below the target. Keep the sausage refrigerated at 5°C or colder before preparation. Use separate boards and utensils for raw sausage and ready-to-eat food, and clean hands and surfaces after handling. The sausage species is unstated and the spaghetti-sauce formulation is unverified; follow product storage, use-by and cooking directions, including the pasta package.',
    sources: [['FSANZ: poultry 75°C, including minced poultry', FSANZ], ['NSW: minced meat and sausages 71°C when confirmed non-poultry; colour unreliable', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Cook sausage in large skillet over medium heat until browned and crumbled; drain. Browning and crumbling are colour and texture cues, not doneness checks: use a clean food thermometer in the thickest part of the cooking sausage to check at least 75°C (the species is unstated, so it might be poultry; at least 71°C only if the package confirms no poultry), and continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:beef-gravy-soup': {
    title: 'Check the beef with a thermometer, not looks',
    note: 'Two Plates adds a measured endpoint: the source endpoint is that the beef and vegetables "look cooked", and appearance is not a doneness check. Slice thickness is unstated, so take the pan off the heat and use a clean food thermometer inserted from the side into the thickest beef slices; NSW guidance names at least 63°C for whole-cut beef. Continue simmering and recheck any slice below the target. Keep the beef refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw meat and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: whole-cut beef 63°C', NSW_TEMP], ['USDA (US): thin foods from the side, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      3: 'When the beef and vegetables look cooked, add the vegetable broth and salt. Looks are not a doneness check: safely take the pot off the heat and use a clean food thermometer inserted from the side into the thickest beef slices to check at least 63°C, and continue simmering and recheck if below the target.',
    },
  },
  'wikibooks:black-peppered-chicken-spaghetti': {
    title: 'Cook the chicken through; colour is not the check',
    note: 'Two Plates replaces the source endpoint "until the color changes" with a clean food thermometer in the thickest chicken pieces: check at least 75°C, following FSANZ poultry guidance, because colour is not a reliable indicator. The pieces are 2 cm, so probe the largest ones. Keep the chicken refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw chicken and ready-to-eat food, wash produce under running water, and clean hands and surfaces after handling raw chicken. Do not wash the raw chicken itself; it spreads bacteria around the sink. Follow product storage, use-by and cooking directions, including the pasta package.',
    sources: [['FSANZ: poultry 75°C; do not wash raw poultry', FSANZ], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Boil the chicken in salted water until the color changes. A colour change is not a doneness check: safely take the pot off the heat and use a clean food thermometer in the thickest pieces to check at least 75°C, and continue cooking and recheck if below the target. Drain the chicken.',
    },
  },
  'wikibooks:hot-and-sour-soup': {
    title: 'Stream the egg into actively simmering soup',
    note: 'Two Plates adapts the egg step: the beaten egg must be cooked through, so stream it slowly into soup that is actively simmering, not off the heat, and keep the soup simmering while it sets. This matters most for anyone pregnant, elderly, very young or immunocompromised; no raw-egg cue from the source is relied on. The cooked shredded meat must be hot throughout (at least 60°C if it was refrigerated) when it goes in; see the handling note. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: cook egg dishes thoroughly; 2-hour rule', FSANZ], ['NSW: leftovers 60°C', NSW_TEMP]],
    replacements: {
      6: 'Beat egg in a cup until yolk and white are combined. Keep the soup at a gentle simmer and pour the beaten egg slowly, in a fine stream, into the simmering soup. Stir soup several times, then wait 30 seconds, keeping it simmering so the egg sets and cooks through.',
    },
  },
  'wikibooks:sausage-and-tortellini-soup': {
    title: 'Cook the sausage through; "no longer pink" is not the check',
    note: 'Two Plates adds a measured check; "no longer pink" is not a doneness indicator. Because the sausage species is unstated, it might contain poultry: use at least 75°C as the check (FSANZ names 75°C for poultry, including minced poultry). If the package confirms the sausage contains no poultry, NSW guidance names at least 71°C for minced meat and sausages, because ground sausage carries contamination throughout; colour is not a reliable doneness indicator either way. Stir before probing so the reading is not from one hot spot, and continue cooking and recheck if below the target. Keep the sausage refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw sausage and ready-to-eat food, and clean hands and surfaces after handling. The sausage species and tortellini formulation are unverified; follow product storage, use-by and cooking directions, including the tortellini package.',
    sources: [['FSANZ: poultry 75°C, including minced poultry', FSANZ], ['NSW: minced meat and sausages 71°C when confirmed non-poultry; colour unreliable', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Remove sausage from casings and heat over medium heat in stock pot until sausage is crumbled and no longer pink. "No longer pink" is not a doneness check: use a clean food thermometer in the thickest part of the cooking sausage to check at least 75°C (the species is unstated, so it might be poultry; at least 71°C only if the package confirms no poultry), and continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:tom-kha-kai': {
    title: 'Cook the chicken through; 4 minutes is not the check',
    note: 'Two Plates adds a measured endpoint: the source boils the cubed chicken at a rolling boil for 4 minutes, but time alone is not a doneness check. Safely take the pot off the heat and use a clean food thermometer in the thickest chicken cubes to check at least 75°C, following FSANZ poultry guidance; continue cooking and recheck any below the target. Keep the chicken refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw chicken and the fresh garnish, and clean hands and surfaces after handling. Do not wash the raw chicken. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry 75°C; do not wash raw poultry', FSANZ], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      4: 'Keep at a rolling boil for 4 minutes, then safely take the pot off the heat and use a clean food thermometer in the thickest chicken cubes to check at least 75°C. Continue cooking and recheck any below the target before moving on.',
    },
  },
  'wikibooks:ertesuppe-pea-soup': {
    title: 'Probe the smoked pork; 40 minutes per pound is not the check',
    note: 'Two Plates adds a measured endpoint: the source boils the smoked pork butt for 40 minutes per pound, but time alone is not a doneness check and whether the product reaches you fully cooked is unstated. Safely take the pot off the heat and use a clean food thermometer in the thickest part, away from any bone, to check at least 70°C, applying FSANZ general centre-temperature guidance; continue boiling and recheck if below the target. Keep the pork refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw or cured meat and ready-to-eat food, and clean hands and surfaces after handling. Follow the product label storage, use-by and cooking directions for the smoked pork.',
    sources: [['FSANZ: general 70°C centre; follow product directions', FSANZ], ['USDA (US): thickest part, avoid bone, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      3: 'In a separate pot, boil the smoked butt for 40 minutes per pound, then safely take it off the heat and use a clean food thermometer in the thickest part, away from any bone, to check at least 70°C. Continue boiling and recheck if below the target.',
    },
  },
  'wikibooks:lengua-de-res': {
    title: 'Probe the tongue; "no longer pink" is not the check',
    note: 'Two Plates replaces the source endpoint "no longer pink" with a clean food thermometer in the thickest part of the tongue: check at least 70°C, applying FSANZ general centre-temperature guidance, because colour is not a reliable indicator. The source timing (about 50 minutes per pound) stays as the process; confirm with the thermometer and continue simmering and recheck if below the target. Keep the tongue refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw meat and ready-to-eat food, wash the produce under running water, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: general 70°C centre', FSANZ], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      1: 'Wash tongue and place in a large pot of water to cover. Simmer about 50 minutes per pound of tongue as the source says, then safely take the pot off the heat and use a clean food thermometer in the thickest part to check at least 70°C; "no longer pink" is not a doneness check. Continue simmering and recheck if below the target. Remove from water and let rest until cool enough to handle.',
    },
  },
  'wikibooks:bacon-wrapped-scallops': {
    title: 'Deep-fry with care; check the scallops and the bacon',
    note: 'Two Plates adds fire-safety and endpoint checks to the deep-frying. Heat the oil carefully and stay beside the fryer; never leave hot oil unattended. If the oil smokes, it is too hot: turn off the heat and let it cool. If the oil catches fire, turn off the heat and cover with a lid or metal tray; never use water on an oil fire. The endpoint "golden brown" is not a doneness check: the scallops inside should reach at least 63°C (NSW fish guidance) and the bacon wrapping must be cooked through and crisped; check the first batch with a clean food thermometer through the bacon into the centre of a scallop and adjust batch time accordingly. Keep the scallops and bacon refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw seafood and bacon and the ready-to-eat sauce, and clean hands and surfaces after handling. The sauce contacts only cooked food per the source order; do not return used toothpicks or marinade to the sauce. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['Fire and Rescue NSW: cooking fire safety and never water on oil fires', 'https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/cooking-fire-safety'], ['NFPA (US): smoke means oil too hot; stay in the kitchen', 'https://www.nfpa.org/education-and-research/home-fire-safety/cooking']],
    replacements: {
      1: "Heat oil in a deep-fryer or other pot to 350 °F (180 °C), making sure that the pot is large enough that the oil doesn't fill it more than halfway. Stay beside it; never leave hot oil unattended. If the oil smokes, it is too hot: turn off the heat and let it cool before continuing.",
      5: 'Working in batches so as not to crowd the fryer, fry the scallops until golden brown, about 4 minutes, and check the first batch with a clean food thermometer through the bacon into the centre of a scallop: at least 63°C, with the bacon cooked through. Continue frying and recheck if below the target.',
    },
  },
  'wikibooks:chicken-fried-steak': {
    title: 'Probe the ½-inch steaks from the side',
    note: 'Two Plates adds a measured endpoint: "golden brown, about 4 minutes per side" is a colour and time cue, not a doneness check. The steaks are ½ inch thick, so safely take the pan off the heat and use a clean food thermometer inserted from the side into the centre of each steak; NSW guidance names at least 63°C for whole-cut beef. Continue frying and recheck any steak below the target. The source holds the cooked steaks in a 200°F (about 95°C) oven while the gravy cooks; keep that hold short and serve promptly. Keep the steaks refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw meat and the egg mixture, do not reuse flour that contacted raw steak for anything except the gravy (the source uses the separate measured 3 tbsp for the gravy), and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: whole-cut beef 63°C', NSW_TEMP], ['USDA (US): thin foods from the side, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      5: 'When the pan is hot enough, put steaks in pan in a triangle formation. Fry until golden brown, about 4 minutes per side, then safely take the pan off the heat and use a clean food thermometer inserted from the side into the centre of each steak to check at least 63°C. Continue frying and recheck any steak below the target.',
    },
  },
  'wikibooks:chipsi-mayai': {
    title: 'Cook the omelette until fully set; fry with care',
    note: 'Two Plates adds an egg endpoint and a frying note. The fries are deep-fried: stay beside the pan, never leave hot oil unattended, and if the oil smokes it is too hot (turn off the heat and let it cool); never use water on an oil fire. For the omelette, "golden brown" underneath is not a doneness check: cook until the egg is completely set with no runny centre, checking the middle of the omelette. This matters most for anyone pregnant, elderly, very young or immunocompromised. Follow product storage, use-by and cooking directions.',
    sources: [['Fire and Rescue NSW: cooking fire safety and never water on oil fires', 'https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/cooking-fire-safety'], ['FSANZ: cook egg dishes thoroughly', FSANZ]],
    replacements: {
      3: 'Fry the potatoes until golden brown and crispy. Stay beside the pan; never leave the hot oil unattended, and if the oil smokes it is too hot: turn off the heat and let it cool before continuing.',
      14: 'Remove from the heat when fully cooked: the egg should be completely set with no runny centre. Check the middle of the omelette; if it is still soft or runny, return it to the heat and cook until set.',
    },
  },
  'wikibooks:chuu-chee-fish': {
    title: 'Probe the whole fish; golden skin is not the check',
    note: 'Two Plates replaces the colour endpoint with a clean food thermometer in the thickest flesh beside the backbone: check at least 63°C, following NSW fish guidance; continue frying and recheck if below the target. The frying oil is hot; stay beside the wok and never leave it unattended. Keep the fish refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw fish and the fresh garnish, and clean hands and surfaces after handling. Whole fish still have bones; take care when serving and eating. The curry-paste formulation is unverified (it typically contains shrimp paste); follow product storage, use-by and cooking directions.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['USDA (US): thickest part, avoid bones, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      3: 'Turn up heat again and cook until golden, then safely take the wok off the heat and use a clean food thermometer in the thickest flesh beside the backbone to check at least 63°C. Continue cooking and recheck if below the target. Using tongs again, lift fish gently onto a serving plate.',
    },
  },
  'wikibooks:cuban-picadillo': {
    title: 'Cook the mince through; browning is not the check',
    note: 'Two Plates uses at least 71°C for the ground beef, checked with a clean food thermometer after stirring: NSW guidance names 71°C for minced meat because mince carries contamination throughout, and warns that browning is not a reliable doneness indicator. Continue cooking and recheck if below the target. Keep the beef refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw mince and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: minced meat 71°C; colour unreliable', NSW_TEMP], ['USDA (US): remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      1: 'In large skillet, brown beef in 2 tablespoons olive oil over high heat; drain and reserve. Browning is not a doneness check for mince: stir, then safely take the skillet off the heat and use a clean food thermometer to check at least 71°C, continuing to cook and rechecking if below the target.',
    },
  },
  'wikibooks:garlic-pork-chops-black-mushrooms': {
    title: 'Probe the ½-inch chops from the side',
    note: 'Two Plates adds a measured endpoint: the source browns the chops about 2 minutes per side and simmers briefly, but time and colour are not doneness checks. The chops are ½ inch thick, so safely take the pan off the heat and use a clean food thermometer inserted from the side into the centre of each chop; NSW guidance names 71°C for pork. Continue cooking and recheck any chop below the target. Keep the pork refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw pork and ready-to-eat food, and clean hands and surfaces after handling. Do not wash the raw pork. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: pork 71°C; do not wash raw meat', NSW_TEMP], ['USDA (US): thin foods from the side, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      4: 'Stir in the soy sauce mixture, and bring to a boil. Reduce the heat to low, and simmer for 5 minutes, uncovered, then safely take the pan off the heat and use a clean food thermometer inserted from the side into the centre of each chop to check at least 71°C. Continue cooking and recheck any below the target.',
    },
  },
  'wikibooks:honey-peppered-salmon': {
    title: 'Cook the salmon to 63°C, not "desired doneness"',
    note: 'Two Plates replaces the source endpoint "desired doneness" with a clean food thermometer in the thickest part of each fillet: check at least 63°C, following NSW fish guidance. The source 10–12 minutes stays as the process; confirm with the thermometer and continue baking and recheck if below the target. Keep the salmon refrigerated at 5°C or colder before and during any marinating longer than the source 30 minutes at room temperature. The used marinade contacted raw fish: discard it, do not serve it as a sauce. Use separate boards and utensils for raw fish and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      6: 'Bake for 10–12 minutes, then safely take the dish out and use a clean food thermometer in the thickest part of each fillet to check at least 63°C; "desired doneness" is not a measured check. Continue baking and recheck if below the target.',
    },
  },
  'wikibooks:maple-planked-salmon': {
    title: 'Cook the salmon to 63°C; mind the plank and the fire',
    note: 'Two Plates replaces the source endpoint "desired doneness" with a clean food thermometer in the thickest part of each piece: check at least 63°C, following NSW fish guidance. The soaked cedar plank can smoulder or catch: keep the lid closed, keep a spray bottle of water nearby, never leave the lit grill unattended, follow the grill manufacturer directions, and check current local fire restrictions before lighting. The source step to immerse the used plank in water afterwards is kept. The resting marinade contacted raw fish: discard it, do not serve it. Keep the salmon refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw fish and the garnish, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['Fire and Rescue NSW: cooking fire safety', 'https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/cooking-fire-safety']],
    replacements: {
      8: 'Grill for roughly 15 minutes without turning or moving salmon, then open the lid and use a clean food thermometer in the thickest part of each piece to check at least 63°C; "desired doneness" and loss of transparency are not measured checks. Continue grilling with the lid closed and recheck if below the target. Watch the plank for smouldering and keep a spray bottle of water nearby.',
    },
  },
  'wikibooks:meatloaf-iv': {
    title: 'Probe the centre of the loaf; 75 minutes is not the check',
    note: 'Two Plates uses at least 71°C in the centre of the loaf, checked with a clean food thermometer: NSW guidance names 71°C for minced meat because mince carries contamination throughout, and the source timing ("75 minutes or more, if desired") is not a doneness check. Continue baking and recheck if below the target. The raw eggs are baked into the loaf; the measured centre endpoint covers them. Keep the beef and eggs refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw meat and egg and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: minced meat 71°C', NSW_TEMP], ['USDA (US): meatloaf probe in the centre', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      8: 'Bake 75 minutes or more, if desired, and confirm with a clean food thermometer in the centre of the loaf: at least 71°C. Continue baking and recheck if below the target.',
    },
  },
  'wikibooks:mediterranean-green-chicken': {
    title: 'Cook the pieces to 75°C; clear juices are not the check',
    note: 'Two Plates replaces the source endpoint "until juices run clear" with a clean food thermometer in the thickest part of each piece, avoiding bone: check at least 75°C, following FSANZ poultry guidance; continue baking and recheck any piece below the target. The used marinade contacted raw chicken: discard it, do not serve it. Keep the chicken refrigerated at 5°C or colder, including while marinating, use separate boards and utensils for raw chicken and ready-to-eat food, and clean hands and surfaces after handling. Do not wash the raw chicken. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry 75°C; do not wash raw poultry', FSANZ], ['USDA (US): thickest part, avoid bone, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      7: 'Bake about 40 minutes, turning pieces after 20 minutes, then safely take the tray out and use a clean food thermometer in the thickest part of each piece, avoiding bone, to check at least 75°C; juices running clear are not a doneness check. Continue baking and recheck any piece below the target.',
    },
  },
  'wikibooks:poppyseed-chicken': {
    title: 'Heat the casserole through to steaming hot',
    note: 'Two Plates adds a measured check: the chicken is already cooked, so the bake must heat the casserole until it is steaming hot throughout, at least 60°C in the centre, per NSW reheating guidance; the source 25 minutes is not a measured check. Continue baking and recheck if below the target. The pre-cooked chicken must be freshly and safely cooked or safely stored leftovers; see the handling note. Keep the chicken, mayonnaise, sour cream and cheese refrigerated at 5°C or colder before assembly, and follow product storage, use-by and cooking directions.',
    sources: [['NSW: reheat leftovers steaming hot, 60°C', NSW_TEMP], ['FSANZ: 5°C or colder storage', FSANZ]],
    replacements: {
      5: 'Bake at 350°F (175°C) for 25 minutes, and confirm the casserole is steaming hot throughout: safely take it out and use a clean food thermometer in the centre to check at least 60°C. Continue baking and recheck if below the target.',
    },
  },
  'wikibooks:schweinsbraten': {
    title: 'Do not wash the pork; probe the thickest part',
    note: 'Two Plates replaces two source cues. First, the source wash step is replaced with patting dry: washing raw meat spreads bacteria around the sink and does not make the meat safer (FSANZ guidance). Second, the endpoint "only juice oozes out (no blood)" is a colour cue: safely take the tray out and use a clean food thermometer in the thickest part of the roast to check at least 71°C, following NSW pork guidance; continue roasting and recheck if below the target. The pan juices contact the raw roast during basting: they are safe only once boiled in the deglazed sauce, which the source does. Keep the pork refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw pork and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: do not wash raw meat', FSANZ], ['NSW: pork 71°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Do not wash the meat: washing raw pork spreads bacteria around the sink without making it safer. Pat it dry with a paper towel. For a crispy crunch on top of the meat, cut a diamond pattern (each about 1 inch long) into the fat side.',
      8: 'The meat is done when a clean food thermometer in the thickest part reads at least 71°C; juice colour ("no blood") is not a doneness check. Continue roasting and recheck if below the target. The crust should be brown and crunchy.',
    },
  },
  'wikibooks:simple-italian-sausage-spaghetti': {
    title: 'Cook the sausage through; "cooked through" needs a number',
    note: 'Two Plates adds a measured check in the thickest part of the cooking crumbled sausage after stirring. Because the sausage species is unstated, it might contain poultry: use at least 75°C as the check (FSANZ names 75°C for poultry, including minced poultry). If the package confirms the sausage contains no poultry, NSW guidance names at least 71°C for minced meat and sausages, because ground sausage carries contamination throughout; colour is not a reliable doneness indicator either way. Continue cooking and recheck if below the target. Keep the sausage refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw sausage and ready-to-eat food, and clean hands and surfaces after handling. The sausage species is unstated; follow product storage, use-by and cooking directions, including the pasta package.',
    sources: [['FSANZ: poultry 75°C, including minced poultry', FSANZ], ['NSW: minced meat and sausages 71°C when confirmed non-poultry', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      4: 'Remove casings from sausage, if necessary, and crumble sausage into the pan. Stir and cook, breaking up the sausage, until the sausage is cooked through and the onion is tender: confirm with a clean food thermometer in the thickest part of the cooking sausage, at least 75°C (species unstated, possibly poultry; at least 71°C only if the package confirms no poultry), and continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:spicy-chicken-cutlets': {
    title: 'Probe the thin cutlets from the side',
    note: 'Two Plates adds a measured endpoint: the cutlets are thinly sliced, so safely take the skillet off the heat and use a clean food thermometer inserted from the side into the centre of each cutlet to check at least 75°C, following FSANZ poultry guidance; the source 2–3 minutes per side is not a doneness check. Continue cooking and recheck any cutlet below the target. The source holds the cooked cutlets in a 200°F (about 95°C) oven while the sauce cooks; keep that hold short. Dredging flour that contacted raw chicken is discarded, not reused. Keep the chicken refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw chicken and ready-to-eat food, and clean hands and surfaces after handling. Do not wash the raw chicken. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry 75°C; do not wash raw poultry', FSANZ], ['USDA (US): thin foods from the side, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      7: 'Flip and cook another 2–3 minutes, or until cooked through: confirm with a clean food thermometer inserted from the side into the centre of each cutlet, at least 75°C, and continue cooking and recheck any below the target.',
    },
  },
  'wikibooks:sweet-italian-sausage-skillet': {
    title: 'Cook the sausage through; browning is not the check',
    note: 'Two Plates adds a measured check in the thickest slices; the source 5 minutes of browning is not a doneness check. Because the sausage species is unstated, it might contain poultry: use at least 75°C as the check (FSANZ names 75°C for poultry, including minced poultry). If the package confirms the sausage contains no poultry, NSW guidance names at least 71°C for minced meat and sausages, because ground sausage carries contamination throughout; colour is not a reliable doneness indicator either way. Continue cooking and recheck if below the target. Keep the sausage refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw sausage and ready-to-eat food, and clean hands and surfaces after handling. The sausage species is unstated; follow product storage, use-by and cooking directions, including the pasta package.',
    sources: [['FSANZ: poultry 75°C, including minced poultry', FSANZ], ['NSW: minced meat and sausages 71°C when confirmed non-poultry; colour unreliable', NSW_TEMP], ['USDA (US): thin foods from the side, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Meanwhile, brown sliced sausage in hot oil in large skillet for 5 minutes, then drain away the fat. Browning is not a doneness check: use a clean food thermometer in the thickest slices to check at least 75°C (species unstated, possibly poultry; at least 71°C only if the package confirms no poultry), and continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:wine-roasted-pork-roast': {
    title: 'Probe the roast to 71°C; manage the campfire',
    note: 'Two Plates adds a measured endpoint: the source cooks "slowly for three hours" over a campfire, but fire heat varies and time is not a doneness check. Use a clean food thermometer in the thickest part of the roast to check at least 71°C, following NSW pork guidance; continue cooking and recheck if below the target. Campfire cooking needs care: check current local fire restrictions before lighting, keep the fire small and managed, never leave it unattended, and have water or a fire blanket ready; no current restriction status is checked by this recipe. Keep the pork refrigerated at 5°C or colder before preparation (a cooler with ice works), use separate boards and utensils for raw pork and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: pork 71°C', NSW_TEMP], ['Fire and Rescue NSW: cooking fire safety', 'https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/cooking-fire-safety'], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      6: 'Cover and cook slowly for three hours over fire, then use a clean food thermometer in the thickest part of the roast to check at least 71°C; three hours is not a doneness check. Continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:pepper-soup': {
    title: 'Probe to the species temperature; tenderness is not the check',
    note: 'Two Plates adds a measured endpoint: "simmer until tender" is a texture cue, not a doneness check. Safely take the pot off the heat and use a clean food thermometer in the thickest pieces: at least 75°C if the meat is chicken (FSANZ poultry guidance), and at least 70°C for goat, catfish or assorted meats (FSANZ general centre-temperature guidance). Continue simmering and recheck any piece below its target. Keep the meat refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw meat or fish and the fresh leaves, wash the leaves under running water, and clean hands and surfaces after handling. Do not wash raw poultry. The seasoning cubes, spice mix and ground crayfish are manufactured products; follow their storage and use-by directions.',
    sources: [['FSANZ: poultry 75°C; general 70°C centre', FSANZ], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      3: 'Combine the meat and water in a pot, and simmer until tender. Tenderness is not a doneness check: safely take the pot off the heat and use a clean food thermometer in the thickest pieces to check at least 75°C for chicken, or at least 70°C for goat, catfish or assorted meats. Continue simmering and recheck any piece below its target.',
    },
  },
  'wikibooks:chuck-wagon-beans': {
    title: 'Cook the mince through; browning is not the check',
    note: 'Two Plates uses at least 71°C for the crumbled ground chuck, checked with a clean food thermometer in the thickest part of the cooking meat after stirring: NSW guidance names 71°C for minced meat and sausages because ground meat carries contamination throughout, and warns that colour is not a reliable doneness indicator. Continue cooking and recheck if below the target. Keep the meat refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw meat and ready-to-eat food, and clean hands and surfaces after handling. The bacon is cooked in the same step. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: minced meat and sausages 71°C; colour unreliable', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      1: 'Brown bacon, ground chuck, and onion, then confirm with a clean food thermometer in the thickest part of the cooking beef: at least 71°C. Browning is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:dutch-oven-beans': {
    title: 'Probe the mince; manage the campfire',
    note: 'Two Plates uses at least 71°C for the crumbled ground beef, checked with a clean food thermometer in the thickest part of the cooking meat after stirring: NSW guidance names 71°C for minced meat and sausages because ground meat carries contamination throughout, and warns that colour is not a reliable doneness indicator. Continue cooking and recheck if below the target. Keep the meat refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw meat and ready-to-eat food, and clean hands and surfaces after handling. Campfire cooking needs care: check current local fire restrictions before lighting, keep the fire small and managed, never leave it unattended, keep children and flammable materials clear, and have water or a fire blanket ready; no current restriction status is checked by this recipe. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: minced meat and sausages 71°C; colour unreliable', NSW_TEMP], ['Fire and Rescue NSW: cooking fire safety', 'https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/cooking-fire-safety'], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      3: 'When bacon is nearly cooked, crumble ground beef and chopped onion into Dutch oven. Cook until the onion is translucent, then confirm the beef with a clean food thermometer in the thickest part of the cooking meat: at least 71°C. Continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:mostaccioli': {
    title: 'Probe the beef and sausage; browning is not the check',
    note: 'Two Plates adds a measured check in the thickest part of the cooking beef-and-sausage mixture after stirring: at least 75°C, because the sausage species is unstated and it might contain poultry (FSANZ names 75°C for poultry, including minced poultry). If the package confirms the sausage contains no poultry, NSW guidance names at least 71°C for minced meat and sausages, because ground meat carries contamination throughout; colour is not a reliable doneness indicator either way. Continue cooking and recheck if below the target. Keep the meat refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw meat and ready-to-eat food, and clean hands and surfaces after handling. The sausage species is unstated, so the sausage is treated with the same ground-meat caution. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry 75°C, including minced poultry', FSANZ], ['NSW: minced meat and sausages 71°C when confirmed non-poultry; colour unreliable', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'In skillet, combine meat, sausages, onion, green pepper and garlic. Cook while breaking up meat, until browned, then confirm with a clean food thermometer in the thickest part of the cooking meat: at least 75°C, because the sausage species is unstated and might be poultry (at least 71°C only if the package confirms no poultry). Browning is not a doneness check; continue cooking and recheck if below the target. Drain off fat.',
    },
  },
  'wikibooks:sloppy-joes': {
    title: 'Cook the mince through; browning is not the check',
    note: 'Two Plates uses at least 71°C for the ground beef, checked with a clean food thermometer in the thickest part of the cooking meat after stirring: NSW guidance names 71°C for minced meat and sausages because ground meat carries contamination throughout, and warns that colour is not a reliable doneness indicator. Continue cooking and recheck if below the target. Keep the meat refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw meat and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: minced meat and sausages 71°C; colour unreliable', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      1: 'Brown the ground beef, onions, and peppers in skillet on medium heat, then confirm with a clean food thermometer in the thickest part of the cooking beef: at least 71°C. Browning is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:spaghetti-bake': {
    title: 'Probe to the species temperature',
    note: 'Two Plates adds a measured endpoint: the source sautés the ground meat "when cooked through", which is not a measured check. Use a clean food thermometer in the thickest part of the cooking meat after stirring: at least 75°C if you chose turkey (FSANZ poultry guidance), or at least 71°C if you chose beef (NSW mince guidance). Continue cooking and recheck if below the target. Keep the meat refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw meat and ready-to-eat food, and clean hands and surfaces after handling. Do not wash raw poultry. Follow product storage, use-by and cooking directions, including the pasta package.',
    sources: [['FSANZ: poultry 75°C', FSANZ], ['NSW: minced meat 71°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Sauté ground meat with onion. When cooked through, confirm with a clean food thermometer in the thickest part of the cooking meat: at least 75°C for turkey, or at least 71°C for beef. Continue cooking and recheck if below the target, then mix in spaghetti sauce and seasoning.',
    },
  },
  'wikibooks:malvani-chicken-curry': {
    title: 'Cook the chicken through; tenderness is not the check',
    note: 'Two Plates adds a measured endpoint: the source cooks the chicken about 25 minutes "until tender and fully cooked", but time and tenderness are not doneness checks. Safely take the pan off the heat and use a clean food thermometer in the thickest chicken pieces, avoiding bone, to check at least 75°C, following FSANZ poultry guidance; continue cooking and recheck any piece below the target. Keep the chicken refrigerated at 5°C or colder before preparation and during the marinade, use separate boards and utensils for raw chicken and ready-to-eat food, and clean hands and surfaces after handling. Do not wash the raw chicken. The used marinade contacted raw chicken: it goes into the pan and cooks, but do not serve any that stayed out. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry 75°C; do not wash raw poultry', FSANZ], ['USDA (US): thickest part, avoid bones, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      6: 'Add the paste and salt, then mix well. Add water according to the desired level of consistency and bring to a boil. Cover and cook on low level for about 25 minute(s), then safely take the pan off the heat and use a clean food thermometer in the thickest chicken pieces, avoiding bone, to check at least 75°C. Continue cooking and recheck any below the target before serving.',
    },
  },
  'wikibooks:cioppino-italian-seafood-stew': {
    title: 'Probe the fish; sort the mussels twice',
    note: 'Two Plates adds a measured endpoint: the source simmers until the fish flakes easily, but flaking is a texture cue. Safely take the pot off the heat and use a clean food thermometer in the thickest fish pieces to check at least 63°C, following NSW fish guidance; continue simmering and recheck if below the target. The mussels go in live: before cooking, discard any with broken shells or that stay open when tapped; after cooking, discard any that stay closed (the source step to check is kept). The crab, scallops and fish all cook in the same broth; keep all seafood refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw seafood and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      8: 'Add the scallops and fish. Simmer gently until all the mussels are completely open, then safely take the pot off the heat and use a clean food thermometer in the thickest fish pieces to check at least 63°C. Continue simmering and recheck if below the target.',
    },
  },
  'wikibooks:fabes-con-almejas': {
    title: 'Sort the live clams before and after cooking',
    note: 'The clams go in live: the source scrub step is kept, and you must discard any clam with a broken shell or that stays open when tapped before cooking. Cook until the shells open, and discard any clam that stays closed after cooking; do not force them open. The beans simmer about 90 minutes per the source. Keep the clams refrigerated at 5°C or colder until cooking, use separate boards and utensils for raw shellfish and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: raw separation and temperature control', FSANZ], ['NSW: seafood handling', NSW_TEMP]],
    replacements: {
      2: 'Scrub the clams clean and rinse. Discard any with broken shells or that stay open when tapped; they are not safe to cook.',
      6: 'When the beans are almost done, place the clams in a separate skillet and add about an inch of water. Cover the skillet and cook until the shells open. Discard any clam that stays closed after cooking; do not force it open.',
    },
  },
  'wikibooks:cazuela-gallega': {
    title: 'The egg must be fully set',
    note: 'Two Plates adds a measured doneness check: The source 30-minute bake is not a reliable check that the egg is cooked through. Bake until the centre is fully set: a knife or skewer inserted into the centre comes out clean, the centre does not jiggle when the dish is gently shaken, and a clean food thermometer in the centre reads at least 71°C (an editorial application of FSANZ guidance to cook egg dishes thoroughly, not a tested dish-specific standard). This matters most for anyone pregnant, elderly, very young or immunocompromised. The ham is a cured, ready-to-eat product per the source presentation. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: cook egg dishes thoroughly', FSANZ], ['USDA (US): thermometer use', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      7: 'Carefully remove foil with the casserole from the bowl. Top with the cheese and bake in a preheated 400°F (205°C) oven until the eggs are fully set: the whites and yolks are firm, not runny, and a clean food thermometer in the centre of the egg reads at least 71°C (about 30 minutes). Colour and time alone are not the check.',
    },
  },
  'wikibooks:macaroni-pie': {
    title: 'Bake until the centre is fully set',
    note: 'Two Plates adds a measured doneness check: The source "fork comes out dry" cue and 30-minute time is not a reliable check that the egg is cooked through. Bake until the centre is fully set: a knife or skewer inserted into the centre comes out clean, the centre does not jiggle when the dish is gently shaken, and a clean food thermometer in the centre reads at least 71°C (an editorial application of FSANZ guidance to cook egg dishes thoroughly, not a tested dish-specific standard). This matters most for anyone pregnant, elderly, very young or immunocompromised. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: cook egg dishes thoroughly', FSANZ], ['USDA (US): thermometer use', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      5: 'Bake at 175°C (350°F) until firm (about 30 minutes), then confirm the egg is cooked through: a fork or metal skewer pressed all the way through the centre comes out clean, the centre does not jiggle, and a clean food thermometer in the centre reads at least 71°C. Continue baking and recheck if needed.',
    },
  },
  'wikibooks:radish-pie': {
    title: 'The custard must be fully set',
    note: 'Two Plates adds a measured doneness check: The source timing (20 minutes, then 15–20 with the walnuts) is not a reliable check that the egg is cooked through. Bake until the centre is fully set: a knife or skewer inserted into the centre comes out clean, the centre does not jiggle when the dish is gently shaken, and a clean food thermometer in the centre reads at least 71°C (an editorial application of FSANZ guidance to cook egg dishes thoroughly, not a tested dish-specific standard). This matters most for anyone pregnant, elderly, very young or immunocompromised. Let the pie cool as the source directs, and refrigerate leftovers within 2 hours (see the handling note). Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: cook egg dishes thoroughly', FSANZ], ['USDA (US): thermometer use', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      7: 'Add the walnuts and bake for another 15–20 minutes, then confirm the custard is fully set: a knife inserted into the centre comes out clean, the centre does not jiggle when the pan is gently shaken, and a clean food thermometer in the centre reads at least 71°C. Continue baking and recheck if needed.',
    },
  },
  'wikibooks:corny-souffle': {
    title: 'Bake until the centre is fully set',
    note: 'Two Plates adds a measured doneness check: The source 70-minute bake is not a reliable check that the egg is cooked through. Bake until the centre is fully set: a knife or skewer inserted into the centre comes out clean, the centre does not jiggle when the dish is gently shaken, and a clean food thermometer in the centre reads at least 71°C (an editorial application of FSANZ guidance to cook egg dishes thoroughly, not a tested dish-specific standard). This matters most for anyone pregnant, elderly, very young or immunocompromised. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: cook egg dishes thoroughly', FSANZ], ['USDA (US): thermometer use', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      6: 'Bake for 70 minutes, then confirm the centre is fully set: a knife inserted into the centre comes out clean, the centre does not jiggle when the dish is gently shaken, and a clean food thermometer in the centre reads at least 71°C. Continue baking and recheck if needed.',
    },
  },
  'wikibooks:parmesan-cheese-souffle': {
    title: 'Bake until the centre cooks through',
    note: 'Two Plates adds a measured doneness check: Rise and golden colour alone is not a reliable check that the egg is cooked through. Bake until the centre is fully set: a knife or skewer inserted into the centre comes out clean, the centre does not jiggle when the dish is gently shaken, and a clean food thermometer in the centre reads at least 71°C (an editorial application of FSANZ guidance to cook egg dishes thoroughly, not a tested dish-specific standard). This matters most for anyone pregnant, elderly, very young or immunocompromised. Serve immediately per the source; a souffle falls as it stands. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: cook egg dishes thoroughly', FSANZ], ['USDA (US): thermometer use', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      10: 'Pour the batter into the prepared soufflé dish and bake until the soufflé has risen 2–3 inches above the rim and the top is golden brown (1 to 1½ hours), then confirm it is cooked through: a thin skewer into the centre comes out clean and a clean food thermometer in the centre reads at least 71°C. Continue baking and recheck if needed.',
    },
  },
  'wikibooks:mini-three-cheese-english-muffin-pizzas': {
    title: 'Heat the frankfurters through',
    note: 'The frankfurters are a pre-cooked manufactured product; the source bakes until thoroughly heated. Heat them until steaming hot throughout, at least 60°C in the centre of the slices, checked with a clean food thermometer (an editorial application of NSW reheating guidance, not a tested product standard). Follow the product storage, use-by and heating directions on the frankfurter package, and the broiler and oven manufacturer directions; never leave a broiler unattended.',
    sources: [['NSW: reheat until steaming hot, 60°C', NSW_TEMP], ['Fire and Rescue NSW: cooking fire safety', 'https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/cooking-fire-safety']],
    replacements: {
      7: 'Bake 12–15 minutes until thoroughly heated: the frankfurter slices should be steaming hot throughout, at least 60°C in the centre. Continue baking and recheck if below the target.',
    },
  },
  'wikibooks:chicken-bacon-broccoli-alfredo-spaghetti': {
    title: 'Cook the chicken through; 4 minutes is not the check',
    note: 'Two Plates adds a measured endpoint: the source cooks the chopped chicken "for 4 minutes until cooked", which is not a measured doneness check. Safely take the pan off the heat and use a clean food thermometer in the thickest pieces, avoiding bone, to check at least 75°C, following FSANZ poultry guidance (which covers minced poultry); continue cooking and recheck any piece below the target. Keep poultry refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw poultry and ready-to-eat food, and clean hands and surfaces after handling. Do not wash raw poultry. The bacon is added later with the cheese. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry 75°C; do not wash raw poultry', 'https://www.foodstandards.gov.au/consumer/safety'], ['USDA (US): thickest part, avoid bones, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      3: 'Cook the chicken in the oil, then safely take the pan off the heat and use a clean food thermometer in the thickest pieces to check at least 75°C. Four minutes and colour are not doneness checks; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:gambas-al-ajillo-garlic-shrimp': {
    title: 'Probe the shrimp; pink colour is not the check',
    note: 'Two Plates adds a measured endpoint: the source sautés until the shrimp "turn pink and curl", which is a texture cue, not a measured check. Safely take the pan off the heat and use a clean food thermometer in the thickest pieces to check at least 63°C, following NSW fish guidance; continue cooking and recheck if below the target. Keep seafood refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw seafood and ready-to-eat food, and clean hands and surfaces after handling. The sherry (or cognac) stays in the dish; no alcohol-free claim is made. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: fish 63°C', 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers'], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Raise the heat to high and add the shrimp, lemon juice, sherry or cognac and paprika. Stir well, then sauté, stirring briskly, until the shrimp are opaque and a clean food thermometer in the thickest shrimp reads at least 63°C. Colour and curl are not measured checks; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:salmon-spaghetti': {
    title: 'Probe fresh salmon; smoked salmon is ready to eat',
    note: 'Two Plates adds a measured endpoint: the source cooks the salmon for "another 3 minutes", which is a texture cue, not a measured check. Safely take the pan off the heat and use a clean food thermometer in the thickest pieces to check at least 63°C, following NSW fish guidance; continue cooking and recheck if below the target. Keep seafood refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw seafood and ready-to-eat food, and clean hands and surfaces after handling. If you chose smoked salmon (the source alternative), it is a ready-to-eat product: add it to warm through only, keep it refrigerated at 5°C or colder, and follow the package storage and use-by directions. The white wine stays in the sauce; no alcohol-free claim is made. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: fish 63°C', 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers'], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Put the salmon into the pan and cook until it is opaque and a clean food thermometer in the thickest pieces reads at least 63°C (the source says about 3 minutes; time is not the check). Smoked salmon only needs warming through.',
    },
  },
  'wikibooks:manx-smoked-salmon': {
    title: 'Boiled kippers, cold-set cream: keep it cold',
    note: 'Two Plates adds a measured endpoint: the source boils the kippers without a measured endpoint, which is a texture cue, not a measured check. Safely take the pan off the heat and use a clean food thermometer in the thickest pieces to check at least 63°C, following NSW fish guidance; continue cooking and recheck if below the target. Keep seafood refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw seafood and ready-to-eat food, and clean hands and surfaces after handling. After blending with the cream, the terrine is never cooked again: refrigerate at 5°C or colder, keep total time out of refrigeration under 2 hours, and serve well chilled. The smoked salmon is a ready-to-eat cured product; follow its package storage and use-by directions, and do not serve raw cured fish to anyone pregnant, elderly, very young or immunocompromised without checking the product is suitable. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: fish 63°C', 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers'], ['NSW: refrigerate below 5°C', 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers'], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      1: 'Boil the kippers in a pot of salty water until a clean food thermometer in the thickest part reads at least 63°C, then continue with the recipe.',
    },
  },
  'wikibooks:menemen-eggs-with-onion-green-pepper-and-tomato': {
    title: 'Cook the eggs until fully set',
    note: 'Two Plates adds a measured doneness check: The source instruction "stir until cooked" is not a reliable check that the egg is cooked through. Cook until the egg is fully set: the centre does not jiggle when the pan is gently shaken, and a clean food thermometer in the centre reads at least 71°C (an editorial application of FSANZ guidance to cook egg dishes thoroughly, not a tested dish-specific standard). This matters most for anyone pregnant, elderly, very young or immunocompromised. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: cook egg dishes thoroughly', 'https://www.foodstandards.gov.au/consumer/safety'], ['USDA (US): thermometer use', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      6: 'Beat the eggs and pour over the mixture in the pan. Stir until the egg is fully set: no liquid egg remains, and a clean food thermometer reads at least 71°C. The source "stir until cooked" is not a measured check.',
    },
  },
  'wikibooks:baked-penne': {
    title: 'Bake until the centre is fully set',
    note: 'Two Plates adds a measured doneness check: The source bake times and "browned and bubbly" cue is not a reliable check that the egg is cooked through. Cook until the egg is fully set: the centre does not jiggle when the pan is gently shaken, and a clean food thermometer in the centre reads at least 71°C (an editorial application of FSANZ guidance to cook egg dishes thoroughly, not a tested dish-specific standard). This matters most for anyone pregnant, elderly, very young or immunocompromised. The egg whites are folded in raw. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: cook egg dishes thoroughly', 'https://www.foodstandards.gov.au/consumer/safety'], ['USDA (US): thermometer use', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      6: 'Remove foil and lower temperature to 350 °F (177 °C). Bake for another 30 minutes, then confirm the egg is cooked through: the centre does not jiggle when the pan is gently shaken and a clean food thermometer in the centre reads at least 71°C. Browning on top is not the check; continue baking and recheck if needed.',
    },
  },
  'wikibooks:paella-valenciana': {
    title: 'Probe the poultry and rabbit pieces',
    note: 'Two Plates adds a measured endpoint: the source sautés the poultry and rabbit "until golden brown" and then simmers them in the broth, which is not a measured doneness check. Safely take the pan off the heat and use a clean food thermometer in the thickest pieces, avoiding bone, to check at least 75°C, following FSANZ poultry guidance (which covers minced poultry); continue cooking and recheck any piece below the target. Keep poultry refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw poultry and ready-to-eat food, and clean hands and surfaces after handling. Do not wash raw poultry. The rabbit-or-duck line is a source alternative; treat both with the poultry endpoint. The optional snails are already boiled per the source. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry 75°C; do not wash raw poultry', 'https://www.foodstandards.gov.au/consumer/safety'], ['USDA (US): thickest part, avoid bones, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      5: 'Add the water and bring it to a rolling boil. Then add the snails, fresh haricot beans (if canned, continue reading to see when to add these), runner beans, and saffron (and/or food coloring). Allow the mixture to boil for 10 minutes over a high flame, then safely take the pan off the heat and use a clean food thermometer in the thickest meat pieces, avoiding bone, to check at least 75°C. Continue cooking and recheck any piece below the target. Sweep a rosemary branch through the broth for no longer than 30 seconds and then remove it.',
    },
  },
  'wikibooks:zupa-ogorkowa-polish-cucumber-soup': {
    title: 'Simmer the wings through; 25 minutes is not the check',
    note: 'Two Plates adds a measured endpoint: the source simmers the chicken wings for 25 minutes, which is not a measured doneness check. Safely take the pan off the heat and use a clean food thermometer in the thickest pieces, avoiding bone, to check at least 75°C, following FSANZ poultry guidance (which covers minced poultry); continue cooking and recheck any piece below the target. Keep poultry refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw poultry and ready-to-eat food, and clean hands and surfaces after handling. Do not wash raw poultry. The wings stay in the soup, so the meat continues cooking with the vegetables; check before serving. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry 75°C; do not wash raw poultry', 'https://www.foodstandards.gov.au/consumer/safety'], ['USDA (US): thickest part, avoid bones, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      1: 'Put the chicken wings, salt, pepper, bay leaves and pimentos into a saucepan or stock pot with 1.5 L (1½ quarts) cold water. After bringing it to a boil, let it simmer for 25 minutes on low heat, then use a clean food thermometer in the thickest wing meat, avoiding bone, to check at least 75°C. Continue simmering and recheck if below the target.',
    },
  },
  'wikibooks:zuppa-toscana': {
    title: 'Probe the sausage; browning is not the check',
    note: 'Two Plates adds a measured endpoint: the source browns the crumbled sausage, which is not a measured doneness check. The sausage species is unstated and could include poultry, so use a clean food thermometer in the thickest part of the cooking sausage meat, after breaking it up, to check at least 75°C (FSANZ poultry guidance, which covers minced poultry); 71°C applies only if the package confirms a non-poultry species (NSW mince guidance). Continue cooking and recheck if below the target. Keep the sausage refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw meat and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry 75°C', 'https://www.foodstandards.gov.au/consumer/safety'], ['NSW: minced meat and sausages 71°C', 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers'], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      1: 'In a skillet over medium-high heat, brown the sausage, breaking into small pieces as you fry it, then use a clean food thermometer in the thickest pieces to check at least 75°C (or at least 71°C only if the package confirms a non-poultry species). Browning is not a doneness check; continue cooking and recheck if below the target. Drain and set aside.',
    },
  },
  'wikibooks:tomato-basil-sausage-pasta': {
    title: 'Probe the sausage meat; 6 minutes is not the check',
    note: 'Two Plates adds a measured endpoint: the source cooks the sausage meat "for 6 minutes until well browned", which is not a measured doneness check. The sausage species is unstated and could include poultry, so use a clean food thermometer in the thickest part of the cooking sausage meat, after breaking it up, to check at least 75°C (FSANZ poultry guidance, which covers minced poultry); 71°C applies only if the package confirms a non-poultry species (NSW mince guidance). Continue cooking and recheck if below the target. Keep the sausage refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw meat and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry 75°C', 'https://www.foodstandards.gov.au/consumer/safety'], ['NSW: minced meat and sausages 71°C', 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers'], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Meanwhile, cook the sausage meat in a pan over a medium heat, then use a clean food thermometer in the thickest part of the cooking meat to check at least 75°C (or at least 71°C only if the package confirms a non-poultry species). Six minutes and browning are not doneness checks; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:stir-fried-seafood-with-noodles': {
    title: 'Probe the shrimp; the fishballs are pre-cooked',
    note: 'Two Plates adds a measured endpoint: the source stir-fries until the shrimp "just begin to change color", which is a texture cue, not a measured check. Safely take the pan off the heat and use a clean food thermometer in the thickest pieces to check at least 63°C, following NSW fish guidance; continue cooking and recheck if below the target. Keep seafood refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw seafood and ready-to-eat food, and clean hands and surfaces after handling. Fishballs are a pre-cooked manufactured product whose species and formulation are unstated; heat them through until steaming and follow the package storage, use-by and heating directions. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: fish 63°C', 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers'], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Add the fishball and shrimp. Stir fry until the shrimp are opaque and a clean food thermometer in the thickest shrimp reads at least 63°C. Beginning to change color is not a measured check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:succotash': {
    title: 'Parboil the pickled pork; cook the lima beans through',
    note: 'The source parboils the optional pickled pork; pickled pork is a cured product, so parboil it per the source and then make sure it cooks through with the beans: at least 71°C in the thickest pieces checked with a clean food thermometer (an editorial application of NSW guidance for cured meats being recooked, not a tested product standard). Follow the product storage, use-by and cooking directions. The source also warns that lima beans must be thoroughly boiled for at least 10 minutes to remove a natural toxin; that source instruction is kept and applies here. This is a feast-scale recipe (2 quarts of beans, 24 ears of corn) per the source.',
    sources: [['NSW: recook cured meats through', 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers'], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      1: 'If using pork, cover pork with water, and parboil it. Then cook it through with the beans to at least 71°C in the thickest pieces. If using fresh (uncooked) lima beans, boil them thoroughly for at least 10 minutes first as the source notes; canned beans are safe without this step.',
      2: 'Add beans, then corn, sugar, butter, and pepper to taste. After corn is added, watch carefully to keep from scorching. Make sure the beans are fully tender and any pork has reached at least 71°C before serving.',
    },
  },
  'wikibooks:calzone': {
    title: 'Cook raw meat toppings through before sealing',
    note: 'The optional topping line is species-open and may include raw sausage. Pre-cook any raw meat topping before filling the calzone: use a clean food thermometer in the thickest part to check at least 75°C for sausage of unstated species or poultry (FSANZ poultry guidance), or at least 71°C for package-confirmed non-poultry mince (NSW guidance). Cured ready-to-eat toppings (ham, salami, pepperoni) only need to heat through in the bake. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry 75°C', 'https://www.foodstandards.gov.au/consumer/safety'], ['NSW: minced meat and sausages 71°C', 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers'], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Combine ricotta, mozzarella, toppings, and oregano. Pre-cook any raw meat topping first and confirm at least 75°C (species unstated or poultry) or 71°C (package-confirmed non-poultry mince) in the thickest part; cured ready-to-eat toppings can go in as they are.',
    },
  },
  'wikibooks:florida-style-crab-cakes': {
    title: 'Cook the cakes through; golden is not the check',
    note: 'Two Plates adds a measured endpoint: the egg binder goes in raw, and the source cues (golden, hot but still moist) are not a measured check that the egg is cooked through. Cook until a clean food thermometer in the centre of a cake reads at least 71°C (an editorial application of FSANZ guidance to cook egg dishes thoroughly, not a tested dish-specific standard). Keep the crab meat refrigerated at 5°C or colder and follow its package storage and use-by directions.',
    sources: [['FSANZ: cook egg dishes thoroughly', 'https://www.foodstandards.gov.au/consumer/safety'], ['USDA (US): thermometer use', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      8: 'Lower heat to medium and cook until a clean food thermometer in the centre of a cake reads at least 71°C and the cakes are hot throughout. Golden colour and moist texture are not doneness checks; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:taco-casserole': {
    title: 'Probe the mince; browning is not the check',
    note: 'Two Plates adds a measured endpoint: the source browns the ground beef, but browning is not a doneness check for mince. Use a clean food thermometer in the thickest part of the cooking beef to check at least 71°C, following NSW mince guidance; continue cooking and recheck if below the target. Keep the beef refrigerated at 5°C or colder before preparation, use separate boards and utensils for raw meat and ready-to-eat food, and clean hands and surfaces after handling. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: minced meat and sausages 71°C; colour unreliable', 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers'], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      1: 'Brown the ground beef in skillet on medium heat, then use a clean food thermometer in the thickest part of the cooking beef to check at least 71°C. Browning is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:deluxe-burgers': {
    title: 'Probe the patties; grill time is not the check',
    note: 'Two Plates adds a measured endpoint: the patties contain raw ground beef (and pre-cooked crumbled bacon), and the source grill time of 5-7 minutes per side is not a doneness check for mince. Use a clean food thermometer in the thickest part of the centre of each patty, from the side, to check at least 71°C, following NSW mince guidance; continue grilling and recheck if below the target. Keep the beef refrigerated at 5°C or colder before preparation and wash hands, boards and utensils after handling raw mince. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: minced meat and sausages 71°C; colour unreliable', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      4: 'Grill the patties 5-7 minutes per side per the source, then use a clean food thermometer in the thickest part of the centre of each patty, from the side, to check at least 71°C. Colour and grill time are not doneness checks; continue grilling and recheck if below the target.',
    },
  },
  'wikibooks:italian-marinated-chicken': {
    title: 'Probe the chicken; 15 minutes is not the check',
    note: 'Two Plates adds a measured endpoint: the source grills the breasts 15 minutes "until done"; time and appearance are not doneness checks for poultry. Use a clean food thermometer in the thickest part of each breast, from the side, to check at least 75°C, following FSANZ poultry guidance; continue cooking and recheck if below the target. Discard the used marinade as the source directs and do not let it contact cooked food; only the reserved, uncontaminated mixture is used for basting. Keep the chicken refrigerated at 5°C or colder during marinating. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry 75°C', FSANZ], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      5: 'Grill or broil the chicken, turning and brushing often with the reserved broth mixture, then use a clean food thermometer in the thickest part of each breast to check at least 75°C. Time and appearance are not doneness checks; continue cooking and recheck if below the target. Discard the used marinade.',
    },
  },
  'wikibooks:pollo-del-fungo-chicken-with-mushrooms': {
    title: 'Probe the chicken strips; frying time is not the check',
    note: 'Two Plates adds a measured endpoint: the source fries the flour-dusted chicken strips without a measured check. Use a clean food thermometer in the thickest part of a strip to check at least 75°C, following FSANZ poultry guidance; continue cooking and recheck if below the target. Keep the chicken refrigerated at 5°C or colder before preparation and wash hands, boards and utensils after handling raw chicken. Follow product storage, use-by and cooking directions.',
    sources: [['FSANZ: poultry 75°C', FSANZ], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      5: 'Roll the chicken strips in the flour mixture and fry, then use a clean food thermometer in the thickest part of a strip to check at least 75°C. Continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:lamb-sausages-and-grilled-potatoes': {
    title: 'Probe the sausages; frying time is not the check',
    note: 'Two Plates adds a measured endpoint: the source fries the sausages about 10 minutes; time and browning are not doneness checks for sausages. The lamb sausages are a package-stated non-poultry species, so use a clean food thermometer in the centre of a sausage to check at least 71°C, following NSW sausage guidance; continue cooking and recheck if below the target. Keep the sausages refrigerated at 5°C or colder before cooking. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: minced meat and sausages 71°C; colour unreliable', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      4: 'Cook the sausages about 10 minutes on high heat per the source, turning occasionally, then use a clean food thermometer in the centre of a sausage to check at least 71°C. Browning is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:mapo-tofu': {
    title: 'Probe the mince; browning is not the check',
    note: 'Two Plates adds a measured endpoint: the source fries the minced beef or pork until brown; browning is not a doneness check for mince. Both source species are non-poultry, so use a clean food thermometer in the thickest part of the cooking mince to check at least 71°C, following NSW mince guidance; continue cooking and recheck if below the target. Keep the mince refrigerated at 5°C or colder before preparation. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: minced meat and sausages 71°C; colour unreliable', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      3: 'Add the minced meat and garlic and fry until brown, then use a clean food thermometer in the thickest part of the cooking mince to check at least 71°C. Browning is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks:pork-aachi': {
    title: 'Probe the pork; browning is not the check',
    note: 'Two Plates adds a measured endpoint: the source browns the diced pork, simmers it half-done, then finishes it in the onion mixture; browning is not a doneness check. Use a clean food thermometer in the thickest part of a pork piece to check at least 71°C, following NSW guidance for pork; continue cooking and recheck if below the target. Keep the pork refrigerated at 5°C or colder before preparation. Follow product storage, use-by and cooking directions.',
    sources: [['NSW: pork 71°C; colour unreliable', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      7: 'Add the half-cooked meat and mix well, then cook until a clean food thermometer in the thickest part of a pork piece reads at least 71°C. Browning is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  "nhlbi:bavarian-beef": {
    title: "Check the meat with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and browning are not doneness checks. Use a clean food thermometer in the thickest part to check at least 63\u00b0C for whole-cut meat, and rest 3 minutes, following NSW guidance; continue cooking and recheck if below the target.",
    guidanceOnly: true,
    sources: [["NSW: whole-cut meat 63\u00b0C and resting", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:beef-and-bean-chili": {
    title: "Check the meat with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and browning are not doneness checks. Use a clean food thermometer in the thickest part to check at least 63\u00b0C for whole-cut meat, and rest 3 minutes, following NSW guidance; continue cooking and recheck if below the target.",
    guidanceOnly: true,
    sources: [["NSW: whole-cut meat 63\u00b0C and resting", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:beef-stroganoff": {
    title: "Check the meat with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and browning are not doneness checks. Use a clean food thermometer in the thickest part to check at least 63\u00b0C for whole-cut meat, and rest 3 minutes, following NSW guidance; continue cooking and recheck if below the target.",
    guidanceOnly: true,
    sources: [["NSW: whole-cut meat 63\u00b0C and resting", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:black-skillet-beef-with-greens-and-red-potatoes": {
    title: "Check the meat with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and browning are not doneness checks. Use a clean food thermometer in the thickest part to check at least 63\u00b0C for whole-cut meat, and rest 3 minutes, following NSW guidance; continue cooking and recheck if below the target.",
    guidanceOnly: true,
    sources: [["NSW: whole-cut meat 63\u00b0C and resting", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:quick-beef-casserole": {
    title: "Check the mince with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: browning is not a doneness check for minced meat. Use a clean food thermometer in the centre of the thickest part to check at least 71\u00b0C, following NSW mince guidance; continue cooking and recheck if below the target.",
    guidanceOnly: true,
    sources: [["NSW: mince 71\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:scrumptious-meat-loaf": {
    title: "Check the mince with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: browning is not a doneness check for minced meat. Use a clean food thermometer in the centre of the thickest part to check at least 71\u00b0C, following NSW mince guidance; continue cooking and recheck if below the target.",
    guidanceOnly: true,
    sources: [["NSW: mince 71\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:stir-fried-beef-and-potatoes": {
    title: "Check the meat with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and browning are not doneness checks. Use a clean food thermometer in the thickest part to check at least 63\u00b0C for whole-cut meat, and rest 3 minutes, following NSW guidance; continue cooking and recheck if below the target.",
    guidanceOnly: true,
    sources: [["NSW: whole-cut meat 63\u00b0C and resting", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:stir-fried-beef-and-chinese-vegetables": {
    title: "Check the meat with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and browning are not doneness checks. Use a clean food thermometer in the thickest part to check at least 63\u00b0C for whole-cut meat, and rest 3 minutes, following NSW guidance; continue cooking and recheck if below the target.",
    guidanceOnly: true,
    sources: [["NSW: whole-cut meat 63\u00b0C and resting", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:baked-pork-chops": {
    title: "Check the fish or seafood with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times are not doneness checks. Use a clean food thermometer in the thickest part of the fish or seafood, avoiding bones, to check at least 63\u00b0C, following NSW fish guidance; continue cooking and recheck if below the target. Keep fish and seafood refrigerated at 5\u00b0C or colder before preparation.",
    guidanceOnly: true,
    sources: [["NSW: fish 63\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bones, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:shish-kabob": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:spicy-veal-roast": {
    title: "Check the meat with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and browning are not doneness checks. Use a clean food thermometer in the thickest part to check at least 63\u00b0C for whole-cut meat, and rest 3 minutes, following NSW guidance; continue cooking and recheck if below the target.",
    guidanceOnly: true,
    sources: [["NSW: whole-cut meat 63\u00b0C and resting", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:barbecued-chicken": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:barbecued-chicken-spicy-southern-style": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:chicken-gumbo": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:chicken-and-rice": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:chicken-and-spanish-rice": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:chicken-marsala": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:chicken-orientale": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:chicken-ratatouille": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:chicken-salad": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:chicken-stew": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:crispy-oven-fried-chicken": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:finger-licking-curried-chicken": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:grilled-chicken-with-green-chile-sauce": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:jamaican-jerk-chicken": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:20-minute-chicken-creole": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:very-lemony-chicken": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:autumn-turkey-stuffed-cabbage": {
    title: "Check the ground poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: for ground poultry, use a clean food thermometer in the centre of the thickest part to check at least 75\u00b0C, following NSW guidance for poultry and minced meats; continue cooking and recheck if below the target. Keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C, mince guidance", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:spaghetti-with-turkey-meat-sauce": {
    title: "Check the ground poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: for ground poultry, use a clean food thermometer in the centre of the thickest part to check at least 75\u00b0C, following NSW guidance for poultry and minced meats; continue cooking and recheck if below the target. Keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C, mince guidance", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:turkey-meat-loaf": {
    title: "Check the ground poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: for ground poultry, use a clean food thermometer in the centre of the thickest part to check at least 75\u00b0C, following NSW guidance for poultry and minced meats; continue cooking and recheck if below the target. Keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C, mince guidance", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:baked-salmon-dijon": {
    title: "Check the fish or seafood with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times are not doneness checks. Use a clean food thermometer in the thickest part of the fish or seafood, avoiding bones, to check at least 63\u00b0C, following NSW fish guidance; continue cooking and recheck if below the target. Keep fish and seafood refrigerated at 5\u00b0C or colder before preparation.",
    guidanceOnly: true,
    sources: [["NSW: fish 63\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bones, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:baked-trout": {
    title: "Check the fish or seafood with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times are not doneness checks. Use a clean food thermometer in the thickest part of the fish or seafood, avoiding bones, to check at least 63\u00b0C, following NSW fish guidance; continue cooking and recheck if below the target. Keep fish and seafood refrigerated at 5\u00b0C or colder before preparation.",
    guidanceOnly: true,
    sources: [["NSW: fish 63\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bones, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:catfish-stew-and-rice": {
    title: "Check the fish or seafood with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times are not doneness checks. Use a clean food thermometer in the thickest part of the fish or seafood, avoiding bones, to check at least 63\u00b0C, following NSW fish guidance; continue cooking and recheck if below the target. Keep fish and seafood refrigerated at 5\u00b0C or colder before preparation.",
    guidanceOnly: true,
    sources: [["NSW: fish 63\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bones, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:fish-veronique": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:mediterranean-baked-fish": {
    title: "Check the fish or seafood with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times are not doneness checks. Use a clean food thermometer in the thickest part of the fish or seafood, avoiding bones, to check at least 63\u00b0C, following NSW fish guidance; continue cooking and recheck if below the target. Keep fish and seafood refrigerated at 5\u00b0C or colder before preparation.",
    guidanceOnly: true,
    sources: [["NSW: fish 63\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bones, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:mouth-watering-oven-fried-fish": {
    title: "Check the fish or seafood with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times are not doneness checks. Use a clean food thermometer in the thickest part of the fish or seafood, avoiding bones, to check at least 63\u00b0C, following NSW fish guidance; continue cooking and recheck if below the target. Keep fish and seafood refrigerated at 5\u00b0C or colder before preparation.",
    guidanceOnly: true,
    sources: [["NSW: fish 63\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bones, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:scallop-kabobs": {
    title: "Check the fish or seafood with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times are not doneness checks. Use a clean food thermometer in the thickest part of the fish or seafood, avoiding bones, to check at least 63\u00b0C, following NSW fish guidance; continue cooking and recheck if below the target. Keep fish and seafood refrigerated at 5\u00b0C or colder before preparation.",
    guidanceOnly: true,
    sources: [["NSW: fish 63\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bones, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:spicy-baked-fish": {
    title: "Check the fish or seafood with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times are not doneness checks. Use a clean food thermometer in the thickest part of the fish or seafood, avoiding bones, to check at least 63\u00b0C, following NSW fish guidance; continue cooking and recheck if below the target. Keep fish and seafood refrigerated at 5\u00b0C or colder before preparation.",
    guidanceOnly: true,
    sources: [["NSW: fish 63\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bones, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:spinach-stuffed-sole": {
    title: "Check the fish or seafood with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times are not doneness checks. Use a clean food thermometer in the thickest part of the fish or seafood, avoiding bones, to check at least 63\u00b0C, following NSW fish guidance; continue cooking and recheck if below the target. Keep fish and seafood refrigerated at 5\u00b0C or colder before preparation.",
    guidanceOnly: true,
    sources: [["NSW: fish 63\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bones, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:tuna-salad": {
    title: "Check the fish or seafood with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times are not doneness checks. Use a clean food thermometer in the thickest part of the fish or seafood, avoiding bones, to check at least 63\u00b0C, following NSW fish guidance; continue cooking and recheck if below the target. Keep fish and seafood refrigerated at 5\u00b0C or colder before preparation.",
    guidanceOnly: true,
    sources: [["NSW: fish 63\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bones, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:chillin-out-pasta-salad": {
    title: "Check the fish or seafood with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times are not doneness checks. Use a clean food thermometer in the thickest part of the fish or seafood, avoiding bones, to check at least 63\u00b0C, following NSW fish guidance; continue cooking and recheck if below the target. Keep fish and seafood refrigerated at 5\u00b0C or colder before preparation.",
    guidanceOnly: true,
    sources: [["NSW: fish 63\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bones, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:red-hot-fusilli": {
    title: "Check the poultry with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and colour are not doneness checks. Use a clean food thermometer in the thickest part of the poultry, avoiding bone, to check at least 75\u00b0C, following NSW poultry guidance; continue cooking and recheck if below the target. Marinate in the refrigerator as the source says, never on the bench, and keep raw poultry refrigerated at 5\u00b0C or colder.",
    guidanceOnly: true,
    sources: [["NSW: poultry 75\u00b0C", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, avoid bone, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  "nhlbi:mexican-pozole": {
    title: "Check the meat with a thermometer",
    note: "Two Plates food-safety note, separate from the NHLBI method: cooking times and browning are not doneness checks. Use a clean food thermometer in the thickest part to check at least 63\u00b0C for whole-cut meat, and rest 3 minutes, following NSW guidance; continue cooking and recheck if below the target.",
    guidanceOnly: true,
    sources: [["NSW: whole-cut meat 63\u00b0C and resting", "https://www.foodauthority.nsw.gov.au/consumer/food-safety-home/cooking-temperatures"], ["USDA (US): thickest part, remove from heat to check", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer"]],
  },
  'wikibooks-fr:fr-poulet-gaston-gerard': {
    title: 'Probe the chicken after the bake',
    note: 'Two Plates adds a measured endpoint: the source browns the chicken pieces and bakes 30 minutes at 200 °C; time is not a doneness check for poultry. After baking, use a clean food thermometer in the thickest part of the largest piece, avoiding bone, to check at least 75°C, following NSW poultry guidance; continue baking and recheck if below the target. Keep the chicken refrigerated at 5°C or colder before preparation and use separate boards and tools for raw chicken.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['USDA (US): thickest part, avoid bones and remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      4: 'Sprinkle with grated Comté and bake at 200 °C until a clean food thermometer in the thickest part of the largest piece, avoiding bone, reads at least 75°C - the source suggests 30 minutes, but time is not a doneness check; continue baking and recheck if below the target.',
    },
  },
  'wikibooks-fr:fr-couscous-de-poulet-au-miel': {
    title: 'Probe the chicken before adding the honey',
    note: 'Two Plates adds a measured endpoint: the source cooks the whole chicken covered, turning it, and says "once the chicken is cooked"; that wording is not a doneness check for poultry. Use a clean food thermometer in the thickest part of the thigh, avoiding bone, to check at least 75°C, following NSW poultry guidance, before adding the honey; continue cooking and recheck if below the target. Keep the chicken refrigerated at 5°C or colder before preparation and use separate boards and tools for raw chicken.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['USDA (US): thickest part, avoid bones and remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      7: 'Once a clean food thermometer in the thickest part of the thigh, avoiding bone, reads at least 75°C (the source says "once the chicken is cooked", which is not a doneness check; continue cooking and recheck if below the target), add 4 tablespoons honey and 1 tablespoon cinnamon. Mix, let the sauce reduce and remove from heat when well creamy and the chicken well golden.',
    },
  },
  'wikibooks-fr:fr-risotto-au-poulet': {
    title: 'Probe the chicken strips before adding rice',
    note: 'Two Plates adds a measured endpoint: the source browns the chicken breast strips and simmers 10 minutes with no doneness check. Use a clean food thermometer in the thickest strip to check at least 75°C, following NSW poultry guidance; continue cooking and recheck if below the target. Keep the chicken refrigerated at 5°C or colder before preparation and use separate boards and tools for raw chicken. Cool leftover risotto promptly and refrigerate below 5°C; reheat only once until steaming hot throughout.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Add the glass of white wine and the peeled tomato pieces, and cook over low heat until a clean food thermometer in the thickest chicken strip reads at least 75°C - the source suggests 10 minutes, but time is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-fr:fr-sauce-gnangnan': {
    title: 'Probe the meat; species unspecified in source',
    note: 'Two Plates adds a measured endpoint: the source boils the meat pieces about 30 minutes and simmers the sauce 30 minutes more; time is not a doneness check, and the meat species is unspecified. Use a clean food thermometer in the thickest pieces to check the safe internal temperature for the meat you are using, following NSW guidance: at least 75°C for poultry; at least 71°C for minced or mixed meats, raised to at least 75°C whenever the mix may contain poultry; at least 63°C with a 3-minute rest for whole cuts of red meat. Continue cooking and recheck if below the target. Keep meat refrigerated at 5°C or colder before preparation and use separate boards and tools for raw meat.',
    sources: [['NSW: cooking temperatures (poultry 75°C, minced meat 71°C, whole cuts 63°C)', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      5: 'Add 1.5 l water to the saucepan and boil until a clean food thermometer in the thickest meat pieces reads the safe temperature for the meat used (at least 75°C for poultry or any mix that may contain poultry, at least 71°C for other minced or mixed meats, at least 63°C with a 3-minute rest for whole cuts of red meat) - the source suggests about thirty minutes, but time is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-fr:fr-djenkoume2': {
    title: 'Probe the guinea fowl; braising time is not the check',
    note: 'Two Plates adds a measured endpoint: the source braises the guinea-fowl pieces 40 minutes; time is not a doneness check. Use a clean food thermometer in the thickest piece, avoiding bone, to check at least 75°C, following NSW poultry guidance (guinea fowl is poultry); continue braising and recheck if below the target. This is the poultry\'s final cook - the later steps make the sauce and plate the dish. Keep the poultry refrigerated at 5°C or colder before preparation and use separate boards and tools for raw poultry.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      3: 'Braise the guinea-fowl pieces until a clean food thermometer in the thickest piece, avoiding bone, reads at least 75°C - the source suggests 40 minutes, but time is not a doneness check; continue braising and recheck if below the target.',
    },
  },
  'wikibooks-de:de-daeji-bulgogi': {
    title: 'Probe the pork strips; marinate in the fridge',
    note: 'Two Plates uses at least 71°C in the centre of the thickest pork strips, checked with a clean food thermometer. This is a conservative editorial selection of the NSW medium endpoint for whole-cut pork, not a universal minimum or a tested frying time. The source endpoint is "lightly cooked through" - colour is not proof of doneness. Marinate the pork refrigerated at 5°C or colder for the source hour; the marinade then fries with the pork and is cooked with it - it is never served uncooked. Keep raw pork and its marinade separate from ready-to-eat food, and clean hands, boards and utensils after handling. Gochujang is a manufactured product; follow its storage, use-by and cooking directions.',
    sources: [['NSW: pork medium endpoint and probe placement', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      4: 'When the meat is lightly cooked through, check the thickest pork strips with a clean food thermometer for at least 71°C - colour is not a doneness check; continue frying and recheck if below the target, then add the onions.',
    },
  },
  'wikibooks-de:de-moussaka': {
    title: 'Probe the centre of the bake; wine retained',
    note: 'Two Plates uses at least 71°C in the centre of the finished bake, checked with a clean food thermometer inserted into the thickest part of the mince layer. NSW guidance names 71°C for minced meat because mince carries contamination throughout, and warns that colour is not a reliable doneness indicator. The source browns the mince in step 3 and finishes it in a 1-hour bake; neither browning nor bake time is a doneness check - the measured check is added at the final cook step. Keep raw mince refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw meat and ready-to-eat food. The wine stays in the sauce; no alcohol-free claim. The eggs in the topping and mince cook through in the bake.',
    sources: [['NSW: minced meat 71°C; colour unreliable', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      7: 'Assembly: beat 2 eggs and stir them with the remaining cheese into the sauce from step 6. Brush a suitable baking dish with butter and sprinkle with breadcrumbs. Mix 1 egg into the mince. Line the dish with half of the aubergine slices and spread the mince over them. Distribute the rest of the aubergines on top and cover with the sauce. Bake in the oven for about 1 hour, then check the centre of the mince layer with a clean food thermometer for at least 71°C - bake time is not a doneness check; continue baking and recheck if below the target. To serve, cut the moussaka into squares.',
    },
  },
  'wikibooks-de:de-entenbrust-mit-orangensauce': {
    title: 'Probe the duck to 75°C; refrigerate the marinade and boil the sauce',
    note: 'Two Plates uses at least 75°C in the thickest part of the duck breast, checked with a clean food thermometer, following NSW poultry guidance. The source takes the duck off when it "appears done" - appearance is not a doneness check. Marinate refrigerated at 5°C or colder: the source marinates at least 2 hours, overnight if possible, without saying where, and room-temperature marinating is unsafe. The used marinade contacted raw duck and becomes the sauce: the adapted step brings the deglazed sauce to a full boil before the meat and orange segments go back in. Keep raw duck and its marinade separate from the salad and other ready-to-eat food, and clean hands, boards and utensils after handling.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['FSANZ: raw separation, temperature control and marinade handling', FSANZ]],
    replacements: {
      3: 'Cooking: score the skin side of the marinated duck breast crosswise and place it skin-side down in the hot, moderately greased pan; fry until the flesh at the edges begins to turn pale. Then turn and continue frying over moderate heat until a clean food thermometer in the thickest part reads at least 75°C - appearance is not a doneness check; continue frying and recheck if below the target. Remove the meat and leave it to rest covered with aluminium foil. Deglaze the pan juices with the soy sauce, which has meanwhile been pepped up with a little orange juice, and bring the sauce to a full boil - the marinade contacted raw duck. Add more orange juice as liked. Add the prepared orange segments to the sauce together with the meat. Serve with potatoes or noodles, which soak up the sauce well, and with the dressed endive salad.',
    },
  },
  'wikibooks-de:de-paprika-bohnen-curry': {
    title: 'Probe the pork pieces after the simmer',
    note: 'Two Plates uses at least 71°C in the centre of the thickest pork pieces, checked with a clean food thermometer. This is a conservative editorial selection of the NSW medium endpoint for whole-cut pork, not a universal minimum or a tested 20-minute process; the source states no cut, so check several of the thickest pieces. The source simmers about 20 minutes - time is not a doneness check; continue simmering and recheck if below the target. Keep raw pork refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw pork and ready-to-eat food. Follow product storage, use-by and cooking directions, including the canned beans and yogurt.',
    sources: [['NSW: pork medium endpoint and probe placement', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      8: 'Leave to simmer in the closed wok for about 20 minutes, then check the thickest pork pieces with a clean food thermometer for at least 71°C - time is not a doneness check; continue simmering and recheck if below the target.',
    },
  },
  'wikibooks-de:de-riz-casimir': {
    title: 'Probe the turkey strips',
    note: 'Two Plates uses at least 75°C in the thickest turkey strips, checked with a clean food thermometer, following NSW poultry guidance. The source steams the turkey about 15 minutes, then reduces it in the cream; neither time nor a creamy sauce is a doneness check - the measured check is added at the final cook step. Keep raw turkey refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw poultry and ready-to-eat food.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      4: 'Add the cream and curry and reduce to a creamy sauce; round off with the peach juice. Check the thickest turkey strips with a clean food thermometer for at least 75°C - time is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-de:de-frikadellen': {
    title: 'Probe the centre of every patty',
    note: 'Two Plates uses at least 71°C in the centre of each frikadelle, checked with a clean food thermometer. NSW guidance names 71°C for minced meat because mince carries contamination throughout, and warns that colour is not a reliable doneness indicator. The source finishes the patties "in a few minutes" over moderate heat - time and browning are not doneness checks. For thin patties, insert the probe from the side into the centre. Check every patty and continue cooking and recheck any below the target. Keep raw mince refrigerated at 5°C or colder before preparation; the mixture contains raw egg, so clean hands, boards and utensils after shaping and do not taste the raw mixture.',
    sources: [['NSW: minced meat 71°C; colour unreliable', NSW_TEMP], ['USDA (US): thin foods probed from the side', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      5: 'Fry the frikadellen in not too little fat on both sides, then finish cooking over moderate heat, turning occasionally, until a clean food thermometer in the centre of each patty - from the side for thin ones - reads at least 71°C. Browning and time are not doneness checks; continue cooking and recheck any patty below the target.',
    },
  },
  'wikibooks-de:de-bigos': {
    title: 'Probe the pork pieces after the braise',
    note: 'Two Plates uses at least 71°C in the centre of the thickest pork pieces, checked with a clean food thermometer. This is a conservative editorial selection of the NSW medium endpoint for whole-cut pork, not a universal minimum or a tested one-hour process. The source braises one hour - time is not a doneness check; continue braising and recheck if below the target. The smoked sausage\'s species and formulation are unverified; follow its package directions. Keep raw pork and bacon refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw meat and ready-to-eat food. Sauerkraut is a fermented product; follow its storage and use-by directions.',
    sources: [['NSW: pork medium endpoint and probe placement', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      1: 'Cut the bacon into small cubes, render it and briefly roast the chopped onions in it. Cut the meat into small cubes, the sausage into thick slices, the cabbage finely and the mushrooms into slices. Put everything with the spices and sauerkraut into a pot. Pour on enough hot water to barely cover everything. Leave the well-covered pot to braise for one hour in the preheated oven or over a low flame, then check the thickest pork pieces with a clean food thermometer for at least 71°C - time is not a doneness check; continue braising and recheck if below the target.',
    },
  },
  'wikibooks-de:de-haehnchen-aprikosen-mandel-reis': {
    title: 'Probe the chicken strips',
    note: 'Two Plates uses at least 75°C in the thickest chicken strips, checked with a clean food thermometer, following NSW poultry guidance. The source stir-fries the chicken 6-8 minutes - time is not a doneness check; continue cooking and recheck if below the target. Keep raw chicken refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw poultry and ready-to-eat food. Cool leftover cooked rice promptly, refrigerate below 5°C within 2 hours, eat within 2 days and reheat only once until steaming hot throughout (at least 60°C).',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['NSW: cooked-rice leftovers', 'https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers'], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      4: 'Then heat the oil in the pan and soften the onion cubes over low heat for 4-5 minutes. Add the chicken and stir-fry over medium heat for 6-8 minutes, until a clean food thermometer in the thickest strips reads at least 75°C - time is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-de:de-szegediner-gulasch': {
    title: 'Probe the thickest meat pieces; 71°C covers both species choices',
    note: 'Two Plates uses at least 71°C in the centre of the thickest meat pieces, checked with a clean food thermometer. The source offers beef or pork: 71°C is the conservative endpoint that covers both choices (the NSW medium endpoint for whole-cut pork; beef needs less), not a universal minimum or a tested 45-minute process. The source braises 45 minutes (15 in a pressure cooker) - time is not a doneness check; continue cooking and recheck if below the target. Keep raw meat refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw meat and ready-to-eat food.',
    sources: [['NSW: pork medium endpoint and probe placement', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      1: 'Cut the meat further into 2 cm pieces, roughly chop the onions, and sear together over high heat for about 5 minutes. Deglaze with 1/4 l water, add the sauerkraut, broth, tomato paste, the pressed garlic and the spices. Mix everything well and cook 15 minutes in a pressure cooker or 45 minutes in a normal pot, then check the thickest meat pieces with a clean food thermometer for at least 71°C - time is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-de:de-plov': {
    title: 'Probe the meat pieces; poultry may be chosen',
    note: 'Two Plates uses at least 75°C in the centre of the thickest meat pieces, checked with a clean food thermometer. The source leaves the species open and poultry is one of its options, so the conservative NSW poultry endpoint is used to cover every choice; if you cook only beef, lamb or pork, 71°C suffices. The source cooks covered for about 40 minutes - time is not a doneness check; continue cooking and recheck if below the target. Keep raw meat refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw meat and ready-to-eat food. Cool leftover cooked rice promptly, refrigerate below 5°C within 2 hours, eat within 2 days and reheat only once until steaming hot throughout (at least 60°C).',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      13: 'Cover the pot with a lid and cook over medium heat for about 40 minutes, then check the thickest meat pieces with a clean food thermometer for at least 75°C - time is not a doneness check; continue cooking and recheck if below the target. At the end, mix everything through.',
    },
  },
  'wikibooks-de:de-zanderfilet-auf-sauerkraut': {
    title: 'Probe the zander fillet',
    note: 'Two Plates uses at least 63°C in the thickest part of the fillet, checked with a clean food thermometer, following NSW fish guidance. The source fries 2-3 minutes - time is not a doneness check; continue frying and recheck if below the target. Keep the fish refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw fish and ready-to-eat food. The spice bag is removed before serving; the decoration apple is served raw.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      9: 'Season the zander with salt and pepper and fry in a frying pan over medium heat for 2-3 minutes in a little oil and butter, until a clean food thermometer in the thickest part reads at least 63°C - time is not a doneness check; continue frying and recheck if below the target.',
    },
  },
  'wikibooks-de:de-garnelen-mit-fenchel': {
    title: 'Cook the shrimp through',
    note: 'Two Plates uses at least 63°C for seafood, checked with a clean food thermometer in the thickest shrimp, following NSW guidance for fish and seafood. The source fries the shrimp briefly - colour and time are not doneness checks; continue cooking and recheck if below the target. Keep raw shrimp refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw seafood and ready-to-eat food. This dish contains crustaceans, a declared allergen.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      4: 'Briefly roast the tomato paste and garlic with them, add the pasta water and lemon juice, season generously, and cook until a clean food thermometer in the thickest shrimp reads at least 63°C - colour and time are not doneness checks; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-de:de-estragonhuhn': {
    title: 'Probe the whole chicken at the thigh',
    note: 'Two Plates uses at least 75°C in the thickest part of the thigh, checked with a clean food thermometer away from bone, following NSW poultry guidance for a whole bird. The source braises about 50 minutes and says to test at the belly - time and feel are not doneness checks; continue braising and recheck if below the target. Keep raw chicken refrigerated at 5°C or colder before preparation; do not wash it; use separate boards and utensils for raw poultry and ready-to-eat food, and clean hands and surfaces after handling.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      4: 'Braise over low heat for about 50 minutes, until a clean food thermometer in the thickest part of the thigh, away from bone, reads at least 75°C - time and feel are not doneness checks; continue braising and recheck if below the target.',
    },
  },
  'wikibooks-de:de-lammkeule-geschmort': {
    title: 'Probe the centre of the leg after the braise',
    note: 'Two Plates uses at least 71°C in the centre of the leg, checked with a clean food thermometer away from bone. This is a conservative editorial medium endpoint for a whole-cut leg of lamb, not a universal minimum or a tested 2.5-hour process; NSW safe-minimum guidance allows less for whole cuts with a rest. The source braises 1.5 hours plus another hour - time is not a doneness check; continue braising and recheck if below the target. Keep raw lamb refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw meat and ready-to-eat food.',
    sources: [['NSW: whole-cut red meat; probe placement', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      2: 'Step 2: peel the potatoes and place them in cold water so they do not brown and look unseemly. After the 1.5 hours, open the roasting pan, pour in the remaining wine, turn the leg and place the potatoes raw into the roasting pan with the leg. Close the lid again and braise in the oven for another 1 hour, then check the centre of the leg with a clean food thermometer, away from the bone, for at least 71°C - time is not a doneness check; continue braising and recheck if below the target.',
    },
  },
  'wikibooks-de:de-huehnerbrust-rahmwirsing': {
    title: 'Probe the chicken breast in the oven',
    note: 'Two Plates uses at least 75°C in the thickest part of each chicken breast, checked with a clean food thermometer, following NSW poultry guidance. The source cooks "to the point" in just under 20 minutes - time and feel are not doneness checks; continue cooking and recheck if below the target. Keep raw chicken refrigerated at 5°C or colder before preparation; do not wash it; use separate boards and utensils for raw poultry and ready-to-eat food.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      10: 'Put foil on a baking tray and cook the chicken breast in the oven at 200 degrees, until a clean food thermometer in the thickest part reads at least 75°C - the source\'s "just under 20 minutes, to the point" is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-de:de-lachs-spinat-auflauf': {
    title: 'Probe the fish at the centre of the bake',
    note: 'Two Plates uses at least 63°C in the thickest part of each fillet, checked with a clean food thermometer, following NSW fish guidance. The source bakes about 30 minutes - time is not a doneness check; continue baking and recheck if below the target. Keep the fish refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw fish and ready-to-eat food.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      5: 'Before the bake is ready to serve, it has to bake at 180 degrees fan for about 30 minutes, until a clean food thermometer in the thickest part of a fillet reads at least 63°C - time is not a doneness check; continue baking and recheck if below the target.',
    },
  },
  'wikibooks-de:de-hack-in-weisskohl': {
    title: 'Never taste raw mince; probe the mince layers after the braise',
    note: 'Two Plates uses at least 71°C in the centre of a mince layer, checked with a clean food thermometer. NSW guidance names 71°C for minced meat because mince carries contamination throughout, and warns that colour is not a reliable doneness indicator. The source\'s method says to taste the seasoned mixture before baking - never taste raw mince; taste only a cooked sample instead. The 1.5-hour braise is not a doneness check; continue braising and recheck if below the target. Keep raw mince and the raw-egg mixture refrigerated at 5°C or colder before preparation, clean hands, boards and utensils after shaping, and beware the par-boiled cabbage stays hot inside for about ten minutes.',
    sources: [['NSW: minced meat 71°C; colour unreliable', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      5: 'Mix the mince with the onion, thyme, garlic, egg and bread roll and season generously with salt and pepper. Taste only a cooked sample - never taste the raw mince mixture.',
      13: 'Leave to braise in the oven for 1.5 hours at 180 degrees C, then check the centre of a mince layer with a clean food thermometer for at least 71°C - time is not a doneness check; continue braising and recheck if below the target. Check the heat 10 minutes after putting it in and adjust if needed.',
    },
  },
  'wikibooks-de:de-kalafkalsch': {
    title: 'Never taste raw mince; probe the centre of a cigar',
    note: 'Two Plates uses at least 71°C in the centre of a cigar, checked with a clean food thermometer. NSW guidance names 71°C for minced meat because mince carries contamination throughout, and warns that colour is not a reliable doneness indicator. The source\'s method says to taste the mixture after kneading - never taste raw mince; taste only a cooked sample instead. "Until nicely done through" is not a doneness check; continue cooking and recheck if below the target. The mixture contains raw egg yolk: keep it refrigerated at 5°C or colder, clean hands, boards and utensils after shaping, and do not let it sit out. The source advises eating within 24 hours - follow the handling note on this recipe.',
    sources: [['NSW: minced meat 71°C; colour unreliable', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      2: 'Then add the garlic and the other spices and knead the mass vigorously so everything distributes well and a creamy mass forms. After kneading, taste only a cooked sample - never taste the raw mince mixture - and season if needed.',
      4: 'Cook the Khlav Kalash on the grill or in the pan until a clean food thermometer in the centre of a cigar reads at least 71°C - "nicely done through" is not a doneness check; continue cooking and recheck if below the target - and serve with a can of crab juice!',
    },
  },
  'wikibooks-de:de-pfefferrahmschnitzel': {
    title: 'Probe the schnitzels after the simmer',
    note: 'Two Plates uses at least 71°C in the centre of the thickest schnitzel, checked with a clean food thermometer. This is a conservative editorial selection of the NSW medium endpoint for whole-cut pork, not a universal minimum. The source\'s doneness cue is "when the meat is through" after frying and a short simmer - appearance and time are not doneness checks; continue cooking and recheck if below the target. Keep raw pork refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw pork and ready-to-eat food.',
    sources: [['NSW: pork medium endpoint and probe placement', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      12: 'Leave to simmer 5 minutes (do not add any water in this time), then check the thickest schnitzel with a clean food thermometer for at least 71°C - appearance and time are not doneness checks; continue simmering and recheck if below the target.',
    },
  },
  'wikibooks-de:de-fischsalat': {
    title: 'Probe the steamed fish pieces; steaming time is not the check',
    note: 'Two Plates adds a measured endpoint: the source steams the fish pieces for a fixed time; time is not a doneness check. Use a clean food thermometer in the thickest fish piece to check at least 63°C, following NSW fish guidance, before taking the fish out of the steam; continue steaming and recheck if below the target. Keep the fish refrigerated at 5°C or colder before preparation. Fillet can still carry bones.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      1: 'Cut the fish fillets into bite-sized pieces. Bring some water to the boil in a pot and set the steamer insert over it. First put in the monkfish and after one minute the flounder; steam until a clean food thermometer in the thickest piece reads at least 63°C - the source suggests about 6 minutes in total, but time is not a doneness check; continue steaming and recheck if below the target. Then take the fish out of the steam and leave to cool.',
    },
  },
  'wikibooks-de:de-haehnchenroulade-mikrowelle': {
    title: 'Probe the roulades after the microwave time',
    note: 'Two Plates uses at least 75°C in the centre of the thickest roulade, checked with a clean food thermometer - NSW guidance names 75°C for poultry. The source finishes the roulades in the microwave for a fixed 20-25 minutes; time and appearance are not doneness checks, and microwave power varies, so continue cooking and recheck if below the target. The ham wrapping is a cured product and does not make the raw chicken inside safe. Keep raw chicken refrigerated at 5°C or colder, use separate boards and utensils for raw chicken and ready-to-eat food, and wash hands after shaping the roulades.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      5: 'Leave to cook in the microwave with 50%-50%-grill and normal microwave power at 800 watts until a clean food thermometer in the centre of the thickest roulade reads at least 75°C - the source suggests about 20-25 minutes, but time is not a doneness check and microwave power varies; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-de:de-lachs-in-vanille': {
    title: 'Probe the salmon at the end of the frying',
    note: 'Two Plates adds a measured endpoint: the source fries the salmon pieces without a doneness check. Use a clean food thermometer in the thickest part of a salmon piece to check at least 63°C, following NSW fish guidance, before taking the fish out of the pan; continue frying and recheck if below the target. Keep the salmon refrigerated at 5°C or colder before preparation.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      2: 'Shortly before the end of the cooking time, add the leek, some of the parsley and the dill, and fry until a clean food thermometer in the thickest part of a salmon piece reads at least 63°C - appearance and time are not doneness checks; continue frying and recheck if below the target.',
    },
  },
  'wikibooks-de:de-baerlauchsuppe': {
    title: 'Identify wild garlic with certainty before use',
    note: 'Two Plates editorial note (not a change to the source method): wild garlic (Bärlauch) is often foraged, and it has toxic lookalikes - especially lily of the valley and autumn crocus, which have caused poisonings. Use only leaves you have identified with certainty (wild garlic smells clearly of garlic when rubbed) or buy cultivated wild garlic; when in doubt, do not use foraged leaves. Wash the leaves well as the source says.',
    sources: [['BfR (Germany): wild garlic lookalike poisoning warnings', 'https://www.bfr.bund.de/en/press-release/wild-garlic-confusion-often-leads-to-poisoning/']],
  },

  'wikibooks-de:de-blaetterteigfisch': {
    title: 'Probe the fish filling through the pastry',
    note: 'Two Plates adds a measured endpoint: the source bakes the filled pastry for a fixed 40 minutes; time is not a doneness check for the raw fish and salmon mousse inside. Use a clean food thermometer pushed into the thickest part of the filling to check at least 63°C, following NSW fish guidance; continue baking and recheck if below the target. Keep the fish, shrimps and the raw-egg mousse refrigerated at 5°C or colder during assembly. Fillet can still carry bones.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      9: 'Bake in the preheated oven at 200°C until a clean food thermometer in the thickest part of the fish filling reads at least 63°C - the source suggests about 40 minutes, but time is not a doneness check; continue baking and recheck if below the target.',
    },
  },
  'wikibooks-de:de-chili-con-carne': {
    title: 'Probe the mince; simmering time is not the check',
    note: 'Two Plates uses at least 71°C for the minced beef, checked with a clean food thermometer in a thicker clump of the meat - NSW guidance names 71°C for minced meat because mince carries contamination throughout, and warns that colour is not a reliable doneness indicator. The source simmers for fixed times; time and the meat darkening are not doneness checks, so continue simmering and recheck if below the target. Keep the raw mince and beef cubes refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw meat and ready-to-eat food.',
    sources: [['NSW: minced meat 71°C; colour unreliable', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      7: 'When everything has drawn through well, the beans can be added too and cook along for at least another 15 minutes, then check a thicker clump of the meat with a clean food thermometer for at least 71°C - simmering time is not a doneness check for minced meat; continue cooking and recheck if below the target.',
    },
  },

  'wikibooks-de:de-gebratene-fische': {
    title: 'Probe the fish; frying time is not the check',
    note: 'Two Plates adds a measured endpoint: the source fries the fish for a fixed time on each side; time and colour are not doneness checks. Use a clean food thermometer in the thickest part of the fish to check at least 63°C, following NSW fish guidance; continue frying and recheck if below the target. Keep the fish refrigerated at 5°C or colder before preparation. The source\'s own warning is to eat within 24 hours - follow the handling note on this recipe. Whole fish and fillets can carry bones.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['USDA (US): thickest part, remove from heat to check', 'https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer']],
    replacements: {
      3: 'Heat the butter or fat in a sufficiently large frying pan, add the fish and fry on both sides over medium heat until a clean food thermometer in the thickest part reads at least 63°C - the source\'s frying times (7-12 minutes for whole fish, 3-6 minutes for fillets) are not doneness checks; continue frying and recheck if below the target.',
    },
  },

  'wikibooks-de:de-kartoffelpfanne-mit-forelle-und-erbsenschoten': {
    title: 'Probe the fish pieces; stewing time is not the check',
    note: 'Two Plates uses at least 63°C in the thickest fish piece, checked with a clean food thermometer, following NSW fish guidance. The source stews the fish about 1 minute - time is not a doneness check; continue stewing and recheck if below the target. If using frozen fish, thaw it in the refrigerator, not on the bench. Keep fish refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw fish and ready-to-eat food.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      3: 'Then add the fish cut into pieces and continue stewing until a clean food thermometer in the thickest piece reads at least 63°C - the source\'s about 1 minute (lid on) is not a doneness check; continue stewing and recheck if below the target.',
    },
  },
  'wikibooks-de:de-lammcurry': {
    title: 'Probe the lamb after the simmer',
    note: 'Two Plates uses at least 71°C in the thickest part of the largest pieces, checked with a clean food thermometer. This is a conservative editorial medium endpoint for whole-cut lamb, not a universal minimum or a tested 40-minute process; NSW safe-minimum guidance allows less for whole cuts with a rest. The source simmers 40 minutes - time is not a doneness check; continue simmering and recheck if below the target. Keep raw lamb refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw meat and ready-to-eat food.',
    sources: [['NSW: whole-cut red meat; probe placement', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      9: 'Add the coconut milk and boil down, then check the largest lamb pieces with a clean food thermometer in the thickest part for at least 71°C - time is not a doneness check; continue simmering and recheck if below the target.',
    },
  },
  'wikibooks-de:de-ram-stek': {
    title: 'Probe the steaks after the braise; do not wash the meat',
    note: 'Two Plates uses at least 71°C in the centre of the thickest steak, checked with a clean food thermometer. This is a conservative editorial medium endpoint for whole-cut beef, not a universal minimum or a tested 1.5-hour process; NSW safe-minimum guidance allows less for whole cuts with a rest. The source braises about 1.5 hours - time is not a doneness check; continue braising and recheck if below the target. The source says to wash the meat; food safety guidance advises against washing raw meat because splashes spread bacteria - pat it dry instead. Keep raw beef refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw meat and ready-to-eat food.',
    sources: [['NSW: whole-cut red meat; probe placement', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      8: 'Slowly add 1/2 litre broth (and the mushroom soaking water), stirring constantly, season with salt and pepper, return the meat slices and braise the whole covered over low heat for about 1.5 hours, then check the centre of the thickest steak with a clean food thermometer for at least 71°C - time is not a doneness check; continue braising and recheck if below the target.',
    },
  },
  'wikibooks-de:de-huhn-mit-knoblauch-und-chili': {
    title: 'Probe the chicken after the simmer',
    note: 'Two Plates uses at least 75°C in the thickest part of the largest chicken pieces, checked with a clean food thermometer, following NSW poultry guidance. The source simmers 10 minutes - time is not a doneness check; continue simmering and recheck if below the target. Keep raw chicken refrigerated at 5°C or colder before preparation; do not wash it; use separate boards and utensils for raw poultry and ready-to-eat food, and clean hands and surfaces after handling.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      6: 'Simmer for 10 minutes, then check the largest chicken pieces with a clean food thermometer in the thickest part for at least 75°C - time is not a doneness check; continue simmering and recheck if below the target.',
    },
  },
  'wikibooks-de:de-schichtsalat': {
    title: 'Keep the salad refrigerated during its day-long steep',
    note: 'Two Plates requires the salad to be kept refrigerated at 5°C or colder during steeping and storage, and to be kept cold until serving, because it contains cooked ham, hard-boiled eggs and a mayonnaise-style dressing and the source steeps it a day. Use commercially produced ready-to-eat ingredients (cooked ham, canned goods, salad mayonnaise).',
    sources: [['FSANZ: refrigeration of ready-to-eat and prepared foods', FSANZ]],
    replacements: {
      5: 'Leave the salad to marinate for a day, kept refrigerated at 5°C or colder, then serve - keep it cold until serving.',
    },
  },
  'wikibooks:cochinita-pibil': {
    title: 'Probe the pork after the 4-hour bake',
    note: 'Two Plates uses at least 71°C in the centre of the thickest piece, checked with a clean food thermometer. This is a conservative editorial endpoint for whole-cut pork, not a universal minimum; NSW safe-minimum guidance allows less for whole cuts with a rest. The source bakes 4 hours at 325°F (160°C) and checks that the meat shreds easily - time and tenderness are not doneness checks; continue baking and recheck if below the target. The pork marinates 8-24 hours - keep it refrigerated during marinating.',
    sources: [['NSW: whole-cut red meat; probe placement', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      7: 'Bake for 4 hours. Open the packet carefully; the meat should shred easily with a fork, and check the centre of the thickest piece with a clean food thermometer for at least 71°C - time is not a doneness check; continue baking and recheck if below the target.',
    },
  },
  'wikibooks:ghormeh-sabzi': {
    title: 'Probe the meat after the final simmer',
    note: 'Two Plates uses at least 71°C in the centre of the thickest piece, checked with a clean food thermometer. This is a conservative editorial endpoint for whole-cut beef or lamb, not a universal minimum; NSW safe-minimum guidance allows less for whole cuts with a rest. The source simmers 1-4 hours in total until the meat is fork-tender - time and tenderness are not doneness checks; continue simmering and recheck if below the target.',
    sources: [['NSW: whole-cut red meat; probe placement', NSW_TEMP]],
    replacements: {
      10: 'Add the dried limes, turmeric, pepper, and salt to the stew. Simmer for another ½-1 hour, then check the centre of the thickest piece of meat with a clean food thermometer for at least 71°C - time is not a doneness check; continue simmering and recheck if below the target.',
    },
  },
  'wikibooks:soto-ayam': {
    title: 'Probe the chicken after boiling',
    note: 'Two Plates uses at least 75°C in the thickest part of the chicken, checked with a clean food thermometer, following NSW poultry guidance. The source boils the chicken at least 30 minutes until tender - time and tenderness are not doneness checks; continue boiling and recheck if below the target.',
    sources: [['NSW: poultry safe minimum; probe placement', NSW_TEMP]],
    replacements: {
      2: 'Make soup by cooking the whole chicken with the spice paste, galangal, lime leaves, lemongrass, and bay leaves in a pot for at least 30 minutes until the meat is tender, then check the thickest part of the chicken with a clean food thermometer for at least 75°C - time is not a doneness check; continue boiling and recheck if below the target. Use a pressure cooker for faster cooking time and better broth. For a traditional method, bring the soup to a boil, cover, and turn off the heat, then let steep for 30-40 minutes - this makes the meat more tender.',
    },
  },
  'wikibooks:tajine-bil-samak': {
    title: 'Probe the fish after simmering',
    note: 'Two Plates uses at least 63°C in the thickest fillet, checked with a clean food thermometer. The source simmers the fish 10-15 minutes until it flakes easily - time and flaking are not doneness checks; continue simmering and recheck if below the target.',
    sources: [['FSANZ: seafood cooking and temperature control', FSANZ]],
    replacements: {
      7: 'Cover the tajine with a lid and let the fish simmer in the sauce for about 10-15 minutes, then check the thickest fillet with a clean food thermometer for at least 63°C - the fish should be cooked through and flake easily with a fork; continue simmering and recheck if below the target.',
    },
  },
  'wikibooks:buuz': {
    title: 'Probe a dumpling after steaming',
    note: 'Two Plates uses at least 71°C in the centre of a dumpling, checked with a clean food thermometer, because the filling is minced beef. The source steams 15 minutes - time is not a doneness check; continue steaming and recheck if below the target.',
    sources: [['NSW: minced meat safe minimum; probe placement', NSW_TEMP]],
    replacements: {
      6: 'Carefully place the buuz buns on the steamer pan, spacing them 1 cm (0.4 inch) away from one another. Place the pan into the boiling steamer and steam for about 15 minutes, then check the centre of one dumpling with a clean food thermometer for at least 71°C - time is not a doneness check; continue steaming and recheck if below the target.',
    },
  },
  'wikibooks:callaloo': {
    title: 'Cook the taro leaves through and probe the crab',
    note: 'The source simmers the pot covered for 30 minutes or more until everything is soft and cooked. Taro (dasheen) leaves must be cooked through - raw or undercooked taro leaves can irritate the mouth and throat from calcium oxalate crystals, and food-safety guidance says to boil them and cook thoroughly. Probe the crab pieces with a clean food thermometer for at least 63°C after simmering; time is not a doneness check. Salted beef or pork is a commercially prepared cured product; keep it refrigerated before preparation.',
    sources: [['Hong Kong CFS: cook edible taro properly; boiling and cooking thoroughly reduce irritation', 'https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_243_03.html'], ['FSANZ: seafood cooking and temperature control', FSANZ], ['NSW: refrigeration of ready-to-eat and prepared foods', NSW_TEMP]],
    replacements: {
      6: 'Bring to the boil; reduce the heat, cover and simmer for 30 minutes or more until everything is soft and cooked through - the taro leaves must be cooked through, do not eat them raw; check the crab pieces with a clean food thermometer for at least 63°C - time is not a doneness check; continue simmering and recheck if below the target.',
    },
  },

  'wikibooks-es:es-sopa-de-lima': {
    title: 'Probe the chicken breasts; well cooked is not the check',
    note: 'Two Plates adds a measured endpoint: the source poaches the chicken breasts until well cooked; that wording is not a doneness check. Use a clean food thermometer in the thickest part of each breast to check at least 75°C, following NSW poultry guidance; continue cooking and recheck if below the target. Keep the raw chicken refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw chicken and ready-to-eat food. Take care with hot oil when frying the tortilla strips.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      1: 'Cook the chicken breasts in the broth until a clean food thermometer in the thickest part of each breast reads at least 75°C - well cooked is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-es:es-pepian': {
    title: 'Probe the meat; the sauce time is not the check',
    note: 'Two Plates adds a measured endpoint: the source lists beef or chicken and simmers everything together; time is not a doneness check. Use a clean food thermometer in the thickest part of the largest meat pieces for at least 71°C for beef or 75°C because the meat might be poultry, following NSW guidance; continue simmering and recheck if below the target. Keep the raw meat refrigerated at 5°C or colder before preparation.',
    sources: [['NSW: poultry 75°C; mince and sausages 71°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      5: 'Drop in the meat and the vegetables so the flavors combine, keep boiling until thickened, and check the largest meat pieces with a clean food thermometer in the thickest part: at least 71°C for beef or 75°C for chicken - time is not a doneness check; continue simmering and recheck if below the target.',
    },
  },
  'wikibooks-es:es-marmitako-de-bonito': {
    title: 'Probe the bonito; the 10 minutes are not the check',
    note: 'Two Plates adds a measured endpoint: the source sears the bonito cubes and gives them a final 10 minutes in the stew; browning and time are not doneness checks. Use a clean food thermometer in the thickest part of the largest bonito cubes to check at least 63°C, following NSW fish guidance; continue cooking and recheck if below the target. Keep the fish refrigerated at 5°C or colder before preparation.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      9: 'Cook until a clean food thermometer in the thickest part of the largest bonito cubes reads at least 63°C - the 10 minutes are not a doneness check; continue cooking and recheck if below the target - then serve in the same pot.',
    },
  },
  'wikibooks-es:es-rocoto-relleno-a-la-cusquena': {
    title: 'Probe the beef; hot-oil care for the frying',
    note: 'Two Plates adds a measured endpoint: the source cooks the beef cubes a few minutes before stuffing; time is not a doneness check. Use a clean food thermometer in the centre of the beef cubes to check at least 71°C, following NSW guidance for cut and minced meats; continue cooking and recheck if below the target. Rocoto peppers are extremely hot: handle with care, keep hands away from eyes, and wash boards and utensils. Take care with hot oil in step 6: add the battered rocotos gently, do not overfill the pan, and never use water on an oil fire. Keep the beef refrigerated at 5°C or colder before preparation.',
    sources: [['NSW: mince and cut meats 71°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      4: 'Add the garlic, the beef and the bay leaf. Cook over medium heat until a clean food thermometer in the centre of the beef cubes reads at least 71°C - a few minutes is not a doneness check; continue cooking and recheck if below the target. Then add the carrot, peas, peanut, raisins, parsley and chopped egg. Season.',
    },
  },
  'wikibooks-es:es-seco-de-gallina': {
    title: 'Probe the chicken; tender is not the check',
    note: 'Two Plates adds a measured endpoint: the source cooks the bone-in chicken until tender; tenderness is not a doneness check. Use a clean food thermometer in the thickest part of the largest pieces, avoiding bone, to check at least 75°C, following NSW poultry guidance; continue cooking and recheck if below the target. Keep the raw chicken refrigerated at 5°C or colder before preparation and use separate boards and utensils for raw chicken and ready-to-eat food.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      5: 'Cook over low heat until a clean food thermometer in the thickest part of the largest pieces, avoiding bone, reads at least 75°C - tenderness is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-es:es-fabada-asturiana-olla-a-presion': {
    title: 'Probe the fresh tocino after pressure cooking',
    note: 'Two Plates adds a measured endpoint: the tocino is fresh (not cured) pork; the 40 pressure-cooking minutes are not a doneness check. After the pressure releases, open the cooker and use a clean food thermometer in the centre of the tocino pieces to check at least 71°C, following NSW guidance; if below the target, simmer uncovered and recheck. Dried beans must be fully cooked - do not eat them undercooked. Follow the pressure cooker manual for filling limits and safe opening. Keep the fresh tocino refrigerated at 5°C or colder before preparation.',
    sources: [['NSW: pork 71°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      5: 'When the cooker valve starts to spin, lower the heat to minimum and cook for 40 minutes, then let the pressure release, open the cooker and check the tocino pieces with a clean food thermometer in the centre for at least 71°C - time is not a doneness check; if below the target, simmer uncovered and recheck.',
    },
  },
  'wikibooks-es:es-bandeja-paisa': {
    title: 'Probe the beef; seven minutes is not the check',
    note: 'Two Plates adds a measured endpoint: the source fries the beef pieces about seven minutes, then pulverizes them; time is not a doneness check. Use a clean food thermometer in the centre of the beef pieces to check at least 71°C, following NSW guidance for mince and cut meats; continue cooking and recheck if below the target. The smoked hocks or tocino are commercially prepared products; follow their labels. Keep the beef refrigerated at 5°C or colder during the resting step and before preparation.',
    sources: [['NSW: mince and cut meats 71°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      7: 'Add the beef with the sauce and cook over medium heat until a clean food thermometer in the centre of the beef pieces reads at least 71°C - the seven minutes are not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-es:es-tacos-de-pollo-al-pastor': {
    title: 'Probe the chicken strips; marinade handling',
    note: 'Two Plates adds a measured endpoint: the source bakes the chicken strips about 15 minutes; time is not a doneness check. Use a clean food thermometer in the thickest part of the largest strips to check at least 75°C, following NSW poultry guidance; continue baking and recheck if below the target. The adobo contacts raw chicken during marinating: baste with it only during baking, and discard any leftover adobo that touched raw chicken unless it is boiled first. Keep the marinating chicken refrigerated as the source says.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      6: 'Bake at 180°C until a clean food thermometer in the thickest part of the largest strips reads at least 75°C - the about 15 minutes are not a doneness check; baste occasionally with the adobo during baking only, then discard the used adobo; continue baking and recheck if below the target.',
    },
  },
  'wikibooks-es:es-albondigas-en-salsa': {
    title: 'Probe the meatballs; frying and reducing are not the check',
    note: 'Two Plates adds a measured endpoint: the meatballs are minced pork and chicken, so they need the poultry-mince endpoint. Use a clean food thermometer in the centre of the largest meatballs to check at least 75°C, following NSW poultry guidance; continue cooking and recheck if below the target. The raw egg in the mixture and the test patty in step 3 must also cook through. The sauce contains wine and the marinade can use beer; no claim is made that the alcohol evaporates. Keep the raw mince refrigerated at 5°C or colder and use separate boards and utensils for raw meat and ready-to-eat food. Take care with hot oil when frying.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      7: 'Fry them in a pan with oil and transfer them to the saucepan with the sauce; then check the largest meatballs with a clean food thermometer in the centre for at least 75°C - frying is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-es:es-pollo-con-salsa-de-limon': {
    title: 'Probe the breast; three minutes a side is not the check',
    note: 'Two Plates adds a measured endpoint: the source cooks the breast about three minutes per side; time is not a doneness check. Use a clean food thermometer in the thickest part of the breast to check at least 75°C, following NSW poultry guidance; continue cooking and recheck if below the target. The sauce contains wine; no claim is made that the alcohol evaporates. Keep the raw chicken refrigerated at 5°C or colder and use separate boards and utensils for raw chicken and ready-to-eat food.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      3: 'Cover the pan and set to medium heat; cook, turning once, until a clean food thermometer in the thickest part of the breast reads at least 75°C - three minutes per side is not a doneness check; add the onion and the garlic after the first side and continue cooking, rechecking if below the target.',
    },
  },
  'wikibooks-es:es-conejo-en-salsa': {
    title: 'Probe the rabbit pieces; rabbit has no NSW temperature',
    note: 'Two Plates adds a measured endpoint: rabbit is not separately listed in NSW temperature guidance, so Two Plates uses a cautious endpoint of at least 71°C. Use a clean food thermometer in the thickest part of the largest pieces, avoiding bone; continue simmering and recheck if below the target. The livers cook with the rabbit and are blended into the sauce: they are offal and must cook through with the meat. Keep the raw rabbit refrigerated at 5°C or colder and use separate boards and utensils for raw meat and ready-to-eat food.',
    sources: [['NSW: mince and cut meats 71°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      4: 'Meanwhile the rabbit broth will have reduced; before adding the sauce, check the largest pieces with a clean food thermometer in the thickest part, avoiding bone, for at least 71°C - rabbit has no NSW temperature, so Two Plates uses this cautious endpoint; continue simmering and recheck if below the target, then add the sauce and let it come to a boil.',
    },
  },
  'wikibooks-es:es-cuy-en-salsa-de-mani': {
    title: 'Probe the cuy; marinade and produce handling',
    note: 'Two Plates adds a measured endpoint: cuy (guinea pig) is not separately listed in NSW temperature guidance, so Two Plates uses a cautious endpoint of at least 71°C. Use a clean food thermometer in the thickest part of the meat, avoiding bone; continue roasting and recheck if below the target. The adobo contacts the raw cuy during the overnight rest: keep it refrigerated and discard any leftover adobo that touched the raw meat. The salad is served raw: wash the lettuce, tomato and avocado under running water. Keep the raw cuy refrigerated at 5°C or colder and use separate boards and utensils for raw meat and ready-to-eat food. Take care with skewers and roasting heat.',
    sources: [['NSW: mince and cut meats 71°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      2: 'When the cuy is ready, place it on skewers and roast it, brushing on achiote (onoto) while it cooks, until a clean food thermometer in the thickest part, avoiding bone, reads at least 71°C - cuy has no NSW temperature, so Two Plates uses this cautious endpoint; continue roasting and recheck if below the target.',
    },
  },
  'wikibooks-es:es-caldo-tlalpeno': {
    title: 'Probe the chicken before shredding',
    note: 'Two Plates adds a measured endpoint: the source removes the chicken once cooked; cooked is not a doneness check. Before shredding, use a clean food thermometer in the thickest part of the breast to check at least 75°C, following NSW poultry guidance; continue simmering and recheck if below the target. Keep the raw chicken refrigerated at 5°C or colder and use separate boards and utensils for raw chicken and ready-to-eat food. The avocado and lime are served raw: wash them before cutting.',
    sources: [['NSW: poultry 75°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      3: 'Once a clean food thermometer in the thickest part of the breast reads at least 75°C - cooked is not a doneness check; continue simmering and recheck if below the target - remove the chicken from the broth, shred it and set it aside, keeping the broth on the heat.',
    },
  },
  'wikibooks-es:es-atascaburras': {
    title: 'Probe the salt cod; the 30 minutes are not the check',
    note: 'Two Plates adds a measured endpoint: the source boils the cod with the potatoes about 30 minutes; time is not a doneness check. Use a clean food thermometer in the thickest part of the cod to check at least 63°C, following NSW fish guidance; continue cooking and recheck if below the target. The cod is a salt-cured product and is not desalted here: keep it refrigerated at 5°C or colder before preparation. The hard-boiled eggs are a cooked input; boil them until the yolks are firm.',
    sources: [['NSW: fish 63°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      1: 'Boil the potatoes together with the salt cod, which has been washed but not desalted, until a clean food thermometer in the thickest part of the cod reads at least 63°C - the about 30 minutes are not a doneness check; continue cooking and recheck if below the target.',
    },
  },
  'wikibooks-es:es-chuletas-en-naranja': {
    title: 'Probe the chops; the consumed juice is not the check',
    note: 'Two Plates adds a measured endpoint: the source cooks the chops until the orange juice is consumed; that is not a doneness check. Use a clean food thermometer in the centre of the thickest chop to check at least 71°C, following NSW pork guidance; continue cooking and recheck if below the target. Keep the raw chops refrigerated at 5°C or colder and use separate boards and utensils for raw pork and ready-to-eat food.',
    sources: [['NSW: pork 71°C', NSW_TEMP], ['FSANZ: raw separation and temperature control', FSANZ]],
    replacements: {
      4: 'Cook over medium heat until the orange juice is mostly consumed and a clean food thermometer in the centre of the thickest chop reads at least 71°C - the consumed juice is not a doneness check; continue cooking and recheck if below the target.',
    },
  },
};
