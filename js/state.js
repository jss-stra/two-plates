// App state: TWO isolated JSON documents, each saved to its own localStorage key.
//
// - The personal store ('twoplates.state.v1') is the state this device has always
//   had. It syncs (when configured) over the old shared-key channel with the other
//   devices that know the code - so it may hold data from whoever shares that code.
//   Household membership never reads or writes it.
// - The household store ('twoplates.household-state.v1') is this device's cache of
//   the account household's shared plan. It syncs over the authenticated household
//   channel only, and is cleared when the account leaves the household or signs out.
//
// The two stores never merge into each other. A per-device mode flag chooses which
// one the UI shows and edits; each sync layer binds to its own store directly, so
// household data can never reach the old shared-key channel and the old channel's
// data can never reach the household.
const PERSONAL_KEY = 'twoplates.state.v1';
const HOUSEHOLD_KEY = 'twoplates.household-state.v1';
const MODE_KEY = 'twoplates.mode.v1';

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
      usageJournal: true, // private on-device log of screens/buttons used - off stops recording
      cuisineWeights: { Indian: 1, Mexican: 3, Italian: 3, 'Grill & Wraps': 3, 'Indo-Chinese': 2, Thai: 2, 'Explore Asian': 2 },
    },
    // cooked: recipe id -> true (cooked) / false (didn't); carry: id -> false to drop an uncooked dish.
    plan: { weekOf: null, slots: [], cooked: {}, carry: {}, startedAt: 0, finalizedAt: 0 },
    favourites: [], // replaced by ratings; kept so older saves can be migrated
    ratings: {}, // recipe id -> { r: [person1 stars, person2 stars], note }
    hidden: [],
    // Your own dishes, written during menu creation when the catalog lacks
    // them: id -> { id, name, custom, diet, customIngredients, ... }.
    customDishes: {},
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

function makeStore(storageKey) {
  let state = (() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return merge(defaultState(), JSON.parse(raw));
    } catch { /* storage unavailable or corrupt — start fresh */ }
    return defaultState();
  })();
  const listeners = new Set();
  // Several sync layers can listen for local changes at once. A Set keeps them
  // independent and registration idempotent.
  const syncHooks = new Set();

  function persist() {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* ignore */ }
  }

  return {
    get: () => state,
    onChange: (fn) => listeners.add(fn),
    addSyncHook: (fn) => { if (fn) syncHooks.add(fn); },
    // Local change: mutate a copy, save, re-render, push to sync.
    update(mutator) {
      const next = structuredClone(state);
      mutator(next);
      next.updatedAt = Date.now();
      state = next;
      persist();
      listeners.forEach((fn) => fn(state));
      syncHooks.forEach((fn) => fn(state));
    },
    // Remote change from sync: replace without pushing back.
    replace(remote) {
      state = merge(defaultState(), remote);
      persist();
      listeners.forEach((fn) => fn(state));
    },
    // Drop this store's contents entirely (household cache on leave/sign-out).
    clear() {
      state = defaultState();
      try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
      listeners.forEach((fn) => fn(state));
    },
  };
}

// The sync layers bind to these directly and never to the mode-routed API below.
export const personalStore = makeStore(PERSONAL_KEY);
export const householdStore = makeStore(HOUSEHOLD_KEY);

export const getMode = () => {
  try { return localStorage.getItem(MODE_KEY) === 'household' ? 'household' : 'personal'; } catch { return 'personal'; }
};
const modeListeners = new Set();
export const onModeChange = (fn) => modeListeners.add(fn);
export function setMode(mode) {
  const next = mode === 'household' ? 'household' : 'personal';
  if (next === getMode()) return;
  try {
    if (next === 'personal') localStorage.removeItem(MODE_KEY);
    else localStorage.setItem(MODE_KEY, next);
  } catch { /* ignore */ }
  modeListeners.forEach((fn) => fn(next));
}

const active = () => (getMode() === 'household' ? householdStore : personalStore);

// UI-facing API: everything the screens do goes through the ACTIVE store.
export const getState = () => active().get();
export const update = (mutator) => active().update(mutator);
export const replaceState = (remote) => active().replace(remote);
// Re-render on any store change and on mode switches: the visible plan can
// change under either.
export const onChange = (fn) => { personalStore.onChange(fn); householdStore.onChange(fn); modeListeners.add(() => fn(active().get())); };
export const setSyncHook = (fn) => active().addSyncHook(fn);
export const addSyncHook = (fn) => active().addSyncHook(fn);
