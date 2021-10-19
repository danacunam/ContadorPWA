const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js"
]
 
const CACHE_NAME = "v1_cache_contador_react"  // se nombra por las versiones del SW
//self es lo mismo que this
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_ELEMENTS).then( ()=> {
                self.skipWaiting()
            }).catch(error => console.log(error))
        })
    )
})

self.addEventListener('activate', (e) => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then((cachesNames) => {
            return Promise.all(cachesNames.map(cachesName => {
                return cacheWhitelist.indexOf(cachesName) === -1 && caches.delete(cachesName)  
            }))
        }).then(() => self.clients.claim())
       )
    
})


self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            if (res){
                return res;
            }else{
              return fetch(e.request);
            }
        }) // si la respuesta existe, la devuelve, si no. la obtiende internet
    )
    
})
