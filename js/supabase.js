// ============================================================
//  BullRun · Collegamento a Supabase (login e iscrizione)
// ============================================================
//  Supabase è il nostro "magazzino" online: tiene gli account e
//  i dati dei giocatori. Questo file lo collega al sito.
//
//  ⚠️ DA COMPILARE: incolla i due valori del TUO progetto Supabase.
//  Li trovi su supabase.com → tuo progetto → Settings → API.
//  Tranquillo: la chiave "anon public" è PUBBLICA, può stare nel
//  codice (è protetta dalle regole di sicurezza di Supabase).

const SUPABASE_URL      = "https://liiyiquajopuqneohaus.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_EUiqgOWumfmOdlbQ6hr_gg_09kaWyEx";  // chiave pubblica (publishable)

// Controlliamo se i valori sono stati messi davvero.
const CONFIG_OK = !SUPABASE_URL.startsWith("INCOLLA") && !SUPABASE_ANON_KEY.startsWith("INCOLLA");

// Creiamo il "client": l'oggetto con cui parliamo con Supabase.
// Se non abbiamo ancora messo i valori, resta null (così la pagina non si rompe).
const sb = CONFIG_OK ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;


// ------------------------------------------------------------
//  Funzioni di aiuto (le usa la pagina di login)
// ------------------------------------------------------------

// Iscrizione con email e password.
async function registratiConEmail(email, password) {
  if (!sb) return { error: { message: "Supabase non è ancora configurato." } };
  return await sb.auth.signUp({ email: email, password: password });
}

// Accesso con email e password.
async function accediConEmail(email, password) {
  if (!sb) return { error: { message: "Supabase non è ancora configurato." } };
  return await sb.auth.signInWithPassword({ email: email, password: password });
}

// Accesso con Google (apre il popup di Google e poi torna sul sito).
async function accediConGoogle() {
  if (!sb) return { error: { message: "Supabase non è ancora configurato." } };
  return await sb.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.origin + "/hub.html" }
  });
}

// Esci (logout).
async function esci() {
  if (!sb) return;
  return await sb.auth.signOut();
}

// Chi è loggato adesso? Restituisce l'utente, oppure null se nessuno.
async function utenteAttuale() {
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  return data ? data.user : null;
}
