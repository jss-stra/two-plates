import { PREP_GUIDES } from '../data/prep-guides.js';
import { INGREDIENTS, RECIPE_BY_ID } from './data.js';
import { planRecipes, localISO } from './planner.js';
import { scaleFactor, formatQty, qtyText } from './grocery.js';
import { update } from './state.js';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SAFETY='https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/poultry-and-raw-meat';
export function prepTasks(s, day, selected = []) {
 const tasks=new Map(),factor=scaleFactor(s);
 for(const r of planRecipes(s).filter(r => selected.includes(r.id))){
  const guide=PREP_GUIDES[r.id];if(!guide)continue;
  for(const t of guide.tasks){
   const item=r.items.find(x=>x.id===t.ingredient);if(!item)continue;
   // Only dry measuring is offered before the chosen cook day. No arbitrary multi-day shelf life.
   if(!t.ahead && (s.prep?.dates?.[r.id] || day)!==day)continue;
   const key=`${t.ingredient}:${t.action}`;
   const row=tasks.get(key)||{key,ingredient:t.ingredient,action:t.action,minutes:t.minutes,qty:0,dishes:[],ahead:t.ahead};
   row.qty+=item.qty*factor;row.dishes.push(r.name);tasks.set(key,row);
  }
 }
 return [...tasks.values()].map(t=>({...t,minutes:Number(s.prep?.minutes?.[t.key]) || t.minutes,done:!!s.prep?.done?.[`${day}:${s.plan.weekOf}:${s.plan.slots.map(x=>x.id).join(',')}:${t.key}`]}));
}
export function fitTasks(tasks,budget){let left=budget;const now=[],later=[];for(const t of tasks){if(t.done)continue;if(t.minutes<=left){now.push(t);left-=t.minutes;}else later.push(t);}return {now,later,used:budget-left};}
export function renderPrep(s,view){
 const allRecipes=planRecipes(s), recipes=allRecipes.filter(r=>(view.prepSelected||[]).includes(r.id)),day=view.prepDay||localISO(),budget=view.prepBudget||20,tasks=prepTasks(s,day,view.prepSelected||[]),fit=fitTasks(tasks,budget);
 if (!recipes.length) return `<section class="card"><button class="link" data-act="tab" data-tab="week">← Week</button><h2>What do you want to prep?</h2><p class="muted">Tick the dishes you want to work on. We'll only plan tasks for those.</p>${allRecipes.map(r=>`<label class="toggle prep-choice"><input type="checkbox" data-prep-select="${r.id}"><span>${esc(r.name)}</span></label>`).join('')}</section>`;
 const row=(t)=>`<div class="prep-task ${t.done?'done':''}"><label class="toggle"><input type="checkbox" data-prep-done="${esc(t.key)}" ${t.done?'checked':''}><span><b>${esc(t.action)}: ${esc(INGREDIENTS[t.ingredient].name)}</b> · ${qtyText(formatQty(INGREDIENTS[t.ingredient],t.qty))}</span></label><p class="fine">${esc(t.dishes.join(' · '))}${t.dishes.length>1?' · shared prep, split into labelled recipe portions':''}</p><label class="field">Your estimated active minutes<input class="prep-input" type="number" min="1" max="180" value="${t.minutes}" data-prep-minutes="${esc(t.key)}"></label></div>`;
 return `<section class="card"><button class="link" data-act="tab" data-tab="week">← Week</button><h2>Prep around your day</h2><p class="muted">Tick only the dishes you want to work on. Then choose the time you have.</p><h3>Choose dishes · ${recipes.length} of ${allRecipes.length}</h3>${allRecipes.map(r=>`<label class="toggle prep-choice"><input type="checkbox" data-prep-select="${r.id}" ${recipes.some(x=>x.id===r.id)?'checked':''}><span>${esc(r.name)}</span></label>`).join('')}<div class="feature-form feature-grid"><label>Prep day<input type="date" data-prep-view="prepDay" value="${day}"></label><label>Active time (minutes)<input type="number" data-prep-view="prepBudget" min="5" max="480" value="${budget}" step="5"><span class="fine">60 minutes = 1 hour</span></label></div><p class="fine">Minute values are editable planning estimates, not tested recipe timings. Budget covers the selected prep tasks only, not cooking, marinating or cleanup. Larger batches may take longer.</p></section>
 <section class="card"><h2>When will you cook?</h2><p class="fine">Fresh prep is offered only on that dish's cook day (today by default). Dry measuring can be done earlier. This avoids claiming a whole week's chopped food or raw chicken will keep safely.</p>${recipes.map(r=>`<label class="field">${esc(r.name)}<input class="prep-input" type="date" data-prep-date="${r.id}" value="${s.prep?.dates?.[r.id]||day}"></label>`).join('')}</section>
 <section class="card"><h2>Do now · about ${fit.used} active minutes</h2><p class="fine">Matching ingredients with the same preparation are grouped once across dishes. Keep different sauces, spice blends and raw proteins separate.</p>${fit.now.map(row).join('')||'<p class="muted">No tasks fit yet. Check cook dates, increase your time, or all available tasks are ticked.</p>'}${tasks.filter(t=>t.done).map(row).join('')}</section>
 ${fit.later.length?`<section class="card"><h2>Next session</h2>${fit.later.map(row).join('')}</section>`:''}
 <section class="card"><h2>Dish steps & cooking-day finish</h2><p class="fine">First-version coverage: ${recipes.filter(r=>PREP_GUIDES[r.id]).length} of ${recipes.length} planned dishes. These are adapted method outlines from linked recipes, not verified original methods for the app's lighter variants. Grocery quantities stay unchanged.</p>${recipes.map(r=>{const g=PREP_GUIDES[r.id];return `<details class="occasion"><summary><b>${esc(r.name)}</b>${g?'':' · method not reviewed'}</summary>${g?`<p class="fine">${esc(g.difference)}</p><ol>${g.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol><a class="link" href="${g.source}" target="_blank" rel="noopener">${esc(g.name)} ↗</a>`:'<p class="muted">No sourced method for this dish yet. No cooking steps or task timings have been invented.</p>'}</details>`;}).join('')}</section>
 <section class="card"><h2>Keep it safe</h2><p class="fine">Keep cold food below 5°C. Prepare ready-to-eat vegetables before raw meat; use separate boards and utensils. Never wash raw chicken. Freeze raw meat/poultry if it will not be used within 2 days; thaw in the fridge, not on the bench. This planner does not extend storage life or override use-by labels.</p><p class="fine">Cook chicken to at least 74°C in the thickest part with a clean probe. Refrigerate cooked meals within 2 hours. This first version does not plan a week of cooked rice, pre-cooked meat or long-term fresh prep.</p><a class="link" href="${SAFETY}" target="_blank" rel="noopener">NSW Food Authority: storage & handling ↗</a><br><a class="link" href="https://www.foodauthority.nsw.gov.au/retail/cafes-restaurants-and-retail-outlets/food-safety-takeaway-chicken-shops" target="_blank" rel="noopener">Chicken temperature guidance ↗</a></section>`;
}
export function setupPrepEvents(view,render,getState){
 document.addEventListener('change',e=>{const el=e.target;
 if(el.dataset.prepSelect){const set=new Set(view.prepSelected||[]);el.checked?set.add(el.dataset.prepSelect):set.delete(el.dataset.prepSelect);view.prepSelected=[...set];render();return;}
 if(el.dataset.prepView==='prepBudget' && (!Number.isFinite(Number(el.value)) || Number(el.value)<5 || Number(el.value)>480))return;
 if(el.dataset.prepView){view[el.dataset.prepView]=el.dataset.prepView==='prepBudget'?Number(el.value):el.value;render();}
 if(el.dataset.prepDate)update(d=>{d.prep.dates[el.dataset.prepDate]=el.value;});
 if(el.dataset.prepMinutes){const n=Number(el.value);if(n>0&&n<=180)update(d=>{d.prep.minutes[el.dataset.prepMinutes]=n;});}
 if(el.dataset.prepDone)update(d=>{const day=view.prepDay||localISO();d.prep.done[`${day}:${d.plan.weekOf}:${d.plan.slots.map(x=>x.id).join(',')}:${el.dataset.prepDone}`]=el.checked;});
 });
}
