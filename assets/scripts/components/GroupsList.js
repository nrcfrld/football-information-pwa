class GroupsList extends HTMLElement {
	set groups(groups) {
		this._groups = groups;
		this.render();
	}

	render() {
		this.innerHTML = `<div class="col s12"><h3>Standings</h3></div>`;
		this._groups.forEach((group) => {
			const groupTable = document.createElement("group-table");
			groupTable.classList.add("col", "s12");
			groupTable.group = group;
			this.appendChild(groupTable);
		});
	}
}

window.customElements.define("group-list", GroupsList);
