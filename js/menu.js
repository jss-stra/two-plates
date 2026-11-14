// Public, read-only menu page. Everything it shows comes from the link itself
// (?n=week number&w=week start&d=dish ids), so no personal data is involved.
import { RECIPE_BY_ID, youtubeUrl, DISPLAY_GROUPS, displayKind } from './data.js';
import './imported.js'; // registers imported recipes into RECIPE_BY_ID for menu links

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const q = new URLSearchParams(location.search);
const no = q.get('n');
const weekOf = q.get('w');
// Your own dishes aren't in the bundled catalog - the link carries their
// names (cn, aligned with the custom: ids in d) so the page needs no account.
let customNames = {};
try { customNames = JSON.parse(q.get('cn') || '{}'); } catch { customNames = {}; }
const fromSlug = (id) => id.replace(/^custom:/, '').replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
const dishes = (q.get('d') || '').split(',').map((id) => RECIPE_BY_ID[id]
  || (id.startsWith('custom:') && (customNames[id] || fromSlug(id))
    ? { id, name: customNames[id] || fromSlug(id), custom: true, cuisine: 'Your dish', diet: 'unknown', time: null, protein: null }
    : null)).filter(Boolean);
const when = weekOf ? new Date(`${weekOf}T12:00:00`).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'long' }) : '';

const item = (r) => `<div class="menu-item">
  <div><h3><span class="dot diet-${r.diet}"></span> ${esc(r.name)}</h3>
    <div class="meta">${esc(r.cuisine)}${r.custom ? '' : r.time == null ? ` · fixed ${r.baseServings}-serving batch` : ` · ${r.time} min`} · ${r.protein == null ? 'nutrition unknown' : `${r.nutritionApproximate ? '~' : ''}${r.protein} g protein per serving`}</div></div>
  ${r.imported
    ? '<span class="fine">Recipe in the Two Plates app</span>'
    : `<a class="btn small" href="${youtubeUrl(r)}" target="_blank" rel="noopener">Recipe</a>`}
</div>`;

const title = `${no ? `Week ${esc(no)} menu` : 'This week’s menu'}`;
document.title = `${no ? `Week ${no} Menu` : 'Weekly Menu'} – Two Plates`;

// A "Back to Two Plates" toggle for when this page opens inside the installed
// app, which has no browser back button — without it the only way back was to
// close and reopen the app. Left off for people opening a shared menu link in
// a normal browser, where the browser's own back button works.
const inApp = document.referrer.startsWith(location.origin)
  || navigator.standalone === true
  || window.matchMedia?.('(display-mode: standalone)').matches
  || window.matchMedia?.('(display-mode: fullscreen)').matches;
if (inApp) {
  const bar = document.createElement('div');
  bar.className = 'backbar';
  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'btn small';
  back.textContent = '\u2039 Back to Two Plates';
  back.addEventListener('click', () => {
    if (document.referrer.startsWith(location.origin) && history.length > 1) history.back();
    else location.href = './';
  });
  bar.append(back);
  document.body.prepend(bar);
}

document.getElementById('menu').innerHTML = dishes.length ? `
  <div class="menu-hero"><img src="icons/icon.svg" alt="">
    <h1>${title}</h1><div class="muted">${when ? `Week of ${esc(when)} · ` : ''}${dishes.length} dishes, cooked at home</div></div>
  ${DISPLAY_GROUPS.map(([kind,label]) => {
    const list = dishes.filter(r => displayKind(r, false) === kind);
    return list.length ? `<section class="card"><h2>${esc(label)}</h2>${list.map(item).join('')}</section>` : '';
  }).join('')}
  <p class="fine foot">Planned with Two Plates · each dinner also makes the next day's lunch</p>`
  : '<p class="empty">This menu link looks incomplete.</p>';
