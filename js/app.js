import { RECIPES, RECIPE_BY_ID, GROUPS, INGREDIENTS, DIET_LABEL, PROTEIN_LABEL, youtubeUrl, isVeg, BASE_SERVINGS, DATA_ERRORS } from './data.js';
import { getState, update, onChange, defaultState, replaceState } from './state.js';
import { generateSlots, planRecipes, alternatives, randomSwap, mealFor, dailyEstimate, weekStart, dayLabel } from './planner.js';
import { buildGrocery, groceryText, scaleFactor, formatQty, qtyText } from './grocery.js';
import { exportExcel } from './export.js';
import { startSync, connect, disconnect, getConfig, newHouseholdCode, onSyncStatus, syncStatus } from './sync.js';

const $ = (sel, el = document) => el.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get(k, d) { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};

const ui = {
  tab: store.get('twoplates.tab', 'week'),
  search: '', group: 'All', vegOnly: false, quick: false, sort: 'smart', expanded: null,
  sheet: null, // { index, group, vegOnly, query }
};

// ---------- Icons ----------
const ICONS = {
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  unlock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  shuffle: '<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>',
  list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  play: '<polygon points="6 4 20 12 6 20 6 4"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  up: '<polyline points="18 15 12 9 6 15"/>',
  down: '<polyline points="6 9 12 15 18 9"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  hide: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
  week: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
  sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

// ---------- Helpers ----------
const fmtTime = (m) => (m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} m` : ''}` : `${m} min`);
function fmtWeek(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
}
const dietClass = (r) => `diet-${r.diet}`;
const dietDot = (r) => `<span class="dot ${dietClass(r)}" title="${DIET_LABEL[r.diet]}"></span>`;

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

function setPath(obj, path, value) {
  const keys = path.split('.');
  let o = obj;
  for (const k of keys.slice(0, -1)) o = o[k];
  o[keys[keys.length - 1]] = value;
}

function ensurePlan() {
  const s = getState();
  if (s.plan.slots.length !== s.rules.dishes || s.plan.slots.some((x) => !RECIPE_BY_ID[x.id])) {
    update((d) => {
      d.plan.slots = d.plan.slots.filter((x) => RECIPE_BY_ID[x.id]);
      d.plan.slots = generateSlots(d);
      d.plan.weekOf ||= weekStart(d.rules.startDay);
    });
  }
}

// ---------- Week ----------
function meter(value, min, max) {
  const top = Math.max(max * 1.35, value * 1.05);
  const pct = (x) => `${Math.min(100, (x / top) * 100).toFixed(1)}%`;
  return `<div class="meter"><span class="band" style="left:${pct(min)};width:calc(${pct(max)} - ${pct(min)})"></span><span class="mark" style="left:${pct(value)}"></span></div>`;
}

function status(value, min, max, kind) {
  if (value < min) return { cls: 'warn', text: kind === 'protein' ? `${min - value} g short` : `${min - value} under` };
  if (value > max) return kind === 'protein' ? { cls: 'info', text: 'above range' } : { cls: 'warn', text: `${value - max} over` };
  return { cls: 'ok', text: 'on target' };
}

function personSummary(d) {
  const p = d.person;
  const ps = status(d.protein, p.proteinMin, p.proteinMax, 'protein');
  const ks = status(d.kcal, p.kcalMin, p.kcalMax, 'kcal');
  return `<div class="person">
    <div class="person-name">${esc(p.name)}</div>
    <div class="stat">
      <div class="stat-line"><b>${d.protein} g</b> protein</div>
      ${meter(d.protein, p.proteinMin, p.proteinMax)}
      <div class="fine">${p.proteinMin}–${p.proteinMax} g · <span class="st ${ps.cls}">${ps.text}</span></div>
    </div>
    <div class="stat">
      <div class="stat-line"><b>${d.kcal.toLocaleString()}</b> kcal</div>
      ${meter(d.kcal, p.kcalMin, p.kcalMax)}
      <div class="fine">${p.kcalMin.toLocaleString()}–${p.kcalMax.toLocaleString()} · <span class="st ${ks.cls}">${ks.text}</span></div>
    </div>
  </div>`;
}

