// Week card gestures: swipe-left removal drops the dish and its chicken/veg
// target so Shuffle won't refill the gap; notes written via swipe right live
// on the slot and survive reshuffles that keep the dish.
import assert from 'node:assert/strict';
import { RECIPES } from '../js/data.js';
import { generateSlots, removeSlot, slotKind } from '../js/planner.js';
import { defaultState } from '../js/state.js';
import { makeCustomDish } from '../js/custom.js';

const chicken = RECIPES.find((r) => r.diet === 'nonveg');
const veg = RECIPES.find((r) => r.diet === 'veg');

const state = () => {
  const s = defaultState();
  s.plan.slots = [
    { id: chicken.id, locked: false },
    { id: veg.id, locked: true },
  ];
  return s;
};

// Removing a chicken dish drops the chicken target with it.
{
  const s = state();
  const before = { c: s.rules.chickenDishes, v: s.rules.vegDishes };
  const removed = removeSlot(s, 0);
  assert.equal(removed.id, chicken.id, 'removed dish returned');
  assert.equal(s.plan.slots.length, 1, 'slot gone');
  assert.equal(s.rules.chickenDishes, before.c - 1, 'chicken target followed it down');
  assert.equal(s.rules.vegDishes, before.v, 'veg target untouched');
}

// Removing a locked veg dish drops the veg target.
{
  const s = state();
  removeSlot(s, 1);
  assert.equal(s.rules.vegDishes, 1, 'veg target followed it down');
  assert.equal(s.rules.chickenDishes, 3, 'chicken target untouched');
}

// An unknown-diet custom dish never filled a target, so none moves.
{
  const s = state();
  const rec = makeCustomDish({ name: 'Test Paneer Wrap', ingredients: ['paneer'], diet: 'unknown' });
  s.customDishes[rec.id] = rec;
  s.plan.slots.push({ id: rec.id, locked: true });
  removeSlot(s, 2);
  assert.equal(s.rules.chickenDishes, 3, 'chicken target untouched');
  assert.equal(s.rules.vegDishes, 2, 'veg target untouched');
  assert.equal(s.plan.slots.length, 2, 'custom slot gone');
}

// Out-of-range removal is a no-op, not a crash.
{
  const s = state();
  assert.equal(removeSlot(s, 9), null);
  assert.equal(s.plan.slots.length, 2, 'plan unchanged');
  assert.equal(s.rules.chickenDishes + s.rules.vegDishes, 5, 'targets unchanged');
}

// Slot notes survive a reshuffle/regeneration that keeps the dish.
{
  const s = state();
  s.plan.slots[1].note = 'cook Thursday';
  const regen = generateSlots(s);
  const kept = regen.find((x) => x.id === veg.id);
  assert.equal(kept.note, 'cook Thursday', 'note carried through generateSlots');
  assert.equal(slotKind(kept, veg, s.rules), 'veg', 'kind bookkeeping intact');
}

console.log('week-gestures tests passed');
