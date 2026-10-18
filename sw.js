// Keeps Night Spider working offline. Bump the version to ship a change.
const CACHE='night-spider-v1';
const FILES=['./','index.html','manifest.json','icon-192.png','icon-512.png',
 'fonts/crimson-pro-latin-600-normal.woff2','fonts/crimson-pro-latin-700-normal.woff2',
 'fonts/karla-latin-500-normal.woff2','fonts/karla-latin-600-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))});
