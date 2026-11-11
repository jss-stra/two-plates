// Public, read-only menu page. Everything it shows comes from the link itself
// (?n=week number&w=week start&d=dish ids), so no personal data is involved.
import { RECIPE_BY_ID, youtubeUrl, isVeg } from './data.js';
import './imported.js'; // registers imported recipes into RECIPE_BY_ID for menu links

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const q = new URLSearchParams(location.search);
const no = q.get('n');
const weekOf = q.get('w');
const dishes = (q.get('d') || '').split(',').map((id) => RECIPE_BY_ID[id]).filter(Boolean);
const when = weekOf ? new Date(`${weekOf}T12:00:00`).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'long' }) : '';

const item = (r) => `<div class="menu-item">
  <div><h3><span class="dot diet-${r.diet}"></span> ${esc(r.name)}</h3>
    <div class="meta">${esc(r.cuisine)}${r.time == null ? ` · fixed ${r.baseServings}-serving batch` : ` · ${r.time} min`} · ${r.protein == null ? 'nutrition unknown' : `${r.nutritionApproximate ? '~' : ''}${r.protein} g protein per serving`}</div></div>
  ${r.imported
    ? '<span class="fine">Recipe in the Two Plates app</span>'
    : `<a class="btn small" href="${youtubeUrl(r)}" target="_blank" rel="noopener">Recipe</a>`}
</div>`;

const chicken = dishes.filter((r) => !isVeg(r, false));
const veg = dishes.filter((r) => isVeg(r, false));
const title = `${no ? `Week ${esc(no)} menu` : 'This week’s menu'}`;
document.title = `${no ? `Week ${no} Menu` : 'Weekly Menu'} – Two Plates`;

document.getElementById('menu').innerHTML = dishes.length ? `
  <div class="menu-hero"><img src="icons/icon.svg" alt="">
    <h1>${title}</h1><div class="muted">${when ? `Week of ${esc(when)} · ` : ''}${dishes.length} dishes, cooked at home</div></div>
  ${chicken.length ? `<section class="card"><h2>Chicken &amp; turkey</h2>${chicken.map(item).join('')}</section>` : ''}
  ${veg.length ? `<section class="card"><h2>Veg</h2>${veg.map(item).join('')}</section>` : ''}
  <p class="fine foot">Planned with Two Plates · each dinner also makes the next day's lunch</p>`
  : '<p class="empty">This menu link looks incomplete.</p>';
