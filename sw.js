const CACHE_NAME = 'matek-kaland-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
  // Ha lesznek ikonjaid, azokat is írd ide: './icon-192.png', './icon-512.png'
];

// Telepítés és gyorsítótárazás
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Régi gyorsítótárak törlése frissítéskor
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Offline működés biztosítása (Cache First stratégia)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
