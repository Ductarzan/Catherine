(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const siteHeader = document.querySelector(".site-header");

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });
  }

  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });

  function updateHeaderState() {
    siteHeader?.classList.toggle("is-scrolled", window.scrollY > 60);
  }

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  function revealPassedElements() {
    document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.classList.add("in-view");
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.08 }
  );

  window.refreshReveal = function refreshReveal() {
    document.querySelectorAll(".reveal:not([data-reveal-bound])").forEach((el) => {
      el.setAttribute("data-reveal-bound", "true");
      observer.observe(el);
    });
    revealPassedElements();
  };

  window.refreshReveal();

  const mutationObserver = new MutationObserver(() => window.refreshReveal());
  mutationObserver.observe(document.body, { childList: true, subtree: true });

  window.addEventListener("scroll", revealPassedElements, { passive: true });
  window.addEventListener("resize", revealPassedElements);
  window.addEventListener("load", () => {
    window.refreshReveal();
    revealPassedElements();
  });
  setInterval(revealPassedElements, 250);

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const newsletterForms = document.querySelectorAll(".newsletter-form");
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = form.querySelector("input[type='email']")?.value?.trim();
      if (!email) return;
      const status = form.closest(".newsletter")?.querySelector("[data-news-status]");
      if (status) {
        status.textContent = "Thank you. Catherine's concierge team will be in touch with curated updates.";
      }
      form.reset();
    });
  });

  const floatingContact = document.querySelector(".floating-contact");
  if (floatingContact && window.CATALOG_DATA?.contacts?.length) {
    const catContact = window.CATALOG_DATA.contacts.find((c) => c.cruise_id === "CAT") || window.CATALOG_DATA.contacts[0];
    const phoneRaw = String(catContact.hotline || "0911 28 2222").replace(/[^\d+]/g, "");
    const phoneIntl = phoneRaw.startsWith("0") ? `+84${phoneRaw.slice(1)}` : phoneRaw;
    const waPhone = phoneIntl.replace("+", "");
    floatingContact.querySelector("a.call")?.setAttribute("href", `tel:${phoneIntl}`);
    floatingContact.querySelector("a.wa")?.setAttribute("href", `https://wa.me/${waPhone}`);
    floatingContact.querySelector("a.ms")?.setAttribute("href", "https://www.facebook.com/catherinecruises");
  }
})();
