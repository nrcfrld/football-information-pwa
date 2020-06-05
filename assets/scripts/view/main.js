const API = new FootballAPI("2001");

// Load Standings
const loadStandings = () => {
	API.getStandings().then((result) => {
		console.log(result);
		const groupList = document.createElement("group-list");
		groupList.groups = result.standings;
		document.getElementById("content-body").innerHTML = groupList.outerHTML;
	});
};

// Load Matches
const loadMatches = () => {
	API.getMatches().then((result) => {
		console.log(result);
		let matches = result.matches;
		document.getElementById("content-body").innerHTML = `
		<div class="col s12">
			<h3>Latest Match</h3>
		</div>
		<div class="col s12 mb-3">
			<div class="flex">
				<div class="info flex">
					<div class="square-info green">
					</div>
					<span class="ml-1">Home</span>
				</div>
				<div class="info flex ml-1">
					<div class="square-info blue">
					</div>
					<span class="ml-1">Away</span>
				</div>
			</div>
		</div>`;
		matches.forEach((match) => {
			const matchCard = document.createElement("match-card");
			matchCard.match = match;
			document.getElementById("content-body").appendChild(matchCard);
		});
	});
};

// Load Saved Matches
const loadSavedMatches = () => {
	document.getElementById("content-body").innerHTML = `<div class="col s12">
			<h3>Saved Match</h3>
		</div>
		<div class="col s12 mb-3">
			<div class="flex">
				<div class="info flex">
					<div class="square-info green">
					</div>
					<span class="ml-1">Home</span>
				</div>
				<div class="info flex ml-1">
					<div class="square-info blue">
					</div>
					<span class="ml-1">Away</span>
				</div>
			</div>
		</div>
		`;

	const articles = new Promise((resolve, reject) => {
		dbPromised
			.then((db) => {
				const tx = db.transaction("matches");
				const store = tx.objectStore("matches");
				return store.getAll();
			})
			.then((articles) => resolve(articles));
	});

	articles.then((result) => {
		if (result.length > 0) {
			document.getElementById("content-body").innerHTML += ``;
			result.forEach((match) => {
				const matchCard = document.createElement("match-card");
				matchCard.match = match;
				document.getElementById("content-body").appendChild(matchCard);
			});
		} else {
			document.getElementById(
				"content-body"
			).innerHTML += `<div class="col s12">
			<h6>Tidak ada match yang tersimpan.</h6>
			</div>`;
		}
	});
};
