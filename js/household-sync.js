// Account-based household sync: each household's plan lives in one
// household_state row that only household members can read or write
// (row-level security on the server decides; the signed-in user's session
// proves membership). This replaces the shared-key sync for migrated
// households. The legacy sync keeps running alongside it for receipts until
// the old channel is retired.
import { getState, addSyncHook, replaceState, defaultState } from './state.js';
import { authClient, authUser, authReady, onAuth } from './auth.js';
import { mergeDays } from './household-sync-core.js';
import {
  suspendLegacyPlanSync, resumeLegacyPlanSync,
  getConfig as legacyGetConfig, connect as legacyConnect, disconnect as legacyDisconnect,
} from './sync.js';

const TABLE = 'household_state';
// Pending-edit flag for THIS layer only. The legacy shared-key layer keeps its
// own ('twoplates.dirty.v1'): one flag per layer, so a successful push in one
// layer can never discard the other layer's pending edit.
const DIRTY_KEY = 'twoplates.household-dirty.v1';
const PREJOIN_PREFIX = 'twoplates.prejoin-backup.v1.'; // per-account: one user's backup is never another's
const LAST_USER_KEY = 'twoplates.lastuser.v1';
const STASH_PREFIX = 'twoplates.stash.v1.';
const prejoinKey = () => PREJOIN_PREFIX + (authUser()?.id || 'anon');
const deviceId = Math.random().toString(36).slice(2);

let householdId = null;
let channel = null;
let pushTimer = null;
let status = { state: 'off', message: 'Not connected' };
const statusListeners = new Set();

export const onHouseholdSyncStatus = (fn) => statusListeners.add(fn);
export const householdSyncStatus = () => status;
export const currentHouseholdId = () => householdId;
export function hasPrejoinBackup() {
  if (!authUser()) return false;
  try { return !!localStorage.getItem(prejoinKey()); } catch { return false; }
}
// Restores the personal plan this device had before joining a household.
// The shared plan copy stays on the server with the household; only this
// device's local state changes. Returns true when a backup was restored.
export function restorePrejoinBackup() {
  if (!authUser()) return false;
  let raw = null;
  try { raw = localStorage.getItem(prejoinKey()); } catch { /* ignore */ }
  if (!raw) return false;
  try {
    const backup = JSON.parse(raw);
    if (!backup || typeof backup !== 'object' || !Array.isArray(backup.people)) return false;
    replaceState(backup); // replaceState does not fire sync hooks: nothing is pushed
    setDirty(false); // no pending push may carry the restored private plan anywhere
    localStorage.removeItem(prejoinKey());
    resumeLegacyPlanSync(); // personal plan again: the old channel may carry it once more
    return true;
  } catch { return false; }
}
function setStatus(state, message) {
  status = { state, message };
  statusListeners.forEach((fn) => fn(status));
}

const isDirty = () => { try { return localStorage.getItem(DIRTY_KEY) === '1'; } catch { return false; } };
function setDirty(v) {
  try { v ? localStorage.setItem(DIRTY_KEY, '1') : localStorage.removeItem(DIRTY_KEY); } catch { /* ignore */ }
}

