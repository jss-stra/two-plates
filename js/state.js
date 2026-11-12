// App state: one JSON document, saved to localStorage and (optionally) synced via Supabase.
const KEY = 'twoplates.state.v1';

export function defaultState() {
  return {
    version: 1,
    updatedAt: 0,
    // Placeholder people — enter your own names and targets in Settings.
    // "Outside" = breakfast, shakes and snacks: everything the plan doesn't cover.
    people: [
      {
        name: 'Person 1', proteinMin: 100, proteinMax: 130, kcalMin: 1800, kcalMax: 2100,
        outsideProtein: 40, outsideKcal: 500, portion: 1.2,
      },
      {
        name: 'Person 2', proteinMin: 70, proteinMax: 90, kcalMin: 1500, kcalMax: 1700,
        outsideProtein: 30, outsideKcal: 500, portion: 0.9,
      },
    ],
    rules: {
      chickenDishes: 3,
      vegDishes: 2,
      indianVeg: 2, // how many of the veg dishes are Indian
      mealsPerDish: 2, // dinner + next-day lunch
      eggsCountAsVeg: false,
      maxTime: 45,
      longPerWeek: 1, // dishes allowed over maxTime (weekend cooks)
      minProtein: 20,
      maxSameProtein: 3,
      startDay: 0, // 0 = Monday
      waterRemind: true, // 3-hourly water nudges, 9am-9pm, while the app is open
      cuisineWeights: { Indian: 1, Mexican: 3, Italian: 3, 'Grill & Wraps': 3, 'Indo-Chinese': 2, Thai: 2, 'Explore Asian': 2 },
    },
    // cooked: recipe id -> true (cooked) / false (didn't); carry: id -> false to drop an uncooked dish.
    plan: { weekOf: null, slots: [], cooked: {}, carry: {}, startedAt: 0, finalizedAt: 0 },
    favourites: [], // replaced by ratings; kept so older saves can be migrated
    ratings: {}, // recipe id -> { r: [person1 stars, person2 stars], note }
    hidden: [],
    // Ingredient ids (from data/ingredients.js) the planner must never suggest.
    // allergies: hard constraint; dislikes: also skipped. Both warn on already-planned dishes.
    exclusions: { allergies: [], dislikes: [] },
    history: [],
    pantry: {}, // ingredient id -> true (always have) / false (always buy)
    checked: {},
    bought: {}, // grocery item key -> what you actually bought, e.g. "1 kg"
    extras: [],
    occasions: [],
    prep: { dates: {}, tasks: {}, done: {}, minutes: {} },
    // Daily food log: 'YYYY-MM-DD' -> { 0: entry for person 1, 1: entry for person 2 }.
    // entry: { breakfast: 'usual'|'other', breakfastText, lunch/dinner: recipe id|'other'|'skipped',
    //          lunchText, dinnerText, snacks, cheats: [], cheatDay, rating 1-5, note,
    //          water: glasses today, waterTs: [ms timestamps of each glass],
    //          waterCheck: { '9'|'12'|'15'|'18'|'21': { a: 'yes'|'no', t: ms } } — check-in answers }
    days: {},
  };
}

function merge(base, saved) {
  if (Array.isArray(base) || typeof base !== 'object' || base === null) return saved ?? base;
  const out = { ...base };
  for (const k of Object.keys(saved || {})) {
    out[k] = k in base && typeof base[k] === 'object' && base[k] !== null && !Array.isArray(base[k])
      ? merge(base[k], saved[k]) : saved[k];
  }
  return out;
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return merge(defaultState(), JSON.parse(raw));
  } catch { /* storage unavailable or corrupt — start fresh */ }
  return defaultState();
}

let state = load();
const listeners = new Set();
let syncHook = null;

export const getState = () => state;
export const onChange = (fn) => listeners.add(fn);
export const setSyncHook = (fn) => { syncHook = fn; };

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
}

// Local change: mutate a copy, save, re-render, push to sync.
export function update(mutator) {
  const next = structuredClone(state);
  mutator(next);
  next.updatedAt = Date.now();
  state = next;
  persist();
  listeners.forEach((fn) => fn(state));
  syncHook?.(state);
}

// Remote change from sync: replace without pushing back.
export function replaceState(remote) {
  state = merge(defaultState(), remote);
  persist();
  listeners.forEach((fn) => fn(state));
}
