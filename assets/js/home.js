(function () {
  const data = window.CATALOG_DATA;
  if (!data) return;

  const cruises = data.cruises || [];
  const itineraries = data.itineraries || [];
  const rooms = data.roomTypes || [];
  const contacts = data.contacts || [];

  const cruiseMap = Object.fromEntries(cruises.map((cruise) => [cruise.cruise_id, cruise]));

  const cruiseImages = {
    CAT: "assets/images/collection-catherine-overhead.png",
    HRZ: "assets/images/collection-horizon-overhead.png"
  };

  const cruiseEditorial = {
    CAT: {
      id: "catherine-cruise",
      badge: "Overnight",
      tagline: "Timeless Indochine elegance",
      copy: "An overnight luxury vessel for guests who want to slow down, stay aboard and discover Ha Long Bay with depth, privacy and refined hospitality."
    },
    HRZ: {
      id: "catherine-horizon",
      badge: "Day & Night",
      tagline: "Sailing beyond the horizon",
      copy: "A modern Mediterranean-inspired day and night cruise shaped by sunset, cuisine, music and open-air celebration."
    }
  };

  const itineraryStories = {
    "IT-CAT-2D1N": {
      chapter: "I",
      mood: "First Night on the Bay",
      image: "assets/images/collection-catherine-overhead.png",
      line: "Arrive by noon, leave the mainland behind, dine as the bay turns quiet, then wake early for Luon Cave."
    },
    "IT-CAT-3D2N": {
      chapter: "II",
      mood: "A Deeper Passage",
      image: "assets/images/gallery-2.jpg",
      line: "More time, more stillness: Surprise Cave, Titop Island, Trinh Nu Cave, Three Peach Beach and Pearl Farm unfold at an unhurried pace."
    },
    "IT-HRZ-DAY": {
      chapter: "III",
      mood: "Daylight Edit",
      image: "assets/images/hero-2.jpg",
      line: "A bright day route for guests who want the icons of Ha Long Bay with lunch, open decks and a clean return before sunset."
    },
    "IT-HRZ-DAYPLUS": {
      chapter: "IV",
      mood: "Expanded Discovery",
      image: "assets/images/gallery-1.jpg",
      line: "A fuller day with Titop Island and Sung Sot Cave added to the rhythm, designed for guests who want a little more movement."
    },
    "IT-HRZ-NIGHT": {
      chapter: "V",
      mood: "Dinner After Gold",
      image: "assets/images/facility-aurora.jpg",
      line: "Board at dusk, let the city lights rise around the bay, and turn dinner into the evening's main event."
    }
  };

  const roomPrivileges = {
    "R-VP": "Wine welcome, fresh fruit, private butler, 60-minute body massage and two-way limousine transfer.",
    "R-GS": "Fresh fruit welcome and a 30-minute body massage.",
    "R-RS": "Fresh fruit welcome and a 30-minute foot massage.",
    "R-PS": "Fresh fruit welcome and flexible bed configurations."
  };

  const suiteFacts = {
    "R-VP": {
      role: "Flagship private residence",
      view: "Panoramic Ha Long Bay view",
      privilege: "Butler, wine, massage, limousine"
    },
    "R-GS": {
      role: "Large balcony suite",
      view: "Sea-view balcony",
      privilege: "Fruit welcome, body massage"
    },
    "R-RS": {
      role: "Upper-deck privacy",
      view: "Private terrace and bay view",
      privilege: "Fruit welcome, foot massage"
    },
    "R-PS": {
      role: "Flexible cabin category",
      view: "Sea-view balcony",
      privilege: "Double, Twin, Triple, Connecting"
    }
  };

  const roomImages = {
    "R-VP": "assets/images/hero-1.jpg",
    "R-GS": "assets/images/gallery-4.jpg",
    "R-RS": "assets/images/gallery-2.jpg",
    "R-PS": "assets/images/facility-oceania.jpg"
  };

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

  function portLabel(value) {
    const text = plain(value);
    if (text.includes("tuan chau")) return "Tuan Chau International Marina";
    if (text.includes("sun") || text.includes("ha long")) return "Ha Long International Cruise Port";
    return String(value || "Available on request");
  }

  function deckLabel(value) {
    const raw = String(value || "");
    const text = plain(raw);
    if (!raw) return "Onboard";
    if (text.includes("tang ham")) return "Basement";
    if (text.includes("cao nhat")) return "Top deck";
    const numberMatch = text.match(/tang\s+([0-9](?:,\s*[0-9])?(?:\s*&\s*[0-9])?)/);
    if (numberMatch) return `Deck ${numberMatch[1].replace(/,/g, ",")}`;
    return raw;
  }

  function occupancyLabel(value) {
    if (typeof value === "number") return `${value} guests`;
    const text = plain(value);
    if (text.includes("2-3")) return "2-3 guests";
    return `${value || 2} guests`;
  }

  function surchargeLabel(value) {
    return plain(value).includes("co") ? "Surcharge may apply" : "Included in proposal";
  }

  function quoteUrl(params) {
    return `inquiry.html?${new URLSearchParams(params).toString()}`;
  }

  const heroSlides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  let activeIndex = 0;

  function setHero(index) {
    heroSlides[activeIndex]?.classList.remove("active");
    dots[activeIndex]?.classList.remove("active");
    activeIndex = index;
    heroSlides[activeIndex]?.classList.add("active");
    dots[activeIndex]?.classList.add("active");
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => setHero(idx));
  });

  if (heroSlides.length > 1) {
    setInterval(() => {
      const next = (activeIndex + 1) % heroSlides.length;
      setHero(next);
    }, 5400);
  }

  const homeCruiseCards = document.getElementById("homeCruiseCards");
  if (homeCruiseCards) {
    homeCruiseCards.innerHTML = cruises
      .map((cruise) => {
        const editorial = cruiseEditorial[cruise.cruise_id] || {};
        return `
          <article id="${editorial.id || cruise.cruise_id}" class="blueprint-cruise-card reveal">
            <div class="cruise-card-image">
              <img src="${cruiseImages[cruise.cruise_id] || "assets/images/hero-1.jpg"}" alt="${cruise.cruise_name}" loading="lazy" />
              <span>${editorial.badge || cruise.cruise_type}</span>
            </div>
            <div class="cruise-card-body">
              <p class="meta">${cruise.cruise_type} · Launch ${cruise.launch_year}</p>
              <h3>${cruise.cruise_name}</h3>
              <p><strong>${editorial.tagline || "Luxury Ha Long Bay cruise"}</strong></p>
              <p>${editorial.copy || cruise.story_en}</p>
              <p class="quote-line">Contact for quote</p>
              <div class="card-actions">
                <a class="btn btn-outline" href="cruises.html">Explore</a>
                <a class="btn btn-gold" href="${quoteUrl({ cruise: cruise.cruise_id })}">Request a Quote</a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  const homeItineraryTabs = document.getElementById("homeItineraryTabs");
  const homeItineraryCards = document.getElementById("homeItineraryCards");

  function renderHomeItineraries(type = "") {
    if (!homeItineraryCards) return;
    const list = itineraries.filter((itinerary) => !type || itinerary.type === type);
    homeItineraryCards.innerHTML = list
      .map((itinerary) => {
        const cruise = cruiseMap[itinerary.cruise_id];
        const story = itineraryStories[itinerary.itinerary_id] || {
          chapter: "I",
          mood: itinerary.itinerary_name_en,
          image: "assets/images/gallery-1.jpg",
          line: itinerary.route_highlights_en
        };
        return `
          <article class="itinerary-story-card reveal">
            <div class="itinerary-story-media">
              <img src="${story.image}" alt="${story.mood}" loading="lazy" />
              <span>${story.chapter}</span>
            </div>
            <div class="itinerary-story-body">
              <p class="meta">${cruise?.cruise_name || itinerary.cruise_id} · ${durationLabel(itinerary.duration)}</p>
              <h3>${story.mood}</h3>
              <p>${story.line}</p>
              <div class="route-line">${itinerary.route_highlights_en}</div>
              <div class="itinerary-story-footer">
                <span>${itinerary.type} · ${surchargeLabel(itinerary.has_surcharge)}</span>
                <a href="${quoteUrl({ cruise: itinerary.cruise_id, itinerary: itinerary.itinerary_id })}">Plan this voyage</a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
    window.refreshReveal?.();
  }

  if (homeItineraryTabs) {
    homeItineraryTabs.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-type]");
      if (!button) return;
      homeItineraryTabs.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderHomeItineraries(button.dataset.type || "");
    });
  }

  renderHomeItineraries("");

  const homeSuiteCards = document.getElementById("homeSuiteCards");
  if (homeSuiteCards) {
    homeSuiteCards.innerHTML = rooms
      .filter((room) => room.cruise_id === "CAT")
      .map((room, index) => {
        const facts = suiteFacts[room.room_id] || {
          role: "Overnight suite",
          view: "Ha Long Bay view",
          privilege: roomPrivileges[room.room_id] || "Privileges tailored on request."
        };
        const suiteNumber = String(index + 1).padStart(2, "0");
        return `
          <article class="suite-compare-card reveal">
            <img src="${roomImages[room.room_id] || "assets/images/gallery-4.jpg"}" alt="${room.room_type_name_en}" loading="lazy" />
            <div class="suite-compare-body">
              <div class="suite-compare-head">
                <p>${suiteNumber} / ${facts.role}</p>
                <h3>${room.room_type_name_en}</h3>
              </div>
              <div class="suite-fact-grid">
                <span><strong>${room.size_m2}m2</strong><em>Suite size</em></span>
                <span><strong>${deckLabel(room.floor_location)}</strong><em>Location</em></span>
                <span><strong>${occupancyLabel(room.max_occupancy)}</strong><em>Occupancy</em></span>
              </div>
              <p class="suite-line"><strong>View</strong>${facts.view}</p>
              <p class="suite-line"><strong>Privileges</strong>${facts.privilege}</p>
              <a class="suite-request-link" href="${quoteUrl({ cruise: "CAT", room: room.room_id })}">Request this suite</a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  const quickForm = document.getElementById("homeQuickInquiry");
  const quickCruise = document.getElementById("homeCruise");
  const quickItinerary = document.getElementById("homeItinerary");
  const quickDate = document.getElementById("homeDate");
  const quickGuests = document.getElementById("homeGuests");
  const quickRoom = document.getElementById("homeRoom");
  const quickRoomWrap = document.getElementById("homeRoomWrap");

  function renderQuickCruises() {
    if (!quickCruise) return;
    quickCruise.innerHTML = cruises
      .map((cruise) => `<option value="${cruise.cruise_id}">${cruise.cruise_name}</option>`)
      .join("");
  }

  function renderQuickItineraries() {
    if (!quickItinerary || !quickCruise) return;
    const list = itineraries.filter((itinerary) => itinerary.cruise_id === quickCruise.value);
    quickItinerary.innerHTML = list
      .map((itinerary) => `<option value="${itinerary.itinerary_id}">${itinerary.itinerary_name_en} (${durationLabel(itinerary.duration)})</option>`)
      .join("");
  }

  function renderQuickRooms() {
    if (!quickRoom || !quickCruise || !quickRoomWrap) return;
    const isCatherine = quickCruise.value === "CAT";
    quickRoomWrap.style.display = isCatherine ? "block" : "none";
    quickRoom.innerHTML = ['<option value="">No preference</option>']
      .concat(
        rooms
          .filter((room) => room.cruise_id === "CAT")
          .map((room) => `<option value="${room.room_id}">${room.room_type_name_en}</option>`)
      )
      .join("");
  }

  function setQuickDate() {
    if (!quickDate) return;
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const min = now.toISOString().slice(0, 10);
    quickDate.min = min;
    quickDate.value = min;
  }

  renderQuickCruises();
  renderQuickItineraries();
  renderQuickRooms();
  setQuickDate();

  quickCruise?.addEventListener("change", () => {
    renderQuickItineraries();
    renderQuickRooms();
  });

  quickForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const params = {
      cruise: quickCruise?.value || "",
      itinerary: quickItinerary?.value || "",
      date: quickDate?.value || "",
      adults: quickGuests?.value || "2",
      room: quickRoom?.value || ""
    };
    window.location.href = quoteUrl(params);
  });

  const footerContact = document.getElementById("footerContact");
  if (footerContact && contacts.length) {
    const catHanoi = contacts.find((contact) => contact.contact_id === "C-CAT-HN") || contacts[0];
    const catPort = contacts.find((contact) => contact.contact_id === "C-CAT-HL") || contacts[1] || catHanoi;
    const horizonHanoi = contacts.find((contact) => contact.contact_id === "C-HRZ-HN") || contacts[2] || catHanoi;
    const horizonPort = contacts.find((contact) => contact.contact_id === "C-HRZ-HL") || contacts[3] || catPort;
    footerContact.innerHTML = `
      <h4>Contact</h4>
      <p><strong>Catherine Cruise</strong></p>
      <p>${catHanoi.office_type}: ${catHanoi.address}</p>
      <p>${catPort.office_type}: ${catPort.address}</p>
      <p>Hotline: ${catHanoi.hotline}</p>
      <p>Email: ${catHanoi.email}</p>
      <p style="margin-top:.55rem;"><strong>Catherine Horizon</strong></p>
      <p>${horizonHanoi.office_type}: ${horizonHanoi.address}</p>
      <p>${horizonPort.office_type}: ${horizonPort.address}</p>
      <p>Email: ${horizonHanoi.email}</p>
    `;
  }

  window.refreshReveal?.();
})();
