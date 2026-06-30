# Handoff: sito BullRun (Landing → Hub → Dashboard)

## Overview
BullRun è un gioco educativo di finanza per ragazzi delle scuole medie: si gestisce un
portafoglio **virtuale** (nessun soldo reale) e si impara investendo. Stile **GameFi**:
dark, neon, moderno ma amichevole. Questo pacchetto contiene il **design system completo**
del brand + tre schermate di riferimento ad alta fedeltà da ricreare nel sito reale.

## About the Design Files
I file in questo bundle sono **riferimenti di design realizzati in HTML/React** — prototipi
che mostrano aspetto e comportamento desiderati, **non codice di produzione da copiare
1:1**. Il compito è **ricreare queste schermate nell'ambiente del codebase di destinazione**
(Next.js/React, Vue, ecc.) usando i suoi pattern. Se non esiste ancora un codebase,
scegliere il framework più adatto (consigliato: **React + Vite** o **Next.js**, dato che i
prototipi sono già in React) e implementare lì.

Il design system è anche fornito come **Agent Skill** (`SKILL.md` alla radice): in Claude
Code puoi installarlo come skill e invocarlo per generare UI già brandizzate.

## Fidelity
**High-fidelity (hifi).** Colori, tipografia, spaziature, glow e interazioni sono definitivi.
Ricreare le UI in modo fedele usando le librerie/pattern del codebase, ma rispettando
esattamente i token qui sotto (`styles.css`).

---

## Come usare il design system nel codebase
1. Copia la cartella radice del bundle nel progetto (o installala come dependency interna).
2. Linka **un solo file**: `styles.css` — importa tutti i token (colori, font, spaziature,
   raggi, ombre, glow) come CSS custom properties (`--br-*`).
3. I componenti React stanno in `components/core/` e `components/game/` (sorgenti `.jsx` +
   contratti `.d.ts` + esempi `.prompt.md`). Riusali come primitive; non reimplementarli.
   In alternativa, `_ds_bundle.js` espone tutto su `window.BullRunDesignSystem_5f2728`.
4. Font: serviti da Google Fonts CDN via `tokens/fonts.css` (Space Grotesk, DM Sans,
   JetBrains Mono). Sostituibili con `@font-face` locali se si hanno le licenze.
5. Icone: **Lucide** (`lucide-react` in un progetto React).

---

## Screens / Views

### 1. Landing page — `ui_kits/landing/`
- **Purpose:** pagina marketing a scorrimento che spiega il gioco e porta dentro l'hub.
- **Layout:** nav sticky in alto (logo a sx; link + bottoni *Accedi / Contattaci / Iscriviti*
  a dx); hero a 2 colonne (testo + card portafoglio preview); poi sezioni a max-width 1200px,
  ritmo verticale ~56px: *Come funziona* (3 card), *Sei modi per investire* (6 AssetModule),
  *Evento del mese* (EventPanel + testo), *Impari giocando* (4 card), CTA finale, footer.
- **Componenti chiave:** `Button` (primary gradient = "Inizia a giocare"), `Card`, `Stat`,
  `Badge`, `AssetModule`, `EventPanel`, `Sparkline`, logo `assets/bullrun-logo-transparent.png`.
- **Copy (esatta):** H1 "Impara a investire. / Senza rischiare un euro."; eyebrow
  "Finanza ed economia · scuole medie"; CTA "Inizia a giocare"; CTA finale
  "Pronto a far correre il tuo toro?".
- **Navigazione:** *Accedi*, *Iscriviti* e ogni *Inizia a giocare* → **Hub**.

### 2. Hub "la tua cameretta" — `ui_kits/hub/` (schermata home del gioco)
- **Purpose:** la scena della cameretta È il menu. Ogni oggetto luminoso è un **portale glass**.
- **Layout:** stage 16:9 (`assets/hub-scene.png`) scalato per riempire la viewport mantenendo
  l'allineamento degli hotspot; HUD glass in alto (logo, hint "Tocca un oggetto per entrare",
  liquidità, avatar+livello); caption in basso a sx; 6 hotspot posizionati in **% della scena**.
- **Hotspot → destinazione** (vedi array `SPOTS` in `Hub.jsx` per le coordinate %):
  - Laptop/wallet → Dashboard portafoglio (`dashboard`)
  - Candele verdi/rosse → Azioni (`dashboard#stock`)
  - Grafico a barre in crescita → ETF (`dashboard#etf`)
  - Bitcoin → Crypto (`dashboard#crypto`)
  - Banca/tempio → BTP (`dashboard#bond`)
  - Casetta REIT → Immobili (`dashboard#realestate`)
- **Stati:** ogni hotspot ha un "ping" neon sempre attivo (segnala cliccabilità) e una
  **label glass** che si solleva e si illumina con il colore dell'asset all'hover.

### 3. Dashboard / portafoglio — `ui_kits/dashboard/`
- **Purpose:** "postazione di controllo" dove si gioca: si vede il patrimonio, si scelgono gli
  asset, si avanza nel tempo.
