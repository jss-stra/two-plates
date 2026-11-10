export default {
  cuisine: '',
  group: 'African',
  recipes: [
// world-african: imported from UniTools World Recipes v2.0 (CC BY-SA 4.0), adapted to Two Plates format.
// Row: [name, minutes, ingredients, tags, cuisine]. Quantities for 4 standard servings.
// See MANIFEST.json for per-dish provenance and adjustment notes.
  // Algerian
  ['Algerian couscous', 160, 'couscous 465, lamb 665, chickpeas 0.5, carrot 2.5, turnip 240, zucchini 2, pumpkin 265, onion 1.5, tomato_paste 15, ras_el_hanout 2, butter 55, oil 55, harissa 15', 'weekend', 'Algerian'],
  ['Chorba frik', 90, 'lamb 335, freekeh 100, chickpeas 0.5, onion 1.5, tomato 2, tomato_paste 15, celery 55, coriander 0.5, mint 0.5, cinnamon_stick 0.5, ghee 35, lemon 0.5', 'weekend', 'Algerian'],
  ['Rechta', 170, 'plain_flour 400, oil 80, chicken_pieces 935, turnip 335, chickpeas 0.5, onion 1.5, cinnamon_stick 0.5, white_pepper 1.5, butter 40', 'weekend', 'Algerian'],
  // Cameroonian
  ['Eru', 120, 'spinach 800, palm_oil 100, beef_steak 335, tripe 200, stockfish 100, crayfish_ground 35, onion 0.5, red_chilli 1.5, stock_cube 1.5', 'weekend', 'Cameroonian'],
  ['Koki', 190, 'lobia 335, palm_oil 135, red_chilli 1.5, onion 0.5, spinach 135, crayfish_ground 25', 'weekend', 'Cameroonian'],
  ['Ndolé', 120, 'spinach 465, peanuts 200, beef_steak 400, prawns 200, dried_shrimp 35, onion 1.5, garlic 4, ginger 25, red_chilli 1.5, oil 80, plantain 1', 'weekend', 'Cameroonian'],
  ['Poulet DG', 75, 'chicken_pieces 1120, plantain 2, carrot 2.5, green_beans 160, red_capsicum 1.5, onion 1.5, tomato 2.5, garlic 4, ginger 25, scotch_bonnet 1, thyme 2.5, oil 60', 'weekend', 'Cameroonian'],
  // Congolese
  ['Liboke de poisson', 65, 'tilapia 1600, tomato 4, onion 2, garlic 6, ginger 30, scotch_bonnet 2, lemon 2, spring_onion 4, cassava 500', 'weekend', 'Congolese'],
  ['Poulet moambé', 95, 'chicken_pieces 1200, palm_pulp 640, onion 1.5, garlic 5, ginger 25, scotch_bonnet 1.5, lemon 1.5, eggplant 1.5, spinach 160, oil 40, long_grain_rice 320', 'weekend', 'Congolese'],
  // Egyptian
  ['Koshari', 90, 'short_grain_rice 200, lentils_can 0.5, spaghetti 135, chickpeas 0.5, onion 2.5, diced_tomatoes 1.5, garlic 4, vinegar 30, cumin 1.5, chilli_flakes 0.5, oil 120', 'weekend', 'Egyptian'],
  ['Molokhia', 90, 'molokhia 400, chicken_pieces 960, garlic 8, coriander_powder 5, ghee 65, cardamom_pods 3, bay_leaf 1.5, onion 1, long_grain_rice 320, lemon 1.5', 'weekend', 'Egyptian'],
  // Ethiopian
  ['Doro wat', 145, 'chicken_pieces 935, onion 4.5, berbere 6, ghee 80, garlic 4, ginger 25, egg 4, lemon 0.5, red_wine 80', 'weekend', 'Ethiopian'],
  ['Kitfo', 70, 'beef_steak 700, butter 200, ginger 30, garlic 5, cardamom_pods 5, cinnamon_stick 1, fenugreek_seeds 1, mitmita 6, curd_cheese 200, collard_greens 300, injera 4', 'weekend', 'Ethiopian'],
  ['Misir wat', 85, 'red_lentils 300, onion 4, berbere 6, garlic 5, ginger 30, tomato_paste 10, oil 80', 'weekend', 'Ethiopian'],
  // Ghanaian
  ['Banku with tilapia', 75, 'maize_meal 400, cassava 200, tilapia 1600, tomato 4, scotch_bonnet 3, onion 2, ginger 30, garlic 4, oil 80', 'weekend', 'Ghanaian'],
  ['Waakye', 100, 'lobia 200, long_grain_rice 335, baking_soda 0.5, plantain 1, egg 4, gari 100, chilli_crisp 65, oil 40', 'weekend', 'Ghanaian'],
  // Ivorian
  ['Attiéké with fish', 55, 'attieke 500, white_fish 1600, onion 3, tomato 3, red_chilli 2, garlic 5, ginger 30, stock_cube 1, lemon 2, oil 80', '', 'Ivorian'],
  ['Kedjenou', 100, 'chicken_pieces 1400, onion 3, tomato 5, eggplant 0.5, red_capsicum 1, garlic 5, ginger 30, scotch_bonnet 1, bay_leaf 2, thyme 3, attieke_cooked 400', 'weekend oven', 'Ivorian'],
  // Kenyan
  ['Nyama choma', 115, 'goat 1335, lemon 2, garlic 4, oil 40, tomato 2.5, red_onion 1.5, coriander 0.5, red_chilli 0.5, maize_meal 265', 'weekend', 'Kenyan'],
  ['Sukuma wiki', 35, 'collard_greens 700, onion 2, tomato 4, garlic 4, oil 50, cumin 1, lemon 1', '', 'Kenyan'],
  // Malagasy
  ['Ravitoto', 115, 'spinach 560, pork_belly 560, coconut_milk 0.5, onion 1.5, garlic 5, ginger 25, long_grain_rice 320, oil 30', 'weekend', 'Malagasy'],
  ['Romazava', 100, 'beef_steak 400, pork_shoulder 240, watercress 240, spinach 240, mustard_greens 160, tomato 2.5, onion 1.5, garlic 4, ginger 25, long_grain_rice 320, oil 30', 'weekend', 'Malagasy'],
  // Malian
  ['Grilled capitaine', 105, 'white_fish 2000, onion 5, mustard 6, lemon 3, garlic 6, ginger 30, red_chilli 2, stock_cube 1, plantain 2, oil 120', 'weekend', 'Malian'],
  ['Tigadegena', 115, 'beef_chunks 600, peanut_butter 235, onion 1.5, tomato_paste 25, cabbage 200, carrot 2, potato 1.5, eggplant 1.5, red_chilli 0.5, oil 40, long_grain_rice 300', 'weekend', 'Malian'],
  // Moroccan
  ['Chicken tagine with preserved lemon', 95, 'chicken_pieces 1400, preserved_lemon 2, olives 150, onion 2, garlic 4, ginger 5, turmeric 1, saffron 3.5, coriander 0.5, parsley 0.5, oil 60', 'weekend', 'Moroccan'],
  ['Harira', 115, 'lamb 200, chickpeas 0.5, green_lentils 65, tomato 3.5, onion 0.5, celery 55, coriander 0.5, parsley 0.5, ginger 5, cinnamon 0.5, plain_flour 30, rice_noodles 40', 'weekend', 'Moroccan'],
  ['Pastilla', 150, 'chicken_pieces 750, filo 200, almonds 125, onion 2, egg 3, butter 75, saffron 1.5, ginger 5, cinnamon 3, white_sugar 12.5, coriander 0.5', 'weekend', 'Moroccan'],
  // Mozambican
  ['Matapa', 115, 'spinach 560, peanuts 160, coconut_milk 1, prawns 320, onion 1.5, garlic 5, tomato 1.5, scotch_bonnet 1.5, long_grain_rice 280, oil 50', 'weekend', 'Mozambican'],
  ['Piri-piri chicken', 70, 'chicken_pieces 1600, scotch_bonnet 8, garlic 8, lemon 3, smoked_paprika 3, oil 100, vinegar 35, butter 50, oregano 3', 'weekend', 'Mozambican'],
  // Nigerian
  ['Egusi soup', 110, 'egusi 200, beef_steak 400, stockfish 135, smoked_fish 135, palm_oil 100, spinach 265, onion 1.5, scotch_bonnet 2, crayfish_ground 25, stock_cube 1.5, locust_beans 15', 'weekend', 'Nigerian'],
  ['Jollof rice', 80, 'long_grain_rice 335, tomato 3.5, red_capsicum 1.5, onion 1.5, scotch_bonnet 0.5, tomato_paste 25, curry_powder 1.5, thyme 1.5, bay_leaf 1.5, veg_stock 400, oil 65', 'weekend', 'Nigerian'],
  // Senegalese
  ['Chicken yassa', 100, 'chicken_pieces 1400, onion 10, lemon 5, dijon 35, garlic 6, scotch_bonnet 1, bay_leaf 2, oil 80, veg_stock 300, long_grain_rice 400', 'weekend', 'Senegalese'],
  ['Thieboudienne', 140, 'white_fish 1000, long_grain_rice 465, parsley 1, garlic 5.5, red_chilli 1.5, tomato_paste 100, onion 2, cassava 265, cabbage 265, carrot 2, eggplant 1.5, okra 135, tamarind 15, oil 100', 'weekend', 'Senegalese'],
  // South African
  ['Bobotie', 90, 'beef_mince 600, white_bread 55, milk 265, onion 1.5, curry_powder 4, turmeric 0.5, dried_apricots 65, raisins 55, chutney 25, vinegar 15, egg 2, bay_leaf 2.5, almonds 35, oil 25', 'weekend oven', 'South African'],
  ['Chakalaka', 40, 'carrot 2.5, red_capsicum 2, onion 1.5, white_beans 1, tomato 2, curry_powder 2, paprika 0.5, red_chilli 1.5, garlic 2.5, ginger 15, oil 35', '', 'South African'],
  // Sudanese
  ['Asida with mulah', 90, 'sorghum_flour 320, lamb 480, okra 50, onion 1.5, tomato_paste 30, garlic 3, peanut_butter 20, coriander_powder 1, oil 50', 'weekend', 'Sudanese'],
  ['Salata aswad', 50, 'eggplant 1.5, peanut_butter 120, lemon 1.5, garlic 2.5, tomato 1.5, onion 1, red_chilli 1, oil 60', '', 'Sudanese'],
  // Tanzanian
  ['Mchuzi wa samaki', 60, 'white_fish 800, coconut_milk 1, tamarind 30, onion 1.5, tomato 2.5, garlic 4, ginger 25, curry_powder 5, red_chilli 1.5, coriander 0.5, oil 50', 'weekend', 'Tanzanian'],
  ['Ndizi na nyama', 85, 'beef_steak 600, plantain 5, coconut_milk 1, onion 2, tomato 3, garlic 4, ginger 30, curry_powder 3, coriander 0.5, oil 50', 'weekend', 'Tanzanian'],
  ['Zanzibar pilau', 100, 'beef_steak 535, basmati 400, onion 2.5, cloves 6.5, cardamom_pods 5.5, cinnamon_stick 1.5, cumin_seeds 1.5, peppercorns 0.5, garlic 4, ginger 25, potato 2, oil 65', 'weekend', 'Tanzanian'],
  // Tunisian
  ['Ojja with merguez', 45, 'merguez 500, tomato 5, red_capsicum 3, garlic 6, harissa 25, tomato_paste 10, egg 5, caraway 1, oil 50, parsley 0.5, baguette 250', '', 'Tunisian'],
  ['Tunisian lablabi', 105, 'chickpeas 1.5, white_bread 300, garlic 8, harissa 35, cumin 2, egg 4, oil 80, olives 80, capers 25, tuna_tin 150, lemon 1', 'weekend', 'Tunisian'],
  // Ugandan
  ['Matoke', 110, 'plantain 6, onion 1, tomato 1.5, peanut_butter 80, oil 30', 'weekend', 'Ugandan'],
  // Zimbabwean
  ['Muriwo unedovi', 40, 'collard_greens 700, peanut_butter 150, onion 1, tomato 3, garlic 3, oil 40', '', 'Zimbabwean'],
  ['Sadza ne nyama', 125, 'maize_meal 400, beef_steak 640, onion 1.5, tomato 3, collard_greens 320, garlic 3, peanut_butter 20, oil 40', 'weekend', 'Zimbabwean'],
  ],
};
