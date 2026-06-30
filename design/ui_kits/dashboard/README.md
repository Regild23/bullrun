# Dashboard UI kit

The BullRun game screen — a "postazione di controllo" where players manage their virtual portfolio.

- `index.html` — entry; loads `styles.css`, the DS bundle, Lucide, then `Dashboard.jsx`.
- `Dashboard.jsx` — single-scope file. Layout: sticky `TopBar` (logo, month, cash, avatar+level), main column (portfolio `Card` with `Stat` + `Sparkline` + time `Tabs`, then the 6 `AssetModule` tiles), and a sticky sidebar (`PlayerCard` with XP `ProgressBar`, `EventPanel`, and the **Avanza mese** button).

**Live loop:** clicking *Avanza mese* advances the month, applies the next event's per-asset deltas to holdings, pushes a new point onto the portfolio chart, awards +35 XP, and rotates the *Evento del mese*. Clicking an asset tile selects/lights it.

The logo links back to `../landing/index.html`.
