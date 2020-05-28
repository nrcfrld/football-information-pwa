const dbPromised = idb.open('db-football-information', 1, function (upgradeDb) {
	const articlesObjectStore = upgradeDb.createObjectStore('matches', {
		keyPath: 'id',
	});
});
