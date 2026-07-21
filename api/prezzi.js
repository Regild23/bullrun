// ============================================================
//  BullRun · Il "postino" dei prezzi di mercato
// ============================================================
//  Chiede i prezzi veri di azioni ed ETF a Twelve Data (un fornitore
//  di dati di mercato), e li scrive nella tabella prezzi_mercato su
//  Supabase. Non lo chiama mai direttamente un giocatore: lo richiama
//  un "orologio" esterno (.github/workflows/aggiorna-prezzi.yml) una
//  volta all'ora, nelle ore in cui qualcuno potrebbe star giocando.
//
//  Perché un file a parte, invece che dentro le pagine del sito? La
//  chiave di Twelve Data va tenuta SEGRETA (a differenza della chiave
//  di Supabase qui sotto, che è pubblica e può stare nel codice) - un
//  file che gira sul server di Vercel, invece che nel browser di chi
//  gioca, è l'unico posto sicuro dove usarla. Va incollata nelle
//  variabili d'ambiente del progetto Vercel col nome
//  TWELVE_DATA_API_KEY, MAI scritta qui dentro.
//
//  Nessuna libreria esterna: solo fetch(), come nel resto del sito.
//  Niente file da installare, niente package.json.

// Stessi valori di js/supabase.js: la chiave pubblica di Supabase può
// stare nel codice, è protetta dalle regole di sicurezza (RLS) - vedi
// supabase/schema.sql per il motivo per cui QUESTA tabella accetta
// scritture da chiunque abbia questa chiave, a differenza delle altre.
const SUPABASE_URL = 'https://liiyiquajopuqneohaus.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_EUiqgOWumfmOdlbQ6hr_gg_09kaWyEx';

// I titoli che seguiamo: 40 aziende vere + 5 fondi ETF. Facile da
// cambiare - ricordarsi di tenerlo in ordine con AZIENDE in azioni.html
// e con ETF in etf.html.
const SIMBOLI = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX', 'DIS', 'NKE',
  'MCD', 'KO', 'SBUX', 'PYPL', 'V', 'ADBE', 'SPOT', 'ABNB', 'UBER', 'PEP',
  'MA', 'INTC', 'AMD', 'RBLX', 'WMT', 'TGT', 'COST', 'F', 'BA', 'DAL',
  'EBAY', 'SHOP', 'SNAP', 'PINS', 'ZM', 'CROX', 'HAS', 'MAT', 'RACE', 'HOG',
  'SPY', 'QQQ', 'VXUS', 'IWM', 'VYM',
];

export default async function handler(req, res) {
  const chiaveTwelveData = process.env.TWELVE_DATA_API_KEY;
  if (!chiaveTwelveData) {
    res.status(500).json({ errore: "Manca la variabile d'ambiente TWELVE_DATA_API_KEY su Vercel." });
    return;
  }

  try {
    // Un'unica chiamata "a gruppo" per tutti i simboli insieme, invece
    // di una chiamata per ognuno: risparmia moltissimo sul limite
    // giornaliero di richieste di Twelve Data.
    const urlTwelveData = 'https://api.twelvedata.com/price?symbol=' + SIMBOLI.join(',') + '&apikey=' + chiaveTwelveData;
    const rispostaTD = await fetch(urlTwelveData);
    const datiTD = await rispostaTD.json();

    // Con un solo simbolo Twelve Data risponde {"price": "..."}. Con
    // più simboli, un oggetto con una chiave per simbolo, es:
    // {"AAPL": {"price": "150.23"}, "MSFT": {"price": "310.12"}, ...}
    // La prima volta che si prova con una chiave vera, controllare che
    // la forma della risposta sia davvero questa: è la riga giusta da
    // correggere se Twelve Data rispondesse in modo diverso.
    const righe = SIMBOLI
      .filter(simbolo => datiTD[simbolo] && datiTD[simbolo].price)
      .map(simbolo => ({
        simbolo: simbolo,
        prezzo: Number(datiTD[simbolo].price),
        aggiornato_il: new Date().toISOString(),
      }));

    if (righe.length === 0) {
      res.status(502).json({ errore: 'Nessun prezzo valido ricevuto da Twelve Data.', dettagli: datiTD });
      return;
    }

    // Scriviamo tutti i prezzi in un colpo solo. "Prefer: resolution=
    // merge-duplicates" vuol dire "se il simbolo esiste già, aggiornalo,
    // altrimenti crealo" - lo stesso che fa .upsert() nel resto del
    // sito, scritto qui a mano perché questo file non usa librerie.
    const rispostaSupabase = await fetch(SUPABASE_URL + '/rest/v1/prezzi_mercato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify(righe),
    });

    if (!rispostaSupabase.ok) {
      const erroreSupabase = await rispostaSupabase.text();
      res.status(502).json({ errore: 'Supabase non ha accettato i prezzi.', dettagli: erroreSupabase });
      return;
    }

    res.status(200).json({ ok: true, prezziAggiornati: righe.length });
  } catch (e) {
    res.status(500).json({ errore: String(e) });
  }
}
