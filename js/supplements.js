// Vitamins and supplements each person takes, ticked off on the Today tab.
// every: how often it's due, in days (1 = daily, 28 = every 4 weeks).
import { localISO } from './planner.js';

const BOTH = [
  { id: 'omega3', name: 'Omega-3', dose: '1 capsule', when: 'With lunch', every: 1 },
  { id: 'b12', name: 'Vitamin B12', dose: '1 tablet (1,000 mcg)', when: 'With breakfast', every: 1 },
  { id: 'vitd', name: 'Vitamin D3 50,000 IU', dose: '1 capsule', when: 'With a meal that has some fat', every: 28 },
];
export const SUPPLEMENT_PRESETS = {
  jatin: {
    label: "Jatin's list",
    items: [
      ...BOTH,
      { id: 'creatine', name: 'Creatine', dose: '3-5 g', when: 'After the gym, any time on rest days', every: 1 },
      { id: 'whey', name: 'Whey shake', dose: '1 scoop', when: 'Breakfast', every: 1 },
      { id: 'protein-water', name: 'Protein water', dose: '1 scoop', when: 'After the gym', every: 1 },
    ],
  },
  divya: {
    label: "Divya's list",
    items: [
      ...BOTH,
      { id: 'creatine', name: 'Creatine', dose: '3-5 g in water', when: 'After the gym, any time on rest days', every: 1 },
    ],
  },
};

export const supplementsOf = (person) => (Array.isArray(person?.supplements) ? person.supplements : []);
export const presetSupplements = (key) => structuredClone(SUPPLEMENT_PRESETS[key]?.items || []);
export const blankSupplement = () => ({ id: `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`, name: '', dose: '', when: '', every: 1 });

const daysBetween = (a, b) => Math.round((new Date(`${b}T12:00:00`) - new Date(`${a}T12:00:00`)) / 86400000);

// The latest date (on or before iso) this person ticked a supplement, or null.
export function lastTaken(state, p, id, iso = localISO()) {
  const dates = Object.keys(state.days || {}).filter((d) => d <= iso).sort().reverse();
  return dates.find((d) => state.days[d]?.[p]?.supps?.[id]) || null;
}

// { taken: ticked on iso, due: should be taken on iso, nextIn: days until due when not }
export function supplementStatus(state, p, item, iso = localISO()) {
  const taken = !!state.days?.[iso]?.[p]?.supps?.[item.id];
  const every = Math.max(1, Number(item.every) || 1);
  if (every === 1) return { taken, due: true, nextIn: 0 };
  const prevDay = new Date(`${iso}T12:00:00`);
  prevDay.setDate(prevDay.getDate() - 1);
  const last = lastTaken(state, p, item.id, localISO(prevDay));
  const since = last ? daysBetween(last, iso) : Infinity;
  return { taken, due: since >= every, nextIn: Number.isFinite(since) ? Math.max(0, every - since) : 0, last };
}
