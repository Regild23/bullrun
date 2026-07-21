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
11. [Il salvataggio vero: il gioco si ricorda di te](#11-il-salvataggio-vero-il-gioco-si-ricorda-di-te)
12. [Il tempo di gioco diventa tempo reale](#12-il-tempo-di-gioco-diventa-tempo-reale)
13. [Prezzi veri per Azioni ed ETF](#13-prezzi-veri-per-azioni-ed-etf)
14. [La scheda dei titoli: grafico vero e prima scheda azienda](#14-la-scheda-dei-titoli-grafico-vero-e-prima-scheda-azienda)
15. [Stack tecnico in breve](#15-stack-tecnico-in-breve)
16. [Cosa manca ancora (roadmap)](#16-cosa-manca-ancora-roadmap)

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

## 11. Il salvataggio vero: il gioco si ricorda di te

**Obiettivo:** fino a questo momento, ricaricando la pagina il gioco
ripartiva sempre dagli stessi valori di prova — patrimonio, settimana, XP,
tutto si dimenticava. Era il primo punto della lista "cosa manca ancora"
(capitolo 14): costruirlo davvero.

**Cosa abbiamo costruito:**
- Una tabella su **Supabase** (lo stesso "magazzino" già usato per il
  login) con una riga per ogni giocatore: quanto ha in ogni asset, la
  settimana, l'XP, le skin sbloccate, le scatole ancora da aprire.
- Regole di sicurezza (si chiamano **RLS**, Row Level Security) che
  garantiscono che ogni giocatore possa leggere e scrivere SOLO la
  propria riga, mai quella di un altro — anche conoscendo la chiave
  pubblica del sito.
- Un file JavaScript condiviso (`js/stato-gioco.js`) con due sole funzioni
  che ogni pagina usa: una per caricare i progressi all'apertura, una per
  salvarli dopo ogni azione. Se non hai fatto login, o se qualcosa va
  storto con la connessione, il gioco **non si blocca mai**: semplicemente
  non salva, esattamente come prima.

**🧩 Difficoltà — due "portafogli azioni" che non si parlavano.**
Costruendo il salvataggio ci siamo accorti che la dashboard generale e la
stanza "Azioni" (capitolo 9) tenevano due numeri completamente separati
per lo stesso concetto — quanto vale il tuo investimento in azioni. Prima
il problema si "risolveva da solo" ad ogni ricaricamento, perché tutto
ripartiva da zero. Con un salvataggio vero, però, sarebbe rimasto un
errore permanente e visibile per sempre. Abbiamo unificato tutto: ora
esiste UNA sola fonte di verità (le posizioni possedute azienda per
azienda), e la dashboard generale ne mostra sempre la somma.

**🧩 Difficoltà — un numero che "scivolava" senza che nessuno se ne
accorgesse.** Il "guadagno totale" veniva calcolato confrontando il
patrimonio di oggi con il primo valore dello storico del grafico — ma
quello storico tiene solo le ultime settimane (per non far diventare il
grafico enorme), quindi con il tempo il confronto sarebbe diventato
silenziosamente sbagliato. L'abbiamo scoperto **testando il gioco per
decine di settimane di fila nel browser**, non a occhio guardando il
codice. Soluzione: un campo separato che registra il vero capitale di
partenza una volta sola, per sempre, e non viene più toccato.

**Pulizia finale:** tolti i valori "gonfiati" usati solo per fare le
prove (liquidità a 100 milioni, una scatola sempre pronta). Un nuovo
giocatore parte ora con **€124.800** veri, esattamente come già
dichiarato nel resto del sito, e una sola scatola "di benvenuto".

---

## 12. Il tempo di gioco diventa tempo reale

**Cambio di game design:** fino a qui si avanzava di settimana premendo un
bottone. Rileggendo il codice del salvataggio ci siamo chiesti: ha senso
che il tempo del gioco dipenda da quante volte clicchi? Deciso di no — la
settimana di gioco deve corrispondere alla vera settimana di calendario
da quando ti sei iscritto. Il bottone "Avanza settimana" è sparito, ma **il
concetto di settimana resta**: ogni giocatore ha sempre la sua, con un
evento di mercato collegato — semplicemente non serve più cliccare per
farla avanzare.

**🧩 Difficoltà — nessun "orologio" acceso da qualche parte.** Il sito non
ha un computer sempre acceso che tiene il tempo per conto suo (niente
server dedicato, niente processo che gira in background). Soluzione: ogni
volta che una pagina si apre, controlliamo quanto tempo vero è passato
dall'iscrizione e, se è iniziata una nuova settimana, la simuliamo lì per
lì — anche più di una in fila, una alla volta, se sei stato via a lungo.
Succede tutto in un istante, prima ancora che la pagina inizi a
disegnarsi.

**🧩 Difficoltà — un secondo bug scoperto testando, non a occhio.**
Togliendo il bottone stavamo per introdurre un problema nuovo: le
percentuali di guadagno/perdita di ogni asset si sarebbero bloccate per
sempre a "+0,0%", perché l'unica cosa che le faceva muovere prima era
proprio il click sul bottone. Trovato simulando nel browser un giocatore
"tornato dopo settimane di assenza", invece di aspettare settimane vere
per accorgersene. Corretto salvando, ad ogni caricamento, una fotografia
di "come stava il portafoglio un attimo prima di aggiornarsi".

**💡 Idea per dopo (non ancora fatta):** gli eventi di mercato (le 5
notizie che si alternano, capitolo 9) restano per ora un elenco fisso e
inventato, che gira in ciclo — slegato da cosa succede davvero nel mondo.
Ora che il tempo di gioco è tempo reale, l'idea naturale è collegarli a
qualcosa di più vero: ancora tutta da progettare (vedi roadmap).

---

## 13. Prezzi veri per Azioni ed ETF

**Obiettivo:** l'idea più ambiziosa fin qui. Non bastava più che il tempo di
gioco fosse reale (capitolo 12): anche i PREZZI dovevano diventare veri,
non più inventati da una formula interna. Le 8 aziende immaginarie
("NovaTech" e le altre, capitolo 9) diventano **40 aziende vere** (Apple,
Tesla, Nike, Roblox, Ferrari...), con **5 ETF veri** in una stanza tutta
nuova.

**Cosa abbiamo costruito:**
- Un fornitore di dati di mercato vero (**Twelve Data**), scelto dopo aver
  confrontato diverse alternative su affidabilità, limiti gratuiti e
  facilità d'uso.
- Il **primo pezzo di codice "server"** che questo sito abbia mai avuto:
  `api/prezzi.js`, un piccolo "postino" che chiede i prezzi veri e li
  scrive in una tabella condivisa (`prezzi_mercato`), letta da tutte le
  pagine di gioco.
- Azioni ed ETF non salvano più un euro già calcolato: salvano **quante
  "quote" possiedi** di ognuno. Il valore vero si ottiene sempre
  moltiplicando per il prezzo del momento — mai un numero vecchio.
- Una nuova stanza, `etf.html`, gemella di `azioni.html`: il posto per
  gli ETF nella cameretta esisteva già da tempo (uno dei 6 oggetti
  cliccabili), ma portava ancora alla dashboard generale invece che a una
  schermata sua. Sistemato.

**🧩 Difficoltà — "una volta al giorno" non è tempo reale.** Il piano
gratuito di Vercel, dove vive il sito, accetta aggiornamenti automatici
("Cron Job") **solo una volta al giorno** — rifiuta proprio in fase di
pubblicazione qualunque programmazione più frequente. Soluzione: il
repository del codice è già pubblico su GitHub, e **GitHub Actions**
offre programmazioni ricorrenti gratuite, senza quel limite. Risultato:
i prezzi si aggiornano **ogni ora**, solo dalle 8 alle 24 (di notte,
quando nessuno gioca, niente chiamate sprecate) — 40 aziende + 5 ETF
restano comodamente dentro il budget gratuito giornaliero del fornitore
dati.

**🧩 Difficoltà — quante aziende mostrare?** Un vero negoziato in corso
d'opera: prima proposte 100 (l'indice ufficiale S&P 100), poi il padre ha
fatto notare che per dei ragazzini conta di più avere prezzi FRESCHI che
100 nomi diversi — con meno aziende si liberano richieste per aggiornare
più spesso. Ridotto a 20, poi rialzato ad **almeno 40** scelte a mano
(nomi riconoscibili, non un indice ufficiale). La lezione: più titoli
segui, meno spesso puoi permetterti di aggiornarli, a parità di budget
gratuito — un compromesso vero, non solo tecnico.

**🔒 Una decisione di sicurezza spiegata bene.** La nuova tabella dei
prezzi non appartiene a nessun giocatore in particolare: chi può
scriverci? Si poteva creare una "chiave segreta universale" (più potente,
ma il progetto aveva deciso fin dall'inizio di non averne mai una), oppure
riusare la stessa chiave pubblica di sempre, dandole il permesso di
scrivere SOLO in quella tabella. Scelta la seconda: stessa chiave di
sempre, nessun nuovo tipo di rischio introdotto — il danno peggiore
possibile, se qualcuno ne abusasse, è "un prezzo sbagliato per un'ora",
corretto da solo al giro successivo.

**Ancora da fare:** eseguire lo schema aggiornato su Supabase e collegare
una vera chiave Twelve Data — il codice è pronto, ma non ancora
"acceso" sul sito vero.

---

## 14. La scheda dei titoli: grafico vero e prima scheda azienda

**Obiettivo:** in `azioni.html`/`etf.html` (capitolo 13) una card del mercato
mostrava solo nome, prezzo e un bottone "Compra" - clic diretto, senza sapere
altro sull'azienda. L'idea: "scopri, poi decidi" - cliccando un titolo si apre
un pannello con il grafico del suo andamento e qualche informazione vera
sull'azienda, prima di comprare.

**Cosa abbiamo costruito:**
- Il grafico: niente storico nostro da costruire (all'inizio avrebbe mostrato
  solo poche ore/giorni). Incorporato invece il widget gratuito di
  **TradingView** ("Advanced Chart"): nessuna chiave API nostra, grafico a
  candele vero con tutta la storia reale del titolo, tema scuro che si intona
  da solo allo stile del sito.
- Una nuova tabella condivisa, `profili_titoli` (settore, chi guida
  l'azienda, capitalizzazione, una curiosità scritta a mano per ognuno dei 45
  titoli), aggiornata una volta a settimana - molto più raramente dei prezzi
  (capitolo 13), perché questi dati cambiano lentissimamente. Stesso schema
  di `api/prezzi.js`: un nuovo "postino" gemello, `api/profili.js`, con il
  suo orologio dedicato via GitHub Actions.
- Il pannello di dettaglio riusa lo stesso pattern del pannello "apri
  scatola" già costruito nel profilo (capitolo 10): stessa struttura, stessa
  sensazione di coerenza in tutto il sito.

**🧩 Difficoltà — non tutti i dati sono garantiti gratis.** Non è certo che
il piano gratuito di Twelve Data includa capitalizzazione e dirigenti (a
differenza del prezzo, capitolo 13): segnali contrastanti cercando online.
Invece di bloccare tutto in attesa di certezze, `api/profili.js` è scritto
per gestire bene anche il "non ce l'ho": se una chiamata fallisce o torna
vuota, quel campo resta assente e la scheda mostra solo quello che ha
davvero - mai un errore, esattamente come già succede con "Prezzo non
disponibile".

**🧩 Difficoltà — un ticker da solo non basta a TradingView.** Il widget
vuole sapere anche la borsa dove è quotato ogni titolo ("NASDAQ:AAPL", non
solo "AAPL"). Per la maggior parte dei 45 titoli non è stato un problema, ma
qualche caso era meno scontato - Shopify, per esempio, è passata da NYSE a
Nasdaq solo a marzo 2025, e Ferrari è quotata sia a Milano che a New York.
Verificati uno per uno invece di indovinare, per non rischiare un grafico che
non carica.

**🧩 Difficoltà scoperta testando, non a occhio.** Il pannello, provato nel
browser, si è rivelato un po' stretto per i nomi di fondo più lunghi
("Vanguard mercati internazionali"): su schermo piccolo il prezzo finiva
schiacciato accanto al nome. Corretto facendo scendere il prezzo su una riga
propria quando lo spazio è poco - la stessa lezione "verificalo davvero nel
browser prima di dire finito" già raccontata nei capitoli 11 e 12.

**Ancora da fare:** eseguire lo schema aggiornato su Supabase (la nuova
tabella `profili_titoli`) e collegare la chiave Twelve Data ad
`api/profili.js` - il codice è pronto ma non ancora "acceso" sul sito vero,
come già successo per i prezzi nel capitolo 13.

---

## 15. Stack tecnico in breve

| Livello | Tecnologia | Perché |
|---|---|---|
| Frontend | HTML + CSS + JavaScript vanilla | Leggibile da un principiante, zero build |
| Font | Google Fonts (Space Grotesk, DM Sans, JetBrains Mono) | Vedi capitolo 3 |
| Icone | Lucide | Coerenti, leggere, no emoji |
| Grafici | Chart.js / SVG disegnato a mano | Semplice da capire e modificare |
| Autenticazione + salvataggio | Supabase (email + Google, più il "magazzino" dei progressi, capitolo 11) | Gratuito, pronto all'uso, sicuro |
| Hosting | Vercel | Auto-deploy da GitHub, HTTPS automatico |
| Dominio | bullrun.infomaat.it (DNS su TopHost) | Indirizzo professionale, non "di servizio" |
| Codice sorgente | GitHub pubblico | I professori possono vederlo e verificarlo |

**Le pagine del sito oggi:**
- `index.html` — Landing page (spiega il gioco, statistiche, countdown, skin)
- `login.html` — Accedi / Iscriviti
- `hub.html` — "La tua cameretta" (il menu di gioco)
- `dashboard.html` — La partita vera (portafoglio, asset, eventi, turni)
- `azioni.html` — Prima "stanza" dedicata a un singolo asset: si comprano e
  vendono azioni di 40 aziende VERE, a prezzi di mercato veri
- `etf.html` — Seconda "stanza": stesso pattern di azioni.html, per 5 ETF veri
- `profile.html` — Profilo giocatore, collezione skin e scatole da aprire
- `classifica.html` — Classifica di Stagione 1

---

## 16. Cosa manca ancora (roadmap)

Essere onesti su cosa è "vero" e cosa è ancora una base da completare è
importante — anche questo si può raccontare in una slide ("il progetto continua"):

- 🔶 **Salvataggio reale dei progressi** — costruito (capitolo 11): la
  tabella su Supabase e il codice sono pronti. Manca l'ultimo passo pratico
  (eseguire lo schema sul database vero) prima che sia davvero attivo.
- ⬜ **Classifica vera** — oggi mostra dati di esempio; ogni riga del
  salvataggio è visibile solo al proprio giocatore, di proposito, per
  sicurezza — la classifica ha bisogno di una regola pensata apposta per
  leggere i punteggi di tutti insieme.
- 🔶 **Comprare/vendere per davvero** — fatto per Azioni ed ETF (capitoli
  9 e 13): un click, un importo fisso da spendere, ma ora al **prezzo
  vero** del momento (non più un numero inventato). Manca ancora per
  Crypto, BTP e Immobili, e un vero importo variabile (oggi si spende
  sempre €2.000 a click, non una cifra a scelta).
- ⬜ **Sistema punti XP più ricco** — oggi si guadagna XP solo con il
  passare del tempo (35 a settimana, automatico da capitolo 12); idee allo
  studio: bonus per l'accesso giornaliero, bonus quando si ribilancia il
  portafoglio.
- ✅ **Sblocco delle skin** — fatto: si vincono aprendo scatole (capitolo 10).
  Manca ancora **come si guadagnano le scatole** giocando (per ora c'è solo
  quella "di benvenuto" data all'iscrizione).
- 🔶 **Dashboard diverse per ogni asset** — Azioni ed ETF hanno già la loro
  schermata dedicata (capitoli 9 e 13). Mancano ancora Crypto, BTP e
  Immobili, che per ora portano alla dashboard generale.
- 🔶 **Grafico e scheda per ogni titolo** — fatto (capitolo 14): pannello con
  grafico TradingView vero e scheda azienda per Azioni ed ETF. Manca lo
  stesso ultimo passo pratico del salvataggio (capitolo 11) e dei prezzi
  (capitolo 13): eseguire lo schema su Supabase e collegare la chiave
  Twelve Data, prima che capitalizzazione e dirigenti siano davvero visibili
  (la curiosità scritta a mano, invece, c'è già).
- 🔶 **Eventi di mercato collegati a qualcosa di vero** — fatto per Azioni
  ed ETF (capitolo 13): i loro prezzi arrivano da un fornitore di dati
  vero, aggiornato ogni ora. Le 5 "notizie" inventate (capitolo 9) restano
  invece per Bond/Crypto/Immobili, ancora simulati - da collegare a
  qualcosa di vero uno alla volta, come già fatto per Azioni/ETF.

---

*Documento aggiornato mano a mano che il progetto cresce. Ultima modifica:
vedi la data dell'ultimo commit su GitHub.*
