const dbPromised = idb.open("db-football-information", 1, function (upgradeDb) {
	const articlesObjectStore = upgradeDb.createObjectStore("matches", {
		keyPath: "id",
	});
});

const getMatchByID = (id) => {
	return dbPromised.then((db) => {
		const tx = db.transaction("matches", "readwrite");
		const store = tx.objectStore("matches");
		return store.get(id);
	});
};

const saveToIDB = (data) => {
	dbPromised
		.then((db) => {
			const tx = db.transaction("matches", "readwrite");
			const store = tx.objectStore("matches");
			return store.put(data);
		})
		.then((result) => {
			if (result) {
				M.toast({
					html: "Match berhasil disimpan",
					classes: "green",
				});
			}
		})
		.catch(() => {
			M.toast({
				html: "Gagal menyimpan match yang sudah ada",
				classes: "red",
			});
		});
};

const deleteFromIDB = (id) => {
	dbPromised
		.then((db) => {
			const tx = db.transaction("matches", "readwrite");
			const store = tx.objectStore("matches");
			store.delete(id);
			return tx.complete;
		})
		.then(() => {
			M.toast({
				html: "Match tersimpan berhasil dihapus",
				classes: "green",
			});
		});
};
