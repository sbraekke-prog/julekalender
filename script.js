/**
 * LOGIKK FOR JULEKALENDER TIL KIRAN ("SNUPPELUPP")
 * ================================================
 * - Henter dagens dato med JavaScript
 * - Bygger 24 luker i en fastlåst, tilfeldig rekkefølge med varierte størrelser/vinkler i Flexbox
 * - Sjekker om en luke kan åpnes (dagens luke + tidligere luker i desember, eller ?test=true)
 * - Husker åpnede luker på mobilen via localStorage
 * - Åpner kort med tekst øverst og bilde nederst
 */

const STORAGE_KEY = "julekalender_snuppelupp_opened_v1";

/**
 * Fastlåst tilfeldig rekkefølge på lukene 1–24 slik at det ikke er noe mønster,
 * men slik at lukene ikke flytter på seg når hun oppdaterer siden.
 */
const FIXED_RANDOM_ORDER = [
  17, 4, 22, 9, 1, 14, 24, 7,
  19, 12, 3, 21, 8, 15, 2, 23,
  11, 6, 18, 10, 20, 5, 13, 16
];

/**
 * Fastlåste variasjoner i bredde, høyde, helning, forskyvning og fargetema
 * for å skape et organisk flexbox-uttrykk uten rutenett-mønster.
 */
const DOOR_STYLE_VARIATIONS = [
  { w: "96px",  h: "94px",  rot: "-2.5deg", ox: "0px",  oy: "4px",  theme: "red",      motif: "❄" },
  { w: "108px", h: "88px",  rot: "2.1deg",  ox: "2px",  oy: "-3px", theme: "green",    motif: "✦" },
  { w: "90px",  h: "104px", rot: "-1.6deg", ox: "-2px", oy: "6px",  theme: "burgundy", motif: "★" },
  { w: "104px", h: "96px",  rot: "2.8deg",  ox: "3px",  oy: "-2px", theme: "gold",     motif: "🎄" },
  { w: "94px",  h: "92px",  rot: "-3.1deg", ox: "-1px", oy: "3px",  theme: "green",    motif: "❄" },
  { w: "110px", h: "98px",  rot: "1.4deg",  ox: "2px",  oy: "5px",  theme: "red",      motif: "✦" },
  { w: "100px", h: "108px", rot: "-2.2deg", ox: "0px",  oy: "-4px", theme: "gold",     motif: "★" },
  { w: "92px",  h: "90px",  rot: "2.6deg",  ox: "-3px", oy: "4px",  theme: "burgundy", motif: "❄" },
  { w: "106px", h: "94px",  rot: "-1.8deg", ox: "2px",  oy: "-2px", theme: "red",      motif: "🎄" },
  { w: "94px",  h: "102px", rot: "3.0deg",  ox: "0px",  oy: "5px",  theme: "green",    motif: "✦" },
  { w: "102px", h: "90px",  rot: "-2.7deg", ox: "-2px", oy: "-3px", theme: "burgundy", motif: "★" },
  { w: "96px",  h: "98px",  rot: "1.9deg",  ox: "3px",  oy: "2px",  theme: "gold",     motif: "❄" }
];

const MONTHS_NO = [
  "januar", "februar", "mars", "april", "mai", "juni",
  "juli", "august", "september", "oktober", "november", "desember"
];

let toastTimeoutId = null;

/**
 * Henter lagrede åpnede luker fra localStorage
 */
function getOpenedDoors() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch {
    return new Set();
  }
}

/**
 * Lagrer åpnede luker i localStorage
 */
function saveOpenedDoors(openedSet) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(openedSet)));
  } catch {
    // Ignorer hvis privat nettlesermodus blokkerer localStorage
  }
}

/**
 * Sjekker dagens dato og om test-modus (?test=true) er aktivert
 */
function getDateState() {
  const params = new URLSearchParams(window.location.search);
  const isTestMode = params.get("test") === "true" || params.get("test") === "1";
  const simulatedDay = parseInt(params.get("dag") || "", 10);

  const now = new Date();
  const monthIndex = now.getMonth(); // 0 = januar, 11 = desember
  const dayOfMonth = now.getDate();

  const isDecember = monthIndex === 11 || (!Number.isNaN(simulatedDay) && simulatedDay >= 1 && simulatedDay <= 31);
  const effectiveDecemberDay = !Number.isNaN(simulatedDay) ? simulatedDay : dayOfMonth;

  return {
    now,
    monthIndex,
    dayOfMonth,
    isDecember,
    effectiveDecemberDay,
    isTestMode
  };
}

/**
 * Sjekker om en gitt luke (1–24) har lov til å åpnes i dag
 */