function dishCard(r, i, slot, s) {
  const fav = s.favourites.includes(r.id);
  const n = s.plan.slots.length;
  return `<li class="dish ${slot.locked ? 'locked' : ''}">
    <div class="dish-top">
      <span class="day">${dayLabel(s.rules.startDay, i, s.rules.mealsPerDish)}</span>
      <span class="corner">
        <button class="act icon-only ${fav ? 'fav' : ''}" data-act="fav" data-id="${r.id}" aria-label="Favourite">${icon('heart')}</button>
        <button class="act icon-only" data-act="move" data-i="${i}" data-dir="-1" ${i === 0 ? 'disabled' : ''} aria-label="Move earlier">${icon('up')}</button>
        <button class="act icon-only" data-act="move" data-i="${i}" data-dir="1" ${i === n - 1 ? 'disabled' : ''} aria-label="Move later">${icon('down')}</button>
      </span>
    </div>
    <h3>${esc(r.name)}</h3>
    <div class="meta">${dietDot(r)} ${esc(r.cuisine)} · ${icon('clock', 'sm')} ${r.time} min · ${PROTEIN_LABEL[r.mainProtein] || ''}</div>
    <div class="macros">${s.people.map((p) => { const m = mealFor(r, p); return `<span><b>${esc(p.name)}</b> ${m.protein} g · ${m.kcal} kcal</span>`; }).join('')}</div>
    <div class="actions">
      <button class="act ${slot.locked ? 'on' : ''}" data-act="lock" data-i="${i}" aria-label="Lock">${icon(slot.locked ? 'lock' : 'unlock')}<span>${slot.locked ? 'Locked' : 'Lock'}</span></button>
      <button class="act" data-act="swap-random" data-i="${i}" ${slot.locked ? 'disabled' : ''}>${icon('shuffle')}<span>Swap</span></button>
      <button class="act" data-act="open-sheet" data-i="${i}">${icon('list')}<span>Pick</span></button>
      <a class="act yt" href="${youtubeUrl(r)}" target="_blank" rel="noopener">${icon('play')}<span>YouTube</span></a>
    </div>
  </li>`;
}

function renderWeek(s) {
  const recipes = planRecipes(s);
  const totalTime = recipes.reduce((a, r) => a + r.time, 0);
  const counts = { veg: 0, egg: 0, nonveg: 0 };
  recipes.forEach((r) => counts[r.diet]++);
  const daily = dailyEstimate(s);
  const lockedCount = s.plan.slots.filter((x) => x.locked).length;
  return `
  <section class="card summary">
    <div class="summary-head">
      <div><h2>Week of ${fmtWeek(s.plan.weekOf)}</h2>
      <div class="muted">${recipes.length} dishes · ${fmtTime(totalTime)} cooking · ${counts.veg} veg · ${counts.egg} egg · ${counts.nonveg} chicken/turkey</div></div>
    </div>
    <div class="people">${daily.map(personSummary).join('')}</div>
    <p class="fine">Average planned day: ${s.rules.mealsPerDish === 2 ? 'dinner + next-day lunch from the plan' : 'dinner from the plan'}, plus shake, breakfast &amp; snacks set in Settings.</p>
  </section>

  <div class="toolbar">
    <div class="seg" role="group" aria-label="Dishes this week">
      ${[5, 6, 7].map((n) => `<button class="${s.rules.dishes === n ? 'on' : ''}" data-act="dishes" data-n="${n}">${n}</button>`).join('')}
    </div>
    <span class="seg-label">dishes</span>
    <button class="btn primary grow" data-act="shuffle">${icon('shuffle')} Shuffle${lockedCount ? ` (keeps ${lockedCount} locked)` : ''}</button>
  </div>

  <ol class="dishes">${s.plan.slots.map((slot, i) => (RECIPE_BY_ID[slot.id] ? dishCard(RECIPE_BY_ID[slot.id], i, slot, s) : '')).join('')}</ol>

  <div class="stack">
    <button class="btn wide" data-act="tab" data-tab="groceries">${icon('cart')} Go to grocery list</button>
    <button class="btn ghost wide" data-act="new-week">Start next week (saves this one to history)</button>
  </div>`;
}

