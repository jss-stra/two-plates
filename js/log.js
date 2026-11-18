// Daily food log ("Today" tab) and the month report built from it.
import { dishById } from './custom.js';
import { localISO, plannedFor } from './planner.js';
import { waterGoal, waterAnswer, waterCheckDay, slotLabel, slotsSoFar, WATER_SLOTS } from './water.js';
import { MEAL_KEYS, mealsOf, hasMeals, dayTotals, itemNutrition, itemLabel, macroText, fibreTarget } from './nutrition.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const entryFor = (state, iso, p) => state.days?.[iso]?.[p] || {};

const shiftDay = (iso, n) => { const d = new Date(`${iso}T12:00:00`); d.setDate(d.getDate() + n); return localISO(d); };
const fmtDay = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'short' });
const fmtMonth = (ym) => new Date(`${ym}-01T12:00:00`).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });

export function shiftMonth(ym, n) {
  const d = new Date(`${ym}-01T12:00:00`);
  d.setMonth(d.getMonth() + n);
  return localISO(d).slice(0, 7);
}
export { shiftDay };

const text = (field, value, placeholder, dis = '') => `<input class="log-input" data-log="${field}" value="${esc(value)}" placeholder="${esc(placeholder)}" autocomplete="off"${dis}>`;

// Has anything been logged for this person on this day?
export const isLogged = (e) => !!(e.rating || hasMeals(e) || e.cheats?.length);

const r0 = (x) => Math.round(x).toLocaleString('en-AU');

// One nutrient row: value, a bar against the target and a few words on where
// it stands. Targets: protein and kcal ranges from Settings, fibre a minimum,
// carbs shown without a target.
function nuRow(label, value, unit, { min = null, max = null, note = '' } = {}) {
  let cls = '', words = note;
  const top = Math.max(max ?? min ?? value, value, 1) * 1.1;
  if (min != null && value < min) { cls = 'under'; words = `${r0(min - value)} ${unit === 'kcal' ? 'kcal' : 'g'} to go`; }
  else if (max != null && value > max) { cls = 'over'; words = `${r0(value - max)} ${unit === 'kcal' ? 'kcal' : 'g'} over`; }
  else if (min != null) { cls = 'ok'; words = max != null ? 'in range' : 'target met'; }
  const pct = (x) => `${Math.min(100, (x / top) * 100).toFixed(1)}%`;
  return `<div class="nu-row ${cls}">
    <div class="nu-label">${label}</div>
    <div class="nu-val"><b>${r0(value)}</b> ${unit}${min != null ? ` <span class="muted">/ ${r0(min)}${max != null ? `–${r0(max)}` : '+'}</span>` : ''}</div>
    <div class="nu-bar">${min != null ? `<span class="band" style="left:${pct(min)};width:${max != null ? `calc(${pct(max)} - ${pct(min)})` : `calc(100% - ${pct(min)})`}"></span>` : ''}<i style="width:${pct(value)}"></i></div>
    <div class="nu-note fine">${words}</div>
  </div>`;
}

function totalsCard(s, iso, p, e, isToday) {
  const person = s.people[p];
  const t = dayTotals(s, e, person);
  if (!t.count) return '';
  const counted = t.count - t.missing;
  return `<section class="card day-totals">
    <h3>${isToday ? 'Today so far' : 'This day'} <span class="muted">· ${esc(person.name)}</span></h3>
    ${nuRow('Protein', t.protein, 'g', { min: person.proteinMin, max: person.proteinMax })}
    ${nuRow('Calories', t.kcal, 'kcal', { min: person.kcalMin, max: person.kcalMax })}
    ${nuRow('Fibre', t.fibre, 'g', { min: fibreTarget(person, p) })}
    ${nuRow('Carbs', t.carbs, 'g', { note: t.kcal > 0 ? `${Math.round((t.carbs * 4 / t.kcal) * 100)}% of calories` : '' })}
    <p class="fine">${t.missing ? `<b>${t.missing} item${t.missing === 1 ? ' has' : 's have'} no nutrition info</b> and ${t.missing === 1 ? "isn't" : "aren't"} counted, so these totals are a minimum. ` : ''}${t.partial ? 'Some typed-in items left a number blank. ' : ''}Estimates from ${counted} logged item${counted === 1 ? '' : 's'}: recipe and everyday-food values are typical figures, so expect ±10–15%.</p>
  </section>`;
}

