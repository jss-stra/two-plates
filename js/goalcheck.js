// The evening goal check: one optional question about whether the app helped
// with what you were doing today. The goal is guessed from the day's usage
// journal and stays a hypothesis until you confirm it, correct it or skip it.
// Answers are journal events (goal slug + answer only - no typed text), so the
// same privacy rules and sync path cover them.
import { journalEvents, recordEvent } from './journal.js';
import { localISO } from './planner.js';

// What the app is for, mapped to the fixed action names that point at it.
// A goal is only asked about when it dominated the day; thin days ask nothing.
export const GOALS = [
  { id: 'plan-week', label: 'planning the week', acts: ['shuffle', 'open-sheet', 'search-week', 'swap-random', 'add', 'lock', 'finalize', 'unfinalize', 'remove-slot', 'note-slot'] },
  { id: 'groceries', label: 'getting the groceries', acts: ['check', 'pantry', 'del-extra', 'gsection', 'bought', 'receipt'] },
  { id: 'cooking', label: 'cooking from the plan', acts: ['cooked', 'open-imported', 'checkin-open', 'finish-week', 'prep', 'carry'] },
  { id: 'prep', label: 'prepping ahead', acts: ['prep-tick', 'prep-done'] },
];
const MIN_SIGNAL = 2; // events in the leading goal before it is worth asking
const ASK_AFTER_HOUR = 17; // local time; the question is about the day

export function goalLabel(id) { return GOALS.find((g) => g.id === id)?.label || id; }

function dayStartMs() {
  const d = new Date(`${localISO()}T00:00:00`);
  return d.getTime();
}

// Count today's journal events per goal; return the leading goal past the
// signal floor, or null when the day was too thin to ask about.
export function inferGoal(events = journalEvents(dayStartMs())) {
  const counts = Object.fromEntries(GOALS.map((g) => [g.id, 0]));
  for (const e of events) {
    if (e.k !== 'act' || !e.a) continue;
    for (const g of GOALS) if (g.acts.includes(e.a)) { counts[g.id]++; break; }
  }
  const [top, n] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return n >= MIN_SIGNAL ? top : null;
}

// Today's answer, if any: { goal, result } from the newest goal-check event.
export function todaysAnswer(events = journalEvents(dayStartMs())) {
  const answers = events.filter((e) => e.k === 'goal-check' && e.result && e.result !== 'shown');
  const last = answers[answers.length - 1];
  return last ? { goal: last.g, result: last.result } : null;
}

export function answerGoal(goal, result) {
  recordEvent('goal-check', { g: goal, result });
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// The card on the Home tab. Shows in the evening, once per day, only when a
// goal could be inferred. `ui.goalPick` switches to the correction chips.
export function goalCard(ui, now = new Date()) {
  if (now.getHours() < ASK_AFTER_HOUR) return '';
  const answered = todaysAnswer();
  const events = journalEvents(dayStartMs());
  const alreadyShown = events.some((e) => e.k === 'goal-check' && e.result === 'shown');
  if (answered) return '';
  const goal = ui.goalGoal || inferGoal(events);
  if (!goal) return '';
  if (!alreadyShown) recordEvent('goal-check', { g: goal, result: 'shown' });
  if (ui.goalPick) {
    const others = GOALS.filter((g) => g.id !== goal);
    return `<section class="card goal-check">
      <h3>What were you actually doing?</h3>
      <div class="chips wrapchips">${others.map((g) => `<button class="chip" data-act="goal-pick" data-g="${g.id}">${esc(g.label)}</button>`).join('')}
        <button class="chip" data-act="goal-skip" data-g="${esc(goal)}">Skip the question</button></div>
    </section>`;
  }
  return `<section class="card goal-check">
    <h3>Quick check</h3>
    <p>It looked like you were <b>${esc(goalLabel(goal))}</b> today. Did you manage it?</p>
    <div class="row-btns">
      <button class="btn primary" data-act="goal-answer" data-g="${esc(goal)}" data-v="yes">Yes</button>
      <button class="btn" data-act="goal-answer" data-g="${esc(goal)}" data-v="no">No</button>
      <button class="btn ghost" data-act="goal-wrong" data-g="${esc(goal)}">Not that</button>
      <button class="btn ghost" data-act="goal-skip" data-g="${esc(goal)}" aria-label="Skip">✕</button>
    </div>
  </section>`;
}
