// ============================================================
//  BullRun · Il "postino" delle schede informative
// ============================================================
//  Gemello di api/prezzi.js, ma con un compito diverso: invece del
//  prezzo (che cambia in continuazione), prende informazioni che
//  cambiano lentissimamente - settore, chi guida l'azienda, quanto
//  vale in borsa - e le scrive nella tabella profili_titoli.
//  Per questo lo richiama un "orologio" diverso, solo una volta a
//  settimana (.github/workflows/aggiorna-profili.yml), non ogni ora.
//
//  Il settore e la curiosità li scriviamo NOI qui sotto a mano: non
//  sono il tipo di dato che si scarica in modo affidabile da un'API.
//  Chi guida l'azienda e la capitalizzazione invece proviamo a
//  chiederli a Twelve Data - MA non è garantito che il piano gratuito
//  li includa (non tutti gli endpoint lo sono). Se la richiesta fallisce
//  o torna vuota, quel campo resta semplicemente assente: le pagine
//  sanno già mostrare solo quello che c'è, mai un errore.

const SUPABASE_URL = 'https://liiyiquajopuqneohaus.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_EUiqgOWumfmOdlbQ6hr_gg_09kaWyEx';

// Un settore e una curiosità per ognuno dei 45 titoli (stesso ordine di
// AZIENDE in azioni.html e di ETF in etf.html - facile da tenere allineato).
const TITOLI = [
  { simbolo:'AAPL', settore:'Tecnologia', curiosita:'Il primo iPhone fu presentato nel 2007 da Steve Jobs: oggi Apple ne vende oltre 200 milioni all\'anno.' },
  { simbolo:'MSFT', settore:'Tecnologia', curiosita:'Microsoft fu fondata nel 1975 da Bill Gates e Paul Allen, quando avevano solo 19 e 22 anni.' },
  { simbolo:'GOOGL', settore:'Tecnologia', curiosita:'Il nome "Google" viene da "googol", il numero 1 seguito da 100 zeri: un modo per dire "quantità enorme".' },
  { simbolo:'AMZN', settore:'Commercio al dettaglio', curiosita:'Amazon nacque nel 1994 in un garage, vendendo solo libri. Il nome viene dal fiume più grande del mondo.' },
  { simbolo:'TSLA', settore:'Automobili', curiosita:'Le auto Tesla prendono il nome da Nikola Tesla, l\'inventore che rese possibile l\'elettricità come la usiamo oggi.' },
  { simbolo:'NVDA', settore:'Tecnologia', curiosita:'I chip Nvidia, nati per far girare i videogiochi, oggi fanno funzionare quasi tutta l\'intelligenza artificiale del mondo.' },
  { simbolo:'META', settore:'Intrattenimento e media', curiosita:'Meta possiede Facebook, Instagram e WhatsApp: più di 3 miliardi di persone usano almeno una delle sue app ogni giorno.' },
  { simbolo:'NFLX', settore:'Intrattenimento e media', curiosita:'Netflix nacque nel 1997 come servizio per spedire DVD per posta, prima di inventare lo streaming.' },
  { simbolo:'DIS', settore:'Intrattenimento e media', curiosita:'Il primo film Disney, Biancaneve, uscì nel 1937: fu il primo lungometraggio animato della storia.' },
  { simbolo:'NKE', settore:'Abbigliamento e sport', curiosita:'Il celebre "baffo" Nike fu disegnato nel 1971 da una studentessa universitaria per soli 35 dollari.' },
  { simbolo:'MCD', settore:'Alimentare e bevande', curiosita:'Il primo McDonald\'s aprì nel 1940 in California: oggi ne esistono più di 40.000 nel mondo.' },
  { simbolo:'KO', settore:'Alimentare e bevande', curiosita:'La Coca-Cola nacque nel 1886 come medicinale, venduto in farmacia.' },
  { simbolo:'SBUX', settore:'Alimentare e bevande', curiosita:'Starbucks prende il nome da un personaggio del romanzo Moby Dick.' },
  { simbolo:'PYPL', settore:'Servizi finanziari', curiosita:'Tra i primi fondatori di PayPal c\'era Elon Musk, che avrebbe poi creato anche Tesla e SpaceX.' },
  { simbolo:'V', settore:'Servizi finanziari', curiosita:'Le carte Visa vengono usate per pagare più di 300 milioni di volte al giorno in tutto il mondo.' },
  { simbolo:'ADBE', settore:'Tecnologia', curiosita:'Adobe (quella di Photoshop) prende il nome da un torrente vicino alle case dei suoi due fondatori.' },
  { simbolo:'SPOT', settore:'Intrattenimento e media', curiosita:'Spotify nacque in Svezia nel 2006 per offrire un\'alternativa legale al download illegale di musica.' },
  { simbolo:'ABNB', settore:'Viaggi e trasporti', curiosita:'Airbnb nacque perché i fondatori affittarono materassi gonfiabili in salotto per pagare l\'affitto.' },
  { simbolo:'UBER', settore:'Viaggi e trasporti', curiosita:'L\'idea di Uber nacque una sera a Parigi, quando i fondatori non riuscivano a trovare un taxi.' },
  { simbolo:'PEP', settore:'Alimentare e bevande', curiosita:'PepsiCo non produce solo la Pepsi: possiede anche Lay\'s, Gatorade e Doritos.' },
  { simbolo:'MA', settore:'Servizi finanziari', curiosita:'Il logo di Mastercard, i due cerchi che si sovrappongono, esiste quasi invariato dal 1966.' },
  { simbolo:'INTC', settore:'Tecnologia', curiosita:'Intel ha inventato il primo microprocessore della storia, nel 1971.' },
  { simbolo:'AMD', settore:'Tecnologia', curiosita:'AMD e Intel si fanno concorrenza sui chip dei computer da più di 50 anni.' },
  { simbolo:'RBLX', settore:'Intrattenimento e media', curiosita:'Su Roblox la maggior parte dei giochi non li crea l\'azienda: li costruiscono i giocatori stessi.' },
  { simbolo:'WMT', settore:'Commercio al dettaglio', curiosita:'Walmart è così grande che, se fosse un Paese, avrebbe un\'economia tra le prime 25 al mondo.' },
  { simbolo:'TGT', settore:'Commercio al dettaglio', curiosita:'Il bersaglio rosso di Target è tra i loghi più riconosciuti d\'America.' },
  { simbolo:'COST', settore:'Commercio al dettaglio', curiosita:'Da Costco si può comprare quasi tutto all\'ingrosso, persino un anello di diamanti o una casetta da giardino.' },
  { simbolo:'F', settore:'Automobili', curiosita:'Henry Ford non inventò l\'automobile, ma inventò la catena di montaggio che la rese economica per tutti.' },
  { simbolo:'BA', settore:'Viaggi e trasporti', curiosita:'Boeing costruisce sia aerei passeggeri sia astronavi per la NASA.' },
  { simbolo:'DAL', settore:'Viaggi e trasporti', curiosita:'Delta Air Lines nacque nel 1924 come azienda che spruzzava insetticida sui campi coltivati.' },
  { simbolo:'EBAY', settore:'Commercio al dettaglio', curiosita:'Il primo oggetto mai venduto su eBay, nel 1995, fu un puntatore laser rotto.' },
  { simbolo:'SHOP', settore:'Tecnologia', curiosita:'Shopify nacque perché il fondatore, non trovando un buon negozio online per vendere snowboard, se lo costruì da solo.' },
  { simbolo:'SNAP', settore:'Intrattenimento e media', curiosita:'Snapchat fu tra le prime app a rendere normale far sparire le foto dopo pochi secondi.' },
  { simbolo:'PINS', settore:'Intrattenimento e media', curiosita:'Su Pinterest le persone salvano più di un miliardo di "idee" ogni settimana.' },
  { simbolo:'ZM', settore:'Tecnologia', curiosita:'Zoom esisteva già prima del 2020, ma la pandemia la rese una parola d\'uso comune in poche settimane.' },
  { simbolo:'CROX', settore:'Abbigliamento e sport', curiosita:'Le Crocs nacquero come scarpe da barca, non come scarpe di moda.' },
  { simbolo:'HAS', settore:'Giocattoli', curiosita:'Hasbro possiede marchi come Monopoli, Nerf e i Transformers.' },
  { simbolo:'MAT', settore:'Giocattoli', curiosita:'La bambola Barbie, di Mattel, debuttò nel 1959 ed è ancora tra i giocattoli più venduti al mondo.' },
  { simbolo:'RACE', settore:'Automobili', curiosita:'Il cavallino rampante di Ferrari viene dallo stemma di un pilota della Prima Guerra Mondiale.' },
  { simbolo:'HOG', settore:'Automobili', curiosita:'Harley-Davidson nacque nel 1903 in un piccolo capannone di legno a Milwaukee.' },
  { simbolo:'SPY', settore:'Indice ampio USA (S&P 500)', curiosita:'Lo SPY segue le 500 aziende più grandi degli Stati Uniti insieme: comprarne una quota è come comprare un pezzettino di ognuna.' },
  { simbolo:'QQQ', settore:'Tecnologia USA (Nasdaq 100)', curiosita:'Il QQQ segue le 100 aziende tech più importanti quotate al Nasdaq.' },
  { simbolo:'VXUS', settore:'Mercati internazionali', curiosita:'VXUS segue migliaia di aziende fuori dagli Stati Uniti: un modo per investire nel resto del mondo con un solo acquisto.' },
  { simbolo:'IWM', settore:'Piccole aziende USA (Russell 2000)', curiosita:'IWM segue 2.000 aziende americane "piccole" per la borsa, ma spesso già grandi aziende vere.' },
  { simbolo:'VYM', settore:'Aziende che pagano dividendi', curiosita:'VYM raccoglie le aziende che ogni anno pagano ai loro azionisti una parte dei guadagni (i "dividendi").' },
];

