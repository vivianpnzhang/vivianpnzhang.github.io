// ================================================================
//  YOUR PROJECTS — edit this list. Each { ... } block is one card.
//  - cover: short word shown on the colored card top (or set image: "images/x.jpg")
//  - category: used by the filter buttons at the top
//  - links: add as many as you like, or leave it as []
// ================================================================
const PROJECTS = [
  {
    title: "Coca-Cola Canada Bottling consulting case",
    cover: "upcoming · team presentation",
    blurb: "BU111 consulting case: analyzing Coca-Cola Canada Bottling's business situation, writing an individual recommendation, and presenting it as a team.",
    stack: ["BU111", "Consulting case", "Team presentation"],
    category: "Business",
    links: [],
  },
  {
    title: "Private Pilot Licence in 49.7 hours",
    cover: "aug 2026",
    blurb: "Earned through the Air Cadet Power Pilot Program at Eid Air Aviation College in Bromont, QC. First solo July 6, 2026; licensed in 49.7 hours.",
    stack: ["Cessna 150", "Bromont, QC", "Air Cadets"],
    category: "Aviation",
    links: [],
  },
  {
    title: "Glider Pilot Licence",
    cover: "aug 2025",
    blurb: "Earned through the Air Cadet Glider Pilot Program. I now fly the Schweizer 2-33A at Borden Cadet Flying Site. 16.5 glider hours logged.",
    stack: ["Schweizer 2-33A", "Borden, ON", "Air Cadets"],
    category: "Aviation",
    links: [],
  },
];

// ---------------- (no need to edit below this line) ----------------
const grid = document.getElementById("grid");
const chipsEl = document.getElementById("chips");
const countEl = document.getElementById("count");

const categories = ["All", ...new Set(PROJECTS.map((p) => p.category))];
let current = "All";

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderChips() {
  chipsEl.innerHTML = categories
    .map((c) => `<button class="chip${c === current ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`)
    .join("");
}

function renderCards() {
  const list = current === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === current);
  countEl.textContent = `${list.length} project${list.length === 1 ? "" : "s"}`;
  grid.innerHTML = list
    .map(
      (p, i) => `
    <article class="card" style="animation-delay:${i * 60}ms">
      <div class="card-cover cover-${PROJECTS.indexOf(p) % 4}">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}">` : esc(p.cover || p.title)}</div>
      <div class="card-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.blurb)}</p>
        <div class="stack">${p.stack.map(esc).join(" · ")}</div>
        <div class="card-foot">
          <span class="tag">${esc(p.category)}</span>
          <span class="card-links">${(p.links || [])
            .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
            .join("")}</span>
        </div>
      </div>
    </article>`
    )
    .join("");
}

chipsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  current = btn.dataset.cat;
  renderChips();
  renderCards();
});

renderChips();
renderCards();
