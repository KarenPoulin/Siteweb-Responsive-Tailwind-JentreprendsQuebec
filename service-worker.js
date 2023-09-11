 //Update cache names any time any of the cached files change.
 const CACHE_NAME = 'static-cache-v19';

  //Add list of files to cache here.
  const FILES_TO_CACHE = [
    'offline.html',
    'style/css/normalize.css',
    'style/css/style.css',
    'scripts/install.js',
    'scripts/validateForm.js',
    'scripts/validateNewsletterForm.js',
    'images/icons/maskable_icon_x128.png',
    'images/icons/maskable_icon_x144.png',
    'images/icons/maskable_icon_x192.png',
    'images/icons/maskable_icon_x384.png',
    'images/icons/maskable_icon_x512.png'
];

self.addEventListener("install", (evt) => {
	console.log("[ServiceWorker] Install");
	// Precache static resources here.

	evt.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log("[ServiceWorker] Pre-caching offline page");
			return cache.addAll(FILES_TO_CACHE);
		})
	);

	self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
	console.log("[ServiceWorker] Activate");
	//Remove previous cached data from disk.

	evt.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key !== CACHE_NAME) {
						console.log("[ServiceWorker] Removing old cache", key);
						return caches.delete(key);
					}
				})
			);
		})
	);

	self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
	console.log("[ServiceWorker] Fetch", evt.request.url);
	//Add fetch event handler here.
	if (evt.request.mode !== "navigate") {
		// Not a page navigation, bail.
		return;
	}
	evt.respondWith(
		fetch(evt.request).catch(() => {
			return caches.open(CACHE_NAME).then((cache) => {
				return cache.match("offline.html");
			});
		})
	);
});

/* self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    //Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .then((response) => {
                // Handle successful fetch
                return response;
            })
            .catch((error) => {
                console.error('Fetch failed:', error);
                // Serve the offline page from cache here
                return caches.match('/TP3_PoulinLarochelleKaren/offline.html');
            })
    );
}); */

/* self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
      event.respondWith(
        // Handle navigation preload request here
        fetch(event.request)
          .then((response) => {
            // Process the response if needed
            return response;
          })
          .catch(() => {
            // Handle errors if necessary
            return caches.match('/offline.html'); // Respond with an offline page from cache
          })
      );
      // Use waitUntil to ensure the promise settles before the event finishes
      event.waitUntil(
        (async () => {
          const preloadResponse = await event.preloadResponse;
          // Do something with preloadResponse if needed
        })()
      );
    }
  }); */