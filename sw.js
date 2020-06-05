importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

workbox.precaching.precacheAndRoute([{"revision":"1209cb5854e50ba2841234bec6612823","url":"assets/images/icon/256x256.png"},{"revision":"107e164427d0d4e6230b76fd40ce113e","url":"assets/images/icon/android-icon-192x192-dunplab-manifest-3324.png"},{"revision":"317bbf2e5cbe56fa86162e9c39ab4dd9","url":"assets/images/icon/apple-icon-114x114-dunplab-manifest-3324.png"},{"revision":"ccf0a122833308b48f2cf2384200131e","url":"assets/images/icon/apple-icon-120x120-dunplab-manifest-3324.png"},{"revision":"fa5fea3a6c4991d1078198a0d62cda2e","url":"assets/images/icon/apple-icon-144x144-dunplab-manifest-3324.png"},{"revision":"01bf7de9087c695e50a36a1ce42b2c01","url":"assets/images/icon/apple-icon-152x152-dunplab-manifest-3324.png"},{"revision":"79aa7c9080f78a7303f641c6b4eee1ee","url":"assets/images/icon/apple-icon-180x180-dunplab-manifest-3324.png"},{"revision":"3c81cdeacc63b98aef06bde24c2313b2","url":"assets/images/icon/apple-icon-57x57-dunplab-manifest-3324.png"},{"revision":"df5b0d2d2932a42dc21d5fb5385d9873","url":"assets/images/icon/apple-icon-60x60-dunplab-manifest-3324.png"},{"revision":"9b7dcf9dd30f08d7b2d663cd3c2db6b1","url":"assets/images/icon/apple-icon-72x72-dunplab-manifest-3324.png"},{"revision":"bb8b6af92ff5ba4d3a0b7db55e117590","url":"assets/images/icon/apple-icon-76x76-dunplab-manifest-3324.png"},{"revision":"5a31f38fc971ca55be1bff8bb40e6547","url":"assets/images/icon/default-512x512.png"},{"revision":"417ed2ec13a8f9d954cb39045113cc7e","url":"assets/images/icon/favicon-16x16-dunplab-manifest-3324.png"},{"revision":"e2b2adaf2ff4f5368342e28370e54a87","url":"assets/images/icon/favicon-32x32-dunplab-manifest-3324.png"},{"revision":"d5ceb49ca61ff35e2a153615f305ca27","url":"assets/images/icon/favicon-96x96-dunplab-manifest-3324.png"},{"revision":"a66942528a8af114e8a0ae4b517ab0be","url":"assets/libraries/idb/idb.js"},{"revision":"ec1df3ba49973dcb9ff212f052d39483","url":"assets/libraries/materialize-css/css/materialize.min.css"},{"revision":"5dcfc8944ed380b2215dc28b3f13835f","url":"assets/libraries/materialize-css/js/materialize.min.js"},{"revision":"077e7acd63c1bbc7b96166c9af143fd2","url":"assets/scripts/components/GroupsList.js"},{"revision":"5b856383c384341535d30f033b6c86f1","url":"assets/scripts/components/GroupTable.js"},{"revision":"2be705f65ba3b2fed7eae2bc32e3ea92","url":"assets/scripts/components/matches/MatchCard.js"},{"revision":"76d0916e71c70c3666d2221b744ae738","url":"assets/scripts/data/api.js"},{"revision":"a780185584656bfd2dd2d5c93d16833a","url":"assets/scripts/data/db.js"},{"revision":"1a9c7831bc53877699f2ba79e6f808f8","url":"assets/scripts/notification.js"},{"revision":"a98765f446276028bf73506037ed9c13","url":"assets/scripts/regist-sw.js"},{"revision":"a24a7b848381c58daa4277ef79a7fe50","url":"assets/scripts/view/main.js"},{"revision":"96f8abdbae53e51db2d912b3bd4726f9","url":"assets/scripts/view/nav.js"},{"revision":"3792193cb4b88f3e75b79a6cd47e6676","url":"assets/styles/main.css"},{"revision":"f80ae1b937b2ce49d5403d941e76f5f6","url":"index.html"},{"revision":"3bc6156bc646165ddea176a35630540e","url":"nav.html"},{"revision":"8bad567d06e6b88492aa9c58f96b8994","url":"push.js"},{"revision":"7d05b781a27666e55b6bb2127d7c30b7","url":"workbox-config.js"}]);

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
