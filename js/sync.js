// Live sync between phones through one row in a Supabase table.
// Config (project URL, anon key, household code) lives only on each device.
import { getState, setSyncHook, replaceState } from './state.js';
import { FIXTURE } from './fixture.js';
import { isTombstone, mergeDays } from './household-sync-core.js';

const CONFIG_KEY = 'twoplates.sync.v1';
// Set while this phone has changes the shared plan hasn't received yet. Survives the
// app being closed or restarted by iOS (e.g. while the share sheet is open).
// Owned by this legacy layer only. The account household layer keeps its own flag
// ('twoplates.household-dirty.v1'): one flag per layer, so a successful push here
// can never discard the other layer's pending edit.
const DIRTY_KEY = 'twoplates.dirty.v1';
const SUPABASE = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm';
const TABLE = 'meal_state';
const deviceId = Math.random().toString(36).slice(2);

let client = null;
let channel = null;
let pushTimer = null;
// Set when the household moved to account sync: the plan row is tombstoned and
// this layer stops pushing the plan, while the client stays up for receipts.
let migrated = false;
let status = { state: 'off', message: 'Not connected — this phone only' };
const statusListeners = new Set();

export const onSyncStatus = (fn) => statusListeners.add(fn);
// The connected Supabase client (null when this phone isn't synced), for receipts.
export const syncClient = () => client;
export const syncStatus = () => status;
export const syncMoved = () => migrated;
// Called by household-sync after a successful migration from this device.
export function markMoved() {
  migrated = true;
  setStatus('moved', 'Sync moved to your account — receipts still use the old connection');
}
function setStatus(state, message) {
  status = { state, message };
  statusListeners.forEach((fn) => fn(status));
}

export function getConfig() {
  try { return JSON.parse(localStorage.getItem(CONFIG_KEY)) || null; } catch { return null; }
}
function saveConfig(cfg) {
  try { cfg ? localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg)) : localStorage.removeItem(CONFIG_KEY); } catch { /* ignore */ }
}

const isDirty = () => { try { return localStorage.getItem(DIRTY_KEY) === '1'; } catch { return false; } };
function setDirty(v) {
  try { v ? localStorage.setItem(DIRTY_KEY, '1') : localStorage.removeItem(DIRTY_KEY); } catch { /* ignore */ }
}

// Set when this device's local plan came from an account household (joining one,
// or merging another member's changes). While set, this layer never pushes the
// plan or food log to the old shared-key channel, because they may belong to
// other people. Receipts are unaffected: they use the client directly, not push().
const SUSPEND_KEY = 'twoplates.legacy-suspended.v1';
export const legacyPlanSyncSuspended = () => { try { return localStorage.getItem(SUSPEND_KEY) === '1'; } catch { return false; } };
// Local state is (or is about to become) household-derived. Any pending push is
// dropped too: it must not carry other people's data onto the old channel.
export function suspendLegacyPlanSync() {
  try { localStorage.setItem(SUSPEND_KEY, '1'); } catch { /* ignore */ }
  setDirty(false);
}
// Local state is personal again (the pre-join plan was restored on this device,
// or this device deliberately re-adopted the old channel's plan).
export function resumeLegacyPlanSync() {
  try { localStorage.removeItem(SUSPEND_KEY); } catch { /* ignore */ }
}

export function newHouseholdCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return 'home-' + [...bytes].map((b) => b.toString(36).padStart(2, '0')).join('').slice(0, 18);
}

async function push() {
  if (!client || migrated || legacyPlanSyncSuspended()) return;
  const cfg = getConfig();
  if (!cfg) return;
  // Pull in the other phone's newest log entries before overwriting the shared copy.
  const { data: current } = await client.from(TABLE).select('data').eq('id', cfg.household).maybeSingle();
  if (current?.data?.days) {
    const merged = mergeDays(getState().days, current.data.days);
    if (JSON.stringify(merged) !== JSON.stringify(getState().days)) replaceState({ ...getState(), days: merged });
  }
  const s = getState();
  const { error } = await client.from(TABLE).upsert({
    id: cfg.household, data: { ...s, _device: deviceId }, updated_at: new Date(s.updatedAt || Date.now()).toISOString(),
  });
  if (error) setStatus('error', `Not saved yet — will retry: ${error.message}`);
  else { setDirty(false); setStatus('on', 'Synced'); }
}

