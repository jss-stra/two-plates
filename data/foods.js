// Everyday foods for the Today log: things eaten as they are (a banana, a
// roti, a scoop of whey) rather than cooked from a Two Plates recipe.
//
// Values are per 100 g (or 100 ml): kcal, p (protein), c (available carbs -
// excluding fibre, as on Australian labels), f (fat), fi (fibre), and alc
// (alcohol, g) where it applies. They are typical values rounded from USDA
// FoodData Central and the FSANZ Australian Food Composition Database, in the
// form you eat them (cooked rice, boiled egg). Brands vary - for packaged
// food, the label on the pack beats these numbers ("Something else" lets you
// type the label in).
//
// portions: [label, grams-or-ml] - the first is the default.
// aka: extra search words (Hindi names, spellings).
const F = (name, group, unit, [kcal, p, c, f, fi, alc = 0], portions, aka = '') =>
  ({ name, group, unit, kcal, p, c, f, fi, alc, portions, aka });

export const FOOD_GROUPS = {
  grains: 'Breads, rice & grains',
  protein: 'Eggs, dairy & protein',
  legumes: 'Dal & legumes',
  fruit: 'Fruit',
  veg: 'Veg',
  nuts: 'Nuts & seeds',
  snacks: 'Snacks & sweets',
  drinks: 'Drinks',
};

