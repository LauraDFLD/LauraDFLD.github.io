var cacheName = 'weatherPWA-v-1-1';
var filesToCache = [
'/',
'/index.html',
'/scripts/app.js',
'/styles/inline.css',
'/images/clear.png',
'/images/ic_refresh_white_24px.svg'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
console.log('[ServiceWorker] Activate');
e.waitUntil(
caches.keys().then(function(keyList) {
  return Promise.all(keyList.map(function(key) {
    if (key !== cacheName) {
      console.log('[ServiceWorker] Removing old cache', key);
      return caches.delete(key);
    }
  }));
})
);
return self.clients.claim();
});