// Journal sync: uploads the on-device usage journal to the owner's own
// Supabase project, but only while signed in with Google. Row-level security
// on the usage_events table restricts every row to its owner. When signed
// out, offline, or before the table exists, events simply stay on this phone
// and upload next time.
import { authClient, authUser, onAuth } from './auth.js';
import { journalEvents } from './journal.js';

const MARK_KEY = 'twoplates.journal.uploaded';
const highWater = () => { try { return Number(localStorage.getItem(MARK_KEY)) || 0; } catch { return 0; } };
const setHighWater = (v) => { try { localStorage.setItem(MARK_KEY, String(v)); } catch { /* ignore */ } };

let uploading = false;
export async function syncJournal() {
  const client = authClient();
  if (!client || !authUser() || uploading) return;
  uploading = true;
  try {
    const batch = journalEvents(highWater() + 1).slice(0, 500);
    if (!batch.length) return;
    const rows = batch.map((e) => {
      const { ts, k, ...detail } = e;
      return { ts: new Date(ts).toISOString(), kind: k, detail };
    });
    const { error } = await client.from('usage_events').insert(rows);
    // Any error (offline, table not created yet, signed out mid-flight) keeps
    // the events local; the high-water mark only moves on success.
    if (!error) setHighWater(batch[batch.length - 1].ts);
  } catch { /* stay local */ } finally { uploading = false; }
}

export function startJournalSync() {
  onAuth((u) => { if (u) syncJournal(); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') syncJournal(); });
}
