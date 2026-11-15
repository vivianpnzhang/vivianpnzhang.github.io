// ================================================================
//  YOUR PROJECTS — edit this list. Each { ... } block is one card.
//  - cover: short word shown on the colored card top (or set image: "images/x.jpg")
//  - category: used by the filter buttons at the top
//  - links: add as many as you like, or leave it as []
// ================================================================
const PROJECTS = [
  {
    title: "Coca-Cola Canada Bottling consulting case",
    cover: "BU111 · upcoming",
    blurb: "An individual consulting recommendation on the company's situation, then presented with my group.",
    stack: ["Consulting", "Strategy", "Presenting"],
    category: "Case Comps",
    links: [],
  },
  {
    title: "Toyota Canada EV strategy slidedoc",
    cover: "CIIP · fall 2026",
    blurb: "Researched Toyota's strategy in Canada's EV/ZEV market and presented the company overview and final recommendation.",
    stack: ["Research", "Slidedoc", "Strategy"],
    category: "Case Comps",
    links: [],
  },
  {
    title: "Private Pilot Licence in 49.7 hours",
    cover: "first solo · jul 6",
    blurb: "Trained through the Air Cadet Power Pilot program at Eid Air Aviation College in Bromont, QC, from first solo to licence in one summer.",
    stack: ["Cessna 150", "Bromont, QC"],
    category: "Aviation",
    links: [],
  },
  {
    title: "Glider Pilot Licence",
    cover: "summer 2025",
    blurb: "My first licence: silent flight with no engine, earned through the Air Cadet Glider Pilot program.",
    stack: ["Gliders", "Air Cadets"],
    category: "Aviation",
    links: [],
  },
  {
    title: "FTC BudJetTech: road to Worlds",
    cover: "team 25049",
    blurb: "Ran outreach and business for my robotics team: FIRST World Championship qualifier and 3rd-place Inspire Award at Ontario Provincials.",
    stack: ["Outreach", "Business", "STEM"],
    category: "Personal",
    links: [],
  },
  {
    title: "This website",
    cover: "vz.",
    blurb: "Designed my own corner of the internet, complete with a tiny pixel version of me flying across the home page.",
    stack: ["Design", "HTML & CSS"],
    category: "Personal",
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
