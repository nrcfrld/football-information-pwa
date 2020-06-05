// inisiasi sidenav
const sidenav = document.querySelector(".sidenav");
M.Sidenav.init(sidenav);

// load nav
loadNav();

// load page
let page = window.location.hash.substr(1);
if (page == "") page = "home";
loadPage(page);

function loadNav() {
	fetch("nav.html")
		.then((response) => response.text())
		.then((responseText) => {
			const nav = document.querySelectorAll(".topnav, .sidenav");
			nav.forEach((elm) => {
				elm.innerHTML = responseText;
			});

			nav.forEach((elm) => {
				elm.addEventListener("click", () => {
					// Tutup sidenav ketika navlink di klik
					M.Sidenav.getInstance(sidenav).close();

					// muat konten halaman
					page = event.target.getAttribute("href").substr(1);
					loadPage(page);
				});
			});
		});
}

function loadPage(page) {
	showPreloader();
	if (page == "home") loadStandings();
	if (page == "matches") loadMatches();
	if (page == "saved-matches") loadSavedMatches();
}

function showPreloader() {
	const content = document.getElementById("content-body");
	content.innerHTML = `
        <div class="flex align-items-center justify-content-center" style="height:80vh">
            <div class="preloader-wrapper medium active">
                <div class="spinner-layer spinner-blue-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>`;
}
