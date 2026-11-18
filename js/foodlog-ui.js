// The "Add food" sheet on the Today tab: search → pick → say the exact
// portion (live protein / kcal / carbs / fibre) → add to the meal. Also the
// "Something else" form for eating out or a packaged food's label numbers.
//
// State lives in ui.food while the sheet is open:
//   { meal, step: 'search'|'portion'|'own', query, item, edit }
//   item = the item being built (see js/nutrition.js); edit = index when
//   changing an item already logged.
import { RECIPES } from './data.js';
import { dishById, customDishList } from './custom.js';
import { plannedFor } from './planner.js';
import { FOODS, FOOD_GROUPS } from '../data/foods.js';
import {
  MEAL_KEYS, itemNutrition, itemLabel, macroText, recentItems, searchFoods, fmtAmount,
} from './nutrition.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const mealLabel = (k) => MEAL_KEYS.find(([m]) => m === k)?.[1] || 'Meal';
const DISH_PRESETS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const COUNT_PRESETS = [0.5, 1, 2, 3];

// A fresh item for a dish or food, at a sensible starting portion: the
// person's usual plate for a dish, one standard portion for a food.
export function newItem(t, id, person) {
  if (t === 'dish') return { t, id, s: Math.round((Number(person?.portion) || 1) * 4) / 4 || 1 };
  const f = FOODS[id];
  return { t: 'food', id, n: 1, u: f?.portions[0][0] || 'g' };
}

function previewHtml(s, item) {
  const nu = itemNutrition(s, item);
  if (!nu.known) {
    return `<p class="fine"><b>No nutrition info for this dish.</b> It's logged, but not counted in your totals. To count it, go back and use <b>Something else</b> to type the numbers in.</p>`;
  }
  const r = (x) => (x == null ? '–' : Math.round(x).toLocaleString('en-AU'));
  return `<div class="nu-grid">
    <div><b>${r(nu.protein)}</b><span>g protein</span></div>
    <div><b>${r(nu.kcal)}</b><span>kcal</span></div>
    <div><b>${r(nu.carbs)}</b><span>g carbs</span></div>
    <div><b>${r(nu.fibre)}</b><span>g fibre</span></div>
  </div>`;
}

// Live refresh while typing an amount (no re-render, so the keyboard stays up).
export function refreshPreview(s, ui) {
  const box = document.getElementById('fprev');
  if (box && ui.food?.item) box.innerHTML = previewHtml(s, ui.food.item);
  const cur = ui.food?.item?.t === 'dish' ? ui.food.item.s : ui.food?.item?.n;
  document.querySelectorAll('[data-act="food-preset"]').forEach((b) => b.classList.toggle('on', Number(b.dataset.v) === cur));
}

function row(s, t, id, extra = '') {
  if (t === 'dish') {
    const r = dishById(s, id);
    if (!r) return '';
    const per = itemNutrition(s, { t, id, s: 1 });
    return `<button class="pick" data-act="food-pick" data-t="dish" data-id="${esc(id)}">
      <span class="rname">${esc(r.name)}${extra}</span>
      <span class="meta">${per.known ? `1 serving: ${esc(macroText(per, { short: true }))}` : 'no nutrition info'}</span></button>`;
  }
  const f = FOODS[id];
  if (!f) return '';
  const [label, g] = f.portions[0];
  const per = itemNutrition(s, { t: 'food', id, n: 1, u: label });
  return `<button class="pick" data-act="food-pick" data-t="food" data-id="${esc(id)}">
    <span class="rname">${esc(f.name)}${extra}</span>
    <span class="meta">1 ${esc(label)} (${g} ${f.unit}): ${esc(macroText(per, { short: true }))}</span></button>`;
}

function recentRow(s, it, k) {
  const { name, portion } = itemLabel(s, it);
  return `<button class="pick" data-act="food-recent" data-k="${k}">
    <span class="rname">${esc(name)}</span>
    <span class="meta">last time ${esc(portion || 'as typed')} · ${esc(macroText(itemNutrition(s, it), { short: true }))}</span></button>`;
}

