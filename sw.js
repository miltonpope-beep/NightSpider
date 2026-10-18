// Keeps Night Spider working offline. Pages come from the network when it is
// available (so updates show up right away) and from the cache when it is not.
const CACHE='night-spider-v3';
const FILES=['./','index.html','manifest.json','icon-192.png','icon-512.png',
 'fonts/crimson-pro-latin-600-normal.woff2','fonts/crimson-pro-latin-700-normal.woff2',
 'fonts/karla-latin-500-normal.woff2','fonts/karla-latin-600-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{
    if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}
    return r;
  }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
});
