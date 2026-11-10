// Ingredient catalog. Every recipe's macros are computed from these numbers,
// so fixing a value here fixes it in every dish that uses it.
//
// Nutrition is per 100 g (or 100 ml): kcal, protein, carbs, fat.
// unit: how recipes and the grocery list count it — g, ml, pc, can, bunch, clove, sprig, tsp.
// g: grams per unit for anything that isn't g/ml (used for nutrition maths).
// diet: 'meat' or 'egg' — decides whether a dish is veg / egg / non-veg.
// src: protein source label, used to pick a dish's "main protein" and keep the week varied.
// pantry: true = usually already at home; shown under "Pantry check" instead of the shopping list.
// sameAs: other catalog ids for the SAME food in another form (peanut butter = peanuts).
// Used by Allergies & dislikes so excluding a food also excludes its direct forms. Only for
// definitional matches — never for packaged goods whose contents vary by brand (sauces, pastes).

export const AISLES = {
  fv: 'Fruit & veg',
  meat: 'Meat & poultry',
  dairy: 'Dairy, eggs & tofu',
  bakery: 'Bakery & wraps',
  frozen: 'Frozen',
  grains: 'Rice, pasta & grains',
  tins: 'Tins, legumes & stock',
  asian: 'International – Asian',
  mexican: 'International – Mexican',
  indian: 'International – Indian (or Indian grocer)',
  sauces: 'Sauces, oils & nuts',
  spices: 'Herbs & spices',
};

const I = (name, aisle, unit, kcal, p, c, f, opts = {}) => ({ name, aisle, unit, kcal, p, c, f, ...opts });
const SPICE = (name, opts = {}) => I(name, 'spices', 'tsp', 0, 0, 0, 0, { g: 2, pantry: true, ...opts });

