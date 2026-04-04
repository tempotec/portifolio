const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const revealItems = document.querySelectorAll(".reveal");
const sectionEntries = navLinks
  .map((link) => {
    const selector = link.getAttribute("href");
    const section = selector ? document.querySelector(selector) : null;

    if (!section) {
      return null;
    }

    return {
      link,
      section,
      id: section.id,
    };
  })
  .filter(Boolean);

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const setActiveLink = () => {
  const viewportTrigger = window.innerHeight * 0.35;
  const orderedEntries = [...sectionEntries].sort(
    (first, second) => first.section.offsetTop - second.section.offsetTop
  );
  let currentId = orderedEntries[0]?.id;

  orderedEntries.forEach((entry) => {
    const top = entry.section.getBoundingClientRect().top;

    if (top <= viewportTrigger) {
      currentId = entry.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("is-active", isActive);
  });
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", setActiveLink);
window.addEventListener("resize", setActiveLink);