- **Layout:** top bar sticky (logo, badge mese, liquidità, classifica, notifiche, avatar+livello);
  griglia `1fr / 360px`. Colonna principale: card portafoglio (Stat XL "Patrimonio totale" +
  delta + Tabs Mese/Anno/Tutto + Sparkline + 3 mini-stat) e griglia 3×2 di `AssetModule`.
  Sidebar sticky: `PlayerCard` (avatar, nickname, livello, ProgressBar XP), `EventPanel`
  (*Evento del mese*) e bottone **Avanza mese**.
- **Pre-selezione asset:** legge `location.hash` (`#stock`, `#crypto`, …) per evidenziare
  l'asset corretto quando si arriva da un portale dell'hub.

## Interactions & Behavior
- **Avanza mese** (dashboard): avanza il mese, applica al portafoglio i delta per-asset
  dell'evento successivo (con piccolo drift casuale), aggiunge un punto al grafico, assegna
  **+35 XP**, ruota l'*Evento del mese*. Eventi definiti nell'array `EVENTS` di `Dashboard.jsx`.
- **Selezione asset:** click su un `AssetModule` lo seleziona → bordo + glow del colore asset,
  lieve lift (`translateY(-2px)`), wash radiale.
- **Hover bottoni:** lift `-1px` + glow intensificato; **press:** `scale(0.985)` + nudge giù.
- **Hover card interattive:** lift `-3px` + bordo neon teal.
- **Glass/nav:** barre sticky con `backdrop-filter: blur(16px)` su `rgba(10,14,20,.78)`.
- **Motion:** durata base 200ms, `--ease-out` cubic-bezier(.22,1,.36,1); rispettare
  `prefers-reduced-motion`. Nessun loop decorativo infinito sui contenuti.

## State Management (dashboard)
- `month`, `holdings` (valori per asset), `prev` (snapshot precedente per i delta), `eventIdx`,
  `sel` (asset selezionato, init da hash), `history` (serie del grafico), `xp`, `range` (Tabs).
- Tutto client-side e simulato per il prototipo; in produzione collegare a dati/persistenza reali.

## Design Tokens (riferimento: `styles.css` → `tokens/*.css`)
- **Brand:** lime `--br-green #B6F23C`, cyan `--br-teal #25E4D4`, lavanda `--br-purple #C7A1F5`;
  gradiente firma `--br-gradient` (lime→cyan 135°).
- **Asset:** `--br-cash #7FF9E4`, `--br-bond #8FB4FF`, `--br-etf #B6F23C`, `--br-stock #25E4D4`,
  `--br-crypto #C7A1F5`, `--br-realestate #FFC24B`.
- **Superfici:** `--br-bg #0A0E14`, `--br-surface #131B28`, `--br-surface-2 #1A2433`,
  `--br-surface-3 #232F41`. **Testo:** `--br-text #EAF2F6`, `--br-text-muted #93A2B3`,
  `--br-text-dim #5C6A7B`, `--br-ink #062018` (testo su neon).
- **Semantica finanza:** up `--br-up #6EE787`, down `--br-down #FF5C7A`, warn `--br-warn #FFC24B`.
- **Type:** display = Space Grotesk; body = DM Sans; mono (prezzi/dati, `tabular-nums`) = JetBrains Mono.
- **Raggi:** 6 / 10 / 14 / 20 / 28 / pill. **Spaziatura:** griglia base 4px (`--space-*`).
- **Glow firma:** `--glow-green/teal/purple` (anello + bloom), `--glow-soft-*`, `--glow-text-*`.
- **Ombre:** `--shadow-sm/md/lg`. **Glass:** `--glass-bg rgba(19,27,40,.72)` + blur 16px.

## Assets
- `assets/bullrun-logo.png` — logo originale (sfondo bianco).
- `assets/bullrun-logo-transparent.png` — logo ritagliato per fondi scuri (con alone neon).
- `assets/hub-scene.png` — render della cameretta usato come scena dell'Hub (gli hotspot sono
  posizionati in % su questa immagine: se la sostituisci, ri-tara `SPOTS` in `Hub.jsx`).
- Icone: **Lucide** via CDN (`candlestick-chart`, `bar-chart-3`, `bitcoin`, `landmark`, `home`,
  `wallet`, `newspaper`, `calendar-arrow-down`, `bell`, `trophy`, `arrow-right`, …).

## Files (riferimenti nel bundle)
- `styles.css` + `tokens/` — token e font (linka solo `styles.css`).
- `components/core/` — Button, IconButton, Card, Badge, Avatar, Stat, Input, Tabs.
- `components/game/` — AssetModule, EventPanel, Sparkline, ProgressBar.
- `ui_kits/landing/` — `index.html` + `Landing.jsx`.
- `ui_kits/hub/` — `index.html` + `Hub.jsx`.
- `ui_kits/dashboard/` — `index.html` + `Dashboard.jsx`.
- `readme.md` — guida completa di brand (content + visual foundations + iconografia).
- `SKILL.md` — wrapper Agent Skill per Claude Code.
- `_ds_bundle.js` — bundle runtime dei componenti (`window.BullRunDesignSystem_5f2728`).

## Note
- I "portali" asset attualmente puntano tutti alla stessa dashboard con l'asset pre-selezionato.
  Schermate di trading dedicate per asset (es. portale Azioni con candlestick + buy/sell) sono
  un'estensione naturale ancora **da progettare** — non inventarle, chiedere il design.
- Font da CDN: sostituire con file locali se servono garanzie offline/licenza.
