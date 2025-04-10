const cacheName = 'pc-basilicata-v1';
const staticAssets = [
  './',
  './index.html',
  './style.css',
  './SALA CONTROLLO.png',
  './terremoto.html',
  './idrogeologico.html',
  './incendi.html',
  './piani.html',
  './bollettini.html',
  './manifest.json',
  // Aggiungi qui tutti gli altri asset statici del tuo sito (immagini, script, ecc.)
];

self.addEventListener('install', async () => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(req));
  } else {
    event.respondWith(networkFirst(req));
  }
});

async function cacheFirst(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}

async function networkFirst(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cachedResponse = await caches.match(req);
    return cachedResponse;
  }
}
