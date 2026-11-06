import assert from 'node:assert/strict';
import {defaultState} from './js/state.js';
import {buildGrocery, groceryText} from './js/grocery.js';
import {RECIPES,RECIPE_BY_ID,INGREDIENTS} from './js/data.js';
import {prepTasks,fitTasks} from './js/prep.js';
const s=defaultState(),r=RECIPES[0];s.plan.slots=[{id:r.id}];
const before=buildGrocery(s).shop;
s.extras=[{id:'old',name:'Milk',amount:'2 L',category:'Drinks'}];s.occasions=[{id:'party',name:'Dinner',guests:8,active:true,dishes:[{id:'dish',recipeId:r.id,servings:8}],items:[{id:'ice',name:'Ice',amount:'1 bag',dish:'Drinks'}]}];
const after=buildGrocery(s);assert(after.shop.some(x=>x.name==='Milk'&&x.text==='2 L'));assert(after.shop.some(x=>x.name==='Ice'&&x.text==='1 bag'));
for(const item of r.items){const row=[...after.shop,...after.pantry].find(x=>x.id===item.id);assert(row.dishes.some(x=>x.includes('Dinner')));}
s.occasions[0].active=false;assert(!buildGrocery(s).shop.some(x=>x.name==='Ice'));assert(groceryText(s).includes('2 L'));
s.plan.slots=[{id:'chicken-pad-thai-lighter'},{id:'chicken-kebab-pack-with-hummus-salad'}];
const tasks=prepTasks(s,'2026-11-07',s.plan.slots.map(x=>x.id));assert(tasks.find(x=>x.ingredient==='garlic').dishes.length===2);assert(!prepTasks(s,'2026-11-07',[]).length);assert(fitTasks(tasks,10).used<=10);
s.prep.dates['chicken-pad-thai-lighter']='2026-11-08';assert(!prepTasks(s,'2026-11-07',['chicken-pad-thai-lighter']).some(x=>!x.ahead));
for(const id of Object.keys((await import('./data/prep-guides.js')).PREP_GUIDES))assert(RECIPE_BY_ID[id]);
console.log('PASS: party quantities, merged provenance, extras, active toggle, copy amounts, selected prep, shared tasks, budget, date safety');
