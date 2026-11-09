# Julekalender til Snuppelupp (Kiran) 🎄❤️

En mobil-først, dynamisk julekalender bygget med HTML, CSS (Flexbox) og JavaScript – klar til å hostes på GitHub Pages.

## Filoversikt
- [`index.html`](index.html) – Selve nettsiden med toppseksjon, flexbox-kalender og popup-modal for lukekortene.
- [`style.css`](style.css) – Klassisk og varm julestemning med SVG-julemønster i bakgrunnen, tilfeldige luke-størrelser/vinkler og mobilvennlig kortvisning.
- [`data.js`](data.js) – **Her redigerer du alle de 24 tekstene og bildene.**
- [`script.js`](script.js) – Datostyring, fastlåst tilfeldig rekkefølge, lagring av åpnede luker i `localStorage` og test-modus.
- [`images/`](images/README.md) – Mappe der du legger inn bildene `1.jpg` til `24.jpg`.

---

## Slik tester du kalenderen før 1. desember
Ettersom lukene til vanlig er låst frem til riktig dato i desember, kan du legge til `?test=true` bak nettadressen når du vil sjekke og åpne alle 24 lukene:

- **Åpne alle luker (Test-modus):**
  `index.html?test=true` (eller `https://ditt-brukernavn.github.io/Julekalender/?test=true`)
- **Simuler en bestemt dag i desember (f.eks. 10. desember):**
  `index.html?dag=10`

---