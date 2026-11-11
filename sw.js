// Offline support with version-consistent assets.
// Install fetches the app shell through a version query (?v=two-plates-vNN).
// The query is a fresh cache key at both the browser HTTP cache and the Pages
// edge, so a deploy can never pin a stale asset under the new version name:
// every asset in one CACHE comes from one install pass keyed to that version.
// Runtime requests are served cache-first from THIS version's cache, matched
// ignoring the query because module imports carry no query. Navigations stay
// network-first (fall back to the cached shell offline).
const CACHE = 'two-plates-v25';
const SHELL = [
  './', 'index.html', 'css/styles.css', 'manifest.webmanifest', 'icons/icon.svg',
  'js/home.js', 'js/occasions.js', 'js/grocery-ui.js', 'js/prep.js', 'data/prep-guides.js', 'js/app.js', 'js/data.js', 'js/state.js', 'js/planner.js', 'js/grocery.js', 'js/export.js', 'js/sync.js', 'js/log.js', 'js/receipts.js', 'js/menu.js', 'js/water.js', 'js/push.js', 'menu.html',
  'js/imported.js', 'data/imported/ratatouille.mjs',
  'js/auth.js', 'js/cookbook.js', 'js/cookbook-ui.js',
  'data/ingredients.js', 'data/recipes/indian.js', 'data/recipes/mexican.js', 'data/recipes/italian.js',
  'data/recipes/indo-chinese.js', 'data/recipes/thai.js', 'data/recipes/explore-asian.js',
  'data/recipes/grill-wraps.js', 'data/regulars.js', 'data/shopping-habits.js',
];

self.addEventListener('install', (e) => {
  const versioned = SHELL.map((u) => `${u}?v=${CACHE}`);
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(versioned)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Water reminders sent by the scheduled Supabase job.
self.addEventListener('push', (e) => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch { /* no payload */ }
  e.waitUntil(self.registration.showNotification(data.title || 'Two Plates', {
    body: data.body || 'Time for some water',
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    data: { url: './#today' },
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = e.notification.data?.url || './#today';
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) { if ('focus' in c) { c.navigate(url); return c.focus(); } }
    return clients.openWindow(url);
  }));
});

async function cachedShell(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request, { ignoreSearch: true });
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) cache.put(request, res.clone());
  return res;
}

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.hostname.endsWith('supabase.co')) return;
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(async () => {
        const cache = await caches.open(CACHE);
        return (await cache.match(e.request, { ignoreSearch: true })) || cache.match('./', { ignoreSearch: true });
      }),
    );
    return;
  }
  if (url.origin === location.origin || url.hostname === 'cdn.jsdelivr.net') {
    e.respondWith(cachedShell(e.request));
  }
});