async function push() {
  const c = authClient();
  if (!c || !householdId) return;
  const { data: current } = await c.from(TABLE).select('data').eq('household_id', householdId).maybeSingle();
  if (current?.data?.days) {
    const merged = mergeDays(getState().days, current.data.days);
    if (JSON.stringify(merged) !== JSON.stringify(getState().days)) replaceState({ ...getState(), days: merged });
  }
  const s = getState();
  const { error } = await c.from(TABLE).upsert({
    household_id: householdId,
    data: { ...s, _device: deviceId },
    updated_by: authUser()?.id || null,
    updated_at: new Date(s.updatedAt || Date.now()).toISOString(),
  });
  if (error) setStatus('error', `Not saved yet — will retry: ${error.message}`);
  else { setDirty(false); setStatus('on', 'Synced with your household'); }
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
  // Another member's data is landing on this device: the old anonymous
  // shared-key channel must never carry it. Writes by this same account
  // (e.g. the user's other phone) are their own data and do not suspend it.
  if (authUser()?.id && row.updated_by !== authUser().id) suspendLegacyPlanSync();
  const { _device, ...rest } = data;
  const local = getState();
  if ((data.updatedAt || 0) > (local.updatedAt || 0)) {
    // Newer overall: take the remote plan/settings, keep each person's
    // newest food-log entries from both sides.
    replaceState({ ...rest, days: mergeDays(local.days, rest.days) });
  } else {
    // Older overall (we edited something else more recently): the top-level
    // timestamp must not hide newer per-person log entries in this row.
    const merged = mergeDays(local.days, rest.days);
    if (JSON.stringify(merged) === JSON.stringify(local.days || {})) return;
    replaceState({ ...local, days: merged });
  }
  setStatus('on', 'Synced — updated from your household');
}

// A device can be shared. When a DIFFERENT account signs in, the previous
// account's local state is stashed under that account's id and the pending-edit
// flags are cleared, so they can never be pushed into the new account's
// household or cloud. The keys that belong to the account rather than the
// device (the old channel's connection details, its suspension flag, both
// layers' pending-edit flags) are stashed with it: the next account can never
// read or push through them. The stash is device-local, keyed by account, and
// is restored only when that same account signs back in. Anonymous local data
// on a first sign-in (no previous account) keeps the old behavior: preserved.
const ACCOUNT_KEYS = ['twoplates.sync.v1', 'twoplates.legacy-suspended.v1', 'twoplates.dirty.v1', DIRTY_KEY];
export async function partitionStateForUser(u) {
  if (!u) return; // sign-out leaves local state alone; the last-user marker persists
  let last = null;
  try { last = localStorage.getItem(LAST_USER_KEY); } catch { /* ignore */ }
  if (last && last !== u.id) {
    const stashOut = { state: getState(), keys: {} };
    try {
      for (const k of ACCOUNT_KEYS) stashOut.keys[k] = localStorage.getItem(k);
      localStorage.setItem(STASH_PREFIX + last, JSON.stringify(stashOut));
    } catch { /* ignore */ }
    // Tear the old channel down before wiping its keys: its realtime listener
    // must not apply the previous account's rows into the new account's state.
    await legacyDisconnect();
    for (const k of ACCOUNT_KEYS) { try { localStorage.removeItem(k); } catch { /* ignore */ } }
    replaceState({ ...defaultState(), updatedAt: 0 });
    let stash = null;
    try { stash = localStorage.getItem(STASH_PREFIX + u.id); } catch { /* ignore */ }
    if (stash) {
      try {
        const parsed = JSON.parse(stash);
        const s = parsed?.state ?? parsed; // tolerate bare-state stashes from earlier builds
        if (s && typeof s === 'object' && Array.isArray(s.people)) replaceState(s);
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
export async function connectHousehold(hid, { join = false } = {}) {
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
    if (!data?.data) await push(); // brand-new household: seed it with this device's plan
    else if (join) {
      // Joining takes the household's plan. This device's personal plan and
      // food log are NOT merged in: pre-join history is private and stays
      // only in the on-device backup, restorable after leaving. An earlier
      // unrestored backup is never overwritten.
      try {
        if (!localStorage.getItem(prejoinKey())) localStorage.setItem(prejoinKey(), JSON.stringify(getState()));
      } catch { /* ignore */ }
      suspendLegacyPlanSync(); // the adopted plan belongs to the household, not to this device's old channel
      const { _device, ...rest } = data.data;
      replaceState(rest);
      setDirty(false);
    } else if (isDirty()) await push();
    else applyRemote({ data: { ...data.data, _device: 'remote' }, updated_by: data.updated_by });
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
    addSyncHook(onLocalChange);
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
    if (!u) { await disconnectHousehold(); return; }
    await partitionStateForUser(u);
    const hid = await resolveMyHousehold();
    if (!hid) return;
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
