class GroupTable extends HTMLElement {
	set group(group) {
		this._group = group;
		this.render();
	}

	render() {
		let tr = "";
		this._group.table.forEach((clubItem) => {
			tr += `<tr>
			<td>${clubItem.position}</td>
      <td class="flex align-items-center justify-content-center">
      <img src="${clubItem.team.crestUrl}" height="30px" alt="${clubItem.team.name}">
      <span style="margin-left:4px">${clubItem.team.name}</span>
      </div>
      </td>
			<td>${clubItem.points}</td>
			<td>${clubItem.won}</td>
			<td>${clubItem.lost}</td>
			<td>${clubItem.draw}</td>
		</tr>`;
		});
		this.innerHTML = `<h6 class="blue-text">${
			this._group.group.replace(/_/g, " ") ||
			this._group.stage.replace(/_/g, " ")
		}</h6>`;
		this.innerHTML += `
        <table class="highlight responsive-table mb-3 centered border-bottom">
        <thead>
          <tr>
              <th>#</th>
              <th>Club</th>
              <th>Total Point</th>
              <th>Won</th>
              <th>Lost</th>
              <th>Draw</th>
          </tr>
        </thead>
        <tbody>
        ${tr}
        </tbody>
      </table>`;
	}
}

window.customElements.define("group-table", GroupTable);