// ---------- Recipes ----------
function filteredRecipes(s) {
  const q = ui.search.trim().toLowerCase();
  let list = RECIPES.filter((r) => {
    if (ui.group === 'Favourites') { if (!s.favourites.includes(r.id)) return false; }
    else if (ui.group === 'Hidden') { if (!s.hidden.includes(r.id)) return false; }
    else {
      if (s.hidden.includes(r.id)) return false;
      if (ui.group !== 'All' && r.group !== ui.group) return false;
    }
    if (ui.vegOnly && !isVeg(r, s.rules.eggsCountAsVeg)) return false;
    if (ui.quick && r.time > 30) return false;
    if (q && !(r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)
      || r.items.some((it) => INGREDIENTS[it.id].name.toLowerCase().includes(q)))) return false;
    return true;
  });
  const sorters = {
    smart: (a, b) => (b.protein * 4) / b.kcal - (a.protein * 4) / a.kcal,
    protein: (a, b) => b.protein - a.protein,
    kcal: (a, b) => a.kcal - b.kcal,
    time: (a, b) => a.time - b.time,
    name: (a, b) => a.name.localeCompare(b.name),
  };
  return list.sort(sorters[ui.sort]);
}

function ingredientList(r, s) {
  const factor = scaleFactor(s);
  return `<ul class="ings">${r.items.map(({ id, qty }) => {
    const ing = INGREDIENTS[id];
    return `<li><span>${esc(ing.name)}</span><span>${esc(qtyText(formatQty(ing, qty * factor)))}</span></li>`;
  }).join('')}</ul>`;
}

function recipeRow(r, s) {
  const inWeek = s.plan.slots.some((x) => x.id === r.id);
  const fav = s.favourites.includes(r.id);
  const hidden = s.hidden.includes(r.id);
  const open = ui.expanded === r.id;
  return `<div class="rrow ${open ? 'open' : ''}">
    <button class="rrow-main" data-act="expand" data-id="${r.id}">
      <span class="rname">${dietDot(r)} ${esc(r.name)}</span>
      <span class="meta">${esc(r.cuisine)} · ${r.time} min · ${r.tags.includes('ip') ? 'Instant Pot · ' : ''}${r.tags.includes('af') ? 'air fryer · ' : ''}${PROTEIN_LABEL[r.mainProtein] || ''}</span>
      <span class="per"><b>${r.protein} g</b> protein · ${r.kcal} kcal <span class="fine">per standard serving</span></span>
    </button>
    <div class="rrow-actions">
      <button class="act icon-only ${fav ? 'fav' : ''}" data-act="fav" data-id="${r.id}" aria-label="Favourite">${icon('heart')}</button>
      <button class="act icon-only ${hidden ? 'on' : ''}" data-act="hide" data-id="${r.id}" aria-label="${hidden ? 'Unhide' : 'Never suggest'}">${icon('hide')}</button>
      <button class="act add ${inWeek ? 'on' : ''}" data-act="add" data-id="${r.id}" ${inWeek ? 'disabled' : ''}>${icon(inWeek ? 'check' : 'plus')}<span>${inWeek ? 'In week' : 'Add'}</span></button>
    </div>
    ${open ? `<div class="rrow-detail">
      <div class="fine">Ingredients for your household (${s.rules.mealsPerDish === 2 ? 'dinner + lunch' : 'dinner'}):</div>
      ${ingredientList(r, s)}
      <a class="btn small" href="${youtubeUrl(r)}" target="_blank" rel="noopener">${icon('play')} Find it on YouTube</a>
    </div>` : ''}
  </div>`;
}

function renderRecipeList(s) {
  const list = filteredRecipes(s);
  const el = $('#recipe-list');
  if (!el) return;
  el.innerHTML = `<div class="fine count">Showing ${list.length} of ${RECIPES.length} dishes</div>`
    + (list.length ? list.map((r) => recipeRow(r, s)).join('') : '<p class="empty">Nothing matches — try fewer filters.</p>');
}

function renderRecipes(s) {
  const groups = ['All', 'Favourites', ...GROUPS, ...(s.hidden.length ? ['Hidden'] : [])];
  return `
  <div class="searchbar">${icon('search')}<input id="q" type="search" placeholder="Search dishes or ingredients…" value="${esc(ui.search)}" autocomplete="off"></div>
  <div class="chips">${groups.map((g) => `<button class="chip ${ui.group === g ? 'on' : ''}" data-act="group" data-g="${esc(g)}">${esc(g)}${g === 'Favourites' ? ` (${s.favourites.length})` : g === 'Hidden' ? ` (${s.hidden.length})` : ''}</button>`).join('')}</div>
  <div class="filters">
    <label class="toggle"><input type="checkbox" data-ui="vegOnly" ${ui.vegOnly ? 'checked' : ''}><span>Veg only</span></label>
    <label class="toggle"><input type="checkbox" data-ui="quick" ${ui.quick ? 'checked' : ''}><span>≤ 30 min</span></label>
    <select data-ui="sort" aria-label="Sort">
      ${[['smart', 'Most protein per calorie'], ['protein', 'Most protein'], ['kcal', 'Fewest calories'], ['time', 'Quickest'], ['name', 'A–Z']]
        .map(([v, l]) => `<option value="${v}" ${ui.sort === v ? 'selected' : ''}>${l}</option>`).join('')}
    </select>
  </div>
  <div id="recipe-list"></div>`;
}

