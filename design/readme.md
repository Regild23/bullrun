# BullRun — Design System

**BullRun** is an educational finance game for middle-school students (scuole medie). Players manage a *virtual* portfolio — no real money — and learn economics and investing by doing: allocating across asset classes, advancing month by month, and reacting to market events. The vibe is **GameFi**: dark, neon, modern but friendly and encouraging, never intimidating or corporate-finance.

This repository is the brand's design system: tokens, fonts, reusable React components, foundation specimen cards, and high-fidelity UI kits for the two core surfaces.

## Sources
- **Brand mascot / logo:** `assets/bullrun-logo.png` (original, white bg) and `assets/bullrun-logo-transparent.png` (cut-out for dark canvases). A neon bull head with a lime→cyan gradient body and lavender horns — the single source of truth for the palette.
- **Product brief** (provided by the client, summarized): a scrolling **Landing page** (nav: Accedi / Iscriviti / Contattaci; hero CTA "Inizia a giocare") and a **Dashboard** game screen (player profile, total patrimony + chart, 6 asset modules that light up when selected, an "Avanza mese" button, and an "Evento del mese" panel).
- No external codebase or Figma file was provided; foundations are derived from the mascot and brief.

---

## CONTENT FUNDAMENTALS

**Language:** Italian. The audience is ~11–14 year-olds, so copy is plain, warm and concrete — never finance jargon without a plain-language gloss.

**Voice & person:** Direct address using informal **"tu"** ("Impara a investire", "Tocca un modulo", "Pronto a far correre il tuo toro?"). The product speaks like an encouraging older sibling, not a bank.

**Tone:** Playful, confident, reassuring. Risk is reframed as fun and safe ("Senza rischiare un euro", "Zero rischi", "Sbagliare qui costa solo un po di XP"). Real economics is always made relatable ("Una notizia vera, spiegata semplice").

**Casing:** Sentence case for headlines and body. **UPPERCASE only** for small mono eyebrows/labels and badges (e.g. `EVENTO DEL MESE`, `LIVELLO 7`), always with wide letter-spacing.

**Numbers & money:** Euro with Italian formatting (`€ 12.480`). Percentages always carry a sign and an arrow (`▴ +4.2%`, `▾ -2.8%`). Numbers live in the mono typeface with tabular figures.

**Emoji:** Not used. Personality comes from the neon visuals, the bull mascot, and motion — not emoji. Iconography is line icons; arrows `▴ ▾` are the only "glyph" characters used, exclusively for market deltas.

**Microcopy examples:**
- CTA: "Inizia a giocare", "Avanza mese", "Iscriviti"
- Eyebrows: "Finanza ed economia · scuole medie", "Sei modi per investire"
- Reassurance: "Gratis, per sempre, per ogni studente"

---

## VISUAL FOUNDATIONS

**Overall:** Dark GameFi control-panel aesthetic. Near-black blue canvas, neon accents used as *highlights* (focus, selection, hero CTA) — not everywhere. Friendly because of generous rounding, soft glows, and a cheerful lime→cyan palette rather than the cold blues of trading apps.

**Color:**
- Canvas is a deep near-black blue: `--br-bg #0A0E14`, layered up through `--br-surface #131B28` (cards) → `--br-surface-2` (raised/hover) → `--br-surface-3` (inputs).
- The signature is the mascot's **lime → cyan gradient** (`--br-gradient`, 135°), with lavender (`--br-purple`) as a tertiary accent. Used on the primary CTA, gradient text ("Bull"), avatar rings, progress fills.
- Six **asset-class accents** give each game module its identity: cash (teal-white), BTP (periwinkle), ETF (lime), Azioni (cyan), Crypto (lavender), Immobili (amber).
- Finance semantics: profit `--br-up #6EE787`, loss `--br-down #FF5C7A`, event/caution `--br-warn #FFC24B`.

**Type:** Display = **Space Grotesk** (techy but rounded/friendly, excellent numerals) for headings and large figures. Body = **DM Sans** (warm geometric sans) for UI copy. Mono = **JetBrains Mono** with `tabular-nums` for all prices, tickers, deltas and data. Headlines are tight (`letter-spacing: -0.02em`), large, and sentence-case; eyebrows are uppercase mono with `0.12em` tracking.

**Spacing & layout:** 4px base grid (`--space-*`). Content max-width ~1200px. The dashboard is a 2-column grid (main + 360px sticky sidebar). Sections on the landing use ~56px vertical rhythm. Generous padding inside cards (20–26px).

