// Account-based household sync: each household's plan lives in one
// household_state row that only household members can read or write
// (row-level security on the server decides; the signed-in user's session
// proves membership). This replaces the shared-key sync for migrated
// households. The legacy sync keeps running alongside it for receipts until
// the old channel is retired.
import { getState, addSyncHook, replaceState } from './state.js';
import { authClient, authUser, authReady, onAuth } from './auth.js';
import { mergeDays } from './household-sync-core.js';

const TABLE = 'household_state';
const DIRTY_KEY = 'twoplates.dirty.v1';
const PREJOIN_KEY = 'twoplates.prejoin-backup.v1'; // shared with legacy sync: one flag, whichever layer pushes clears it
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
  try { return !!localStorage.getItem(PREJOIN_KEY); } catch { return false; }
}
// Restores the personal plan this device had before joining a household.
// The shared plan copy stays on the server with the household; only this
// device's local state changes. Returns true when a backup was restored.
export function restorePrejoinBackup() {
  let raw = null;
  try { raw = localStorage.getItem(PREJOIN_KEY); } catch { /* ignore */ }
  if (!raw) return false;
  try {
    const backup = JSON.parse(raw);
    if (!backup || typeof backup !== 'object' || !Array.isArray(backup.people)) return false;
    replaceState(backup); // replaceState does not fire sync hooks: nothing is pushed
    setDirty(false); // no pending push may carry the restored private plan anywhere
    localStorage.removeItem(PREJOIN_KEY);
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

export async function connectHousehold(hid, { join = false } = {}) {
  await disconnectHousehold({ keepHousehold: true });
  const c = authClient();
  if (!c || !hid) return;
  householdId = hid;
  setStatus('saving', 'Connecting…');
  try {
    const { data, error } = await c.from(TABLE).select('data').eq('household_id', hid).maybeSingle();
    if (error) throw error;
    if (!data?.data) await push(); // brand-new household: seed it with this device's plan
    else if (join) {
      // Joining takes the household's plan. This device's personal plan and
      // food log are NOT merged in: pre-join history is private and stays
      // only in the on-device backup, restorable after leaving. An earlier
      // unrestored backup is never overwritten.
      try {
        if (!localStorage.getItem(PREJOIN_KEY)) localStorage.setItem(PREJOIN_KEY, JSON.stringify(getState()));
      } catch { /* ignore */ }
      const { _device, ...rest } = data.data;
      replaceState(rest);
      setDirty(false);
    } else if (isDirty()) await push();
    else applyRemote({ data: { ...data.data, _device: 'remote' } });
    channel = c.channel(`${TABLE}:${hid}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: TABLE, filter: `household_id=eq.${hid}` },
        (payload) => applyRemote(payload.new))
      .subscribe(async (s) => {
        if (s === 'CHANNEL_ERROR') setStatus('error', 'Live updates unavailable — will still save');
        if (s === 'SUBSCRIBED') {
          // Catch-up after a reconnect: live events that arrived while this
          // device was offline are never replayed, so pull the current row.
          if (isDirty()) { await push(); return; }
          const { data: cur } = await c.from(TABLE).select('data').eq('household_id', hid).maybeSingle();
          if (cur?.data) applyRemote({ data: { ...cur.data, _device: 'remote' } });
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
    const hid = await resolveMyHousehold();
    if (hid) await connectHousehold(hid);
  });
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'hidden') { flushHouseholdSync(); return; }
    const c = authClient();
    if (!c || !householdId) return;
    if (isDirty()) { await push(); return; }
    const { data } = await c.from(TABLE).select('data').eq('household_id', householdId).maybeSingle();
    if (data) applyRemote({ data: { ...data.data, _device: 'remote' } });
  });
  window.addEventListener('pagehide', () => { flushHouseholdSync(); });
}
