# 📈 BullRun — Documento di progetto

> **Fonte di verità del progetto.** Questo file descrive *tutto* BullRun: cos'è, a che
> punto siamo, le decisioni prese, lo stack e la direzione. Si tiene aggiornato man mano.
> Può essere condiviso con altri strumenti (es. Qwen) o persone per dare il quadro completo.

**Ultimo aggiornamento:** 30 giugno 2026 · **Stato:** Sessione 1 completata e online 🟢

---

## 🔗 Link rapidi

| Cosa | Dove |
|---|---|
| 💻 Codice (GitHub, pubblico) | https://github.com/Regild23/bullrun |
| 🎮 Gioco live (Vercel) | https://bullrun-six-kohl.vercel.app |
| 🎨 Bozza dashboard (GameFi) | `mockup/dashboard.html` |
| 🖼️ Brief grafiche per AI | `design/brief-grafiche.md` · `design/istruzioni-qwen.md` |

---

## 1. Cos'è BullRun

Un **gioco web educativo di simulazione finanziaria** per ragazzi **12-18 anni**, pensato
come strumento didattico competitivo (es. per i corsi INFOMAAT o come gara tra studenti).
Si gestisce un portafoglio virtuale, si reagisce a eventi di mercato realistici e si
compete in una classifica pubblica. **Niente spese o vita simulata: solo investimenti**,
come una vera dashboard da broker ma accessibile e divertente.

È anche un **progetto padre-figlio**: il figlio (12 anni) impara a programmare costruendolo.

---

## 2. Stato attuale (cosa c'è già)

- ✅ **Dashboard MVP** funzionante: capitale €10.000, investimento in ETF S&P500, bottone
  "Avanza Mese" con rendimento casuale, grafico del patrimonio (Chart.js).
- ✅ **Online**: codice su GitHub (pubblico) + sito live su Vercel con **auto-deploy** a
  ogni `git push` su `main`.
- ✅ **Bozza grafica** della futura dashboard in stile "GameFi" (`mockup/dashboard.html`).
- ✅ **Brief grafiche** pronti per generare logo/icone/avatar con un'AI di immagini.
- ⬜ Da fare: home/login, backend, tutti gli asset, eventi, classifica (vedi Roadmap).

---

## 3. Pubblico

- Studenti scuole medie e superiori (12-18 anni).
- Uso in contesto scolastico o come gara tra amici.
- Accesso via browser, zero installazioni.

---

## 4. Meccaniche di gioco

- **Capitale iniziale:** €10.000 virtuali.
- **PAC mensile:** ogni mese arrivano automaticamente **+€1.000** (simula un Piano di
  Accumulo del Capitale).
- **Nessuna eliminazione:** se il portafoglio va a zero, si aspetta il versamento mensile
  e si riprende. (È il funzionamento reale di un PAC.)
- **Turni:** ogni turno = 1 mese. All'inizio arriva un **evento di mercato**, il giocatore
  **ribilancia** il portafoglio, i mercati si muovono, il patrimonio si aggiorna.
- **Obiettivo:** massimizzare il **patrimonio netto** entro la fine della stagione.

---

## 5. Asset disponibili

