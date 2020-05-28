class MatchCard extends HTMLElement {
	set match(match) {
		this._match = match;
		this.render();
	}

	render() {
		const homeTeam = this._match.homeTeam;
		const awayTeam = this._match.awayTeam;
		const score = this._match.score.fullTime;
		this.innerHTML = `
        <div class="col s12 l6">
			<div class="card blue-grey darken-3 center-align">
				<div class="card-content">
					<div class="card-title" style="text-transform:capitalize">
					${this._match.stage.replace(/_/g, ' ').toLowerCase()}
					</div>
					<a class="btn-floating waves-effect waves-light blue darken-2" style="position:absolute;bottom:-10px;right:10px"><i class="material-icons">save</i></a>
					<div class="green-text">${homeTeam.name}</div>
					<div><h4>VS</h4></div>
					<div class="blue-text border-bottom">${awayTeam.name}</div>
					<div class="score">
						<h6>Score</h6>
						<div>
						<span class="green-text">
							<img src="" alt="">
							<br />
							${score.homeTeam}
						</span>
						<span class="green-text">:</span>
						<span class="blue-text">${score.awayTeam}</span>
						</div>
					</div>
				</div>
            </div>
        </div>
		`;

		this.querySelector('.btn-floating').addEventListener('click', () => {
			console.log('Saving..');
			dbPromised
				.then((db) => {
					let tx = db.transaction('matches', 'readwrite');
					let store = tx.objectStore('matches');
					console.log(this._match);
					store.add(this._match);
					return tx.complete;
				})
				.then(() => console.log('Match Berhasil Disimpan'));
		});
	}
}

window.customElements.define('match-card', MatchCard);