// ---------- Groceries ----------
function gItem(i, pantry) {
  return `<div class="gitem ${i.checked ? 'done' : ''}">
    ${pantry ? '' : `<label class="check"><input type="checkbox" data-act="check" data-key="${esc(i.key)}" ${i.checked ? 'checked' : ''}><span class="box">${icon('check')}</span></label>`}
    <div class="gtext">
      <div class="gname">${esc(i.name)} ${i.text ? `<span class="qty">${esc(i.text)}</span>` : ''}</div>
      ${i.dishes.length ? `<div class="fine">${esc([...new Set(i.dishes)].join(' · '))}</div>` : ''}
    </div>
    ${i.id ? `<button class="link" data-act="pantry" data-id="${i.id}" data-v="${pantry ? 'false' : 'true'}">${pantry ? 'Need to buy' : 'Have it'}</button>`
      : `<button class="act icon-only" data-act="del-extra" data-id="${esc(i.extraId)}" aria-label="Remove">${icon('x')}</button>`}
  </div>`;
}

function renderGroceries(s) {
  const g = buildGrocery(s);
  const left = g.shop.filter((i) => !i.checked).length;
  return `
  <section class="card">
    <h2>Shopping list</h2>
    <div class="muted">${planRecipes(s).length} dishes · ${left} of ${g.shop.length} items left · scaled ×${g.factor.toFixed(2)} for your portions</div>
    <div class="btnrow">
      <button class="btn primary" data-act="export">${icon('download')} Excel</button>
      <button class="btn" data-act="share">${icon('share')} Share</button>
      <button class="btn" data-act="copy">${icon('copy')} Copy</button>
    </div>
  </section>
  <form class="addform" data-form="extra">
    <input name="extra" placeholder="Add something else (milk, fruit, whey…)" autocomplete="off">
    <button class="btn" type="submit" aria-label="Add">${icon('plus')}</button>
  </form>
  ${g.shopGroups.map((grp) => `<section class="gsec"><h3>${esc(grp.label)}</h3>${grp.items.map((i) => gItem(i, false)).join('')}</section>`).join('')}
  ${g.pantry.length ? `<details class="pantry card">
    <summary><b>Pantry check</b> <span class="muted">— ${g.pantry.length} staples you usually have</span></summary>
    <p class="fine">Not on the shopping list. Tap “Need to buy” if you're out.</p>
    ${g.pantryGroups.map((grp) => `<section class="gsec"><h3>${esc(grp.label)}</h3>${grp.items.map((i) => gItem(i, true)).join('')}</section>`).join('')}
  </details>` : ''}
  ${g.shop.some((i) => i.checked) ? `<button class="btn ghost wide" data-act="uncheck-all">Untick everything</button>` : ''}`;
}

// ---------- Settings ----------
const num = (path, value, attrs = '') => `<input type="number" inputmode="decimal" data-set="${path}" value="${value}" ${attrs}>`;
function segSet(path, value, options) {
  return `<div class="seg">${options.map(([v, l]) => `<button class="${value === v ? 'on' : ''}" data-act="set" data-path="${path}" data-value="${v}">${l}</button>`).join('')}</div>`;
}

