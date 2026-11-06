// Home tab: a quick daily and weekly overview built from the food and water logs.
// Days with no log are called out as "not logged" — never counted as a missed goal.
import { entryFor, isLogged, shiftDay } from './log.js';
import { localISO, planRecipes } from './planner.js';
import { kindOf } from './data.js';
import { waterGoal } from './water.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Most recent week-start day (rules.startDay, Monday = 0) on or before today.
function currentWeekStart(startDay, from = new Date()) {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const todayIdx = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - ((todayIdx - startDay + 7) % 7));
  return localISO(d);
}

// Days of the current week up to and including today (future days excluded).
function weekDaysSoFar(startDay) {
  const start = currentWeekStart(startDay);
  const today = localISO();
  const days = [];
  for (let d = start, i = 0; d <= today && i < 7; d = shiftDay(d, 1), i++) days.push(d);
  return days;
}

// A day has a water record only if water was explicitly entered (any number,
// zero included). A meals-only day is missing water data, not a missed goal.
const hasWater = (e) => e.water != null || (e.waterTs?.length ?? 0) > 0;

function waterLine(s, p, days) {
  const goal = waterGoal(s.people?.[p]);
  let atGoal = 0, recorded = 0, unrecorded = 0;
  for (const d of days) {
    const e = entryFor(s, d, p);
    if (!hasWater(e)) { unrecorded++; continue; }
    recorded++;
    if (e.water >= goal) atGoal++;
  }
  const notLogged = unrecorded ? ` · ${unrecorded} day${unrecorded === 1 ? '' : 's'} not logged` : '';
  if (!recorded) return `Water: no days logged yet${notLogged}`;
  return `Water at goal ${atGoal} of ${recorded} logged day${recorded === 1 ? '' : 's'}${notLogged}`;
}

function ratingLine(s, p, days) {
  let sum = 0, n = 0;
  for (const d of days) { const r = entryFor(s, d, p).rating; if (r) { sum += r; n++; } }
  return n ? `Day rating avg ${(Math.round((sum / n) * 10) / 10).toFixed(1)} ★ over ${n} day${n === 1 ? '' : 's'}` : null;
}

export function renderHome(s) {
  const today = localISO();
  const dateLabel = new Date(`${today}T12:00:00`).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'short' });
  const people = s.people || [];
  const days = weekDaysSoFar(s.rules?.startDay ?? 0);

  const todayRows = people.map((person, p) => {
    const e = entryFor(s, today, p);
    const goal = waterGoal(person);
    const had = e.water || 0;
    const pct = Math.min(100, Math.round((had / goal) * 100));
    const mealsLogged = isLogged(e);
    const waterLogged = hasWater(e);
    const water = waterLogged
      ? `<b>${had}</b><span class="muted"> / ${goal} glasses</span>${had >= goal ? ' · goal reached' : ''}`
      : `<span class="muted">Water not logged yet</span>`;
    return `<div class="home-row">
      <div class="home-head"><b>${esc(person?.name || `Person ${p + 1}`)}</b>
        <span class="${mealsLogged ? 'home-ok' : 'muted'}">${mealsLogged ? 'Meals logged ✓' : 'No meals logged yet'}</span></div>
      <div class="water-count">${water}</div>
      ${waterLogged ? `<div class="water-bar"><i style="width:${pct}%"></i></div>` : ''}
    </div>`;
  }).join('');

  const recipes = planRecipes(s);
  const kinds = { chicken: 0, veg: 0 };
  recipes.forEach((r) => kinds[kindOf(r, s.rules?.eggsCountAsVeg)]++);
  const cooked = s.plan?.cooked || {};
  const yes = recipes.filter((r) => cooked[r.id] === true).length;
  const no = recipes.filter((r) => cooked[r.id] === false).length;
  const unmarked = recipes.length - yes - no;
  const cookedBits = [
    yes ? `${yes} cooked` : '',
    no ? `${no} didn't cook` : '',
    unmarked ? `${unmarked} not marked yet` : '',
  ].filter(Boolean).join(' · ');

  const weekRows = people.map((person, p) => {
    const mealsLogged = days.filter((d) => isLogged(entryFor(s, d, p))).length;
    const bits = [
      `Meals logged ${mealsLogged} of ${days.length} day${days.length === 1 ? '' : 's'}`,
      waterLine(s, p, days),
      ratingLine(s, p, days),
    ].filter(Boolean);
    return `<div class="home-row"><div class="home-head"><b>${esc(person?.name || `Person ${p + 1}`)}</b></div>
      <p class="muted">${bits.map(esc).join('<br>')}</p></div>`;
  }).join('');

  return `
  <section class="card">
    <h2>Today · ${esc(dateLabel)}</h2>
    ${todayRows}
    <button class="btn primary wide" data-act="tab" data-tab="today">Log today</button>
  </section>
  <section class="card">
    <h2>This week</h2>
    <p>${recipes.length ? `${kinds.chicken} chicken · ${kinds.veg} veg dishes${cookedBits ? ` · ${cookedBits}` : ''}` : 'No dishes planned yet'}</p>
    ${weekRows}
    <button class="btn wide" data-act="tab" data-tab="week">See the week</button>
  </section>`;
}
