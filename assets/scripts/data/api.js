export default class FootballAPI {
	constructor(LEAGUE_ID) {
		this._LEAGUE_ID = LEAGUE_ID;
		this._BASE_URL = 'https://api.football-data.org/v2/';
	}

	status(response) {
		if (response.status !== 200) {
			console.log('Error : ' + response.status);
			return Promise.reject(new Error(response.statusText));
		} else {
			return Promise.resolve(response);
		}
	}

	json(response) {
		return response.json();
	}

	error(error) {
		console.log(`Error : ${error}`);
	}

	fetchApi(url) {
		return fetch(url, {
			headers: {
				'X-Auth-Token': '26c39f80e00e4f35bf0984c2dc6d6d52',
			},
		})
			.then(this.status)
			.then(this.json);
	}

	getStandings() {
		if ('caches' in window) {
			return caches
				.match(
					`${this._BASE_URL}competitions/${this._LEAGUE_ID}/standings?standingType=TOTAL`
				)
				.then((result) => {
					// console.log(result);
					if (result) {
						console.log('Load from caches');
						return result.json();
					}
					return this.fetchApi(
						`${this._BASE_URL}competitions/${this._LEAGUE_ID}/standings?standingType=TOTAL`
					);
				});
		}
	}

	getMatches() {
		if ('caches' in window) {
			return caches
				.match(
					`${this._BASE_URL}competitions/${this._LEAGUE_ID}/matches?status=FINISHED&dateFrom=2020-02-30&dateTo=2020-12-30`
				)
				.then((result) => {
					// console.log(result);
					if (result) {
						console.log('Load from caches');
						return result.json();
					}
					return this.fetchApi(
						`${this._BASE_URL}competitions/${this._LEAGUE_ID}/matches?status=FINISHED&dateFrom=2020-02-30&dateTo=2020-12-30`
					);
				});
		}
	}
}
