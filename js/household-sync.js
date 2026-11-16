// Account-based household sync: each household's plan lives in one
// household_state row that only household members can read or write
// (row-level security on the server decides; the signed-in user's session
// proves membership). This layer is bound to the HOUSEHOLD store only
// (see state.js): it never reads or writes the device's personal store,
// so household data can never reach the old shared-key channel and the
// old channel's data can never reach the household.
import { householdStore, personalStore, defaultState, setMode } from './state.js';
import { authClient, authUser, onAuth } from './auth.js';
import { mergeDays, scopedSeed } from './household-sync-core.js';
import { getConfig as legacyGetConfig, connect as legacyConnect, disconnect as legacyDisconnect } from './sync.js';

const TABLE = 'household_state';
// Pending-edit flag for THIS layer only. The legacy shared-key layer keeps its
// own ('twoplates.dirty.v1'): one flag per layer, so a successful push in one
// layer can never discard the other layer's pending edit.
const DIRTY_KEY = 'twoplates.household-dirty.v1';
const LAST_USER_KEY = 'twoplates.lastuser.v1';
const STASH_PREFIX = 'twoplates.stash.v1.';
const MODE_KEY = 'twoplates.mode.v1';
const deviceId = Math.random().toString(36).slice(2);

let householdId = null;
let channel = null;
let pushTimer = null;
let status = { state: 'off', message: 'Not connected' };
const statusListeners = new Set();

export const onHouseholdSyncStatus = (fn) => statusListeners.add(fn);
export const householdSyncStatus = () => status;
export const currentHouseholdId = () => householdId;

function setStatus(state, message) {
  status = { state, message };
  statusListeners.forEach((fn) => fn(status));
}

const isDirty = () => { try { return localStorage.getItem(DIRTY_KEY) === '1'; } catch { return false; } };
function setDirty(v) {
  try { v ? localStorage.setItem(DIRTY_KEY, '1') : localStorage.removeItem(DIRTY_KEY); } catch { /* ignore */ }
}

// Leaving (or losing membership of) a household: drop this device's cache of
// the shared plan and show the personal plan again. The household's copy on
// the server is untouched; the personal store was never touched at all.
export function clearHouseholdState() {
  householdStore.clear();
  setDirty(false);
  setMode('personal');
}

async function push() {
  const c = authClient();
  if (!c || !householdId) return;
  const { data: current, error: readErr } = await c.from(TABLE).select('data').eq('household_id', householdId).maybeSingle();
  if (readErr) { await membershipGone(readErr); return; }
  if (current?.data?.days) {
    const merged = mergeDays(householdStore.get().days, current.data.days);
    if (JSON.stringify(merged) !== JSON.stringify(householdStore.get().days)) householdStore.replace({ ...householdStore.get(), days: merged });
  }
  const s = householdStore.get();
  const { error } = await c.from(TABLE).upsert({
    household_id: householdId,
    data: { ...s, _device: deviceId },
    updated_by: authUser()?.id || null,
    updated_at: new Date(s.updatedAt || Date.now()).toISOString(),
  });
  if (error) { await membershipGone(error); return; }
  setDirty(false);
  setStatus('on', 'Synced with your household');
}

// A permission error usually means this account is no longer a member (removed,
// or the household is gone). Verify once; if membership is gone, disconnect and
// clear the household cache - a departed member keeps no readable copy.
async function membershipGone(err) {
  const hid = householdId;
  if (!hid) return;
  const still = await resolveMyHousehold();
  if (still === hid) { setStatus('error', `Not saved yet — will retry: ${err.message}`); return; }
  await disconnectHousehold();
  clearHouseholdState();
}

function schedulePush() {
  clearTimeout(pushTimer);
  setStatus('saving', 'Saving…');
  pushTimer = setTimeout(() => { pushTimer = null; push(); }, 700);
}

function onLocalChange() {
  if (!householdId) return;
  setDirty(true);
  if (authClient()) schedulePush();
  else setStatus('saving', 'Not saved yet — will sync when online');
}

export async function flushHouseholdSync() {
  clearTimeout(pushTimer);
  pushTimer = null;
  if (authClient() && householdId && isDirty()) await push();
}

