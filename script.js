// ============================================================
//  BullRun - Il "cervello" del gioco (JavaScript)
// ============================================================
//  Questo file decide COSA SUCCEDE quando clicchiamo i bottoni.
//  L'HTML è lo scheletro, il CSS è il vestito, il JavaScript
//  è il cervello che fa muovere tutto.
//
//  Leggilo dall'alto verso il basso, come una ricetta. 👨‍🍳
// ============================================================


// ------------------------------------------------------------
//  1) LE REGOLE DEL GIOCO (numeri che puoi cambiare!)
// ------------------------------------------------------------
//  "const" vuol dire "costante": un valore che non cambia mai.
//  Sono le regole del gioco. Prova a cambiarle e vedi che succede!

const CAPITALE_INIZIALE = 10000;   // Con quanti euro si parte

// Quanto può salire o scendere l'ETF ogni mese (in percentuale).
// Con questi numeri a volte perdi, ma in media il mercato cresce.
const RENDIMENTO_MINIMO = -8;      // Mese sfortunato: -8%
const RENDIMENTO_MASSIMO = 10;     // Mese fortunato: +10%


// ------------------------------------------------------------
//  2) LA MEMORIA DEL GIOCO (le variabili)
// ------------------------------------------------------------
//  "let" crea una "scatola" con dentro un valore che PUÒ cambiare
//  durante il gioco (i nostri soldi cambiano in continuazione!).

let liquidita = CAPITALE_INIZIALE; // Soldi liberi, non ancora investiti
let valoreETF = 0;                 // Soldi messi dentro l'ETF
let mese = 0;                      // A che mese siamo arrivati

// "storico" è una LISTA (un elenco) che ricorda il patrimonio
// mese per mese. Serve per disegnare il grafico.
// All'inizio contiene solo il mese 0 con il capitale iniziale.
let storico = [CAPITALE_INIZIALE];


// ------------------------------------------------------------
//  3) AGGANCIAMO I PEZZI DELLA PAGINA
// ------------------------------------------------------------
//  Qui "prendiamo" gli elementi dell'HTML usando il loro id,
//  così dopo possiamo leggerli e modificarli dal codice.
//  document.getElementById("...") = "trovami quello con questo id".

const elPatrimonio = document.getElementById("patrimonio");
const elLiquidita  = document.getElementById("liquidita");
const elValoreETF  = document.getElementById("valore-etf");
const elMese       = document.getElementById("mese");
const elMessaggio  = document.getElementById("messaggio");
const campoImporto = document.getElementById("campo-importo");

const bottoneInvesti = document.getElementById("bottone-investi");
const bottoneAvanza  = document.getElementById("bottone-avanza");


// ------------------------------------------------------------
//  4) FUNZIONI DI AIUTO (piccoli aiutanti)
// ------------------------------------------------------------
//  Una "funzione" è un gruppo di istruzioni con un nome.
//  La scriviamo una volta e poi la possiamo usare quante volte vogliamo,
//  scrivendo solo il suo nome. È come insegnare un trucco al computer.

// Trasforma un numero (es. 10000) in una scritta bella (es. "€10.000").
function formattaEuro(numero) {
  // Math.round() arrotonda al numero intero più vicino (niente centesimi).
  let arrotondato = Math.round(numero);
  // toLocaleString("it-IT") mette il punto alle migliaia, come in Italia.
  return "€" + arrotondato.toLocaleString("it-IT");
}

// Scrive un messaggio nell'area in basso.
// "tipo" può essere "positivo", "negativo" oppure niente.
function mostraMessaggio(testo, tipo) {
  elMessaggio.innerHTML = testo;            // mettiamo il testo
  elMessaggio.className = "messaggio";      // togliamo i colori vecchi
  if (tipo) {
    elMessaggio.classList.add(tipo);        // aggiungiamo verde o rosso
  }
}


// ------------------------------------------------------------
//  5) AGGIORNARE LA DASHBOARD
// ------------------------------------------------------------
//  Questa funzione ricalcola i numeri e li riscrive nella pagina.
//  La chiamiamo ogni volta che qualcosa cambia.

function aggiornaDashboard() {
  // Il patrimonio totale è: soldi liberi + soldi nell'ETF.
  let patrimonio = liquidita + valoreETF;

  // Scriviamo i numeri (belli formattati) dentro la pagina.
  elPatrimonio.textContent = formattaEuro(patrimonio);
  elLiquidita.textContent  = formattaEuro(liquidita);
  elValoreETF.textContent  = formattaEuro(valoreETF);
  elMese.textContent       = mese;
}


// ------------------------------------------------------------
//  6) INVESTIRE NELL'ETF
// ------------------------------------------------------------
//  Sposta dei soldi dalla liquidità all'ETF.

function investiInETF() {
  // Leggiamo cosa ha scritto l'utente. Number() lo trasforma in numero.
  let importo = Number(campoImporto.value);

  // CONTROLLO 1: l'importo deve essere maggiore di zero.
  if (importo <= 0) {
    mostraMessaggio("✋ Scrivi un importo maggiore di zero!", "negativo");
    return; // "return" ferma subito la funzione: non andiamo avanti.
  }

  // CONTROLLO 2: non puoi investire più soldi di quanti ne hai liberi.
  if (importo > liquidita) {
    mostraMessaggio("✋ Non hai abbastanza liquidità! Hai solo " + formattaEuro(liquidita) + ".", "negativo");
    return;
  }

  // Se i controlli sono passati, spostiamo i soldi:
  liquidita = liquidita - importo;   // tolgo dalla liquidità
  valoreETF = valoreETF + importo;   // aggiungo all'ETF

  mostraMessaggio("✅ Hai investito " + formattaEuro(importo) + " nell'ETF S&P500!", "positivo");

  campoImporto.value = "";   // svuotiamo la casella di testo
  aggiornaDashboard();       // ridisegniamo i numeri aggiornati
}