export const FOODS = {
  // Breads, rice & grains
  roti: F('Roti / chapati (wholemeal)', 'grains', 'g', [270, 9, 45, 5, 7], [['roti', 40]], 'chapati phulka'),
  paratha: F('Plain paratha', 'grains', 'g', [320, 7, 42, 14, 5], [['paratha', 80]], 'parantha'),
  naan: F('Naan (plain)', 'grains', 'g', [290, 9, 50, 6, 2], [['naan', 90]]),
  rice_white: F('White rice, cooked (basmati / jasmine)', 'grains', 'g', [130, 2.7, 28, 0.3, 0.4], [['cup', 160], ['½ cup', 80]], 'chawal'),
  rice_brown: F('Brown rice, cooked', 'grains', 'g', [123, 2.7, 24, 1, 1.6], [['cup', 195], ['½ cup', 98]]),
  quinoa_cooked: F('Quinoa, cooked', 'grains', 'g', [120, 4.4, 18.5, 1.9, 2.8], [['cup', 185], ['½ cup', 93]]),
  pasta_cooked: F('Pasta, cooked (white)', 'grains', 'g', [158, 5.8, 29, 0.9, 1.8], [['cup', 140]]),
  oats: F('Rolled oats (dry weight)', 'grains', 'g', [375, 12.5, 56, 8, 10], [['½ cup', 40], ['¼ cup', 20]], 'porridge oatmeal'),
  muesli: F('Muesli (untoasted)', 'grains', 'g', [360, 10, 58, 7, 9], [['½ cup', 50]], 'granola'),
  bread_wholegrain: F('Wholegrain bread', 'grains', 'g', [245, 10, 40, 3.5, 6.5], [['slice', 40]], 'toast'),
  bread_white: F('White bread', 'grains', 'g', [250, 8.5, 46, 2.5, 2.7], [['slice', 36]], 'toast'),
  idli: F('Idli', 'grains', 'g', [140, 4.5, 28, 0.6, 1.5], [['idli', 40]]),
  dosa: F('Plain dosa', 'grains', 'g', [165, 4, 28, 4, 1.5], [['dosa', 80]]),

  // Eggs, dairy & protein
  egg_boiled: F('Egg (boiled or poached)', 'protein', 'g', [143, 12.6, 0.7, 9.5, 0], [['egg', 50]], 'anda'),
  egg_white: F('Egg white', 'protein', 'g', [52, 11, 0.7, 0.2, 0], [['egg white', 33]]),
  milk_full: F('Milk, full cream', 'protein', 'ml', [64, 3.3, 4.8, 3.4, 0], [['glass', 250], ['splash', 30]], 'doodh'),
  milk_light: F('Milk, light', 'protein', 'ml', [42, 3.6, 5, 1, 0], [['glass', 250], ['splash', 30]], 'doodh'),
  milk_skim: F('Milk, skim', 'protein', 'ml', [35, 3.5, 5, 0.1, 0], [['glass', 250]]),
  soy_milk: F('Soy milk', 'protein', 'ml', [45, 3.3, 2.5, 2, 0.5], [['glass', 250]]),
  oat_milk: F('Oat milk', 'protein', 'ml', [50, 1, 7, 2.2, 0.8], [['glass', 250]]),
  greek_yogurt: F('Greek yogurt, plain low-fat', 'protein', 'g', [60, 10, 4, 0.3, 0], [['cup', 200], ['½ cup', 100]], 'yoghurt'),
  curd: F('Curd / dahi (plain, full fat)', 'protein', 'g', [61, 3.5, 4.7, 3.3, 0], [['bowl', 150]], 'yogurt yoghurt raita'),
  paneer: F('Paneer', 'protein', 'g', [300, 18, 3, 24, 0], [['50 g', 50], ['100 g', 100]]),
  tofu_firm: F('Firm tofu', 'protein', 'g', [125, 13, 2, 7, 2], [['100 g', 100]]),
  cheese_slice: F('Cheddar cheese', 'protein', 'g', [400, 25, 0.1, 33, 0], [['slice', 20]]),
  whey: F('Whey protein powder (typical)', 'protein', 'g', [390, 78, 7, 5, 0], [['scoop', 30]], 'shake protein'),
  chicken_cooked: F('Chicken breast, cooked (no skin)', 'protein', 'g', [165, 31, 0, 3.6, 0], [['100 g', 100], ['150 g', 150]]),
  tuna_tin: F('Tuna in springwater, drained', 'protein', 'g', [110, 25, 0, 1, 0], [['small tin', 95]]),

  // Dal & legumes (cooked)
  dal_cooked: F('Dal, cooked (plain lentils)', 'legumes', 'g', [116, 9, 12, 0.4, 7.9], [['bowl', 150], ['cup', 200]], 'daal lentils'),
  chickpeas_cooked: F('Chickpeas, cooked', 'legumes', 'g', [164, 8.9, 19.5, 2.6, 7.6], [['½ cup', 80], ['cup', 160]], 'chana chole'),
  rajma_cooked: F('Kidney beans, cooked', 'legumes', 'g', [127, 8.7, 16.4, 0.5, 6.4], [['½ cup', 90], ['cup', 180]], 'rajma'),

  // Fruit
  banana: F('Banana', 'fruit', 'g', [89, 1.1, 20, 0.3, 2.6], [['medium', 120]], 'kela'),
  apple: F('Apple', 'fruit', 'g', [52, 0.3, 11.4, 0.2, 2.4], [['medium', 180]], 'seb'),
  orange: F('Orange', 'fruit', 'g', [47, 0.9, 9.4, 0.1, 2.4], [['medium', 150]]),
  mango: F('Mango', 'fruit', 'g', [60, 0.8, 13.4, 0.4, 1.6], [['cup, sliced', 165]], 'aam'),
  strawberries: F('Strawberries', 'fruit', 'g', [32, 0.7, 5.7, 0.3, 2], [['cup', 150]]),
  blueberries: F('Blueberries', 'fruit', 'g', [57, 0.7, 12, 0.3, 2.4], [['½ cup', 75]], 'berries'),
  grapes: F('Grapes', 'fruit', 'g', [69, 0.7, 17, 0.2, 0.9], [['cup', 150]]),
  papaya: F('Papaya', 'fruit', 'g', [43, 0.5, 9.1, 0.3, 1.7], [['cup', 145]], 'pawpaw'),
  dates: F('Dates (medjool)', 'fruit', 'g', [277, 1.8, 68, 0.2, 6.7], [['date', 24]], 'khajur'),

  // Veg
  salad: F('Green salad (lettuce, tomato, cucumber)', 'veg', 'g', [18, 1, 2.5, 0.2, 1.5], [['bowl', 100]]),
  broccoli_steamed: F('Broccoli, steamed', 'veg', 'g', [35, 2.4, 4.4, 0.4, 3.3], [['cup', 150]]),
  sweet_potato_baked: F('Sweet potato, baked', 'veg', 'g', [90, 2, 17.4, 0.2, 3.3], [['medium', 150]]),
  potato_boiled: F('Potato, boiled', 'veg', 'g', [87, 1.9, 18.3, 0.1, 1.8], [['medium', 150]], 'aloo'),

  // Nuts & seeds
  almonds: F('Almonds', 'nuts', 'g', [579, 21, 9.5, 50, 12.5], [['handful', 30]], 'badam'),
  peanuts: F('Peanuts, roasted', 'nuts', 'g', [585, 24, 13, 50, 8.5], [['handful', 30]], 'moongphali'),
  cashews: F('Cashews', 'nuts', 'g', [553, 18, 27, 44, 3.3], [['handful', 30]], 'kaju'),
  walnuts: F('Walnuts', 'nuts', 'g', [654, 15, 7, 65, 6.7], [['handful', 30]], 'akhrot'),
  peanut_butter: F('Peanut butter', 'nuts', 'g', [600, 25, 12, 50, 6], [['tbsp', 20]]),
  chia: F('Chia seeds', 'nuts', 'g', [486, 17, 8, 31, 34], [['tbsp', 12]]),

  // Snacks & sweets
  dark_choc: F('Dark chocolate (70%)', 'snacks', 'g', [600, 7.8, 34, 43, 10.9], [['2 squares', 20]]),
  chips: F('Potato chips', 'snacks', 'g', [536, 7, 49, 35, 4.4], [['small packet', 45]], 'crisps'),
  rice_cake: F('Rice cake (plain)', 'snacks', 'g', [387, 8, 78, 2.8, 4.2], [['cake', 9]]),
  popcorn: F('Popcorn, air-popped', 'snacks', 'g', [387, 13, 63, 4.5, 14.5], [['cup', 8]]),
  biscuit: F('Plain sweet biscuit (e.g. digestive)', 'snacks', 'g', [480, 7, 62, 21, 3.5], [['biscuit', 15]], 'cookie'),
  samosa: F('Samosa (potato, fried) - rough', 'snacks', 'g', [262, 4.5, 30, 14, 3], [['samosa', 100]]),

  // Drinks
  chai: F('Chai with milk & sugar', 'drinks', 'ml', [45, 1.7, 6, 1.6, 0], [['cup', 150]], 'tea'),
  latte: F('Latte / flat white (full cream)', 'drinks', 'ml', [54, 3, 4.3, 2.8, 0], [['regular', 250], ['small', 200]], 'coffee cappuccino'),
  black_coffee: F('Black coffee / tea, no milk', 'drinks', 'ml', [2, 0.1, 0, 0, 0], [['cup', 250]], 'espresso americano'),
  orange_juice: F('Orange juice', 'drinks', 'ml', [45, 0.7, 10, 0.2, 0.2], [['glass', 250]]),
  cola: F('Soft drink (regular)', 'drinks', 'ml', [42, 0, 10.6, 0, 0], [['can', 375]], 'soda coke'),
  beer: F('Beer (regular, ~4.8%)', 'drinks', 'ml', [41, 0.4, 3, 0, 0, 3.8], [['stubby', 375], ['pint', 570]]),
  wine: F('Wine (red or white)', 'drinks', 'ml', [83, 0.1, 2.6, 0, 0, 10.6], [['glass', 150]]),
};
