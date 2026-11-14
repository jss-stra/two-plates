// Week labeling: after "Finish week" the plan is next week's, and screens must
// say which week the menu is for, with dates.
import assert from 'node:assert/strict';
import { currentWeekStart, weekRelation, weekRangeLabel } from '../js/planner.js';

const sat = new Date(2026, 10, 14, 12); // Sat 14 Nov 2026
assert.equal(currentWeekStart(0, sat), '2026-11-09', 'Monday start containing Sat 14 Nov');
assert.equal(currentWeekStart(0, new Date(2026, 10, 9, 12)), '2026-11-09', 'start day itself');
assert.equal(currentWeekStart(6, sat), '2026-11-08', 'Sunday start day');

assert.equal(weekRelation('2026-11-09', 0, sat), 'this');
assert.equal(weekRelation('2026-11-16', 0, sat), 'next', 'the plan made by Finish week');
assert.equal(weekRelation('2026-11-23', 0, sat), 'later');
assert.equal(weekRelation('2026-11-02', 0, sat), 'past');
assert.equal(weekRelation(null, 0, sat), 'this', 'no plan week falls back to this week');
assert.equal(weekRelation('', 0, sat), 'this');

assert.equal(weekRangeLabel('2026-11-09'), 'Mon 9 – Sun 15 Nov');
assert.equal(weekRangeLabel('2026-11-16'), 'Mon 16 – Sun 22 Nov');
assert.equal(weekRangeLabel('2026-12-28'), 'Mon 28 Dec – Sun 3 Jan', 'month boundary shows both months');
assert.equal(weekRangeLabel(''), '');

console.log('week-labels tests passed');
