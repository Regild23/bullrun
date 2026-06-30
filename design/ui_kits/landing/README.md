# Landing UI kit

The BullRun marketing landing page — a dark, neon scrolling page that explains the game and funnels into the dashboard.

- `index.html` — entry; loads `styles.css`, the DS bundle, Lucide, then `Landing.jsx`.
- `Landing.jsx` — single-scope file with all sections: `Nav`, `Hero` (+ `HeroPreview`), `HowItWorks`, `Assets`, `Events`, `Learn`, `CTA`, `Footer`.

Composes DS primitives: `Button`, `Card`, `Stat`, `Badge`, `AssetModule`, `EventPanel`, `Sparkline`. Icons via Lucide (`<i data-lucide="...">` + `lucide.createIcons()`).

Nav buttons **Accedi / Iscriviti** and every **"Inizia a giocare"** CTA link to `../dashboard/index.html`.
