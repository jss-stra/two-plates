// Live sync between phones through one row in a Supabase table.
// Config (project URL, anon key, household code) lives only on each device.
import { getState, setSyncHook, replaceState } from './state.js';

const CONFIG_KEY = 'twoplates.sync.v1';
// Set while this phone has changes the shared plan hasn't received yet. Survives the
// app being closed or restarted by iOS (e.g. while the share sheet is open).
const DIRTY_KEY = 'twoplates.dirty.v1';
const SUPABASE = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm';
const TABLE = 'meal_state';
const deviceId = Math.random().toString(36).slice(2);

let client = null;
let channel = null;
let pushTimer = null;
let status = { state: 'off', message: 'Not connected — this phone only' };
const statusListeners = new Set();

export const onSyncStatus = (fn) => statusListeners.add(fn);
// The connected Supabase client (null when this phone isn't synced), for receipts.
export const syncClient = () => client;
export const syncStatus = () => status;
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
// Food-log entries are per person per day; keep whichever side edited each one last,
// so two people logging the same evening don't overwrite each other.
function mergeDays(local = {}, remote = {}) {
  const out = structuredClone(remote || {});
  for (const [day, people] of Object.entries(local || {})) {
    out[day] ||= {};
    for (const [p, e] of Object.entries(people)) {
      if (!out[day][p] || (e.at || 0) > (out[day][p].at || 0)) out[day][p] = e;
    }
  }
  return out;
}

function setDirty(v) {
  try { v ? localStorage.setItem(DIRTY_KEY, '1') : localStorage.removeItem(DIRTY_KEY); } catch { /* ignore */ }
}

export function newHouseholdCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return 'home-' + [...bytes].map((b) => b.toString(36).padStart(2, '0')).join('').slice(0, 18);
}

async function push() {
  if (!client) return;
  const cfg = getConfig();
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
  if (!getConfig()) return;
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
  if ((data.updatedAt || 0) <= (getState().updatedAt || 0)) return;
  const { _device, ...rest } = data;
  replaceState({ ...rest, days: mergeDays(getState().days, rest.days) });
  setStatus('on', 'Synced — updated from the other phone');
}

// join: true when you press Connect in Settings — this phone takes the household's
// plan. On normal start-up, unsaved changes on this phone win instead of being lost.
export async function connect(cfg, { join = false } = {}) {
  await disconnect({ keepConfig: true });
  if (!cfg?.url || !cfg?.key || !cfg?.household) return;
  saveConfig(cfg);
  setStatus('saving', 'Connecting…');
  try {
    const { createClient } = await import(SUPABASE);
    client = createClient(cfg.url.trim(), cfg.key.trim());
    const { data, error } = await client.from(TABLE).select('data').eq('id', cfg.household).maybeSingle();
    if (error) throw error;
    if (!data?.data) await push(); // brand-new household: seed it with this phone's plan
    else if (join) {
      const { _device, ...rest } = data.data;
      replaceState(rest);
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
}