function mealsCard(s, iso, p, e, planned) {
  const person = s.people[p];
  const { meals, skip } = mealsOf(e, person);
  const t = dayTotals(s, e, person);
  const quick = (k) => {
    // Lunch and dinner: this week's dishes one tap away.
    // Only while the meal is still empty, so a logged day stays tidy.
    if (k !== 'lunch' && k !== 'dinner' || !planned.length || meals[k].length) return '';
    const inMeal = new Set(meals[k].filter((it) => it.t === 'dish').map((it) => it.id));
    const opts = planned.filter((r) => !inMeal.has(r.id));
    return opts.length ? `<div class="chips wrapchips quick-dishes">${opts.map((r) => `<button class="chip" data-act="food-quick" data-m="${k}" data-id="${esc(r.id)}">${esc(r.name)}</button>`).join('')}</div>` : '';
  };
  return `<section class="card log meals-card">
    ${MEAL_KEYS.map(([k, label]) => {
      const items = meals[k];
      const sum = t.byMeal[k];
      return `<div class="meal" data-meal="${k}">
        <div class="meal-head"><h3>${label}</h3>
          <span class="meal-sum fine">${skip[k] && !items.length ? 'Skipped' : items.length ? esc(macroText(sum, { short: true })) + (sum.missing ? ' +' : '') : ''}</span></div>
        ${items.length ? `<ul class="meal-items">${items.map((it, i) => {
          const { name, portion } = itemLabel(s, it);
          const nu = itemNutrition(s, it);
          return `<li><button class="meal-item" data-act="food-edit" data-m="${k}" data-k="${i}">
              <span class="mi-name">${esc(name)}${portion ? ` <span class="muted">· ${esc(portion)}</span>` : ''}</span>
              <span class="mi-nu fine">${nu.known ? esc(macroText(nu)) : 'no nutrition info - tap to add numbers'}</span></button>
            <button class="x" data-act="food-del" data-m="${k}" data-k="${i}" aria-label="Remove ${esc(name)}">×</button></li>`;
        }).join('')}</ul>` : ''}
        ${skip[k] && !items.length ? '' : quick(k)}
        <div class="meal-actions">
          <button class="btn small" data-act="food-add" data-m="${k}">+ Add${items.length ? ' more' : ''}</button>
          ${items.length ? '' : `<button class="btn small ghost ${skip[k] ? 'on' : ''}" data-act="meal-skip" data-m="${k}">${skip[k] ? 'Skipped ✓' : 'Skipped'}</button>`}
        </div>
      </div>`;
    }).join('')}
  </section>`;
}

