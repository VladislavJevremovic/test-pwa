// Minimal offline-first service worker for GitHub Pages
const CACHE_VERSION = 'v1.0.20250815070732';
const CACHE_NAME = `pwa-cache-${CACHE_VERSION}`;

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon-180.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('pwa-cache-') && k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_FOR_UPDATE') {
    self.registration.update();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Network-first for HTML, cache-first for others
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(res => res || caches.match('./index.html')))
    );
  } else {
    event.respondWith(
      caches.match(req).then((res) => res || fetch(req).then((net) => {
        const copy = net.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return net;
      }))
    );
  }
});
