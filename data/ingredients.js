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
};

// Allergen categories for the existing catalog (the imported batch carries its
// own tags inline). Two strengths, never merged:
// - allergenCats: DEFINITE - the food is, or is made from, the allergen by
//   definition (peanut butter is peanuts; regular soy sauce is brewed from
//   soybeans and wheat; fish sauce is fermented fish).
// - possibleCats: POSSIBLE - a standard/traditional recipe contains it but
//   packaged formulations genuinely vary by brand (Thai curry pastes usually
//   contain shrimp paste and may contain fish; pesto usually contains nuts).
// Possible tags still exclude conservatively for allergies, but the UI
// discloses them as "may contain", never as confirmed. Neither list promises
// safety: cross-contact and brand reformulation aren't tracked.
const ALLERGEN_CAT_TAGS = {
  egg: ['egg', 'egg_whites', 'light_mayo'],
  dairy: ['paneer', 'greek_yogurt', 'light_milk', 'light_cream', 'cottage_cheese', 'ricotta', 'mozzarella', 'parmesan', 'feta', 'cheddar', 'halloumi', 'butter', 'ghee'],
  soy: ['tofu', 'silken_tofu', 'tempeh', 'edamame', 'soya_chunks', 'soy_sauce', 'miso', 'hoisin', 'chilli_bean_paste'],
  fish: ['fish_sauce'],
  shellfish: ['oyster_sauce'],
  peanuts: ['peanuts', 'peanut_butter'],
  tree_nuts: ['cashews'],
  sesame: ['sesame_seeds', 'sesame_oil', 'hummus'],
  gluten: ['wraps', 'bread', 'buns', 'lebanese_bread', 'atta', 'plain_flour', 'wm_pasta', 'lasagne', 'orzo', 'gnocchi', 'panko', 'hokkien', 'udon', 'soba', 'ramen', 'dumpling_wrappers', 'soy_sauce', 'chilli_bean_paste'],
  mustard: ['dijon', 'mustard_seeds'],
};
const ALLERGEN_POSSIBLE_TAGS = {
  soy: ['schezwan'],
  fish: ['kimchi', 'red_curry', 'green_curry', 'tom_yum_paste', 'laksa_paste'],
  shellfish: ['kimchi', 'red_curry', 'green_curry', 'tom_yum_paste', 'laksa_paste'],
  peanuts: ['massaman'],
  tree_nuts: ['pesto'],
  gluten: ['tortillas'],
};
for (const [cat, ids] of Object.entries(ALLERGEN_CAT_TAGS)) {
  for (const id of ids) {
    if (!INGREDIENTS[id]) throw new Error(`allergenCats tag for unknown ingredient: ${id}`);
    INGREDIENTS[id].allergenCats = [...(INGREDIENTS[id].allergenCats || []), cat];
  }
}
for (const [cat, ids] of Object.entries(ALLERGEN_POSSIBLE_TAGS)) {
  for (const id of ids) {
    if (!INGREDIENTS[id]) throw new Error(`possibleCats tag for unknown ingredient: ${id}`);
    INGREDIENTS[id].possibleCats = [...(INGREDIENTS[id].possibleCats || []), cat];
  }
}