function renderSettings(s) {
  const recipes = planRecipes(s);
  const cfg = getConfig() || {};
  const st = syncStatus();
  const pantryIds = Object.keys(INGREDIENTS).filter((id) => s.pantry[id] !== undefined || INGREDIENTS[id].pantry)
    .sort((a, b) => INGREDIENTS[a].name.localeCompare(INGREDIENTS[b].name));
  return `
  <section class="card">
    <h2>People</h2>
    ${s.people.map((p, i) => {
      const avgP = recipes.length ? recipes.reduce((a, r) => a + r.protein, 0) / recipes.length : 0;
      const avgK = recipes.length ? recipes.reduce((a, r) => a + r.kcal, 0) / recipes.length : 0;
      return `<div class="pblock">
        <label class="field"><span>Name</span><input type="text" data-set="people.${i}.name" value="${esc(p.name)}"></label>
        <div class="grid2">
          <label class="field"><span>Protein min (g/day)</span>${num(`people.${i}.proteinMin`, p.proteinMin)}</label>
          <label class="field"><span>Protein max</span>${num(`people.${i}.proteinMax`, p.proteinMax)}</label>
          <label class="field"><span>Calories min</span>${num(`people.${i}.kcalMin`, p.kcalMin)}</label>
          <label class="field"><span>Calories max</span>${num(`people.${i}.kcalMax`, p.kcalMax)}</label>
          <label class="field"><span>Protein outside plan</span>${num(`people.${i}.outsideProtein`, p.outsideProtein)}</label>
          <label class="field"><span>Calories outside plan</span>${num(`people.${i}.outsideKcal`, p.outsideKcal)}</label>
        </div>
        <p class="fine">“Outside plan” = shake, breakfast and snacks on a normal day.</p>
        <label class="field"><span><span>Portion size: <b>${p.portion.toFixed(2)}×</b> a standard serving</span>
          <span class="fine">≈ ${Math.round(avgP * p.portion)} g protein · ${Math.round(avgK * p.portion)} kcal per meal this week</span></span>
          <input type="range" min="0.5" max="2" step="0.05" data-set="people.${i}.portion" value="${p.portion}">
        </label>
      </div>`;
    }).join('')}
  </section>

  <section class="card">
    <h2>Planning rules</h2>
    <div class="rule"><span>Each dish covers</span>${segSet('rules.mealsPerDish', s.rules.mealsPerDish, [[2, 'Dinner + lunch'], [1, 'Dinner only']])}</div>
    <div class="rule"><span>Veg dishes per week</span>${segSet('rules.vegDishes', s.rules.vegDishes, [[0, '0'], [1, '1'], [2, '2'], [3, '3'], [4, '4']])}</div>
    <div class="rule"><span>…of which Indian veg</span>${segSet('rules.indianVeg', s.rules.indianVeg, [[0, '0'], [1, '1'], [2, '2'], [3, '3']])}</div>
    <label class="rule toggle"><span>Eggs count as veg</span><input type="checkbox" data-set="rules.eggsCountAsVeg" ${s.rules.eggsCountAsVeg ? 'checked' : ''}></label>
    <div class="rule"><span>Weeknight time limit</span>${segSet('rules.maxTime', s.rules.maxTime, [[30, '30m'], [45, '45m'], [60, '60m'], [90, 'Any']])}</div>
    <div class="rule"><span>Longer dishes allowed / week</span>${segSet('rules.longPerWeek', s.rules.longPerWeek, [[0, '0'], [1, '1'], [2, '2']])}</div>
    <div class="rule"><span>Min protein per serving</span>${segSet('rules.minProtein', s.rules.minProtein, [[15, '15g'], [20, '20g'], [25, '25g'], [30, '30g']])}</div>
    <div class="rule"><span>Max dishes with same protein</span>${segSet('rules.maxSameProtein', s.rules.maxSameProtein, [[2, '2'], [3, '3'], [4, '4']])}</div>
    <div class="rule"><span>Week starts</span>${segSet('rules.startDay', s.rules.startDay, [[0, 'Mon'], [5, 'Sat'], [6, 'Sun']])}</div>
  </section>

  <section class="card">
    <h2>How often each cuisine comes up</h2>
    <p class="fine">Indian veg is always included per the rule above; this weight is for any extra Indian dishes.</p>
    ${GROUPS.map((g) => `<div class="rule"><span>${esc(g)}</span>${segSet(`rules.cuisineWeights.${g}`, s.rules.cuisineWeights[g] ?? 1, [[0, 'Never'], [1, 'Rarely'], [2, 'Often'], [3, 'Lots']])}</div>`).join('')}
  </section>

  <section class="card">
    <h2>Sync between phones</h2>
    <p class="sync-status ${st.state}"><span class="dot"></span>${esc(st.message)}</p>
    <form data-form="sync" class="stack">
      <label class="field"><span>Supabase project URL</span><input name="url" placeholder="https://xxxx.supabase.co" value="${esc(cfg.url || '')}" autocomplete="off"></label>
      <label class="field"><span>Supabase anon key</span><input name="key" placeholder="eyJhbGciOi…" value="${esc(cfg.key || '')}" autocomplete="off"></label>
      <label class="field"><span>Household code (same on both phones)</span>
        <div class="inline"><input name="household" value="${esc(cfg.household || '')}" autocomplete="off"><button class="btn" type="button" data-act="gen-code">New</button></div></label>
      <div class="btnrow"><button class="btn primary" type="submit">Connect</button>${cfg.url ? '<button class="btn ghost" type="button" data-act="disconnect">Disconnect</button>' : ''}</div>
    </form>
    <p class="fine">One-time setup steps are in the README. Use the same three values on both phones.</p>
  </section>

  <section class="card">
    <h2>Pantry staples</h2>
    <p class="fine">Ticked = always at home, so it goes under “Pantry check” instead of the shopping list.</p>
    <div class="pantry-grid">${pantryIds.map((id) => `<label class="toggle small"><input type="checkbox" data-act="pantry-toggle" data-id="${id}" ${(s.pantry[id] ?? INGREDIENTS[id].pantry) ? 'checked' : ''}><span>${esc(INGREDIENTS[id].name)}</span></label>`).join('')}</div>
    <p class="fine">Mark anything else from the grocery list with “Have it”.</p>
  </section>

  <section class="card">
    <h2>Data</h2>
    <p class="fine">${RECIPES.length} dishes · ${Object.keys(INGREDIENTS).length} ingredients · ${s.favourites.length} favourites · ${s.hidden.length} hidden · ${s.history.length} past weeks${DATA_ERRORS.length ? ` · <b>${DATA_ERRORS.length} data errors (see console)</b>` : ''}</p>
    <div class="btnrow">
      <button class="btn" data-act="backup">Download backup</button>
      <label class="btn">Restore backup<input type="file" accept="application/json" data-act="restore" hidden></label>
      <button class="btn ghost" data-act="reset">Reset everything</button>
    </div>
  </section>`;
}

