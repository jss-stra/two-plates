export default {
  cuisine: '',
  group: 'East Asian',
  recipes: [
// world-east-asian: imported from UniTools World Recipes v2.0 (CC BY-SA 4.0), adapted to Two Plates format.
// Row: [name, minutes, ingredients, tags, cuisine]. Quantities for 4 standard servings.
// See MANIFEST.json for per-dish provenance and adjustment notes.
  // Burmese
  ['Lahpet thoke', 35, 'teapaste 150, peanuts 80, broad_beans 60, sesame_seeds 40, garlic 6, tomato 2, cabbage 200, red_chilli 2, lime 2, fish_sauce 25, oil 60', '', 'Burmese'],
  ['Mohinga', 120, 'catfish 535, rice_noodles 335, lemongrass 2, ginger 25, garlic 4, onion 2, cornflour 40, besan 25, fish_sauce 40, turmeric 1.5, paprika 2, egg 4, split_peas 65, coriander 0.5, lime 2, oil 65', 'weekend', 'Burmese'],
  ['Ohn no khao swe', 80, 'egg_noodles 400, chicken_thigh 560, coconut_milk 1, besan 50, onion 2.5, garlic 5, ginger 25, turmeric 1.5, paprika 2.5, fish_sauce 30, egg 4, lime 2.5, chilli_flakes 1.5, oil 80', 'weekend', 'Burmese'],
  ['Shan noodles', 70, 'rice_noodles 400, chicken_mince 500, tomato 5, shallot 5, garlic 6, paprika 3, turmeric 1, fish_sauce 35, pickled_greens 150, peanuts 80, spring_onion 4, coriander 0.5, oil 80, lime 2', 'weekend', 'Burmese'],
  // Chinese
  ['Cantonese steamed fish', 35, 'white_fish 800, ginger 60, spring_onion 6, soy_sauce 60, white_sugar 1, oil 60, coriander 0.5, shaoxing 25', '', 'Chinese'],
  ['Gong bao chicken', 35, 'chicken_breast 500, egg_whites 30, cornflour 25, peanuts 80, dried_chillies 8, sichuan_pepper 1, vinegar 35, soy_sauce 25, white_sugar 2, garlic 3, ginger 15, spring_onion 4, oil 35', '', 'Chinese'],
  ['Hong shao rou', 110, 'pork_belly 900, white_sugar 12.5, soy_sauce 60, dark_soy 10, shaoxing 100, ginger 40, spring_onion 4, star_anise 2, cinnamon_stick 1, oil 30, long_grain_rice 350', 'weekend', 'Chinese'],
  ['Jiaozi dumplings', 75, 'plain_flour 400, pork_mince 400, chinese_cabbage 400, spring_onion 4, ginger 20, soy_sauce 25, sesame_oil 10, veg_stock 80, oil 35', 'weekend', 'Chinese'],
  ['Mapo tofu', 30, 'silken_tofu 500, pork_mince 150, chilli_bean_paste 25, fermented_black_beans 10, sichuan_pepper 1, garlic 3, ginger 15, veg_stock 250, cornflour 10, spring_onion 3, oil 35', '', 'Chinese'],
  ['Yangzhou fried rice', 25, 'long_grain_rice 230, egg 4, prawns 150, ham 100, peas 100, carrot 1, spring_onion 3, shaoxing 10, soy_sauce 10, oil 35', 'quick', 'Chinese'],
  // Filipino
  ['Chicken adobo', 60, 'chicken_thigh 1000, soy_sauce 120, vinegar 120, garlic 10, bay_leaf 4, peppercorns 1, white_sugar 3, oil 25, long_grain_rice 150', 'weekend', 'Filipino'],
  ['Kare-kare', 240, 'oxtail 1000, peanut_butter 165, long_grain_rice 305, anatto 4, onion 1.5, garlic 4, eggplant 1.5, yard_long_beans 135, bok_choy 200, banana_blossom 135, shrimp_paste 100, oil 40', 'weekend', 'Filipino'],
  ['Sinigang', 95, 'pork_ribs 535, tamarind 30, onion 0.5, tomato 2, daikon 135, taro 200, green_beans 100, eggplant 0.5, spinach 100, green_chilli 1.5, fish_sauce 25', 'weekend', 'Filipino'],
  // Indonesian
  ['Nasi goreng', 35, 'long_grain_rice 230, chicken_breast 250, prawns 150, shallot 4, garlic 4, red_chilli 3, shrimp_paste 5, kecap_manis 35, egg 4, cabbage 150, oil 50', '', 'Indonesian'],
  ['Rendang', 270, 'beef_shin 800, coconut_milk 2, shallot 5.5, garlic 4, dried_chillies 6.5, galangal 25, ginger 20, turmeric 6.5, lemongrass 2, lime_leaves 4, desiccated_coconut 40', 'weekend', 'Indonesian'],
  ['Sate ayam', 65, 'chicken_thigh 720, kecap_manis 80, peanuts 200, shallot 4, garlic 5, red_chilli 2.5, coriander_powder 1.5, turmeric 1, tamarind 20, brown_sugar 5, lime 1.5, oil 50, long_grain_rice 320', 'weekend', 'Indonesian'],
  ['Soto ayam', 95, 'chicken_pieces 1120, shallot 6.5, garlic 5, turmeric 12, ginger 25, walnuts 15, lemongrass 2.5, lime_leaves 5, glass_noodles 120, egg 4, bean_sprouts 160, cabbage 160, lime 2.5, oil 80', 'weekend', 'Indonesian'],
  // Japanese
  ['Gyudon', 25, 'beef_steak 600, onion 2, dashi 400, soy_sauce 70, mirin 70, sake 50, white_sugar 6, ginger 20, long_grain_rice 305', 'quick', 'Japanese'],
  ['Katsudon', 40, 'pork_loin 600, plain_flour 80, egg 8, panko 160, onion 2, dashi 400, soy_sauce 70, mirin 70, white_sugar 6, long_grain_rice 305, oil 60', '', 'Japanese'],
  ['Miso soup', 20, 'kombu 2, bonito_flakes 15, miso 50, tofu 200, wakame 10, spring_onion 2', 'quick', 'Japanese'],
  ['Nikujaga', 55, 'beef_steak 300, potato 3.5, onion 2, carrot 1, dashi 400, soy_sauce 60, mirin 60, sake 40, white_sugar 3, shirataki 200, oil 20, green_beans 100', '', 'Japanese'],
  ['Okonomiyaki', 50, 'cabbage 500, plain_flour 150, taro 100, dashi 120, egg 4, pork_belly 200, spring_onion 4, panko 40, oil 35', '', 'Japanese'],
  ['Shoyu ramen', 210, 'chicken_carcass 1500, pork_belly 500, kombu 2, mushrooms 20, soy_sauce 200, mirin 60, sake 60, ginger 30, garlic 4, ramen 500, egg 4, spring_onion 4, sesame_oil 25', 'weekend', 'Japanese'],
  ['Tempura', 45, 'prawns 360, sweet_potato 125, eggplant 0.5, pumpkin 125, red_capsicum 0.5, plain_flour 150, cornflour 50, egg 1, dashi 200, soy_sauce 50, mirin 50, oil 60', '', 'Japanese'],
  // Khmer
  ['Fish amok', 60, 'white_fish 600, coconut_milk 1, coconut_cream 100, lemongrass 3, galangal 30, turmeric 10, lime_leaves 6, shallot 4, garlic 5, egg 2, fish_sauce 25, brown_sugar 3, spinach 150', 'weekend', 'Khmer'],
  ['Lok lak', 40, 'beef_steak 600, oyster_sauce 25, soy_sauce 25, garlic 5, white_sugar 3, pepper 2, lime 3, cos_lettuce 0.5, tomato 3, cucumber 1, red_onion 1, egg 4, oil 40', '', 'Khmer'],
  ['Num banh chok', 85, 'rice_noodles 400, white_fish 560, coconut_milk 1, lemongrass 3, galangal 30, turmeric 12, lime_leaves 5, fish_sauce 30, banana_blossom 160, bean_sprouts 160, cucumber 1.5, yard_long_beans 120, mint 0.5, basil 0.5, coriander 0.5, waterlily 120', 'weekend', 'Khmer'],
  ['Samlor korko', 90, 'pork_shoulder 335, long_grain_rice 40, lemongrass 2, galangal 20, turmeric 6.5, garlic 3.5, fish_sauce 30, pumpkin 200, green_papaya 200, eggplant 0.5, yard_long_beans 100, spinach 100, brown_sugar 2, oil 40', 'weekend', 'Khmer'],
  // Korean
  ['Bibimbap', 60, 'short_grain_rice 230, beef_steak 250, spinach 200, bean_sprouts 150, carrot 1, mushrooms 150, egg 4, gochujang 50, sesame_oil 35, soy_sauce 25, garlic 3', 'weekend', 'Korean'],
  ['Galbijjim', 165, 'beef_short_ribs 1200, soy_sauce 120, apple 1, onion 1, garlic 8, ginger 25, white_sugar 7, sesame_oil 20, mirin 50, carrot 1.5, daikon 240, mushrooms 120, chestnuts 120, dates 65, spring_onion 2.5', 'weekend', 'Korean'],
  ['Kimchi jjigae', 40, 'kimchi 400, pork_belly 300, tofu 300, onion 1, gochugaru 3, gochujang 10, garlic 3, veg_stock 700, spring_onion 3, sesame_oil 10', '', 'Korean'],
  ['Samgyetang', 105, 'chicken_pieces 600, sticky_rice 200, ginseng 20, dates 80, garlic 16, chestnuts 80, spring_onion 4', 'weekend', 'Korean'],
  // Lao
  ['Larb', 45, 'pork_shoulder 600, sticky_rice 35, fish_sauce 50, lime 4, chilli_flakes 2, shallot 4, spring_onion 4, mint 1, coriander 0.5, cos_lettuce 1', '', 'Lao'],
  ['Tam mak hoong', 25, 'green_papaya 600, fish_sauce 50, lime 3, garlic 4, scotch_bonnet 6, cherry_tomatoes 150, yard_long_beans 100, brown_sugar 3, eggplant 0.5', 'quick', 'Lao'],
  // Malaysian
  ['Char kway teow', 35, 'rice_noodles 800, prawns 400, clams 300, smoked_sausage 160, egg 4, bean_sprouts 300, chives 120, garlic 8, dark_soy 25, soy_sauce 50, sambal 25, lard 70, white_sugar 2', '', 'Malaysian'],
  ['Laksa lemak', 60, 'rice_noodles 400, prawns 300, tofu_puffs 150, coconut_milk 1, veg_stock 800, lemongrass 3, galangal 30, dried_chillies 8, shallot 6, shrimp_paste 10, turmeric 2, oil 80', 'weekend', 'Malaysian'],
  // Mongolian
  ['Buuz', 95, 'plain_flour 400, mutton 535, lard 100, onion 1.5, garlic 2.5', 'weekend', 'Mongolian'],
  ['Tsuivan', 95, 'plain_flour 400, mutton 500, onion 2, carrot 2, cabbage 250, potato 2, lard 80, garlic 4', 'weekend', 'Mongolian'],
  // Singaporean
  ['Chilli crab', 55, 'crab 1500, ketchup 150, sambal 35, red_chilli 4, garlic 8, ginger 40, egg 2, white_sugar 6, rice_vinegar 25, veg_stock 300, cornflour 25, mantou 8, oil 80, coriander 0.5', '', 'Singaporean'],
  ['Katong laksa', 105, 'rice_noodles 400, prawns 500, clams 300, coconut_milk 1, dried_chillies 12, shallot 8, garlic 5, lemongrass 3, galangal 30, turmeric 10, shrimp_paste 10, walnuts 25, dried_shrimp 40, thai_basil 0.5, bean_sprouts 150, oil 120', 'weekend', 'Singaporean'],
  // Taiwanese
  ['Lu rou fan', 125, 'pork_belly 700, shallot 6, soy_sauce 100, dark_soy 10, shaoxing 80, white_sugar 7.5, five_spice 1, star_anise 2, garlic 5, egg 4, long_grain_rice 400, bok_choy 300, oil 40', 'weekend', 'Taiwanese'],
  ['Taiwanese beef noodle soup', 175, 'beef_shin 1000, egg_noodles 400, chilli_bean_paste 35, soy_sauce 100, shaoxing 100, ginger 50, garlic 8, tomato 3, star_anise 3, cinnamon_stick 1, white_sugar 7.5, bok_choy 300, pickled_greens 100, spring_onion 4, oil 60', 'weekend', 'Taiwanese'],
  // Vietnamese
  ['Bún chả', 70, 'pork_belly 400, pork_mince 400, rice_noodles 400, fish_sauce 100, white_sugar 12, lime 3, garlic 8, shallot 4, green_papaya 200, carrot 1, red_chilli 2, mint 1, coriander 1, cos_lettuce 0.5, pepper 1', 'weekend', 'Vietnamese'],
  ['Phở bò', 270, 'beef_bones 1500, beef_brisket 500, beef_steak 200, onion 2, ginger 80, star_anise 4, cinnamon_stick 1, cloves 4, coriander_powder 3, fish_sauce 60, white_sugar 3, rice_noodles 400', 'weekend', 'Vietnamese'],
  ],
};