function canOpenDoor(dayNumber, dateState) {
  if (dateState.isTestMode) {
    return true;
  }
  if (!dateState.isDecember) {
    return false;
  }
  return dayNumber <= dateState.effectiveDecemberDay;
}

/**
 * Lager en koselig jule-plassholder (SVG) dersom brukerens eget bilde (images/X.jpg)
 * ikke er lagt inn i images/-mappen ennå.
 */
function createPlaceholderSvgDataUri(dayNumber, title) {
  const safeTitle = (title || `Luke ${dayNumber}`).replace(/[<>&"']/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="600" height="420">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#7a141d"/>
        <stop offset="55%" stop-color="#520b12"/>
        <stop offset="100%" stop-color="#163e2a"/>
      </linearGradient>
    </defs>
    <rect width="600" height="420" rx="18" fill="url(#bg)"/>
    <rect x="18" y="18" width="564" height="384" rx="12" fill="none" stroke="#f5d680" stroke-width="2" stroke-dasharray="8 6" stroke-opacity="0.55"/>
    <circle cx="300" cy="165" r="62" fill="#f5d680" fill-opacity="0.14" stroke="#f5d680" stroke-width="2"/>
    <text x="300" y="182" text-anchor="middle" font-family="Georgia, serif" font-size="48" font-weight="bold" fill="#fffaf2">❤️ ${dayNumber}</text>
    <text x="300" y="268" text-anchor="middle" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#f5d680">${safeTitle}</text>
    <text x="300" y="312" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#fffaf2" fill-opacity="0.85">Bytt ut bildet ved å legge inn images/${dayNumber}.jpg</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Viser en koselig melding nederst på skjermen når en luke er låst
 */
function showToast(message) {
  const toastEl = document.getElementById("toastMessage");
  if (!toastEl) return;

  toastEl.textContent = message;
  toastEl.hidden = false;

  if (toastTimeoutId) {
    clearTimeout(toastTimeoutId);
  }
  toastTimeoutId = setTimeout(() => {
    toastEl.hidden = true;
  }, 3400);
}

/**
 * Oppdaterer dato- og fremdriftsteksten i toppen av kalenderen
 */
function updateHeaderStatus(dateState, openedSet) {
  const titleEl = document.getElementById("calendarTitle");
  const subtitleEl = document.getElementById("calendarSubtitle");
  const dateTextEl = document.getElementById("currentDateText");
  const progressTextEl = document.getElementById("openedProgressText");
  const testBannerEl = document.getElementById("testBanner");

  if (typeof CALENDAR_CONFIG !== "undefined") {
    if (titleEl && CALENDAR_CONFIG.title) titleEl.textContent = CALENDAR_CONFIG.title;
    if (subtitleEl && CALENDAR_CONFIG.subtitle) subtitleEl.textContent = CALENDAR_CONFIG.subtitle;
  }

  if (testBannerEl) {
    testBannerEl.hidden = !dateState.isTestMode;
  }

  if (dateTextEl) {
    const monthName = MONTHS_NO[dateState.monthIndex];
    if (dateState.isDecember) {
      const activeDay = Math.min(dateState.effectiveDecemberDay, 24);
      dateTextEl.textContent = `🎄 ${dateState.effectiveDecemberDay}. desember – Luke ${activeDay} er klar`;
    } else {
      dateTextEl.textContent = `📅 I dag er ${dateState.dayOfMonth}. ${monthName}`;
    }
  }

  if (progressTextEl) {
    progressTextEl.textContent = `${openedSet.size} av 24 åpnet`;
  }
}

/**
 * Åpner popup-kortet for en valgt luke (tekst øverst, bilde nederst)
 */
function openDoorModal(doorData) {
  const dialog = document.getElementById("doorDialog");
  const badgeEl = document.getElementById("cardDayBadge");
  const titleEl = document.getElementById("cardTitle");
  const textEl = document.getElementById("cardText");
  const imageEl = document.getElementById("cardImage");

  if (!dialog || !doorData) return;

  badgeEl.textContent = `Luke ${doorData.day} • ❤️`;
  titleEl.textContent = doorData.title || `${doorData.day}. desember`;
  textEl.textContent = doorData.text || "";

  // Sett bilde nederst med automatisk fallback til jule-illustrasjon hvis filen ikke finnes ennå
  const fallbackUri = createPlaceholderSvgDataUri(doorData.day, doorData.title);
  imageEl.onerror = () => {
    imageEl.onerror = null;
    imageEl.src = fallbackUri;
  };
  imageEl.alt = doorData.imageAlt || `Bilde for luke ${doorData.day}`;
  imageEl.src = doorData.image || fallbackUri;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

/**
 * Bygger alle de 24 lukene i flexbox-containeren
 */
function renderCalendar() {
  const container = document.getElementById("calendarContainer");
  if (!container || typeof CALENDAR_DOORS === "undefined") return;

  const dateState = getDateState();
  const openedSet = getOpenedDoors();

  updateHeaderStatus(dateState, openedSet);
  container.innerHTML = "";

  // Map data etter dagnummer (1–24) for raskt oppslag
  const doorsByDay = new Map(CALENDAR_DOORS.map((item) => [item.day, item]));

  FIXED_RANDOM_ORDER.forEach((dayNumber, index) => {
    const doorData = doorsByDay.get(dayNumber) || {
      day: dayNumber,
      title: `${dayNumber}. desember`,
      text: `God ${dayNumber}. desember, Snuppelupp! ❤️`,
      image: `images/${dayNumber}.jpg`
    };

    const styleVar = DOOR_STYLE_VARIATIONS[index % DOOR_STYLE_VARIATIONS.length];
    const isOpened = openedSet.has(dayNumber);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `door-item door-item--theme-${styleVar.theme}${isOpened ? " is-opened" : ""}`;
    btn.dataset.day = String(dayNumber);
    btn.setAttribute(
      "aria-label",
      isOpened ? `Luke ${dayNumber} (allerede åpnet)` : `Luke ${dayNumber}`
    );

    // Sett individuelle størrelser, rotasjon og offset for "uten mønster"-effekt
    btn.style.setProperty("--door-w", styleVar.w);
    btn.style.setProperty("--door-h", styleVar.h);
    btn.style.setProperty("--door-rotate", styleVar.rot);
    btn.style.setProperty("--door-offset-x", styleVar.ox);
    btn.style.setProperty("--door-offset-y", styleVar.oy);

    const motifSpan = document.createElement("span");
    motifSpan.className = "door-item__motif";
    motifSpan.setAttribute("aria-hidden", "true");
    motifSpan.textContent = isOpened ? "❤️" : styleVar.motif;

    const numberSpan = document.createElement("span");
    numberSpan.className = "door-item__number";
    numberSpan.textContent = String(dayNumber);

    const statusSpan = document.createElement("span");
    statusSpan.className = "door-item__status";
    statusSpan.textContent = "Åpnet";

    btn.append(motifSpan, numberSpan, statusSpan);

    btn.addEventListener("click", () => {
      const currentState = getDateState();

      if (canOpenDoor(dayNumber, currentState)) {
        // Marker luken som åpnet og lagre på mobilen
        openedSet.add(dayNumber);
        saveOpenedDoors(openedSet);

        btn.classList.add("is-opened");
        btn.setAttribute("aria-label", `Luke ${dayNumber} (allerede åpnet)`);
        motifSpan.textContent = "❤️";
        updateHeaderStatus(currentState, openedSet);

        openDoorModal(doorData);
      } else {
        // Fremtidig luke – rist lett på luken og vis koselig melding
        btn.classList.remove("is-shaking");
        void btn.offsetWidth; // Tving reflow så animasjonen kan kjøres på nytt
        btn.classList.add("is-shaking");

        const nickname =
          typeof CALENDAR_CONFIG !== "undefined" && CALENDAR_CONFIG.recipientNickname
            ? CALENDAR_CONFIG.recipientNickname
            : "Snuppelupp";

        if (!currentState.isDecember) {
          showToast(
            `Ikke lov å snikåpne luke ${dayNumber} ennå, ${nickname}! Vi må vente til ${dayNumber}. desember 🎄❤️`
          );
        } else {
          const daysLeft = dayNumber - currentState.effectiveDecemberDay;
          const dayWord = daysLeft === 1 ? "dag" : "dager";
          showToast(
            `Ingen sniktitting, ${nickname}! Luke ${dayNumber} kan åpnes om ${daysLeft} ${dayWord} (${dayNumber}. desember) ❤️`
          );
        }
      }
    });

    container.appendChild(btn);
  });
}

/**
 * Setter opp lukking av dialog-modal og test-knapper
 */
function setupInteractions() {
  const dialog = document.getElementById("doorDialog");
  const closeBtn = document.getElementById("closeDialogBtn");
  const resetBtn = document.getElementById("resetOpenedBtn");

  if (closeBtn && dialog) {
    closeBtn.addEventListener("click", () => {
      dialog.close();
    });
  }

  // Lukk modalen når man trykker utenfor selve kortet (fungerer på alle mobilnettlesere)
  if (dialog) {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      renderCalendar();
      showToast("Alle åpnede luker er nullstilt! ✨");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupInteractions();
  renderCalendar();
});