// ---------- Swap sheet ----------
function renderSheet(s) {
  const el = $('#sheet');
  if (!ui.sheet) { el.innerHTML = ''; el.hidden = true; document.body.classList.remove('sheet-open'); return; }
  el.hidden = false;
  document.body.classList.add('sheet-open');
  const { index } = ui.sheet;
  const current = RECIPE_BY_ID[s.plan.slots[index]?.id];
  const filters = [['any', 'Any'], ['same', `Same cuisine${current ? ` (${current.group})` : ''}`], ['veg', 'Veg only']];
  el.innerHTML = `<div class="backdrop" data-act="close-sheet"></div>
  <div class="sheet" role="dialog" aria-label="Choose a dish">
    <header><div><div class="fine">${dayLabel(s.rules.startDay, index, s.rules.mealsPerDish)}</div><h2>Choose a dish</h2></div>
      <button class="act icon-only" data-act="close-sheet" aria-label="Close">${icon('x')}</button></header>
    <div class="chips">${filters.map(([v, l]) => `<button class="chip ${ui.sheet.filter === v ? 'on' : ''}" data-act="sheet-filter" data-v="${v}">${esc(l)}</button>`).join('')}</div>
    <div class="searchbar">${icon('search')}<input id="sq" type="search" placeholder="Search…" value="${esc(ui.sheet.query)}" autocomplete="off"></div>
    <button class="btn wide" data-act="swap-random" data-i="${index}">${icon('shuffle')} Surprise me</button>
    <div id="sheet-list" class="sheet-list"></div>
  </div>`;
  renderSheetList(s);
}

function renderSheetList(s) {
  const el = $('#sheet-list');
  if (!el || !ui.sheet) return;
  const current = RECIPE_BY_ID[s.plan.slots[ui.sheet.index]?.id];
  const list = alternatives(s, ui.sheet.index, {
    group: ui.sheet.filter === 'same' ? current?.group : null,
    vegOnly: ui.sheet.filter === 'veg',
    query: ui.sheet.query,
  }).slice(0, 60);
  el.innerHTML = list.map((r) => `<button class="pick" data-act="choose" data-id="${r.id}">
      <span class="rname">${dietDot(r)} ${esc(r.name)}</span>
      <span class="meta">${esc(r.cuisine)} · ${r.time} min · <b>${r.protein} g</b> · ${r.kcal} kcal</span>
    </button>`).join('') || '<p class="empty">No matches.</p>';
}

