// Dietary fibre per 100 g (or 100 ml) for every catalog ingredient, in the
// same form the catalog describes (raw meat and veg, dry grains and dal,
// drained tins). Typical reference values rounded from USDA FoodData Central
// and the FSANZ Australian Food Composition Database; brands and varieties
// differ, so treat dish fibre as a good estimate, not a lab figure.
//
// Carbs in data/ingredients.js are "available" carbs (Australian label
// style), which already exclude fibre - so fibre is counted separately here,
// never double-counted. Herbs and spices used by the teaspoon count as 0,
// matching their 0 macros in the catalog.
// A missing id is reported by tools/validate.mjs and leaves dishes using it
// with unknown fibre (never a silent 0).
export const FIBRE = {
  // Meat, dairy, eggs: no fibre
  chicken_breast: 0, chicken_thigh: 0, chicken_mince: 0, turkey_mince: 0,
  egg: 0, egg_whites: 0, paneer: 0, greek_yogurt: 0, light_milk: 0, light_cream: 0,
  cottage_cheese: 0, ricotta: 0, mozzarella: 0, parmesan: 0, feta: 0, cheddar: 0,
  halloumi: 0, butter: 0,
  // Soy
  tofu: 2, silken_tofu: 0.2, tempeh: 4.5, kimchi: 1.6,
  // Fruit & veg
  onion: 1.7, red_onion: 1.7, spring_onion: 2.6, shallot: 3.2, garlic: 2.1, ginger: 2,
  green_chilli: 1.5, red_chilli: 1.5, jalapeno: 2.8, tomato: 1.2, cherry_tomatoes: 1.2,
  capsicum: 1.9, spinach: 2.2, rocket: 1.6, broccoli: 2.6, cauliflower: 2, carrot: 2.8,
  zucchini: 1, eggplant: 3, mushrooms: 1, potato: 2.1, sweet_potato: 3, pumpkin: 2,
  green_beans: 2.7, okra: 3.2, asparagus: 2.1, bok_choy: 1, cabbage: 2.5, red_cabbage: 2.1,
  snow_peas: 2.6, bean_sprouts: 1.8, celery: 1.6, cos_lettuce: 2.1, cucumber: 0.5,
  avocado: 6.7, lime: 2.8, lemon: 2.8, pineapple: 1.4,
  coriander: 2.8, mint: 6.8, basil: 1.6, thai_basil: 1.6, parsley: 3.3, dill: 2.1,
  lemongrass: 0, lime_leaves: 0, curry_leaves: 0, // aromatics, removed before eating
  peas: 5, corn: 2.4, edamame: 5.2, frozen_spinach: 2.9, cauli_rice: 2,
  // Bakery
  wraps: 6, tortillas: 5.5, bread: 6.5, buns: 6, lebanese_bread: 2.2, hummus: 6,
  // Rice, pasta & grains (dry)
  basmati: 1.2, brown_rice: 3.4, jasmine: 1, arborio: 1, quinoa: 7, atta: 11,
  plain_flour: 2.7, besan: 10.8, wm_pasta: 9, protein_pasta: 8, lasagne: 3.2, orzo: 3.2,
  gnocchi: 2, panko: 3, cornflour: 0.9,
  // Tins (drained), legumes & dal (dry), stock
  chickpeas: 6.5, black_beans: 7, kidney_beans: 6.4, cannellini: 6, lentils_can: 4,
  refried_beans: 5, diced_tomatoes: 1.2, passata: 1.2, tomato_paste: 4.1, coconut_milk: 0.3,
  veg_stock: 0, chicken_stock: 0,
  red_lentils: 11, moong_dal: 8, toor_dal: 15, chana_dal: 12, urad_whole: 18,
  soya_chunks: 13, kala_chana: 17, lobia: 11,
  // Oils, sauces & pastes
  oil: 0, ghee: 0, sesame_oil: 0, soy_sauce: 0.5, oyster_sauce: 0.3, fish_sauce: 0,
  hoisin: 2.8, sriracha: 2.2, gochujang: 2, miso: 5.4, rice_vinegar: 0, mirin: 0,
  red_curry: 6, green_curry: 6, massaman: 5, tom_yum_paste: 3, laksa_paste: 4,
  chilli_garlic: 2, chilli_bean_paste: 4, chilli_crisp: 3, sambal: 3, tamarind: 5.1,
  schezwan: 2,
  // Noodles & wrappers
  rice_noodles: 1.6, hokkien: 1.5, udon: 1.2, soba: 3.5, ramen: 2.5, rice_paper: 0.8,
  dumpling_wrappers: 2, nori: 33,
  // Jars & condiments
  salsa: 1.5, enchilada_sauce: 1.3, chipotle: 3, pickled_jalapenos: 2.5, olives: 3.3,
  capers: 3.2, pesto: 1.5, roasted_capsicum: 1, balsamic: 0, vinegar: 0, dijon: 3.3,
  light_mayo: 0, peri_peri: 1,
  // Nuts & seeds
  peanut_butter: 6, peanuts: 8.5, cashews: 3.3, sesame_seeds: 11.8,
  // Whole spices counted like the ground ones: used by the teaspoon
  bay_leaf: 0, dried_chilli: 0,
};
