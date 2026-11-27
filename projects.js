const FILTERS = ["Business", "Aviation", "Personal"];

const PROJECTS = [
  {
    title: "Native for Everyone: P&G case competition",
    cover: "★ best speaker in our panel",
    blurb: "My first case competition: a 45-minute, no-slides pitch to make Native the clean personal care brand the whole household chooses, with a $1M plan built around a Gen Z wellness community.",
    stack: ["P&G × Native", "Case competition", "Verbal pitch"],
    category: "Business",
    page: "native-case.html",
    pageLabel: "read the case",
    links: [],
  },
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
  {
    title: "A long weekend of gliding (vlog)",
    cover: "vlog · cfb trenton & mountain view",
    blurb: "A vlog from a long weekend flying gliders with the Air Cadet gliding program at CFB Trenton and Mountain View.",
    stack: ["Air Cadets", "Gliding", "YouTube"],
    category: "Aviation",
    page: "glider-vlog.html",
    pageLabel: "watch the vlog",
    links: [],
  },
  {
    title: "Music",
    cover: "piano · violin · clarinet · baritone · tuba",
    blurb: "A few performances, and a bit about the five instruments I've been lucky enough to learn.",
    stack: ["Piano", "Violin", "Clarinet", "Baritone", "Tuba"],
    category: "Personal",
    page: "music.html",
    pageLabel: "listen",
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

