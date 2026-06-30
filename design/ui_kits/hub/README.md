# Hub UI kit — "la tua cameretta"

The game's home screen: the bedroom scene **is** the menu. Every glowing object is a glass portal into a part of the game.

- `index.html` — entry + all scene/HUD/hotspot CSS. Loads `styles.css`, the DS bundle, Lucide, then `Hub.jsx`.
- `Hub.jsx` — places six `HotSpot`s as percentages over the 16:9 scene (`assets/hub-scene.png`), plus a glass HUD (logo, hint, cash, `Avatar`) and a caption.

**Portals → targets**
- 🖥️ Laptop / wallet → `../dashboard/index.html` (il portafoglio / overview)
- 📈 Candlesticks → Azioni → `dashboard#stock`
- 📊 Growth chart → ETF → `dashboard#etf`
- ₿ Bitcoin → Crypto → `dashboard#crypto`
- 🏛️ Bank → BTP → `dashboard#bond`
- 🏠 House (REIT) → Immobili → `dashboard#realestate`

The dashboard reads `location.hash` to pre-select the asset, so each object feels like its own portal. Hotspots show an always-on "ping" dot and reveal a glass label on hover.

> The scene art is a provided render (`assets/hub-scene.png`). Hotspot rectangles are positioned as % of the image; if the art is replaced, re-check the `SPOTS` coordinates in `Hub.jsx`.
