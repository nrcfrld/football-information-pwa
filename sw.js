const CACHE_NAME = 'football-information-v2';
let urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/assets/styles/main.css',
	'/assets/libraries/materialize-css/css/materialize.min.css',
	'/assets/libraries/materialize-css/js/materialize.min.js',
	'/assets/scripts/app.js',
	'/assets/scripts/nav.js',
	'/assets/scripts/view/main.js',
	'/assets/scripts/data/api.js',
	'/assets/scripts/components/matches/MatchCard.js',
	'/assets/scripts/components/GroupsList.js',
	'/assets/scripts/components/GroupTable.js',
	'/manifest.json',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
];

self.addEventListener('install', function (event) {
	self.skipWaiting();
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheName !== CACHE_NAME) {
						console.log(
							'ServiceWorker: cache ' + cacheName + ' dihapus'
						);
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', function (event) {
	const base_url = 'https://api.football-data.org/v2/';
	if (event.request.url.indexOf(base_url) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then(function (cache) {
				return fetch(event.request).then(function (response) {
					cache.put(event.request.url, response.clone());
					return response;
				});
			})
		);
	} else {
		event.respondWith(
			caches
				.match(event.request, { ignoreSearch: true })
				.then(function (response) {
					return response || fetch(event.request);
				})
		);
	}
});
