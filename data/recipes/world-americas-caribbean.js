export default {
  cuisine: '',
  group: 'Americas & Caribbean',
  recipes: [
// world-americas-caribbean: imported from UniTools World Recipes v2.0 (CC BY-SA 4.0), adapted to Two Plates format.
// Row: [name, minutes, ingredients, tags, cuisine]. Quantities for 4 standard servings.
// See MANIFEST.json for per-dish provenance and adjustment notes.
  // American
  ['New England clam chowder', 55, 'clams 1500, bacon 120, potato 2.5, onion 1, celery 80, cream 300, milk 300, plain_flour 25, thyme 3, bay_leaf 1, butter 40', '', 'American'],
  ['Pulled pork', 630, 'pork_shoulder 1600, smoked_paprika 5, brown_sugar 5, mustard_powder 2.5, garlic 2, cayenne 0.5, mustard 3.5, vinegar 100, apple_juice 100, buns 4', 'weekend oven', 'American'],
  // Argentinian
  ['Asado', 255, 'beef_short_ribs 1250, beef_steak 750, chorizo 400, smoked_sausage 250, parsley 1, garlic 4, oregano 3, vinegar 50, oil 100, chilli_flakes 1.5, white_bread 250', 'weekend', 'Argentinian'],
  // Bolivian
  ['Pique macho', 70, 'beef_steak 700, potato 6, smoked_sausage 300, egg 4, onion 2, tomato 3, jalapeno 3, red_capsicum 1, mustard 6, mayonnaise 100, ketchup 100, oil 60', 'weekend', 'Bolivian'],
  ['Silpancho', 60, 'beef_steak 600, breadcrumbs 200, long_grain_rice 300, potato 3, egg 4, tomato 3, red_onion 1, beetroot 150, parsley 0.5, oil 120', 'weekend', 'Bolivian'],
  // Brazilian
  ['Feijoada', 220, 'black_beans 1.5, salo 200, smoked_ribs 250, smoked_sausage 150, pork_belly 150, onion 1, garlic 3, bay_leaf 1.5, orange 1, collard_greens 150, long_grain_rice 115, oil 10', 'weekend', 'Brazilian'],
  ['Moqueca baiana', 65, 'white_fish 800, prawns 240, coconut_milk 1, palm_oil 50, onion 1.5, tomato 3, red_capsicum 1.5, garlic 5, lime 2.5, coriander 1, spring_onion 3, long_grain_rice 320', 'weekend', 'Brazilian'],
  // Canadian
  ['Tourtière', 115, 'pork_mince 350, beef_mince 150, potato 1, onion 1, garlic 1.5, cinnamon 0.5, cloves 0.5, allspice 0.5, nutmeg 0.5, veg_stock 125, shortcrust 350, egg 0.5', 'weekend', 'Canadian'],
  // Chilean
  ['Curanto en olla', 100, 'mussels 1000, clams 665, pork_ribs 535, chicken_pieces 535, smoked_sausage 265, potato 2.5, plain_flour 135, onion 1.5, white_wine 165, cabbage 425, coriander 0.5, lard 40', 'weekend', 'Chilean'],
  ['Pastel de choclo', 100, 'corn_kernels 800, beef_mince 465, chicken_thigh 265, onion 2.5, egg 2, olives 30, raisins 40, basil 0.5, milk 165, butter 40, cumin 2, white_sugar 6', 'weekend', 'Chilean'],
  // Colombian
  ['Ajiaco bogotano', 100, 'chicken_pieces 535, potato 4.5, corn_kernels 300, savory 6, spring_onion 2.5, coriander 0.5, cream 135, capers 30, avocado 1.5', 'weekend', 'Colombian'],
  ['Bandeja paisa', 210, 'red_beans 1.5, pork_belly 600, beef_mince 400, chorizo 300, long_grain_rice 350, plantain 1.5, egg 4, arepa 4, avocado 2, onion 2, tomato 3, cumin 1, oil 120', 'weekend', 'Colombian'],
  ['Colombian sancocho', 140, 'chicken_pieces 1000, cassava 300, plantain 0.5, corn_kernels 225, potato 1.5, onion 1, spring_onion 2.5, tomato 2, coriander 0.5, garlic 3, cumin 0.5, anatto 0.5, long_grain_rice 200, avocado 1, oil 30', 'weekend', 'Colombian'],
  // Costa Rican
  ['Casado', 75, 'chicken_breast 600, long_grain_rice 350, black_beans 1.5, plantain 1, chayote 300, carrot 2, cabbage 200, tomato 2, worcestershire 25, lime 2, garlic 4, coriander 0.5, oil 60', 'weekend', 'Costa Rican'],
  ['Olla de carne', 215, 'beef_shin 800, cassava 335, squash 265, corn_kernels 200, plantain 1, potato 1.5, carrot 2, onion 0.5, red_capsicum 0.5, coriander 0.5, long_grain_rice 265, lime 1.5', 'weekend', 'Costa Rican'],
  // Cuban
  ['Arroz con pollo', 90, 'chicken_pieces 1000, long_grain_rice 335, beer 235, veg_stock 465, onion 1.5, red_capsicum 1.5, garlic 4, tomato_sauce 135, saffron 2, cumin 0.5, oregano 0.5, peas 135, olives 55, lime 1.5, oil 55', 'weekend', 'Cuban'],
  ['Moros y cristianos', 110, 'black_beans 1, long_grain_rice 265, onion 0.5, green_capsicum 0.5, garlic 3.5, bay_leaf 1.5, cumin 0.5, oregano 0.5, vinegar 10, oil 40', 'weekend', 'Cuban'],
  ['Ropa vieja', 175, 'beef_steak 800, onion 1.5, red_capsicum 2, garlic 4, diced_tomatoes 0.5, olives 65, capers 15, cumin 1.5, oregano 2, white_wine 100, oil 40, long_grain_rice 150', 'weekend', 'Cuban'],
  // Dominican
  ['Dominican sancocho', 165, 'beef_chunks 300, pork_shoulder 250, chicken_pieces 300, cassava 250, taro 200, sweet_potato 200, plantain 0.5, corn_kernels 150, onion 1, red_capsicum 1, coriander 0.5, garlic 4, oregano 1.5, lime 1.5, oil 30', 'weekend', 'Dominican'],
  ['Pollo guisado', 80, 'chicken_pieces 1200, white_sugar 5, lime 2.5, oregano 2.5, onion 1.5, red_capsicum 1.5, garlic 5, tomato_paste 20, potato 2, olives 50, coriander 0.5, oil 50, long_grain_rice 320', 'weekend', 'Dominican'],
  // Ecuadorian
  ['Ecuadorian ceviche', 50, 'prawns 720, red_onion 2.5, lime 6.5, orange 1.5, tomato 3, ketchup 40, mustard 2.5, coriander 1, red_chilli 1, popcorn_garnish 80, plantain_chips 120, oil 30', '', 'Ecuadorian'],
  ['Encebollado', 60, 'tuna 700, cassava 700, red_onion 2, tomato 3, lime 3, cumin 2, coriander 0.5, garlic 4, oil 40', 'weekend', 'Ecuadorian'],
  ['Fanesca', 210, 'salt_cod 280, milk 600, pumpkin 200, zucchini 1, corn_kernels 80, white_beans 0.5, lupini 60, green_lentils 60, peas 60, broad_beans 60, long_grain_rice 40, peanuts 40, onion 1, cream 100, curd_cheese 80, egg 2, anatto 1', 'weekend', 'Ecuadorian'],
  ['Llapingachos', 60, 'potato 5, curd_cheese 250, anatto 2, onion 1, peanut_butter 150, milk 250, oil 60, egg 4', 'weekend', 'Ecuadorian'],
  // Guatemalan
  ['Guatemalan tamales', 180, 'masa 350, pork_shoulder 400, lard 100, tomato 2, dried_chillies 2, pumpkin_seeds 40, sesame_seeds 20, onion 0.5, garlic 2.5, olives 30, red_capsicum 0.5', 'weekend', 'Guatemalan'],
  ['Pepián', 110, 'chicken_pieces 1000, pumpkin_seeds 80, sesame_seeds 40, dried_chillies 4, tomato 2.5, tomatillo 200, onion 0.5, garlic 3.5, potato 1.5, green_beans 135, cinnamon_stick 0.5, coriander 0.5, long_grain_rice 235', 'weekend', 'Guatemalan'],
  // Honduran
  ['Conch soup', 95, 'squid 560, coconut_milk 1, cassava 320, plantain 1, carrot 1.5, onion 1, garlic 4, red_capsicum 1, coriander 0.5, anatto 1, lime 1.5, oil 30', 'weekend', 'Honduran'],
  ['Montucas', 145, 'corn_kernels 750, chicken_thigh 400, lard 75, red_capsicum 0.5, onion 0.5, tomato 1.5, anatto 1, olives 40, capers 20, white_sugar 5', 'weekend', 'Honduran'],
  // Jamaican
  ['Jerk chicken', 150, 'chicken_pieces 1065, scotch_bonnet 2, allspice 4, spring_onion 4, thyme 5.5, ginger 20, garlic 4, soy_sauce 40, lime 1.5, brown_sugar 4, nutmeg 0.5, cinnamon 0.5, oil 40', 'weekend', 'Jamaican'],
  ['Rice and peas', 110, 'kidney_beans 0.5, long_grain_rice 335, coconut_milk 0.5, scotch_bonnet 0.5, thyme 4, spring_onion 2.5, garlic 2.5, allspice 4', 'weekend', 'Jamaican'],
  // Nicaraguan
  ['Indio viejo', 150, 'beef_brisket 800, masa 120, onion 1.5, red_capsicum 1, tomato 3, garlic 4, mint 0.5, orange_juice 120, anatto 1, oil 50', 'weekend', 'Nicaraguan'],
  ['Vigorón', 130, 'cassava 960, pork_belly 640, cabbage 400, tomato 2.5, onion 1, vinegar 80, lime 2.5, red_chilli 1', 'weekend', 'Nicaraguan'],
  // Panamanian
  ['Coconut rice', 60, 'long_grain_rice 335, coconut_milk 1.5, white_sugar 4, raisins 55', 'weekend', 'Panamanian'],
  ['Panamanian ropa vieja', 145, 'beef_steak 720, onion 1.5, red_capsicum 1.5, tomato 3.5, tomato_paste 20, garlic 5, olives 65, capers 20, cumin 1, oregano 1, coriander 0.5, oil 50, long_grain_rice 280', 'weekend', 'Panamanian'],
  ['Panamanian sancocho', 115, 'chicken_pieces 1000, taro 535, coriander 0.5, onion 1.5, garlic 4, corn_kernels 200, oregano 2, lime 1.5, long_grain_rice 235', 'weekend', 'Panamanian'],
  // Paraguayan
  ['Sopa paraguaya', 80, 'cornflour 200, brined_cheese 250, onion 2, milk 200, egg 2.5, lard 75, corn_kernels 100', 'weekend', 'Paraguayan'],
  ['Vori vori', 105, 'chicken_pieces 935, cornflour 200, brined_cheese 165, onion 1.5, red_capsicum 0.5, tomato 2, carrot 0.5, egg 0.5, anatto 0.5, oregano 0.5, parsley 0.5, oil 35', 'weekend', 'Paraguayan'],
  // Peruvian
  ['Ají de gallina', 80, 'chicken_breast 640, aji_amarillo 50, white_bread 130, milk 320, walnuts 65, parmesan 50, onion 1.5, garlic 4, turmeric 1, potato 2.5, egg 3, olives 50, long_grain_rice 280, oil 50', 'weekend', 'Peruvian'],
  ['Causa limeña', 75, 'potato 4, aji_amarillo 30, lime 2.5, oil 55, tuna_tin 265, mayonnaise 100, red_onion 0.5, avocado 1.5, egg 2, olives 40, coriander 0.5', 'weekend', 'Peruvian'],
  ['Ceviche', 20, 'white_fish 600, lime 10, red_onion 1, red_chilli 1, coriander 0.5, sweet_potato 250, corn_kernels 150', 'quick', 'Peruvian'],
  ['Lomo saltado', 40, 'beef_steak 600, red_onion 2, tomato 3, aji_amarillo 20, soy_sauce 50, vinegar 25, garlic 3, potato 3, long_grain_rice 150, oil 35', '', 'Peruvian'],
  // Trinidadian
  ['Callaloo', 80, 'spinach 400, okra 165, coconut_milk 0.5, onion 0.5, garlic 3.5, pumpkin 200, scotch_bonnet 0.5, thyme 2.5, butter 25', 'weekend', 'Trinidadian'],
  // Uruguayan
  ['Buseca', 240, 'tripe 665, white_beans 1, chorizo 165, pancetta 100, onion 1.5, carrot 2, celery 80, potato 1.5, tomato 2, vinegar 65, bay_leaf 2, paprika 2, oil 40', 'weekend', 'Uruguayan'],
  ['Chivito', 45, 'beef_steak 500, buns 4, ham 150, bacon 150, mozzarella 200, egg 4, tomato 2, cos_lettuce 0.5, olives 60, mayonnaise 100, oil 30', '', 'Uruguayan'],
  ['Milanesa a la napolitana', 55, 'beef_steak 700, egg 3, breadcrumbs 250, garlic 4, parsley 0.5, tomato_sauce 300, ham 200, mozzarella 250, oregano 1, oil 60', '', 'Uruguayan'],
  // Venezuelan
  ['Asado negro', 290, 'beef_steak 1000, brown_sugar 19, onion 1.5, red_capsicum 1, carrot 1.5, leek 75, garlic 4, tomato 2, red_wine 125, worcestershire 20, bay_leaf 1.5, oil 40, long_grain_rice 250', 'weekend', 'Venezuelan'],
  ['Hallaca', 240, 'masarepa 400, beef_steak 240, pork_shoulder 200, chicken_pieces 200, onion 1.5, red_capsicum 1, anatto 3.5, olives 60, raisins 50, capers 15, red_wine 60, lard 100, veg_stock 400', 'weekend', 'Venezuelan'],
  ['Pabellón criollo', 180, 'beef_steak 800, black_beans 1.5, long_grain_rice 350, plantain 1, onion 2, red_capsicum 2, garlic 5, tomato 3.5, cumin 1, oil 80', 'weekend', 'Venezuelan'],
  ],
};
