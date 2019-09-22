//Service Worker responsible for most PWA stuff

//Update cache name every update
const staticCacheName = 'site-static-v9'
const dynamicCacheName = 'site-dynamic-v9'
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/populatePage.js',
    '/js/populatePageDB.js',
    '/itemDb.js',
    '/css/listStyle.css',
    '/css/mainStyle.css',
    '/css/nes.css',
    '/pages/bosses.html',
    '/pages/characters.html',
    '/pages/environments.html',
    '/pages/items.html',
    '/pages/monsters.html',
    '/pages/pickups.html',
    '/pages/stats.html',
    'https://fonts.googleapis.com/css?family=Press+Start+2P',
    '/img/home.png',
    '/pages/fallback.html'
];

// cache size restriction function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
};

// Install service worker listener
self.addEventListener('install', (evt) =>{
    console.log('Service worker has been installed');
    evt.waitUntil(
        //Cache every 'assets' request
        caches.open(staticCacheName)
        .then(cache => {
            console.log('Caching shell assets');
            cache.addAll(assets);
        })
        .catch(() => {
            console.log('Unable to cache assets');
        })
    );


});

// Activate service worker listener
self.addEventListener('activate', (evt) => {
    // console.log('Service worked has been activated');
    evt.waitUntil(
        caches.keys()
        .then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))    
            )
        })
        .catch(() => {
            console.log("Unable to delete old cache");
        })
    );
});

// Fetch event listener
self.addEventListener('fetch', (evt) => {
    // cache everything except firestore cuz we have indexdb
    if(evt.request.url.indexOf('firestore.googleapis.com') === -1 && evt.request.url.indexOf('bindingofisaacre_gamepedia') === -1){
        evt.respondWith(
            caches.match(evt.request)
                .then(cacheRes => {
                    return cacheRes || fetch(evt.request).then(fetchRes => {
                        return caches.open(dynamicCacheName).then(cache => {
                            cache.put(evt.request.url, fetchRes.clone());
                            // limitCacheSize(dynamicCacheName, 15);
                            return fetchRes;
                        });
                    });
                }).catch(() => { //fallback html page
                    if(evt.request.url.indexOf('.html') > -1){
                        return caches.match('/pages/fallback.html')
                    }
                })
        );
    }

});