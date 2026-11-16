// ================================================================
//  YOUR PROJECTS — edit this list. Each { ... } block is one card.
//  - cover: short word shown on the colored card top (or set image: "images/x.jpg")
//  - category: "Business", "Aviation" or "Personal" (must match a filter below)
//  - page: the page that opens when someone clicks anywhere on the card
//          (leave it out if the card shouldn't open anything)
//  - pageLabel: the small link text in the card's corner
//  - links: extra outside links (only used on cards without a page), or []
// ================================================================

// The filter buttons, in order. A filter with no projects yet shows "coming soon".
const FILTERS = ["Business", "Aviation", "Personal"];

const PROJECTS = [
  {
    title: "Coca-Cola Canada Bottling consulting case",
    cover: "upcoming · team presentation",
    blurb: "BU111 consulting case: analyzing Coca-Cola Canada Bottling's business situation, writing an individual recommendation, and presenting it as a team.",
    stack: ["BU111", "Consulting case", "Team presentation"],
    category: "Business",
    page: "coca-cola-case.html",
    pageLabel: "preview",
    links: [],
  },
  {
    title: "Working toward my Commercial Pilot Licence",
    cover: "in progress · 51.7 / 200 hrs",
    blurb: "Building flight hours toward a Commercial Pilot Licence, after earning my private pilot and glider licences through the Air Cadet program.",
    stack: ["PPL", "Glider licence", "Cessna 150"],
    category: "Aviation",
    page: "flight-log.html",
    pageLabel: "see my flight log",
    links: [],
  },
  // ↓ To add a project: copy the block above (from { to },), paste it here, and change the words.
];

// ---------------- (no need to edit below this line) ----------------
const grid = document.getElementById("grid");
const chipsEl = document.getElementById("chips");
const countEl = document.getElementById("count");

const categories = ["All", ...new Set([...FILTERS, ...PROJECTS.map((p) => p.category)])];
let current = "All";

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderChips() {
  chipsEl.innerHTML = categories
    .map((c) => `<button class="chip${c === current ? " active" : ""}" data-cat="${esc(c)}">${esc(c.toLowerCase())}</button>`)
    .join("");
}

function renderCards() {
  const list = current === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === current);
  countEl.textContent = `${list.length} project${list.length === 1 ? "" : "s"}`;
  if (!list.length) {
    grid.innerHTML = '<p class="gallery-empty">coming soon ✈</p>';
    return;
  }
  grid.innerHTML = list
    .map(
      (p, i) => `
    <${p.page ? `a href="${esc(p.page)}"` : "article"} class="card${p.page ? " card-link" : ""}" style="animation-delay:${i * 60}ms">
      <div class="card-cover cover-${PROJECTS.indexOf(p) % 4}">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}">` : esc(p.cover || p.title)}</div>
      <div class="card-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.blurb)}</p>
        <div class="stack">${p.stack.map(esc).join(" · ")}</div>
        <div class="card-foot">
          <span class="tag">${esc(p.category)}</span>
          <span class="card-links">${p.page
            ? `<span class="card-open">${esc(p.pageLabel || "open")} →</span>`
            : (p.links || [])
                .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
                .join("")}</span>
        </div>
      </div>
    </${p.page ? "a" : "article"}>`
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
