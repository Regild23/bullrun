---
name: bullrun-design
description: Use this skill to generate well-branded interfaces and assets for BullRun, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference
- **Brand:** BullRun — dark/neon "GameFi" finance game for middle-school students. Friendly, encouraging, Italian copy, informal "tu". No emoji.
- **Signature:** lime→cyan gradient (`--br-gradient`) on a near-black canvas (`--br-bg #0A0E14`), neon glow used sparingly for focus/selection/CTA.
- **Type:** Space Grotesk (display), DM Sans (body), JetBrains Mono (prices/data, tabular-nums).
- **Tokens:** link `styles.css` for all CSS custom properties (see `tokens/`).
- **Components:** load `_ds_bundle.js`, read from `window.BullRunDesignSystem_5f2728` (Button, Card, Badge, Avatar, Stat, Input, Tabs, AssetModule, EventPanel, Sparkline, ProgressBar). See each component's `.prompt.md`.
- **Icons:** Lucide via CDN (`<i data-lucide="...">` + `lucide.createIcons()`).
- **Reference screens:** `ui_kits/landing/` and `ui_kits/dashboard/`.