export function renderFoodList(s, ui, today) {
  const el = document.getElementById('food-list');
  const fo = ui.food;
  if (!el || !fo) return;
  const q = (fo.query || '').trim().toLowerCase();
  const p = ui.logPerson;
  const planned = [...new Set(plannedFor(s, ui.logDate))].filter((id) => dishById(s, id));
  const own = `<button class="pick own-pick" data-act="food-own"><span class="rname">+ Something else${q ? ` - “${esc(fo.query.trim())}”` : ''}</span>
    <span class="meta">Eating out or a packaged food: type the name, and the label's numbers if you have them</span></button>`;
  let html = '';
  if (!q) {
    fo.recent = recentItems(s, p, fo.meal, { today });
    if (fo.recent.length) html += `<div class="fine count">Recent</div>${fo.recent.map((it, k) => recentRow(s, it, k)).join('')}`;
    if (planned.length) html += `<div class="fine count">This week's dishes</div>${planned.map((id) => row(s, 'dish', id)).join('')}`;
    html += own;
    for (const [g, label] of Object.entries(FOOD_GROUPS)) {
      const ids = Object.keys(FOODS).filter((id) => FOODS[id].group === g);
      html += `<div class="fine count">${esc(label)}</div>${ids.map((id) => row(s, 'food', id)).join('')}`;
    }
  } else {
    const words = q.split(/\s+/);
    const hit = (txt) => words.every((w) => txt.toLowerCase().includes(w));
    const plannedSet = new Set(planned);
    const dishes = [
      ...planned.filter((id) => hit(dishById(s, id).name)),
      ...customDishList(s).filter((r) => !plannedSet.has(r.id) && hit(r.name)).map((r) => r.id),
      ...RECIPES.filter((r) => !plannedSet.has(r.id) && hit(`${r.name} ${r.cuisine}`)).map((r) => r.id),
    ].slice(0, 25);
    const foods = searchFoods(q).slice(0, 25);
    if (foods.length) html += `<div class="fine count">Everyday foods</div>${foods.map((f) => row(s, 'food', f.id)).join('')}`;
    if (dishes.length) html += `<div class="fine count">Dishes</div>${dishes.map((id) => row(s, 'dish', id, plannedSet.has(id) ? ' <span class="badge reg">this week</span>' : '')).join('')}`;
    if (!foods.length && !dishes.length) html += '<p class="empty">Nothing by that name.</p>';
    html += own;
  }
  el.innerHTML = html;
}

