// ============================================================
//  BullRun · Salvataggio dei progressi + motore settimanale
// ============================================================
//  Qui dentro c'è TUTTO quello che serve per ricordarsi come sta
//  andando la partita di un giocatore: settimana, soldi in ogni
//  asset, XP, skin, scatole... Le altre pagine (dashboard, azioni,
//  profilo, hub) chiamano solo due funzioni:
//
//    caricaStato()        - all'avvio della pagina, per sapere a che
//                            punto era rimasto il giocatore. Aggiorna
//                            ANCHE la partita da sola se è passata una
//                            settimana vera o più (vedi più sotto).
//    salvaStato(stato)     - dopo ogni azione che cambia qualcosa
//                            (comprare, vendere, aprire una scatola...)
//
//  Se non sei loggato, il gioco funziona lo stesso: semplicemente
//  non salva nulla (proprio come oggi). Se qualcosa va storto nel
//  collegamento a Supabase, NON blocchiamo mai il gioco: usiamo dei
//  valori di partenza e si continua a giocare, solo senza salvare.
//  Serve la tabella creata da supabase/schema.sql.
//
//  Il tempo di gioco è tempo REALE: non c'è un bottone "avanza
//  settimana" da premere. La settimana di gioco N è la N-esima
//  settimana di calendario da quando ti sei iscritto. Non avendo un
//  "orologio" che gira da solo su un server, il trucco è semplice:
//  ogni volta che una pagina carica lo stato, controlliamo se nel
//  frattempo è iniziata una nuova settimana vera, e se sì la
//  simuliamo (una alla volta, anche se ne sono passate diverse).

// I valori con cui parte un giocatore nuovo (o chi non è loggato).
// Sono GLI STESSI valori di partenza della tabella nel database (vedi
// supabase/schema.sql). "capitaleIniziale" qui è solo una stima di
// riserva: caricaStato() lo ricalcola giusto appena conosce i prezzi
// veri di azioni/etf (vedi patrimonioTotale() più sotto).
const STATO_INIZIALE = {
  username: 'Giocatore',
  settimana: 1,
  xp: 0,
  eventIdx: 0,
  // ⚠️ VALORE DI TEST: 100.000.000 invece di 12000, per provare compra/vendi
  // senza limiti mentre si collauda il salvataggio vero (vedi anche
  // supabase/schema.sql). Riportare a 12000 quando i test sono finiti.
  cash: 100000000,
  bond: 18500,
  crypto: 21500,
  realestate: 19000,
  // Azioni ed ETF non sono un numero in euro: sono posizioni possedute
  // (quantità), il cui valore vero si calcola sempre moltiplicando per
  // il prezzo di oggi - vedi sommaAzioni() più sotto.
  azioni: { AAPL: { quantita: 10 } },
  etf: { SPY: { quantita: 3 } },
  history: [124800],
  capitaleIniziale: 124800,
  skinEquipaggiata: 'classica',
  skinSbloccate: ['classica'],
  scatole: 1,
  // Chi gioca da ospite non ha una riga salvata, quindi non ha nemmeno una
  // vera data di iscrizione: niente countdown "prossimo aggiornamento" per
  // lui (le pagine controllano questo campo prima di mostrarlo).
  creatoIl: null,
};

// Una "fotocopia" vera di STATO_INIZIALE: se restituissimo sempre lo
// STESSO oggetto, due pagine (o due partite da ospite) finirebbero
// per condividere per sbaglio gli stessi elenchi/oggetti dentro.
// structuredClone() fa una copia completa, non solo dell'etichetta.
function copiaStatoIniziale() {
  return structuredClone(STATO_INIZIALE);
}


// ------------------------------------------------------------
//  IL MOTORE SETTIMANALE — le regole del gioco (fisse, non cambiano
//  mentre giochi) e la funzione che simula UNA settimana.
//  "prova a cambiare questo numero" per sperimentare con le regole.
// ------------------------------------------------------------

const MS_PER_SETTIMANA = 7 * 24 * 60 * 60 * 1000;
// Quante settimane si possono "recuperare" al massimo in un colpo solo:
// una protezione contro un orologio del computer sballato (non contro un
// giocatore via per tanto tempo - 520 settimane sono comunque 10 anni).
const LIMITE_SETTIMANE_PER_CARICAMENTO = 520;

