// Home tab: a quick daily and weekly overview built from the food and water logs.
// Days with no log are called out as "not logged" — never counted as a missed goal.
import { entryFor, isLogged, shiftDay } from './log.js';
import { localISO, planRecipes, currentWeekStart, weekRelation, weekRangeLabel } from './planner.js';
import { displayKind, DISPLAY_GROUPS } from './data.js';
import { waterGoal, waterCheckDay } from './water.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

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

// Check-in answers say whether water was had around each reminder time; they are
// not glass counts, so they are summarised separately from the glass counter.
const checkinText = (dc) => {
  if (!dc.due) return null;
  if (!dc.answered) return `${dc.due} check-in${dc.due === 1 ? '' : 's'} so far, none answered`;
  return `Check-ins: ${dc.yes} yes · ${dc.no} no of ${dc.due}`;
};

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
  const startDay = s.rules?.startDay ?? 0;
  const days = weekDaysSoFar(startDay);
  // The plan can be next week's (after "Finish week"), so name the menu's week
  // and give its dates — never leave it ambiguous which week the dishes are for.
  const rel = weekRelation(s.plan?.weekOf, startDay);
  const menuRange = weekRangeLabel(s.plan?.weekOf);
  const menuHeading = rel === 'this' ? 'This week\u2019s menu'
    : rel === 'next' ? 'Next week\u2019s menu'
    : `Menu \u00b7 ${menuRange}`;

  const todayRows = people.map((person, p) => {
    const e = entryFor(s, today, p);
    const goal = waterGoal(person);
    const had = e.water || 0;
    const pct = Math.min(100, Math.round((had / goal) * 100));
    const mealsLogged = isLogged(e);
    const waterLogged = hasWater(e);
    const checkins = checkinText(waterCheckDay(e));
    const water = `${waterLogged
      ? `<b>${had}</b><span class="muted"> / ${goal} glasses</span>${had >= goal ? ' · goal reached' : ''}`
      : checkins ? '' : `<span class="muted">Water not logged yet</span>`}
      ${checkins ? `${waterLogged ? '<br>' : ''}<span class="muted">${esc(checkins)}</span>` : ''}`;
    return `<div class="home-row">
      <div class="home-head"><b>${esc(person?.name || `Person ${p + 1}`)}</b>
        <span class="${mealsLogged ? 'home-ok' : 'muted'}">${mealsLogged ? 'Meals logged ✓' : 'No meals logged yet'}</span></div>
      <div class="water-count">${water}</div>
      ${waterLogged ? `<div class="water-bar"><i style="width:${pct}%"></i></div>` : ''}
    </div>`;
  }).join('');

  const recipes = planRecipes(s);
  const kinds = Object.fromEntries(DISPLAY_GROUPS.map(([kind]) => [kind,0]));
  recipes.forEach((r) => kinds[displayKind(r, s.rules?.eggsCountAsVeg)]++);
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
    let cYes = 0, cNo = 0, cAnswered = 0;
    for (const d of days) {
      const dc = waterCheckDay(entryFor(s, d, p), d === today ? new Date() : new Date(`${d}T21:30:00`));
      cYes += dc.yes; cNo += dc.no; cAnswered += dc.answered;
    }
    const bits = [
      `Meals logged ${mealsLogged} of ${days.length} day${days.length === 1 ? '' : 's'}`,
      waterLine(s, p, days),
      cAnswered ? `Water check-ins: ${cYes} yes · ${cNo} no of ${cAnswered} answered` : null,
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
    <h2>This week <span class="muted">\u00b7 ${esc(weekRangeLabel(currentWeekStart(startDay)))}</span></h2>
    <p>${recipes.length ? `<b>${menuHeading}</b>${(rel === 'this' || rel === 'next') && menuRange ? ` <span class="muted">(${esc(menuRange)})</span>` : ''}: ${DISPLAY_GROUPS.filter(([kind]) => kinds[kind]).map(([kind,label]) => `${kinds[kind]} ${esc(label.toLowerCase())}`).join(' · ')} dishes${cookedBits ? ` \u00b7 ${cookedBits}` : ''}` : 'No dishes planned yet'}</p>
    ${weekRows}
    <button class="btn wide" data-act="tab" data-tab="week">See the week</button>
  </section>`;
}
