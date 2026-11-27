// Daily food log ("Today" tab) and the month report built from it.
import { dishById } from './custom.js';
import { localISO, plannedFor, perMealGoal, plannedOnDay, mealFor } from './planner.js';
import { fixedMealsOf, fixedTotals } from './fixed-meals.js';
import { QUICK_FOODS, QUICK_FOOD_BY_ID, foodsTotal } from './quick-foods.js';
import { supplementsOf, supplementStatus } from './supplements.js';
import { mealPhoto, photoEstimate } from './meal-photos.js';
import { dayIntake } from './intake.js';
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

function seg(field, value, options, dis = '') {
  return `<div class="seg wrap">${options.map(([v, l]) => `<button class="${value === v ? 'on' : ''}" data-act="log-set" data-field="${field}" data-value="${esc(v)}"${dis}>${esc(l)}</button>`).join('')}</div>`;
}
const text = (field, value, placeholder, dis = '') => `<input class="log-input" data-log="${field}" value="${esc(value)}" placeholder="${esc(placeholder)}" autocomplete="off"${dis}>`;

// Has anything been logged for this person on this day?
export const isLogged = (e) => !!(e.rating || e.lunch || e.dinner || e.breakfast || e.snacks || e.snackFoods?.length || e.cheats?.length);

// The person's fixed meals (Settings → People) with amounts, so the whole day is in one place.
function renderFixedToday(s, p) {
  const person = s.people[p];
  const items = fixedMealsOf(person);
  if (!items.length) return '';
  const t = fixedTotals(person);
  const goal = perMealGoal(person, s.rules);
  return `<div class="fixed-today">
    <p class="fine"><b>${esc(person.name)}'s fixed meals</b> · ${t.protein} g protein · ${t.kcal} kcal</p>
    <ul class="fixed-list">${items.map((m) => `<li>${m.time ? `<span class="muted">${esc(m.time)}</span> ` : ''}<b>${esc(m.name || 'Item')}</b>${m.qty ? ` · ${esc(m.qty)}` : ''}
      <span class="muted">· ${Number(m.protein) || 0} g · ${Number(m.kcal) || 0} kcal</span>${m.note ? `<br><span class="fine">${esc(m.note)}</span>` : ''}</li>`).join('')}</ul>
    <p class="fine">Lunch and dinner each aim for ${goal.min}–${goal.max} g protein.</p>
  </div>`;
}

// Foods eaten instead of (or as well as) the plan, with portions, plus an
// optional photo that Claude reads later and turns into an estimate.
function foodPicker(e, field, dis, withPhoto = true) {
  const list = e[`${field}Foods`] || [];
  const t = foodsTotal(list);
  const photoId = e[`${field}Photo`];
  const ph = mealPhoto(photoId);
  const est = photoEstimate(photoId);
  const photo = !withPhoto ? '' : photoId
    ? `<div class="meal-photo">${ph?.thumb ? `<img src="${ph.thumb}" alt="Meal photo">` : ''}
        <div class="fine">${est ? `<b>Claude’s estimate:</b> ${est.protein ?? '?'} g protein · ${est.carbs ?? '?'} g carbs · ${est.fibre ?? '?'} g fibre · ${est.kcal ?? '?'} kcal${est.items.length ? `<br>${est.items.map((i) => esc(`${i.name}${i.qty ? ` (${i.qty})` : ''}`)).join(', ')}` : ''}${est.note ? `<br>${esc(est.note)}` : ''}<br>Used instead of the foods above.`
          : ph?.status === 'unreadable' ? 'Claude couldn’t read this photo - the foods above are used.' : 'Photo saved. Claude will estimate it later; until then the foods above are used.'}</div>
        <button class="link" data-act="meal-photo-remove" data-field="${field}"${dis}>Remove photo</button></div>`
    : `<label class="btn small ghost photo-btn">Add a photo<input type="file" accept="image/*" capture="environment" data-mealphoto="${field}" hidden${dis}></label>
       <span class="fine">Optional. Claude estimates what and how much from it, then corrects these numbers.</span>`;
  return `<div class="food-picker">
    ${list.map((x, i) => {
      const f = QUICK_FOOD_BY_ID[x.food];
      if (!f) return '';
      return `<div class="food-row"><span><b>${esc(f.name)}</b><br><span class="fine">${x.n} × ${esc(f.unit)} · ${Math.round(f.protein * x.n)} g protein</span></span>
        <span class="stepper"><button data-act="food-n" data-field="${field}" data-i="${i}" data-d="-0.5" aria-label="Less"${dis}>−</button><b>${x.n}</b><button data-act="food-n" data-field="${field}" data-i="${i}" data-d="0.5" aria-label="More"${dis}>+</button></span></div>`;
    }).join('')}
    <div class="inline"><select id="ff-${field}"${dis}><option value="">Add a food…</option>${QUICK_FOODS.map((f) => `<option value="${f.id}">${esc(f.name)} · ${esc(f.unit)}</option>`).join('')}</select>
      <button class="btn small" data-act="food-add" data-field="${field}"${dis}>Add</button></div>
    ${list.length ? `<p class="fine">${t.protein} g protein · ${t.carbs} g carbs · ${t.fibre} g fibre · ${t.kcal} kcal (approx.)</p>` : ''}
    ${photo}
  </div>`;
}

