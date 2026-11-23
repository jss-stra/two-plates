// What one person actually ate on a day, from their Today log: protein,
// calories, carbs and fibre. Only logged meals count. When something logged
// has no figure (a typed "outside plan" amount has no carbs, your own dish has
// no nutrition), that total is flagged partial[key] - never filled in with 0.
import { dishById } from './custom.js';
import { mealFor } from './planner.js';
import { fixedMealsOf, fixedTotals, outsideOf } from './fixed-meals.js';
import { foodsTotal } from './quick-foods.js';
import { photoEstimate } from './meal-photos.js';

const KEYS = ['protein', 'kcal', 'carbs', 'fibre'];
const zero = () => ({ protein: 0, kcal: 0, carbs: 0, fibre: 0, partial: {} });

// Known numbers add up; an unknown one marks that total as partial (shown as
// "at least") instead of hiding everything else that was logged.
function add(t, part) {
  for (const k of KEYS) {
    if (part[k] == null) t.partial[k] = true;
    else t[k] += part[k];
  }
}

// One off-plan meal: Claude's photo estimate when read, otherwise the picked foods.
function offPlan(e, field) {
  const est = photoEstimate(e[`${field}Photo`]);
  if (est) return { ...est, source: 'photo' };
  return { ...foodsTotal(e[`${field}Foods`]), source: 'foods' };
}

export function dayIntake(state, entry, p) {
  const e = entry || {};
  const person = state.people[p];
  const total = zero();
  const parts = [];
  let logged = 0;
  if (e.breakfast === 'usual') {
    const t = fixedMealsOf(person).length ? fixedTotals(person) : outsideOf(person);
    add(total, t); parts.push({ meal: 'breakfast', ...t }); logged++;
  } else if (e.breakfast === 'other') {
    const t = offPlan(e, 'breakfast'); add(total, t); parts.push({ meal: 'breakfast', ...t }); logged++;
  } else if (e.breakfast === 'skipped') logged++;
  for (const field of ['lunch', 'dinner']) {
    const v = e[field];
    if (!v) continue;
    logged++;
    if (v === 'skipped') continue;
    let t;
    if (v === 'other') t = offPlan(e, field);
    else {
      const r = dishById(state, v);
      t = r ? mealFor(r, person, state.rules) : { protein: null, kcal: null, carbs: null, fibre: null };
    }
    add(total, t);
    parts.push({ meal: field, ...t });
  }
  if (e.snackFoods?.length) { const t = foodsTotal(e.snackFoods); add(total, t); parts.push({ meal: 'snacks', ...t }); }
  for (const k of KEYS) total[k] = Math.round(total[k]);
  return { ...total, parts, logged };
}
