// Offline support: always try the network first (so updates show up straight away),
// fall back to the last cached copy when there's no connection.
const CACHE = 'two-plates-v7';
const SHELL = [
  './', 'index.html', 'css/styles.css', 'manifest.webmanifest', 'icons/icon.svg',
  'js/app.js', 'js/data.js', 'js/state.js', 'js/planner.js', 'js/grocery.js', 'js/export.js', 'js/sync.js',
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
