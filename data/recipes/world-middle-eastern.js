export default {
  cuisine: '',
  group: 'Middle Eastern',
  recipes: [
// world-middle-eastern: imported from UniTools World Recipes v2.0 (CC BY-SA 4.0), adapted to Two Plates format.
// Row: [name, minutes, ingredients, tags, cuisine]. Quantities for 4 standard servings.
// See MANIFEST.json for per-dish provenance and adjustment notes.
  // Cypriot
  ['Grilled halloumi with watermelon', 30, 'halloumi 400, watermelon 800, mint 0.5, oil 50, lemon 1, honey 3, rocket 80', '', 'Cypriot'],
  ['Kleftiko', 330, 'lamb_shoulder 1335, potato 3.5, garlic 6.5, lemon 1.5, oregano 4, cinnamon_stick 0.5, bay_leaf 2, oil 65, halloumi 135', 'weekend', 'Cypriot'],
  ['Koupepia', 130, 'vine_leaves 265, pork_mince 265, beef_mince 200, short_grain_rice 135, onion 1.5, tomato 2.5, cinnamon 1.5, mint 0.5, parsley 0.5, lemon 1.5, oil 55', 'weekend', 'Cypriot'],
  ['Souvla', 150, 'pork_shoulder 1665, lemon 2, oregano 4, pita 4, red_onion 1.5, tomato 2, parsley 0.5', 'weekend', 'Cypriot'],
  // Emirati
  ['Machboos', 75, 'prawns 640, basmati 400, onion 2.5, tomato 2.5, dried_lime 2.5, baharat 2.5, turmeric 1.5, garlic 4, ginger 25, coriander 0.5, green_chilli 1.5, ghee 65', 'weekend', 'Emirati'],
  // Iraqi
  ['Iraqi biryani', 120, 'chicken_pieces 800, basmati 400, rice_noodles 65, peas 135, carrot 1.5, potato 1.5, almonds 55, raisins 55, baharat 2, dried_lime 1.5, onion 1.5, tomato_paste 15, ghee 65', 'weekend', 'Iraqi'],
  ['Iraqi dolma', 150, 'vine_leaves 200, short_grain_rice 265, lamb 265, red_capsicum 2.5, onion 2, eggplant 2, tomato 2.5, tomato_paste 25, pomegranate_molasses 25, lemon 1.5, parsley 0.5, baharat 2, oil 65', 'weekend', 'Iraqi'],
  ['Masgouf', 105, 'carp 2000, oil 100, turmeric 2, tamarind 25, onion 2, tomato 4, lemon 2, curry_powder 3', 'weekend', 'Iraqi'],
  // Israeli
  ['Sabich', 105, 'eggplant 2, egg 4, pita 4, amba 50, tahini 150, tomato 3, cucumber 2, parsley 0.5, lemon 2, zhug 25, oil 60', 'weekend', 'Israeli'],
  // Jordanian
  ['Galayet bandora', 50, 'tomato 10, oil 120, garlic 6, green_chilli 3, onion 1, flatbread 4, mint 0.5', '', 'Jordanian'],
  ['Mansaf', 190, 'lamb 1000, jameed 250, long_grain_rice 350, lavash 2, almonds 50, pine_nuts 30, ghee 50, cardamom 3, turmeric 0.5, parsley 0.5', 'weekend', 'Jordanian'],
  ['Maqluba', 135, 'chicken_pieces 800, long_grain_rice 335, eggplant 2, cauliflower 335, potato 2, onion 0.5, baharat 2, turmeric 0.5, cinnamon_stick 0.5, pine_nuts 40, oil 120', 'weekend', 'Jordanian'],
  ['Musakhan', 125, 'chicken_pieces 1065, onion 6.5, sumac 20, oil 120, flatbread 4, pine_nuts 55, allspice 1.5, cardamom 0.5, cinnamon 0.5, yogurt 200', 'weekend', 'Jordanian'],
  // Kuwaiti
  ['Harees', 230, 'atta 265, lamb 600, cinnamon_stick 0.5, cardamom_pods 2.5, ghee 65, onion 0.5', 'weekend', 'Kuwaiti'],
  ['Kuwaiti gereesh', 155, 'bulgur 335, chicken_pieces 800, onion 2.5, tomato_paste 25, tomato 2, baharat 4, dried_lime 1.5, ghee 65, cinnamon_stick 0.5', 'weekend', 'Kuwaiti'],
  ['Murabyan', 85, 'prawns 800, basmati 400, onion 2.5, dill 2, coriander 0.5, dried_lime 1.5, tomato 1.5, turmeric 1.5, baharat 2.5, garlic 4, ghee 65', 'weekend', 'Kuwaiti'],
  // Lebanese
  ['Fattet hummus', 110, 'chickpeas 1.5, pita 2.5, yogurt 560, tahini 40, garlic 4, lemon 1, ghee 65, pine_nuts 50, parsley 0.5, paprika 1, oil 60', 'weekend', 'Lebanese'],
  ['Kibbeh nayyeh', 40, 'bulgur 120, lamb 500, onion 1, seven_spice 1, mint 0.5, oil 60', '', 'Lebanese'],
  ['Tabbouleh', 25, 'parsley 4, mint 1, bulgur 40, tomato 4, spring_onion 4, lemon 2, oil 60, allspice 0.5', 'quick', 'Lebanese'],
  // Omani
  ['Maqdeed', 105, 'lamb 1000, turmeric 6, onion 2, garlic 4, dried_chilli 1.5, ghee 55, cumin 2, long_grain_rice 335', 'weekend', 'Omani'],
  ['Mishkak', 40, 'beef_chunks 800, tamarind 35, garlic 6, ginger 30, cumin 2, coriander_powder 2, turmeric 1, cayenne 1, oil 60, onion 2, flatbread 4', '', 'Omani'],
  ['Shuwa', 520, 'lamb 1500, cumin 4.5, coriander_powder 3, turmeric 1.5, cayenne 1.5, dried_lime 1.5, garlic 5, vinegar 25, oil 50, basmati 350', 'weekend', 'Omani'],
  // Persian
  ['Fesenjan', 180, 'duck 1000, walnuts 335, pomegranate_molasses 135, onion 1.5, white_sugar 4, turmeric 0.5, cinnamon 0.5, saffron 2, oil 40, basmati 335, pomegranate_seeds 65', 'weekend', 'Persian'],
  ['Ghormeh sabzi', 190, 'lamb 535, parsley 4, coriander 2.5, spring_onion 1.5, kasoori_methi 2, kidney_beans 0.5, lime 2.5, onion 1.5, turmeric 0.5, oil 65, long_grain_rice 150', 'weekend', 'Persian'],
  ['Joojeh kabab', 55, 'chicken_thigh 960, onion 2.5, saffron 2.5, lemon 2.5, yogurt 120, butter 65, oil 50, tomato 5, basmati 400, sumac 2.5', '', 'Persian'],
  ['Tahdig', 150, 'basmati 335, potato 1.5, yogurt 25, saffron 2, butter 55, oil 25', 'weekend', 'Persian'],
  // Saudi
  ['Jareesh', 170, 'bulgur 265, lamb 535, onion 2, tomato 2, yogurt 135, baharat 1.5, dried_lime 1.5, ghee 55', 'weekend', 'Saudi'],
  ['Kabsa', 105, 'chicken_pieces 1065, basmati 400, onion 1.5, tomato 2.5, tomato_paste 15, dried_lime 2, carrot 1.5, baharat 2, cardamom_pods 4, cinnamon_stick 0.5, garlic 3.5, raisins 40, almonds 40, ghee 55', 'weekend', 'Saudi'],
  // Syrian
  ['Fattoush', 30, 'pita 2, tomato 4, cucumber 3, radish 120, cos_lettuce 0.5, spring_onion 4, parsley 1, mint 0.5, sumac 6, pomegranate_molasses 25, lemon 2, oil 80, garlic 2', '', 'Syrian'],
  ['Kibbeh bil sanieh', 95, 'bulgur 200, beef_steak 250, lamb 250, onion 1.5, pine_nuts 40, baharat 1.5, cinnamon 0.5, oil 60', 'weekend', 'Syrian'],
  ['Shish barak', 135, 'plain_flour 320, lamb 320, onion 1, pine_nuts 40, baharat 1, yogurt 800, cornflour 20, egg 1, garlic 5, mint 0.5, ghee 40, long_grain_rice 240', 'weekend', 'Syrian'],
  // Turkish
  ['Lahmacun', 80, 'plain_flour 265, yeast 1, lamb_mince 265, onion 0.5, red_capsicum 0.5, tomato 0.5, pepper_paste 15, parsley 0.5, pul_biber 0.5', 'weekend oven', 'Turkish'],
  ['Mercimek çorbası', 45, 'red_lentils 250, onion 1, carrot 1, potato 1, tomato_paste 10, veg_stock 1400, butter 40, mint 0.5, paprika 1', '', 'Turkish'],
  ['Turkish mantı', 125, 'plain_flour 400, egg 1.5, lamb 240, onion 1, yogurt 400, garlic 3, butter 80, paprika 2.5, mint 0.5, sumac 1', 'weekend', 'Turkish'],
  ['İskender kebab', 60, 'lamb 700, pide 5, passata 400, butter 120, yogurt 300, onion 1, garlic 3, pepper_paste 10, oregano 1, green_capsicum 2, oil 40', 'weekend oven', 'Turkish'],
  // Yemeni
  ['Fahsa', 160, 'lamb 800, fenugreek_ground 24, tomato 3, onion 1, garlic 5, green_chilli 2.5, coriander 1, hawaij 2.5, lemon 1, flatbread 4', 'weekend', 'Yemeni'],
  ['Saltah', 130, 'fenugreek_seeds 20, lamb 600, potato 1.5, tomato 4, onion 2, garlic 6, zhug 35, egg 2, long_grain_rice 150, flatbread 4, oil 60', 'weekend', 'Yemeni'],
  ['Zurbian', 150, 'lamb 800, basmati 400, potato 2, onion 2, yogurt 200, saffron 2, tomato 2, hawaij 4, cardamom_pods 4, raisins 55, ghee 65', 'weekend', 'Yemeni'],
  ],
};
