const V="hsc-v4",SHELL=["./","index.html","manifest.json","icon-192.png","icon-512.png"],
EXTRA=["https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js","https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"];
const HOME=new URL("./",self.location).pathname;
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(SHELL);await Promise.all(EXTRA.map(u=>c.add(new Request(u,{mode:"no-cors"})).catch(()=>{})))}).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const save=(r,res)=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res};
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.hostname.startsWith("generativelanguage"))return;
if(r.mode==="navigate"&&(u.pathname===HOME||u.pathname===HOME+"index.html")){
e.respondWith(caches.match("index.html").then(hit=>{const net=fetch("index.html").then(res=>save("index.html",res)).catch(()=>hit);return hit||net||caches.match("./")}));return}
e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{const net=fetch(r).then(res=>save(r,res)).catch(()=>hit);return hit||net}))});
