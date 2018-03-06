const CACH_KEY_NUMBER = 0;
const CACH_KEY_PREFETCH_PAGES = `prefetch-pages-${CACH_KEY_NUMBER}`;
const CACH_KEY_ASSETS = `assets-${CACH_KEY_NUMBER}`;

const assets = ['stylesheets/style.css'];

function prefetchPage(cache, event) {
  const req = new Request(event.data.path, { cache: 'no-cache' });
  return cache.match(req).then(res => {
    // 既にキャッシュされていたらフォールバックする
    if (res) return Promise.resolve();
    return cache.add(req);
  });
}

self.addEventListener('install', event => {
  console.log('installed');
  const promise = caches.open(CACH_KEY_ASSETS).then(cache => {
    cache.addAll(assets);
    return self.skipWaiting();
  });

  event.waitUntil(promise);
});

self.addEventListener('activate', event => {
  console.log('activated');
});

self.addEventListener('fetch', event => {
  console.log('fetched');
  const url = event.request.url;

  // ホワイトリストにないリクエストの場合はフォールバックする
  // if (!assets.some(file => url.includes(file))) {
  //   return;
  // }

  const fetching = caches.match(event.request).then(res => {
    if (res) {
      console.log(`Get "${res.url}" from cache`);
      return res;
    }

    return fetch(event.request);
  });

  event.respondWith(fetching);
});

self.addEventListener('message', event => {
  const command = event.data.command;
  let promise = Promise.resolve();

  console.log(command);

  if (command === 'delete') {
    promise = caches.delete(CACH_KEY_PREFETCH_PAGES);
  }

  if (command === 'prefetch') {
    promise = caches.open(CACH_KEY_PREFETCH_PAGES)
      .then(cache => prefetchPage(cache, event))
      .catch(error => { new Error(error) });
  }

  event.waitUntil(promise);
});