**Backgrounds:** Flat dark fills, optionally with a **subtle dotted grid** (`.br-grid-bg`, 22px radial dots at 5% white) on game surfaces. Ambient **radial color glows** (lime/cyan) are placed behind hero and CTA content for depth. No photography; no busy patterns. The mascot PNG (with its preserved neon halo) is the recurring hero image.

**Corners:** Rounded and friendly throughout — `--radius-md 14px` for buttons/inputs, `--radius-lg 20px` for cards, `--radius-xl 28px` for big CTA panels, `--radius-pill` for badges/tabs/bars.

**Borders:** Hairline `rgba(255,255,255,0.08)` by default; `--br-line-strong` (0.16) for emphasis; `--br-line-neon` (teal, 0.35) for focused/interactive edges.

**Shadows & glows:** Two systems. (1) Cool elevation shadows (`--shadow-sm/md/lg`) for depth on dark. (2) The **neon glow** signature (`--glow-green/teal/purple` = tight ring + outer bloom; `--glow-soft-*` = bloom only; `--glow-text-*` for glowing numerals). Glow is reserved for the hero CTA, focused inputs, selected asset modules, and the headline portfolio number — used sparingly so it stays special.

**Transparency & blur:** Sticky nav/top bars use a glass treatment — `rgba(10,14,20,0.78)` + `backdrop-filter: blur(16px)`. Soft tinted fills (`*-soft` colors at ~14% alpha) back badges and impact chips.

**Animation:** Snappy and playful. Standard `--dur-base 200ms` with `--ease-out`; a slight overshoot (`--ease-bounce`) is available for game actions. Hover = lift (`translateY(-2/-3px)`) + intensified glow/border. Press = shrink (`scale(0.92–0.985)`) + downward nudge. Bars/values transition on data change (`--dur-slow`). No infinite decorative loops; respect reduced-motion.

**Cards:** Dark `--br-surface` fill, 1px hairline border, `--radius-lg`, `--shadow-md`. `interactive` cards lift and gain a teal neon border + soft bloom on hover. A `glow` prop swaps the shadow for a full neon ring; an `accent` prop tints the border with an asset color.

---

## ICONOGRAPHY

- **System:** [Lucide](https://lucide.dev) line icons, loaded from CDN (`unpkg.com/lucide`). Used in cards and UI kits via `<i data-lucide="name">` placeholders that `lucide.createIcons()` upgrades to inline SVG. Stroke weight 2, sized 15–20px, colored via `currentColor` (usually a neon accent on dark).
- **Why Lucide:** clean, rounded, friendly line style that matches the mascot's confident single-weight outline. No proprietary icon set was provided, so Lucide is the chosen substitute — **flag for the client if they have a bespoke set.**
- **Common icons:** `wallet`, `landmark`, `layers`, `trending-up`, `bitcoin`, `building-2` (the six assets); `newspaper`, `cpu`, `zap` (events); `calendar-arrow-down` (advance month); `bell`, `trophy`, `play`, `arrow-right`.
- **Glyphs:** market arrows `▴` / `▾` are the only non-icon symbols, used for deltas.
- **Emoji:** never.
- **Logo/mascot:** `assets/bullrun-logo-transparent.png` on dark backgrounds; always keep its neon halo and never place it on light fills.

---

## INDEX / MANIFEST

**Root**
- `styles.css` — global entry (import-only). Consumers link this.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`, `base.css`.
- `assets/` — `bullrun-logo.png`, `bullrun-logo-transparent.png`.
- `readme.md` (this file) · `SKILL.md` (Agent-Skill wrapper).

**Components** (`window.BullRunDesignSystem_5f2728.*`)
- `components/core/` — `Button`, `IconButton`, `Card`, `Badge`, `Avatar`, `Stat`, `Input`, `Tabs`.
- `components/game/` — `AssetModule`, `EventPanel`, `Sparkline`, `ProgressBar`.

**Foundation cards** (`guidelines/`) — Colors (brand, assets, semantics, surfaces), Type (display, body, mono, scale), Spacing (scale, radii), Brand (glow, gradient, logo).

**UI kits** (`ui_kits/`)
- `landing/` — scrolling marketing page → enters the dashboard.
- `dashboard/` — the game control panel with the live "Avanza mese" loop.

> **Note:** fonts are served from Google Fonts CDN (binaries could not be bundled). Swap `tokens/fonts.css` for local `@font-face` + woff2 when licensed files are available.