// Ogni settimana arriva questo bonus in liquidità, a tutti, senza eccezioni:
// così anche chi ha perso tutto può sempre continuare a giocare.
const BONUS_SETTIMANALE = 2000;
// La liquidità NON reagisce agli eventi di mercato (sta ferma in un conto),
// ma l'inflazione la erode piano piano: circa il 3% all'anno, in modo
// costante. "Soldi fermi sono soldi morti" - è l'unico asset che perde
// valore garantito, invece di andare a caso come gli altri.
const INFLAZIONE_ANNUA = 0.03;
const EROSIONE_SETTIMANALE = Math.pow(1 - INFLAZIONE_ANNUA, 1 / 52);
// Gli eventi: ognuno cambia i prezzi degli asset ancora simulati (in
// frazione: 0.03 = +3%). La liquidità non c'è apposta (vedi
// EROSIONE_SETTIMANALE); azioni/etf nemmeno: i LORO prezzi sono veri,
// non li inventiamo più con un evento (vedi patrimonioTotale()).
const EVENTS = [
  { title:'La BCE alza i tassi di interesse', icon:'newspaper',
    body:'Prendere prestiti costa di più: le aziende rallentano, ma le obbligazioni rendono di più.',
    fx:{ bond:0.03, crypto:-0.07, realestate:-0.01 } },
  { title:"Boom dell'intelligenza artificiale", icon:'cpu',
    body:'Le aziende tech volano. Azioni ed ETF ne traggono vantaggio, e anche le crypto salgono.',
    fx:{ crypto:0.06, bond:-0.01, realestate:0.01 } },
  { title:"L'inflazione torna a scendere", icon:'trending-down',
    body:'I prezzi crescono più lentamente: buone notizie per azioni e immobili.',
    fx:{ realestate:0.03, bond:0.01, crypto:0.02 } },
  { title:'Crollo improvviso di una grande crypto', icon:'zap',
    body:'Il panico colpisce il mercato cripto. Chi era diversificato sente meno il colpo.',
    fx:{ crypto:-0.18, bond:0.01, realestate:0 } },
  { title:'Nuovi incentivi per la casa', icon:'building-2',
    body:'Il governo sostiene il mercato immobiliare. Gli immobili si rivalutano.',
    fx:{ realestate:0.06, bond:0.01, crypto:-0.01 } },
];

// Quante settimane VERE di calendario sono passate da quando è stata
// creata la riga di questo giocatore. Appena iscritto = 1 (la settimana
// in cui ti trovi ora, non "zero settimane fa").
function settimanaRealeDa(creatoIl) {
  const trascorsi = Math.max(0, Date.now() - new Date(creatoIl).getTime());
  return Math.floor(trascorsi / MS_PER_SETTIMANA) + 1;
}

// Quando scatterà il prossimo aggiornamento automatico (serve solo per
// mostrarlo a schermo, es. "tra 3 giorni" - vedi dashboard.html).
function prossimoAggiornamentoIl(creatoIl, settimanaAttuale) {
  return new Date(new Date(creatoIl).getTime() + settimanaAttuale * MS_PER_SETTIMANA);
}

// Simula il passaggio di UNA settimana per gli asset ANCORA simulati
// (bond/crypto/immobili): muove i prezzi secondo l'evento in corso (più
// un po' di casualità), applica bonus/inflazione alla liquidità,
// aggiunge XP. Azioni ed ETF NON vengono più toccati qui: il loro
// valore vero arriva sempre da patrimonioTotale(), coi prezzi letti
// da prezzi_mercato - richiede che stato.prezziMercato sia già stato
// impostato da chi chiama questa funzione (lo fa caricaStato()).
function applicaSettimana(stato) {
  const next = EVENTS[(stato.eventIdx + 1) % EVENTS.length];

  // La liquidità non segue il mercato: perde valore solo per l'inflazione.
  // Il bonus arriva DOPO l'inflazione: è denaro fresco appena ricevuto,
  // non è "invecchiato" e quindi non lo tocca l'erosione di questa settimana.
  stato.cash = stato.cash * EROSIONE_SETTIMANALE + BONUS_SETTIMANALE;

  // Bond/Crypto/Immobili: ognuno il proprio tiro di dado indipendente.
  for (const id of ['bond', 'crypto', 'realestate']) {
    const drift = (Math.random() - 0.45) * 0.03;
    const f = (next.fx[id] || 0) + drift;
    stato[id] = Math.max(0, stato[id] * (1 + f));
  }

  // Lo storico tiene solo le ultime settimane (per il grafico): vedi la
  // nota su "capitaleIniziale" più sotto sul perché non basta per sapere
  // "quanto avevi all'inizio".
  stato.history = stato.history.slice(-11).concat(patrimonioTotale(stato, stato.prezziMercato));
  stato.eventIdx = (stato.eventIdx + 1) % EVENTS.length;
  stato.settimana++;
  stato.xp = stato.xp + 35;   // niente tetto: l'XP cresce sempre, e con lui il livello (vedi livelloDa)

  return stato;
}


// ------------------------------------------------------------
//  Aiutanti condivisi (li usano più pagine)
// ------------------------------------------------------------

