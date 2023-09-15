 //Update cache names any time any of the cached files change.
 const CACHE_NAME = 'static-cache-v41';

  //Add list of files to cache here.
  const FILES_TO_CACHE = [
    'offline.html',
    'a-propos.html',
    'confirmation.html',
    'devenir-partenaire.html',
    'evenements.html',
    'index.html',
    'style/css/normalize.css',
    'style/css/style.css',
    'scripts/install.js',
    'scripts/validateForm.js',
    'scripts/validateNewsletterForm.js',
    'images/icons/maskable_icon_x128.png',
    'images/icons/maskable_icon_x144.png',
    'images/icons/maskable_icon_x192.png',
    'images/icons/maskable_icon_x384.png',
    'images/icons/maskable_icon_x512.png',
    'images/partenaires/logo-partenaire-aventurex.png',
    'images/partenaires/logo-partenaire-blackwaretechnologies.png',
    'images/partenaires/logo-partenaire-encavale.png',
    'images/partenaires/logo-partenaire-entrepreunariatquebec.png',
    'images/partenaires/logo-partenaire-krow.png',
    'images/partenaires/logo-partenaire-lecerclelabvivant.png',
    'images/partenaires/logo-partenaire-legrandchien.png',
    'images/partenaires/logo-partenaire-lesfestifs.png',
    'images/partenaires/logo-partenaire-ora.png',
    'images/partenaires/logo-partenaire-vigi.png',
    'images/partenaires/logo-partenaire-villedequebeclaccentdamerique.png',
    'images/partenaires/logo-partenaire-yankeemedia.png',
    'images/JQC_Logo_655x504-246x190-horizontal-couleur-text-white.png',
    'images/jeff-doucet.jpg',
    'images/hero_devenir-partenaire.jpg',
    'images/hero_a-propos.jpg',
    'images/caroussel1.jpg',
    'images/caroussel2.jpg',
    'images/caroussel3.jpg',
    'images/caroussel4.jpg',
    'images/caroussel5.jpg',
    'images/evenement-gallery1.jpg',
    'images/evenement-gallery2.jpg',
    'images/evenement-gallery3.jpg',
    'images/evenement-gallery4.jpg',
    'images/evenement-gallery5.jpg',
    'images/evenement-gallery6.jpg',
    'images/evenement-gallery7.jpg',
    'images/evenement-gallery8.jpg',
    'images/evenement-gallery9.jpg',
    'images/evenement-gallery10.jpg',
    'images/evenement-gallery11.jpg',
    'images/evenement-gallery12.jpg',
    'images/logotype.svg',
    'images/logotype_dark.svg',
    'images/presentation.jpg',
    'images/evenement-passe2.jpg',
    'images/evenement-passe3.jpg',
    'images/VDQ_accent.png',
    'tailwind.config.js'
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
