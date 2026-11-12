import assert from 'node:assert/strict';
import { defaultState } from '../js/state.js';
import { localISO } from '../js/planner.js';
import {
  WATER_SLOTS, slotLabel, dueWaterSlot, slotsSoFar,
  recordWaterAnswer, waterAnswer, pendingWaterSlot, waterCheckDay,
} from '../js/water.js';

const at = (h, m = 0) => new Date(2026, 10, 13, h, m); // local time, Fri 13 Nov 2026

// Slot schedule: 9am, noon, 3pm, 6pm, 9pm; prompts stop at 10pm.
assert.deepEqual(WATER_SLOTS, [9, 12, 15, 18, 21]);
assert.equal(dueWaterSlot(at(8, 59)), null, 'nothing before 9am');
assert.equal(dueWaterSlot(at(9)), 9);
assert.equal(dueWaterSlot(at(11, 59)), 9);
assert.equal(dueWaterSlot(at(12)), 12);
assert.equal(dueWaterSlot(at(14, 30)), 12);
assert.equal(dueWaterSlot(at(15)), 15);
assert.equal(dueWaterSlot(at(17, 59)), 15);
assert.equal(dueWaterSlot(at(18)), 18);
assert.equal(dueWaterSlot(at(21)), 21);
assert.equal(dueWaterSlot(at(21, 59)), 21);
assert.equal(dueWaterSlot(at(22)), null, 'no new prompts at 10pm');
assert.equal(dueWaterSlot(at(23, 30)), null, 'nothing after 10pm');

// Display slots ignore the 10pm prompt cutoff.
assert.deepEqual(slotsSoFar(at(8)), []);
assert.deepEqual(slotsSoFar(at(12, 30)), [9, 12]);
assert.deepEqual(slotsSoFar(at(23)), WATER_SLOTS);

assert.equal(slotLabel(9), '9am');
assert.equal(slotLabel(12), '12pm');
assert.equal(slotLabel(15), '3pm');
assert.equal(slotLabel(18), '6pm');
assert.equal(slotLabel(21), '9pm');

// Recording answers: set, read, overwrite, missing data stays unanswered.
const e = {};
recordWaterAnswer(e, 9, 'yes');
recordWaterAnswer(e, 12, 'no');
assert.equal(waterAnswer(e, 9), 'yes');
assert.equal(waterAnswer(e, 12), 'no');
assert.equal(waterAnswer(e, 15), null);
recordWaterAnswer(e, 9, 'no');
assert.equal(waterAnswer(e, 9), 'no', 're-answering a slot overwrites it');
assert.equal(waterAnswer({}, 9), null);
assert.equal(waterAnswer(null, 9), null);

// Pending prompt: the latest due slot that is neither answered nor dismissed.
const s = defaultState();
const iso = localISO(at(12, 30));
s.days[iso] = { 0: {} };
assert.equal(pendingWaterSlot(s, 0, at(12, 30)), 12, 'newest unanswered slot is asked first');
recordWaterAnswer(s.days[iso][0], 12, 'yes');
assert.equal(pendingWaterSlot(s, 0, at(12, 30)), 9, 'falls back to the earlier unanswered slot');
recordWaterAnswer(s.days[iso][0], 9, 'no');
assert.equal(pendingWaterSlot(s, 0, at(12, 30)), null, 'all due slots answered');
assert.equal(pendingWaterSlot(s, 0, at(8, 30)), null, 'before 9am');
assert.equal(pendingWaterSlot(s, 0, at(22, 15)), null, 'after 10pm');
assert.equal(pendingWaterSlot(s, 1, at(12, 30)), 12, 'tracked per person');

// Day summaries count answers over due slots only, yes and no kept apart.
assert.deepEqual(waterCheckDay(s.days[iso][0], at(12, 30)), { due: 2, answered: 2, yes: 1, no: 1 });
assert.deepEqual(waterCheckDay({}, at(12, 30)), { due: 2, answered: 0, yes: 0, no: 0 });
assert.deepEqual(waterCheckDay(s.days[iso][0], at(8)), { due: 0, answered: 0, yes: 0, no: 0 });
assert.deepEqual(waterCheckDay(s.days[iso][0], at(21, 30)), { due: 5, answered: 2, yes: 1, no: 1 });

console.log('PASS: water check-in slots, recording, pending prompt, per-person and daily summaries');
