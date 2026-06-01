(function () {
  function plain(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function durationLabel(value) {
    const raw = String(value || "");
    const text = plain(raw);
    const time = raw.match(/\(([^)]+)\)/)?.[1];
    if (text.includes("3 ngay")) return "3 days 2 nights";
    if (text.includes("2 ngay")) return "2 days 1 night";
    if (text.includes("1 ngay")) return time ? `1 day (${time})` : "1 day";
    if (text.includes("toi")) return time ? `Evening (${time})` : "Evening";
    return raw || "Curated voyage";
  }

  const posts = [
    {
      title: "Signature Amenities Aboard Catherine Cruises",
      date: "05 Jan 2026",
      category: "Amenities",
      excerpt:
        "A closer look at the onboard spaces that turn a cruise into a complete retreat: wellness, recreation, quiet corners and thoughtful service.",
      image: "assets/images/facility-spa.jpg"
    },
    {
      title: "Butler Service Aboard Catherine Cruises",
      date: "19 Jan 2026",
      category: "Luxury Service",
      excerpt:
        "How discreet personal service elevates the journey for guests who value privacy, timing and effortless attention to detail.",
      image: "assets/images/facility-aurora.jpg"
    },
    {
      title: "Inside the 200m2 Villa President",
      date: "09 Jan 2026",
      category: "Suite",
      excerpt:
        "A 200m2 private statement suite with panoramic views, refined living space, private sundeck and signature privileges.",
      image: "assets/images/hero-1.jpg"
    },
    {
      title: "A Minimal Packing Checklist for Cruising",
      date: "02 Dec 2025",
      category: "Travel Guide",
      excerpt:
        "A minimal packing guide for guests who want to travel lightly while remaining polished from excursion to dinner.",
      image: "assets/images/gallery-2.jpg"
    },
    {
      title: "Indochine Architecture Aboard Catherine",
      date: "07 Nov 2025",
      category: "Design",
      excerpt:
        "The design language behind Catherine: Indochine warmth, European restraint and contemporary spatial discipline.",
      image: "assets/images/facility-oceania.jpg"
    },
    {
      title: "Private Events & M.I.C.E Aboard Catherine",
      date: "17 Dec 2025",
      category: "Event",
      excerpt:
        "A guide to private dining, weddings, executive retreats and social gatherings designed around the rhythm of the bay.",
      image: "assets/images/gallery-3.jpg"
    }
  ];

  const blogGrid = document.getElementById("blogGrid");
  if (blogGrid) {
    blogGrid.innerHTML = posts
      .map(
        (post) => `
      <article class="blog-card reveal">
        <img src="${post.image}" alt="${post.title}">
        <div class="blog-card-body">
          <p class="date">${post.date} · ${post.category}</p>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <a href="inquiry.html" class="btn btn-outline" style="margin-top:.8rem;">Plan My Voyage</a>
        </div>
      </article>
    `
      )
      .join("");
  }

  const latestList = document.getElementById("latestItineraries");
  if (latestList && window.CATALOG_DATA?.itineraries) {
    latestList.innerHTML = window.CATALOG_DATA.itineraries
      .slice(0, 5)
      .map((it) => `<li><strong>${it.itinerary_name_en}</strong><br>${durationLabel(it.duration)}</li>`)
      .join("");
  }

  window.refreshReveal?.();
})();
