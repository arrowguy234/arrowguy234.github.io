// =========================
// 1) ADD YOUR TABLEAU LINK
// =========================
// Paste your Tableau Public *share link* here.
// Example formats you might have:
// - https://public.tableau.com/views/WORKBOOK/DASHBOARD
// - https://public.tableau.com/views/WORKBOOK/DASHBOARD?:showVizHome=no
//
// If you paste a normal share link, this script will try to create an embeddable version.

const LIVE_DASHBOARD_URL = ""; // <-- PASTE YOUR LINK HERE

// Theme toggle (saved)
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

function setTheme(mode) {
  if (mode === "light") {
    root.classList.add("light");
    themeBtn.textContent = "☀️";
  } else {
    root.classList.remove("light");
    themeBtn.textContent = "🌙";
  }
  localStorage.setItem("theme", mode);
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const isLight = root.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

// Project filtering
const chips = document.querySelectorAll(".chip");
const projectCards = document.querySelectorAll("#projects .card"); // only filter project cards

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;

    projectCards.forEach(card => {
      const tags = (card.dataset.tags || "").split(" ").filter(Boolean);
      const show = filter === "all" || tags.includes(filter);

      card.style.display = show ? "block" : "none";
    });
  });
});

// Copy email
const copyBtn = document.getElementById("copyEmailBtn");
const copyStatus = document.getElementById("copyStatus");

copyBtn.addEventListener("click", async () => {
  const email = copyBtn.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Copied email to clipboard.";
  } catch {
    copyStatus.textContent = "Could not copy automatically — please copy manually.";
  }
  setTimeout(() => (copyStatus.textContent = ""), 2200);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// =========================
// Tableau embed handling
// =========================
function toEmbeddableTableauUrl(url) {
  if (!url) return "";
  // If it's already showVizHome=no, keep it.
  if (url.includes("showVizHome=no")) return url;

  // Add parameter appropriately
  const joiner = url.includes("?") ? "&" : "?";
  return url + joiner + "showVizHome=no";
}

const liveLink = document.getElementById("liveDashLink");
const iframe = document.getElementById("tableauEmbed");
const placeholder = document.getElementById("embedPlaceholder");

if (LIVE_DASHBOARD_URL && LIVE_DASHBOARD_URL.trim().length > 0) {
  const clean = LIVE_DASHBOARD_URL.trim();
  const embedUrl = toEmbeddableTableauUrl(clean);

  liveLink.href = clean;
  iframe.src = embedUrl;

  iframe.style.display = "block";
  placeholder.style.display = "none";
} else {
  // keep placeholder visible
  liveLink.href = "#";
}