export default async function handler(req, res) {
  const chiaveTwelveData = process.env.TWELVE_DATA_API_KEY;
  if (!chiaveTwelveData) {
    res.status(500).json({ errore: "Manca la variabile d'ambiente TWELVE_DATA_API_KEY su Vercel." });
    return;
  }

  const righe = [];
  let trovatiExtra = 0;

  for (const titolo of TITOLI) {
    let responsabile = null;
    let capitalizzazione = null;

    // Proviamo a chiedere a Twelve Data il profilo dell'azienda (nome del
    // CEO, o della società che gestisce il fondo). NON siamo sicuri che
    // questo endpoint sia incluso nel piano gratuito: se fallisce o torna
    // vuoto, va bene così, "responsabile" resta assente.
    try {
      const rispostaProfilo = await fetch('https://api.twelvedata.com/profile?symbol=' + titolo.simbolo + '&apikey=' + chiaveTwelveData);
      const datiProfilo = await rispostaProfilo.json();
      // Il nome esatto del campo (qui "CEO") va verificato con una chiave
      // vera: se Twelve Data lo chiama diversamente, è questa la riga da
      // correggere.
      if (datiProfilo && datiProfilo.CEO) { responsabile = datiProfilo.CEO; trovatiExtra++; }
    } catch (e) { /* niente responsabile per questo titolo, va bene così */ }

    // Stessa idea per la capitalizzazione di mercato.
    try {
      const rispostaCap = await fetch('https://api.twelvedata.com/market_cap?symbol=' + titolo.simbolo + '&apikey=' + chiaveTwelveData);
      const datiCap = await rispostaCap.json();
      if (datiCap && datiCap.market_cap) { capitalizzazione = Number(datiCap.market_cap); }
    } catch (e) { /* niente capitalizzazione per questo titolo, va bene così */ }

    righe.push({
      simbolo: titolo.simbolo,
      settore: titolo.settore,
      curiosita: titolo.curiosita,
      responsabile: responsabile,
      capitalizzazione: capitalizzazione,
      aggiornato_il: new Date().toISOString(),
    });
  }

  // Scriviamo tutte le schede in un colpo solo (stesso "upsert a mano"
  // di api/prezzi.js: aggiorna se il simbolo esiste già, altrimenti lo crea).
  try {
    const rispostaSupabase = await fetch(SUPABASE_URL + '/rest/v1/profili_titoli', {
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
      res.status(502).json({ errore: 'Supabase non ha accettato le schede.', dettagli: erroreSupabase });
      return;
    }
  } catch (e) {
    res.status(500).json({ errore: String(e) });
    return;
  }

  res.status(200).json({ ok: true, schedeScritte: righe.length, conResponsabileOCapitalizzazione: trovatiExtra });
}
