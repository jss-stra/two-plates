// Usage journal: a private, on-this-phone record of how Two Plates is used -
// which screens and buttons get used and whether they worked. It never records
// typed text, note or recipe content, check-in answers, or anything outside
// the app. It stays on this phone unless a sync the owner approved is set up,
// and it can be turned off in Settings (rules.usageJournal).
const KEY = 'twoplates.journal.v1';
const STATE_KEY = 'twoplates.state.v1';
const MAX_EVENTS = 1000; // hard cap; oldest dropped first
const MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000; // two weeks, pruned on every write

// Event kinds and the only detail keys each may carry. Anything else is
// dropped, so a future call site cannot accidentally record content (dish
// names, typed text). String values must be slug-like tokens, which rules out
// sentences and names by construction.
const KINDS = {
  'app-open': [],
  tab: ['t'], // t: tab name (fixed set in app.js)
  act: ['a'], // a: data-act action name (fixed set in app.js)
  gesture: ['g', 'result'], // g: swipe-left | swipe-right | long-press
  'goal-check': ['g', 'result'], // g: goal slug; result: shown | yes | no | skip
};
const TOKEN = /^[\w-]{1,40}$/;

// Stable per-event id, so a retried upload is ignored server-side instead of
// stored twice. Slug-shaped on purpose.
const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

let testStorage = null; // node tests inject a fake; browsers use localStorage
export function _setStorageForTest(s) { testStorage = s; }
function storage() {
  if (testStorage) return testStorage;
  try { return localStorage; } catch { return null; }
}

// Off only when the owner turned it off in Settings; missing/corrupt state
// means the app never got past first run, so default to on.
export function journalEnabled() {
  try {
    const raw = storage()?.getItem(STATE_KEY);
    if (!raw) return true;
    return JSON.parse(raw).rules?.usageJournal !== false;
  } catch { return true; }
}

function read() {
  try {
    const list = JSON.parse(storage()?.getItem(KEY) || '[]');
    return Array.isArray(list) ? list : [];
  } catch { return []; }
}
function write(list) {
  try { storage()?.setItem(KEY, JSON.stringify(list)); } catch { /* storage full or unavailable */ }
}

export function recordEvent(kind, detail = {}) {
  const keys = KINDS[kind];
  if (!keys || !journalEnabled()) return false;
  const clean = {};
  for (const k of keys) {
    const v = detail[k];
    if (typeof v === 'string' && TOKEN.test(v)) clean[k] = v;
    else if (typeof v === 'boolean') clean[k] = v;
    else if (typeof v === 'number' && Number.isFinite(v)) clean[k] = v;
  }
  const now = Date.now();
  const list = read().filter((e) => now - (e.ts || 0) <= MAX_AGE_MS);
  list.push({ id: newId(), ts: now, k: kind, ...clean });
  write(list.slice(-MAX_EVENTS));
  return true;
}

// Events since a timestamp (default: everything kept), oldest first.
export function journalEvents(since = 0) {
  return read().filter((e) => (e.ts || 0) >= since);
}

// Small counts for an in-app summary or a sync payload: no timestamps, no
// sequences - just how often each thing happened.
export function journalSummary(since = 0) {
  const counts = {};
  for (const e of journalEvents(since)) {
    const label = [e.k, e.k === 'tab' ? e.t : null, e.a, e.g && e.result ? `${e.g}:${e.result}` : e.g]
      .filter((x) => typeof x === 'string').join('/');
    counts[label] = (counts[label] || 0) + 1;
  }
  return counts;
}

export function clearJournal() { write([]); }
