# 🐂 BullRun — Diario di sviluppo

> Questo file racconta **come è nato e cresciuto BullRun**, passo dopo passo: cosa
> abbiamo costruito, le scelte di stile che abbiamo fatto e perché, le difficoltà
> incontrate e come le abbiamo risolte. È pensato come **materiale sorgente per le
> slide** della presentazione a scuola — ogni capitolo può diventare una o due slide.

**Il progetto in una frase:** un gioco web dove impari a investire gestendo un
portafoglio virtuale da 100.000€, senza rischiare un euro vero.

**Sito live:** https://bullrun.infomaat.it
**Codice:** https://github.com/Regild23/bullrun (pubblico)
**Periodo di sviluppo:** dal 25 giugno 2026 a oggi

---

## 📚 Indice dei capitoli

1. [L'idea e il primo prototipo](#1-lidea-e-il-primo-prototipo)
2. [Il gioco va online](#2-il-gioco-va-online)
3. [Un vero design: dalla bozza al brand](#3-un-vero-design-dalla-bozza-al-brand)
4. [La cameretta e la postazione di controllo](#4-la-cameretta-e-la-postazione-di-controllo)
5. [Il login: entrare nel gioco per davvero](#5-il-login-entrare-nel-gioco-per-davvero)
6. [Un indirizzo vero: bullrun.infomaat.it](#6-un-indirizzo-vero-bullruninfomaatit)
7. [Stagione 1: countdown, classifica, premi](#7-stagione-1-countdown-classifica-premi)
8. [Le skin da collezionare](#8-le-skin-da-collezionare)
9. [Rifiniture: economia reale, ticker, spiegazioni](#9-rifiniture-economia-reale-ticker-spiegazioni)
10. [Le scatole da aprire: dal disegno statico al video 3D](#10-le-scatole-da-aprire-dal-disegno-statico-al-video-3d)
11. [Stack tecnico in breve](#11-stack-tecnico-in-breve)
12. [Cosa manca ancora (roadmap)](#12-cosa-manca-ancora-roadmap)

---

## 1. L'idea e il primo prototipo

**Obiettivo:** costruire un gioco che insegni a investire ai ragazzi delle medie,
senza che sembri una lezione. Progetto padre-figlio: il codice doveva essere
abbastanza semplice da poter essere letto e capito da un ragazzo di 12 anni.

**Cosa abbiamo costruito (Sessione 1):**
- Una prima dashboard: capitale iniziale di €10.000, un bottone "Investi in ETF",
  un bottone "Avanza mese" che applica un rendimento casuale, un grafico
  dell'andamento del patrimonio con Chart.js.

**🎨 Scelta di stile — perché vanilla JS?**
Niente framework (React, Vue...), niente build tool. Solo **HTML + CSS +
JavaScript puro**, con tantissimi commenti in italiano che spiegano i concetti
(variabili, funzioni, cicli, `Math.random()`...). Un framework avrebbe reso il
codice illeggibile per chi sta imparando: qui ogni riga si può aprire e leggere
come un libro.

---

## 2. Il gioco va online

**Difficoltà:** un gioco fatto in casa serve a poco se resta solo sul computer.
Bisognava renderlo raggiungibile da chiunque, con un link vero.

**Cosa abbiamo fatto:**
- Creato un repository **GitHub pubblico** (così i professori possono vedere il
  codice: `github.com/Regild23/bullrun`).
- Collegato **Vercel** al repository: da quel momento, ogni volta che il codice
  cambia su GitHub, il sito si **ripubblica da solo** in pochi secondi.

**💡 La parte "magica" da mostrare in slide:** non serve nessun passaggio manuale
per pubblicare un aggiornamento — si scrive il codice, si salva, e il sito online
si aggiorna automaticamente. È il flusso di lavoro che usano gli sviluppatori veri.

---

## 3. Un vero design: dalla bozza al brand

**Obiettivo:** BullRun doveva avere un aspetto suo, riconoscibile — non "il solito
sito con Bootstrap".

**Cosa abbiamo fatto:**
- Creata l'identità **GameFi**: tema scuro, bagliori al neon, pannelli semi
  trasparenti ("vetro"), colori che si illuminano al passaggio del mouse.
- Generato con l'intelligenza artificiale (Qwen) il **logo**: un toro stilizzato
  con gradiente lime→ciano e corna lavanda — è diventato la base di tutta la
  palette colori del sito.
- Un secondo strumento di design ("Claude Design") ha prodotto un **design
  system completo**: colori, font, spaziature, componenti pronti (bottoni, carte,
  badge...).

**🧩 Difficoltà — tradurre React in vanilla.**
Il design system arrivato era scritto in **React** (componenti `.jsx`), ma il
nostro sito è vanilla. Non potevamo copiarlo — bisognava **ricostruire ogni
componente in CSS puro**, mantenendo esattamente gli stessi colori, dimensioni e
animazioni. È stato un lavoro di "traduzione" pezzo per pezzo.

**🎨 Scelte di stile spiegate:**
| Elemento | Scelta | Perché |
|---|---|---|
| Font titoli | Space Grotesk | Tecnico ma amichevole, numeri molto leggibili |
| Font testo | DM Sans | Semplice, caldo, facile da leggere |
| Font prezzi/numeri | JetBrains Mono | Le cifre si allineano in colonna, come una vera app finanziaria |
| Icone | Lucide (linee semplici) | Coerenti, **niente emoji** — il brand parla con i colori, non con le faccine |
| Colori per asset | Ogni asset ha un colore fisso | Liquidità=ciano, BTP=blu, ETF=lime, Azioni=ciano scuro, Crypto=lavanda, Immobili=ambra |
| Tono di voce | Informale ("tu"), incoraggiante | Mai spaventoso, mai da "banca seria" |

---

## 4. La cameretta e la postazione di controllo

**L'idea più originale del progetto:** invece di un menu con dei bottoni, il
giocatore entra nella **propria cameretta**, dove ogni oggetto (un grafico
appeso al muro, una moneta Bitcoin, un portafoglio che fluttua...) è un portale
che si illumina al passaggio del mouse e ti porta dentro un asset diverso.

**Cosa abbiamo costruito:**
- **Hub "La tua cameretta"** — un'immagine generata con l'AI, con 6 zone
  cliccabili invisibili posizionate sopra gli oggetti (Azioni, ETF, Crypto, BTP,
  Immobili, Portafoglio).
- **Dashboard di gioco** — la vera "postazione di controllo": patrimonio totale,
  grafico, i 6 asset selezionabili, l'evento della settimana, il bottone "Avanza
  settimana".

**🧩 Difficoltà — allineare le zone cliccabili a un'immagine fotorealistica.**
Le zone dovevano cadere **esattamente** sopra gli oggetti disegnati (il grafico,
la moneta, la casetta...), ma a occhio è facile sbagliare di qualche pixel. La
soluzione: uno **script Python** che analizza l'immagine pixel per pixel,
cercando le zone più sature e luminose (i bagliori al neon di ogni oggetto), e
restituisce le coordinate esatte in percentuale. Quando l'immagine della
cameretta è stata **rifatta da zero** (il laptop è diventato un portafoglio
neon), lo stesso script ha permesso di ricalibrare tutto in pochi minuti invece
che a tentativi.

---

## 5. Il login: entrare nel gioco per davvero

**Obiettivo:** ogni giocatore deve avere un proprio account, per salvare i
progressi (in futuro) e comparire nella classifica.

**Cosa abbiamo fatto:**
- Scelto **Supabase** come "magazzino" degli account (gestisce email, password,
  e in futuro i dati salvati di ogni giocatore).
- Attivato il **login con email** e il **login con Google** (con la sua
  schermata di consenso vera).
- Creata la pagina di login/iscrizione, nello stesso stile del resto del sito.

**🧩 Difficoltà incontrate:**
- **Google ha cambiato interfaccia** proprio mentre configuravamo l'accesso: la
  vecchia schermata "OAuth consent screen" non esisteva più, sostituita dalla
  nuova "Google Auth Platform" — abbiamo dovuto seguire la nuova procedura passo
  passo.
- **Un "nome strano" nella schermata di Google.** Dopo il login con Google,
  appariva scritto un indirizzo tecnico (`liiyiquajopuqneohaus.supabase.co`)
  invece di "BullRun". Abbiamo scoperto che è un comportamento **normale**:
  Google mostra sempre il vero indirizzo di destinazione per sicurezza. Si
  potrebbe nascondere solo pagando un piano superiore di Supabase — per ora
  resta così, è solo estetico.

---

## 6. Un indirizzo vero: bullrun.infomaat.it

Passare da un indirizzo "di servizio" (`bullrun-xxxx.vercel.app`) a uno vero e
proprio, sul dominio della scuola/centro (**INFOMAAT**).

**Come funziona "dietro le quinte":** abbiamo aggiunto un **record DNS** (un
puntamento) nel pannello del provider (TopHost), che dice "quando qualcuno cerca
bullrun.infomaat.it, mandalo al server di Vercel". Vercel ha poi attivato da
solo il certificato di sicurezza (HTTPS).

---

## 7. Stagione 1: countdown, classifica, premi

Per rendere il gioco una vera **gara**, non solo una simulazione:

- **Countdown live** in home page: conta alla rovescia fino alla fine della
  Stagione 1 (7 giugno 2027), aggiornato ogni secondo.
- **Premio ai primi 3** in classifica a fine stagione.
- **Classifica** — una nuova pagina dedicata, con podio (oro/argento/bronzo) e
  15 posizioni.

**⚠️ Trasparenza importante:** per ora la classifica mostra **dati di esempio**,
non i giocatori veri — è dichiarato chiaramente sulla pagina stessa. La
classifica reale arriverà quando costruiremo il "magazzino" condiviso dei
punteggi di tutti i giocatori (serve un pezzo di backend in più).

---

## 8. Le skin da collezionare

Un'idea per rendere il gioco più "da collezionare": il toro-logo può avere
**skin diverse** (versione fuoco, versione diamante, versione Super Sayan...),
generate con l'intelligenza artificiale, da sbloccare giocando.

**🧩 Difficoltà — togliere lo sfondo alle immagini.**
Le immagini generate arrivavano con uno sfondo bianco pieno, non trasparente —
inutilizzabili su un sito a tema scuro. Niente Photoshop a disposizione: abbiamo
scritto un **piccolo programma Python** che:
1. riconosce il colore dello sfondo,
2. rende trasparente **solo** la zona di quel colore collegata al bordo
   dell'immagine (così non "buca" per errore un dettaglio chiaro interno, come
   il muso bianco del toro-diamante),
3. ammorbidisce il bordo del ritaglio.

Ha funzionato bene su 8 immagini su 9 — l'unica eccezione (la skin "anni 20", con
uno sfondo a pergamena non uniforme) è rimasta con lo sfondo originale, perché il
ritaglio automatico rischiava di "mangiare" il cappello del toro.

Le immagini sono state anche **ridimensionate e compresse**: da 13 MB totali a
meno di 1 MB, per non appesantire il sito.

**Il carosello:** le skin scorrono in landing page in un nastro **infinito**
(quando una carta esce da un lato, ne rientra un'altra dall'altro, senza stacchi
visibili) — si ferma quando ci passi sopra il mouse.

---

## 9. Rifiniture: economia reale, ticker, spiegazioni

**Il capitale sale a 100.000€** (da 10.000€), per un'esperienza più "da grande
investitore".

**La sezione "Sei modi per investire" è diventata una piccola enciclopedia.**
Prima erano 6 schede statiche con numeri finti. Ora è **una lista + un pannello
che si apre**: clicchi su un asset (es. "Crypto") e a destra appare una scheda
con il **livello di rischio** (1-5), il **rendimento atteso** e una spiegazione
semplice ma seria di cosa è e perché si comporta così.

**🧠 La lezione più importante del gioco: l'inflazione.**
"Soldi fermi sono soldi morti." Abbiamo insegnato al gioco che la **liquidità
non investita perde valore nel tempo** per l'inflazione — impostata al 3% annuo,
spalmata settimana per settimana (una formuletta matematica: ogni settimana il
valore si riduce dello 0,0586%, che in un anno fa esattamente -3%).

**🧩 Difficoltà — un numero che nascondeva la lezione.** Il saldo di liquidità
cresce comunque ogni settimana, grazie a un piccolo bonus fisso che il gioco dà a
tutti (per non far restare mai nessuno "bloccato" a zero). Ma la percentuale
mostrata a schermo, all'inizio, **sommava** l'effetto del bonus e dell'inflazione
insieme — il risultato era una percentuale positiva, che nascondeva
completamente la lezione! Abbiamo separato i due numeri: il saldo cresce (per il
bonus), ma la percentuale mostrata resta sempre il vero tasso di erosione,
negativo.

**Il ticker delle notizie.** Una banda che scorre sotto il menu, stile
telegiornale finanziario, con indici di borsa e criptovalute che scorrono in
loop continuo. *(Nota: i valori sono illustrativi, non collegati a un mercato
reale in tempo reale.)*

---

## 10. Le scatole da aprire: dal disegno statico al video 3D

**Obiettivo:** dare alle skin un vero modo di essere vinte, invece di sbloccarle a
caso. L'idea: **scatole misteriose** da aprire, con un'animazione che le renda
speciali.

**Cosa abbiamo costruito:**
- All'iscrizione si parte con **una sola skin** (quella del logo). Tutte le
  altre si vincono aprendo scatole.
- Nel profilo, cliccando una scatola si apre un pannello con l'animazione di
  apertura, che rivela una skin bloccata a caso e la sblocca per sempre.
- La foto profilo è semplicemente "la skin che hai scelto di indossare in
  quel momento".

**🎨 Prima idea: Qwen. Poi il cambio di rotta: Blender.**
Il primo tentativo è stato generare con **Qwen** (la stessa AI usata per logo e
skin) un'immagine 2D della scatola, da animare con un tremolio e un lampo fatti
in CSS. Funzionava, ma restava piatta — non rendeva l'idea di una vera scatola
che si apre in tre dimensioni.

La svolta: collegare Claude direttamente a **Blender** (il programma di
modellazione 3D, gratuito e open source) tramite un **MCP** — un "ponte" che
permette a un'intelligenza artificiale di guidare un programma esterno con dei
comandi, invece di limitarsi a scrivere testo o codice. Con questo collegamento,
Claude ha potuto **costruire un modello 3D** vero e proprio (base + coperchio,
bordi al neon), **animarlo** (ferma → trema sempre più forte → il coperchio
vola via) e **renderizzarlo** in un video.

**🧩 Difficoltà — un Blender pieno di sorprese.**
Il programma installato aveva l'interfaccia in italiano, e questo ha creato più
di un imprevisto: anche i nomi "di fabbrica" dei componenti interni (i "nodi")
erano tradotti, quindi cercarli con il nome inglese standard falliva sempre
(es. "Background" non esisteva, si chiamava "Sfondo"). Anche l'effetto di
bagliore ("bloom") — quello che fa sembrare i bordi davvero al neon — non era
disponibile nel modo consueto in questa versione. Soluzione: il bagliore è
stato aggiunto **dopo**, fotogramma per fotogramma, con lo stesso tipo di
programma Python usato per pulire lo sfondo delle skin (capitolo 8) — si
individuano i pixel più luminosi, si sfocano, e si "sommano" sopra come un vero
alone di luce.

**Il risultato:** un video di 3 secondi (90 fotogrammi), appena 160 KB —
leggerissimo per il sito, ma con un effetto molto più curato di una semplice
animazione CSS.

---

## 11. Stack tecnico in breve

| Livello | Tecnologia | Perché |
|---|---|---|
| Frontend | HTML + CSS + JavaScript vanilla | Leggibile da un principiante, zero build |
| Font | Google Fonts (Space Grotesk, DM Sans, JetBrains Mono) | Vedi capitolo 3 |
| Icone | Lucide | Coerenti, leggere, no emoji |
| Grafici | Chart.js / SVG disegnato a mano | Semplice da capire e modificare |
| Autenticazione | Supabase (email + Google) | Gratuito, pronto all'uso, sicuro |
| Hosting | Vercel | Auto-deploy da GitHub, HTTPS automatico |
| Dominio | bullrun.infomaat.it (DNS su TopHost) | Indirizzo professionale, non "di servizio" |
| Codice sorgente | GitHub pubblico | I professori possono vederlo e verificarlo |

**Le pagine del sito oggi:**
- `index.html` — Landing page (spiega il gioco, statistiche, countdown, skin)
- `login.html` — Accedi / Iscriviti
- `hub.html` — "La tua cameretta" (il menu di gioco)
- `dashboard.html` — La partita vera (portafoglio, asset, eventi, turni)
- `azioni.html` — Prima "stanza" dedicata a un singolo asset: si comprano e
  vendono azioni di aziende (inventate) con la propria liquidità
- `profile.html` — Profilo giocatore, collezione skin e scatole da aprire
- `classifica.html` — Classifica di Stagione 1

---

## 12. Cosa manca ancora (roadmap)

Essere onesti su cosa è "vero" e cosa è ancora una base da completare è
importante — anche questo si può raccontare in una slide ("il progetto continua"):

- ⬜ **Salvataggio reale dei progressi** — oggi il gioco non ricorda nulla se
  ricarichi la pagina: patrimonio, XP e settimana ripartono da un valore demo.
- ⬜ **Classifica vera** — oggi mostra dati di esempio; serve il "magazzino"
  condiviso dei punteggi di tutti i giocatori (backend Supabase).
- ⬜ **Comprare/vendere per davvero** — oggi si può solo *selezionare* un asset
  per vederne i dettagli, non spostare i propri soldi da un asset all'altro.
- ⬜ **Sistema punti XP più ricco** — oggi si guadagna XP solo avanzando di
  settimana; idee allo studio: bonus per l'accesso giornaliero, bonus quando si
  ribilancia il portafoglio.
- ✅ **Sblocco delle skin** — fatto: si vincono aprendo scatole (capitolo 10).
  Manca ancora **come si guadagnano le scatole** giocando (per ora ce n'è
  sempre una pronta, di proposito, per poter continuare a testare).
- 🔶 **Dashboard diverse per ogni asset** — iniziata: "Azioni" ha già la sua
  schermata dedicata (mercato + portafoglio + vendita). Mancano ancora ETF,
  Crypto, BTP e Immobili, che per ora portano alla dashboard generale.

---

*Documento aggiornato mano a mano che il progetto cresce. Ultima modifica:
vedi la data dell'ultimo commit su GitHub.*
