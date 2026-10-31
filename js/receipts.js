// "Bought" tab: photos of grocery receipts go to the shared database, Claude reads them
// (a scheduled task on the Mac) and writes back the items, plus what it has learned about
// how you shop — which then shows up on the grocery list.
//
// Rows in meal_state, next to the household's plan:
//   <household>:receipt:<id>      { at, by, weekOf, status: new|read|unreadable, thumb, pages,
//                                   store, date, total, items: [{ name, size, qty, price, ing, cat }], note }
//   <household>:receipt-img:<id>  { images: [jpeg data URLs] }  (only fetched by Claude)
//   <household>:learned           { habits, staples, prices, weeks, insights, receiptsRead, updatedAt }
import { getConfig, syncClient } from './sync.js';
import { setLearned, buildGrocery } from './grocery.js';
import { localISO } from './planner.js';

const TABLE = 'meal_state';
const LEARNED_KEY = 'twoplates.learned.v1';
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = (n) => `$${(Math.round(n * 100) / 100).toFixed(2)}`;

export const CATEGORIES = {
  produce: 'Fruit & veg', meat: 'Meat & fish', dairy: 'Dairy & eggs', bakery: 'Bread & bakery', pantry: 'Pantry',
  frozen: 'Frozen', snacks: 'Snacks & treats', drinks: 'Drinks', household: 'Household & personal', other: 'Other',
};

let receipts = [];
let loaded = false;
let learned = null;
try { learned = JSON.parse(localStorage.getItem(LEARNED_KEY)) || null; } catch { /* ignore */ }
setLearned(learned);

const listeners = new Set();
export const onReceipts = (fn) => listeners.add(fn);
const emit = () => listeners.forEach((fn) => fn());
export const getLearned = () => learned;

const rowId = (kind, id) => `${getConfig().household}:${kind}${id ? `:${id}` : ''}`;

export async function loadReceipts() {
  const c = syncClient();
  if (!c || !getConfig()) return;
  const h = getConfig().household;
  const [list, l] = await Promise.all([
    c.from(TABLE).select('id,data').like('id', `${h}:receipt:%`),
    c.from(TABLE).select('data').eq('id', rowId('learned')).maybeSingle(),
  ]);
  if (list.error) return;
  receipts = list.data.map((r) => ({ ...r.data, id: r.id.split(':').pop() })).filter((r) => !r.removed).sort((a, b) => b.at - a.at);
  if (l.data?.data) {
    learned = l.data.data;
    try { localStorage.setItem(LEARNED_KEY, JSON.stringify(learned)); } catch { /* ignore */ }
    setLearned(learned);
  }
  loaded = true;
  emit();
}

// Shrink a photo to a size that's still easy to read (long receipts stay sharp enough).
function compress(file, maxSide, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
      const cv = document.createElement('canvas');
      cv.width = Math.round(img.naturalWidth * k);
      cv.height = Math.round(img.naturalHeight * k);
      const g = cv.getContext('2d');
      g.fillStyle = '#fff';
      g.fillRect(0, 0, cv.width, cv.height);
      g.drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(url);
      resolve(cv.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Couldn’t open that photo')); };
    img.src = url;
  });
}

