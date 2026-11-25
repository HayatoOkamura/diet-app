// 減量プラン手帳 — オフラインでも開けるようにするための仕組み
// アプリを更新したときは、下の数字を1つ増やすと確実に新しい版に切り替わります
const CACHE = 'gp3-v1';
const SHELL = ['./', './index.html', './firebase-config.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
const FIREBASE_SDK = 'https://www.gstatic.com/firebasejs/';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  // Firebaseのプログラム本体（バージョン固定）は、一度読み込んだら端末に保存して使う
  if (r.url.startsWith(FIREBASE_SDK)) {
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => {
      if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); }
      return res;
    })));
    return;
  }
  // 同じサイトのファイル：まずネットから取り、つながらないときは保存しておいた版を出す
  if (new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r).then(res => {
      if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); }
      return res;
    }).catch(() => caches.match(r).then(m => m || caches.match('./index.html')))
  );
});