// Vitamins & supplements to tick off today (list from Settings → People).
function renderSupps(s, p, iso, dis) {
  const items = supplementsOf(s.people[p]);
  if (!items.length) return `<section class="card log"><h3>Vitamins &amp; supplements</h3>
    <p class="fine">Add what ${esc(s.people[p].name)} takes in Settings → People → Vitamins &amp; supplements, then tick them off here each day.</p></section>`;
  const st = items.map((it) => ({ it, st: supplementStatus(s, p, it, iso) }));
  const due = st.filter((x) => x.st.due || x.st.taken);
  const taken = st.filter((x) => x.st.taken).length;
  return `<section class="card log"><h3>Vitamins &amp; supplements <span class="muted">· ${taken} of ${due.length} taken</span></h3>
    <div class="chips wrapchips">${st.map(({ it, st: x }) => (!x.due && !x.taken
      ? `<span class="chip muted" title="${esc(it.when || '')}">${esc(it.name || 'Supplement')} · next in ${x.nextIn} day${x.nextIn === 1 ? '' : 's'}</span>`
      : `<button class="chip ${x.taken ? 'on' : ''}" data-act="supp-toggle" data-id="${esc(it.id)}" title="${esc(it.when || '')}"${dis}>${x.taken ? '✓ ' : ''}${esc(it.name || 'Supplement')}${it.dose ? ` · ${esc(it.dose)}` : ''}</button>`)).join('')}</div>
    <p class="fine">Tap what you’ve had. Monthly ones show up again when they’re due.</p></section>`;
}

// What's been eaten so far, against the goals.
function renderIntake(s, p, e, isToday) {
  const person = s.people[p];
  const t = dayIntake(s, e, p);
  const v = (k, unit = ' g') => `${t.partial[k] ? 'at least ' : ''}${t[k].toLocaleString()}${unit}`;
  const fibreGoal = person.fibreTarget || 30;
  const pst = t.protein < person.proteinMin ? `<span class="st warn">${person.proteinMin - t.protein} g to go</span>` : '<span class="st ok">goal met</span>';
  return `<section class="card log intake">
    <h3>${isToday ? 'Eaten so far today' : 'Eaten this day'} <span class="muted">· ${t.logged} of 3 meals logged</span></h3>
    <div class="intake-grid">
      <div><b>${v('protein')}</b><span class="fine">protein · goal ${person.proteinMin}–${person.proteinMax} g · ${pst}</span></div>
      <div><b>${v('carbs')}</b><span class="fine">carbs</span></div>
      <div><b>${v('fibre')}</b><span class="fine">fibre · goal ${fibreGoal} g${t.fibre >= fibreGoal ? ' · <span class="st ok">met</span>' : ''}</span></div>
      <div><b>${v('kcal', '')}</b><span class="fine">kcal · ${person.kcalMin.toLocaleString()}–${person.kcalMax.toLocaleString()}</span></div>
    </div>
    ${Object.keys(t.partial).length ? '<p class="fine">“At least” = something logged has no numbers (your own dish, or a typed outside-plan amount with no carbs or fibre).</p>' : ''}
  </section>`;
}


