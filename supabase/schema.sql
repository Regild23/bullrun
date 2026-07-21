-- ============================================================
--  BullRun · Il "magazzino" dei progressi di ogni giocatore
-- ============================================================
--  Questo file crea UNA tabella: una riga per ogni giocatore, con
--  tutto quello che il gioco deve ricordare tra un accesso e l'altro
--  (settimana, soldi in ogni asset, XP, skin sbloccate, scatole...).
--
--  COME USARLO: vai su supabase.com → il tuo progetto → "SQL Editor"
--  → incolla TUTTO questo file → premi "Run". Va fatto UNA sola volta.
--
--  "user_id" collega ogni riga all'account creato da Supabase quando
--  qualcuno si iscrive (tabella auth.users, che esiste già da sola).
--  "on delete cascade" vuol dire: se un account viene cancellato,
--  viene cancellata in automatico anche la sua riga qui.

create table public.stato_giocatore (
  user_id           uuid primary key references auth.users(id) on delete cascade,

  -- Profilo
  username          text        not null default 'Giocatore',

  -- Il turno di gioco
  settimana         int         not null default 1,
  xp                int         not null default 0,
  event_idx         int         not null default 0,   -- quale evento di mercato è "attuale"

  -- Quanto c'è in bond/crypto/immobili (in euro: per ora ancora
  -- simulati, non collegati a prezzi veri). Liquidità a parte sotto.
  -- ⚠️ VALORE DI TEST: 100.000.000 invece di 12000, per provare compra/vendi
  -- senza limiti mentre si collauda il salvataggio vero. Riportare a 12000
  -- quando i test sono finiti (vedi anche STATO_INIZIALE in js/stato-gioco.js).
  cash              numeric     not null default 100000000,
  bond              numeric     not null default 18500,
  crypto            numeric     not null default 21500,
  realestate        numeric     not null default 19000,

  -- Azioni ed ETF NON sono un numero in euro: sono un elenco di posizioni
  -- possedute, una per titolo, con la QUANTITÀ posseduta (non un valore
  -- già calcolato). Il valore vero si ottiene sempre moltiplicando la
  -- quantità per il prezzo di oggi, letto dalla tabella prezzi_mercato
  -- qui sotto — mai un numero salvato e già pronto, che diventerebbe
  -- subito vecchio. Esempio: {"AAPL": {"quantita": 10}}. Si parte con
  -- una piccola posizione già fatta, così i moduli non sono vuoti al
  -- primissimo accesso.
  azioni            jsonb       not null default '{"AAPL":{"quantita":10}}'::jsonb,
  etf               jsonb       not null default '{"SPY":{"quantita":3}}'::jsonb,

  -- Storico del patrimonio totale, settimana per settimana (solo per il
  -- grafico): dashboard.html tiene solo le ultime settimane, NON tutta la
  -- storia - non è quindi un posto affidabile dove leggere "quanto avevi
  -- all'inizio". Per quello c'è il campo qui sotto, che non cambia mai.
  history           jsonb       not null default '[124800]'::jsonb,

  -- Il patrimonio di partenza vero, scritto una volta sola alla
  -- creazione della riga e mai più modificato: serve per calcolare il
  -- "guadagno totale". Il valore qui sotto (124800) è solo un numero di
  -- riserva: dato che azioni/etf oggi valgono in base a un prezzo vero
  -- che questo file SQL non può conoscere, è js/stato-gioco.js che lo
  -- ricalcola giusto e lo aggiorna subito dopo aver creato la riga.
  capitale_iniziale numeric     not null default 124800,

  -- Le skin del toro: quale hai equipaggiato adesso, e quali hai
  -- sbloccato aprendo le scatole (la "Classica" è sempre sbloccata).
  skin_equipaggiata text        not null default 'classica',
  skin_sbloccate    jsonb       not null default '["classica"]'::jsonb,

  -- Scatole misteriose pronte da aprire. Si parte con 1 in regalo,
  -- così si può provare subito ad aprirne una.
  scatole           int         not null default 1,

  -- "creato_il" ha un doppio lavoro: dice quando è nato l'account, ED è
  -- anche l'"ancora" da cui si calcola la settimana di gioco VERA (il
  -- tempo di gioco è tempo reale, non c'è un bottone "avanza settimana" -
  -- vedi settimanaRealeDa() in js/stato-gioco.js).
  creato_il         timestamptz not null default now(),
  aggiornato_il     timestamptz not null default now()
);

-- ------------------------------------------------------------
--  Sicurezza: ognuno vede e modifica SOLO la propria riga
-- ------------------------------------------------------------
--  "Row Level Security" (RLS) vuol dire: anche se qualcuno conoscesse
--  la chiave pubblica del sito, il database stesso blocca ogni
--  tentativo di leggere o scrivere la riga di un altro giocatore.
--  auth.uid() è "chi ha fatto login in questo momento", deciso da
--  Supabase stesso — non è qualcosa che il sito può falsificare.

alter table public.stato_giocatore enable row level security;

create policy "Leggi solo la tua riga"
  on public.stato_giocatore for select
  using (auth.uid() = user_id);

create policy "Crea solo la tua riga"
  on public.stato_giocatore for insert
  with check (auth.uid() = user_id);

create policy "Aggiorna solo la tua riga"
  on public.stato_giocatore for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ============================================================
--  BullRun · I prezzi di mercato (azioni ed ETF veri)
-- ============================================================
--  A differenza di stato_giocatore, questa tabella NON appartiene a un
--  giocatore: è UNA riga per ogni titolo (azione o ETF), condivisa da
--  tutti. La aggiorna un piccolo programma esterno ("il proxy", vedi
--  api/prezzi.js) che chiede i prezzi veri a un fornitore di dati di
--  mercato una volta all'ora, e li scrive qui.

create table public.prezzi_mercato (
  simbolo        text        primary key,   -- es. "AAPL", "SPY"
  prezzo         numeric     not null,       -- prezzo attuale, in dollari
  aggiornato_il  timestamptz not null default now()
);

-- ------------------------------------------------------------
--  Sicurezza: qui le regole sono diverse da stato_giocatore apposta
-- ------------------------------------------------------------
--  I prezzi non sono di nessuno in particolare: chiunque deve poterli
--  leggere. Per scriverli, invece di creare una chiave segreta nuova
--  (il progetto ha deciso di non averne mai una), usiamo la STESSA
--  chiave pubblica di sempre, con il permesso di scrivere SOLO qui
--  dentro - mai sulle righe di stato_giocatore, dove le regole restano
--  quelle strette di prima. Il danno peggiore possibile se qualcuno
--  abusasse di questo permesso è "un prezzo sbagliato per un'ora": il
--  proxy lo corregge da solo al giro successivo.

alter table public.prezzi_mercato enable row level security;

create policy "Tutti possono leggere i prezzi"
  on public.prezzi_mercato for select
  using (true);

create policy "Tutti possono aggiungere un prezzo nuovo"
  on public.prezzi_mercato for insert
  with check (true);

create policy "Tutti possono aggiornare un prezzo esistente"
  on public.prezzi_mercato for update
  using (true);