| Asset | Rischio | Rendimento atteso | Note |
|---|---|---|---|
| Liquidità / conto | Zero | 0% (perde con l'inflazione) | Default dei soldi non investiti |
| BTP / Obbligazioni | Basso | ~3% annuo | Stabile, sensibile ai tassi |
| ETF S&P500 | Medio | ~7% medio annuo | Crescita lenta, storico reale |
| Azioni singole | Alto | Variabile | Più volatili |
| Crypto (BTC, ETH…) | Altissimo | Da -80% a +300% | Alta volatilità |
| Immobili (REIT) | Medio | Affitto + rivalutazione | Soglia minima di capitale |

> Nella Sessione 1 è implementato **solo l'ETF S&P500**. Gli altri arrivano nella Fase 2.

---

## 6. Eventi di mercato

Ogni turno un evento con: **titolo** d'impatto + **spiegazione didattica** (2-3 righe) +
**impatto sugli asset**. Esempi: *"La Fed alza i tassi"*, *"Bitcoin Halving"*,
*"Recessione in arrivo"*, *"ETF S&P500 al massimo storico"*, *"Tweet virale su una meme coin"*.

---

## 7. Competizione e sociale

- **Leaderboard pubblica** in tempo reale.
- **Profilo** con nickname e avatar.
- **Mosse parzialmente visibili** (categoria sì, importo no): *"Marco ha comprato crypto"*.
- **Stagioni** con inizio/fine decisi dall'admin.
- **Achievement** (es. "Primo investimento", "Sopravvissuto al crash").

---

## 8. Ruolo Admin (insegnante)

Crea una **stagione** (durata, capitale, importo PAC), gestisce il **calendario eventi**,
avanza i turni, vede le statistiche dei giocatori.

---

## 9. Schermate

1. **Home / Login** — benvenuto, "Accedi con Google", scelta nickname/avatar → lobby.
2. **Dashboard** — patrimonio, allocazione asset, grafico (la "postazione di controllo").
3. **Mercato** — asset, prezzi, compra/vendi.
4. **Evento del mese** — schermata dedicata con spiegazione didattica.
5. **Leaderboard** — classifica della stagione.
6. **Profilo** — storico mosse, achievement.
7. **Admin panel** — gestione stagioni, eventi, turni.

---

## 10. Stack tecnico & architettura

**Frontend**
- **HTML + CSS + JavaScript vanilla** (nessun framework: il codice deve restare leggibile
  per un principiante). **Chart.js** per i grafici. Design responsive.

**Backend** (in arrivo — Fase 2)
- **Supabase** (Postgres gestito) in **regione UE**: autenticazione (Google/email),
  database, **realtime** per la classifica.
- Il **server proprio** resta per il futuro o per le parti senza dati personali.

**Autenticazione**
- **Login con Google / email** tramite Supabase. (L'"ID client" Google è pubblico → può
  stare nel codice; nessun segreto da nascondere lato frontend.)

**Deploy**
- **GitHub** (`Regild23/bullrun`) → **Vercel** collegato al repo: **auto-deploy** a ogni
  push su `main`. Progetto Vercel: `bullrun`.
- ⬜ **Sottodominio** del sito del centro di ripetizioni: da agganciare (record DNS dal
  provider del dominio).
- Il backend Supabase **non** sta su Vercel.

---

## 11. Decisioni prese

| Data | Decisione |
|---|---|
| 2026-06 | MVP in vanilla HTML/CSS/JS + Chart.js (Sessione 1). |
| 2026-06 | Pubblicazione: GitHub pubblico + Vercel con auto-deploy. |
| 2026-06 | Backend = **Supabase (UE)** con **login email/Google** per i giocatori. |
| 2026-06 | Stile = **GameFi** (figo ma amichevole), **non** realmente on-chain. |
| 2026-06 | Dashboard = **"postazione di controllo"** interattiva (moduli che si illuminano alla selezione). |
| 2026-06 | Brand identity da sviluppare (forse con la sorella del papà); colori come variabili CSS. |

---

## 12. Direzione di design

**Stile:** "GameFi" — moderno e futuristico ma **luminoso e amichevole** (mai aggressivo o
da gambling). Dark mode, glow neon, glassmorphism, forme geometriche pulite.

**Dashboard:** una "postazione di controllo" dove ogni asset è un **modulo che si illumina
e spicca quando viene selezionato** (gli altri si attenuano).

**Palette provvisoria** (in attesa del brand):

| Ruolo | HEX | | Asset | Colore |
|---|---|---|---|---|
| Sfondo | `#070b16` | | Liquidità | ciano `#34e3ff` |
| Testo | `#eaf0ff` | | BTP/Bond | blu `#5b8cff` |
| Ciano | `#34e3ff` | | ETF | lime `#9bf06b` |
| Lime | `#9bf06b` | | Azioni | viola `#a875ff` |
| Viola | `#a875ff` | | Crypto | oro `#ffce5a` |
| Oro | `#ffce5a` | | REIT | rosa `#ff6bd0` |
| Rosa | `#ff6bd0` | | | |

I colori stanno come **variabili CSS** (`:root`): quando arriva il brand definitivo si
cambiano in un punto solo.

---

## 13. Privacy & sicurezza (importante: utenti minorenni)

Gli utenti sono **minori (12-18)** e con Google si raccolgono **nome ed email reali**.
Pratiche da rispettare:
- **Regione UE** per i dati (Supabase).
- **Dato minimo**: solo nome/email/avatar, niente di più.
- **Consenso dei genitori per gli under 14** (in Italia la soglia del consenso digitale è 14).
- **Informativa privacy** semplice e possibilità di **cancellare i dati**.
- **DPA** (accordo sul trattamento dati) con Supabase.

> ⚠️ Questo non è consulenza legale. Se BullRun entra in scuole vere, far verificare il
> tutto da un professionista.

---

## 14. Struttura dei file

```
bullrun/
├── index.html          # Dashboard MVP (gioco attuale, online)
├── style.css           # Stile della dashboard MVP
├── script.js           # Logica del gioco (commentata in italiano)
├── README.md           # Guida "come funziona" per la Sessione 1
├── PROGETTO.md         # ← QUESTO file (fonte di verità)
├── mockup/
│   └── dashboard.html  # Bozza dashboard stile GameFi
└── design/
    ├── brief-grafiche.md   # Prompt dettagliati per generare le grafiche
    └── istruzioni-qwen.md  # Istruzione breve (~1000 caratteri) per Qwen
```

---

## 15. Roadmap

**Fase 1 — MVP locale** ✅
- [x] Dashboard con €10.000, investimento ETF, "Avanza Mese", grafico Chart.js
- [x] Online su GitHub + Vercel

**Fase 2 — Tutti gli asset + eventi + home**
- [ ] Nuova **home/login** in stile GameFi (Accedi con Google)
- [ ] Dashboard "postazione di controllo" (dalla bozza)
- [ ] Tutti gli asset con logica di prezzo
- [ ] Biblioteca di 20+ eventi di mercato con spiegazioni
- [ ] PAC mensile automatico

**Fase 3 — Multiplayer (Supabase)**
- [ ] Account (Google/email), nickname, avatar
- [ ] Leaderboard pubblica in tempo reale
- [ ] Stagioni gestite dall'admin

**Fase 4 — Polish**
- [ ] Achievement, storico mosse, mosse parz. visibili, admin panel, animazioni

---

## 16. Convenzioni di sviluppo

- **Solo vanilla** HTML/CSS/JS, niente framework né build.
- **Commenti in italiano**, spiegando i concetti (il codice è materiale didattico per un
  ragazzo di 12 anni).
- **Nomi in italiano** (`liquidita`, `valoreETF`, `avanzaMese`…).
- **Regole del gioco** come `const` in cima ai file, facili da modificare e sperimentare.
- **Colori** sempre come variabili CSS.

---

## 17. Come eseguire in locale

Apri `index.html` con un doppio click (serve internet la prima volta per Chart.js).
In alternativa, un piccolo server statico: `python3 -m http.server 8000`.
