// Reminder sender (water yes/no check-ins + evening beverage check-in). Triggered by a
// pg_cron job every 5 minutes with the household subscriptions that are due (all rules and dedupe run in SQL inside
// the database, so subscription endpoints are never exposed via the API).
// Secrets: VAPID_PRIVATE (+ VAPID_PUBLIC below), WATER_CRON_SECRET.
//
// Sends run in the background (EdgeRuntime.waitUntil) and the HTTP call returns
// at once: a cold start plus the push round-trip can exceed the database's HTTP
// timeout, and an abandoned call must not take the notification down with it.
// Per-send results are logged instead of returned when running in background.
import webpush from 'npm:web-push@3.6.7';

const VAPID_PUBLIC = 'BPSHtamWEf4YZZrsodo23o3S6-vy4D7ZgSZt5Siyo73cldPckKmJJ_7A5ITc0ycQYcsJsFZJJEKDRVAfOPsP7xM';

webpush.setVapidDetails('mailto:two-plates@example.com', VAPID_PUBLIC, Deno.env.get('VAPID_PRIVATE') ?? '');

Deno.serve(async (req) => {
  if (req.headers.get('x-water-secret') !== Deno.env.get('WATER_CRON_SECRET')) {
    return new Response('nope', { status: 401 });
  }
  const { due } = await req.json().catch(() => ({ due: [] }));
  const sendAll = async () => {
    const results = { sent: 0, gone: [] as string[], failed: 0 };
    for (const item of due ?? []) {
      try {
        await webpush.sendNotification(item.subscription, JSON.stringify({
          title: item.title || 'Two Plates',
          body: item.body || 'Time for some water',
          tag: item.tag,           // same-tag notifications replace, not stack
          kind: item.kind,         // 'water-checkin' lets the app record the answer
          slot: item.slot,         // local hour the check-in is for (9/12/15/18/21)
          person: item.person,
          actions: item.actions,   // Yes/No buttons where the platform shows them
        }));
        results.sent++;
      } catch (err) {
        const code = (err as { statusCode?: number })?.statusCode;
        if (code === 404 || code === 410) results.gone.push(item.id);
        else results.failed++;
        console.warn('water-reminders send error', item.id, code ?? String(err));
      }
    }
    console.log('water-reminders results', JSON.stringify(results));
    return results;
  };
  const edge = (globalThis as { EdgeRuntime?: { waitUntil?: (p: Promise<unknown>) => void } }).EdgeRuntime;
  if (edge?.waitUntil) {
    const work = sendAll();
    edge.waitUntil(work);
    return new Response(JSON.stringify({ queued: (due ?? []).length }), { headers: { 'Content-Type': 'application/json' } });
  }
  // No background runtime (local dev): send in-band so callers still get results.
  const results = await sendAll();
  return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
});