// ---------- One-tap logging for the whole household ----------
export const QUICK_MEALS = [['breakfast', 'Breakfast'], ['lunch', 'Lunch'], ['dinner', 'Dinner']];

// The value "we had the plan" means for a meal: breakfast is "as usual", lunch
// and dinner are the dish planned for that day (null when nothing is planned).
export const plannedValue = (meal, onDay) => (meal === 'breakfast' ? 'usual' : onDay?.[meal] || null);

// Set one meal for everyone whose day isn't locked. Tapping the same answer
// again clears it. Returns how many people were changed.
export function applyQuickMeal(d, iso, meal, value, now = Date.now()) {
  d.days ||= {};
  const day = (d.days[iso] ||= {});
  const open = d.people.map((_, p) => p).filter((p) => !day[p]?.done);
  const clearing = open.length > 0 && open.every((p) => day[p]?.[meal] === value);
  for (const p of open) {
    const e = (day[p] ||= {});
    e[meal] = clearing ? null : value;
    e.at = now;
  }
  return open.length;
}

// The next meal still worth logging right now, for the Home shortcut: breakfast
// until 11am, lunch until 4pm, dinner after. Null when everyone has logged it
// or there is nothing planned to tap.
export function nextMealToLog(s, now = new Date()) {
  const iso = localISO(now);
  const h = now.getHours();
  const meal = h < 11 ? 'breakfast' : h < 16 ? 'lunch' : 'dinner';
  const value = plannedValue(meal, plannedOnDay(s, iso));
  if (!value) return null;
  const everyone = s.people.every((_, p) => entryFor(s, iso, p)[meal]);
  if (everyone) return null;
  const dish = meal === 'breakfast' ? null : dishById(s, value);
  return { iso, meal, label: QUICK_MEALS.find(([m]) => m === meal)[1], value, name: dish ? dish.name : 'your usual' };
}

const answerText = (s, v) => {
  if (!v) return 'not logged';
  if (v === 'usual') return 'had it';
  if (v === 'other') return 'something else';
  if (v === 'skipped') return 'skipped';
  return dishById(s, v)?.name || 'logged';
};

// The simple path: one row per meal, one tap for both of you.
function renderQuickLog(s, iso, onDay) {
  const names = s.people.map((p, i) => p.name || `Person ${i + 1}`);
  const both = s.people.length > 1;
  const rows = QUICK_MEALS.map(([meal, label]) => {
    const planned = plannedValue(meal, onDay);
    const vals = s.people.map((_, p) => entryFor(s, iso, p)[meal] || null);
    const locked = s.people.every((_, p) => entryFor(s, iso, p).done);
    const dis = locked ? ' disabled' : '';
    const dish = meal === 'breakfast' ? null : planned && dishById(s, planned);
    const title = meal === 'breakfast' ? 'Your usual breakfast' : dish ? dish.name : 'No dish planned. Tap Something else.';
    const hadOn = planned && vals.every((v) => v === planned);
    const who = vals.map((v, i) => `<span class="chip qm-who-chip ${v ? 'on' : ''}">${esc(names[i])}: ${esc(answerText(s, v))}</span>`).join('');
    return `<div class="qm">
      <div class="qm-head"><span class="qm-meal">${label}</span><span class="qm-dish">${esc(title)}</span></div>
      <div class="qm-btns">
        ${planned ? `<button class="btn ${hadOn ? 'primary' : ''}" data-act="quick-meal" data-meal="${meal}" data-choice="had" data-date="${iso}"${dis}>${hadOn ? '✓ ' : ''}${both ? 'We both had it' : 'I had it'}</button>` : ''}
        <button class="btn ${vals.every((v) => v === 'other') ? 'primary' : ''}" data-act="quick-meal" data-meal="${meal}" data-choice="other" data-date="${iso}"${dis}>Something else</button>
        <button class="btn ${vals.every((v) => v === 'skipped') ? 'primary' : ''}" data-act="quick-meal" data-meal="${meal}" data-choice="skipped" data-date="${iso}"${dis}>Skipped</button>
      </div>
      ${both ? `<div class="qm-who">${who}</div>` : ''}
    </div>`;
  }).join('');
  return `<section class="card quick-log"><h2>What did you eat?</h2>
    <p class="fine">Tap once for both of you. Different meals, snacks or a rating? Use “Details” below.</p>${rows}</section>`;
}

