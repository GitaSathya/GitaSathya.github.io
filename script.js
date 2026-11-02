// ===== Light / dark theme toggle =====
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "light" ? "🌙" : "☀️";
  localStorage.setItem("theme", theme);
}

setTheme(localStorage.getItem("theme") || "dark");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "light" ? "dark" : "light");
});

// ===== Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close the menu after picking a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ===== Show initials if profile.jpg is missing =====
const profileImg = document.getElementById("profileImg");

function showInitials() {
  profileImg.style.display = "none";
  document.getElementById("initials").style.display = "block";
}

profileImg.addEventListener("error", showInitials);

// The image may have already failed before this script ran
if (profileImg.complete && profileImg.naturalWidth === 0) {
  showInitials();
}

// ===== Fade sections in on scroll =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));

// ===== Highlight current section in the nav + back-to-top button =====
const sections = document.querySelectorAll("main section[id]");
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  let currentId = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      currentId = section.id;
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });

  toTop.classList.toggle("show", window.scrollY > 500);
});

toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
