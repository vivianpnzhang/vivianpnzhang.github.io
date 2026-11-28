
const FILTERS = ["Business", "Aviation", "Personal"];

const PROJECTS = [
  {
    title: "Native for Everyone: P&G case competition",
    cover: "★ best speaker",
    blurb: "My first case competition: a 45-minute, no-slides pitch to make Native the clean personal care brand the whole household chooses, with a $1M plan built around a Gen Z wellness community.",
    stack: ["P&G × Native", "Case competition", "Verbal pitch"],
    category: "Business",
    page: "native-case.html",
    image: "native-cover.jpg",
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
    art: "coke",
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
    image: "cpl-cover.jpg",
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
    image: "glider-cover.jpg",
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
    image: "music-cover.jpg",
    pageLabel: "listen",
    links: [],
  },
  // ↓ To add a project: copy the block above (from { to },), paste it here, and change the words.
];

// ---------------- (no need to edit below this line) ----------------

// Quick sketches for the card tops, one per project.
const SKETCH = (wash, ink) => `<svg viewBox="0 0 360 140" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block" aria-hidden="true"><rect width="360" height="140" fill="#f6efe4"/>${wash}<g fill="none" stroke="#1d2a40" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ink}</g></svg>`;
const blob = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#f2b5a5" opacity=".45" transform="rotate(-12 ${cx} ${cy})"/>`;
const COVERS = {
  // deodorant stick
  native: SKETCH(blob(204, 84, 32, 38),
    `<path d="M164 38 h32 q4 0 4 4 v10 h-40 v-10 q0 -4 4 -4z"/>
     <path d="M158 52 h44 q4 0 4 5 v58 q0 6 -6 6 h-40 q-6 0 -6 -6 v-58 q0 -5 4 -5z"/>
     <path d="M168 78 h24"/><path d="M168 86 h14"/>
     <path d="M161 54 l-1 60" opacity=".5"/>`),
  // contour bottle
  coke: SKETCH(blob(194, 90, 26, 34),
    `<path d="M172 22 h16"/>
     <path d="M173 24 v12 c0 8 -8 13 -8 27 c0 10 6 14 6 22 c0 9 -7 13 -7 25 v8 q0 4 4 4 h20 q4 0 4 -4 v-8 c0 -12 -7 -16 -7 -25 c0 -8 6 -12 6 -22 c0 -14 -8 -19 -8 -27 v-12"/>
     <path d="M168 84 q12 -6 24 0"/><path d="M171 92 q9 -4 18 0"/>`),
  // high-wing Cessna, side view
  cpl: SKETCH(blob(184, 84, 50, 22),
    `<path d="M112 80 c18 -6 40 -10 70 -10 l24 2 c10 1 16 6 15 10 l-24 5 l-70 1 c-8 0 -14 -3 -15 -8z"/>
     <path d="M118 78 l-12 -24 h10 l18 22"/>
     <path d="M140 64 h82"/><path d="M144 61 h74"/>
     <path d="M182 64 l4 8 h18 l-6 -8"/>
     <path d="M190 68 l-8 14" opacity=".6"/>
     <path d="M222 72 v14" opacity=".5"/><path d="M224 70 v18" opacity=".5"/>
     <path d="M168 86 l-3 10"/><circle cx="164" cy="99" r="3.5"/>
     <path d="M210 84 l1 9"/><circle cx="211" cy="96" r="3"/>`),
  // glider from above: long straight wings, slim body, T-tail
  glider: SKETCH(blob(196, 74, 44, 30),
    `<g transform="rotate(-14 180 72)">
      <path d="M180 28 c4 0 5 6 5 14 l-1 66 q-4 4 -8 0 l-1 -66 c0 -8 1 -14 5 -14z"/>
      <path d="M185 50 l104 6 q3 3 0 6 l-104 2"/>
      <path d="M175 50 l-104 6 q-3 3 0 6 l104 2"/>
      <path d="M180 104 l-22 3 q-2 3 0 5 h44 q2 -2 0 -5 l-22 -3"/>
      <path d="M177 34 q3 -3 6 0"/>
    </g>`),
  // violin
  music: SKETCH(blob(190, 90, 30, 38),
    `<path d="M180 26 q-6 -4 -8 2 q-1 5 4 6"/>
     <path d="M178 34 v28"/><path d="M182 34 v28"/>
     <path d="M180 60 c14 0 16 12 10 20 c8 4 12 14 8 24 c-4 10 -12 14 -18 14 c-6 0 -14 -4 -18 -14 c-4 -10 0 -20 8 -24 c-6 -8 -4 -20 10 -20z"/>
     <path d="M172 84 q-4 4 0 10"/><path d="M188 84 q4 4 0 10"/>
     <path d="M174 100 h12"/><path d="M178 40 v62" opacity=".5"/><path d="M182 40 v62" opacity=".5"/>
     <path d="M214 36 l-54 92" opacity=".7"/>`),
};

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
      <div class="card-cover cover-${PROJECTS.indexOf(p) % 4}"${(p.art && COVERS[p.art]) || p.image ? ' style="padding:0"' : ""}>${p.art && COVERS[p.art] ? COVERS[p.art] : p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy">` : esc(p.cover || p.title)}</div>
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

