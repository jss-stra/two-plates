import { RECIPES, RECIPE_BY_ID, GROUPS, INGREDIENTS, DIET_LABEL, PROTEIN_LABEL, youtubeUrl, isVeg, kindOf, DATA_ERRORS } from './data.js';
import { getState, update, onChange, defaultState, replaceState } from './state.js';
import { generateSlots, planRecipes, alternatives, randomSwap, mealFor, perMealGoal, dailyEstimate, weekStart, ratingOf, targetDishes } from './planner.js';
import { buildGrocery, weeklyNoteText, scaleFactor, formatQty, qtyText } from './grocery.js';
import { exportExcel } from './export.js';
import { startSync, connect, disconnect, flushSync, getConfig, newHouseholdCode, onSyncStatus, syncStatus } from './sync.js';

const $ = (sel, el = document) => el.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get(k, d) { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};

// Per-device view preferences (not synced).
const ui = {
  tab: store.get('twoplates.tab', 'week'),
  search: '', group: 'All', vegOnly: false, quick: false, sort: 'smart', expanded: null,
  sheet: null, // { index, filter, query }
  showAmounts: store.get('twoplates.amounts', '0') === '1',
  logBought: false,
  checkin: false,
};

// ---------- Icons ----------
const ICONS = {
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  unlock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  shuffle: '<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>',
  list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  play: '<polygon points="6 4 20 12 6 20 6 4"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  hide: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
  cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  note: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

// ---------- Helpers ----------
const fmtTime = (m) => (m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} m` : ''}` : `${m} min`);
function fmtWeek(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
}
const fmtDate = (ts) => new Date(ts).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
const dietDot = (r) => `<span class="dot diet-${r.diet}" title="${DIET_LABEL[r.diet]}"></span>`;

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

const kindCounts = (s) => {
  const c = { chicken: 0, veg: 0 };
  planRecipes(s).forEach((r) => c[kindOf(r, s.rules.eggsCountAsVeg)]++);
  return c;
};

// Grow or shrink the week to match the chicken/veg counts without reshuffling
// the dishes already there (unlocked ones are dropped first when shrinking).
function resizePlan(d) {
  const locked = new Map(d.plan.slots.map((s) => [s.id, s.locked]));
  const ordered = [...d.plan.slots.filter((s) => s.locked), ...d.plan.slots.filter((s) => !s.locked)];
  const asLocked = { ...d, plan: { ...d.plan, slots: ordered.map((s) => ({ ...s, locked: true })) } };
  d.plan.slots = generateSlots(asLocked).map((s) => ({ ...s, locked: locked.get(s.id) ?? false }));
}

function ensurePlan() {
  const s = getState();
  const c = kindCounts(s);
  // Egg dishes only belong in the week if you added/locked them yourself
  // (or count eggs as veg) — otherwise they'd take a chicken slot.
  const fits = (x, rules) => {
    const r = RECIPE_BY_ID[x.id];
    return r && (x.locked || r.diet !== 'egg' || rules.eggsCountAsVeg);
  };
  const valid = s.plan.slots.every((x) => fits(x, s.rules));
  if (!valid || c.chicken !== s.rules.chickenDishes || c.veg !== s.rules.vegDishes) {
    update((d) => {
      d.plan.slots = d.plan.slots.filter((x) => fits(x, d.rules));
      resizePlan(d);
      d.plan.weekOf ||= weekStart(d.rules.startDay);
    });
  }
}

// Older saves used hearts; turn each favourite into 5 stars from both of you.
function migrate() {
  const s = getState();
  if (!s.favourites?.length) return;
  update((d) => {
    for (const id of d.favourites) d.ratings[id] ||= { r: [5, 5], note: '' };
    d.favourites = [];
  });
}

// ---------- Ratings ----------
function starsFor(s, r) {
  const rating = s.ratings[r.id] || { r: [] };
  return `<div class="rating">
    ${s.people.map((p, pi) => `<div class="rate-row"><span class="rate-name">${esc(p.name)}</span>
      ${[1, 2, 3, 4, 5].map((v) => `<button class="star ${v <= (rating.r[pi] || 0) ? 'on' : ''}" data-act="rate" data-id="${r.id}" data-p="${pi}" data-v="${v}" aria-label="${v} star${v > 1 ? 's' : ''} from ${esc(p.name)}">★</button>`).join('')}
    </div>`).join('')}
    <button class="link note-btn" data-act="note" data-id="${r.id}">${icon('note', 'sm')} ${rating.note ? esc(rating.note) : 'Add a note'}</button>
  </div>`;
}

