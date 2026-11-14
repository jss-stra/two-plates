// Daily food log ("Today" tab) and the month report built from it.
import { dishById } from './custom.js';
import { localISO, plannedFor } from './planner.js';
import { waterGoal, waterAnswer, waterCheckDay, slotLabel, slotsSoFar, WATER_SLOTS } from './water.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const MEALS = [['lunch', 'Lunch'], ['dinner', 'Dinner']];

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

function seg(field, value, options) {
  return `<div class="seg wrap">${options.map(([v, l]) => `<button class="${value === v ? 'on' : ''}" data-act="log-set" data-field="${field}" data-value="${esc(v)}">${esc(l)}</button>`).join('')}</div>`;
}
const text = (field, value, placeholder) => `<input class="log-input" data-log="${field}" value="${esc(value)}" placeholder="${esc(placeholder)}" autocomplete="off">`;

// Has anything been logged for this person on this day?
export const isLogged = (e) => !!(e.rating || e.lunch || e.dinner || e.breakfast || e.snacks || e.cheats?.length);

export function renderToday(s, ui, icon) {
  const iso = ui.logDate;
  const p = ui.logPerson;
  const e = entryFor(s, iso, p);
  const today = localISO();
  const planned = plannedFor(s, iso).map((id) => dishById(s, id)).filter(Boolean);
  const mealPicker = (field) => {
    const v = e[field];
    return `<div class="chips wrapchips">${planned.map((r) => `<button class="chip ${v === r.id ? 'on' : ''}" data-act="log-set" data-field="${field}" data-value="${r.id}">${esc(r.name)}</button>`).join('')}
      <button class="chip ${v === 'other' ? 'on' : ''}" data-act="log-set" data-field="${field}" data-value="other">Ate out / other</button>
      <button class="chip ${v === 'skipped' ? 'on' : ''}" data-act="log-set" data-field="${field}" data-value="skipped">Skipped</button></div>
      ${v === 'other' ? text(`${field}Text`, e[`${field}Text`], 'What did you have?') : ''}`;
  };
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
    return `<button class="chip water-chip ${a || ''}" data-act="water-chip" data-slot="${h}" aria-label="${slotLabel(h)} check-in: ${a || 'unanswered'}">${slotLabel(h)}${a === 'yes' ? ' ✓' : a === 'no' ? ' ✗' : ''}</button>`;
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
    <div class="seg full">${s.people.map((pp, i) => `<button class="${p === i ? 'on' : ''}" data-act="log-person" data-p="${i}">${esc(pp.name)}${isLogged(entryFor(s, iso, i)) ? ' ✓' : ''}</button>`).join('')}</div>
    <p class="fine">${isLogged(e) ? 'Saved automatically.' : `What did ${esc(s.people[p].name)} eat${iso === today ? ' today' : ''}? Tap what fits — it takes a minute.`}
      ${otherDone ? '' : ` ${esc(other.name)} hasn't logged this day yet.`}</p>
  </section>

  <section class="card log">
    <h3>Water</h3>
    <div class="chips wrapchips water-slots">${slotChips || '<span class="muted">Check-ins start at 9am</span>'}</div>
    <p class="fine">${wCheck.answered ? `${wCheck.yes} yes · ${wCheck.no} no of ${wCheck.due} check-in${wCheck.due === 1 ? '' : 's'}${isToday ? ' so far' : ''} — tap a time to set or change its answer.` : isToday ? 'Answer the check-ins as they arrive, or tap a time above.' : 'No check-ins answered this day.'}</p>
    <h3 class="water-glasses-head">Glasses <span class="muted">· the actual amount, if you want to track it</span></h3>
    <div class="water-row">
      <button data-act="water-add" data-d="-1" ${wHad <= 0 ? 'disabled' : ''} aria-label="Remove a glass">${icon('minus')}</button>
      <div class="water-count"><b>${wHad}</b><span class="muted"> / ${wGoal} glasses</span></div>
      <button data-act="water-add" data-d="1" aria-label="Add a glass">${icon('plus')}</button>
    </div>
    <div class="water-bar"><i style="width:${wPct}%"></i></div>
    <p class="fine">${wHad >= wGoal ? 'Goal reached — nice one!' : `${wGoal - wHad} to go · a glass is about 250 ml`}</p>
  </section>

  <section class="card log">
    <h3>Breakfast &amp; shake</h3>
    ${seg('breakfast', e.breakfast, [['usual', 'As usual'], ['other', 'Something else'], ['skipped', 'Skipped']])}
    ${e.breakfast === 'other' ? text('breakfastText', e.breakfastText, 'What did you have?') : ''}
    ${MEALS.map(([f, label]) => `<h3>${label}</h3>${mealPicker(f)}`).join('')}
  </section>

  <details class="card log more-today" ${e.snacks || e.note || e.rating || e.cheatDay || e.cheats?.length ? 'open' : ''}>
    <summary>More about today <span class="muted">· snacks, cheats, rating, note</span></summary>
    <h3>Snacks</h3>
    ${text('snacks', e.snacks, 'e.g. fruit, protein bar, chai')}
    <h3>Cheats</h3>
    <label class="toggle"><input type="checkbox" data-act="log-cheatday" ${e.cheatDay ? 'checked' : ''}><span>This was a cheat day</span></label>
    <div class="chips wrapchips">${(e.cheats || []).map((c, i) => `<span class="chip on cheat">${esc(c)} <button class="x" data-act="log-uncheat" data-i="${i}" aria-label="Remove">×</button></span>`).join('')}</div>
    <form class="addform" data-form="cheat"><input name="cheat" placeholder="Add a cheat (pizza, dessert, drinks…)" autocomplete="off"><button class="btn" type="submit" aria-label="Add">${icon('plus')}</button></form>

    <h3>How healthy did you eat today?</h3>
    <div class="rate-row big">${[1, 2, 3, 4, 5].map((v) => `<button class="star ${v <= (e.rating || 0) ? 'on' : ''}" data-act="log-set" data-field="rating" data-value="${v}" aria-label="${v} of 5">★</button>`).join('')}
      <span class="fine">${['', 'Off track', 'Meh', 'Okay', 'Good', 'Spot on'][e.rating || 0]}</span></div>
    <h3>Note</h3>
    ${text('note', e.note, 'Anything worth remembering (optional)')}
  </details>`;
}

// ---------- Month report ----------
export function monthStats(s, ym, p) {
  const days = Object.keys(s.days || {}).filter((d) => d.startsWith(ym)).sort();
  const entries = days.map((d) => ({ d, e: entryFor(s, d, p) })).filter((x) => isLogged(x.e));
  let fromPlan = 0, other = 0, skipped = 0, ratingSum = 0, rated = 0, cheatDays = 0;
  const cheats = {};
  for (const { e } of entries) {
    for (const m of ['lunch', 'dinner']) {
      if (!e[m]) continue;
      if (e[m] === 'other') other++;
      else if (e[m] === 'skipped') skipped++;
      else fromPlan++;
    }
    if (e.rating) { ratingSum += e.rating; rated++; }
    if (e.cheatDay || e.cheats?.length) cheatDays++;
    for (const c of e.cheats || []) { const k = c.trim().toLowerCase(); cheats[k] = (cheats[k] || 0) + 1; }
  }
  const meals = fromPlan + other + skipped;
  return {
    entries, logged: entries.length, fromPlan, other, skipped, meals, cheatDays,
    avgRating: rated ? ratingSum / rated : null,
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
