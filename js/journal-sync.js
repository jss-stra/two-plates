// Journal sync: uploads the on-device usage journal to the owner's own
// Supabase project, but only while signed in with Google and only while the
// journal is switched on. Row-level security on the usage_events table
// restricts every row to its owner. When signed out, offline, or before the
// table exists, events simply stay on this phone and upload next time.
// Uploads are idempotent: each event carries a stable client_id and the
// server ignores duplicates, so a retry after a lost response never
// double-counts.
import { authClient, authUser, onAuth } from './auth.js';
import { journalEvents, journalEnabled } from './journal.js';
import { FIXTURE } from './fixture.js';

const MARK_KEY = 'twoplates.journal.uploaded';
const highWater = () => { try { return Number(localStorage.getItem(MARK_KEY)) || 0; } catch { return 0; } };
const setHighWater = (v) => { try { localStorage.setItem(MARK_KEY, String(v)); } catch { /* ignore */ } };

let uploading = false;
export async function syncJournal() {
  if (FIXTURE) return; // fixture builds never write to the network
  const client = authClient();
  if (!client || !authUser() || !journalEnabled() || uploading) return;
  uploading = true;
  try {
    const batch = journalEvents(highWater() + 1).slice(0, 500);
    if (!batch.length) return;
    const rows = batch.map((e) => {
      const { id, ts, k, ...detail } = e;
      return { client_id: id, ts: new Date(ts).toISOString(), kind: k, detail };
    });
    // ignoreDuplicates: a retried batch after a lost response is a no-op.
    const { error } = await client.from('usage_events').upsert(rows, { onConflict: 'user_id,client_id', ignoreDuplicates: true });
    // Any error (offline, table not created yet, signed out mid-flight) keeps
    // the events local; the high-water mark only moves on success.
    if (!error) setHighWater(batch[batch.length - 1].ts);
  } catch { /* stay local */ } finally { uploading = false; }
}

export function startJournalSync() {
  if (FIXTURE) return;
  onAuth((u) => { if (u) syncJournal(); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') syncJournal(); });
}
