// Adapted prep outlines, not the original methods for the lighter library recipes.
// Reviewed 2026-11-07. Quantities always remain those of the app recipe.
const task = (ingredient, action, minutes, ahead = false) => ({ ingredient, action, minutes, ahead });
export const PREP_GUIDES = {
 'air-fryer-korean-fried-chicken-lighter': {
  source: 'https://whatgreatgrandmaate.com/air-fryer-korean-fried-chicken/',
  name: 'What Great Grandma Ate: air-fryer Korean fried chicken',
  difference: 'Source uses wings and a different sauce. Your lighter boneless version needs its own cooking time; do not copy the wing timing.',
  tasks: [task('garlic','Peel and finely chop',3),task('cornflour','Measure into a labelled dry bowl',1,true),task('gochujang','Measure into a separate sauce bowl',1),task('ginger','Peel and finely chop',3),task('red_cabbage','Wash and finely slice',4),task('cucumber','Wash and cut for salad',4)],
  steps: ['Set out the coating separately from the sauce. Prepare vegetable sides before handling raw chicken.', 'On cooking day, portion the chicken with a separate board, coat just before air-frying and cook in a single layer, turning as needed. Do not crowd the basket.', 'Heat the sauce separately. Check chicken in its thickest part with a clean probe (at least 74°C), then toss with sauce just before eating so the coating stays crisp. Cook the rice and finish the sides on the day.']
 },
 'chicken-kebab-pack-with-hummus-salad': {
  source: 'https://www.astralchicken.com/recipes/turkish-chicken-kebabs-with-yoghurt-hummus/', name: 'Astral Chicken: Turkish kebabs with yoghurt hummus',
  difference: 'Source has extra marinade ingredients and grilled peppers. This is a prep outline for your library ingredients, not an exact copy.',
  tasks: [task('garlic','Peel and finely chop',3),task('cumin','Measure into a labelled dry bowl',1,true),task('smoked_paprika','Measure into a labelled dry bowl',1,true),task('cucumber','Wash and cut for salad',4),task('tomato','Wash and chop',4),task('red_onion','Peel and thinly slice for salad',3),task('parsley','Wash, dry and chop',3)],
  steps: ['Set aside the hummus and salad ingredients. Keep any yoghurt or sauce intended for serving separate from raw chicken.', 'On the cooking day, make the marinade using your chosen recipe. Cut chicken on a separate board and coat it; refrigerate while marinating. The linked source uses a 4-hour or overnight marinade, so allow that passive time if following it.', 'Grill or cook chicken until its thickest part reaches at least 74°C. Assemble with hummus and fresh salad only after the chicken is cooked. Never use raw-chicken marinade as a serving sauce.']
 },
 'chicken-pad-thai-lighter': {
  source:'https://www.recipetineats.com/chicken-pad-thai/', name:'RecipeTin Eats: Pad Thai',
  difference:'Source sauce includes sugar and oyster sauce, which are not in your lighter recipe. Follow the source for the full sauce if desired; those additions are not automatically added to groceries.',
  tasks:[task('garlic','Peel and finely chop',3),task('spring_onion','Wash and slice',3),task('peanuts','Chop for garnish',3),task('tofu','Cut into batons',4)],
  steps:['Have the sauce ingredients measured, tofu cut, peanuts chopped and spring onion ready before heating the pan. Keep egg and chicken refrigerated until needed.', 'On cooking day, prepare rice noodles for their brand and thickness just before stir-frying; do not soak a week of noodles in advance. Slice chicken separately.', 'Stir-fry garlic and chicken, scramble the egg to one side, then add noodles, tofu, sprouts and sauce. Toss until noodles absorb the sauce, then add spring onion and peanuts. Ensure chicken reaches at least 74°C and serve promptly with lime.']
 },
 'air-fryer-paneer-tikka-mint-raita': {
  source:'https://pipingpotcurry.com/paneer-tikka/',name:'Piping Pot Curry: Paneer Tikka',
  difference:'Source uses a broader spice blend. Your library uses tandoori masala. Mint raita and roti are sides in your plan, not full methods supplied by this source.',
  tasks:[task('paneer','Cut into cubes',4),task('capsicum','Wash and cut into chunks',4),task('red_onion','Peel and cut into chunks',3),task('tandoori_masala','Measure into a labelled dry bowl',1,true)],
  steps:['On cooking day, whisk yoghurt and your marinade spices, then coat cubed paneer, capsicum and onion. Keep yoghurt for serving separate. The source calls for at least 30 minutes of refrigerated marinating, up to 24 hours.', 'Arrange paneer and vegetables in a lightly greased air fryer in one layer. The source uses 180°C, turning halfway; its example is about 10 minutes total, but size and appliance change this. Check for cooked vegetables and lightly browned edges.', 'Serve promptly. Prepare the mint-yoghurt side separately using your preferred raita recipe and make or warm the roti on the day.']
 },
 'achari-paneer': {
  source:'https://www.indianhealthyrecipes.com/achari-paneer-masala-recipe/',name:"Swasthi's Recipes: Achari Paneer",
  difference:'Source includes more pickling spices, ginger, garlic and capsicum than your simplified library version. Use its full recipe for the exact flavour and ratios; no extra ingredients are silently added.',
  tasks:[task('onion','Peel and finely chop',4),task('tomato','Wash and chop',4),task('paneer','Cut into cubes',4),task('mustard_seeds','Measure into a labelled dry bowl',1,true),task('fennel_seeds','Measure into a labelled dry bowl',1,true)],
  steps:['Measure the pickling spices separately. Chop onion and tomato and cube the paneer. Whisk the yoghurt shortly before cooking.', 'Cook onion in oil until golden, add the spices without burning them, then cook the tomato down. Reduce the heat and stir in whisked yoghurt gradually to reduce splitting.', 'Simmer the gravy, add paneer near the end and heat gently; overcooking makes it chewy. Finish with kasoori methi as preferred. Make the roti separately on cooking day. Open the source for the full, different spice blend.']
 }
};
