// Live sync between phones through one row in a Supabase table.
// Config (project URL, anon key, household code) lives only on each device.
import { getState, setSyncHook, replaceState } from './state.js';

const CONFIG_KEY = 'twoplates.sync.v1';
const SUPABASE = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm';
const TABLE = 'meal_state';
const deviceId = Math.random().toString(36).slice(2);

let client = null;
let channel = null;
let pushTimer = null;
let status = { state: 'off', message: 'Not connected — this phone only' };
const statusListeners = new Set();

export const onSyncStatus = (fn) => statusListeners.add(fn);
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

export function newHouseholdCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return 'home-' + [...bytes].map((b) => b.toString(36).padStart(2, '0')).join('').slice(0, 18);
}

async function push() {
  if (!client) return;
  const cfg = getConfig();
  const s = getState();
  const { error } = await client.from(TABLE).upsert({
    id: cfg.household, data: { ...s, _device: deviceId }, updated_at: new Date(s.updatedAt || Date.now()).toISOString(),
  });
  if (error) setStatus('error', `Sync failed: ${error.message}`);
  else setStatus('on', 'Synced');
}

function schedulePush() {
  clearTimeout(pushTimer);
  setStatus('saving', 'Saving…');
  pushTimer = setTimeout(push, 700);
}

function applyRemote(row) {
  const data = row?.data;
  if (!data || data._device === deviceId) return;
  if ((data.updatedAt || 0) <= (getState().updatedAt || 0)) return;
  const { _device, ...rest } = data;
  replaceState(rest);
  setStatus('on', 'Synced — updated from the other phone');
}

export async function connect(cfg) {
  await disconnect({ keepConfig: true });
  if (!cfg?.url || !cfg?.key || !cfg?.household) return;
  saveConfig(cfg);
  setStatus('saving', 'Connecting…');
  try {
    const { createClient } = await import(SUPABASE);
    client = createClient(cfg.url.trim(), cfg.key.trim());
    const { data, error } = await client.from(TABLE).select('data').eq('id', cfg.household).maybeSingle();
    if (error) throw error;
    // Newer copy wins; if the household is new, seed it with this phone's data.
    if (data?.data && (data.data.updatedAt || 0) > (getState().updatedAt || 0)) applyRemote({ data: { ...data.data, _device: 'remote' } });
    else await push();
    channel = client.channel(`${TABLE}:${cfg.household}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: TABLE, filter: `id=eq.${cfg.household}` },
        (payload) => applyRemote(payload.new))
      .subscribe((s) => { if (s === 'CHANNEL_ERROR') setStatus('error', 'Live updates unavailable — will still save'); });
    setSyncHook(schedulePush);
    setStatus('on', 'Synced');
  } catch (e) {
    client = null;
    setStatus('error', `Couldn't connect: ${e.message || e}`);
  }
}

export async function disconnect({ keepConfig = false } = {}) {
  setSyncHook(null);
  if (channel) await client?.removeChannel(channel);
  channel = null;
  client = null;
  if (!keepConfig) { saveConfig(null); setStatus('off', 'Not connected — this phone only'); }
}

export function startSync() {
  const cfg = getConfig();
  if (cfg) connect(cfg);
  // Catch up when the app comes back to the foreground.
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState !== 'visible' || !client) return;
    const { data } = await client.from(TABLE).select('data').eq('id', getConfig().household).maybeSingle();
    if (data) applyRemote({ data: { ...data.data, _device: 'remote' } });
  });
}
