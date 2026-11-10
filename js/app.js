import { renderPrep, setupPrepEvents } from './prep.js';
import { renderExtrasCard, renderPartiesCard, setupGroceryEvents } from './grocery-ui.js';
import { RECIPES, RECIPE_BY_ID, GROUPS, INGREDIENTS, DIET_LABEL, PROTEIN_LABEL, youtubeUrl, isVeg, kindOf, DATA_ERRORS, exclusionHits } from './data.js';
import { getState, update, onChange, defaultState, replaceState } from './state.js';
import { generateSlots, planRecipes, alternatives, randomSwap, mealFor, perMealGoal, dailyEstimate, weekStart, ratingOf, targetDishes, localISO } from './planner.js';
import { renderLog, shiftDay, shiftMonth } from './log.js';
import { buildGrocery, weeklyNoteText, scaleFactor, formatQty, qtyText } from './grocery.js';
import { exportExcel } from './export.js';
import { renderBought, loadReceipts, onReceipts, addReceipt, removeReceipt, rereadReceipt, shiftWeek } from './receipts.js';
import { startSync, connect, disconnect, flushSync, getConfig, newHouseholdCode, onSyncStatus, syncStatus } from './sync.js';
import { waterGoal, waterReminderDue, markWaterReminded } from './water.js';
import { renderHome } from './home.js';
import { pushStatus, enablePush, disablePush } from './push.js';

const $ = (sel, el = document) => el.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get(k, d) { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};

