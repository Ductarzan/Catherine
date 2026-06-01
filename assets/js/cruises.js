(function () {
  const data = window.CATALOG_DATA;
  if (!data) return;

  const cruiseMap = Object.fromEntries((data.cruises || []).map((c) => [c.cruise_id, c]));
  const roomTypes = data.roomTypes || [];
  const bedConfigs = data.bedConfigs || [];
  const itineraries = data.itineraries || [];
  const schedule = data.schedule || [];
  const facilities = data.facilities || [];
  const services = data.services || [];

  const cruiseEditorial = {
    CAT: "Catherine Cruise is designed as an overnight retreat: spacious suites, layered dining, wellness rituals and a slower rhythm through Ha Long Bay.",
    HRZ: "Catherine Horizon brings a brighter day and night experience: generous capacity, social dining spaces, sunset energy and flexible event potential."
  };

  const roomPrivileges = {
    "R-VP": "Wine welcome, fresh fruit, private butler, 60-minute body massage and two-way limousine transfer.",
    "R-GS": "Fresh fruit welcome and a 30-minute body massage.",
    "R-RS": "Fresh fruit welcome and a 30-minute foot massage.",
    "R-PS": "Fresh fruit welcome and sea-view private balcony."
  };

  function plain(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function cleanEnglish(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/Canape[\u0300-\u036f]/g, "Canape");
  }

  function enhancementLabel(value) {
    const text = plain(value);
    if (text.includes("co")) return "Optional enhancement";
    if (text.includes("khong")) return "Included";
    return "Included";
  }

  function inclusionLabel(value) {
    const text = plain(value);
    if (text.includes("khuyen")) return "Seasonal privilege";
    if (text.includes("mot phan")) return "Suite-dependent privilege";
    if (text.includes("co")) return "Included";
    if (text.includes("khong")) return "Available on request";
    return "Available on request";
  }

  function hasSurcharge(value) {
    return plain(value).includes("co");
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
    return String(value || "Port");
  }

  function deckLabel(value) {
    const raw = String(value || "");
    const text = plain(raw);
    if (!raw) return "Onboard";
    if (text.includes("tang ham")) return "Basement";
    if (text.includes("cao nhat")) return "Top deck";
    const numberMatch = text.match(/tang\s+([0-9](?:\s*&\s*[0-9])?)/);
    if (numberMatch) {
      const decks = numberMatch[1].replace(/\s+/g, " ");
      return decks.includes("&") ? `Decks ${decks}` : `Deck ${decks}`;
    }
    const deckMatch = raw.match(/Deck\s*[0-9]/i);
    if (deckMatch) return raw;
    return raw;
  }

  function occupancyLabel(value) {
    if (typeof value === "number") return `${value} guests`;
    const text = plain(value);
    if (text.includes("2-3")) return "2-3 guests, depending on bed configuration";
    if (text.includes("4")) return "4 guests";
    return `${value || 2} guests`;
  }

  function capacityLabel(value) {
    const raw = String(value || "");
    const text = plain(raw);
    if (!raw) return "";
    const number = raw.match(/\d+/)?.[0];
    if (text.includes("giuong")) return `${number || raw} massage beds`;
    if (text.includes("ghe")) return `${number || raw} lounge chairs`;
    if (text.includes("khach")) return `${number || raw} guests`;
    return raw;
  }

  function displayType(value) {
    return String(value || "Experience")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const cruiseCatalog = document.getElementById("catalogCruises");
  if (cruiseCatalog) {
    cruiseCatalog.innerHTML = (data.cruises || [])
      .map(
        (cruise) => `
      <article class="card reveal">
        <div class="card-body">
          <p class="meta">${cruise.cruise_type} · Launch ${cruise.launch_year}</p>
          <h3>${cruise.cruise_name}</h3>
          <p>${cleanEnglish(cruiseEditorial[cruise.cruise_id] || cruise.story_en)}</p>
          <p>${cleanEnglish(cruise.story_en)}</p>
          <div class="tag-list" style="margin-top:.72rem;">
            <span class="tag gold">${cruise.length_m}m length</span>
            <span class="tag gold">${cruise.width_m}m width</span>
            <span class="tag gold">${cruise.decks} decks</span>
            <span class="tag gold">${cruise.total_cabins_or_capacity}</span>
          </div>
        </div>
      </article>
    `
      )
      .join("");
  }

  const roomGrid = document.getElementById("roomGrid");
  if (roomGrid) {
    const catRooms = roomTypes.filter((room) => room.cruise_id === "CAT");
    roomGrid.innerHTML = catRooms
      .map((room) => {
        const relatedBeds = bedConfigs.filter((bed) => bed.room_id === room.room_id);
        const bedBlock =
          relatedBeds.length > 0
            ? `<div class="tag-list" style="margin-top:.55rem;">${relatedBeds
                .map((bed) => `<span class="tag">${bed.config_name}: ${occupancyLabel(bed.max_occupancy)}</span>`)
                .join("")}</div>`
            : "";

        return `
          <article class="card reveal">
            <div class="card-body">
              <p class="meta">${deckLabel(room.floor_location)} · ${room.size_m2}m2</p>
              <h3>${room.room_type_name_en}</h3>
              <p>${cleanEnglish(room.description_en)}</p>
              <p>Designed for privacy, generous views and a sense of calm that carries from morning light to evening service.</p>
              <div class="tag-list" style="margin-top:.65rem;">
                <span class="tag gold">${room.size_m2}m2</span>
                <span class="tag gold">${deckLabel(room.floor_location)}</span>
                <span class="tag gold">${occupancyLabel(room.max_occupancy)}</span>
              </div>
              <p style="margin-top:.55rem;color:var(--muted);font-size:.88rem;">Privileges: ${roomPrivileges[room.room_id] || "Tailored on request"}</p>
              ${bedBlock}
            </div>
          </article>
        `;
      })
      .join("");
  }

  const itineraryFilter = document.getElementById("itineraryFilter");
  const itineraryCards = document.getElementById("itineraryCatalog");
  const schedulePicker = document.getElementById("schedulePicker");
  const scheduleList = document.getElementById("scheduleList");

  function renderItineraryCards(cruiseId) {
    const filtered = itineraries.filter((it) => !cruiseId || it.cruise_id === cruiseId);
    itineraryCards.innerHTML = filtered
      .map(
        (it) => `
        <article class="card reveal">
          <div class="card-body">
            <p class="meta">${cruiseMap[it.cruise_id]?.cruise_name || it.cruise_id} · ${durationLabel(it.duration)}</p>
            <h3>${it.itinerary_name_en}</h3>
            <p>${cleanEnglish(it.route_highlights_en)}</p>
            <p>Balanced for guests who want the bay's icons without losing the ease of a luxury retreat.</p>
            <div class="tag-list" style="margin-top:.66rem;">
              <span class="tag">Departure: ${portLabel(it.departure_port_vn)}</span>
              <span class="tag">Return: ${portLabel(it.return_port_vn)}</span>
              <span class="tag ${hasSurcharge(it.has_surcharge) ? "warn" : "gold"}">${enhancementLabel(it.has_surcharge)}</span>
            </div>
          </div>
        </article>
      `
      )
      .join("");
  }

  function renderSchedule(itineraryId) {
    const points = schedule
      .filter((row) => row.itinerary_id === itineraryId)
      .sort((a, b) => Number(a.day_number) - Number(b.day_number));

    scheduleList.innerHTML = points
      .map(
        (point) => `
      <article class="schedule-item">
        <div class="schedule-time">Day ${point.day_number}<br>${point.time}</div>
        <div class="schedule-text">
          <strong>${cleanEnglish(point.activity_en)}</strong><br>
          <span>${point.location}</span>
        </div>
      </article>
    `
      )
      .join("");
  }

  if (itineraryFilter) {
    itineraryFilter.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-cruise]");
      if (!button) return;
      itineraryFilter.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      renderItineraryCards(button.dataset.cruise || "");
    });
  }

  if (schedulePicker) {
    schedulePicker.innerHTML = itineraries
      .map((it) => `<option value="${it.itinerary_id}">${it.itinerary_name_en} · ${durationLabel(it.duration)}</option>`)
      .join("");
    schedulePicker.addEventListener("change", () => renderSchedule(schedulePicker.value));
    renderSchedule(schedulePicker.value);
  }

  renderItineraryCards("");

  const facilityGrid = document.getElementById("facilityGrid");
  if (facilityGrid) {
    const imageMap = {
      "F-CAT-01": "assets/images/gallery-4.jpg",
      "F-CAT-02": "assets/images/facility-panorama.jpg",
      "F-CAT-03": "assets/images/facility-oceania.jpg",
      "F-CAT-04": "assets/images/facility-aurora.jpg",
      "F-CAT-10": "assets/images/facility-spa.jpg",
      "F-HRZ-02": "assets/images/facility-oceania.jpg",
      "F-HRZ-03": "assets/images/facility-panorama.jpg",
      "F-HRZ-04": "assets/images/facility-aurora.jpg",
      "F-HRZ-08": "assets/images/facility-spa.jpg"
    };

    facilityGrid.innerHTML = facilities
      .map((f) => {
        const image = imageMap[f.facility_id] || "assets/images/gallery-1.jpg";
        const capacity = capacityLabel(f.capacity);
        return `
        <article class="card reveal">
          <img class="card-media" src="${image}" alt="${cleanEnglish(f.facility_name_en)}">
          <div class="card-body">
            <p class="meta">${cruiseMap[f.cruise_id]?.cruise_name || f.cruise_id} · ${displayType(f.facility_type)}</p>
            <h3>${cleanEnglish(f.facility_name_en)}</h3>
            <p>${cleanEnglish(f.description_en)}</p>
            <p>A considered space within the onboard journey, shaped for comfort, service and visual calm.</p>
            <div class="tag-list" style="margin-top:.6rem;">
              <span class="tag gold">${deckLabel(f.floor_location)}</span>
              ${capacity ? `<span class="tag">${capacity}</span>` : ""}
            </div>
          </div>
        </article>
      `;
      })
      .join("");
  }

  const serviceGrid = document.getElementById("serviceGrid");
  if (serviceGrid) {
    serviceGrid.innerHTML = services
      .map(
        (svc) => `
        <article class="service-item reveal">
          <h4>${cleanEnglish(svc.service_name_en)}</h4>
          <p>${cleanEnglish(svc.description_en)}</p>
          <p>Available as part of the voyage or as a tailored enhancement depending on your itinerary and suite preference.</p>
          <div class="tag-list">
            <span class="tag gold">${cruiseMap[svc.cruise_id]?.cruise_name || svc.cruise_id}</span>
            <span class="tag gold">${inclusionLabel(svc.included_in_package)}</span>
            <span class="tag ${hasSurcharge(svc.has_surcharge) ? "warn" : "gold"}">${enhancementLabel(svc.has_surcharge)}</span>
          </div>
        </article>
      `
      )
      .join("");
  }

  window.refreshReveal?.();
})();
