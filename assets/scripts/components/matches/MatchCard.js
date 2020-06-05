class MatchCard extends HTMLElement {
	set match(match) {
		this._match = match;
		this.render();
	}

	async render() {
		const homeTeam = this._match.homeTeam;
		const awayTeam = this._match.awayTeam;
		const score = this._match.score.fullTime;
		let buttonTemplate = "";
		let saved = "";
		if (page == "matches") {
			buttonTemplate = `<button type="button" class="btn-floating waves-effect waves-light blue darken-2" style="position:absolute;bottom:-10px;right:10px"><i class="material-icons">save</i></button>`;
		} else {
			buttonTemplate = `<button type="button" class="btn-floating waves-effect waves-light red" style="position:absolute;bottom:-10px;right:10px"><i class="material-icons">delete</i></button>`;
		}

		await getMatchByID(this._match.id).then((result) => {
			if (result && page == "matches") {
				buttonTemplate = `<button type="button" class="disabled btn-floating waves-effect waves-light blue" style="position:absolute;bottom:-10px;right:10px"><i class="material-icons">save</i></button>`;

				saved = `<p class="green accent-3 black-text" style="position:absolute;top:-15px;width:100%">Match ini sudah tersimpan</p>`;
			}
		});

		this.innerHTML = `
        <div class="col s12 l6">
			<div class="card blue-grey darken-3 center-align">
			${saved || ""}
				<div class="card-content">
					<div class="card-title" style="text-transform:capitalize">
					${this._match.stage.replace(/_/g, " ").toLowerCase()}
					</div>
					${buttonTemplate}
					<div class="green-text">${homeTeam.name}</div>
					<div><h4>VS</h4></div>
					<div class="blue-text border-bottom">${awayTeam.name}</div>
					<div class="score">
						<h6>Score</h6>
						<div>
						<span class="green-text">
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

		this.querySelector(".btn-floating").addEventListener("click", () => {
			if (page == "matches") {
				saveToIDB(this._match);
				this.render();
			} else {
				deleteFromIDB(this._match.id);
				loadSavedMatches();
			}
		});
	}
}

window.customElements.define("match-card", MatchCard);
