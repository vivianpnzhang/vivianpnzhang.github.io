// ================================================================
//  PHOTOS PAGE: you don't need to edit this file.
//
//  To add a photo: upload it into the right folder:
//    photos/flying, photos/travel or photos/life
//  Any file name works. Photos show in file-name order
//  (photo_001 first, then photo_002...), so rename them to change the order.
//
//  To caption it, open captions.txt in the same folder and add a line:
//    photo_003.jpg = First solo at Bromont!
// ================================================================

const FOLDERS = ["flying", "travel", "life"];
const IMAGE = /\.(jpe?g|png|webp|gif|avif)$/i;
const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG"];
const MAX_GAP = 3;     // (backup method) stop after this many missing numbers in a row
const MAX_PHOTOS = 300;
let listPromise = null;

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
      if (/^\s*#/.test(line)) return;
      const m = line.match(/^\s*([^=]+?)\s*=\s*(.+)$/);
      if (m) captions[m[1].toLowerCase()] = m[2].trim();
    });
  } catch (e) { /* no captions file: that's fine */ }
  return captions;
}

// A caption line can use the full name (photo_003.jpg), the name without
// the ending (photo_003), or just the number (3).
function captionFor(captions, url) {
  const name = decodeURIComponent(url.split("/").pop()).toLowerCase();
  const base = name.replace(/\.[^.]+$/, "");
  const num = (base.match(/(\d+)\D*$/) || [])[1];
  return captions[name] || captions[base] || (num && captions[String(+num)]) || "";
}

// GitHub writes photo-list.json with every photo it finds in the photos folders
function loadList() {
  if (!listPromise) {
    listPromise = fetch("photo-list.json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return listPromise;
}

async function loadFolder(folder) {
  if (cache[folder]) return cache[folder];
  const [captions, list] = await Promise.all([loadCaptions(folder), loadList()]);
  let urls = [];
  if (Array.isArray(list)) {
    urls = list
      .map((p) => p.replace(/^\//, ""))
      .filter((p) => p.startsWith(`photos/${folder}/`) && IMAGE.test(p))
      .map((p) => encodeURI(p));
  } else {
    // Backup method (e.g. previewing on your computer): look for 1.jpg, 2.jpg ...
    let gap = 0;
    for (let n = 1; n <= MAX_PHOTOS && gap < MAX_GAP; n++) {
      const url = await findPhoto(folder, n);
      if (url) { urls.push(url); gap = 0; } else gap++;
    }
  }
  urls.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  const photos = urls.map((url) => ({ url, caption: captionFor(captions, url) }));
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