// Per-device view preferences (not synced).
const ui = {
  tab: 'home', // Home is the default landing screen on every open
  search: '', group: 'All', vegOnly: false, quick: false, sort: 'smart', expanded: null,
  sheet: null, // { index, filter, query }
  showAmounts: store.get('twoplates.amounts', '0') === '1',
  logBought: false,
  checkin: false,
  logDate: localISO(),
  logPerson: Number(store.get('twoplates.me', '0')) || 0, // whose phone this is
  logView: 'day',
  pushStatus: 'off',
  logMonth: localISO().slice(0, 7),
  boughtWeek: null, // null = the week being planned
  uploading: false,
  gview: 'tobuy', // groceries filter: tobuy | have | bought
  gsection: '', // groceries sub-screen: '' | extras | parties
  showAll: false, // recipes: show every match instead of the first page
  xq: { allergies: '', dislikes: '' }, // settings: ingredient search text for exclusions
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
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  note: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  dots: '<circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.2 5.2l1.8 1.8M17 17l1.8 1.8M18.8 5.2 17 7M7 17l-1.8 1.8"/>',
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

// Warning badges for dishes containing excluded ingredients (Settings → Allergies & dislikes).
function exclBadge(s, r) {
  const h = exclusionHits(r, s.exclusions);
  const names = (ids) => ids.map((id) => esc(INGREDIENTS[id]?.name || id)).join(', ');
  return [
    h.allergies.length ? `<span class="badge allerg">⚠ ${names(h.allergies)}</span>` : '',
    h.dislikes.length ? `<span class="badge disl">${names(h.dislikes)}</span>` : '',
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
      <span class="badges">${ratingBadge(s, r)}${exclBadge(s, r)}</span>
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
      ${final ? `<a class="act yt" href="${youtubeUrl(r)}" target="_blank" rel="noopener">${icon('play')}<span>YouTube</span></a>` : `
      <button class="act primary-act" data-act="swap-random" data-i="${i}" ${slot.locked ? 'disabled' : ''}>${icon('shuffle')}<span>Swap</span></button>
      <span class="act-spacer"></span>
      <details class="dish-more"><summary class="act icon-only" aria-label="More actions for ${esc(r.name)}">${icon('dots')}</summary>
        <button class="act ${slot.locked ? 'on' : ''}" data-act="lock" data-i="${i}">${icon(slot.locked ? 'lock' : 'unlock')}<span>${slot.locked ? 'Unlock' : 'Lock'}</span></button>
        <button class="act" data-act="open-sheet" data-i="${i}">${icon('list')}<span>Pick…</span></button>
        <a class="act yt" href="${youtubeUrl(r)}" target="_blank" rel="noopener">${icon('play')}<span>YouTube</span></a>
      </details>`}
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

function glanceChip(d) {
  const p = d.person;
  const ps = status(d.protein, p.proteinMin, p.proteinMax, 'protein');
  return `<span class="pill ${ps.cls}">${esc(p.name)} · ${ps.text}</span>`;
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
  return `<section class="card summary">
    <div class="summary-head"><div><h2>This week</h2>
      <div class="muted">${recipes.length} dishes · ${fmtTime(totalTime)} cooking in total</div></div></div>
    <div class="glance-chips">${daily(s).map(glanceChip).join('')}</div>
    <details class="nutrition-detail"><summary>Nutrition details</summary>
      <div class="people">${daily(s).map((d) => personSummary(d, s.rules)).join('')}</div>
      <p class="fine">Average day: ${s.rules.mealsPerDish === 2 ? 'lunch + dinner from these dishes' : 'dinner from these dishes'}, plus shake, breakfast &amp; snacks from Settings. Cook in any order.</p>
    </details>
  </section>

  ${s.plan.finalizedAt ? `<section class="card final-card">
    <div><b>${icon('check')} Week ${s.history.length + 1} · finalized ${fmtDate(s.plan.finalizedAt)}</b>
      <div class="muted">These are this week's dishes. The grocery list and Friday check-in use exactly these.</div></div>
    <div class="final-actions">
      <button class="btn small primary" data-act="share-menu">${icon('share')} Share menu</button>
      <a class="btn small" href="${menuUrl(s.history.length + 1, s.plan.weekOf, s.plan.slots.map((x) => x.id))}" target="_blank" rel="noopener">Menu page</a>
      <button class="link" data-act="unfinalize">Edit week</button>
    </div>
  </section>` : ''}

  ${section('chicken', 'Non-veg')}
  ${section('veg', 'Veg')}

  ${s.plan.finalizedAt ? '' : `<div class="remix-row">
    <span class="mix-count">${s.rules.chickenDishes} non-veg · ${s.rules.vegDishes} veg</span>
    <button class="btn small" data-act="shuffle">${icon('shuffle')} Shuffle${lockedCount ? ` (keeps ${lockedCount} locked)` : ''}</button>
    <details class="mix-detail"><summary>Change the mix</summary>
      <div class="toolbar">
        ${counter('Non-veg', 'chickenDishes', s.rules.chickenDishes, 7 - s.rules.vegDishes)}
        ${counter('Veg', 'vegDishes', s.rules.vegDishes, 7 - s.rules.chickenDishes)}
      </div>
    </details>
  </div>`}

  <div class="stack">
    ${s.plan.finalizedAt
      ? `<button class="btn primary wide" data-act="tab" data-tab="groceries">${icon('cart')} Grocery list</button>`
      : `<button class="btn primary wide" data-act="finalize">${icon('check')} Finalize these ${recipes.length} dishes → grocery list</button>`}
    <button class="btn wide ghost" data-act="tab" data-tab="prep">${icon('clock')} Plan my prep</button>
    <button class="btn wide ghost" data-act="checkin-open">${icon('check')} Weekly check-in &amp; plan next week</button>
  </div>
  ${pastWeeks(s)}`;
}

// Every finalized week (this one included) with each dish's recipe link, newest first.
function pastWeeks(s) {
  const weeks = s.history.map((h, i) => ({ ...h, no: i + 1 }));
  if (s.plan.finalizedAt) {
    weeks.push({ weekOf: s.plan.weekOf, finalizedAt: s.plan.finalizedAt, ids: s.plan.slots.map((x) => x.id),
      cooked: s.plan.cooked, no: s.history.length + 1, current: true });
  }
  if (!weeks.length) return '';
  return `<details class="card past" ${s.history.length ? '' : 'open'}>
    <summary><b>Saved weeks</b> <span class="muted">(${weeks.length})</span></summary>
    ${weeks.reverse().map((h) => `<div class="past-week">
      <div class="past-head"><span>Week ${h.no} · ${fmtWeek(h.weekOf)}${h.current ? ' <span class="badge reg">This week</span>' : ''}${h.finalizedAt ? '' : ' <span class="fine">(not finalized)</span>'}</span>
        <a class="link" href="${menuUrl(h.no, h.weekOf, h.ids)}" target="_blank" rel="noopener">Menu page</a></div>
      <ul>${h.ids.map((id) => RECIPE_BY_ID[id]).filter(Boolean).map((r) => {
        const c = h.cooked?.[r.id];
        const avg = ratingOf(s, r.id);
        return `<li><span>${c === true ? '✓' : c === false ? '✗' : '·'} ${esc(r.name)}${avg !== null ? ` <span class="badge star-b">★ ${avg.toFixed(1)}</span>` : ''}</span>
          <a class="link" href="${youtubeUrl(r)}" target="_blank" rel="noopener">Recipe</a></li>`;
      }).join('')}</ul>
    </div>`).join('')}
  </details>`;
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
  const xa = new Set(s.exclusions?.allergies || []);
  const xd = new Set(s.exclusions?.dislikes || []);
  return `<ul class="ings">${r.items.map(({ id, qty }) => {
    const ing = INGREDIENTS[id];
    const cls = xa.has(id) ? 'xa' : xd.has(id) ? 'xd' : '';
    return `<li${cls ? ` class="${cls}"` : ''}><span>${esc(ing.name)}</span><span>${esc(qtyText(formatQty(ing, qty * factor)))}</span></li>`;
  }).join('')}</ul>`;
}

// Cooking method for dishes that ship one (world import): lazy-fetched per dish,
// cached by the service worker after first view. Dishes without a file keep YouTube only.
const stepsCache = new Map();
async function loadSteps(id) {
  const box = document.querySelector(`[data-steps-for="${id}"]`);
  if (!box) return;
  if (!stepsCache.has(id)) {
    try {
      const res = await fetch(`data/instructions/${id}.json`);
      stepsCache.set(id, res.ok ? await res.json() : null);
    } catch { stepsCache.set(id, null); }
  }
  const d = stepsCache.get(id);
  if (!d || !document.querySelector(`[data-steps-for="${id}"]`)) return;
  const src = d.source || {};
  box.innerHTML = `<div class="fine">How to cook it:</div>
    <ol class="steps-list">${(d.steps || []).map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
    <p class="fine">Method from <a class="link" href="${esc(src.url || 'https://github.com/farcrak/unitools-recipes')}" target="_blank" rel="noopener">${esc(src.name || 'UniTools World Recipes v2.0')}</a>, ${esc(src.license || 'CC BY-SA 4.0')}${src.modified === false ? ', used unmodified' : ''}.</p>`;
}

function recipeRow(r, s) {
  const inWeek = s.plan.slots.some((x) => x.id === r.id);
  const hidden = s.hidden.includes(r.id);
  const open = ui.expanded === r.id;
  return `<div class="rrow ${open ? 'open' : ''}">
    <button class="rrow-main" data-act="expand" data-id="${r.id}">
      <span class="rname">${dietDot(r)} ${esc(r.name)}</span>
      <span class="badges">${ratingBadge(s, r)}${exclBadge(s, r)}</span>
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
      <div class="steps" data-steps-for="${r.id}"></div>
      <a class="btn small" href="${youtubeUrl(r)}" target="_blank" rel="noopener">${icon('play')} Find it on YouTube</a>
    </div>` : ''}
  </div>`;
}

const RECIPE_PAGE = 30;
function renderRecipeList(s) {
  const list = filteredRecipes(s);
  const el = $('#recipe-list');
  if (!el) return;
  const shown = ui.showAll ? list : list.slice(0, RECIPE_PAGE);
  el.innerHTML = `<div class="fine count">Showing ${shown.length} of ${list.length} dishes</div>`
    + (list.length ? shown.map((r) => recipeRow(r, s)).join('') : '<p class="empty">Nothing matches — try fewer filters.</p>')
    + (!ui.showAll && list.length > RECIPE_PAGE
      ? `<button class="btn wide show-more" data-act="recipes-more">Show all ${list.length} dishes</button>` : '');
}

function renderRecipes(s) {
  const groups = ['All', 'Our regulars', 'Top rated', 'Rated', ...GROUPS, ...(s.hidden.length ? ['Hidden'] : [])];
  return `
  <div class="searchbar">${icon('search')}<input id="q" type="search" placeholder="Search dishes or ingredients…" value="${esc(ui.search)}" autocomplete="off"></div>
  <div class="chips">${groups.map((g) => `<button class="chip ${ui.group === g ? 'on' : ''}" data-act="group" data-g="${esc(g)}">${esc(g)}${g === 'Hidden' ? ` (${s.hidden.length})` : ''}</button>`).join('')}
    <button class="chip ${ui.vegOnly ? 'on' : ''}" data-act="rtoggle" data-k="vegOnly">Veg only</button>
    <button class="chip ${ui.quick ? 'on' : ''}" data-act="rtoggle" data-k="quick">≤ 30 min</button></div>
  <div class="filters">
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
  const qty = (ui.showAmounts || habit || i.extraId || i.key.startsWith('p:')) && i.text ? `<span class="qty">${esc(i.text)}</span>` : '';
  return `<div class="gitem ${i.checked ? 'done' : ''}">
    ${pantry ? '' : `<label class="check"><input type="checkbox" data-act="check" data-key="${esc(i.key)}" ${i.checked ? 'checked' : ''}><span class="box">${icon('check')}</span></label>`}
    <div class="gtext">
      <div class="gname">${esc(i.name)} ${qty}</div>
      ${i.dishes.length ? `<div class="fine">${esc([...new Set(i.dishes)].join(' · '))}</div>` : ''}
      ${ui.logBought && !pantry ? `<input class="bought" data-bought="${esc(i.key)}" value="${esc(i.bought)}" placeholder="How much did you get? e.g. 1 kg, 2 packs" autocomplete="off">` : ''}
    </div>
    ${i.id ? `<button class="link" data-act="pantry" data-id="${i.id}" data-v="${pantry ? 'false' : 'true'}">${pantry ? 'Need to buy' : 'Have it'}</button>`
      : i.extraId ? `<button class="link" data-grocery-action="edit-extra" data-id="${esc(i.extraId)}">Edit</button><button class="act icon-only" data-act="del-extra" data-id="${esc(i.extraId)}" aria-label="Remove">${icon('x')}</button>` : ''}
  </div>${i.extraId ? `<div data-extra-editor="${esc(i.extraId)}" hidden class="card"></div>` : ''}`;
}

function groceryNavRows(s) {
  return `<section class="card navrows">
    <button class="navrow" data-act="gsection" data-v="extras"><span><b>Beyond the recipes</b><small>Drinks, snacks, breakfast, household — kept between weeks</small></span><span class="chev">›</span></button>
    <button class="navrow" data-act="gsection" data-v="parties"><span><b>Guests &amp; parties</b><small>Extra dishes when people come over${s.occasions?.length ? ` · ${s.occasions.length} planned` : ''}</small></span><span class="chev">›</span></button>
    <button class="navrow" data-act="tab" data-tab="bought"><span><b>Receipts &amp; spend</b><small>Photos of receipts, prices and shopping habits</small></span><span class="chev">›</span></button>
  </section>`;
}

function renderGroceries(s) {
  if (ui.gsection === 'extras') return renderExtrasCard(s);
  if (ui.gsection === 'parties') return renderPartiesCard(s);
  const g = buildGrocery(s);
  const done = g.shop.filter((i) => i.checked).length;
  const logged = g.shop.filter((i) => i.bought).length;
  const draft = s.plan.finalizedAt ? '' : `<section class="card banner"><div><b>Draft list</b>
    <div class="muted">Finalize this week's dishes so the list doesn't change after you shop.</div></div>
    <button class="btn primary" data-act="finalize">Finalize</button></section>`;
  const view = ui.gview;
  const shopGroups = g.shopGroups
    .map((grp) => ({ ...grp, items: grp.items.filter((i) => view === 'bought' ? i.checked : !i.checked) }))
    .filter((grp) => grp.items.length);
  const listBody = view === 'have'
    ? (g.pantry.length
      ? `<p class="fine" style="margin:0 4px 10px">Staples you usually have — not on the shopping list. Tap “Need to buy” if you're out.</p>
        ${g.pantryGroups.map((grp) => `<section class="gsec"><h3>${esc(grp.label)}</h3>${grp.items.map((i) => gItem(i, true)).join('')}</section>`).join('')}`
      : '<p class="empty">No pantry staples listed.</p>')
    : (shopGroups.length
      ? shopGroups.map((grp) => `<section class="gsec"><h3>${esc(grp.label)}</h3>${grp.items.map((i) => gItem(i, false)).join('')}</section>`).join('')
      : `<p class="empty">${view === 'bought' ? 'Nothing ticked off yet.' : 'Everything is ticked off — nice one.'}</p>`);
  return `${draft}
  <section class="card">
    <h2>Shopping list</h2>
    <div class="muted">${planRecipes(s).length} dishes · ${done} of ${g.shop.length} ticked${logged ? ` · ${logged} amount${logged === 1 ? '' : 's'} logged` : ''}</div>
    ${g.pricedCount ? `<div class="fine">About $${Math.round(g.cost)} for the ${g.pricedCount} items with prices from your receipts</div>` : ''}
    <div class="chips gview">${[['tobuy', 'To buy'], ['have', 'Already have'], ['bought', `Bought${done ? ` (${done})` : ''}`]]
      .map(([v, l]) => `<button class="chip ${view === v ? 'on' : ''}" data-act="gview" data-v="${v}">${l}</button>`).join('')}</div>
    <div class="btnrow share-row">
      <button class="btn primary" data-act="share">${icon('share')} Share</button>
      <details class="share-more"><summary class="btn">More</summary>
        <div class="share-more-body">
          <div class="btnrow">
            <button class="btn" data-act="export">${icon('download')} Excel</button>
            <button class="btn" data-act="copy">${icon('copy')} Copy</button>
          </div>
          <p class="fine">“Share” opens your phone's share sheet. Pick Google Keep to get one note with this week's dishes and the shopping list. In Keep, tap ⋮ → Show checkboxes to tick items off.</p>
          <div class="gtoggles">
            <label class="toggle"><input type="checkbox" data-act="toggle-amounts" ${ui.showAmounts ? 'checked' : ''}><span>Show rough amounts</span></label>
            <label class="toggle"><input type="checkbox" data-act="toggle-log" ${ui.logBought ? 'checked' : ''}><span>Log what we bought</span></label>
          </div>
          ${ui.logBought ? '<p class="fine">Type roughly how much you got of each item. It’s saved with this week, and over time it lets the app suggest amounts that match how you actually shop.</p>' : ''}
        </div>
      </details>
    </div>
  </section>
  ${listBody}
  ${view === 'bought' && done ? `<button class="btn ghost wide" data-act="uncheck-all">Untick everything</button>` : ''}
  ${groceryNavRows(s)}`;
}

// ---------- Settings ----------
const num = (path, value, attrs = '') => `<input type="number" inputmode="decimal" data-set="${path}" value="${value}" ${attrs}>`;
function segSet(path, value, options) {
  return `<div class="seg">${options.map(([v, l]) => `<button class="${value === v ? 'on' : ''}" data-act="set" data-path="${path}" data-value="${v}">${l}</button>`).join('')}</div>`;
}

function pushUi(s) {
  const name = s.people[ui.logPerson]?.name || 'this person';
  if (ui.pushStatus === 'unsupported') return "<p class='fine'>This browser can't do push notifications. On iPhone, use the installed app (Share → Add to Home Screen).</p>";
  if (ui.pushStatus === 'blocked') return "<p class='fine'>Notifications are blocked for this app in the browser settings.</p>";
  if (!getConfig()?.url) return "<p class='fine'>Set up Sync between phones below first — reminders are sent through your household.</p>";
  if (ui.pushStatus === 'on') return `<p class="fine">Reminders are on for ${esc(name)} on this phone — they arrive even when the app is closed.</p>
    <button class="btn ghost" data-act="push-disable">Stop reminders on this phone</button>`;
  return `<button class="btn wide wrap" data-act="push-enable">Remind ${esc(name)} on this phone, even when the app is closed</button>
    <p class="fine">Sends a notification at 9am, noon, 3pm, 6pm and 9pm if no water was logged in the previous 3 hours, plus a 10pm check-in asking how many coffees, teas, milks and shakes you had.</p>`;
}

// ---------- Exclusions (allergies & dislikes) ----------
// Quick-add suggestions, filtered to ids that actually exist in the catalog.
const X_SUGGEST = ['peanuts', 'peanut_butter', 'cashews', 'sesame_seeds', 'sesame_oil', 'egg', 'soy_sauce', 'tofu', 'soya_chunks', 'fish_sauce', 'coconut_milk', 'mushrooms', 'coriander', 'capsicum', 'eggplant', 'okra', 'olives', 'halloumi'];

function renderXResults(s, kind) {
  const el = $(`#xres-${kind}`);
  if (!el) return;
  const q = (ui.xq[kind] || '').trim().toLowerCase();
  const taken = new Set([...(s.exclusions?.allergies || []), ...(s.exclusions?.dislikes || [])]);
  const ids = (q
    ? Object.keys(INGREDIENTS).filter((id) => !taken.has(id) && INGREDIENTS[id].name.toLowerCase().includes(q)).slice(0, 8)
    : X_SUGGEST.filter((id) => INGREDIENTS[id] && !taken.has(id)).slice(0, 8));
  el.innerHTML = ids.length
    ? `<div class="chips wrapchips">${ids.map((id) => `<button class="chip" data-act="xadd" data-k="${kind}" data-id="${id}">${esc(INGREDIENTS[id].name)}</button>`).join('')}</div>
      ${q ? '' : '<p class="fine">Suggestions — search above for anything else.</p>'}`
    : '<p class="fine">No matching ingredients.</p>';
}

function renderExclusions(s) {
  const section = (kind, title, hint) => {
    const ids = s.exclusions?.[kind] || [];
    const chips = ids.length
      ? ids.map((id) => `<span class="chip x${kind === 'allergies' ? 'a' : 'd'}">${esc(INGREDIENTS[id]?.name || id)}<button class="x" data-act="xdel" data-k="${kind}" data-id="${id}" aria-label="Remove ${esc(INGREDIENTS[id]?.name || id)}">×</button></span>`).join('')
      : '<span class="fine">None added.</span>';
    return `<h3 class="xtitle">${title} <span class="fine">${hint}</span></h3>
      <div class="chips wrapchips">${chips}</div>
      <div class="searchbar">${icon('search')}<input id="xq-${kind}" type="search" placeholder="Add an ingredient…" value="${esc(ui.xq[kind])}" autocomplete="off"></div>
      <div id="xres-${kind}"></div>`;
  };
  return `<section class="card">
    <h2>Allergies &amp; dislikes</h2>
    <p class="fine">Dishes listing these ingredients are skipped when you shuffle, and don't come up as swaps or in the dish picker. Dishes already in this week's plan get a warning badge so you can swap them out.</p>
    ${section('allergies', 'Allergies', 'skipped by the planner')}
    ${section('dislikes', 'Dislikes', 'also skipped')}
    <p class="fine"><b>Worth knowing:</b> Two Plates checks the ingredients written into its own recipes, plus direct forms of the same food (e.g. peanut butter counts as peanuts). It can't see what's inside packaged sauces, pastes or bread, and cross-contact isn't tracked. For a serious allergy, always check labels yourself.</p>
  </section>`;
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
          <label class="field"><span>Water goal (glasses/day)</span>${num(`people.${i}.waterGlasses`, waterGoal(p))}</label>
        </div>
        <p class="fine">“Outside plan” = shake, breakfast and snacks on a normal day. What's left is split across lunch and dinner: <b>${goal.min}–${goal.max} g protein per meal</b>.</p>
        <label class="field"><span><span>Portion size: <b>${p.portion.toFixed(2)}×</b> a standard serving</span>
          <span class="fine">≈ ${Math.round(avgP * p.portion)} g protein · ${Math.round(avgK * p.portion)} kcal per meal this week</span></span>
          <input type="range" min="0.5" max="2" step="0.05" data-set="people.${i}.portion" value="${p.portion}">
        </label>
      </div>`;
    }).join('')}
  </section>

  ${renderExclusions(s)}

  <section class="card">
    <h2>Water reminders</h2>
    <label class="rule toggle"><span>Nudge every 3 hours, 9am–9pm, when no water was logged in the previous 3 hours</span><input type="checkbox" data-set="rules.waterRemind" ${s.rules.waterRemind !== false ? 'checked' : ''}></label>
    ${pushUi(s)}
  </section>

  <section class="card">
    <h2>Planning rules</h2>
    <div class="rule"><span>Indian dishes among the veg</span>${segSet('rules.indianVeg', s.rules.indianVeg, [[0, '0'], [1, '1'], [2, '2'], [3, '3']])}</div>
    <div class="rule"><span>Each dish covers</span>${segSet('rules.mealsPerDish', s.rules.mealsPerDish, [[2, 'Dinner + lunch'], [1, 'Dinner only']])}</div>
    <label class="rule toggle"><span>Egg dishes count as veg</span><input type="checkbox" data-set="rules.eggsCountAsVeg" ${s.rules.eggsCountAsVeg ? 'checked' : ''}></label>
    <div class="rule"><span>Weeknight time limit</span>${segSet('rules.maxTime', s.rules.maxTime, [[30, '30m'], [45, '45m'], [60, '60m'], [90, 'Any']])}</div>
    <div class="rule"><span>Longer dishes allowed / week</span>${segSet('rules.longPerWeek', s.rules.longPerWeek, [[0, '0'], [1, '1'], [2, '2']])}</div>
    <div class="rule"><span>Min protein per serving</span>${segSet('rules.minProtein', s.rules.minProtein, [[15, '15g'], [20, '20g'], [25, '25g'], [30, '30g']])}</div>
    <p class="fine">Set how many non-veg and veg dishes you want on the Week tab.</p>
  </section>

  <section class="card">
    <h2>How often each cuisine comes up</h2>
    <p class="fine">Your star ratings matter more than these: 5★ dishes come up about 3× as often, 1★ almost never.</p>
    ${GROUPS.map((g) => `<div class="rule"><span>${esc(g)}</span>${segSet(`rules.cuisineWeights.${g}`, s.rules.cuisineWeights[g] ?? 2, [[0, 'Never'], [1, 'Rarely'], [2, 'Often'], [3, 'Lots']])}</div>`).join('')}
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
  const views = { prep: (st) => renderPrep(st, ui), home: (st) => renderHome(st), week: renderWeek, today: (st) => renderLog(st, ui, icon), recipes: renderRecipes, groceries: renderGroceries, bought: (st) => renderBought(st, ui, icon), settings: renderSettings };
  const scroll = window.scrollY;
  main.innerHTML = (views[ui.tab] || renderWeek)(s);
  if (ui.tab === 'recipes') renderRecipeList(s);
  if (ui.tab === 'settings') { renderXResults(s, 'allergies'); renderXResults(s, 'dislikes'); }
  const tabAlias = { bought: 'groceries', prep: 'week', settings: '' };
  const active = tabAlias[ui.tab] ?? ui.tab;
  document.querySelectorAll('.tabbar button').forEach((b) => b.classList.toggle('on', b.dataset.tab === active));
  renderHeader();
  renderSheet(s);
  window.scrollTo(0, scroll);
}

function renderHeader() {
  const st = syncStatus();
  $('#sync-dot').className = `sync-dot ${st.state}`;
  $('#sync-dot').title = st.message;
  $('#settings-btn')?.classList.toggle('on', ui.tab === 'settings');
}

// ---------- Actions ----------
function setTab(tab) {
  ui.tab = tab;
  if (tab === 'groceries') ui.gsection = '';
  store.set('twoplates.tab', tab);
  window.scrollTo(0, 0);
  render();
  if (tab === 'bought') loadReceipts();
}

// Public read-only menu page link for a week (dish ids live in the link itself).
function menuUrl(no, weekOf, ids) {
  const base = new URL('menu.html', location.href);
  base.search = `?n=${no}&w=${weekOf || ''}&d=${ids.join(',')}`; // ids are url-safe slugs
  return base.toString();
}

function menuMessage(s, no, weekOf, ids) {
  const recipes = ids.map((id) => RECIPE_BY_ID[id]).filter(Boolean);
  const line = (r) => `• ${r.name} (${r.cuisine}, ${r.time} min)\n  ${youtubeUrl(r)}`;
  const chicken = recipes.filter((r) => kindOf(r, s.rules.eggsCountAsVeg) === 'chicken');
  const veg = recipes.filter((r) => kindOf(r, s.rules.eggsCountAsVeg) === 'veg');
  return [`🍽️ Week ${no} menu — week of ${fmtWeek(weekOf)}`, '',
    ...(chicken.length ? ['*Non-veg*', ...chicken.map(line), ''] : []),
    ...(veg.length ? ['*Veg*', ...veg.map(line), ''] : []),
    `Full menu: ${menuUrl(no, weekOf, ids)}`].join('\n');
}

async function shareMenu(no, weekOf, ids) {
  const s = getState();
  const text = menuMessage(s, no, weekOf, ids);
  if (navigator.share) { try { await navigator.share({ text }); } catch { /* cancelled */ } return; }
  try { await navigator.clipboard.writeText(text); toast('Menu copied — paste it into WhatsApp'); } catch { toast('Couldn’t copy on this browser'); }
}

function finalizeWeek() {
  update((d) => {
    d.plan.finalizedAt = Date.now();
    d.plan.slots = d.plan.slots.map((x) => ({ ...x, locked: true }));
  });
  flushSync().catch(() => {});
}

// Edit one person's log entry for the day being viewed; 'at' lets sync merge
// both people's evening logs instead of one overwriting the other.
function setEntry(fn) {
  update((d) => {
    d.days ||= {};
    const day = (d.days[ui.logDate] ||= {});
    const e = (day[ui.logPerson] ||= {});
    fn(e);
    e.at = Date.now();
  });
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
    toast(`Added to this week as a ${kind === 'veg' ? 'veg' : 'non-veg'} dish (locked)`);
  },
  expand: (el) => {
    ui.expanded = ui.expanded === el.dataset.id ? null : el.dataset.id;
    renderRecipeList(getState());
    if (ui.expanded) loadSteps(ui.expanded);
  },
  rtoggle: (el) => { ui[el.dataset.k] = !ui[el.dataset.k]; ui.showAll = false; render(); },
  'recipes-more': () => { ui.showAll = true; renderRecipeList(getState()); },
  gview: (el) => { ui.gview = el.dataset.v; render(); },
  gsection: (el) => { ui.gsection = el.dataset.v; window.scrollTo(0, 0); render(); },
  group: (el) => { ui.group = el.dataset.g; ui.showAll = false; render(); },
  check: (el) => update((d) => { d.checked[el.dataset.key] = el.checked; }),
  'toggle-amounts': (el) => { ui.showAmounts = el.checked; store.set('twoplates.amounts', el.checked ? '1' : '0'); render(); },
  'toggle-log': (el) => { ui.logBought = el.checked; render(); },
  pantry: (el) => update((d) => { d.pantry[el.dataset.id] = el.dataset.v === 'true'; }),
  'pantry-toggle': (el) => update((d) => { d.pantry[el.dataset.id] = el.checked; }),
  xadd: (el) => {
    const id = el.dataset.id, kind = el.dataset.k;
    if (!INGREDIENTS[id] || !['allergies', 'dislikes'].includes(kind)) return;
    ui.xq[kind] = '';
    update((d) => {
      d.exclusions ||= { allergies: [], dislikes: [] };
      d.exclusions.allergies = (d.exclusions.allergies || []).filter((x) => x !== id);
      d.exclusions.dislikes = (d.exclusions.dislikes || []).filter((x) => x !== id);
      d.exclusions[kind].push(id);
    });
    const inWeek = planRecipes(getState()).some((r) => r.items.some((it) => it.id === id));
    toast(`${INGREDIENTS[id].name} added to ${kind === 'allergies' ? 'allergies' : 'dislikes'}${inWeek ? ' — check this week’s dishes for warnings' : ''}`);
  },
  xdel: (el) => update((d) => {
    const kind = el.dataset.k;
    if (d.exclusions?.[kind]) d.exclusions[kind] = d.exclusions[kind].filter((x) => x !== el.dataset.id);
  }),
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
  'log-set': (el) => setEntry((e) => {
    const f = el.dataset.field;
    const v = f === 'rating' ? Number(el.dataset.value) : el.dataset.value;
    e[f] = e[f] === v ? null : v; // tap again to clear
  }),
  'log-day': (el) => { const next = shiftDay(ui.logDate, Number(el.dataset.d)); if (next <= localISO()) { ui.logDate = next; render(); } },
  'log-person': (el) => { ui.logPerson = Number(el.dataset.p); store.set('twoplates.me', String(ui.logPerson)); render(); },
  'bought-week': (el) => {
    const s = getState();
    const next = shiftWeek(ui.boughtWeek || s.plan.weekOf, Number(el.dataset.d));
    if (next <= s.plan.weekOf) { ui.boughtWeek = next === s.plan.weekOf ? null : next; render(); }
  },
  'receipt-remove': (el) => {
    if (!confirm('Remove this receipt?')) return;
    removeReceipt(el.dataset.id).then(() => toast('Receipt removed'), (e) => toast(e.message));
  },
  'receipt-reread': (el) => { rereadReceipt(el.dataset.id).then(() => toast('Claude will read it again'), (e) => toast(e.message)); },
  'log-view': (el) => { ui.logView = el.dataset.v; render(); },
  'water-add': (el) => {
    const d = Number(el.dataset.d);
    setEntry((e) => {
      e.water = Math.max(0, (e.water || 0) + d);
      e.waterTs ||= [];
      if (d > 0) e.waterTs.push(Date.now()); else e.waterTs.pop();
      if (e.waterTs.length > 40) e.waterTs = e.waterTs.slice(-40);
    });
  },
  'push-enable': async () => {
    try { await enablePush(ui.logPerson); ui.pushStatus = 'on'; toast('Water reminders on for this phone'); }
    catch (err) { toast(err.message || 'Could not turn on reminders'); ui.pushStatus = await pushStatus(); }
    render();
  },
  'push-disable': async () => {
    await disablePush(ui.logPerson);
    ui.pushStatus = 'off';
    toast('Reminders stopped on this phone');
    render();
  },
  'log-month': (el) => { ui.logMonth = shiftMonth(ui.logMonth, Number(el.dataset.d)); render(); },
  'log-goto': (el) => { ui.logDate = el.dataset.date; ui.logPerson = Number(el.dataset.p); ui.logView = 'day'; window.scrollTo(0, 0); render(); },
  'log-cheatday': (el) => setEntry((e) => { e.cheatDay = el.checked; }),
  'log-uncheat': (el) => setEntry((e) => { e.cheats = (e.cheats || []).filter((_, i) => i !== Number(el.dataset.i)); }),
  'share-menu': () => {
    const s = getState();
    shareMenu(s.history.length + 1, s.plan.weekOf, s.plan.slots.map((x) => x.id));
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
      // Extras and occasions survive a new meal plan. Remove them explicitly in Groceries.
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
  if (el.dataset.receipt !== undefined && el.files?.length) {
    const files = [...el.files];
    ui.uploading = true; render();
    addReceipt(files, { by: ui.logPerson, weekOf: getState().plan.weekOf })
      .then(() => toast('Receipt saved — Claude will read it'), (err) => toast(`Not saved: ${err.message}`))
      .finally(() => { ui.uploading = false; render(); });
    return;
  }
  if (el.dataset.log) {
    setEntry((e) => { e[el.dataset.log] = el.value.trim(); });
    return;
  }
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
    ui.showAll = false;
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
  if (e.target.id === 'xq-allergies' || e.target.id === 'xq-dislikes') {
    const kind = e.target.id.slice(3);
    ui.xq[kind] = e.target.value;
    renderXResults(getState(), kind);
  }
  if (e.target.id === 'q') { ui.search = e.target.value; ui.showAll = false; renderRecipeList(getState()); }
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
  if (form.dataset.form === 'cheat') {
    const c = form.cheat.value.trim();
    if (!c) return;
    setEntry((e) => { e.cheats = [...(e.cheats || []), c]; });
  }
  if (form.dataset.form === 'sync') {
    const cfg = { url: form.url.value.trim(), key: form.key.value.trim(), household: form.household.value.trim() };
    if (!cfg.url || !cfg.key || !cfg.household) { toast('Fill in all three fields'); return; }
    connect(cfg, { join: true }).then(render);
  }
});

document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && ui.sheet) actions['close-sheet'](); });

// ---------- Boot ----------
setupGroceryEvents();
setupPrepEvents(ui, render, getState);
if (DATA_ERRORS.length) console.warn('Recipe data problems:', DATA_ERRORS);
onChange(() => render());
let receiptsTried = false;
onSyncStatus((st) => {
  renderHeader();
  if (ui.tab === 'settings') render();
  if (st.state === 'on' && !receiptsTried) { receiptsTried = true; loadReceipts(); }
});
onReceipts(() => { if (ui.tab === 'bought' || ui.tab === 'groceries') render(); });
// Re-check the plan whenever the shared state arrives from the other phone.
onChange(() => {
  const s = getState();
  const c = kindCounts(s);
  if (c.chicken !== s.rules.chickenDishes || c.veg !== s.rules.vegDishes) queueMicrotask(ensurePlan);
});
function openFromLink() {
  const h = location.hash.slice(1);
  if (h === 'checkin') { ui.tab = 'week'; ui.checkin = true; }
  else if (h === 'today') { ui.tab = 'today'; ui.logView = 'day'; ui.logDate = localISO(); }
  else if (['home', 'week', 'prep', 'recipes', 'groceries', 'bought', 'settings'].includes(h)) { ui.tab = h; ui.checkin = false; }
  else return;
  history.replaceState(null, '', location.pathname);
  render();
}
window.addEventListener('hashchange', openFromLink);
let lastDay = localISO();
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
  if (localISO() !== lastDay) { ui.logDate = lastDay = localISO(); render(); }
  if (ui.tab === 'bought') loadReceipts();
  checkWaterReminder();
});
// Water nudges: while the app is open, check every 15 min and on return.
function checkWaterReminder() {
  const s = getState();
  if (s.rules.waterRemind === false || !waterReminderDue(s, ui.logPerson)) return;
  const name = s.people[ui.logPerson]?.name || 'there';
  const msg = `No water logged in the last 3 hours, ${name} — time for a glass`;
  markWaterReminded();
  if ('Notification' in window && Notification.permission === 'granted') {
    try { new Notification('Two Plates — water break', { body: msg, icon: 'icons/icon-192.png' }); return; } catch { /* show in-app instead */ }
  }
  toast(msg);
}
setInterval(checkWaterReminder, 15 * 60 * 1000);

migrate();
ensurePlan();
render();
checkWaterReminder();
openFromLink();
startSync();
pushStatus().then((st) => { const changed = ui.pushStatus !== st; ui.pushStatus = st; if (changed && ui.tab === 'settings') render(); });

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