// ---------- Render ----------
function render() {
  const s = getState();
  const main = $('#main');
  const views = { week: renderWeek, recipes: renderRecipes, groceries: renderGroceries, settings: renderSettings };
  const scroll = window.scrollY;
  main.innerHTML = (views[ui.tab] || renderWeek)(s);
  if (ui.tab === 'recipes') renderRecipeList(s);
  document.querySelectorAll('.tabbar button').forEach((b) => b.classList.toggle('on', b.dataset.tab === ui.tab));
  renderHeader();
  renderSheet(s);
  window.scrollTo(0, scroll);
}

function renderHeader() {
  const st = syncStatus();
  $('#sync-dot').className = `sync-dot ${st.state}`;
  $('#sync-dot').title = st.message;
}

// ---------- Actions ----------
function setTab(tab) {
  ui.tab = tab;
  store.set('twoplates.tab', tab);
  window.scrollTo(0, 0);
  render();
}

function regenerate(keepLocked = true) {
  update((d) => { d.plan.slots = generateSlots(d, { keepLocked }); });
}

function replaceSlot(i, id) {
  update((d) => { d.plan.slots[i] = { id, locked: false }; });
}

const actions = {
  tab: (el) => setTab(el.dataset.tab),
  shuffle: () => { regenerate(true); toast('New dishes picked — locked ones kept'); },
  dishes: (el) => update((d) => { d.rules.dishes = Number(el.dataset.n); d.plan.slots = generateSlots(d); }),
  lock: (el) => update((d) => { const x = d.plan.slots[el.dataset.i]; x.locked = !x.locked; }),
  'swap-random': (el) => {
    const i = Number(el.dataset.i);
    const r = randomSwap(getState(), i);
    if (r) { replaceSlot(i, r.id); toast(`Swapped in ${r.name}`); }
    ui.sheet = null; render();
  },
  'open-sheet': (el) => { ui.sheet = { index: Number(el.dataset.i), filter: 'any', query: '' }; renderSheet(getState()); },
  'close-sheet': () => { ui.sheet = null; renderSheet(getState()); },
  'sheet-filter': (el) => { ui.sheet.filter = el.dataset.v; renderSheet(getState()); },
  choose: (el) => { const i = ui.sheet.index; ui.sheet = null; replaceSlot(i, el.dataset.id); },
  move: (el) => update((d) => {
    const i = Number(el.dataset.i), j = i + Number(el.dataset.dir);
    [d.plan.slots[i], d.plan.slots[j]] = [d.plan.slots[j], d.plan.slots[i]];
  }),
  fav: (el) => update((d) => {
    const id = el.dataset.id;
    d.favourites = d.favourites.includes(id) ? d.favourites.filter((x) => x !== id) : [...d.favourites, id];
  }),
  hide: (el) => {
    const id = el.dataset.id;
    const hiding = !getState().hidden.includes(id);
    update((d) => { d.hidden = hiding ? [...d.hidden, id] : d.hidden.filter((x) => x !== id); });
    toast(hiding ? 'Won’t be suggested again (see “Hidden” to undo)' : 'Back in the mix');
  },
  add: (el) => {
    const s = getState();
    if (s.plan.slots.length >= 7) { toast('Week is full — use “Pick” on a dish in the Week tab to replace it'); return; }
    update((d) => { d.plan.slots.push({ id: el.dataset.id, locked: true }); d.rules.dishes = d.plan.slots.length; });
    toast('Added to this week (locked)');
  },
  expand: (el) => { ui.expanded = ui.expanded === el.dataset.id ? null : el.dataset.id; renderRecipeList(getState()); },
  group: (el) => { ui.group = el.dataset.g; render(); },
  check: (el) => update((d) => { d.checked[el.dataset.key] = el.checked; }),
  pantry: (el) => update((d) => { d.pantry[el.dataset.id] = el.dataset.v === 'true'; }),
  'pantry-toggle': (el) => update((d) => { d.pantry[el.dataset.id] = el.checked; }),
  'del-extra': (el) => update((d) => { d.extras = d.extras.filter((x) => x.id !== el.dataset.id); }),
  'uncheck-all': () => update((d) => { d.checked = {}; }),
  export: async () => {
    try { toast('Preparing Excel file…'); await exportExcel(getState()); } catch (e) { toast(e.message); }
  },
  share: async () => {
    const text = groceryText(getState());
    if (navigator.share) { try { await navigator.share({ title: 'Grocery list', text }); } catch { /* cancelled */ } }
    else actions.copy();
  },
  copy: async () => {
    try { await navigator.clipboard.writeText(groceryText(getState())); toast('List copied'); } catch { toast('Couldn’t copy on this browser'); }
  },
  'new-week': () => {
    if (!confirm('Save this week to history and plan a fresh one?')) return;
    update((d) => {
      d.history = [...d.history, { weekOf: d.plan.weekOf, ids: d.plan.slots.map((x) => x.id) }].slice(-12);
      const next = d.plan.weekOf ? new Date(`${d.plan.weekOf}T12:00:00`) : new Date();
      next.setDate(next.getDate() + 7);
      const upcoming = weekStart(d.rules.startDay);
      const nextIso = weekStart(d.rules.startDay, next);
      d.plan.weekOf = nextIso > upcoming ? nextIso : upcoming;
      d.plan.slots = generateSlots(d, { keepLocked: false });
      d.checked = {};
      d.extras = [];
    });
    window.scrollTo(0, 0);
    toast('Fresh week planned');
  },
  set: (el) => {
    const path = el.dataset.path;
    const value = Number(el.dataset.value);
    update((d) => {
      setPath(d, path, value);
      if (path === 'rules.startDay') d.plan.weekOf = weekStart(value);
    });
    if (path.startsWith('rules.') && !['rules.startDay', 'rules.mealsPerDish'].includes(path)) toast('Saved — applies next time you shuffle');
  },
  'gen-code': () => { $('input[name="household"]').value = newHouseholdCode(); },
  disconnect: async () => { await disconnect(); render(); },
  backup: () => {
    const blob = new Blob([JSON.stringify(getState(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `two-plates-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  },
  reset: () => {
    if (!confirm('Reset all settings, favourites and the current plan to the defaults?')) return;
    update((d) => Object.assign(d, defaultState()));
    ensurePlan();
    toast('Reset to defaults');
  },
};

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || el.tagName === 'INPUT') return;
  if (el.disabled) return;
  const fn = actions[el.dataset.act];
  if (fn) { e.preventDefault(); fn(el, e); }
});

document.addEventListener('change', (e) => {
  const el = e.target;
  if (el.dataset.act && actions[el.dataset.act] && el.type === 'checkbox') { actions[el.dataset.act](el); return; }
  if (el.dataset.act === 'restore' && el.files?.[0]) {
    el.files[0].text().then((t) => {
      try { const data = JSON.parse(t); replaceState({ ...data, updatedAt: Date.now() }); update(() => {}); toast('Backup restored'); }
      catch { toast('That file isn’t a Two Plates backup'); }
    });
    return;
  }
  if (el.dataset.ui) {
    ui[el.dataset.ui] = el.type === 'checkbox' ? el.checked : el.value;
    renderRecipeList(getState());
    return;
  }
  if (el.dataset.set) {
    const path = el.dataset.set;
    let value = el.type === 'checkbox' ? el.checked : el.type === 'text' ? el.value.trim() : Number(el.value);
    if (typeof value === 'number' && !Number.isFinite(value)) return;
    update((d) => setPath(d, path, value));
  }
});

document.addEventListener('input', (e) => {
  if (e.target.id === 'q') { ui.search = e.target.value; renderRecipeList(getState()); }
  if (e.target.id === 'sq' && ui.sheet) { ui.sheet.query = e.target.value; renderSheetList(getState()); }
  // Live label for portion sliders without re-rendering mid-drag.
  if (e.target.type === 'range') {
    const b = e.target.closest('.field')?.querySelector('b');
    if (b) b.textContent = `${Number(e.target.value).toFixed(2)}×`;
  }
});

document.addEventListener('submit', (e) => {
  const form = e.target;
  e.preventDefault();
  if (form.dataset.form === 'extra') {
    const name = form.extra.value.trim();
    if (!name) return;
    update((d) => { d.extras.push({ id: Math.random().toString(36).slice(2, 9), name }); });
  }
  if (form.dataset.form === 'sync') {
    const cfg = { url: form.url.value.trim(), key: form.key.value.trim(), household: form.household.value.trim() };
    if (!cfg.url || !cfg.key || !cfg.household) { toast('Fill in all three fields'); return; }
    connect(cfg).then(render);
  }
});

document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && ui.sheet) actions['close-sheet'](); });

// ---------- Boot ----------
if (DATA_ERRORS.length) console.warn('Recipe data problems:', DATA_ERRORS);
onChange(() => render());
onSyncStatus(() => { renderHeader(); if (ui.tab === 'settings') render(); });
ensurePlan();
render();
startSync();

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