// ------------------------------------------------------------
//  7) AVANZARE DI UN MESE (qui succede la magia!)
// ------------------------------------------------------------
//  Facciamo passare un mese: il mercato si muove a caso e l'ETF
//  guadagna o perde valore.

function avanzaMese() {
  // Math.random() dà un numero a caso tra 0 e 1 (es. 0.42).
  // Con questa formula lo trasformiamo in un numero a caso
  // tra RENDIMENTO_MINIMO e RENDIMENTO_MASSIMO.
  let rendimento = RENDIMENTO_MINIMO + Math.random() * (RENDIMENTO_MASSIMO - RENDIMENTO_MINIMO);

  // Applichiamo il rendimento all'ETF.
  // Esempio: 1000€ con rendimento +10% -> 1000 * 1,10 = 1100€.
  valoreETF = valoreETF * (1 + rendimento / 100);

  // È passato un mese!
  mese = mese + 1;

  // Calcoliamo il nuovo patrimonio e lo aggiungiamo allo storico.
  let patrimonio = liquidita + valoreETF;
  storico.push(patrimonio);   // .push() aggiunge un valore in fondo alla lista

  // Prepariamo un messaggio diverso se l'ETF è salito o sceso.
  // .toFixed(1) tiene solo 1 cifra dopo la virgola (es. 5.3).
  let percentuale = rendimento.toFixed(1);

  if (valoreETF === 0) {
    // Caso speciale: non abbiamo ancora investito niente nell'ETF.
    mostraMessaggio("🗓️ Mese " + mese + ": il mercato si è mosso, ma non hai ancora investito nell'ETF. Prova a investire qualcosa!");
  } else if (rendimento >= 0) {
    mostraMessaggio("📈 Mese " + mese + ": l'ETF è salito del +" + percentuale + "%! Ottimo lavoro.", "positivo");
  } else {
    mostraMessaggio("📉 Mese " + mese + ": l'ETF è sceso del " + percentuale + "%. Capita, fa parte del gioco!", "negativo");
  }

  aggiornaDashboard();   // aggiorniamo i numeri
  aggiornaGrafico();     // aggiorniamo il grafico
}


// ------------------------------------------------------------
//  8) IL GRAFICO (con la libreria Chart.js)
// ------------------------------------------------------------
//  Creiamo il grafico una volta sola all'inizio, poi lo aggiorniamo.

// "grafico" conterrà il nostro grafico, così possiamo aggiornarlo dopo.
let grafico;

function creaGrafico() {
  // Prendiamo la "tela" (canvas) dove disegnare.
  let tela = document.getElementById("grafico");

  // Creiamo il grafico Chart.js.
  grafico = new Chart(tela, {
    type: "line",   // tipo "line" = grafico a linea
    data: {
      // Le etichette in basso: "Mese 0", "Mese 1", ...
      labels: creaEtichette(),
      datasets: [{
        label: "Patrimonio",
        data: storico,                       // i dati da disegnare
        borderColor: "#16c784",              // colore della linea (verde)
        backgroundColor: "rgba(22, 199, 132, 0.1)", // verde trasparente sotto
        borderWidth: 3,
        fill: true,                          // colora la zona sotto la linea
        tension: 0.3,                        // rende la linea morbida
        pointBackgroundColor: "#16c784"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }           // nascondiamo la legenda
      },
      scales: {
        // L'asse verticale (i soldi)
        y: {
          ticks: {
            color: "#8b95b0",
            // Mettiamo il simbolo € davanti ai numeri dell'asse.
            callback: function (valore) {
              return "€" + valore.toLocaleString("it-IT");
            }
          },
          grid: { color: "#2a3352" }
        },
        // L'asse orizzontale (i mesi)
        x: {
          ticks: { color: "#8b95b0" },
          grid: { color: "#2a3352" }
        }
      }
    }
  });
}

// Crea la lista di etichette "Mese 0", "Mese 1", ... in base allo storico.
function creaEtichette() {
  let etichette = [];
  for (let i = 0; i < storico.length; i++) {
    etichette.push("Mese " + i);
  }
  return etichette;
}

// Aggiorna il grafico dopo che è passato un mese.
function aggiornaGrafico() {
  grafico.data.labels = creaEtichette();  // nuove etichette
  grafico.data.datasets[0].data = storico; // nuovi dati
  grafico.update();                        // ridisegna!
}


// ------------------------------------------------------------
//  9) COLLEGARE I BOTTONI ALLE FUNZIONI
// ------------------------------------------------------------
//  "addEventListener" vuol dire: "quando succede questa cosa
//  (un click), esegui questa funzione".

bottoneInvesti.addEventListener("click", investiInETF);
bottoneAvanza.addEventListener("click", avanzaMese);


// ------------------------------------------------------------
//  10) ACCENDIAMO IL GIOCO
// ------------------------------------------------------------
//  Quando la pagina si apre, prepariamo subito numeri e grafico.

aggiornaDashboard();
creaGrafico();
