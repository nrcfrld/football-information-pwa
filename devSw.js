importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

workbox.routing.registerRoute(
	new RegExp("https://api.football-data.org/v2"),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: "football-api-cache",
		plugins: [
			new workbox.expiration.ExpirationPlugin({
				maxEntries: 15,
				maxAgeSeconds: 15 * 24 * 60 * 60, // 15 hari
			}),
		],
	})
);

self.addEventListener("push", (event) => {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = "Push message no payload";
	}
	const options = {
		body: body,
		icon: "assets/images/icon/apple-icon-114x114-dunplab-manifest-3324.png",
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1,
		},
	};
	event.waitUntil(
		self.registration.showNotification("Football Information", options)
	);
});
