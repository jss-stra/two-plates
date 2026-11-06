// Web push: subscribe this phone for water reminders that arrive even when the
// app is closed. Subscriptions live in the household's Supabase project; the
// scheduled sender (supabase/functions/water-reminders) does the rest.
// The public VAPID key pairs with a private key held only by that function.
import { getConfig } from './sync.js';

const VAPID_PUBLIC = 'BPSHtamWEf4YZZrsodo23o3S6-vy4D7ZgSZt5Siyo73cldPckKmJJ_7A5ITc0ycQYcsJsFZJJEKDRVAfOPsP7xM';
const TABLE = 'push_subscriptions';

const b64ToBytes = (b64) => Uint8Array.from(atob(b64.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

export async function pushSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

export async function pushStatus() {
  if (!(await pushSupported())) return 'unsupported';
  if (Notification.permission === 'denied') return 'blocked';
  try {
    const reg = await navigator.serviceWorker.ready;
    return (await reg.pushManager.getSubscription()) ? 'on' : 'off';
  } catch { return 'off'; }
}

async function deleteRow(cfg, id) {
  await fetch(`${cfg.url.trim()}/rest/v1/rpc/delete_push_subscription`, {
    method: 'POST',
    headers: { apikey: cfg.key.trim(), Authorization: `Bearer ${cfg.key.trim()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_id: id }),
  }).catch(() => {});
}

export async function enablePush(personIdx) {
  const cfg = getConfig();
  if (!cfg?.url || !cfg?.key || !cfg?.household) throw new Error('Set up Sync between phones first - reminders are sent through your household');
  if (!(await pushSupported())) throw new Error('This browser can\'t do push - on iPhone, install the app first (Share → Add to Home Screen)');
  const perm = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
  if (perm !== 'granted') throw new Error('Notifications are blocked for this app');
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToBytes(VAPID_PUBLIC) });
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Australia/Sydney';
  const base = `${cfg.url.trim()}/rest/v1/${TABLE}`;
  const headers = { apikey: cfg.key.trim(), Authorization: `Bearer ${cfg.key.trim()}`, 'Content-Type': 'application/json' };
  const id = `${cfg.household}:${personIdx}`;
  await deleteRow(cfg, id);
  const res = await fetch(base, {
    method: 'POST',
    headers,
    body: JSON.stringify({ id, household: cfg.household, person: personIdx, subscription: sub.toJSON(), tz }),
  });
  if (!res.ok) {
    await sub.unsubscribe().catch(() => {});
    throw new Error(`Couldn't save this phone (${res.status})`);
  }
}

export async function disablePush(personIdx) {
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) await sub.unsubscribe();
  } catch { /* ignore */ }
  const cfg = getConfig();
  if (cfg?.url && cfg?.key && cfg?.household) {
    await deleteRow(cfg, `${cfg.household}:${personIdx}`);
  }
}