export function renderFoodSheet(el, s, ui, icon, today) {
  const fo = ui.food;
  const meal = mealLabel(fo.meal);
  const close = `<button class="act icon-only" data-act="food-close" aria-label="Close">${icon('x')}</button>`;
  const person = s.people[ui.logPerson];
  if (fo.step === 'search') {
    el.innerHTML = `<div class="backdrop" data-act="food-close"></div>
    <div class="sheet" role="dialog" aria-label="Add to ${esc(meal)}">
      <header><div><div class="fine">${esc(person?.name || '')}</div><h2>Add to ${esc(meal.toLowerCase())}</h2></div>${close}</header>
      <div class="searchbar">${icon('search')}<input id="fq" type="search" placeholder="Search foods or dishes (roti, banana, paneer…)" value="${esc(fo.query)}" autocomplete="off"></div>
      <div id="food-list" class="sheet-list"></div>
    </div>`;
    renderFoodList(s, ui, today);
    return;
  }
  if (fo.step === 'own') {
    const it = fo.item || {};
    const n = (id, label, v, unit) => `<label class="field"><span>${label}</span><input id="${id}" type="number" inputmode="decimal" min="0" step="any" value="${v ?? ''}" placeholder="${unit}"></label>`;
    el.innerHTML = `<div class="backdrop" data-act="food-close"></div>
    <div class="sheet" role="dialog" aria-label="Something else">
      <header><div><div class="fine">${esc(meal)}</div><h2>Something else</h2></div>${close}</header>
      <div class="sheet-body">
        <label class="field"><span>What was it?</span><input id="on" type="text" value="${esc(it.name || fo.query || '')}" placeholder="e.g. Subway 6-inch chicken, protein bar" autocomplete="off"></label>
        <p class="fine">Numbers for the whole amount you ate - from the pack, the menu or your nutrition app. Leave blank what you don't know; blank isn't counted as zero.</p>
        <div class="grid2">
          ${n('op', 'Protein (g)', it.p, 'g')}${n('ok', 'Calories (kcal)', it.kcal, 'kcal')}
          ${n('oc', 'Carbs (g)', it.c, 'g')}${n('of', 'Fibre (g)', it.fi, 'g')}
        </div>
        <button class="btn primary wide" data-act="food-save-own">${fo.edit != null ? 'Save changes' : `Add to ${esc(meal.toLowerCase())}`}</button>
        ${fo.edit != null ? '' : `<button class="link" data-act="food-back">‹ Back to search</button>`}
      </div>
    </div>`;
    return;
  }
  // Portion step
  const it = fo.item;
  const isDish = it.t === 'dish';
  const r = isDish ? dishById(s, it.id) : null;
  const f = isDish ? null : FOODS[it.id];
  const name = isDish ? r?.name : f?.name;
  const cur = isDish ? it.s : it.n;
  const presets = isDish ? DISH_PRESETS : (it.u === 'g' || it.u === 'ml') ? [] : COUNT_PRESETS;
  const usual = Math.round((Number(person?.portion) || 1) * 4) / 4;
  const per = isDish ? itemNutrition(s, { t: 'dish', id: it.id, s: 1 }) : null;
  const unitSel = isDish ? '<span class="unit-fixed">servings</span>'
    : `<select id="fu" aria-label="Unit">${f.portions.map(([l, g]) => `<option value="${esc(l)}" ${it.u === l ? 'selected' : ''}>${esc(l)} (${g} ${f.unit})</option>`).join('')}
        <option value="${f.unit}" ${it.u === f.unit ? 'selected' : ''}>${f.unit === 'ml' ? 'millilitres (ml)' : 'grams (g)'}</option></select>`;
  el.innerHTML = `<div class="backdrop" data-act="food-close"></div>
  <div class="sheet" role="dialog" aria-label="How much ${esc(name || '')}">
    <header><div><div class="fine">${esc(meal)}</div><h2>${esc(name || 'Not available')}</h2></div>${close}</header>
    <div class="sheet-body">
      <div class="field"><span>How much did ${esc(person?.name || 'you')} eat?</span>
        <div class="portion-row">
          <button class="act icon-only" data-act="food-step" data-d="-1" aria-label="Less">${icon('minus')}</button>
          <input id="fa" type="number" inputmode="decimal" min="0" step="${isDish ? 0.25 : (it.u === 'g' || it.u === 'ml') ? 10 : 0.5}" value="${cur}" aria-label="Amount">
          <button class="act icon-only" data-act="food-step" data-d="1" aria-label="More">${icon('plus')}</button>
          ${unitSel}
        </div>
      </div>
      ${presets.length ? `<div class="chips">${presets.map((v) => `<button class="chip ${v === cur ? 'on' : ''}" data-act="food-preset" data-v="${v}">${fmtAmount(v)}${isDish && v === usual ? ' · usual' : ''}</button>`).join('')}</div>` : ''}
      ${isDish ? `<p class="fine">1 serving = a quarter of the recipe as written${per?.known ? ` (${esc(macroText(per))})` : ''}. ${esc(person?.name || 'Your')}'s usual plate is ${fmtAmount(usual)} (Settings → People → Portion size).</p>`
        : `<p class="fine">Typical values${f.group === 'snacks' || f.id === 'whey' ? ' - packs vary, the label wins' : ''}. Switch to ${f.unit === 'ml' ? 'ml' : 'grams'} if you weighed it.</p>`}
      <div id="fprev" class="nu-preview" aria-live="polite">${previewHtml(s, it)}</div>
      <button class="btn primary wide" data-act="food-save">${fo.edit != null ? 'Save changes' : `Add to ${esc(meal.toLowerCase())}`}</button>
      ${fo.edit != null ? '' : `<button class="link" data-act="food-back">‹ Back to search</button>`}
    </div>
  </div>`;
}