// Somma un elenco di posizioni (azioni O etf, stessa forma per entrambi)
// al loro valore vero: quantità posseduta × prezzo di oggi. Se il prezzo
// di un titolo non è ancora arrivato (proxy non ancora girato), quella
// posizione vale 0 per ora invece di rompere il conto - non è un errore.
function sommaAzioni(posizioni, prezzi) {
  let totale = 0;
  for (const simbolo in posizioni) {
    const prezzo = prezzi && prezzi[simbolo];
    if (prezzo) totale += posizioni[simbolo].quantita * prezzo;
  }
  return totale;
}

// Il patrimonio totale vero in questo momento: liquidità + bond +
// crypto + immobili (ancora simulati) più azioni ed ETF ai prezzi veri
// di oggi. Un unico posto per questo calcolo, usato sia dal motore
// settimanale sia da caricaStato() per il "capitale iniziale".
function patrimonioTotale(stato, prezzi) {
  return stato.cash + stato.bond + stato.crypto + stato.realestate
    + sommaAzioni(stato.azioni, prezzi) + sommaAzioni(stato.etf, prezzi);
}

// Dal totale XP ricava il livello e quanto manca al prossimo.
// Ogni 1000 XP si sale di livello (semplice apposta: si potrà
// rendere più interessante quando ci sarà un vero sistema a punti).
function livelloDa(xp) {
  return { livello: Math.floor(xp / 1000) + 1, progresso: xp % 1000 };
}

// Le iniziali da mettere nell'avatar quando non c'è una foto, es.
// "Luca Moretti" -> "LM".
function iniziali(nome) {
  const pulito = (nome || 'Giocatore').trim();
  return pulito.split(/\s+/).map(parola => parola[0]).join('').slice(0, 2).toUpperCase();
}


// ------------------------------------------------------------
//  Da riga del database a stato di gioco, e viceversa
// ------------------------------------------------------------
//  Nel database i nomi delle colonne sono un po' diversi (es.
//  "event_idx" invece di "eventIdx"): questa è l'unica parte del
//  codice che se ne deve accorgere. Tutte le pagine di gioco usano
//  sempre e solo i nomi "eventIdx" ecc.

function statoDaRiga(riga) {
  return {
    username: riga.username,
    settimana: riga.settimana,
    xp: riga.xp,
    eventIdx: riga.event_idx,
    cash: riga.cash,
    bond: riga.bond,
    etf: riga.etf,
    crypto: riga.crypto,
    realestate: riga.realestate,
    azioni: riga.azioni,
    history: riga.history,
    capitaleIniziale: riga.capitale_iniziale,
    skinEquipaggiata: riga.skin_equipaggiata,
    skinSbloccate: riga.skin_sbloccate,
    scatole: riga.scatole,
    creatoIl: riga.creato_il,   // sola lettura: non va MAI scritto da rigaDaStato()
  };
}

function rigaDaStato(stato) {
  return {
    username: stato.username,
    settimana: stato.settimana,
    xp: stato.xp,
    event_idx: stato.eventIdx,
    cash: stato.cash,
    bond: stato.bond,
    etf: stato.etf,
    crypto: stato.crypto,
    realestate: stato.realestate,
    azioni: stato.azioni,
    history: stato.history,
    capitale_iniziale: stato.capitaleIniziale,
    skin_equipaggiata: stato.skinEquipaggiata,
    skin_sbloccate: stato.skinSbloccate,
    scatole: stato.scatole,
  };
}


// ------------------------------------------------------------
//  caricaStato() e salvaStato() — le due funzioni che contano
// ------------------------------------------------------------

// Legge i prezzi di mercato attuali (tabella condivisa: non serve
// login per leggerla). Se qualcosa va storto, restituisce un elenco
// vuoto - le pagine sanno già gestire un prezzo mancante (il bottone
// "Compra" si disabilita), non è un errore che deve bloccare il gioco.
async function caricaPrezziMercato() {
  try {
    const { data, error } = await sb.from('prezzi_mercato').select('simbolo, prezzo');
    if (error) throw error;
    const mappa = {};
    for (const riga of (data || [])) mappa[riga.simbolo] = riga.prezzo;
    return mappa;
  } catch (e) {
    console.warn('BullRun: non riesco a leggere i prezzi di mercato.', e);
    return {};
  }
}

// Lo stato di un giocatore "ospite" (o il ripiego se qualcosa va
// storto): i valori di partenza, con i prezzi veri applicati se già li
// abbiamo (altrimenti resta la stima di riserva su "capitaleIniziale").
function statoOspite(prezzi) {
  const stato = copiaStatoIniziale();
  stato.prezziMercato = prezzi;
  if (Object.keys(prezzi).length > 0) {
    stato.capitaleIniziale = patrimonioTotale(stato, prezzi);
  }
  return stato;
}

