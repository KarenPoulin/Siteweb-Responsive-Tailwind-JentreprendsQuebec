//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v6';

//Add list of files to cache here.
const FILES_TO_CACHE = [
    'offline.html',
    'styles/css/normalize.css',
    'styles/css/style.css',
    'scripts/validateForm.js',
    'scripts/validateNewsletterForm.js',
    'tailwind.config.js',
    'favicon2.png',
    'images/icons/maskable_icon_x128.png',
    'images/icons/maskable_icon_x144.png',
    'images/icons/maskable_icon_x192.png',
    'images/icons/maskable_icon_x384.png',
    'images/icons/maskable_icon_x512.png',
    'images/JQC_Logo_655x504-246x190-horizontal-blanc.png',
    'images/JQC_Logo_655x504-246x190-horizontal-couleur-text-white.png',
    'images/le-grand-chien-logo.png',
    'images/skypitch.jpeg',
    'images/test1.jpeg',
    'images/test2.jpeg'
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // Precache static resources here.
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');

    //Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});
self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    //Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                return cache.match('/KarenPoulin/TP3_PoulinLarochelleKaren/offline.html' );
            });
        })
    );
});