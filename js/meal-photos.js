// Meal photos: when you eat something other than the planned dish, add a
// photo and Claude reads it later (a scheduled task, like receipts) and
// writes back an estimate. See docs/meal-photos.md for the row format.
//
// Rows in meal_state, next to the household's plan:
//   <household>:meal-photo:<id>      { at, iso, person, meal, status: new|read|unreadable, thumb, note,
//                                      foods: [{ food, n }],                    <- what you picked, as a hint
//                                      estimate: { items: [{ name, qty, protein, kcal, carbs, fibre }],
//                                                  protein, kcal, carbs, fibre, note } }  <- written by Claude
//   <household>:meal-photo-img:<id>  { images: [jpeg data URL] }  (only fetched by Claude)
import { getConfig, syncClient } from './sync.js';
import { compress, save } from './receipts.js';

let photos = {};
const listeners = new Set();
export const onMealPhotos = (fn) => listeners.add(fn);
const emit = () => listeners.forEach((fn) => fn());
export const mealPhoto = (id) => (id ? photos[id] || null : null);

export async function loadMealPhotos() {
  const c = syncClient();
  if (!c || !getConfig()) return;
  const { data, error } = await c.from('meal_state').select('id,data').like('id', `${getConfig().household}:meal-photo:%`);
  if (error) return;
  photos = Object.fromEntries(data.map((r) => [r.id.split(':').pop(), r.data]));
  emit();
}

export async function addMealPhoto(file, { iso, person, meal, note = '', foods = [] }) {
  if (!syncClient()) throw new Error('Connect sync in Settings first, so Claude can see the photo');
  const image = await compress(file, 1600, 0.72);
  const thumb = await compress(file, 240, 0.6);
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  await save('meal-photo-img', id, { images: [image] });
  const meta = { at: Date.now(), iso, person, meal, status: 'new', thumb, note, foods };
  await save('meal-photo', id, meta);
  photos[id] = meta;
  emit();
  return id;
}

export async function removeMealPhoto(id) {
  if (!photos[id]) return;
  await save('meal-photo', id, { ...photos[id], removed: true });
  await save('meal-photo-img', id, { images: [] });
  delete photos[id];
  emit();
}

// Claude's estimate for a photo, once read; null until then.
export function photoEstimate(id) {
  const p = mealPhoto(id);
  if (!p || p.removed || p.status !== 'read' || !p.estimate) return null;
  const e = p.estimate;
  const n = (v) => (Number.isFinite(Number(v)) ? Math.round(Number(v)) : null);
  return { protein: n(e.protein), kcal: n(e.kcal), carbs: n(e.carbs), fibre: n(e.fibre), items: e.items || [], note: e.note || '' };
}