function applyRemote(row) {
  const data = row?.data;
  if (!data || data._device === deviceId) return;
  const { _device, ...rest } = data;
  const local = householdStore.get();
  if ((data.updatedAt || 0) > (local.updatedAt || 0)) {
    // Newer overall: take the remote plan/settings, keep each person's
    // newest food-log entries from both sides.
    householdStore.replace({ ...rest, days: mergeDays(local.days, rest.days) });
  } else {
    // Older overall (we edited something else more recently): the top-level
    // timestamp must not hide newer per-person log entries in this row.
    const merged = mergeDays(local.days, rest.days);
    if (JSON.stringify(merged) === JSON.stringify(local.days || {})) return;
    householdStore.replace({ ...local, days: merged });
  }
  setStatus('on', 'Synced — updated from your household');
}

// A device can be shared. When a DIFFERENT account signs in, the previous
// account's local state is stashed under that account's id and the pending-edit
// flags are cleared, so they can never be pushed into the new account's
// household or cloud. The keys that belong to the account rather than the
// device (the old channel's connection details, both layers' pending-edit
// flags, the household cache and the mode flag) are stashed with it: the next
// account can never read or push through them. The stash is device-local, keyed
// by account, and is restored only when that same account signs back in.
// Anonymous local data on a first sign-in (no previous account) is preserved:
// the new signed-in user keeps what this device already had.
const ACCOUNT_KEYS = ['twoplates.sync.v1', 'twoplates.dirty.v1', DIRTY_KEY, MODE_KEY];
export async function partitionStateForUser(u) {
  if (!u) {
    // Sign-out: the household cache is account-bound, so it goes; the personal
    // store stays exactly as it is (existing behavior).
    await disconnectHousehold();
    clearHouseholdState();
    return;
  }
  let last = null;
  try { last = localStorage.getItem(LAST_USER_KEY); } catch { /* ignore */ }
  if (last && last !== u.id) {
    const stashOut = { state: personalStore.get(), household: householdStore.get(), keys: {} };
    try {
      for (const k of ACCOUNT_KEYS) stashOut.keys[k] = localStorage.getItem(k);
      localStorage.setItem(STASH_PREFIX + last, JSON.stringify(stashOut));
    } catch { /* ignore */ }
    // Tear the old channel down before wiping its keys: its realtime listener
    // must not apply the previous account's rows into the new account's state.
    await legacyDisconnect();
    await disconnectHousehold();
    for (const k of ACCOUNT_KEYS) { try { localStorage.removeItem(k); } catch { /* ignore */ } }
    personalStore.replace({ ...defaultState(), updatedAt: 0 });
    householdStore.clear();
    setMode('personal');
    let stash = null;
    try { stash = localStorage.getItem(STASH_PREFIX + u.id); } catch { /* ignore */ }
    if (stash) {
      try {
        const parsed = JSON.parse(stash);
        const s = parsed?.state ?? parsed; // tolerate bare-state stashes from earlier builds
        if (s && typeof s === 'object' && Array.isArray(s.people)) personalStore.replace(s);
        if (parsed?.household && typeof parsed.household === 'object' && Array.isArray(parsed.household.people)) householdStore.replace(parsed.household);
        if (parsed?.keys) {
          for (const k of ACCOUNT_KEYS) {
            try {
              if (parsed.keys[k] == null) localStorage.removeItem(k);
              else localStorage.setItem(k, parsed.keys[k]);
            } catch { /* ignore */ }
          }
        }
      } catch { /* ignore */ }
      try { localStorage.removeItem(STASH_PREFIX + u.id); } catch { /* ignore */ }
    }
    // Reconnect the old channel only if THIS account had it configured.
    const cfg = legacyGetConfig();
    if (cfg) legacyConnect(cfg);
  }
  try { localStorage.setItem(LAST_USER_KEY, u.id); } catch { /* ignore */ }
}

