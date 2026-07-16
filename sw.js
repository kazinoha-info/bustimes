const CACHE_NAME = 'bustime-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// インストール時にファイルをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// オフライン時はキャッシュから、オンライン時はネットワークから取得
self.addEventListener('fetch', (event) => {
  // Firebaseや天気APIのリアルタイムリクエストはキャッシュから除外する
  if (event.request.url.includes('firebase') || event.request.url.includes('open-meteo')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
