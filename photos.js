// ================================================================
//  PHOTOS PAGE: you don't need to edit this file.
//
//  To add a photo:
//    1. Name it with the next number: 1.jpg, 2.jpg, 3.jpg ...
//    2. Drop it into the right folder: photos/business, photos/flying,
//       photos/travel or photos/life
//  The highest number shows first, so your newest photo is always at the top.
//
//  To caption it, open captions.txt in the same folder and add a line:
//    3 = First solo at Bromont!
// ================================================================

const FOLDERS = ["business", "flying", "travel", "life"];
const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG"];
const MAX_GAP = 3;     // stop looking after this many missing numbers in a row
const MAX_PHOTOS = 300;

const galleryEl = document.getElementById("gallery");
const emptyEl = document.getElementById("empty");
const tabs = document.querySelectorAll(".tab");
const cache = {};
let current = [];
let lbIndex = 0;

function esc(s) {
  return String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Check whether an image exists by trying to load it
function tryLoad(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

async function findPhoto(folder, n) {
  for (const ext of EXTENSIONS) {
    const url = await tryLoad(`photos/${folder}/${n}.${ext}`);
    if (url) return url;
  }
  return null;
}

async function loadCaptions(folder) {
  const captions = {};
  try {
    const res = await fetch(`photos/${folder}/captions.txt`, { cache: "no-cache" });
    if (!res.ok) return captions;
    const text = await res.text();
    text.split(/\r?\n/).forEach((line) => {
      const m = line.match(/^\s*(\d+)\s*[=:|-]\s*(.+)$/);
      if (m) captions[m[1]] = m[2].trim();
    });
  } catch (e) { /* no captions file: that's fine */ }
  return captions;
}

async function loadFolder(folder) {
  if (cache[folder]) return cache[folder];
  const [captions] = await Promise.all([loadCaptions(folder)]);
  const photos = [];
  let gap = 0;
  for (let n = 1; n <= MAX_PHOTOS && gap < MAX_GAP; n++) {
    const url = await findPhoto(folder, n);
    if (url) {
      photos.push({ n, url, caption: captions[n] || "" });
      gap = 0;
    } else {
      gap++;
    }
  }
  photos.reverse(); // newest (highest number) first, like Instagram
  cache[folder] = photos;
  return photos;
}

function render(photos) {
  current = photos;
  emptyEl.hidden = photos.length > 0;
  galleryEl.innerHTML = photos
    .map(
      (p, i) => `
    <button class="tile" data-i="${i}" style="animation-delay:${Math.min(i, 12) * 35}ms" aria-label="${esc(p.caption || "Photo")}">
      <img src="${esc(p.url)}" alt="${esc(p.caption)}" loading="lazy">
      ${p.caption ? `<span class="overlay">${esc(p.caption)}</span>` : ""}
    </button>`
    )
    .join("");
}

async function showTab(folder) {
  if (!FOLDERS.includes(folder)) folder = FOLDERS[0];
  tabs.forEach((t) => {
    const on = t.dataset.tab === folder;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on);
  });
  history.replaceState(null, "", "#" + folder);
  galleryEl.innerHTML = '<p class="gallery-loading">loading…</p>';
  emptyEl.hidden = true;
  const photos = await loadFolder(folder);
  // Only draw if the user hasn't switched tabs while this was loading
  if (location.hash.slice(1) === folder) render(photos);
}

tabs.forEach((t) => t.addEventListener("click", () => showTab(t.dataset.tab)));
showTab(location.hash.slice(1) || FOLDERS[0]);

// ---------- Lightbox ----------
const lightbox = document.getElementById("lightbox");
const lbMedia = document.getElementById("lbMedia");
const lbCaption = document.getElementById("lbCaption");

function openLightbox(i) {
  if (!current.length) return;
  lbIndex = (i + current.length) % current.length;
  const p = current[lbIndex];
  lbMedia.innerHTML = `<img src="${esc(p.url)}" alt="${esc(p.caption)}">`;
  lbCaption.textContent = p.caption;
  lightbox.classList.add("open");
}
function closeLightbox() { lightbox.classList.remove("open"); }

galleryEl.addEventListener("click", (e) => {
  const tile = e.target.closest(".tile");
  if (tile) openLightbox(+tile.dataset.i);
});
document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", () => openLightbox(lbIndex - 1));
document.getElementById("lbNext").addEventListener("click", () => openLightbox(lbIndex + 1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
  if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
});