// Legge lo stato salvato del giocatore che ha fatto login.
// Se è il suo primissimo accesso, la riga non esiste ancora: la
// creiamo noi con i valori di partenza (il database stesso sa quali
// sono, vedi i "default" in supabase/schema.sql).
async function caricaStato() {
  const prezzi = await caricaPrezziMercato();   // servono sempre, anche da ospite

  try {
    const u = await utenteAttuale();
    if (!u) return statoOspite(prezzi);   // nessun login: si gioca "da ospiti", senza salvare

    let { data: riga, error } = await sb.from('stato_giocatore').select('*').eq('user_id', u.id).maybeSingle();
    if (error) throw error;

    if (!riga) {
      // Prima volta di questo giocatore: creiamo la sua riga.
      const { data: creata, error: erroreCreazione } = await sb.from('stato_giocatore')
        .insert({ user_id: u.id }).select().single();

      if (erroreCreazione) {
        // Caso raro: due schede del browser hanno provato a creare la
        // riga nello stesso istante. Chi è arrivato secondo la rilegge
        // invece di considerarlo un errore vero.
        const { data: rigaDiGiaCreata } = await sb.from('stato_giocatore').select('*').eq('user_id', u.id).maybeSingle();
        if (!rigaDiGiaCreata) throw erroreCreazione;
        riga = rigaDiGiaCreata;
      } else {
        riga = creata;
      }

      // Il "capitale_iniziale" scritto di default nello schema è solo
      // una stima di riserva (i prezzi veri non si possono scrivere in
      // un file SQL). Se li conosciamo già, lo ricalcoliamo giusto e lo
      // aggiorniamo subito - resta comunque "scritto una volta sola, mai
      // più toccato" da qui in poi. Se i prezzi non sono ancora arrivati
      // (il proxy non ha ancora girato nemmeno una volta), resta la
      // stima: un caso raro, non vale la pena complicarsi per correggerlo.
      if (Object.keys(prezzi).length > 0) {
        const capitaleVero = patrimonioTotale(statoDaRiga(riga), prezzi);
        await sb.from('stato_giocatore').update({ capitale_iniziale: capitaleVero }).eq('user_id', u.id);
        riga.capitale_iniziale = capitaleVero;
      }
    }

    const stato = statoDaRiga(riga);
    stato.prezziMercato = prezzi;

    // ====== RECUPERO AUTOMATICO: è passata una settimana vera (o più)? ======
    // Fotografiamo il portafoglio COM'ERA prima di aggiornarlo: le pagine
    // lo usano per calcolare "quanto è cambiato" (le percentuali ▴/▾),
    // altrimenti confronterebbero il portafoglio aggiornato con sé stesso.
    stato.holdingsPrecedenti = {
      cash: stato.cash, bond: stato.bond, crypto: stato.crypto, realestate: stato.realestate,
      stock: sommaAzioni(stato.azioni, prezzi), etf: sommaAzioni(stato.etf, prezzi),
    };

    const settimanaReale = Math.min(
      settimanaRealeDa(stato.creatoIl),
      stato.settimana + LIMITE_SETTIMANE_PER_CARICAMENTO
    );
    let aggiornato = false;
    while (stato.settimana < settimanaReale) {
      applicaSettimana(stato);
      aggiornato = true;
    }
    if (aggiornato) await salvaStato(stato);   // salviamo una volta sola, non ad ogni settimana recuperata

    return stato;
  } catch (e) {
    // Rete assente, Supabase irraggiungibile, tabella non ancora
    // creata... qualunque cosa succeda, il gioco deve restare
    // giocabile: si parte dai valori iniziali, semplicemente non
    // salvati (esattamente come un giocatore da ospite).
    console.warn('BullRun: non riesco a caricare i progressi salvati, uso i valori di partenza.', e);
    return statoOspite(prezzi);
  }
}

// Salva TUTTO lo stato in un colpo solo (mai un pezzetto): è più
// semplice da capire ("salviamo sempre la fotografia intera") ed
// evita salvataggi a metà se due schede sono aperte insieme.
// Da chiamare DOPO aver già aggiornato lo schermo: non c'è bisogno
// di aspettarla (il salvataggio avviene "in background").
async function salvaStato(stato) {
  try {
    const u = await utenteAttuale();
    if (!u) return { ok: true };   // ospite: niente da salvare, va bene così

    const riga = rigaDaStato(stato);
    riga.user_id = u.id;
    riga.aggiornato_il = new Date().toISOString();

    const { error } = await sb.from('stato_giocatore').upsert(riga);
    if (error) throw error;
    return { ok: true };
  } catch (e) {
    console.warn('BullRun: non riesco a salvare i progressi.', e);
    return { ok: false, errore: e };
  }
}
