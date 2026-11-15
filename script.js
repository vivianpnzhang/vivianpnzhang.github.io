// ---------- Light / dark theme (navy by default, remembered across pages) ----------
const root = document.documentElement;
root.dataset.theme = localStorage.getItem("theme") || "dark";

const themeBtn = document.getElementById("themeToggle");
function syncIcon() {
  themeBtn.textContent = root.dataset.theme === "dark" ? "☀" : "☾";
}
syncIcon();
themeBtn.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", root.dataset.theme);
  syncIcon();
});

// ---------- Footer year ----------
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// ---------- Pixel pilot: a girl with a hair bun flying a little plane ----------
// Each letter is one pixel; "." is empty. Edit the colors below to restyle her.
const PILOT_ART = [
  "...........HH.................",
  "..........HHHH................",
  "...........HHHHH..............",
  ".........KHHHHHHH.............",
  ".........KHHSSSSS.............",
  "........MKHSSSSES...G.........",
  "......MMM.HSSSBSS..GG.........",
  "OO..MMM....LLLLL..GGG........R",
  "OPO......OOOOOOOOOOOOOOOOO...R",
  "OPPO...OOWWWWWWWWWWWWWWWWWOO.R",
  "OPPPOOOWWWWWWWWWWWWWWWWWWWWWOR",
  "OWWWWWWWPPPPPPPPPPPPPPPPPPWWOR",
  ".OOOWWWWWWWWWWWWWWWWWWWWWWWOOR",
  "....OOOOOOOOOOOOOOOOOOOOOOO..R",
  "...........OWWWWWWWWO.........",
  "............OOOOOOOOO.........",
  "..............O....O..........",
  ".............YYY..YYY.........",
];
const PILOT_COLORS = {
  H: "#1d1a22", // hair
  S: "#f3d0b5", // skin
  E: "#1d1a22", // eye
  B: "#f0a39b", // blush
  K: "#f2b5a5", // headset
  M: "#e57a6b", // flying scarf
  L: "#6d7fb3", // jacket
  G: "#a8cbe8", // windscreen
  W: "#f6efe4", // plane body
  P: "#f2b5a5", // pink stripe
  O: "#5f8fc0", // outline
  R: "#c8cfdb", // propeller
  Y: "#2a3550", // wheels
};

function drawPilot(px = 3) {
  const w = PILOT_ART[0].length;
  const h = PILOT_ART.length;
  let rects = "";
  PILOT_ART.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch === ".") return;
      const cls = ch === "R" ? ' class="prop"' : "";
      rects += `<rect${cls} x="${x}" y="${y}" width="1.02" height="1.02" fill="${PILOT_COLORS[ch]}"/>`;
    });
  });
  return `<svg width="${w * px}" height="${h * px}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">
    <style>.prop{animation:prop .12s steps(1) infinite}@keyframes prop{50%{opacity:.15}}</style>${rects}</svg>`;
}

const plane = document.getElementById("plane");
const sky = document.getElementById("sky");
if (plane && sky) {
  plane.insertAdjacentHTML("beforeend", drawPilot(4));
  const setWidth = () => sky.style.setProperty("--sky-w", sky.offsetWidth + "px");
  setWidth();
  window.addEventListener("resize", setWidth);
}