async function save(kind, id, data) {
  const { error } = await syncClient().from(TABLE).upsert({ id: rowId(kind, id), data, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

// All photos picked together are one receipt (e.g. a long bill photographed in parts).
export async function addReceipt(files, { by, weekOf }) {
  if (!syncClient()) throw new Error('Connect sync in Settings first');
  const images = [];
  for (const f of files) images.push(await compress(f, 2000, 0.72));
  const thumb = await compress(files[0], 240, 0.6);
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  await save('receipt-img', id, { images });
  const meta = { at: Date.now(), by, weekOf, status: 'new', pages: images.length, thumb };
  await save('receipt', id, meta);
  receipts.unshift({ ...meta, id });
  emit();
}

async function rewrite(id, change) {
  const r = receipts.find((x) => x.id === id);
  if (!r) return;
  const { id: _, ...data } = { ...r, ...change };
  await save('receipt', id, data);
  Object.assign(r, change);
  if (change.removed) {
    receipts = receipts.filter((x) => x.id !== id);
    await save('receipt-img', id, { images: [] });
  }
  emit();
}
export const removeReceipt = (id) => rewrite(id, { removed: true });
export const rereadReceipt = (id) => rewrite(id, { status: 'new' });

// ---------- Week summary ----------
export function weekSummary(state, weekOf) {
  const list = receipts.filter((r) => r.weekOf === weekOf);
  const read = list.filter((r) => r.status === 'read');
  const items = read.flatMap((r) => r.items || []);
  const spend = read.reduce((a, r) => a + (Number(r.total) || 0), 0);
  const byCat = {};
  for (const i of items) byCat[i.cat || 'other'] = (byCat[i.cat || 'other'] || 0) + (Number(i.price) || 0);
  let check = null;
  // Compare with the shopping list, only for the week currently planned.
  if (read.length && state.plan.weekOf === weekOf) {
    const got = new Set(items.map((i) => i.ing).filter(Boolean));
    const shop = buildGrocery(state).shop.filter((r) => r.id);
    check = {
      listed: shop.length,
      got: shop.filter((r) => got.has(r.id)).length,
      missed: shop.filter((r) => !got.has(r.id)).map((r) => r.name),
      extras: items.filter((i) => !i.ing || !shop.some((r) => r.id === i.ing)).map((i) => i.name),
    };
  }
  return { list, read, items, spend, byCat, check, pending: list.filter((r) => r.status === 'new').length };
}

// ---------- Render ----------
const shiftWeek = (iso, n) => { const d = new Date(`${iso}T12:00:00`); d.setDate(d.getDate() + 7 * n); return localISO(d); };
export { shiftWeek };
const fmtDay = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
const fmtAt = (ts) => new Date(ts).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });

function receiptCard(r, s) {
  const who = s.people[r.by]?.name;
  const statusPill = { new: '<span class="pill info">Waiting to be read</span>', read: '<span class="pill ok">Read</span>', unreadable: '<span class="pill warn">Couldn’t read</span>' }[r.status] || '';
  const title = r.store ? `${esc(r.store)}${r.total ? ` · ${money(r.total)}` : ''}` : `Receipt${r.pages > 1 ? ` (${r.pages} photos)` : ''}`;
  const groups = {};
  for (const i of r.items || []) (groups[i.cat || 'other'] ||= []).push(i);
  return `<details class="card receipt">
    <summary>
      <img class="rthumb" src="${r.thumb}" alt="">
      <div class="rhead"><b>${title}</b>
        <div class="fine">${r.date ? esc(fmtDay(r.date)) : `Added ${fmtAt(r.at)}`}${who ? ` · by ${esc(who)}` : ''}${r.items?.length ? ` · ${r.items.length} items` : ''}</div>
        ${statusPill}</div>
    </summary>
    ${r.status === 'unreadable' ? `<p class="fine">${esc(r.note || 'The photo was too blurry or cut off.')} Try a flatter, closer photo — or several photos of a long receipt picked together.</p>` : ''}
    ${r.status === 'new' ? '<p class="fine">Claude reads new receipts around lunchtime and 9:45pm while the Claude app is open on the Mac. To do it now, tell Claude “read my receipts”.</p>' : ''}
    ${Object.entries(CATEGORIES).filter(([c]) => groups[c]).map(([c, label]) => `<h3>${label}</h3><ul class="ritems">${groups[c].map((i) => `<li><span>${esc(i.name)}${i.size ? ` <span class="fine">${esc(i.size)}</span>` : ''}${i.qty > 1 ? ` <span class="fine">×${i.qty}</span>` : ''}</span><span>${i.price != null ? money(i.price) : ''}</span></li>`).join('')}</ul>`).join('')}
    ${r.status === 'read' && r.note ? `<p class="fine">${esc(r.note)}</p>` : ''}
    <div class="btnrow">
      ${r.status !== 'new' ? `<button class="btn small" data-act="receipt-reread" data-id="${r.id}">Read again</button>` : ''}
      <button class="btn small ghost" data-act="receipt-remove" data-id="${r.id}">Remove</button>
    </div>
  </details>`;
}

function learnedCard() {
  const l = learned;
  if (!l?.receiptsRead) {
    return `<section class="card"><h2>What the app learns</h2>
      <p class="muted">After a few receipts, Claude fills in what you usually buy (pack sizes, brands), the things you get every week, and what each item costs. Your grocery list then shows “usually 1 kg pack” instead of rough grams, adds your weekly staples automatically and estimates the total.</p></section>`;
  }
  const habits = Object.keys(l.habits || {}).length;
  const weeks = Object.values(l.weeks || {}).map((w) => w.spend).filter(Boolean);
  const avg = weeks.length ? weeks.reduce((a, b) => a + b, 0) / weeks.length : null;
  return `<section class="card"><h2>What the app has learned</h2>
    <div class="stats three">
      <div><b>${l.receiptsRead}</b><span>receipts read</span></div>
      <div><b>${avg === null ? '–' : `$${Math.round(avg)}`}</b><span>avg per week</span></div>
      <div><b>${habits}</b><span>usual buys known</span></div>
    </div>
    ${l.insights?.length ? `<ul class="insights">${l.insights.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
    ${l.staples?.length ? `<p class="fine">Added to every grocery list: ${l.staples.map(esc).join(', ')}.</p>` : ''}
    ${l.updatedAt ? `<p class="fine">Updated ${fmtAt(l.updatedAt)}.</p>` : ''}
  </section>`;
}

export function renderBought(s, ui, icon) {
  if (!getConfig()) {
    return `<section class="card"><h2>Bought</h2><p class="muted">Receipts are kept in your shared space so Claude can read them. Connect sync in Settings first.</p>
      <button class="btn primary wide" data-act="tab" data-tab="settings">Open Settings</button></section>`;
  }
  const weekOf = ui.boughtWeek || s.plan.weekOf;
  const w = weekSummary(s, weekOf);
  const cats = Object.entries(w.byCat).sort((a, b) => b[1] - a[1]);
  const current = weekOf === s.plan.weekOf;
  return `
  <section class="card">
    <div class="day-nav">
      <button class="act icon-only" data-act="bought-week" data-d="-1" aria-label="Previous week">${icon('up', 'rot-l')}</button>
      <div class="day-title"><b>${current ? 'This week' : 'Week of'}</b> <span class="muted">${current ? 'week of ' : ''}${esc(fmtDay(weekOf))}</span></div>
      <button class="act icon-only" data-act="bought-week" data-d="1" ${current ? 'disabled' : ''} aria-label="Next week">${icon('up', 'rot-r')}</button>
    </div>
    <label class="btn primary wide ${ui.uploading ? 'busy' : ''}">${icon('camera')} ${ui.uploading ? 'Uploading…' : 'Add receipt photo'}
      <input type="file" accept="image/*" multiple data-receipt hidden ${ui.uploading ? 'disabled' : ''}></label>
    <p class="fine">Take a photo or pick a screenshot (Coles/Woolies e-receipts work too). Long receipt? Take a few photos and pick them all together.</p>
  </section>

  ${w.read.length ? `<section class="card">
    <h2>${money(w.spend)} spent</h2>
    <div class="muted">${w.read.length} receipt${w.read.length > 1 ? 's' : ''} · ${w.items.length} items${w.pending ? ` · ${w.pending} still to read` : ''}</div>
    <div class="catbars">${cats.map(([c, v]) => `<div class="catbar"><span>${CATEGORIES[c] || c}</span><i style="--w:${Math.max(4, Math.round((v / (cats[0][1] || 1)) * 100))}%"></i><b>${money(v)}</b></div>`).join('')}</div>
    ${w.check ? `<p class="fine"><b>${w.check.got} of ${w.check.listed}</b> list items are on your receipts.</p>
      ${w.check.missed.length ? `<details class="fine"><summary>${w.check.missed.length} list items not on a receipt (had them already, or forgot?)</summary>${w.check.missed.map(esc).join(', ')}</details>` : ''}
      ${w.check.extras.length ? `<p class="fine">Also bought: ${w.check.extras.map(esc).join(', ')}</p>` : ''}` : ''}
  </section>` : ''}

  ${w.list.length ? w.list.map((r) => receiptCard(r, s)).join('') : `<p class="empty">No receipts for this week yet.</p>`}
  ${learnedCard()}`;
}