function ratingBadge(s, r) {
  const avg = ratingOf(s, r.id);
  return [
    r.regular ? '<span class="badge reg">Regular</span>' : '',
    avg !== null ? `<span class="badge star-b">★ ${avg.toFixed(1)}</span>` : '',
  ].join('');
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

function personSummary(d, rules) {
  const p = d.person;
  const ps = status(d.protein, p.proteinMin, p.proteinMax, 'protein');
  const ks = status(d.kcal, p.kcalMin, p.kcalMax, 'kcal');
  const goal = perMealGoal(p, rules);
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
    <div class="goal">Per meal: <b>${goal.min}–${goal.max} g</b> protein</div>
  </div>`;
}

function dishCard(r, i, slot, s) {
  const final = !!s.plan.finalizedAt;
  return `<li class="dish ${slot.locked && !final ? 'locked' : ''}">
    <div class="dish-top">
      <span class="badges">${ratingBadge(s, r)}</span>
      ${slot.locked && !final ? `<span class="locked-tag">${icon('lock')} Locked</span>` : ''}
    </div>
    <h3>${esc(r.name)}</h3>
    <div class="meta">${dietDot(r)} ${esc(r.cuisine)} · ${icon('clock', 'sm')} ${r.time} min · ${PROTEIN_LABEL[r.mainProtein] || ''}</div>
    <div class="macros">${s.people.map((p) => {
      const m = mealFor(r, p);
      const g = perMealGoal(p, s.rules);
      const cls = m.protein < g.min ? 'warn' : 'ok';
      return `<span><b>${esc(p.name)}</b> <span class="st ${cls}">${m.protein} g</span> · ${m.kcal} kcal</span>`;
    }).join('')}</div>
    <div class="actions">
      ${final ? '' : `<button class="act ${slot.locked ? 'on' : ''}" data-act="lock" data-i="${i}">${icon(slot.locked ? 'lock' : 'unlock')}<span>${slot.locked ? 'Locked' : 'Lock'}</span></button>
      <button class="act" data-act="swap-random" data-i="${i}" ${slot.locked ? 'disabled' : ''}>${icon('shuffle')}<span>Swap</span></button>
      <button class="act" data-act="open-sheet" data-i="${i}">${icon('list')}<span>Pick</span></button>`}
      <a class="act yt" href="${youtubeUrl(r)}" target="_blank" rel="noopener">${icon('play')}<span>YouTube</span></a>
    </div>
    <details class="rate-wrap" ${s.ratings[r.id] ? 'open' : ''}><summary>Cooked it? Rate it</summary>${starsFor(s, r)}</details>
  </li>`;
}

function counter(label, key, value, max) {
  return `<div class="counter"><span>${label}</span>
    <button data-act="count" data-k="${key}" data-d="-1" ${value <= 0 ? 'disabled' : ''} aria-label="Fewer ${label}">${icon('minus')}</button>
    <b>${value}</b>
    <button data-act="count" data-k="${key}" data-d="1" ${value >= max ? 'disabled' : ''} aria-label="More ${label}">${icon('plus')}</button></div>`;
}

function renderWeek(s) {
  const recipes = planRecipes(s);
  const totalTime = recipes.reduce((a, r) => a + r.time, 0);
  const lockedCount = s.plan.slots.filter((x) => x.locked).length;
  const section = (kind, title) => {
    const items = s.plan.slots.map((slot, i) => ({ slot, i, r: RECIPE_BY_ID[slot.id] }))
      .filter((x) => x.r && kindOf(x.r, s.rules.eggsCountAsVeg) === kind);
    if (!items.length) return '';
    return `<h2 class="sec-title">${title} <span class="muted">(${items.length})</span></h2>
      <ol class="dishes">${items.map((x) => dishCard(x.r, x.i, x.slot, s)).join('')}</ol>`;
  };
  if (ui.checkin) return renderCheckin(s);
  return `
  ${checkinBanner(s)}
  <section class="card summary">
    <div class="summary-head"><div><h2>This week</h2>
      <div class="muted">${recipes.length} dishes · ${fmtTime(totalTime)} cooking in total</div></div></div>
    <div class="people">${daily(s).map((d) => personSummary(d, s.rules)).join('')}</div>
    <p class="fine">Average day: ${s.rules.mealsPerDish === 2 ? 'lunch + dinner from these dishes' : 'dinner from these dishes'}, plus shake, breakfast &amp; snacks from Settings. Cook in any order.</p>
  </section>

  ${s.plan.finalizedAt ? `<section class="card final-card">
    <div><b>${icon('check')} Finalized ${fmtDate(s.plan.finalizedAt)}</b>
      <div class="muted">These are this week's dishes. The grocery list and Friday check-in use exactly these.</div></div>
    <button class="link" data-act="unfinalize">Edit week</button>
  </section>` : `<div class="toolbar">
    ${counter('Chicken', 'chickenDishes', s.rules.chickenDishes, 7 - s.rules.vegDishes)}
    ${counter('Veg', 'vegDishes', s.rules.vegDishes, 7 - s.rules.chickenDishes)}
  </div>
  <button class="btn wide shuffle" data-act="shuffle">${icon('shuffle')} Shuffle${lockedCount ? ` (keeps ${lockedCount} locked)` : ''}</button>`}

  ${section('chicken', 'Chicken &amp; turkey')}
  ${section('veg', 'Veg')}

  <div class="stack">
    ${s.plan.finalizedAt
      ? `<button class="btn primary wide" data-act="tab" data-tab="groceries">${icon('cart')} Grocery list</button>`
      : `<button class="btn primary wide" data-act="finalize">${icon('check')} Finalize these ${recipes.length} dishes → grocery list</button>`}
    <button class="btn wide" data-act="checkin-open">${icon('check')} Weekly check-in &amp; plan next week</button>
  </div>
  ${pastWeeks(s)}`;
}

// Earlier weeks with each dish's recipe link, newest first.
function pastWeeks(s) {
  if (!s.history.length) return '';
  return `<details class="card past">
    <summary><b>Past weeks</b> <span class="muted">(${s.history.length})</span></summary>
    ${[...s.history].reverse().map((h) => `<div class="past-week">
      <div class="past-head">Week of ${fmtWeek(h.weekOf)}${h.finalizedAt ? '' : ' <span class="fine">(not finalized)</span>'}</div>
      <ul>${h.ids.map((id) => RECIPE_BY_ID[id]).filter(Boolean).map((r) => {
        const c = h.cooked?.[r.id];
        const avg = ratingOf(s, r.id);
        return `<li><span>${c === true ? '✓' : c === false ? '✗' : '·'} ${esc(r.name)}${avg !== null ? ` <span class="badge star-b">★ ${avg.toFixed(1)}</span>` : ''}</span>
          <a class="link" href="${youtubeUrl(r)}" target="_blank" rel="noopener">Recipe</a></li>`;
      }).join('')}</ul>
    </div>`).join('')}
  </details>`;
}

// Friday–Sunday nudge until this week's check-in is done.
function checkinBanner(s) {
  const day = new Date().getDay(); // 0 Sun … 5 Fri, 6 Sat
  // Hidden for a plan you started in the last 3 days (e.g. right after this weekend's check-in).
  const fresh = s.plan.startedAt && Date.now() - s.plan.startedAt < 3 * 24 * 3600 * 1000;
  if (fresh || ![5, 6, 0].includes(day)) return '';
  return `<section class="card banner"><div><b>Weekly check-in</b>
    <div class="muted">What did you cook, what didn't you, and how much did you each like it?</div></div>
    <button class="btn primary" data-act="checkin-open">Start</button></section>`;
}

function renderCheckin(s) {
  const recipes = planRecipes(s);
  const cooked = s.plan.cooked || {};
  const carry = s.plan.carry || {};
  const answered = recipes.filter((r) => cooked[r.id] !== undefined).length;
  return `
  <section class="card">
    <h2>Weekly check-in</h2>
    <p class="muted">For each dish: did you cook it, and how much did you each like it? Your stars decide how often it comes back. Anything you didn't cook can move to next week.</p>
    <div class="fine">${answered} of ${recipes.length} answered</div>
  </section>
  <ol class="dishes">${recipes.map((r) => {
    const c = cooked[r.id];
    return `<li class="dish">
      <h3>${esc(r.name)}</h3>
      <div class="meta">${dietDot(r)} ${esc(r.cuisine)} · ${r.time} min</div>
      <div class="seg yesno">
        <button class="${c === true ? 'on' : ''}" data-act="cooked" data-id="${r.id}" data-v="1">Cooked it</button>
        <button class="${c === false ? 'on' : ''}" data-act="cooked" data-id="${r.id}" data-v="0">Didn't cook</button>
      </div>
      ${c === true ? starsFor(s, r) : ''}
      ${c === false ? `<label class="toggle small carry"><input type="checkbox" data-act="carry" data-id="${r.id}" ${carry[r.id] !== false ? 'checked' : ''}><span>Move it to next week (you may already have the groceries)</span></label>` : ''}
    </li>`;
  }).join('')}</ol>
  <div class="stack">
    <button class="btn primary wide" data-act="finish-week" ${answered < recipes.length ? 'disabled' : ''}>Finish week &amp; plan next week</button>
    <button class="btn ghost wide" data-act="checkin-close">Back to this week</button>
  </div>`;
}
const daily = (s) => dailyEstimate(s);

// ---------- Recipes ----------
function filteredRecipes(s) {
  const q = ui.search.trim().toLowerCase();
  const list = RECIPES.filter((r) => {
    if (ui.group === 'Hidden') { if (!s.hidden.includes(r.id)) return false; }
    else {
      if (s.hidden.includes(r.id)) return false;
      if (ui.group === 'Our regulars' && !r.regular) return false;
      if (ui.group === 'Top rated' && !((ratingOf(s, r.id) ?? 0) >= 4)) return false;
      if (ui.group === 'Rated' && ratingOf(s, r.id) === null) return false;
      if (GROUPS.includes(ui.group) && r.group !== ui.group) return false;
    }
    if (ui.vegOnly && !isVeg(r, s.rules.eggsCountAsVeg)) return false;
    if (ui.quick && r.time > 30) return false;
    if (q && !(r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)
      || r.items.some((it) => INGREDIENTS[it.id].name.toLowerCase().includes(q)))) return false;
    return true;
  });
  const sorters = {
    smart: (a, b) => (b.protein * 4) / b.kcal - (a.protein * 4) / a.kcal,
    rating: (a, b) => (ratingOf(s, b.id) ?? (b.regular ? 3.5 : 0)) - (ratingOf(s, a.id) ?? (a.regular ? 3.5 : 0)),
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
  const hidden = s.hidden.includes(r.id);
  const open = ui.expanded === r.id;
  return `<div class="rrow ${open ? 'open' : ''}">
    <button class="rrow-main" data-act="expand" data-id="${r.id}">
      <span class="rname">${dietDot(r)} ${esc(r.name)}</span>
      <span class="badges">${ratingBadge(s, r)}</span>
      <span class="meta">${esc(r.cuisine)} · ${r.time} min · ${r.tags.includes('ip') ? 'Instant Pot · ' : ''}${r.tags.includes('af') ? 'air fryer · ' : ''}${PROTEIN_LABEL[r.mainProtein] || ''}</span>
      <span class="per"><b>${r.protein} g</b> protein · ${r.kcal} kcal <span class="fine">per standard serving</span></span>
    </button>
    <div class="rrow-actions">
      <button class="act icon-only ${hidden ? 'on' : ''}" data-act="hide" data-id="${r.id}" aria-label="${hidden ? 'Unhide' : 'Never suggest'}">${icon('hide')}</button>
      <button class="act add ${inWeek ? 'on' : ''}" data-act="add" data-id="${r.id}" ${inWeek ? 'disabled' : ''}>${icon(inWeek ? 'check' : 'plus')}<span>${inWeek ? 'In week' : 'Add'}</span></button>
    </div>
    ${open ? `<div class="rrow-detail">
      ${starsFor(s, r)}
      <div class="fine">Rough ingredients for your household (${s.rules.mealsPerDish === 2 ? 'dinner + lunch' : 'dinner'}):</div>
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
  const groups = ['All', 'Our regulars', 'Top rated', 'Rated', ...GROUPS, ...(s.hidden.length ? ['Hidden'] : [])];
  return `
  <div class="searchbar">${icon('search')}<input id="q" type="search" placeholder="Search dishes or ingredients…" value="${esc(ui.search)}" autocomplete="off"></div>
  <div class="chips">${groups.map((g) => `<button class="chip ${ui.group === g ? 'on' : ''}" data-act="group" data-g="${esc(g)}">${esc(g)}${g === 'Hidden' ? ` (${s.hidden.length})` : ''}</button>`).join('')}</div>
  <div class="filters">
    <label class="toggle"><input type="checkbox" data-ui="vegOnly" ${ui.vegOnly ? 'checked' : ''}><span>Veg only</span></label>
    <label class="toggle"><input type="checkbox" data-ui="quick" ${ui.quick ? 'checked' : ''}><span>≤ 30 min</span></label>
    <select data-ui="sort" aria-label="Sort">
      ${[['smart', 'Most protein per calorie'], ['rating', 'Highest rated'], ['protein', 'Most protein'], ['kcal', 'Fewest calories'], ['time', 'Quickest'], ['name', 'A–Z']]
        .map(([v, l]) => `<option value="${v}" ${ui.sort === v ? 'selected' : ''}>${l}</option>`).join('')}
    </select>
  </div>
  <div id="recipe-list"></div>`;
}

// ---------- Groceries ----------
function gItem(i, pantry) {
  const habit = i.text.startsWith('usually');
  const qty = (ui.showAmounts || habit) && i.text ? `<span class="qty">${esc(i.text)}</span>` : '';
  return `<div class="gitem ${i.checked ? 'done' : ''}">
    ${pantry ? '' : `<label class="check"><input type="checkbox" data-act="check" data-key="${esc(i.key)}" ${i.checked ? 'checked' : ''}><span class="box">${icon('check')}</span></label>`}
    <div class="gtext">
      <div class="gname">${esc(i.name)} ${qty}</div>
      ${i.dishes.length ? `<div class="fine">${esc([...new Set(i.dishes)].join(' · '))}</div>` : ''}
      ${ui.logBought && !pantry ? `<input class="bought" data-bought="${esc(i.key)}" value="${esc(i.bought)}" placeholder="How much did you get? e.g. 1 kg, 2 packs" autocomplete="off">` : ''}
    </div>
    ${i.id ? `<button class="link" data-act="pantry" data-id="${i.id}" data-v="${pantry ? 'false' : 'true'}">${pantry ? 'Need to buy' : 'Have it'}</button>`
      : i.extraId ? `<button class="act icon-only" data-act="del-extra" data-id="${esc(i.extraId)}" aria-label="Remove">${icon('x')}</button>` : ''}
  </div>`;
}

function renderGroceries(s) {
  const g = buildGrocery(s);
  const left = g.shop.filter((i) => !i.checked).length;
  const logged = g.shop.filter((i) => i.bought).length;
  const draft = s.plan.finalizedAt ? '' : `<section class="card banner"><div><b>Draft list</b>
    <div class="muted">Finalize this week's dishes so the list doesn't change after you shop.</div></div>
    <button class="btn primary" data-act="finalize">Finalize</button></section>`;
  return `${draft}
  <section class="card">
    <h2>Shopping list</h2>
    <div class="muted">${planRecipes(s).length} dishes · ${left} of ${g.shop.length} items left${logged ? ` · ${logged} amount${logged === 1 ? '' : 's'} logged` : ''}</div>
    <div class="btnrow">
      <button class="btn primary" data-act="share">${icon('share')} Send to Keep</button>
      <button class="btn" data-act="export">${icon('download')} Excel</button>
      <button class="btn" data-act="copy">${icon('copy')} Copy</button>
    </div>
    <p class="fine">“Send to Keep” opens your phone's share sheet. Pick Google Keep to get one note with this week's dishes and the shopping list. In Keep, tap ⋮ → Show checkboxes to tick items off.</p>
    <div class="gtoggles">
      <label class="toggle"><input type="checkbox" data-act="toggle-amounts" ${ui.showAmounts ? 'checked' : ''}><span>Show rough amounts</span></label>
      <label class="toggle"><input type="checkbox" data-act="toggle-log" ${ui.logBought ? 'checked' : ''}><span>Log what we bought</span></label>
    </div>
    ${ui.logBought ? '<p class="fine">Type roughly how much you got of each item. It’s saved with this week, and over time it lets the app suggest amounts that match how you actually shop.</p>' : ''}
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
  const rated = Object.keys(s.ratings).filter((id) => ratingOf(s, id) !== null).length;
  return `
  <section class="card">
    <h2>People</h2>
    ${s.people.map((p, i) => {
      const avgP = recipes.length ? recipes.reduce((a, r) => a + r.protein, 0) / recipes.length : 0;
      const avgK = recipes.length ? recipes.reduce((a, r) => a + r.kcal, 0) / recipes.length : 0;
      const goal = perMealGoal(p, s.rules);
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
        <p class="fine">“Outside plan” = shake, breakfast and snacks on a normal day. What's left is split across lunch and dinner: <b>${goal.min}–${goal.max} g protein per meal</b>.</p>
        <label class="field"><span><span>Portion size: <b>${p.portion.toFixed(2)}×</b> a standard serving</span>
          <span class="fine">≈ ${Math.round(avgP * p.portion)} g protein · ${Math.round(avgK * p.portion)} kcal per meal this week</span></span>
          <input type="range" min="0.5" max="2" step="0.05" data-set="people.${i}.portion" value="${p.portion}">
        </label>
      </div>`;
    }).join('')}
  </section>

  <section class="card">
    <h2>Planning rules</h2>
    <div class="rule"><span>Indian dishes among the veg</span>${segSet('rules.indianVeg', s.rules.indianVeg, [[0, '0'], [1, '1'], [2, '2'], [3, '3']])}</div>
    <div class="rule"><span>Each dish covers</span>${segSet('rules.mealsPerDish', s.rules.mealsPerDish, [[2, 'Dinner + lunch'], [1, 'Dinner only']])}</div>
    <label class="rule toggle"><span>Egg dishes count as veg</span><input type="checkbox" data-set="rules.eggsCountAsVeg" ${s.rules.eggsCountAsVeg ? 'checked' : ''}></label>
    <div class="rule"><span>Weeknight time limit</span>${segSet('rules.maxTime', s.rules.maxTime, [[30, '30m'], [45, '45m'], [60, '60m'], [90, 'Any']])}</div>
    <div class="rule"><span>Longer dishes allowed / week</span>${segSet('rules.longPerWeek', s.rules.longPerWeek, [[0, '0'], [1, '1'], [2, '2']])}</div>
    <div class="rule"><span>Min protein per serving</span>${segSet('rules.minProtein', s.rules.minProtein, [[15, '15g'], [20, '20g'], [25, '25g'], [30, '30g']])}</div>
    <p class="fine">Set how many chicken and veg dishes you want on the Week tab.</p>
  </section>

  <section class="card">
    <h2>How often each cuisine comes up</h2>
    <p class="fine">Your star ratings matter more than these: 5★ dishes come up about 3× as often, 1★ almost never.</p>
    ${GROUPS.map((g) => `<div class="rule"><span>${esc(g)}</span>${segSet(`rules.cuisineWeights.${g}`, s.rules.cuisineWeights[g] ?? 1, [[0, 'Never'], [1, 'Rarely'], [2, 'Often'], [3, 'Lots']])}</div>`).join('')}
  </section>

  <section class="card">
    <h2>Sync between phones</h2>
    <p class="sync-status ${st.state}"><span class="dot"></span>${esc(st.message)}</p>
    <form data-form="sync" class="stack">
      <label class="field"><span>Supabase project URL</span><input name="url" placeholder="https://xxxx.supabase.co" value="${esc(cfg.url || '')}" autocomplete="off"></label>
      <label class="field"><span>Supabase publishable (anon) key</span><input name="key" placeholder="sb_publishable_… or eyJ…" value="${esc(cfg.key || '')}" autocomplete="off"></label>
      <label class="field"><span>Household code (same on both phones)</span>
        <div class="inline"><input name="household" value="${esc(cfg.household || '')}" autocomplete="off"><button class="btn" type="button" data-act="gen-code">New</button></div></label>
      <div class="btnrow"><button class="btn primary" type="submit">Connect</button>${cfg.url ? '<button class="btn ghost" type="button" data-act="disconnect">Disconnect</button>' : ''}</div>
    </form>
  </section>

  <section class="card">
    <h2>Pantry staples</h2>
    <p class="fine">Ticked = always at home, so it goes under “Pantry check” instead of the shopping list.</p>
    <div class="pantry-grid">${pantryIds.map((id) => `<label class="toggle small"><input type="checkbox" data-act="pantry-toggle" data-id="${id}" ${(s.pantry[id] ?? INGREDIENTS[id].pantry) ? 'checked' : ''}><span>${esc(INGREDIENTS[id].name)}</span></label>`).join('')}</div>
  </section>

  <section class="card">
    <h2>Data</h2>
    <p class="fine">${RECIPES.length} dishes · ${RECIPES.filter((r) => r.regular).length} regulars · ${rated} rated · ${s.hidden.length} hidden · ${s.history.length} past weeks${DATA_ERRORS.length ? ` · <b>${DATA_ERRORS.length} data errors (see console)</b>` : ''}</p>
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
  const current = RECIPE_BY_ID[s.plan.slots[ui.sheet.index]?.id];
  const kind = current ? kindOf(current, s.rules.eggsCountAsVeg) : 'chicken';
  const filters = [['kind', kind === 'veg' ? 'Veg' : 'Chicken & turkey'], ['same', `Same cuisine${current ? ` (${current.group})` : ''}`], ['regulars', 'Our regulars'], ['any', 'Anything']];
  el.innerHTML = `<div class="backdrop" data-act="close-sheet"></div>
  <div class="sheet" role="dialog" aria-label="Choose a dish">
    <header><div><div class="fine">Replacing ${esc(current?.name || '')}</div><h2>Choose a dish</h2></div>
      <button class="act icon-only" data-act="close-sheet" aria-label="Close">${icon('x')}</button></header>
    <div class="chips">${filters.map(([v, l]) => `<button class="chip ${ui.sheet.filter === v ? 'on' : ''}" data-act="sheet-filter" data-v="${v}">${esc(l)}</button>`).join('')}</div>
    <div class="searchbar">${icon('search')}<input id="sq" type="search" placeholder="Search…" value="${esc(ui.sheet.query)}" autocomplete="off"></div>
    <button class="btn wide" data-act="swap-random" data-i="${ui.sheet.index}">${icon('shuffle')} Surprise me</button>
    <div id="sheet-list" class="sheet-list"></div>
  </div>`;
  renderSheetList(s);
}

