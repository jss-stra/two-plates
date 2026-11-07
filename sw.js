// Offline support: always try the network first (so updates show up straight away),
// fall back to the last cached copy when there's no connection.
const CACHE = 'two-plates-v15';
const SHELL = [
  './', 'index.html', 'css/styles.css', 'manifest.webmanifest', 'icons/icon.svg',
  'js/home.js', 'js/occasions.js', 'js/grocery-ui.js', 'js/prep.js', 'data/prep-guides.js', 'js/app.js', 'js/data.js', 'js/state.js', 'js/planner.js', 'js/grocery.js', 'js/export.js', 'js/sync.js', 'js/log.js', 'js/receipts.js', 'js/menu.js', 'js/water.js', 'js/push.js', 'menu.html',
  'data/ingredients.js', 'data/recipes/indian.js', 'data/recipes/mexican.js', 'data/recipes/italian.js',
  'data/recipes/indo-chinese.js', 'data/recipes/thai.js', 'data/recipes/explore-asian.js',
  'data/recipes/grill-wraps.js', 'data/regulars.js', 'data/shopping-habits.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
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

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.hostname.endsWith('supabase.co')) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok && (url.origin === location.origin || url.hostname === 'cdn.jsdelivr.net')) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request)),
  );
});
