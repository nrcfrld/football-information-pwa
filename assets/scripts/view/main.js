import '../components/GroupsList.js';
import '../components/matches/MatchCard.js';
import FootballAPI from '../data/api.js';

const API = new FootballAPI('2001');

// Load Standings
export const loadStandings = () => {
	API.getStandings().then((result) => {
		const groupList = document.createElement('group-list');
		groupList.groups = result.standings;
		document.getElementById('content-body').innerHTML = groupList.outerHTML;
	});
};

// Load Matches
export const loadMatches = () => {
	API.getMatches().then((result) => {
		let matches = result.matches;
		document.getElementById('content-body').innerHTML = `
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
			const matchCard = document.createElement('match-card');
			matchCard.match = match;
			document.getElementById('content-body').appendChild(matchCard);
		});
	});
};

// Load Saved Matches
export const loadSavedMatches = () => {
	document.getElementById('content-body').innerHTML = `<div class="col s12">
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

	const articles = new Promise((resolve, reject) => {
		dbPromised
			.then((db) => {
				const tx = db.transaction('matches');
				const store = tx.objectStore('matches');
				return store.getAll();
			})
			.then((articles) => resolve(articles));
	});

	articles.then((result) => {
		if (result.length > 0) {
			console.log('ada');
		} else {
			console.log('kosong');
		}
	});
};