function renderSheetList(s) {
  const el = $('#sheet-list');
  if (!el || !ui.sheet) return;
  const current = RECIPE_BY_ID[s.plan.slots[ui.sheet.index]?.id];
  const kind = current ? kindOf(current, s.rules.eggsCountAsVeg) : null;
  const f = ui.sheet.filter;
  let list = alternatives(s, ui.sheet.index, {
    kind: f === 'any' ? null : kind,
    group: f === 'same' ? current?.group : null,
    query: ui.sheet.query,
  });
  if (f === 'regulars') list = list.filter((r) => r.regular);
  el.innerHTML = list.slice(0, 60).map((r) => `<button class="pick" data-act="choose" data-id="${r.id}">
      <span class="rname">${dietDot(r)} ${esc(r.name)}</span>
      <span class="badges">${ratingBadge(s, r)}</span>
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

function finalizeWeek() {
  update((d) => {
    d.plan.finalizedAt = Date.now();
    d.plan.slots = d.plan.slots.map((x) => ({ ...x, locked: true }));
  });
  flushSync().catch(() => {});
}

function replaceSlot(i, id) {
  update((d) => { d.plan.slots[i] = { id, locked: false }; });
}

const actions = {
  tab: (el) => setTab(el.dataset.tab),
  shuffle: () => {
    if (getState().plan.finalizedAt) return;
    update((d) => { d.plan.slots = generateSlots(d); });
    toast('New dishes picked — locked ones kept');
  },
  count: (el) => {
    const key = el.dataset.k;
    update((d) => {
      d.rules[key] = Math.max(0, Math.min(7, d.rules[key] + Number(el.dataset.d)));
      if (targetDishes(d.rules) > 7) d.rules[key]--;
      resizePlan(d);
    });
  },
  lock: (el) => update((d) => { const x = d.plan.slots[el.dataset.i]; x.locked = !x.locked; }),
  'swap-random': (el) => {
    const i = Number(el.dataset.i);
    const r = randomSwap(getState(), i);
    if (r) { replaceSlot(i, r.id); toast(`Swapped in ${r.name}`); } else toast('No other dish fits — try Pick');
    ui.sheet = null; render();
  },
  'open-sheet': (el) => { ui.sheet = { index: Number(el.dataset.i), filter: 'kind', query: '' }; renderSheet(getState()); },
  'close-sheet': () => { ui.sheet = null; renderSheet(getState()); },
  'sheet-filter': (el) => { ui.sheet.filter = el.dataset.v; renderSheet(getState()); },
  choose: (el) => { const i = ui.sheet.index; ui.sheet = null; replaceSlot(i, el.dataset.id); },
  rate: (el) => update((d) => {
    const id = el.dataset.id, p = Number(el.dataset.p), v = Number(el.dataset.v);
    const entry = d.ratings[id] || { r: [null, null], note: '' };
    entry.r[p] = entry.r[p] === v ? null : v; // tap the same star again to clear
    d.ratings[id] = entry;
  }),
  note: (el) => {
    const id = el.dataset.id;
    const current = getState().ratings[id]?.note || '';
    const text = prompt('Note for next time (e.g. “more spice”, “use thigh not breast”)', current);
    if (text === null) return;
    update((d) => { d.ratings[id] = { r: [null, null], ...d.ratings[id], note: text.trim() }; });
  },
  hide: (el) => {
    const id = el.dataset.id;
    const hiding = !getState().hidden.includes(id);
    update((d) => { d.hidden = hiding ? [...d.hidden, id] : d.hidden.filter((x) => x !== id); });
    toast(hiding ? 'Won’t be suggested again (see “Hidden” to undo)' : 'Back in the mix');
  },
  add: (el) => {
    const s = getState();
    const r = RECIPE_BY_ID[el.dataset.id];
    const kind = kindOf(r, s.rules.eggsCountAsVeg);
    const key = kind === 'veg' ? 'vegDishes' : 'chickenDishes';
    if (s.plan.finalizedAt) { toast('This week is finalized — tap “Edit week” on the Week tab first'); return; }
    if (targetDishes(s.rules) >= 7) { toast('Week is full — use “Pick” on a dish in the Week tab to replace it'); return; }
    update((d) => { d.plan.slots.push({ id: r.id, locked: true }); d.rules[key]++; resizePlan(d); });
    toast(`Added to this week as a ${kind === 'veg' ? 'veg' : 'chicken'} dish (locked)`);
  },
  expand: (el) => { ui.expanded = ui.expanded === el.dataset.id ? null : el.dataset.id; renderRecipeList(getState()); },
  group: (el) => { ui.group = el.dataset.g; render(); },
  check: (el) => update((d) => { d.checked[el.dataset.key] = el.checked; }),
  'toggle-amounts': (el) => { ui.showAmounts = el.checked; store.set('twoplates.amounts', el.checked ? '1' : '0'); render(); },
  'toggle-log': (el) => { ui.logBought = el.checked; render(); },
  pantry: (el) => update((d) => { d.pantry[el.dataset.id] = el.dataset.v === 'true'; }),
  'pantry-toggle': (el) => update((d) => { d.pantry[el.dataset.id] = el.checked; }),
  'del-extra': (el) => update((d) => { d.extras = d.extras.filter((x) => x.id !== el.dataset.id); }),
  'uncheck-all': () => update((d) => { d.checked = {}; }),
  export: async () => {
    try { toast('Preparing Excel file…'); await exportExcel(getState()); } catch (e) { toast(e.message); }
  },
  share: async () => {
    // Sending the list means these are the week's dishes: finalize and save first,
    // so nothing can change them while the share sheet is open.
    if (!getState().plan.finalizedAt) { finalizeWeek(); toast('Week finalized'); }
    await flushSync().catch(() => {});
    const s = getState();
    const title = `Two Plates — week of ${fmtWeek(s.plan.weekOf)}`;
    const text = weeklyNoteText(s, { amounts: ui.showAmounts });
    if (navigator.share) { try { await navigator.share({ title, text }); } catch { /* cancelled */ } }
    else actions.copy();
  },
  copy: async () => {
    const s = getState();
    const text = `Two Plates — week of ${fmtWeek(s.plan.weekOf)}\n\n${weeklyNoteText(s, { amounts: ui.showAmounts })}`;
    try { await navigator.clipboard.writeText(text); toast('Copied — paste it into a new Keep note'); } catch { toast('Couldn’t copy on this browser'); }
  },
  finalize: () => {
    finalizeWeek();
    setTab('groceries');
    toast('Week finalized — here’s your grocery list');
  },
  unfinalize: () => {
    if (!confirm('Edit this week? Changing dishes also changes the grocery list — fine if you haven’t shopped yet.')) return;
    update((d) => { d.plan.finalizedAt = 0; });
  },
  'checkin-open': () => { ui.checkin = true; ui.tab = 'week'; window.scrollTo(0, 0); render(); },
  'checkin-close': () => { ui.checkin = false; render(); },
  cooked: (el) => update((d) => { d.plan.cooked = { ...d.plan.cooked, [el.dataset.id]: el.dataset.v === '1' }; }),
  carry: (el) => update((d) => { d.plan.carry = { ...d.plan.carry, [el.dataset.id]: el.checked }; }),
  'finish-week': () => {
    update((d) => {
      const cooked = d.plan.cooked || {};
      const carry = d.plan.carry || {};
      d.history = [...d.history, {
        weekOf: d.plan.weekOf, finalizedAt: d.plan.finalizedAt || null,
        ids: d.plan.slots.map((x) => x.id), cooked, bought: d.bought,
      }].slice(-26);
      // Uncooked dishes you chose to keep start next week locked in place.
      const kept = d.plan.slots.filter((x) => cooked[x.id] === false && carry[x.id] !== false)
        .map((x) => ({ id: x.id, locked: true }));
      d.plan = { weekOf: weekStart(d.rules.startDay), slots: kept, cooked: {}, carry: {}, startedAt: Date.now(), finalizedAt: 0 };
      d.plan.slots = generateSlots(d);
      d.checked = {};
      d.bought = {};
      d.extras = [];
    });
    ui.checkin = false;
    window.scrollTo(0, 0);
    render();
    toast('Week saved — here’s next week');
  },
  set: (el) => {
    const path = el.dataset.path;
    update((d) => setPath(d, path, Number(el.dataset.value)));
    if (path.startsWith('rules.') && path !== 'rules.mealsPerDish') toast('Saved — applies next time you shuffle');
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
    if (!confirm('Reset all settings, ratings and the current plan to the defaults? This also resets the other phone if sync is on.')) return;
    update((d) => Object.assign(d, defaultState()));
    ensurePlan();
    toast('Reset to defaults');
  },
};

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || el.tagName === 'INPUT' || el.disabled) return;
  const fn = actions[el.dataset.act];
  if (fn) { e.preventDefault(); fn(el, e); }
});

document.addEventListener('change', (e) => {
  const el = e.target;
  if (el.dataset.act && actions[el.dataset.act] && el.type === 'checkbox') { actions[el.dataset.act](el); return; }
  if (el.dataset.bought !== undefined) {
    update((d) => { d.bought[el.dataset.bought] = el.value.trim(); });
    return;
  }
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
    const value = el.type === 'checkbox' ? el.checked : el.type === 'text' ? el.value.trim() : Number(el.value);
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
    connect(cfg, { join: true }).then(render);
  }
});

document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && ui.sheet) actions['close-sheet'](); });

// ---------- Boot ----------
if (DATA_ERRORS.length) console.warn('Recipe data problems:', DATA_ERRORS);
onChange(() => render());
onSyncStatus(() => { renderHeader(); if (ui.tab === 'settings') render(); });
// Re-check the plan whenever the shared state arrives from the other phone.
onChange(() => {
  const s = getState();
  const c = kindCounts(s);
  if (c.chicken !== s.rules.chickenDishes || c.veg !== s.rules.vegDishes) queueMicrotask(ensurePlan);
});
function openFromLink() {
  const h = location.hash.slice(1);
  if (h === 'checkin') { ui.tab = 'week'; ui.checkin = true; }
  else if (['week', 'recipes', 'groceries', 'settings'].includes(h)) { ui.tab = h; ui.checkin = false; }
  else return;
  history.replaceState(null, '', location.pathname);
  render();
}
window.addEventListener('hashchange', openFromLink);
migrate();
ensurePlan();
render();
openFromLink();
startSync();

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