export function renderToday(s, ui, icon) {
  const iso = ui.logDate;
  const p = ui.logPerson;
  const e = entryFor(s, iso, p);
  const dis = e.done ? ' disabled' : '';
  const today = localISO();
  const planned = [...new Set(plannedFor(s, iso))].map((id) => dishById(s, id)).filter(Boolean);
  const other = s.people[1 - p];
  const otherDone = isLogged(entryFor(s, iso, 1 - p));
  const wGoal = waterGoal(s.people[p]);
  const wHad = e.water || 0;
  const wPct = Math.min(100, Math.round((wHad / wGoal) * 100));
  const isToday = iso === today;
  const shownSlots = isToday ? slotsSoFar() : WATER_SLOTS;
  const wCheck = waterCheckDay(e, isToday ? new Date() : new Date(`${iso}T21:30:00`));
  const slotChips = shownSlots.map((h) => {
    const a = waterAnswer(e, h);
    return `<button class="chip water-chip ${a || ''}" data-act="water-chip" data-slot="${h}" aria-label="${slotLabel(h)} check-in: ${a || 'unanswered'}"${dis}>${slotLabel(h)}${a === 'yes' ? ' ✓' : a === 'no' ? ' ✗' : ''}</button>`;
  }).join('');
  const wp = ui.waterPrompt;
  const promptCard = wp ? `<section class="card water-prompt">
    <h3>Water check-in · ${slotLabel(wp.slot)}</h3>
    <p>Did ${esc(s.people[wp.person]?.name || 'you')} drink water?</p>
    <div class="row-btns">
      <button class="btn primary" data-act="water-answer" data-slot="${wp.slot}" data-p="${wp.person}" data-answer="yes">Yes</button>
      <button class="btn" data-act="water-answer" data-slot="${wp.slot}" data-p="${wp.person}" data-answer="no">No</button>
      <button class="btn ghost" data-act="water-later" data-slot="${wp.slot}" data-p="${wp.person}">Later</button>
    </div>
  </section>` : '';
  return `
  ${promptCard}
  <section class="card">
    <div class="day-nav">
      <button class="act icon-only" data-act="log-day" data-d="-1" aria-label="Previous day">${icon('up', 'rot-l')}</button>
      <div class="day-title"><b>${iso === today ? 'Today' : iso === shiftDay(today, -1) ? 'Yesterday' : ''}</b> <span class="muted">${fmtDay(iso)}</span></div>
      <button class="act icon-only" data-act="log-day" data-d="1" ${iso >= today ? 'disabled' : ''} aria-label="Next day">${icon('up', 'rot-r')}</button>
    </div>
    <div class="seg full">${s.people.map((pp, i) => `<button class="${p === i ? 'on' : ''}" data-act="log-person" data-p="${i}">${esc(pp.name)}${entryFor(s, iso, i).done ? ` ${icon('lock', 'sm')}` : isLogged(entryFor(s, iso, i)) ? ' ✓' : ''}</button>`).join('')}</div>
    <p class="fine">${e.done ? `<b>${icon('lock', 'sm')} Saved and locked.</b> Tap Edit at the bottom to change it.` : isLogged(e) ? 'Saved automatically.' : `What did ${esc(s.people[p].name)} eat${iso === today ? ' today' : ''}? Add each meal with its portion - protein, calories, carbs and fibre add up as you go.`}
      ${otherDone ? '' : ` ${esc(other.name)} hasn't logged this day yet.`}</p>
  </section>

  <div class="day-body${e.done ? ' day-locked' : ''}">
  ${totalsCard(s, iso, p, e, isToday)}
  ${mealsCard(s, iso, p, e, planned)}

  <section class="card log">
    <h3>Water check-in</h3>
    <div class="chips wrapchips water-slots">${slotChips || '<span class="muted">Check-ins start at 9am</span>'}</div>
    <p class="fine">${wCheck.answered ? `${wCheck.yes} yes · ${wCheck.no} no of ${wCheck.due} check-in${wCheck.due === 1 ? '' : 's'}${isToday ? ' so far' : ''} — tap a time to set or change its answer.` : isToday ? 'Answer the check-ins as they arrive, or tap a time above.' : 'No check-ins answered this day.'}</p>
    <h3 class="water-glasses-head">Glasses logged <span class="muted">· the actual amount, if you want to track it</span></h3>
    <p class="fine">Check-ins and glasses are counted separately — answering Yes above doesn't add a glass here.</p>
    <div class="water-row">
      <button data-act="water-add" data-d="-1" ${wHad <= 0 || e.done ? 'disabled' : ''} aria-label="Remove a glass">${icon('minus')}</button>
      <div class="water-count"><b>${wHad}</b><span class="muted"> / ${wGoal} glasses</span></div>
      <button data-act="water-add" data-d="1"${dis} aria-label="Add a glass">${icon('plus')}</button>
    </div>
    <div class="water-bar"><i style="width:${wPct}%"></i></div>
    <p class="fine">${wHad >= wGoal ? 'Goal reached — nice one!' : `${wGoal - wHad} to go · a glass is about 250 ml`}</p>
  </section>

  <details class="card log more-today" ${e.note || e.rating || e.cheatDay || e.cheats?.length ? 'open' : ''}>
    <summary>More about today <span class="muted">· cheats, rating, note</span></summary>
    <h3>Cheats</h3>
    <label class="toggle"><input type="checkbox" data-act="log-cheatday" ${e.cheatDay ? 'checked' : ''}${dis}><span>This was a cheat day</span></label>
    <div class="chips wrapchips">${(e.cheats || []).map((c, i) => `<span class="chip on cheat">${esc(c)} <button class="x" data-act="log-uncheat" data-i="${i}" aria-label="Remove"${dis}>×</button></span>`).join('')}</div>
    <form class="addform" data-form="cheat"><input name="cheat" placeholder="Add a cheat (pizza, dessert, drinks…)" autocomplete="off"${dis}><button class="btn" type="submit" aria-label="Add"${dis}>${icon('plus')}</button></form>

    <h3>How healthy did you eat today?</h3>
    <div class="rate-row big">${[1, 2, 3, 4, 5].map((v) => `<button class="star ${v <= (e.rating || 0) ? 'on' : ''}" data-act="log-set" data-field="rating" data-value="${v}" aria-label="${v} of 5"${dis}>★</button>`).join('')}
      <span class="fine">${['', 'Off track', 'Meh', 'Okay', 'Good', 'Spot on'][e.rating || 0]}</span></div>
    <h3>Note</h3>
    ${text('note', e.note, 'Anything worth remembering (optional)', dis)}
  </details>
  </div>

  <section class="card day-done">
    ${e.done
      ? `<p class="fine"><b>${esc(s.people[p].name)}'s log for ${isToday ? 'today' : 'this day'} is saved and locked.</b> Tap Edit to change anything.</p>
      <button class="btn wide" data-act="log-done">${icon('note')} Edit</button>`
      : `<p class="fine">Finished ${esc(s.people[p].name)}'s log for ${isToday ? 'today' : 'this day'}? Done locks it so a stray tap changes nothing. You can still tap Edit afterwards.</p>
      <button class="btn primary wide" data-act="log-done">${icon('check')} Done</button>`}
  </section>`;
}

// ---------- Month report ----------
export function monthStats(s, ym, p) {
  const days = Object.keys(s.days || {}).filter((d) => d.startsWith(ym)).sort();
  const entries = days.map((d) => ({ d, e: entryFor(s, d, p) })).filter((x) => isLogged(x.e));
  let fromPlan = 0, other = 0, skipped = 0, ratingSum = 0, rated = 0, cheatDays = 0;
  const nu = { protein: 0, kcal: 0, fibre: 0, days: 0 };
  const cheats = {};
  for (const { e } of entries) {
    const { meals, skip } = mealsOf(e, s.people?.[p]);
    for (const m of ['lunch', 'dinner']) {
      if (meals[m].some((it) => it.t === 'dish')) fromPlan++;
      else if (meals[m].length) other++;
      else if (skip[m]) skipped++;
    }
    // Daily averages only from days where everything logged had numbers, so
    // an unknown item can't drag a day's protein down.
    const t = dayTotals(s, e, s.people?.[p]);
    if (t.count && !t.missing) { nu.protein += t.protein; nu.kcal += t.kcal; nu.fibre += t.fibre; nu.days++; }
    if (e.rating) { ratingSum += e.rating; rated++; }
    if (e.cheatDay || e.cheats?.length) cheatDays++;
    for (const c of e.cheats || []) { const k = c.trim().toLowerCase(); cheats[k] = (cheats[k] || 0) + 1; }
  }
  const meals = fromPlan + other + skipped;
  return {
    entries, logged: entries.length, fromPlan, other, skipped, meals, cheatDays,
    avgRating: rated ? ratingSum / rated : null,
    avgProtein: nu.days ? nu.protein / nu.days : null,
    avgKcal: nu.days ? nu.kcal / nu.days : null,
    avgFibre: nu.days ? nu.fibre / nu.days : null,
    nuDays: nu.days,
    planPct: meals ? Math.round((fromPlan / meals) * 100) : null,
    topCheats: Object.entries(cheats).sort((a, b) => b[1] - a[1]).slice(0, 6),
  };
}

function daysInMonth(ym) {
  const d = new Date(`${ym}-01T12:00:00`);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

export function renderMonth(s, ui, icon) {
  const ym = ui.logMonth;
  const thisMonth = localISO().slice(0, 7);
  const n = daysInMonth(ym);
  const firstDow = (new Date(`${ym}-01T12:00:00`).getDay() + 6) % 7; // Monday first
  // Planned vs cooked from weeks saved this month.
  const weeks = s.history.filter((h) => (h.weekOf || '').slice(0, 7) === ym);
  const plannedDishes = weeks.reduce((a, h) => a + h.ids.length, 0);
  const cookedDishes = weeks.reduce((a, h) => a + Object.values(h.cooked || {}).filter(Boolean).length, 0);
  return `
  <section class="card">
    <div class="day-nav">
      <button class="act icon-only" data-act="log-month" data-d="-1" aria-label="Previous month">${icon('up', 'rot-l')}</button>
      <div class="day-title"><b>${fmtMonth(ym)}</b></div>
      <button class="act icon-only" data-act="log-month" data-d="1" ${ym >= thisMonth ? 'disabled' : ''} aria-label="Next month">${icon('up', 'rot-r')}</button>
    </div>
    <p class="fine">${weeks.length ? `Cooked ${cookedDishes} of ${plannedDishes} planned dishes across ${weeks.length} checked-in week${weeks.length > 1 ? 's' : ''}.` : 'Planned vs cooked appears after your first Friday check-in this month.'}</p>
  </section>
  ${s.people.map((person, p) => {
    const st = monthStats(s, ym, p);
    const cells = Array.from({ length: firstDow }, () => '<span class="cal-cell blank"></span>').join('')
      + Array.from({ length: n }, (_, i) => {
        const d = `${ym}-${String(i + 1).padStart(2, '0')}`;
        const e = entryFor(s, d, p);
        const r = e.rating || 0;
        const cheat = e.cheatDay || e.cheats?.length;
        return `<button class="cal-cell r${isLogged(e) ? r : 'x'}" data-act="log-goto" data-date="${d}" data-p="${p}" title="${d}">${i + 1}${cheat ? '<i></i>' : ''}</button>`;
      }).join('');
    return `<section class="card">
      <h2>${esc(person.name)}</h2>
      <div class="stats">
        <div><b>${st.logged}</b><span>days logged</span></div>
        <div><b>${st.avgRating === null ? '–' : st.avgRating.toFixed(1)}</b><span>avg healthy ★</span></div>
        <div><b>${st.cheatDays}</b><span>cheat days</span></div>
        <div><b>${st.planPct === null ? '–' : `${st.planPct}%`}</b><span>meals from plan</span></div>
      </div>
      ${st.meals ? `<p class="fine">Lunch &amp; dinner: ${st.fromPlan} from the plan · ${st.other} ate out / other · ${st.skipped} skipped</p>` : ''}
      ${st.nuDays ? `<p class="fine">Average day (${st.nuDays} fully logged day${st.nuDays === 1 ? '' : 's'}): <b>${Math.round(st.avgProtein)} g protein</b> · ${Math.round(st.avgKcal).toLocaleString('en-AU')} kcal · ${Math.round(st.avgFibre)} g fibre</p>` : ''}
      ${st.topCheats.length ? `<p class="fine">Cheats: ${st.topCheats.map(([c, k]) => `${esc(c)}${k > 1 ? ` ×${k}` : ''}`).join(' · ')}</p>` : ''}
      <div class="cal-head">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((x) => `<span>${x}</span>`).join('')}</div>
      <div class="cal">${cells}</div>
      <div class="legend fine"><span class="cal-cell r5"></span>healthy <span class="cal-cell r1"></span>off track <span class="cal-cell rx"></span>not logged <span class="dotc"></span>cheat</div>
    </section>`;
  }).join('')}`;
}

export function renderLog(s, ui, icon) {
  return `<div class="seg full tabs2">
      <button class="${ui.logView === 'day' ? 'on' : ''}" data-act="log-view" data-v="day">Day</button>
      <button class="${ui.logView === 'month' ? 'on' : ''}" data-act="log-view" data-v="month">Month</button>
    </div>
    ${ui.logView === 'month' ? renderMonth(s, ui, icon) : renderToday(s, ui, icon)}`;
}