export const INGREDIENTS = {
  // Meat & poultry
  chicken_breast: I('Chicken breast fillets', 'meat', 'g', 120, 23, 0, 2.6, { diet: 'meat', src: 'chicken' }),
  chicken_thigh: I('Chicken thigh fillets (skinless)', 'meat', 'g', 150, 19, 0, 8, { diet: 'meat', src: 'chicken' }),
  chicken_mince: I('Chicken mince', 'meat', 'g', 145, 19.5, 0, 7.5, { diet: 'meat', src: 'chicken' }),
  turkey_mince: I('Turkey mince (lean)', 'meat', 'g', 140, 20, 0, 6.5, { diet: 'meat', src: 'turkey' }),

  // Dairy, eggs & tofu
  egg: I('Eggs', 'dairy', 'pc', 143, 12.6, 0.7, 9.5, { g: 50, diet: 'egg', src: 'egg' }),
  egg_whites: I('Liquid egg whites', 'dairy', 'ml', 48, 11, 0.7, 0.2, { diet: 'egg', src: 'egg', sameAs: ['egg'] }),
  paneer: I('Paneer', 'dairy', 'g', 300, 18, 3, 24, { src: 'paneer' }),
  greek_yogurt: I('Greek yogurt, plain low-fat', 'dairy', 'g', 60, 10, 4, 0.3),
  light_milk: I('Light milk', 'dairy', 'ml', 42, 3.6, 5, 1),
  light_cream: I('Light thickened cream', 'dairy', 'ml', 195, 2.5, 4, 18),
  cottage_cheese: I('Cottage cheese, reduced fat', 'dairy', 'g', 90, 12.5, 3.5, 3),
  ricotta: I('Ricotta, light', 'dairy', 'g', 115, 9.5, 3, 7),
  mozzarella: I('Mozzarella, light, grated', 'dairy', 'g', 255, 27, 1, 16, { src: 'cheese' }),
  parmesan: I('Parmesan', 'dairy', 'g', 400, 35, 0, 28),
  feta: I('Feta, reduced fat', 'dairy', 'g', 220, 17, 1, 16),
  cheddar: I('Cheddar, light, grated', 'dairy', 'g', 270, 31, 0, 16, { src: 'cheese' }),
  halloumi: I('Halloumi, light', 'dairy', 'g', 250, 25, 2, 16, { src: 'cheese' }),
  butter: I('Butter', 'dairy', 'g', 720, 0.9, 0.5, 80),
  tofu: I('Firm tofu', 'dairy', 'g', 125, 13, 2, 7, { src: 'tofu' }),
  silken_tofu: I('Silken tofu', 'dairy', 'g', 55, 5.5, 1.5, 3, { src: 'tofu' }),
  tempeh: I('Tempeh', 'dairy', 'g', 195, 20, 8, 11, { src: 'tofu' }),
  kimchi: I('Kimchi', 'dairy', 'g', 23, 1.5, 3, 0.5),

  // Fruit & veg
  onion: I('Brown onion', 'fv', 'pc', 40, 1.1, 9, 0.1, { g: 150 }),
  red_onion: I('Red onion', 'fv', 'pc', 40, 1.1, 9, 0.1, { g: 150 }),
  spring_onion: I('Spring onions', 'fv', 'bunch', 32, 1.8, 7, 0.2, { g: 100 }),
  shallot: I('Eschalots (shallots)', 'fv', 'pc', 72, 2.5, 17, 0.1, { g: 30 }),
  garlic: I('Garlic', 'fv', 'clove', 150, 6, 33, 0.5, { g: 5 }),
  ginger: I('Ginger', 'fv', 'g', 80, 1.8, 18, 0.8),
  green_chilli: I('Green chillies', 'fv', 'pc', 40, 2, 9, 0.2, { g: 5 }),
  red_chilli: I('Red chillies', 'fv', 'pc', 40, 2, 9, 0.2, { g: 8 }),
  jalapeno: I('Jalapeños', 'fv', 'pc', 29, 0.9, 6.5, 0.4, { g: 15 }),
  tomato: I('Tomatoes', 'fv', 'pc', 18, 0.9, 3.9, 0.2, { g: 120 }),
  cherry_tomatoes: I('Cherry tomatoes', 'fv', 'g', 18, 0.9, 3.9, 0.2),
  capsicum: I('Capsicum', 'fv', 'pc', 31, 1, 6, 0.3, { g: 180 }),
  spinach: I('Baby spinach', 'fv', 'g', 23, 2.9, 1.4, 0.4),
  rocket: I('Rocket', 'fv', 'g', 25, 2.6, 2, 0.7),
  broccoli: I('Broccoli', 'fv', 'g', 34, 2.8, 4, 0.4),
  cauliflower: I('Cauliflower', 'fv', 'g', 25, 1.9, 3, 0.3),
  carrot: I('Carrots', 'fv', 'pc', 41, 0.9, 8, 0.2, { g: 120 }),
  zucchini: I('Zucchini', 'fv', 'pc', 17, 1.2, 2.5, 0.3, { g: 200 }),
  eggplant: I('Eggplant', 'fv', 'pc', 25, 1, 4, 0.2, { g: 400 }),
  mushrooms: I('Mushrooms', 'fv', 'g', 22, 3.1, 0.5, 0.3),
  potato: I('Potatoes', 'fv', 'pc', 77, 2, 16, 0.1, { g: 200 }),
  sweet_potato: I('Sweet potato', 'fv', 'g', 86, 1.6, 17, 0.1),
  pumpkin: I('Butternut pumpkin', 'fv', 'g', 45, 1, 10, 0.1),
  green_beans: I('Green beans', 'fv', 'g', 31, 1.8, 4, 0.2),
  okra: I('Okra (bhindi)', 'fv', 'g', 33, 1.9, 4, 0.2),
  asparagus: I('Asparagus', 'fv', 'g', 20, 2.2, 2, 0.1),
  bok_choy: I('Baby bok choy', 'fv', 'g', 13, 1.5, 1.2, 0.2),
  cabbage: I('Cabbage', 'fv', 'g', 25, 1.3, 4, 0.1),
  red_cabbage: I('Red cabbage', 'fv', 'g', 31, 1.4, 5, 0.2),
  snow_peas: I('Snow peas', 'fv', 'g', 42, 2.8, 5, 0.2),
  bean_sprouts: I('Bean sprouts', 'fv', 'g', 30, 3, 4, 0.2),
  celery: I('Celery', 'fv', 'g', 16, 0.7, 3, 0.2),
  cos_lettuce: I('Cos lettuce', 'fv', 'pc', 17, 1.2, 1.5, 0.3, { g: 300 }),
  cucumber: I('Lebanese cucumbers', 'fv', 'pc', 15, 0.7, 3, 0.1, { g: 150 }),
  avocado: I('Avocados', 'fv', 'pc', 160, 2, 1.8, 15, { g: 150 }),
  lime: I('Limes', 'fv', 'pc', 30, 0.7, 8, 0.2, { g: 60 }),
  lemon: I('Lemons', 'fv', 'pc', 29, 1.1, 6, 0.3, { g: 100 }),
  pineapple: I('Pineapple', 'fv', 'g', 50, 0.5, 12, 0.1),
  coriander: I('Coriander', 'fv', 'bunch', 23, 2.1, 0.9, 0.5, { g: 50 }),
  mint: I('Mint', 'fv', 'bunch', 70, 3.8, 8, 0.9, { g: 40 }),
  basil: I('Basil', 'fv', 'bunch', 23, 3.2, 1, 0.6, { g: 40 }),
  thai_basil: I('Thai basil', 'fv', 'bunch', 23, 3.2, 1, 0.6, { g: 40 }),
  parsley: I('Flat-leaf parsley', 'fv', 'bunch', 36, 3, 3, 0.8, { g: 50 }),
  dill: I('Dill', 'fv', 'bunch', 43, 3.5, 7, 1.1, { g: 30 }),
  lemongrass: I('Lemongrass stalks', 'fv', 'pc', 99, 1.8, 25, 0.5, { g: 20 }),
  lime_leaves: I('Kaffir lime leaves', 'fv', 'pc', 0, 0, 0, 0, { g: 1 }),
  curry_leaves: I('Curry leaves', 'indian', 'sprig', 0, 0, 0, 0, { g: 2 }),

  // Frozen
  peas: I('Frozen peas', 'frozen', 'g', 80, 5.4, 9, 0.4),
  corn: I('Frozen corn kernels', 'frozen', 'g', 86, 3.3, 16, 1.4),
  edamame: I('Frozen shelled edamame', 'frozen', 'g', 125, 12, 6, 5, { src: 'tofu' }),
  frozen_spinach: I('Frozen spinach', 'frozen', 'g', 25, 3, 1.5, 0.5, { sameAs: ['spinach'] }),
  cauli_rice: I('Frozen cauliflower rice', 'frozen', 'g', 25, 2, 3, 0.3, { sameAs: ['cauliflower'] }),

  // Bakery & wraps
  wraps: I('Wholemeal wraps (large)', 'bakery', 'pc', 290, 8.5, 46, 6.5, { g: 62 }),
  tortillas: I('Small tortillas (corn or wholemeal)', 'bakery', 'pc', 280, 8, 46, 6.5, { g: 40 }),
  bread: I('Wholegrain bread (slices)', 'bakery', 'pc', 245, 10, 40, 4, { g: 40 }),
  buns: I('Wholemeal rolls / buns', 'bakery', 'pc', 260, 9, 45, 4.5, { g: 70 }),
  lebanese_bread: I('Lebanese / pita bread', 'bakery', 'pc', 270, 9, 52, 2, { g: 80 }),
  hummus: I('Hummus', 'dairy', 'g', 230, 7, 13, 16),

  // Rice, pasta & grains
  basmati: I('Basmati rice', 'grains', 'g', 350, 7.5, 78, 0.6, { pantry: true }),
  brown_rice: I('Brown rice', 'grains', 'g', 360, 7.5, 76, 2.7, { pantry: true }),
  jasmine: I('Jasmine rice', 'grains', 'g', 355, 7, 79, 0.5, { pantry: true }),
  arborio: I('Arborio rice', 'grains', 'g', 355, 7, 79, 0.6),
  quinoa: I('Quinoa', 'grains', 'g', 370, 14, 64, 6),
  atta: I('Wholemeal atta (for roti)', 'grains', 'g', 340, 12, 68, 1.9, { pantry: true }),
  plain_flour: I('Plain flour', 'grains', 'g', 364, 10, 76, 1, { pantry: true }),
  besan: I('Besan (chickpea flour)', 'grains', 'g', 390, 22, 58, 6.7, { pantry: true, src: 'legume' }),
  wm_pasta: I('Wholemeal pasta', 'grains', 'g', 350, 13, 65, 2.5),
  protein_pasta: I('High-protein pasta (lentil/chickpea)', 'grains', 'g', 350, 21, 55, 3, { src: 'legume' }),
  lasagne: I('Lasagne sheets', 'grains', 'g', 350, 12, 72, 1.5),
  orzo: I('Risoni / orzo', 'grains', 'g', 355, 12.5, 72, 1.5),
  gnocchi: I('Potato gnocchi', 'grains', 'g', 150, 3.5, 32, 0.4),
  panko: I('Panko breadcrumbs', 'grains', 'g', 370, 12, 75, 3),
  cornflour: I('Cornflour', 'grains', 'g', 360, 0, 90, 0, { pantry: true }),

  // Tins, legumes & stock
  chickpeas: I('Chickpeas (400 g tin)', 'tins', 'can', 120, 7, 16, 2.3, { g: 240, src: 'legume' }),
  black_beans: I('Black beans (400 g tin)', 'tins', 'can', 115, 7.5, 14, 0.5, { g: 240, src: 'legume' }),
  kidney_beans: I('Red kidney beans (400 g tin)', 'tins', 'can', 110, 7, 14, 0.5, { g: 240, src: 'legume' }),
  cannellini: I('Cannellini beans (400 g tin)', 'tins', 'can', 100, 7, 13, 0.5, { g: 240, src: 'legume' }),
  lentils_can: I('Brown lentils (400 g tin)', 'tins', 'can', 85, 6, 11, 0.4, { g: 240, src: 'legume' }),
  refried_beans: I('Refried beans (435 g tin)', 'mexican', 'can', 90, 5, 13, 1, { g: 435, src: 'legume' }),
  diced_tomatoes: I('Diced tomatoes (400 g tin)', 'tins', 'can', 22, 1.1, 3.5, 0.2, { g: 400 }),
  passata: I('Tomato passata', 'tins', 'g', 35, 1.6, 6, 0.2),
  tomato_paste: I('Tomato paste', 'tins', 'g', 85, 4.3, 16, 0.5),
  coconut_milk: I('Light coconut milk (400 ml tin)', 'asian', 'can', 90, 1, 2.5, 8.5, { g: 400 }),
  veg_stock: I('Salt-reduced vegetable stock', 'tins', 'ml', 6, 0.3, 0.7, 0.1),
  chicken_stock: I('Salt-reduced chicken stock', 'tins', 'ml', 8, 1, 0.5, 0.2, { diet: 'meat' }),
  red_lentils: I('Masoor dal (red lentils)', 'indian', 'g', 340, 25, 50, 1, { pantry: true, src: 'legume' }),
  moong_dal: I('Moong dal (yellow)', 'indian', 'g', 345, 24, 52, 1.2, { pantry: true, src: 'legume' }),
  toor_dal: I('Toor dal', 'indian', 'g', 345, 22, 57, 1.5, { pantry: true, src: 'legume' }),
  chana_dal: I('Chana dal', 'indian', 'g', 360, 20, 55, 5, { pantry: true, src: 'legume' }),
  urad_whole: I('Whole urad (black dal)', 'indian', 'g', 340, 25, 52, 1.6, { pantry: true, src: 'legume' }),
  soya_chunks: I('Soya chunks / granules', 'indian', 'g', 345, 52, 33, 0.5, { src: 'soya' }),
  kala_chana: I('Kala chana (dry)', 'indian', 'g', 360, 19, 50, 6, { pantry: true, src: 'legume' }),
  lobia: I('Lobia / black-eyed beans (dry)', 'indian', 'g', 336, 23.5, 60, 1.3, { pantry: true, src: 'legume' }),

  // Sauces, oils & nuts
  oil: I('Olive / canola oil', 'sauces', 'ml', 820, 0, 0, 92, { pantry: true }),
  ghee: I('Ghee', 'sauces', 'g', 900, 0, 0, 100, { pantry: true }),
  sesame_oil: I('Sesame oil', 'asian', 'ml', 820, 0, 0, 92, { sameAs: ['sesame_seeds'] }),
  soy_sauce: I('Salt-reduced soy sauce', 'asian', 'ml', 55, 8, 5, 0.1, { pantry: true }),
  oyster_sauce: I('Oyster sauce', 'asian', 'g', 105, 1.5, 24, 0.3, { diet: 'meat' }),
  fish_sauce: I('Fish sauce', 'asian', 'ml', 35, 5, 4, 0, { diet: 'meat' }),
  hoisin: I('Hoisin sauce', 'asian', 'g', 220, 3, 44, 3.4),
  sriracha: I('Sriracha', 'asian', 'g', 93, 2, 19, 1),
  gochujang: I('Gochujang', 'asian', 'g', 210, 4, 45, 1.5),
  miso: I('White miso paste', 'asian', 'g', 200, 12, 25, 6),
  rice_vinegar: I('Rice vinegar', 'asian', 'ml', 18, 0, 4, 0),
  mirin: I('Mirin', 'asian', 'ml', 230, 0.3, 43, 0),
  red_curry: I('Red curry paste', 'asian', 'g', 100, 2, 10, 4.5),
  green_curry: I('Green curry paste', 'asian', 'g', 100, 2, 10, 4.5),
  massaman: I('Massaman curry paste', 'asian', 'g', 180, 3, 20, 9),
  tom_yum_paste: I('Tom yum paste', 'asian', 'g', 180, 2, 20, 10),
  laksa_paste: I('Laksa paste', 'asian', 'g', 200, 3, 10, 16),
  chilli_garlic: I('Chilli garlic sauce', 'asian', 'g', 90, 2, 13, 3),
  chilli_bean_paste: I('Chilli bean paste (doubanjiang)', 'asian', 'g', 130, 6, 15, 6),
  chilli_crisp: I('Chilli crisp oil', 'asian', 'g', 600, 5, 10, 60),
  sambal: I('Sambal oelek', 'asian', 'g', 50, 1.5, 8, 1),
  tamarind: I('Tamarind paste', 'asian', 'g', 240, 2.8, 62, 0.6),
  schezwan: I('Schezwan sauce', 'indian', 'g', 180, 2, 20, 10),
  rice_noodles: I('Rice noodles / vermicelli (dry)', 'asian', 'g', 360, 6, 82, 0.6),
  hokkien: I('Hokkien / hakka noodles (fresh)', 'asian', 'g', 165, 5.5, 33, 1.5),
  udon: I('Udon noodles (fresh)', 'asian', 'g', 130, 3.5, 27, 0.4),
  soba: I('Soba noodles (dry)', 'asian', 'g', 335, 14, 67, 1.5),
  ramen: I('Ramen noodles (dry, non-fried)', 'asian', 'g', 360, 10, 72, 1.5),
  rice_paper: I('Rice paper sheets', 'asian', 'pc', 340, 6, 80, 0.5, { g: 8 }),
  dumpling_wrappers: I('Dumpling / gyoza wrappers', 'asian', 'pc', 280, 8, 58, 1, { g: 10 }),
  nori: I('Nori sheets', 'asian', 'pc', 0, 0, 0, 0, { g: 3 }),
  salsa: I('Tomato salsa (jar)', 'mexican', 'g', 35, 1.5, 6, 0.3),
  enchilada_sauce: I('Enchilada sauce', 'mexican', 'g', 40, 1, 7, 1),
  chipotle: I('Chipotle in adobo (tin)', 'mexican', 'g', 70, 1.5, 10, 3),
  pickled_jalapenos: I('Pickled jalapeños', 'mexican', 'g', 25, 1, 4, 0.5, { sameAs: ['jalapeno'] }),
  olives: I('Kalamata olives', 'sauces', 'g', 145, 1, 4, 14),
  capers: I('Capers', 'sauces', 'g', 25, 2, 5, 0.9),
  pesto: I('Basil pesto', 'sauces', 'g', 450, 5, 6, 45),
  roasted_capsicum: I('Roasted capsicum (jar)', 'sauces', 'g', 30, 1, 6, 0.3, { sameAs: ['capsicum'] }),
  balsamic: I('Balsamic vinegar', 'sauces', 'ml', 88, 0.5, 17, 0, { pantry: true }),
  vinegar: I('White vinegar', 'sauces', 'ml', 18, 0, 0, 0, { pantry: true }),
  dijon: I('Dijon mustard', 'sauces', 'g', 130, 6, 5, 10),
  light_mayo: I('Light mayonnaise', 'sauces', 'g', 300, 1, 8, 28),
  peri_peri: I('Peri-peri sauce', 'sauces', 'g', 80, 1, 8, 5),
  peanut_butter: I('Natural peanut butter', 'sauces', 'g', 600, 25, 12, 50, { sameAs: ['peanuts'] }),
  peanuts: I('Roasted peanuts (unsalted)', 'sauces', 'g', 590, 26, 13, 49),
  cashews: I('Raw cashews', 'sauces', 'g', 580, 18, 25, 46),
  sesame_seeds: I('Sesame seeds', 'sauces', 'g', 570, 18, 10, 50, { pantry: true }),

  // Herbs & spices (pantry by default)
  cumin_seeds: SPICE('Cumin seeds (jeera)'),
  cumin: SPICE('Ground cumin'),
  coriander_powder: SPICE('Ground coriander'),
  turmeric: SPICE('Turmeric'),
  chilli_powder: SPICE('Kashmiri chilli powder'),
  garam_masala: SPICE('Garam masala'),
  mustard_seeds: SPICE('Mustard seeds'),
  fennel_seeds: SPICE('Fennel seeds (saunf)'),
  ajwain: SPICE('Ajwain'),
  hing: SPICE('Hing (asafoetida)'),
  cardamom: SPICE('Ground cardamom'),
  cinnamon: SPICE('Cinnamon'),
  kasoori_methi: SPICE('Kasoori methi'),
  tandoori_masala: SPICE('Tandoori masala'),
  chaat_masala: SPICE('Chaat masala'),
  chana_masala: SPICE('Chana masala'),
  pav_bhaji_masala: SPICE('Pav bhaji masala'),
  curry_powder: SPICE('Curry powder (mild)'),
  smoked_paprika: SPICE('Smoked paprika'),
  oregano: SPICE('Dried oregano'),
  italian_herbs: SPICE('Italian mixed herbs'),
  chilli_flakes: SPICE('Chilli flakes'),
  pepper: SPICE('Black pepper'),
  white_pepper: SPICE('White pepper'),
  five_spice: SPICE('Chinese five spice'),
  sichuan_pepper: SPICE('Sichuan pepper'),
  gochugaru: SPICE('Gochugaru (Korean chilli flakes)', { pantry: false, aisle: 'asian' }),
  bay_leaf: SPICE('Bay leaves', { unit: 'pc', g: 0.2 }),
  dried_chilli: SPICE('Dried red chillies', { unit: 'pc', g: 0.5 }),

  // ---- World-recipe import (UniTools World Recipes v2.0, CC BY-SA 4.0) ----
  // Nutrition per 100 g/ml from USDA FoodData Central SR Legacy (public domain), fdcId per entry;
  // 'proxy' = SR has no exact food and the quoted reference is a documented stand-in (see ATTRIBUTION.md).
  aji_amarillo: I('Ají amarillo paste', 'sauces', 'g', 40.0, 1.9, 8.8, 0.4), // USDA SR Legacy fdcId 170106 'Peppers, hot chili, red, raw' (proxy)
  allspice: I('Allspice', 'spices', 'tsp', 263, 6.1, 72.1, 8.7, { g: 2, pantry: true }), // USDA SR Legacy fdcId 171315 'Spices, allspice, ground'
  almonds: I('Almonds', 'sauces', 'g', 579, 21.2, 21.6, 49.9), // USDA SR Legacy fdcId 170567 'Nuts, almonds'
  amba: I('Amba (mango pickle sauce)', 'sauces', 'g', 319, 2.5, 78.6, 1.2), // USDA SR Legacy fdcId 169091 'Mango, dried, sweetened' (proxy)
  anatto: I('Annatto / achiote seeds', 'spices', 'tsp', 282, 14.1, 54.0, 12.9, { g: 2 }), // USDA SR Legacy fdcId 171329 'Spices, paprika' (proxy)
  apple: I('Apples', 'fv', 'pc', 52, 0.3, 13.8, 0.2, { g: 180 }), // USDA SR Legacy fdcId 171688 'Apples, raw, with skin'
  apple_juice: I('Apple juice', 'fv', 'ml', 46, 0.1, 11.3, 0.1), // USDA SR Legacy fdcId 167771 'Apple juice, canned or bottled, unsweetened, with added ascorbic acid'
  arepa: I('Arepas', 'bakery', 'pc', 398, 11.0, 77.1, 5.0, { g: 80 }), // USDA SR Legacy fdcId 168038 'Cornmeal, white (Navajo)' (proxy)
  attieke: I('Attiéké (cassava couscous)', 'grains', 'g', 376, 12.8, 77.4, 0.6), // USDA SR Legacy fdcId 169699 'Couscous, dry' (proxy)
  attieke_cooked: I('Attiéké or rice (side)', 'grains', 'g', 365, 7.1, 80.0, 0.7), // USDA SR Legacy fdcId 168877 'Rice, white, long-grain, regular, raw, enriched' (proxy)
  bacon: I('Bacon', 'meat', 'g', 393, 13.7, 0, 37.1, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 168277 'Pork, cured, bacon, unprepared'
  baguette: I('Baguette', 'bakery', 'g', 272, 10.8, 51.9, 2.4), // USDA SR Legacy fdcId 172675 'Bread, french or vienna (includes sourdough)'
  baharat: I('Baharat spice mix', 'spices', 'tsp', 263, 6.1, 72.1, 8.7, { g: 2, pantry: true }), // USDA SR Legacy fdcId 171315 'Spices, allspice, ground' (proxy)
  baking_powder: I('Baking powder', 'grains', 'tsp', 97.0, 0.1, 46.9, 0.4, { g: 4, pantry: true }), // USDA SR Legacy fdcId 172805 'Leavening agents, baking powder, low-sodium'
  baking_soda: I('Bicarbonate of soda', 'grains', 'tsp', 0, 0, 0, 0, { g: 4, pantry: true }), // USDA SR Legacy fdcId 175040 'Leavening agents, baking soda'
  banana_blossom: I('Banana blossom', 'asian', 'g', 115, 2.7, 25.6, 0.2), // USDA SR Legacy fdcId 167714 'Hearts of palm, raw' (proxy)
  barberries: I('Barberries', 'spices', 'tsp', 240, 2.2, 63.9, 0.4, { g: 3 }), // USDA SR Legacy fdcId 168162 'Plums, dried (prunes), uncooked' (proxy)
  beef_bones: I('Beef / marrow bones', 'meat', 'g', 139, 22.0, 0, 5.0, { diet: 'meat' }), // USDA SR Legacy fdcId 174056 'Beef, chuck, arm pot roast, separable lean only, trimmed to 1/8" fat, choice, raw' (proxy)
  beef_brisket: I('Beef brisket', 'meat', 'g', 198, 14.7, 0.1, 14.9, { diet: 'meat', src: 'beef' }), // USDA SR Legacy fdcId 170199 'Beef, cured, corned beef, brisket, raw'
  beef_chunks: I('Beef chuck / stewing beef', 'meat', 'g', 139, 22.0, 0, 5.0, { diet: 'meat', src: 'beef' }), // USDA SR Legacy fdcId 174056 'Beef, chuck, arm pot roast, separable lean only, trimmed to 1/8" fat, choice, raw'
  beef_mince: I('Beef mince', 'meat', 'g', 215, 18.6, 0, 15.0, { diet: 'meat', src: 'beef' }), // USDA SR Legacy fdcId 171796 'Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program)'
  beef_shin: I('Beef shin', 'meat', 'g', 128, 21.8, 0, 3.9, { diet: 'meat', src: 'beef' }), // USDA SR Legacy fdcId 169441 'Beef, shank crosscuts, separable lean only, trimmed to 1/4" fat, choice, raw' (proxy)
  beef_short_ribs: I('Beef short ribs', 'meat', 'g', 175, 19.0, 0.4, 10.2, { diet: 'meat', src: 'beef' }), // USDA SR Legacy fdcId 168614 'Beef, rib, shortribs, separable lean only, choice, raw'
  beef_steak: I('Beef steak (sirloin/rump)', 'meat', 'g', 127, 22.3, 0, 3.5, { diet: 'meat', src: 'beef' }), // USDA SR Legacy fdcId 171804 'Beef, top sirloin, steak, separable lean only, trimmed to 1/8" fat, select, raw'
  beer: I('Beer / lager', 'sauces', 'ml', 43.0, 0.5, 3.5, 0), // USDA SR Legacy fdcId 168746 'Alcoholic beverage, beer, regular, all'
  beetroot: I('Beetroot', 'fv', 'g', 43.0, 1.6, 9.6, 0.2), // USDA SR Legacy fdcId 169145 'Beets, raw'
  berbere: I('Berbere spice mix', 'spices', 'tsp', 318, 12.0, 56.6, 17.3, { g: 2, pantry: true }), // USDA SR Legacy fdcId 170932 'Spices, pepper, red or cayenne' (proxy)
  black_cardamom: I('Black cardamom', 'spices', 'pc', 311, 10.8, 68.5, 6.7, { g: 1, sameAs: ['cardamom'] }), // USDA SR Legacy fdcId 170919 'Spices, cardamom' (proxy)
  blood: I('Blood (pig/cow)', 'meat', 'ml', 379, 14.6, 1.3, 34.5, { diet: 'meat', src: 'meat' }), // USDA SR Legacy fdcId 171618 'Blood sausage' (proxy)
  bonito_flakes: I('Bonito flakes (katsuobushi)', 'asian', 'g', 116, 25.5, 0, 0.8, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 171986 'Fish, tuna, light, canned in water, without salt, drained solids' (proxy)
  brandy: I('Brandy / kirsch', 'sauces', 'ml', 231, 0, 0, 0), // USDA SR Legacy fdcId 174817 'Alcoholic beverage, distilled, rum, 80 proof'
  breadcrumbs: I('Breadcrumbs', 'grains', 'g', 395, 13.4, 72.0, 5.3), // USDA SR Legacy fdcId 174928 'Bread, crumbs, dry, grated, plain'
  brined_cheese: I('Brined white cheese (feta-style)', 'dairy', 'g', 265, 14.2, 3.9, 21.5, { src: 'cheese', sameAs: ['feta'] }), // USDA SR Legacy fdcId 173420 'Cheese, feta' (proxy)
  broad_beans: I('Broad beans (fava)', 'fv', 'g', 72.0, 5.6, 11.7, 0.6), // USDA SR Legacy fdcId 170377 'Broadbeans, immature seeds, raw'
  brown_sugar: I('Brown / palm sugar', 'spices', 'tsp', 380, 0.1, 98.1, 0, { g: 4, pantry: true }), // USDA SR Legacy fdcId 168833 'Sugars, brown'
  bulgur: I('Bulgur wheat', 'grains', 'g', 342, 12.3, 75.9, 1.3), // USDA SR Legacy fdcId 170688 'Bulgur, dry'
  buttermilk: I('Buttermilk', 'dairy', 'ml', 62.0, 3.2, 4.9, 3.3), // USDA SR Legacy fdcId 172225 'Milk, buttermilk, fluid, whole'
  caraway: I('Caraway seeds', 'spices', 'tsp', 333, 19.8, 49.9, 14.6, { g: 2, pantry: true }), // USDA SR Legacy fdcId 170918 'Spices, caraway seed'
  cardamom_pods: I('Cardamom pods', 'spices', 'pc', 311, 10.8, 68.5, 6.7, { g: 0.5, sameAs: ['cardamom'] }), // USDA SR Legacy fdcId 170919 'Spices, cardamom'
  carp: I('Carp', 'meat', 'g', 127, 17.8, 0, 5.6, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 171952 'Fish, carp, raw'
  cassava: I('Cassava', 'fv', 'g', 160, 1.4, 38.1, 0.3), // USDA SR Legacy fdcId 169985 'Cassava, raw'
  catfish: I('Catfish', 'meat', 'g', 95.0, 16.4, 0, 2.8, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 174186 'Fish, catfish, channel, wild, raw'
  cayenne: I('Cayenne pepper', 'spices', 'tsp', 318, 12.0, 56.6, 17.3, { g: 2, pantry: true }), // USDA SR Legacy fdcId 170932 'Spices, pepper, red or cayenne'
  celeriac: I('Celeriac', 'fv', 'g', 42.0, 1.5, 9.2, 0.3), // USDA SR Legacy fdcId 170400 'Celeriac, raw'
  celery_leaves: I('Celery leaves', 'fv', 'g', 14.0, 0.7, 3.0, 0.2, { sameAs: ['celery'] }), // USDA SR Legacy fdcId 169988 'Celery, raw'
  chayote: I('Chayote', 'fv', 'g', 19.0, 0.8, 4.5, 0.1), // USDA SR Legacy fdcId 170402 'Chayote, fruit, raw'
  chestnuts: I('Chestnuts', 'fv', 'g', 224, 4.2, 49.1, 1.1), // USDA SR Legacy fdcId 170164 'Nuts, chestnuts, chinese, raw'
  chicken_carcass: I('Chicken carcasses', 'meat', 'g', 215, 18.6, 0, 15.1, { diet: 'meat', src: 'chicken' }), // USDA SR Legacy fdcId 171447 'Chicken, broilers or fryers, meat and skin, raw' (proxy)
  chicken_drumsticks: I('Chicken drumsticks', 'meat', 'pc', 161, 18.1, 0.1, 9.2, { g: 120, diet: 'meat', src: 'chicken' }), // USDA SR Legacy fdcId 172373 'Chicken, broilers or fryers, drumstick, meat and skin, raw'
  chicken_pieces: I('Chicken pieces (bone-in)', 'meat', 'g', 215, 18.6, 0, 15.1, { diet: 'meat', src: 'chicken' }), // USDA SR Legacy fdcId 171447 'Chicken, broilers or fryers, meat and skin, raw'
  chinese_cabbage: I('Chinese cabbage (napa)', 'fv', 'g', 16.0, 1.2, 3.2, 0.2), // USDA SR Legacy fdcId 169979 'Cabbage, chinese (pe-tsai), raw'
  chives: I('Chives', 'fv', 'g', 30.0, 3.3, 4.3, 0.7), // USDA SR Legacy fdcId 169994 'Chives, raw'
  chorizo: I('Chorizo', 'meat', 'g', 296, 13.6, 3.8, 25.1, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 173859 'Sausage, pork, chorizo, link or ground, raw'
  chutney: I('Apricot / fruit chutney', 'sauces', 'g', 319, 2.5, 78.6, 1.2), // USDA SR Legacy fdcId 169091 'Mango, dried, sweetened' (proxy)
  cinnamon_stick: I('Cinnamon sticks', 'spices', 'pc', 247, 4.0, 80.6, 1.2, { g: 3, sameAs: ['cinnamon'] }), // USDA SR Legacy fdcId 171320 'Spices, cinnamon, ground'
  clams: I('Clams / cockles', 'meat', 'g', 86.0, 14.7, 3.6, 1.0, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 174214 'Mollusks, clam, mixed species, raw'
  clarified_butter: I('Clarified butter', 'sauces', 'g', 717, 0.8, 0.1, 81.1, { sameAs: ['butter'] }), // USDA SR Legacy fdcId 173410 'Butter, salted' (proxy)
  cloves: I('Cloves', 'spices', 'tsp', 274, 6.0, 65.5, 13.0, { g: 2, pantry: true }), // USDA SR Legacy fdcId 171321 'Spices, cloves, ground'
  coconut_cream: I('Coconut cream', 'asian', 'ml', 197, 2.0, 2.8, 21.3), // USDA SR Legacy fdcId 170173 'Nuts, coconut milk, canned (liquid expressed from grated meat and water)'
  collard_greens: I('Collard greens', 'fv', 'g', 32.0, 3.0, 5.4, 0.6), // USDA SR Legacy fdcId 170406 'Collards, raw'
  corn_kernels: I('Corn kernels / corn on the cob', 'fv', 'g', 86.0, 3.3, 18.7, 1.4, { sameAs: ['corn'] }), // USDA SR Legacy fdcId 169998 'Corn, sweet, yellow, raw'
  couscous: I('Couscous', 'grains', 'g', 376, 12.8, 77.4, 0.6), // USDA SR Legacy fdcId 169699 'Couscous, dry'
  crab: I('Crab meat', 'meat', 'g', 87.0, 18.1, 0.0, 1.1, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 174204 'Crustaceans, crab, blue, raw'
  crayfish_ground: I('Ground dried crayfish', 'sauces', 'g', 99.0, 24.0, 0.2, 0.3, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 175180 'Crustaceans, shrimp, cooked' (proxy)
  cream: I('Cream', 'dairy', 'ml', 340, 2.8, 2.8, 36.1), // USDA SR Legacy fdcId 170859 'Cream, fluid, heavy whipping'
  curd_cheese: I('Curd cheese / fresh farmer cheese', 'dairy', 'g', 97.0, 10.7, 4.6, 3.9, { src: 'cheese' }), // USDA SR Legacy fdcId 172180 'Cheese, cottage, creamed, with fruit' (proxy)
  cuttlefish_ink: I('Cuttlefish ink', 'sauces', 'g', 92.0, 15.6, 3.1, 1.4, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 174223 'Mollusks, squid, mixed species, raw' (proxy)
  daikon: I('Daikon radish', 'fv', 'g', 18.0, 0.6, 4.1, 0.1), // USDA SR Legacy fdcId 168451 'Radishes, oriental, raw'
  dark_chocolate: I('Dark chocolate', 'sauces', 'g', 598, 7.8, 45.9, 42.6), // USDA SR Legacy fdcId 170273 'Chocolate, dark, 70-85% cacao solids'
  dark_soy: I('Dark soy sauce', 'asian', 'ml', 60.0, 10.5, 5.6, 0.1), // USDA SR Legacy fdcId 174278 'Soy sauce made from soy (tamari)' (proxy)
  dashi: I('Dashi stock', 'asian', 'ml', 16.0, 2.0, 0.4, 0.6, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 171606 'Fish broth' (proxy)
  dates: I('Dates', 'fv', 'g', 282, 2.5, 75.0, 0.4), // USDA SR Legacy fdcId 171726 'Dates, deglet noor'
  desiccated_coconut: I('Toasted / desiccated coconut', 'asian', 'g', 684, 5.3, 21.5, 69.1), // USDA SR Legacy fdcId 168585 'Nuts, coconut meat, dried (desiccated), creamed'
  dried_apricots: I('Dried apricots', 'fv', 'g', 241, 3.4, 62.6, 0.5), // USDA SR Legacy fdcId 173941 'Apricots, dried, sulfured, uncooked'
  dried_chillies: I('Dried chillies (ancho/guajillo/pasilla)', 'spices', 'pc', 281, 11.9, 51.4, 8.2, { g: 5, sameAs: ['dried_chilli'] }), // USDA SR Legacy fdcId 169396 'Peppers, ancho, dried'
  dried_lime: I('Dried lime (loomi)', 'spices', 'pc', 30.0, 0.7, 10.5, 0.2, { g: 5, pantry: true }), // USDA SR Legacy fdcId 168155 'Limes, raw' (proxy)
  dried_shrimp: I('Dried shrimp', 'asian', 'g', 99.0, 24.0, 0.2, 0.3, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 175180 'Crustaceans, shrimp, cooked' (proxy)
  duck: I('Duck', 'meat', 'g', 135, 18.3, 0.9, 6.0, { diet: 'meat', src: 'duck' }), // USDA SR Legacy fdcId 172410 'Duck, domesticated, meat only, raw'
  egg_noodles: I('Egg noodles', 'grains', 'g', 384, 14.2, 71.3, 4.4), // USDA SR Legacy fdcId 169731 'Noodles, egg, dry, enriched'
  egg_yolk: I('Egg yolks', 'dairy', 'pc', 322, 15.9, 3.6, 26.5, { g: 17, diet: 'egg', src: 'egg', sameAs: ['egg'] }), // USDA SR Legacy fdcId 172184 'Egg, yolk, raw, fresh'
  egusi: I('Ground egusi seeds', 'sauces', 'g', 559, 30.2, 10.7, 49.0), // USDA SR Legacy fdcId 170556 'Seeds, pumpkin and squash seed kernels, dried' (proxy)
  fennel_bulb: I('Fennel bulb', 'fv', 'g', 31.0, 1.2, 7.3, 0.2), // USDA SR Legacy fdcId 169385 'Fennel, bulb, raw'
  fenugreek_ground: I('Ground fenugreek', 'spices', 'tsp', 323, 23.0, 58.4, 6.4, { g: 2, pantry: true }), // USDA SR Legacy fdcId 171324 'Spices, fenugreek seed'
  fenugreek_seeds: I('Fenugreek seeds', 'spices', 'tsp', 323, 23.0, 58.4, 6.4, { g: 3, pantry: true }), // USDA SR Legacy fdcId 171324 'Spices, fenugreek seed'
  fermented_black_beans: I('Fermented black beans (douchi)', 'asian', 'g', 198, 12.8, 25.4, 6.0), // USDA SR Legacy fdcId 172442 'Miso' (proxy)
  filo: I('Filo pastry', 'bakery', 'g', 299, 7.1, 52.6, 6.0), // USDA SR Legacy fdcId 172791 'Phyllo dough'
  flatbread: I('Flatbread', 'bakery', 'pc', 291, 9.6, 50.4, 5.7, { g: 70 }), // USDA SR Legacy fdcId 171845 'Bread, naan, plain, commercially prepared, refrigerated' (proxy)
  freekeh: I('Freekeh', 'grains', 'g', 342, 12.3, 75.9, 1.3), // USDA SR Legacy fdcId 170688 'Bulgur, dry' (proxy)
  galangal: I('Galangal', 'fv', 'g', 80.0, 1.8, 17.8, 0.8), // USDA SR Legacy fdcId 169231 'Ginger root, raw' (proxy)
  gari: I('Gari (cassava meal)', 'grains', 'g', 160, 1.4, 38.1, 0.3), // USDA SR Legacy fdcId 169985 'Cassava, raw' (proxy)
  ginger_garlic_paste: I('Ginger garlic paste', 'indian', 'g', 80.0, 1.8, 17.8, 0.8), // USDA SR Legacy fdcId 169231 'Ginger root, raw' (proxy)
  gingerbread: I('Gingerbread', 'bakery', 'g', 437, 4.4, 74.6, 13.8), // USDA SR Legacy fdcId 172701 'Cake, gingerbread, dry mix'
  ginseng: I('Ginseng root', 'fv', 'g', 80.0, 1.8, 17.8, 0.8), // USDA SR Legacy fdcId 169231 'Ginger root, raw' (proxy)
  glass_noodles: I('Glass noodles (mung bean)', 'asian', 'g', 351, 0.2, 86.1, 0.1), // USDA SR Legacy fdcId 174258 'Noodles, chinese, cellophane or long rice (mung beans), dehydrated'
  goat: I('Goat meat', 'meat', 'g', 109, 20.6, 0, 2.3, { diet: 'meat', src: 'goat' }), // USDA SR Legacy fdcId 175303 'Game meat, goat, raw' (proxy)
  grapefruit: I('Grapefruit', 'fv', 'pc', 32.0, 0.6, 8.2, 0.1, { g: 250 }), // USDA SR Legacy fdcId 173034 'Grapefruit, raw, white, Florida'
  green_capsicum: I('Green capsicum', 'fv', 'pc', 20.0, 0.9, 4.6, 0.2, { g: 180, sameAs: ['capsicum'] }), // USDA SR Legacy fdcId 170427 'Peppers, sweet, green, raw'
  green_lentils: I('Green / brown lentils (dry)', 'tins', 'g', 352, 24.6, 63.4, 1.1, { src: 'legume', pantry: true }), // USDA SR Legacy fdcId 172420 'Lentils, raw'
  green_papaya: I('Green papaya', 'fv', 'g', 43.0, 0.5, 10.8, 0.3), // USDA SR Legacy fdcId 169926 'Papayas, raw' (proxy)
  gruyere: I('Gruyère', 'dairy', 'g', 413, 29.8, 0.4, 32.3, { src: 'cheese' }), // USDA SR Legacy fdcId 171242 'Cheese, gruyere'
  guanciale: I('Guanciale', 'meat', 'g', 393, 13.7, 0, 37.1, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 168277 'Pork, cured, bacon, unprepared' (proxy)
  ham: I('Ham', 'meat', 'g', 172, 22.3, 0.3, 8.3, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 168110 'Pork, cured, ham, low sodium, lean and fat, cooked'
  ham_bone: I('Ham bone', 'meat', 'g', 172, 22.3, 0.3, 8.3, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 168110 'Pork, cured, ham, low sodium, lean and fat, cooked' (proxy)
  harissa: I('Harissa', 'sauces', 'g', 93.0, 1.9, 19.2, 0.9), // USDA SR Legacy fdcId 171186 'Sauce, hot chile, sriracha' (proxy)
  hawaij: I('Hawaij spice mix', 'spices', 'tsp', 375, 17.8, 44.2, 22.3, { g: 2, pantry: true }), // USDA SR Legacy fdcId 170923 'Spices, cumin seed' (proxy)
  holy_basil: I('Holy basil', 'asian', 'bunch', 23.0, 3.1, 2.6, 0.6, { g: 40, sameAs: ['thai_basil'] }), // USDA SR Legacy fdcId 172232 'Basil, fresh' (proxy)
  hominy: I('Hominy', 'tins', 'g', 72.0, 1.5, 14.3, 0.9), // USDA SR Legacy fdcId 169701 'Hominy, canned, white'
  honey: I('Honey', 'spices', 'tsp', 304, 0.3, 82.4, 0, { g: 7, pantry: true }), // USDA SR Legacy fdcId 169640 'Honey'
  horseradish: I('Horseradish', 'sauces', 'g', 48.0, 1.2, 11.3, 0.7), // USDA SR Legacy fdcId 173472 'Horseradish, prepared'
  injera: I('Injera', 'bakery', 'pc', 275, 9.1, 55.7, 1.2, { g: 120 }), // USDA SR Legacy fdcId 174915 'Bread, pita, white, enriched' (proxy)
  jameed: I('Jameed (dried yogurt)', 'dairy', 'g', 61.0, 3.5, 4.7, 3.2), // USDA SR Legacy fdcId 171284 'Yogurt, plain, whole milk' (proxy)
  juniper: I('Juniper berries', 'spices', 'tsp', 251, 10.4, 64.0, 3.3, { g: 2, pantry: true }), // USDA SR Legacy fdcId 170931 'Spices, pepper, black' (proxy)
  kajmak: I('Kajmak', 'dairy', 'g', 350, 6.2, 5.5, 34.4), // USDA SR Legacy fdcId 173418 'Cheese, cream' (proxy)
  kale: I('Kale', 'fv', 'g', 35.0, 2.9, 4.4, 1.5), // USDA SR Legacy fdcId 168421 'Kale, raw'
  kecap_manis: I('Kecap manis', 'asian', 'g', 60.0, 10.5, 5.6, 0.1), // USDA SR Legacy fdcId 174278 'Soy sauce made from soy (tamari)' (proxy)
  kefir: I('Kefir', 'dairy', 'ml', 43.0, 3.8, 4.8, 1.0), // USDA SR Legacy fdcId 170904 'Kefir, lowfat, plain, LIFEWAY'
  ketchup: I('Tomato ketchup', 'sauces', 'g', 101, 1.0, 27.4, 0.1), // USDA SR Legacy fdcId 168556 'Catsup'
  khmeli_suneli: I('Khmeli suneli', 'spices', 'tsp', 298, 12.4, 55.0, 17.8, { g: 2, pantry: true }), // USDA SR Legacy fdcId 170922 'Spices, coriander seed' (proxy)
  kidneys: I('Kidneys', 'meat', 'g', 99.0, 17.4, 0.3, 3.1, { diet: 'meat', src: 'meat' }), // USDA SR Legacy fdcId 169449 'Beef, variety meats and by-products, kidneys, raw' (proxy)
  kombu: I('Kombu', 'asian', 'pc', 43.0, 1.7, 9.6, 0.6, { g: 5 }), // USDA SR Legacy fdcId 168457 'Seaweed, kelp, raw'
  lamb: I('Lamb (boneless)', 'meat', 'g', 133, 20.4, 0, 5.1, { diet: 'meat', src: 'lamb' }), // USDA SR Legacy fdcId 172580 'Lamb, Australian, imported, fresh, leg, shank half, separable lean only, trimmed to 1/8" fat, raw'
  lamb_mince: I('Lamb mince', 'meat', 'g', 282, 16.6, 0, 23.4, { diet: 'meat', src: 'lamb' }), // USDA SR Legacy fdcId 174370 'Lamb, ground, raw'
  lamb_shoulder: I('Lamb shoulder / neck', 'meat', 'g', 132, 20.0, 0, 5.2, { diet: 'meat', src: 'lamb' }), // USDA SR Legacy fdcId 174330 'Lamb, shoulder, arm, separable lean only, trimmed to 1/4" fat, choice, raw'
  lard: I('Lard', 'sauces', 'g', 902, 0, 0, 100, { pantry: true }), // USDA SR Legacy fdcId 171401 'Lard'
  lavash: I('Lavash / thin flatbread', 'bakery', 'pc', 275, 9.1, 55.7, 1.2, { g: 60 }), // USDA SR Legacy fdcId 174915 'Bread, pita, white, enriched' (proxy)
  leek: I('Leeks', 'fv', 'g', 61.0, 1.5, 14.2, 0.3), // USDA SR Legacy fdcId 169246 'Leeks, (bulb and lower leaf-portion), raw'
  lemon_zest: I('Lemon zest', 'fv', 'pc', 29.0, 1.1, 9.3, 0.3, { g: 2, sameAs: ['lemon'] }), // USDA SR Legacy fdcId 167746 'Lemons, raw, without peel'
  lime_juice: I('Lime juice', 'fv', 'ml', 25.0, 0.4, 8.4, 0.1, { sameAs: ['lime'] }), // USDA SR Legacy fdcId 168156 'Lime juice, raw'
  lingonberry: I('Lingonberry jam', 'sauces', 'g', 278, 0.4, 68.9, 0.1), // USDA SR Legacy fdcId 169641 'Jams and preserves'
  liver: I('Liver', 'meat', 'g', 135, 20.4, 3.9, 3.6, { diet: 'meat', src: 'meat' }), // USDA SR Legacy fdcId 169451 'Beef, variety meats and by-products, liver, raw' (proxy)
  locust_beans: I('Fermented locust beans (iru)', 'sauces', 'g', 198, 12.8, 25.4, 6.0), // USDA SR Legacy fdcId 172442 'Miso' (proxy)
  long_grain_rice: I('Long-grain rice', 'grains', 'g', 365, 7.1, 80.0, 0.7, { pantry: true }), // USDA SR Legacy fdcId 168877 'Rice, white, long-grain, regular, raw, enriched'
  lovage: I('Lovage', 'spices', 'sprig', 14.0, 0.7, 3.0, 0.2, { g: 2 }), // USDA SR Legacy fdcId 169988 'Celery, raw' (proxy)
  lupini: I('Lupini beans', 'tins', 'g', 371, 36.2, 40.4, 9.7, { src: 'legume' }), // USDA SR Legacy fdcId 172423 'Lupins, mature seeds, raw' (proxy)
  maize_meal: I('Maize meal', 'grains', 'g', 398, 11.0, 77.1, 5.0), // USDA SR Legacy fdcId 168038 'Cornmeal, white (Navajo)' (proxy)
  mantou: I('Mantou buns', 'bakery', 'pc', 291, 9.6, 50.4, 5.7, { g: 50 }), // USDA SR Legacy fdcId 171845 'Bread, naan, plain, commercially prepared, refrigerated' (proxy)
  marjoram: I('Marjoram', 'spices', 'tsp', 271, 12.7, 60.6, 7.0, { g: 2 }), // USDA SR Legacy fdcId 170928 'Spices, marjoram, dried'
  masa: I('Masa harina', 'grains', 'g', 363, 8.5, 76.6, 3.7), // USDA SR Legacy fdcId 169694 'Corn flour, masa, enriched, white'
  masarepa: I('Masarepa (precooked corn flour)', 'grains', 'g', 363, 8.5, 76.6, 3.7), // USDA SR Legacy fdcId 169694 'Corn flour, masa, enriched, white' (proxy)
  mayonnaise: I('Mayonnaise', 'sauces', 'g', 322, 6.0, 3.1, 31.8), // USDA SR Legacy fdcId 167695 'Mayonnaise, made with tofu' (proxy)
  merguez: I('Merguez sausages', 'meat', 'g', 290, 13.9, 3.0, 24.3, { diet: 'meat', src: 'lamb' }), // USDA SR Legacy fdcId 171631 'Sausage, Italian, pork, mild, raw' (proxy)
  milk: I('Milk, full-cream', 'dairy', 'ml', 61.0, 3.1, 4.8, 3.2), // USDA SR Legacy fdcId 171265 'Milk, whole, 3.25% milkfat, with added vitamin D'
  mitmita: I('Mitmita spice', 'spices', 'tsp', 318, 12.0, 56.6, 17.3, { g: 2, pantry: true }), // USDA SR Legacy fdcId 170932 'Spices, pepper, red or cayenne' (proxy)
  molasses: I('Molasses / dark syrup', 'spices', 'tsp', 290, 0, 74.7, 0.1, { g: 7, pantry: true }), // USDA SR Legacy fdcId 168820 'Molasses'
  molokhia: I('Molokhia leaves', 'fv', 'g', 23.0, 2.9, 3.6, 0.4), // USDA SR Legacy fdcId 168462 'Spinach, raw' (proxy)
  mussels: I('Mussels', 'meat', 'g', 86.0, 11.9, 3.7, 2.2, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 174216 'Mollusks, mussel, blue, raw'
  mustard: I('Mustard', 'sauces', 'tsp', 60.0, 3.7, 5.8, 3.3, { g: 5 }), // USDA SR Legacy fdcId 172234 'Mustard, prepared, yellow'
  mustard_greens: I('Mustard greens', 'fv', 'g', 27.0, 2.9, 4.7, 0.4), // USDA SR Legacy fdcId 169256 'Mustard greens, raw'
  mustard_oil: I('Mustard oil', 'sauces', 'ml', 884, 0, 0, 100), // USDA SR Legacy fdcId 172337 'Oil, mustard'
  mustard_powder: I('Mustard powder', 'spices', 'tsp', 60.0, 3.7, 5.8, 3.3, { g: 3 }), // USDA SR Legacy fdcId 172234 'Mustard, prepared, yellow'
  mutton: I('Mutton', 'meat', 'g', 133, 20.4, 0, 5.1, { diet: 'meat', src: 'lamb' }), // USDA SR Legacy fdcId 172580 'Lamb, Australian, imported, fresh, leg, shank half, separable lean only, trimmed to 1/8" fat, raw' (proxy)
  naan: I('Naan', 'bakery', 'pc', 291, 9.6, 50.4, 5.7, { g: 90 }), // USDA SR Legacy fdcId 171845 'Bread, naan, plain, commercially prepared, refrigerated'
  nigella: I('Nigella seeds', 'spices', 'tsp', 375, 17.8, 44.2, 22.3, { g: 2, pantry: true }), // USDA SR Legacy fdcId 170923 'Spices, cumin seed' (proxy)
  nutmeg: I('Nutmeg', 'spices', 'tsp', 525, 5.8, 49.3, 36.3, { g: 2, pantry: true }), // USDA SR Legacy fdcId 171326 'Spices, nutmeg, ground'
  orange: I('Oranges', 'fv', 'pc', 46.0, 0.7, 11.5, 0.2, { g: 150 }), // USDA SR Legacy fdcId 169918 'Oranges, raw, Florida'
  orange_juice: I('Orange juice', 'fv', 'ml', 45.0, 0.7, 10.4, 0.2), // USDA SR Legacy fdcId 169098 'Orange juice, raw (Includes foods for USDA's Food Distribution Program)'
  orange_zest: I('Orange zest', 'fv', 'pc', 46.0, 0.7, 11.5, 0.2, { g: 2 }), // USDA SR Legacy fdcId 169918 'Oranges, raw, Florida'
  oxtail: I('Oxtail', 'meat', 'g', 128, 21.8, 0, 3.9, { diet: 'meat', src: 'beef' }), // USDA SR Legacy fdcId 169441 'Beef, shank crosscuts, separable lean only, trimmed to 1/4" fat, choice, raw' (proxy)
  palm_oil: I('Red palm oil', 'sauces', 'ml', 884, 0, 0, 100), // USDA SR Legacy fdcId 171015 'Oil, palm'
  palm_pulp: I('Palm fruit pulp', 'sauces', 'g', 354, 3.3, 15.2, 33.5), // USDA SR Legacy fdcId 170169 'Nuts, coconut meat, raw' (proxy)
  pancetta: I('Pancetta', 'meat', 'g', 393, 13.7, 0, 37.1, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 168277 'Pork, cured, bacon, unprepared' (proxy)
  pandan: I('Pandan leaves', 'asian', 'pc', 279, 21.9, 52.1, 4.8, { g: 2 }), // USDA SR Legacy fdcId 170921 'Spices, coriander leaf, dried' (proxy)
  paprika: I('Paprika', 'spices', 'tsp', 282, 14.1, 54.0, 12.9, { g: 2, pantry: true }), // USDA SR Legacy fdcId 171329 'Spices, paprika'
  parsley_root: I('Parsley root', 'fv', 'g', 75.0, 1.2, 18.0, 0.3), // USDA SR Legacy fdcId 170417 'Parsnips, raw' (proxy)
  parsnip: I('Parsnips', 'fv', 'g', 75.0, 1.2, 18.0, 0.3), // USDA SR Legacy fdcId 170417 'Parsnips, raw'
  pearl_barley: I('Pearl barley', 'grains', 'g', 352, 9.9, 77.7, 1.2), // USDA SR Legacy fdcId 170284 'Barley, pearled, raw'
  pecorino: I('Pecorino romano', 'dairy', 'g', 387, 31.8, 3.6, 26.9, { src: 'cheese' }), // USDA SR Legacy fdcId 171249 'Cheese, romano'
  pepper_paste: I('Red pepper paste (biber salçası)', 'sauces', 'g', 26.0, 1.0, 6.0, 0.3), // USDA SR Legacy fdcId 170108 'Peppers, sweet, red, raw' (proxy)
  peppercorns: I('Black peppercorns', 'spices', 'tsp', 251, 10.4, 64.0, 3.3, { g: 2, sameAs: ['pepper'] }), // USDA SR Legacy fdcId 170931 'Spices, pepper, black'
  pickled_cucumber: I('Pickled cucumbers / gherkins', 'sauces', 'g', 12.0, 0.5, 2.4, 0.3), // USDA SR Legacy fdcId 168558 'Pickles, cucumber, dill or kosher dill'
  pickled_greens: I('Pickled mustard greens', 'asian', 'g', 11.0, 0.3, 2.3, 0.2), // USDA SR Legacy fdcId 169379 'Pickles, cucumber, sour' (proxy)
  pide: I('Pide flatbread', 'bakery', 'pc', 275, 9.1, 55.7, 1.2, { g: 80, sameAs: ['flatbread'] }), // USDA SR Legacy fdcId 174915 'Bread, pita, white, enriched' (proxy)
  pine_nuts: I('Pine nuts', 'sauces', 'g', 673, 13.7, 13.1, 68.4), // USDA SR Legacy fdcId 170591 'Nuts, pine nuts, dried'
  pistachios: I('Pistachios', 'sauces', 'g', 560, 20.2, 27.2, 45.3), // USDA SR Legacy fdcId 170184 'Nuts, pistachio nuts, raw'
  pita: I('Pita bread', 'bakery', 'pc', 275, 9.1, 55.7, 1.2, { g: 60, sameAs: ['lebanese_bread'] }), // USDA SR Legacy fdcId 174915 'Bread, pita, white, enriched'
  plantain: I('Plantains', 'fv', 'pc', 152, 1.2, 36.7, 0.1, { g: 250 }), // USDA SR Legacy fdcId 168215 'Plantains, green, raw'
  plantain_chips: I('Plantain crisps', 'sauces', 'g', 531, 2.3, 63.8, 29.6), // USDA SR Legacy fdcId 173142 'Snacks, plantain chips, salted'
  polenta: I('Polenta / cornmeal', 'grains', 'g', 384, 9.8, 72.9, 5.9), // USDA SR Legacy fdcId 168039 'Cornmeal, yellow (Navajo)'
  pomegranate_molasses: I('Pomegranate molasses', 'sauces', 'g', 54.0, 0.1, 13.1, 0.3), // USDA SR Legacy fdcId 167787 'Pomegranate juice, bottled' (proxy)
  pomegranate_seeds: I('Pomegranate seeds', 'fv', 'g', 83.0, 1.7, 18.7, 1.2), // USDA SR Legacy fdcId 169134 'Pomegranates, raw'
  popcorn_garnish: I('Popcorn (garnish)', 'grains', 'g', 387, 12.9, 77.8, 4.5), // USDA SR Legacy fdcId 167959 'Snacks, popcorn, air-popped'
  pork_belly: I('Pork belly', 'meat', 'g', 518, 9.3, 0, 53.0, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 167812 'Pork, fresh, belly, raw'
  pork_fat: I('Pork fat', 'meat', 'g', 812, 2.9, 0, 88.7, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 167811 'Pork, fresh, backfat, raw'
  pork_loin: I('Pork loin', 'meat', 'g', 143, 21.4, 0, 5.7, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 168230 'Pork, fresh, loin, whole, separable lean only, raw'
  pork_mince: I('Pork mince', 'meat', 'g', 263, 16.9, 0, 21.2, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 167902 'Pork, fresh, ground, raw'
  pork_ribs: I('Pork ribs', 'meat', 'g', 277, 15.5, 0, 23.4, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 167853 'Pork, fresh, spareribs, separable lean and fat, raw'
  pork_shoulder: I('Pork shoulder', 'meat', 'g', 148, 19.6, 0, 7.1, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 167845 'Pork, fresh, shoulder, whole, separable lean only, raw'
  potato_starch: I('Potato starch', 'grains', 'g', 310, 8.0, 55.1, 6.4), // USDA SR Legacy fdcId 171861 'Rolls, gluten-free, white, made with brown rice flour, tapioca starch, and potato starch' (proxy)
  prawns: I('Prawns', 'meat', 'g', 85.0, 20.1, 0, 0.5, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 175179 'Crustaceans, shrimp, raw'
  preserved_lemon: I('Preserved lemon', 'sauces', 'pc', 29.0, 1.1, 9.3, 0.3, { g: 40 }), // USDA SR Legacy fdcId 167746 'Lemons, raw, without peel' (proxy)
  prunes: I('Prunes', 'fv', 'g', 240, 2.2, 63.9, 0.4), // USDA SR Legacy fdcId 168162 'Plums, dried (prunes), uncooked'
  puff_pastry: I('Puff pastry', 'bakery', 'g', 551, 7.3, 45.1, 38.1), // USDA SR Legacy fdcId 172790 'Puff pastry, frozen, ready-to-bake'
  pul_biber: I('Pul biber (Aleppo chilli flakes)', 'spices', 'tsp', 318, 12.0, 56.6, 17.3, { g: 2, sameAs: ['chilli_flakes'] }), // USDA SR Legacy fdcId 170932 'Spices, pepper, red or cayenne' (proxy)
  pumpkin_seeds: I('Pumpkin seeds', 'sauces', 'g', 559, 30.2, 10.7, 49.0), // USDA SR Legacy fdcId 170556 'Seeds, pumpkin and squash seed kernels, dried'
  qurut: I('Qurut (dried yogurt balls)', 'dairy', 'g', 61.0, 3.5, 4.7, 3.2), // USDA SR Legacy fdcId 171284 'Yogurt, plain, whole milk' (proxy)
  rabbit: I('Rabbit', 'meat', 'g', 114, 21.8, 0, 2.3, { diet: 'meat', src: 'rabbit' }), // USDA SR Legacy fdcId 174347 'Game meat, rabbit, wild, raw' (proxy)
  radish: I('Radishes', 'fv', 'g', 16.0, 0.7, 3.4, 0.1), // USDA SR Legacy fdcId 169276 'Radishes, raw'
  raisins: I('Raisins', 'fv', 'g', 296, 2.5, 78.5, 0.5), // USDA SR Legacy fdcId 168166 'Raisins, seeded'
  ras_el_hanout: I('Ras el hanout', 'spices', 'tsp', 375, 17.8, 44.2, 22.3, { g: 2, pantry: true }), // USDA SR Legacy fdcId 170923 'Spices, cumin seed' (proxy)
  red_beans: I('Red beans (400 g tin)', 'tins', 'can', 124, 8.0, 21.5, 1.1, { g: 240, src: 'legume', sameAs: ['kidney_beans'] }), // USDA SR Legacy fdcId 174285 'Beans, kidney, red, mature seeds, canned, drained solids' (proxy)
  red_capsicum: I('Red capsicum', 'fv', 'pc', 26.0, 1.0, 6.0, 0.3, { g: 180 }), // USDA SR Legacy fdcId 170108 'Peppers, sweet, red, raw'
  red_wine: I('Dry red wine', 'sauces', 'ml', 85.0, 0.1, 2.6, 0), // USDA SR Legacy fdcId 173190 'Alcoholic beverage, wine, table, red'
  reindeer: I('Reindeer meat', 'meat', 'g', 120, 23.0, 0, 2.4, { diet: 'meat', src: 'meat' }), // USDA SR Legacy fdcId 173855 'Game meat, deer, raw' (proxy)
  roe: I('Roe', 'meat', 'g', 143, 22.3, 1.5, 6.4, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 175132 'Fish, roe, mixed species, raw'
  rosemary: I('Rosemary', 'spices', 'sprig', 131, 3.3, 20.7, 5.9, { g: 2 }), // USDA SR Legacy fdcId 173473 'Rosemary, fresh'
  rye_bread: I('Rye bread', 'bakery', 'g', 259, 8.5, 48.3, 3.3), // USDA SR Legacy fdcId 172684 'Bread, rye'
  rye_starter: I('Rye sourdough starter (zakwas)', 'bakery', 'g', 259, 8.5, 48.3, 3.3), // USDA SR Legacy fdcId 172684 'Bread, rye' (proxy)
  saffron: I('Saffron', 'spices', 'pinch', 310, 11.4, 65.4, 5.8, { g: 0.3 }), // USDA SR Legacy fdcId 170934 'Spices, saffron'
  sake: I('Sake', 'asian', 'ml', 134, 0.5, 5.0, 0), // USDA SR Legacy fdcId 167723 'Alcoholic beverage, rice (sake)'
  salmon: I('Salmon fillet', 'meat', 'g', 142, 19.8, 0, 6.3, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 173686 'Fish, salmon, Atlantic, wild, raw'
  salo: I('Salo / cured pork fat', 'meat', 'g', 393, 13.7, 0, 37.1, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 168277 'Pork, cured, bacon, unprepared' (proxy)
  salt_cod: I('Salt cod', 'meat', 'g', 290, 62.8, 0, 2.4, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 174190 'Fish, cod, Atlantic, dried and salted'
  sardines: I('Sardines', 'meat', 'g', 208, 24.6, 0, 11.4, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 175139 'Fish, sardine, Atlantic, canned in oil, drained solids with bone'
  sauerkraut: I('Sauerkraut', 'tins', 'g', 19.0, 0.9, 4.3, 0.1), // USDA SR Legacy fdcId 169279 'Sauerkraut, canned, solids and liquids'
  savory: I('Savory', 'spices', 'tsp', 101, 5.6, 24.4, 1.7, { g: 2 }), // USDA SR Legacy fdcId 173470 'Thyme, fresh' (proxy)
  scotch_bonnet: I('Scotch bonnet / habanero', 'fv', 'pc', 40.0, 1.9, 8.8, 0.4, { g: 10 }), // USDA SR Legacy fdcId 170106 'Peppers, hot chili, red, raw'
  seven_spice: I('Seven-spice mix', 'spices', 'tsp', 263, 6.1, 72.1, 8.7, { g: 2, pantry: true }), // USDA SR Legacy fdcId 171315 'Spices, allspice, ground' (proxy)
  shaoxing: I('Shaoxing wine', 'asian', 'ml', 134, 0.5, 5.0, 0), // USDA SR Legacy fdcId 167723 'Alcoholic beverage, rice (sake)' (proxy)
  shirataki: I('Shirataki noodles', 'asian', 'g', 78.0, 9.0, 2.9, 4.2), // USDA SR Legacy fdcId 172448 'Tofu, firm, prepared with calcium sulfate and magnesium chloride (nigari)' (proxy)
  short_grain_rice: I('Short-grain rice', 'grains', 'g', 358, 6.5, 79.2, 0.5, { pantry: true }), // USDA SR Legacy fdcId 168931 'Rice, white, short-grain, raw, unenriched'
  shortcrust: I('Shortcrust pastry', 'bakery', 'g', 457, 6.2, 48.6, 26.1), // USDA SR Legacy fdcId 175024 'Pie crust, standard-type, frozen, ready-to-bake, enriched' (proxy)
  shrimp_paste: I('Shrimp paste (belacan/terasi/bagoong)', 'asian', 'g', 35.0, 5.1, 3.6, 0.0, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 174531 'Sauce, fish, ready-to-serve' (proxy)
  small_fish: I('Small river fish', 'meat', 'g', 208, 24.6, 0, 11.4, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 175139 'Fish, sardine, Atlantic, canned in oil, drained solids with bone' (proxy)
  smoked_fish: I('Smoked fish', 'meat', 'g', 305, 18.5, 0, 25.1, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 168149 'Fish, mackerel, salted' (proxy)
  smoked_ribs: I('Smoked ribs', 'meat', 'g', 277, 15.5, 0, 23.4, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 167853 'Pork, fresh, spareribs, separable lean and fat, raw' (proxy)
  smoked_sausage: I('Smoked sausage (kielbasa/rookworst)', 'meat', 'g', 325, 10.8, 3.7, 29.6, { diet: 'meat', src: 'pork' }), // USDA SR Legacy fdcId 173879 'Kielbasa, fully cooked, unheated' (proxy)
  somun: I('Somun / lepinja flatbread', 'bakery', 'pc', 275, 9.1, 55.7, 1.2, { g: 80, sameAs: ['flatbread'] }), // USDA SR Legacy fdcId 174915 'Bread, pita, white, enriched' (proxy)
  sorghum_flour: I('Sorghum flour', 'grains', 'g', 359, 8.4, 76.6, 3.3), // USDA SR Legacy fdcId 168943 'Sorghum flour, whole-grain'
  sorrel: I('Sorrel', 'fv', 'g', 23.0, 2.9, 3.6, 0.4), // USDA SR Legacy fdcId 168462 'Spinach, raw' (proxy)
  sour_cream: I('Soured cream', 'dairy', 'g', 136, 3.5, 7.1, 10.6), // USDA SR Legacy fdcId 173443 'Sour cream, light' (proxy)
  soybeans: I('Soybeans (dry)', 'tins', 'g', 446, 36.5, 30.2, 19.9, { src: 'legume' }), // USDA SR Legacy fdcId 174270 'Soybeans, mature seeds, raw'
  spaghetti: I('Spaghetti', 'grains', 'g', 371, 13.0, 74.7, 1.5, { sameAs: ['wm_pasta'] }), // USDA SR Legacy fdcId 169736 'Pasta, dry, enriched'
  split_peas: I('Split peas (dry)', 'tins', 'g', 364, 23.1, 61.6, 3.9, { src: 'legume', pantry: true }), // USDA SR Legacy fdcId 172428 'Peas, green, split, mature seeds, raw'
  squash: I('Squash', 'fv', 'g', 45.0, 1.0, 11.7, 0.1, { sameAs: ['pumpkin'] }), // USDA SR Legacy fdcId 169295 'Squash, winter, butternut, raw'
  squid: I('Squid / cuttlefish', 'meat', 'g', 92.0, 15.6, 3.1, 1.4, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 174223 'Mollusks, squid, mixed species, raw'
  star_anise: I('Star anise', 'spices', 'pc', 337, 17.6, 50.0, 15.9, { g: 1, pantry: true }), // USDA SR Legacy fdcId 171316 'Spices, anise seed'
  sticky_rice: I('Glutinous / sticky rice', 'grains', 'g', 370, 6.8, 81.7, 0.6), // USDA SR Legacy fdcId 168883 'Rice, white, glutinous, unenriched, uncooked'
  stock_cube: I('Stock cube', 'tins', 'pc', 438, 16.7, 64.9, 13.9, { g: 5, pantry: true }), // USDA SR Legacy fdcId 171613 'Soup, bouillon cubes and granules, low sodium, dry'
  stockfish: I('Stockfish (dried cod)', 'meat', 'g', 290, 62.8, 0, 2.4, { diet: 'meat', src: 'fish', sameAs: ['salt_cod'] }), // USDA SR Legacy fdcId 174190 'Fish, cod, Atlantic, dried and salted' (proxy)
  stout: I('Stout / dark beer', 'sauces', 'ml', 43.0, 0.5, 3.5, 0), // USDA SR Legacy fdcId 168746 'Alcoholic beverage, beer, regular, all' (proxy)
  sultanas: I('Sultanas', 'fv', 'g', 296, 2.5, 78.5, 0.5), // USDA SR Legacy fdcId 168166 'Raisins, seeded' (proxy)
  sumac: I('Sumac', 'spices', 'tsp', 298, 12.4, 55.0, 17.8, { g: 2, pantry: true }), // USDA SR Legacy fdcId 170922 'Spices, coriander seed' (proxy)
  sunflower_oil: I('Sunflower oil', 'sauces', 'ml', 884, 0, 0, 100, { sameAs: ['oil'] }), // USDA SR Legacy fdcId 171025 'Oil, sunflower, linoleic, (approx. 65%)'
  swede: I('Swede (rutabaga)', 'fv', 'g', 37.0, 1.1, 8.6, 0.2), // USDA SR Legacy fdcId 168454 'Rutabagas, raw'
  tahini: I('Tahini', 'sauces', 'g', 592, 17.4, 21.5, 53.0, { sameAs: ['sesame_seeds'] }), // USDA SR Legacy fdcId 168604 'Seeds, sesame butter, tahini, type of kernels unspecified'
  taro: I('Taro', 'fv', 'g', 112, 1.5, 26.5, 0.2), // USDA SR Legacy fdcId 169308 'Taro, raw'
  tarragon: I('Tarragon', 'spices', 'sprig', 295, 22.8, 50.2, 7.2, { g: 2 }), // USDA SR Legacy fdcId 170937 'Spices, tarragon, dried'
  teapaste: I('Fermented tea leaves (lahpet)', 'asian', 'g', 11.0, 0.3, 2.3, 0.2), // USDA SR Legacy fdcId 169379 'Pickles, cucumber, sour' (proxy)
  thyme: I('Thyme', 'spices', 'sprig', 101, 5.6, 24.4, 1.7, { g: 2 }), // USDA SR Legacy fdcId 173470 'Thyme, fresh'
  tilapia: I('Tilapia', 'meat', 'g', 96.0, 20.1, 0, 1.7, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 175176 'Fish, tilapia, raw'
  tofu_puffs: I('Fried tofu puffs', 'asian', 'g', 270, 18.8, 8.9, 20.2, { src: 'tofu' }), // USDA SR Legacy fdcId 172451 'Tofu, fried' (proxy)
  tomatillo: I('Tomatillos', 'fv', 'g', 32.0, 1.0, 5.8, 1.0), // USDA SR Legacy fdcId 168566 'Tomatillos, raw'
  tomato_juice: I('Tomato juice', 'tins', 'ml', 17.0, 0.8, 3.5, 0.3), // USDA SR Legacy fdcId 170458 'Tomato juice, canned, with salt added'
  tomato_sauce: I('Tomato sauce (cooking)', 'tins', 'g', 24.0, 1.2, 5.3, 0.3, { sameAs: ['passata'] }), // USDA SR Legacy fdcId 169074 'Tomato sauce, canned, no salt added' (proxy)
  tripe: I('Beef tripe', 'meat', 'g', 85.0, 12.1, 0, 3.7, { diet: 'meat', src: 'meat' }), // USDA SR Legacy fdcId 170599 'Beef, variety meats and by-products, tripe, raw' (proxy)
  trout: I('Trout', 'meat', 'g', 119, 20.5, 0, 3.5, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 175154 'Fish, trout, rainbow, wild, raw'
  tuna: I('Tuna', 'meat', 'g', 144, 23.3, 0, 4.9, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 173706 'Fish, tuna, fresh, bluefin, raw'
  tuna_tin: I('Tinned tuna', 'tins', 'g', 116, 25.5, 0, 0.8, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 171986 'Fish, tuna, light, canned in water, without salt, drained solids'
  turkey: I('Turkey breast', 'meat', 'g', 114, 23.7, 0.1, 1.5, { diet: 'meat', src: 'turkey' }), // USDA SR Legacy fdcId 171098 'Turkey, whole, breast, meat only, raw'
  turnip: I('Turnips', 'fv', 'g', 28.0, 0.9, 6.4, 0.1), // USDA SR Legacy fdcId 170465 'Turnips, raw'
  veal: I('Veal', 'meat', 'g', 197, 18.6, 0, 13.1, { diet: 'meat', src: 'beef' }), // USDA SR Legacy fdcId 175290 'Veal, ground, raw'
  vine_leaves: I('Vine leaves', 'tins', 'g', 69.0, 4.3, 11.7, 2.0), // USDA SR Legacy fdcId 169393 'Grape leaves, canned'
  wakame: I('Dried wakame', 'asian', 'g', 45.0, 3.0, 9.1, 0.6), // USDA SR Legacy fdcId 170496 'Seaweed, wakame, raw'
  walnuts: I('Walnuts', 'sauces', 'g', 654, 15.2, 13.7, 65.2), // USDA SR Legacy fdcId 170187 'Nuts, walnuts, english'
  watercress: I('Watercress', 'fv', 'g', 11.0, 2.3, 1.3, 0.1), // USDA SR Legacy fdcId 170068 'Watercress, raw'
  waterlily: I('Water lily stems', 'asian', 'g', 14.0, 0.7, 3.0, 0.2), // USDA SR Legacy fdcId 169988 'Celery, raw' (proxy)
  watermelon: I('Watermelon', 'fv', 'g', 30.0, 0.6, 7.5, 0.1), // USDA SR Legacy fdcId 167765 'Watermelon, raw'
  white_beans: I('White beans (400 g tin)', 'tins', 'can', 114, 7.3, 21.2, 0.3, { g: 240, src: 'legume', sameAs: ['cannellini'] }), // USDA SR Legacy fdcId 175204 'Beans, white, mature seeds, canned' (proxy)
  white_bread: I('White bread', 'bakery', 'g', 238, 10.7, 43.9, 2.1), // USDA SR Legacy fdcId 167532 'Bread, white wheat'
  white_fish: I('Firm white fish fillets', 'meat', 'g', 85.0, 17.7, 0, 1.1, { diet: 'meat', src: 'fish' }), // USDA SR Legacy fdcId 173671 'Fish, lingcod, raw'
  white_sugar: I('White sugar', 'spices', 'tsp', 387, 0, 100, 0, { g: 4, pantry: true }), // USDA SR Legacy fdcId 169655 'Sugars, granulated'
  white_wine: I('Dry white wine', 'sauces', 'ml', 82.0, 0.1, 2.6, 0), // USDA SR Legacy fdcId 174837 'Alcoholic beverage, wine, table, white'
  worcestershire: I('Worcestershire sauce', 'sauces', 'ml', 77.0, 0, 19.2, 0), // USDA SR Legacy fdcId 171610 'Sauce, worcestershire'
  yard_long_beans: I('Yard-long beans', 'fv', 'g', 44.0, 3.3, 9.5, 0.3), // USDA SR Legacy fdcId 168405 'Cowpeas, young pods with seeds, raw' (proxy)
  yeast: I('Dry yeast', 'bakery', 'tsp', 325, 40.4, 41.2, 7.6, { g: 4, pantry: true }), // USDA SR Legacy fdcId 175043 'Leavening agents, yeast, baker's, active dry'
  yellow_split_peas: I('Yellow split peas (dry)', 'tins', 'g', 364, 23.1, 61.6, 3.9, { src: 'legume', pantry: true }), // USDA SR Legacy fdcId 172428 'Peas, green, split, mature seeds, raw' (proxy)
  yogurt: I('Plain yogurt', 'dairy', 'g', 61.0, 3.5, 4.7, 3.2), // USDA SR Legacy fdcId 171284 'Yogurt, plain, whole milk'
  zhug: I('Zhug (Yemeni chilli-herb sauce)', 'sauces', 'g', 93.0, 1.9, 19.2, 0.9), // USDA SR Legacy fdcId 171186 'Sauce, hot chile, sriracha' (proxy)
};