function schedulePush() {
  clearTimeout(pushTimer);
  setStatus('saving', 'Saving…');
  pushTimer = setTimeout(() => { pushTimer = null; push(); }, 700);
}

// Every local change is remembered as unsaved until the shared plan has it.
function onLocalChange() {
  if (!getConfig() || legacyPlanSyncSuspended()) return;
  setDirty(true);
  if (client) schedulePush();
  else setStatus('saving', 'Not saved yet — will sync when online');
}

// Save right now instead of waiting (before sharing, when the app is hidden, etc.).
export async function flushSync() {
  clearTimeout(pushTimer);
  pushTimer = null;
  if (client && isDirty()) await push();
}

function applyRemote(row) {
  const data = row?.data;
  if (!data || data._device === deviceId) return;
  if (isTombstone(data)) { markMoved(); return; }
  if ((data.updatedAt || 0) <= (getState().updatedAt || 0)) return;
  const { _device, ...rest } = data;
  replaceState({ ...rest, days: mergeDays(getState().days, rest.days) });
  setStatus('on', 'Synced — updated from the other phone');
}

// join: true when you press Connect in Settings — this phone takes the household's
// plan. On normal start-up, unsaved changes on this phone win instead of being lost.
export async function connect(cfg, { join = false } = {}) {
  if (FIXTURE) return; // fixture builds never touch the network
  await disconnect({ keepConfig: true });
  if (!cfg?.url || !cfg?.key || !cfg?.household) return;
  saveConfig(cfg);
  setStatus('saving', 'Connecting…');
  try {
    const { createClient } = await import(SUPABASE);
    // Anonymous shared-key channel: never pick up this device's signed-in
    // session. The default storage key is shared with the account client, so
    // a signed-in device would attach the user's JWT - and meal_state's
    // policy only allows the anon role, silently denying every read/write
    // (including receipts).
    client = createClient(cfg.url.trim(), cfg.key.trim(), {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false, storageKey: 'twoplates.legacy-noauth' },
    });
    const { data, error } = await client.from(TABLE).select('data').eq('id', cfg.household).maybeSingle();
    if (error) throw error;
    if (isTombstone(data?.data)) {
      // The household moved to account sync: keep the connection for receipts,
      // leave this device's local plan untouched, and stop pushing it back.
      markMoved();
    }
    else if (!data?.data) await push(); // brand-new household: seed it with this phone's plan
    else if (join) {
      const { _device, ...rest } = data.data;
      replaceState(rest);
      resumeLegacyPlanSync(); // this device deliberately re-adopted the old channel's plan
      setDirty(false);
    } else if (isDirty()) await push();
    else applyRemote({ data: { ...data.data, _device: 'remote' } });
    channel = client.channel(`${TABLE}:${cfg.household}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: TABLE, filter: `id=eq.${cfg.household}` },
        (payload) => applyRemote(payload.new))
      .subscribe((s) => { if (s === 'CHANNEL_ERROR') setStatus('error', 'Live updates unavailable — will still save'); });
    setSyncHook(onLocalChange);
    if (!isDirty()) setStatus('on', 'Synced');
  } catch (e) {
    client = null;
    setStatus('error', `Couldn't connect: ${e.message || e}`);
  }
}

export async function disconnect({ keepConfig = false } = {}) {
  if (channel) await client?.removeChannel(channel);
  channel = null;
  client = null;
  if (!keepConfig) { saveConfig(null); setDirty(false); setStatus('off', 'Not connected — this phone only'); }
}

export function startSync() {
  if (FIXTURE) return; // fixture builds never touch the network
  setSyncHook(onLocalChange);
  const cfg = getConfig();
  if (cfg) connect(cfg);
  // Save before iOS pauses the app; catch up when it comes back.
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'hidden') { flushSync(); return; }
    if (!client) return;
    if (isDirty()) { await push(); return; }
    const { data } = await client.from(TABLE).select('data').eq('id', getConfig().household).maybeSingle();
    if (data) applyRemote({ data: { ...data.data, _device: 'remote' } });
  });
  window.addEventListener('pagehide', () => { flushSync(); });
  // Connectivity restored: flush pending edits immediately.
  window.addEventListener('online', () => { flushSync(); });
}
