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
const cards = document.querySelectorAll(".card");

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;

    cards.forEach(card => {
      const tags = (card.dataset.tags || "").split(" ");
      const show = filter === "all" || tags.includes(filter);

      card.style.opacity = show ? "1" : "0";
      card.style.transform = show ? "translateY(0)" : "translateY(6px)";
      card.style.pointerEvents = show ? "auto" : "none";
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

// Animated counters (About section)
function animateValue(el, target, duration = 900) {
  const start = 0;
  const startTime = performance.now();

  function tick(now) {
    const p = Math.min((now - startTime) / duration, 1);
    el.textContent = Math.floor(start + (target - start) * p) + "+";
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

let countersDone = false;
const aboutSection = document.getElementById("about");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersDone) {
      countersDone = true;
      animateValue(document.getElementById("hlYears"), 6);
      animateValue(document.getElementById("hlDash"), 10);
      animateValue(document.getElementById("hlTools"), 5);
    }
  });
}, { threshold: 0.35 });

observer.observe(aboutSection);
