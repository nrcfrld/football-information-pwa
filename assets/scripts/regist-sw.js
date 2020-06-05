if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("sw.js")
		.then((registration) =>
			console.log(
				"serviceWorker: pendaftaran berhasil",
				registration.scope
			)
		)
		.catch((err) => console.error("serviceWorker: pendaftaran gagal", err));
} else {
	console.error("Browser ini tidak mendukung serviceWorker");
}