let connectSeq = 0;
// seed: 'blank' (default) starts a brand-new household with an empty shared
// plan; 'personal' is the separately explicit choice to copy this device's
// current plan/people/settings into it (scopedSeed: never the food log or
// shopping progress). Existing households always load from the server row.
// activate: true only on the explicit create/join action, which switches the
// device to showing the household plan; boot-time reconnects keep the current
// mode.
export async function connectHousehold(hid, { seed = 'blank', activate = false } = {}) {
  const seq = ++connectSeq; // newest call wins: stale racing connects bail out
  await disconnectHousehold({ keepHousehold: true });
  if (seq !== connectSeq) return;
  const c = authClient();
  if (!c || !hid) return;
  householdId = hid;
  setStatus('saving', 'Connecting…');
  try {
    const { data, error } = await c.from(TABLE).select('data, updated_by').eq('household_id', hid).maybeSingle();
    if (error) throw error;
    if (!data?.data) {
      // Brand-new household: seed the shared plan from the explicit choice.
      householdStore.replace(seed === 'personal'
        ? scopedSeed(personalStore.get(), defaultState())
        : { ...defaultState(), updatedAt: Date.now() });
      await push();
    } else if (isDirty()) {
      // Reconnecting with unsent household edits: push them (push merges the
      // server's newest food-log entries first) instead of adopting over them.
      await push();
    } else {
      const { _device, ...rest } = data.data;
      householdStore.replace({ ...rest, days: mergeDays(householdStore.get().days, rest.days) });
      setDirty(false);
    }
    if (seq !== connectSeq) return;
    if (activate) setMode('household');
    channel = c.channel(`${TABLE}:${hid}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: TABLE, filter: `household_id=eq.${hid}` },
        (payload) => applyRemote(payload.new))
      .subscribe(async (s) => {
        if (s === 'CHANNEL_ERROR') setStatus('error', 'Live updates unavailable — will still save');
        if (s === 'SUBSCRIBED') {
          // Catch-up after a reconnect: live events that arrived while this
          // device was offline are never replayed, so pull the current row.
          if (isDirty()) { await push(); return; }
          const { data: cur } = await c.from(TABLE).select('data, updated_by').eq('household_id', hid).maybeSingle();
          if (cur?.data) applyRemote({ data: { ...cur.data, _device: 'remote' }, updated_by: cur.updated_by });
        }
      });
    householdStore.addSyncHook(onLocalChange);
    if (!isDirty()) setStatus('on', 'Synced with your household');
  } catch (e) {
    householdId = null;
    setStatus('error', `Couldn't connect: ${e.message || e}`);
  }
}

export async function disconnectHousehold({ keepHousehold = false } = {}) {
  const c = authClient();
  if (channel && c) await c.removeChannel(channel);
  channel = null;
  if (!keepHousehold) { householdId = null; setStatus('off', 'Not connected'); }
}

// The signed-in user's household, if they are in one (v1: first household).
async function resolveMyHousehold() {
  const u = authUser();
  const c = authClient();
  if (!u || !c) return null;
  const { data: mems, error } = await c.from('household_members').select('household_id').eq('user_id', u.id);
  if (error || !mems?.length) return null;
  return mems[0].household_id;
}


export function startHouseholdSync() {
  onAuth(async (u) => {
    if (!u) { await disconnectHousehold(); clearHouseholdState(); return; }
    await partitionStateForUser(u);
    const hid = await resolveMyHousehold();
    if (!hid) {
      // Not in a household: no household cache may linger (e.g. restored from
      // a stash after the account was removed from the household elsewhere).
      clearHouseholdState();
      return;
    }
    await connectHousehold(hid);
    if (!currentHouseholdId()) {
      // A transient boot failure must not silently disconnect the household:
      // one retry before giving up (further edits retry via the dirty flag).
      await new Promise((r) => setTimeout(r, 3000));
      const hid2 = await resolveMyHousehold();
      if (hid2) await connectHousehold(hid2);
    }
  });
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'hidden') { flushHouseholdSync(); return; }
    const c = authClient();
    if (!c || !householdId) return;
    if (isDirty()) { await push(); return; }
    const { data } = await c.from(TABLE).select('data, updated_by').eq('household_id', householdId).maybeSingle();
    if (data) applyRemote({ data: { ...data.data, _device: 'remote' }, updated_by: data.updated_by });
  });
  window.addEventListener('pagehide', () => { flushHouseholdSync(); });
  // Connectivity restored: flush pending edits immediately instead of waiting
  // for the realtime channel to resubscribe.
  window.addEventListener('online', () => { flushHouseholdSync(); });
}
