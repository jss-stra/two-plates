// Water tracking: yes/no check-ins at fixed times, plus the optional glass counter.
// Rule (Jatin, 13 Nov 2026): a "Did you drink water?" check-in at 9am, noon, 3pm,
// 6pm and 9pm. Push check-ins arrive even when the app is closed (the tap opens the
// app on Yes/No buttons); while the app is open the same question shows as an
// in-app prompt. Nothing after 10pm. A check-in answer says whether water was had
// around that time — it is not a glass count, and daily/weekly summaries keep
// check-ins and the optional glass counter apart.
import { localISO } from './planner.js';

export const WATER_SLOTS = [9, 12, 15, 18, 21]; // local hours: 9am, noon, 3pm, 6pm, 9pm
export const WATER_LAST_PROMPT_HOUR = 22; // no new prompts at or after 10pm
const DISMISS_KEY = 'twoplates.waterDismissed.v1';

export const waterGoal = (person) => person?.waterGlasses ?? 8;

export const slotLabel = (h) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? 'am' : 'pm'}`;

// The latest slot whose time has come right now. null before 9am and from 10pm.
export function dueWaterSlot(now = new Date()) {
  const mins = now.getHours() * 60 + now.getMinutes();
  if (mins < WATER_SLOTS[0] * 60 || mins >= WATER_LAST_PROMPT_HOUR * 60) return null;
  let due = null;
  for (const h of WATER_SLOTS) if (mins >= h * 60) due = h;
  return due;
}

// Slots whose time has come today so far (display only; no 10pm cutoff).
export function slotsSoFar(now = new Date()) {
  const mins = now.getHours() * 60 + now.getMinutes();
  return WATER_SLOTS.filter((h) => mins >= h * 60);
}

// Record a check-in answer on a day entry. Re-answering a slot overwrites it.
export function recordWaterAnswer(entry, slot, answer, at = Date.now()) {
  entry.waterCheck ||= {};
  entry.waterCheck[String(slot)] = { a: answer, t: at };
}

export const waterAnswer = (entry, slot) => entry?.waterCheck?.[String(slot)]?.a || null;

// Dismissed in-app prompts live on this phone only (not synced) and are forgotten
// the next day — a dismissal is "ask me later", never an answer.
const readDismissed = () => {
  try { return JSON.parse(localStorage.getItem(DISMISS_KEY) || '{}'); } catch { return {}; }
};
export function dismissWaterSlot(iso, person, slot) {
  try {
    const all = readDismissed();
    for (const k of Object.keys(all)) if (!k.startsWith(`${iso}:`)) delete all[k];
    all[`${iso}:${person}:${slot}`] = true;
    localStorage.setItem(DISMISS_KEY, JSON.stringify(all));
  } catch { /* storage unavailable */ }
};
const isDismissed = (iso, person, slot) => !!readDismissed()[`${iso}:${person}:${slot}`];

// The slot to prompt for right now: the latest due slot with no answer yet and no
// dismissal on this phone. null when there is nothing to ask.
export function pendingWaterSlot(state, personIdx, now = new Date()) {
  const due = dueWaterSlot(now);
  if (due == null) return null;
  const iso = localISO(now);
  const entry = state.days?.[iso]?.[personIdx] || {};
  for (let i = WATER_SLOTS.length - 1; i >= 0; i--) {
    const h = WATER_SLOTS[i];
    if (h > due) continue;
    if (waterAnswer(entry, h)) continue;
    if (isDismissed(iso, personIdx, h)) continue;
    return h;
  }
  return null;
}

// Day summary over the slots due by `now`: { due, answered, yes, no }.
// Pass a time after 9pm (e.g. new Date(`${iso}T21:30:00`)) for a full past day.
export function waterCheckDay(entry, now = new Date()) {
  const due = slotsSoFar(now);
  let yes = 0, no = 0;
  for (const h of due) {
    const a = waterAnswer(entry, h);
    if (a === 'yes') yes++;
    else if (a === 'no') no++;
  }
  return { due: due.length, answered: yes + no, yes, no };
}
