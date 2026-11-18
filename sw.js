'use strict';
const CACHE='gps-z7-shell-v054';
const CORE=['./index.html','./style.css','./app.js','./auth.js','./install-share.js','./config.js','./manifest.webmanifest'];
const OPTIONAL=['./icons/icon-192.png','./icons/icon-512.png','./share-gpsz7.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(CORE);await Promise.all(OPTIONAL.map(x=>c.add(x).catch(()=>{})));await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('gps-z7-shell-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin)return;if(req.mode==='navigate'){event.respondWith(fetch(req).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy)).catch(()=>{})}return r}).catch(async()=>await caches.match('./index.html')||Response.error()));return}event.respondWith(caches.match(req,{ignoreSearch:true}).then(cached=>cached||fetch(req).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{})}return r})));});
