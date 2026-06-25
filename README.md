# 📈 BullRun — Sessione 1

Un gioco per imparare a investire, costruito un pezzo alla volta.
Questa è la **prima versione**: parti con €10.000, investi in un ETF e
guardi come cresce (o cala!) mese dopo mese.

---

## ▶️ Come si gioca

1. Apri il file **`index.html`** con un doppio click (si apre nel browser).
2. Scrivi quanti euro vuoi investire e premi **"Investi in ETF"**.
3. Premi **"Avanza Mese"** tante volte: ogni mese il mercato si muove a caso.
4. Guarda il grafico salire e scendere. L'obiettivo è far crescere il
   **Patrimonio Totale**! 🚀

> 💡 Serve internet la prima volta, perché il grafico usa una libreria
> esterna (Chart.js) che il browser scarica al volo.

---

## 🧩 I tre file (e cosa fa ciascuno)

Una pagina web è fatta di tre "linguaggi", uno per ogni mestiere:

| File | Mestiere | Paragone |
|------|----------|----------|
| `index.html` | **Struttura**: cosa c'è nella pagina | Lo scheletro 🦴 |
| `style.css`  | **Aspetto**: colori, forme, spazi | Il vestito 👕 |
| `script.js`  | **Comportamento**: cosa succede ai click | Il cervello 🧠 |

Funzionano insieme: l'HTML *chiama* il CSS e il JavaScript alla fine
(guarda le ultime righe di `index.html`).

---

## 🧠 Le idee importanti dentro `script.js`

- **Variabile** (`let liquidita = 10000`) → una scatola con un numero
  dentro, che possiamo cambiare.
- **Costante** (`const CAPITALE_INIZIALE = 10000`) → una scatola che NON
  cambia mai: sono le regole del gioco.
- **Funzione** (`function avanzaMese() { ... }`) → un trucco con un nome.
  Lo insegni una volta e poi lo richiami quando vuoi.
- **`if` / `else`** → "SE succede questo, ALTRIMENTI quest'altro".
- **`Math.random()`** → il dado del computer: un numero a caso tra 0 e 1.
- **Lista** (`storico`) → un elenco di numeri, qui il patrimonio di ogni mese.

---

## 🔧 Prova a cambiare (così impari!)

Apri `script.js` e modifica questi numeri in cima, poi ricarica la pagina:

```js
const RENDIMENTO_MINIMO = -8;    // prova -20 per un mercato più pazzo
const RENDIMENTO_MASSIMO = 10;   // prova +25 per guadagni più grossi
```

Oppure cambia il capitale iniziale:

```js
const CAPITALE_INIZIALE = 10000; // prova 50000... sei ricco!
```

---

## 🚀 Prossimi passi (sessioni future)

- [ ] **PAC**: ogni mese arrivano automaticamente +€1.000
- [ ] Altri asset: obbligazioni (BTP), crypto, azioni
- [ ] Eventi di mercato con spiegazione ("La Fed alza i tassi!")
- [ ] Un bottone "Vendi" per uscire dall'ETF
- [ ] Tanti giocatori e una classifica (leaderboard)

Un pezzo alla volta. Buon divertimento! 🐂
