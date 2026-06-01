(function () {
  const data = window.CATALOG_DATA;
  if (!data) return;

  function plain(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
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

  function nightsFor(itinerary) {
    const text = plain(itinerary?.duration);
    if (text.includes("3 ngay")) return 2;
    if (text.includes("2 ngay")) return 1;
    return 0;
  }

  const cruises = data.cruises || [];
  const itineraries = data.itineraries || [];
  const roomTypes = (data.roomTypes || []).filter((room) => room.cruise_id === "CAT");
  const bedConfigs = data.bedConfigs || [];
  const surchargeServices = (data.services || []).filter((service) => hasSurcharge(service.has_surcharge));
  const contacts = data.contacts || [];

  const form = document.getElementById("inquiryForm");
  if (!form) return;

  const els = {
    fullName: form.querySelector("#full_name"),
    email: form.querySelector("#email"),
    phone: form.querySelector("#phone"),
    country: form.querySelector("#country"),
    cruise: form.querySelector("#cruise_choice"),
    itinerary: form.querySelector("#itinerary_choice"),
    checkin: form.querySelector("#checkin_date"),
    nights: form.querySelector("#duration_nights"),
    adults: form.querySelector("#num_adults"),
    children: form.querySelector("#num_children"),
    infants: form.querySelector("#num_infants"),
    roomWrap: form.querySelector("#roomWrap"),
    room: form.querySelector("#room_preference"),
    bedWrap: form.querySelector("#bedWrap"),
    bed: form.querySelector("#bed_config"),
    addonWrap: form.querySelector("#addonsWrap"),
    requests: form.querySelector("#special_requests"),
    source: form.querySelector("#source"),
    status: form.querySelector("#formStatus")
  };

  const sourceOptions = ["Google", "Facebook", "Instagram", "Friend", "TripAdvisor", "Travel advisor", "Event partner", "Other"];

  const countries = [
    "Vietnam", "United States", "United Kingdom", "Australia", "Canada", "France", "Germany", "Italy", "Spain", "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden", "Norway", "Denmark", "Finland", "Ireland", "Portugal", "Poland", "Czech Republic", "Hungary", "Romania", "Russia", "Japan", "South Korea", "China", "Taiwan", "Hong Kong", "Singapore", "Malaysia", "Thailand", "Indonesia", "Philippines", "India", "UAE", "Saudi Arabia", "Qatar", "Kuwait", "South Africa", "Brazil", "Mexico", "Argentina"
  ];

  function renderCountries() {
    els.country.innerHTML = ['<option value="">Select nationality</option>']
      .concat(countries.map((country) => `<option value="${country}">${country}</option>`))
      .join("");
  }

  function renderCruises() {
    els.cruise.innerHTML = cruises
      .map((cruise) => `<option value="${cruise.cruise_id}">${cruise.cruise_name} (${cruise.cruise_type})</option>`)
      .join("");
  }

  function renderSources() {
    els.source.innerHTML = ['<option value="">Select source</option>']
      .concat(sourceOptions.map((source) => `<option value="${source}">${source}</option>`))
      .join("");
  }

  function renderItineraries() {
    const selectedCruise = els.cruise.value;
    const list = itineraries.filter((it) => it.cruise_id === selectedCruise);
    els.itinerary.innerHTML = list
      .map((it) => `<option value="${it.itinerary_id}">${it.itinerary_name_en} (${durationLabel(it.duration)})</option>`)
      .join("");
    applyDurationFromItinerary();
  }

  function renderRoomTypes() {
    els.room.innerHTML = ['<option value="">Select suite category</option>']
      .concat(roomTypes.map((room) => `<option value="${room.room_id}">${room.room_type_name_en} (${room.size_m2}m2)</option>`))
      .join("");
  }

  function renderBedConfigs() {
    const selectedRoom = els.room.value;
    const configs = bedConfigs.filter((bed) => bed.room_id === selectedRoom);
    els.bed.innerHTML = ['<option value="">Select bed configuration</option>']
      .concat(configs.map((cfg) => `<option value="${cfg.bed_config_id}">${cfg.config_name} - ${cfg.bed_setup}</option>`))
      .join("");
  }

  function renderAddons() {
    const selectedCruise = els.cruise.value;
    const options = surchargeServices.filter((service) => service.cruise_id === selectedCruise);
    if (options.length === 0) {
      els.addonWrap.innerHTML = "<p class='help'>No paid enhancement is required for this selection. Concierge can still tailor special arrangements on request.</p>";
      return;
    }

    els.addonWrap.innerHTML = `
      <div class="checkbox-grid">
        ${options
          .map(
            (item, index) => `
          <div class="checkbox-item">
            <input type="checkbox" id="addon_${index}" name="addons" value="${item.service_name_en}">
            <label for="addon_${index}">${item.service_name_en}</label>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  function applyDurationFromItinerary() {
    const itinerary = itineraries.find((it) => it.itinerary_id === els.itinerary.value);
    els.nights.value = itinerary ? nightsFor(itinerary) : "";
  }

  function toggleConditionalFields() {
    const isCatherine = els.cruise.value === "CAT";
    els.roomWrap.style.display = isCatherine ? "block" : "none";
    if (!isCatherine) {
      els.room.value = "";
      els.bedWrap.style.display = "none";
      els.bed.value = "";
    }

    const isPremier = els.room.value === "R-PS";
    els.bedWrap.style.display = isPremier ? "block" : "none";
    if (!isPremier) {
      els.bed.value = "";
    }
  }

  function renderContacts() {
    const container = document.getElementById("inquiryContacts");
    if (!container) return;
    container.innerHTML = contacts
      .map(
        (contact) => `
        <article class="contact-card">
          <h4>${contact.office_type} · ${contact.cruise_id}</h4>
          <p>${contact.address}</p>
          <p>Hotline: ${contact.hotline}</p>
          <p>Email: ${contact.email}</p>
        </article>
      `
      )
      .join("");
  }

  function setDateMin() {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    els.checkin.min = now.toISOString().slice(0, 10);
  }

  function showStatus(type, message) {
    els.status.className = `status-box ${type}`;
    els.status.textContent = message;
  }

  function parseQueryPrefill() {
    const params = new URLSearchParams(window.location.search);
    const cruise = params.get("cruise");
    if (cruise && cruises.some((item) => item.cruise_id === cruise)) {
      els.cruise.value = cruise;
      renderItineraries();
      renderAddons();
      toggleConditionalFields();
    }

    const itinerary = params.get("itinerary");
    if (itinerary && itineraries.some((item) => item.itinerary_id === itinerary)) {
      els.itinerary.value = itinerary;
      applyDurationFromItinerary();
    }

    const date = params.get("date");
    if (date) els.checkin.value = date;

    const adults = params.get("adults");
    if (adults) els.adults.value = adults;

    const room = params.get("room");
    if (room && roomTypes.some((item) => item.room_id === room)) {
      els.room.value = room;
      renderBedConfigs();
      toggleConditionalFields();
    }

    const source = params.get("source");
    if (source) {
      const sourceOption = Array.from(els.source.options).find((option) => option.value.toLowerCase() === source.toLowerCase());
      els.source.value = sourceOption ? sourceOption.value : "Other";
    }
  }

  function collectAddons() {
    return Array.from(form.querySelectorAll("input[name='addons']:checked")).map((input) => input.value);
  }

  function validate() {
    if (!els.fullName.value.trim() || els.fullName.value.trim().length < 2) {
      return "Please enter a valid full name.";
    }

    if (!els.email.value.trim()) {
      return "Please enter your email address.";
    }

    const phone = els.phone.value.trim();
    if (!/^\+?[0-9\s\-()]{8,20}$/.test(phone)) {
      return "Please enter a valid international phone number.";
    }

    if (!els.country.value) {
      return "Please select your nationality.";
    }

    if (!els.cruise.value || !els.itinerary.value) {
      return "Please select your preferred cruise and voyage.";
    }

    if (!els.checkin.value) {
      return "Please select your desired departure date.";
    }

    const selectedDate = new Date(els.checkin.value + "T00:00:00");
    const minDate = new Date(els.checkin.min + "T00:00:00");
    if (selectedDate < minDate) {
      return `Departure date must be from ${els.checkin.min} onward.`;
    }

    if (Number(els.adults.value || 0) < 1) {
      return "At least one adult guest is required.";
    }

    return "";
  }

  renderCountries();
  renderCruises();
  renderSources();
  renderRoomTypes();
  renderItineraries();
  renderBedConfigs();
  renderAddons();
  renderContacts();
  setDateMin();
  toggleConditionalFields();
  parseQueryPrefill();

  els.cruise.addEventListener("change", () => {
    renderItineraries();
    renderAddons();
    toggleConditionalFields();
  });

  els.itinerary.addEventListener("change", applyDurationFromItinerary);

  els.room.addEventListener("change", () => {
    renderBedConfigs();
    toggleConditionalFields();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const error = validate();
    if (error) {
      showStatus("error", error);
      return;
    }

    const summary = {
      fullName: els.fullName.value.trim(),
      cruise: cruises.find((item) => item.cruise_id === els.cruise.value)?.cruise_name || "",
      itinerary: itineraries.find((item) => item.itinerary_id === els.itinerary.value)?.itinerary_name_en || "",
      date: els.checkin.value,
      guests: `${els.adults.value || 0} adults, ${els.children.value || 0} children, ${els.infants.value || 0} infants`,
      room: els.room.options[els.room.selectedIndex]?.text || "",
      addons: collectAddons().join(", ") || "None selected"
    };

    showStatus(
      "success",
      "Thank you for your inquiry. Our cruise specialist will contact you shortly with availability, room options and a tailored quotation for your preferred journey."
    );

    form.reset();
    setDateMin();
    renderCruises();
    renderItineraries();
    renderRoomTypes();
    renderBedConfigs();
    renderAddons();
    toggleConditionalFields();
  });

  window.refreshReveal?.();
})();
