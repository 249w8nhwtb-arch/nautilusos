const $ = (s) => document.querySelector(s);
const grid = $("#grid");
const state = { q: "", genre: "All", free: false, first: false, favs: false, sort: "az" };
const favs = new Set(JSON.parse(localStorage.getItem("xv-favs") || "[]"));

const saveFavs = () => localStorage.setItem("xv-favs", JSON.stringify([...favs]));
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const storeUrl = (g) => `https://www.xbox.com/en-US/search/results/games?q=${encodeURIComponent(g.name)}`;

function initials(name) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, " ").split(/\s+/).filter((w) => w && !/^(the|of|and|a)$/i.test(w));
  return words.slice(0, 2).map((w) => (/^\d+$/.test(w) ? w : w[0])).join("").toUpperCase();
}

function artStyle(g) {
  const h = hash(g.name);
  const hue = h % 360;
  const hue2 = (hue + 40 + (h % 80)) % 360;
  const angle = h % 180;
  return `--h:${hue};--h2:${hue2};--a:${angle}deg`;
}

function card(g, i) {
  const el = document.createElement("article");
  el.className = "card";
  el.style.cssText = `${artStyle(g)};--i:${Math.min(i, 24)}`;
  el.tabIndex = 0;
  el.innerHTML = `
    <div class="art">
      <span class="mono">${initials(g.name)}</span>
      ${g.free ? '<span class="badge free">FREE</span>' : ""}
      ${g.firstParty ? '<span class="badge gp">GAME PASS</span>' : ""}
      <button type="button" class="fav ${favs.has(g.name) ? "on" : ""}" aria-label="Favorite ${g.name}">★</button>
    </div>
    <div class="info">
      <h3></h3>
      <p>${g.publisher} · ${g.year}</p>
      <div class="tags">${g.genres.map((t) => `<span>${t}</span>`).join("")}</div>
    </div>`;
  el.querySelector("h3").textContent = g.name;
  el.addEventListener("click", (e) => {
    if (e.target.closest(".fav")) {
      toggleFav(g);
      e.target.classList.toggle("on", favs.has(g.name));
      if (state.favs) render();
      return;
    }
    open(g);
  });
  el.addEventListener("keydown", (e) => e.key === "Enter" && open(g));
  return el;
}

function toggleFav(g) {
  favs.has(g.name) ? favs.delete(g.name) : favs.add(g.name);
  saveFavs();
}

function filtered() {
  const q = state.q.trim().toLowerCase();
  const list = GAMES.filter(
    (g) =>
      (!q || g.name.toLowerCase().includes(q) || g.publisher.toLowerCase().includes(q)) &&
      (state.genre === "All" || g.genres.includes(state.genre)) &&
      (!state.free || g.free) &&
      (!state.first || g.firstParty) &&
      (!state.favs || favs.has(g.name))
  );
  const by = {
    az: (a, b) => a.name.localeCompare(b.name),
    za: (a, b) => b.name.localeCompare(a.name),
    new: (a, b) => b.year - a.year || a.name.localeCompare(b.name),
    old: (a, b) => a.year - b.year || a.name.localeCompare(b.name),
  };
  return list.sort(by[state.sort]);
}

function render() {
  const list = filtered();
  grid.replaceChildren(...list.map(card));
  $("#count").textContent = `Showing ${list.length} of ${GAMES.length} games`;
  $("#empty").hidden = list.length > 0;
}

function renderChips() {
  const counts = {};
  GAMES.forEach((g) => g.genres.forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
  const genres = ["All", ...Object.keys(counts).sort((a, b) => counts[b] - counts[a])];
  $("#chips").replaceChildren(
    ...genres.map((t) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (t === state.genre ? " on" : "");
      b.textContent = t;
      b.setAttribute("aria-pressed", t === state.genre);
      b.onclick = () => {
        state.genre = t;
        renderChips();
        render();
      };
      return b;
    })
  );
}

const modal = $("#modal");
function open(g) {
  $("#m-art").style.cssText = artStyle(g);
  $("#m-art").innerHTML = `<span class="mono">${initials(g.name)}</span>`;
  $("#m-title").textContent = g.name;
  $("#m-meta").textContent = `${g.publisher} · ${g.year}`;
  $("#m-tags").innerHTML = [
    ...g.genres,
    ...(g.free ? ["Free to play"] : []),
    ...(g.firstParty ? ["Xbox Studios · Game Pass"] : []),
  ].map((t) => `<span>${t}</span>`).join("");
  $("#m-store").href = storeUrl(g);
  const fav = $("#m-fav");
  const label = () => (fav.textContent = favs.has(g.name) ? "★ Favorited" : "☆ Add to favorites");
  label();
  fav.onclick = () => {
    toggleFav(g);
    label();
    render();
  };
  modal.showModal();
}
$("#m-close").onclick = () => modal.close();
modal.addEventListener("click", (e) => e.target === modal && modal.close());

$("#q").addEventListener("input", (e) => ((state.q = e.target.value), render()));
["free", "first", "favs"].forEach((id) => $("#" + id).addEventListener("change", (e) => ((state[id] = e.target.checked), render())));
$("#sort").addEventListener("change", (e) => ((state.sort = e.target.value), render()));
$("#random").onclick = () => open(GAMES[Math.floor(Math.random() * GAMES.length)]);
$("#reset").onclick = () => {
  Object.assign(state, { q: "", genre: "All", free: false, first: false, favs: false });
  $("#q").value = "";
  ["free", "first", "favs"].forEach((id) => ($("#" + id).checked = false));
  renderChips();
  render();
};
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
    e.preventDefault();
    $("#q").focus();
  }
});

$("#total").textContent = GAMES.length;
renderChips();
render();