export function renderToday(s, ui, icon) {
  const iso = ui.logDate;
  const p = ui.logPerson;
  const e = entryFor(s, iso, p);
  const dis = e.done ? ' disabled' : '';
  const today = localISO();
  const planned = plannedFor(s, iso).map((id) => dishById(s, id)).filter(Boolean);
  const onDay = plannedOnDay(s, iso);
  const mealPicker = (field) => {
    const v = e[field];
    const want = onDay[field];
    const order = [...planned].sort((a, b) => (b.id === want) - (a.id === want));
    const label = (r) => {
      if (r.id !== want) return esc(r.name);
      const m = mealFor(r, s.people[p], s.rules);
      return `Planned: ${esc(r.name)}${m.protein != null ? ` · ${m.protein} g protein` : ''}`;
    };
    const chip = (r) => `<button class="chip ${v === r.id ? 'on' : ''} ${r.id === want ? 'planned' : ''}" data-act="log-set" data-field="${field}" data-value="${r.id}"${dis}>${label(r)}</button>`;
    const primary = order.filter((r) => r.id === want || r.id === v);
    const rest = order.filter((r) => !primary.includes(r));
    return `<div class="chips wrapchips">${primary.map(chip).join('')}
      <button class="chip ${v === 'other' ? 'on' : ''}" data-act="log-set" data-field="${field}" data-value="other"${dis}>Ate something else</button>
      <button class="chip ${v === 'skipped' ? 'on' : ''}" data-act="log-set" data-field="${field}" data-value="skipped"${dis}>Skipped</button></div>
      ${rest.length ? `<details class="other-dishes"><summary class="fine">A different dish from this week</summary><div class="chips wrapchips">${rest.map(chip).join('')}</div></details>` : ''}
      ${v === 'other' ? `${text(`${field}Text`, e[`${field}Text`], 'What did you have? (optional)', dis)}${foodPicker(e, field, dis)}` : ''}`;
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
  const personSeg = `<div class="seg full">${s.people.map((pp, i) => `<button class="${p === i ? 'on' : ''}" data-act="log-person" data-p="${i}">${esc(pp.name)}${isLogged(entryFor(s, iso, i)) ? ' ✓' : ''}</button>`).join('')}</div>`;
  const anyOther = s.people.some((_, i) => ['breakfast', 'lunch', 'dinner'].some((m) => entryFor(s, iso, i)[m] === 'other'));
  const detailsOpen = !!ui.logDetails || anyOther;
  const supps = supplementsOf(s.people[p]).length ? renderSupps(s, p, iso, dis) : '';
  const details = detailsOpen ? `
    <p class="fine">Details for one person at a time. Pick who:</p>
    ${personSeg}
    ${renderIntake(s, p, e, isToday)}
    ${supps}
    <div class="log-block">
      <h3>${esc(s.people[p].name)}’s breakfast</h3>
      ${renderFixedToday(s, p)}
      ${seg('breakfast', e.breakfast, [['usual', 'As usual'], ['other', 'Something else'], ['skipped', 'Skipped']], dis)}
      ${e.breakfast === 'other' ? `${text('breakfastText', e.breakfastText, 'What did you have? (optional)', dis)}${foodPicker(e, 'breakfast', dis)}` : ''}
      ${MEALS.map(([f, label]) => `<h3>${label}</h3>${mealPicker(f)}`).join('')}
    </div>
    <h3>Snacks</h3>
    ${text('snacks', e.snacks, 'e.g. fruit, protein bar, chai', dis)}
    ${foodPicker({ ...e, snackFoods: e.snackFoods }, 'snack', dis, false)}
    <h3>Cheats</h3>
    <label class="toggle"><input type="checkbox" data-act="log-cheatday" ${e.cheatDay ? 'checked' : ''}${dis}><span>This was a cheat day</span></label>
    <div class="chips wrapchips">${(e.cheats || []).map((c, i) => `<span class="chip on cheat">${esc(c)} <button class="x" data-act="log-uncheat" data-i="${i}" aria-label="Remove"${dis}>×</button></span>`).join('')}</div>
    <form class="addform" data-form="cheat"><input name="cheat" placeholder="Add a cheat (pizza, dessert, drinks…)" autocomplete="off"${dis}><button class="btn" type="submit" aria-label="Add"${dis}>${icon('plus')}</button></form>
    <h3>How healthy did you eat today?</h3>
    <div class="rate-row big">${[1, 2, 3, 4, 5].map((v) => `<button class="star ${v <= (e.rating || 0) ? 'on' : ''}" data-act="log-set" data-field="rating" data-value="${v}" aria-label="${v} of 5"${dis}>★</button>`).join('')}
      <span class="fine">${['', 'Off track', 'Meh', 'Okay', 'Good', 'Spot on'][e.rating || 0]}</span></div>
    <h3>Note</h3>
    ${text('note', e.note, 'Anything worth remembering (optional)', dis)}
    <h3>Water check-ins</h3>
    <div class="chips wrapchips water-slots">${slotChips || '<span class="muted">Check-ins start at 9am</span>'}</div>
    <p class="fine">${wCheck.answered ? `${wCheck.yes} yes · ${wCheck.no} no so far. Tap a time to change its answer.` : 'Tap a time to answer it, or answer the reminder when it arrives.'}</p>
    <div class="day-done">
      ${e.done
        ? `<p class="fine"><b>This day is locked.</b> Tap Edit to change it.</p><button class="btn small" data-act="log-done">Edit</button>`
        : `<p class="fine">Lock this day so a stray tap can’t change it (optional).</p><button class="btn small" data-act="log-done">Lock ${esc(s.people[p].name)}’s day</button>`}
    </div>` : '';
  return `
  ${promptCard}
  <section class="card">
    <div class="day-nav">
      <button class="act icon-only" data-act="log-day" data-d="-1" aria-label="Previous day">${icon('up', 'rot-l')}</button>
      <div class="day-title"><b>${iso === today ? 'Today' : iso === shiftDay(today, -1) ? 'Yesterday' : ''}</b> <span class="muted">${fmtDay(iso)}</span></div>
      <button class="act icon-only" data-act="log-day" data-d="1" ${iso >= today ? 'disabled' : ''} aria-label="Next day">${icon('up', 'rot-r')}</button>
    </div>
  </section>

  ${renderQuickLog(s, iso, onDay)}

  <section class="card log">
    <h3>Water</h3>
    ${s.people.length > 1 ? personSeg : ''}
    <div class="water-row">
      <button data-act="water-add" data-d="-1" ${wHad <= 0 || e.done ? 'disabled' : ''} aria-label="Remove a glass">${icon('minus')}</button>
      <div class="water-count"><b>${wHad}</b><span class="muted"> / ${wGoal} glasses</span></div>
      <button data-act="water-add" data-d="1"${dis} aria-label="Add a glass">${icon('plus')}</button>
    </div>
    <div class="water-bar"><i style="width:${wPct}%"></i></div>
    <p class="fine">${wHad >= wGoal ? 'Goal reached — nice one!' : `Tap + for each glass (about 250 ml). ${wGoal - wHad} to go.`}</p>
  </section>

  <section class="card log details-card">
    <button class="btn wide ${detailsOpen ? '' : 'ghost'}" data-act="log-details" aria-expanded="${detailsOpen}">${detailsOpen ? 'Hide details' : 'Details: snacks, rating, vitamins, who ate what'}</button>
    ${details}
  </section>`;
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
