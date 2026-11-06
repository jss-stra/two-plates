// Water tracking helpers and the 9am-9pm reminder check.
// Rule (Jatin, 6 Nov 2026): nudge every 3 hours, 9am-9pm, when no water was
// logged in the previous 3 hours. These nudges fire while the app is open;
// reminders when the app is closed need web push or texts from Instinct.
import { localISO } from './planner.js';

export const WATER_START_HOUR = 9;
export const WATER_END_HOUR = 21;
export const WATER_SPAN_MS = 3 * 60 * 60 * 1000;
const REMINDED_KEY = 'twoplates.waterRemindedAt.v1';

export const waterGoal = (person) => person?.waterGlasses ?? 8;

const lastRemindedAt = () => {
  try { return Number(localStorage.getItem(REMINDED_KEY)) || 0; } catch { return 0; }
};
export const markWaterReminded = (at = Date.now()) => {
  try { localStorage.setItem(REMINDED_KEY, String(at)); } catch { /* ignore */ }
};

// Is a water nudge due right now for this person?
export function waterReminderDue(state, personIdx, now = new Date()) {
  const h = now.getHours();
  if (h < WATER_START_HOUR || h > WATER_END_HOUR || (h === WATER_END_HOUR && now.getMinutes() > 0)) return false;
  const windowStart = new Date(now);
  windowStart.setHours(WATER_START_HOUR, 0, 0, 0);
  if (now - windowStart < WATER_SPAN_MS) return false; // first nudge not before midday
  const entry = state.days?.[localISO(now)]?.[personIdx] || {};
  const loggedRecently = (entry.waterTs || []).some((t) => now.getTime() - t < WATER_SPAN_MS);
  if (loggedRecently) return false;
  return now.getTime() - lastRemindedAt() >= WATER_SPAN_MS;
}
