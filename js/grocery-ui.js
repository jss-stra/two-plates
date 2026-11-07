import { RECIPES, RECIPE_BY_ID } from './data.js';
import { uid, categories } from './occasions.js';
import { getState, update } from './state.js';
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const options = value => categories.map(c=>`<option ${c===value?'selected':''}>${esc(c)}</option>`).join('');
export function extrasForm(x) {
  return `<form data-grocery-form="extra" class="feature-form"><input type="hidden" name="id" value="${esc(x?.id || '')}">
  <label>Item<input required maxlength="160" name="itemName" value="${esc(x?.name || '')}" placeholder="Milk, coffee, snacks..."></label>
  <div class="feature-grid"><label>Amount<input name="amount" maxlength="80" value="${esc(x?.amount || '')}" placeholder="2 L / 1 pack"></label><label>Section<select name="category">${options(x?.category)}</select></label></div>
  <button class="btn" type="submit">${x ? 'Save item' : 'Add item'}</button></form>`;
}
const backLink = `<button class="link" data-act="gsection" data-v="">← Shopping list</button>`;
export function renderExtrasCard(s) {
 return `<section class="card">${backLink}<h2>Beyond the recipes</h2><p class="muted">Drinks, snacks, breakfast and anything else. Kept when you change dishes or start a new week, until you remove them.</p>${extrasForm()}</section>`;
}
export function renderPartiesCard(s) {
 return `<section class="card">${backLink}<h2>Guests & parties</h2><p class="muted">What are you making, and for how many? Party ingredients join the shopping list, not your weekly meal plan.</p>
 <form class="feature-form" data-grocery-form="party"><label>Occasion<input required name="partyName" maxlength="100" placeholder="Guests for dinner"></label><label>People, including you<input required type="number" name="guests" min="1" max="200" value="4"></label><button class="btn" type="submit">Plan occasion</button></form>
 ${(s.occasions || []).map(p=>`<details class="occasion" open><summary><b>${esc(p.name)}</b> · ${p.guests} people</summary>
 <div class="btnrow"><button class="btn" data-grocery-action="toggle-party" data-id="${p.id}">${p.active?'Exclude from':'Include in'} shopping</button><button class="btn ghost" data-grocery-action="delete-party" data-id="${p.id}">Delete occasion</button></div>
 <form class="feature-form" data-grocery-form="party-meta" data-party="${p.id}"><div class="feature-grid"><label>Name<input required name="partyName" value="${esc(p.name)}"></label><label>People<input required name="guests" type="number" min="1" max="200" value="${p.guests}"></label></div><button class="btn" type="submit">Update occasion</button></form>
 <p class="fine">Headcount suggests servings for new dishes. Adjust each dish below if the menu is shared.</p><h3>What will you make?</h3><form class="feature-form" data-grocery-form="dish" data-party="${p.id}"><label>Recipe from the library<select name="recipeId">${[...RECIPES].sort((a,b)=>a.name.localeCompare(b.name)).map(r=>`<option value="${r.id}">${esc(r.name)}</option>`).join('')}</select></label><label>Servings of this dish<input required type="number" name="servings" min="1" max="200" value="${p.guests}"></label><button class="btn" type="submit">Add dish & ingredients</button></form>
 <p class="fine">Each dish has its own servings, useful for a shared menu. Amounts scale from the library's 4-serving recipes. Review before buying.</p>
 ${(p.dishes || []).map(d=>`<div class="occasion-row"><span>${esc(RECIPE_BY_ID[d.recipeId]?.name || 'Unknown dish')} · <label class="field">Servings<input class="prep-input" type="number" min="1" max="200" value="${d.servings}" data-party-servings="${p.id}" data-dish="${d.id}"></label></span><button class="link" data-grocery-action="delete-dish" data-id="${p.id}" data-child="${d.id}">Remove</button></div>`).join('')}
 <details><summary>Another dish, drinks or party extras</summary><p class="fine">For a dish outside the library, enter its ingredients and amounts from your recipe. A dish name alone cannot give reliable quantities. One ingredient per line; amount after a |, for example: flour | 500 g.</p><form class="feature-form" data-grocery-form="custom" data-party="${p.id}"><label>Dish or group<input required name="dish" placeholder="Cake / drinks" maxlength="160"></label><label>Ingredients and amounts<textarea required name="items" rows="4" placeholder="Flour | 500 g&#10;Sparkling water | 4 bottles"></textarea></label><button class="btn" type="submit">Add to shopping list</button></form></details>
 ${(p.items || []).map(x=>`<div class="occasion-row"><span>${esc(x.name)} · ${esc(x.amount)}<small>${esc(x.dish)}</small></span><button class="link" data-grocery-action="delete-item" data-id="${p.id}" data-child="${x.id}">Remove</button></div>`).join('')}
 </details>`).join('')}</section>`;
}
export function renderGroceryTools(s) {
 return renderExtrasCard(s) + renderPartiesCard(s);
}
export function editExtra(id) {
 const x = getState().extras.find(x=>x.id===id); if(!x)return;
 const target = document.querySelector(`[data-extra-editor="${CSS.escape(id)}"]`);
 if(target) { target.hidden=!target.hidden; target.innerHTML=extrasForm(x); }
}
function clearPartyChecks(d,p) {
 for(const dish of p.dishes || []) for(const item of RECIPE_BY_ID[dish.recipeId]?.items || []) { delete d.checked[item.id]; delete d.bought[item.id]; }
 for(const item of p.items || []) { delete d.checked[`p:${p.id}:${item.id}`]; delete d.bought[`p:${p.id}:${item.id}`]; }
}
export function setupGroceryEvents() {
 document.addEventListener('change',e=>{
  const el=e.target;if(!el.dataset.partyServings)return;const n=Number(el.value);if(!Number.isFinite(n)||n<1||n>200)return;
  update(d=>{const p=d.occasions.find(x=>x.id===el.dataset.partyServings);if(!p)return;clearPartyChecks(d,p);const dish=p.dishes.find(x=>x.id===el.dataset.dish);if(dish)dish.servings=n;});
 });
 document.addEventListener('click',e=>{
  const el=e.target.closest('[data-grocery-action]'); if(!el)return;
  const a=el.dataset.groceryAction,id=el.dataset.id;
  if(a==='edit-extra') { editExtra(id); return; }
  if(a==='delete-party' && !confirm('Delete this occasion and remove its ingredients from shopping?'))return;
  update(d=>{
   const p=d.occasions.find(p=>p.id===id);
   if(!p)return;clearPartyChecks(d,p);
   if(a==='toggle-party')p.active=!p.active;
   if(a==='delete-party')d.occasions=d.occasions.filter(x=>x.id!==id);
   if(a==='delete-dish')p.dishes=p.dishes.filter(x=>x.id!==el.dataset.child);
   if(a==='delete-item')p.items=p.items.filter(x=>x.id!==el.dataset.child);
  });
 });
 document.addEventListener('submit',e=>{
  const f=e.target,kind=f.dataset.groceryForm;if(!kind)return;e.preventDefault();
  const v=Object.fromEntries(new FormData(f));
  update(d=>{
   if(kind==='extra'){
    const x={id:v.id || uid(),name:v.itemName.trim(),amount:v.amount.trim(),category:v.category};
    if(!x.name)return;
    delete d.checked[`x:${x.id}`];delete d.bought[`x:${x.id}`];
    const i=d.extras.findIndex(y=>y.id===x.id);if(i<0)d.extras.push(x);else d.extras[i]=x;
   }
   if(kind==='party')d.occasions.push({id:uid(),name:v.partyName.trim(),guests:Number(v.guests),active:true,dishes:[],items:[]});
   const p=d.occasions.find(p=>p.id===f.dataset.party);if(!p)return;clearPartyChecks(d,p);
   if(kind==='party-meta'){p.name=v.partyName.trim();p.guests=Number(v.guests);}
   if(kind==='dish' && RECIPE_BY_ID[v.recipeId])p.dishes.push({id:uid(),recipeId:v.recipeId,servings:Number(v.servings)});
   if(kind==='custom')for(const line of v.items.split('\n').filter(x=>x.trim())){const [name,...amount]=line.split('|');if(name.trim())p.items.push({id:uid(),name:name.trim().slice(0,160),amount:amount.join('|').trim().slice(0,80),dish:v.dish.trim()});}
  });
 });
}
