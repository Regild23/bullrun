/* BullRun — Landing page UI kit.
   Single-scope file: defines all sections + renders.
   Primitives come from the compiled DS bundle (window namespace). */
const NS = window.BullRunDesignSystem_5f2728;
const { Button, IconButton, Badge, Card, Stat, AssetModule, EventPanel, Sparkline, Avatar, ProgressBar } = NS;

const LOGO = '../../assets/bullrun-logo-transparent.png';
const DASH = '../hub/index.html';
const I = (n, props = {}) => <i data-lucide={n} {...props}></i>;

function useIcons() {
  React.useEffect(() => { window.lucide && window.lucide.createIcons(); });
}

/* ---------------- Nav ---------------- */
function Nav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 32px',
      background: 'rgba(10,14,20,0.72)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--br-line)',
    }}>
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <img src={LOGO} alt="" style={{ height: 40, filter: 'drop-shadow(0 0 12px rgba(37,228,212,0.35))' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em' }}>
          <span className="br-gradient-text">Bull</span><span style={{ color: 'var(--br-text)' }}>Run</span>
        </span>
      </a>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <div style={{ display: 'flex', gap: 26, marginRight: 8 }}>
          {['Come funziona', 'Investimenti', 'Per le scuole'].map((l) => (
            <a key={l} href="#" style={{ fontSize: 14, color: 'var(--br-text-muted)', textDecoration: 'none', fontWeight: 500 }}
               onMouseEnter={(e) => e.currentTarget.style.color = 'var(--br-text)'}
               onMouseLeave={(e) => e.currentTarget.style.color = 'var(--br-text-muted)'}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href={DASH}><Button variant="ghost" size="sm">Accedi</Button></a>
          <a href="#" style={{ fontSize: 14, color: 'var(--br-text-muted)', textDecoration: 'none', fontWeight: 500, padding: '0 6px' }}>Contattaci</a>
          <a href={DASH}><Button variant="primary" size="sm">Iscriviti</Button></a>
        </div>
      </nav>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', padding: '72px 32px 88px' }}>
      {/* ambient glows */}
      <span style={{ position: 'absolute', top: -120, left: '8%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(182,242,60,0.16), transparent 65%)', pointerEvents: 'none' }} />
      <span style={{ position: 'absolute', top: 40, right: '4%', width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,228,212,0.16), transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'center' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--br-line-neon)', background: 'rgba(37,228,212,0.06)', marginBottom: 22 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--br-teal)', boxShadow: '0 0 8px var(--br-teal)' }} />
            <span className="br-eyebrow">Finanza ed economia · scuole medie</span>
          </span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 64, lineHeight: 1.02, letterSpacing: '-0.025em', color: 'var(--br-text)' }}>
            Impara a investire.<br /><span className="br-gradient-text">Senza rischiare un euro.</span>
          </h1>
          <p style={{ margin: '22px 0 32px', fontSize: 19, lineHeight: 1.6, color: 'var(--br-text-muted)', maxWidth: 520 }}>
            BullRun è il gioco dove gestisci un portafoglio virtuale, superi gli eventi del mercato e diventi più bravo con i soldi — un mese alla volta.
          </p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <a href={DASH}><Button variant="primary" size="lg" iconRight={I('arrow-right')}>Inizia a giocare</Button></a>
            <Button variant="secondary" size="lg" iconLeft={I('play')}>Guarda come funziona</Button>
          </div>
          <div style={{ display: 'flex', gap: 26, marginTop: 36 }}>
            {[['12.400+', 'studenti in gioco'], ['6', 'classi di asset'], ['0 €', 'soldi reali a rischio']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 24, color: 'var(--br-text)' }}>{n}</div>
                <div style={{ fontSize: 13, color: 'var(--br-text-dim)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div style={{ position: 'relative' }}>
      <img src={LOGO} alt="" style={{ position: 'absolute', top: -64, right: -24, width: 200, opacity: 0.95, filter: 'drop-shadow(0 0 30px rgba(37,228,212,0.4))', zIndex: 2 }} />
      <Card glow="teal" style={{ padding: 24, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <Stat label="Patrimonio totale" value="€ 12.480" delta="+4.2%" size="xl" glowValue />
          <Badge tone="teal" dot>Mese 7</Badge>
        </div>
        <Sparkline data={[100, 104, 99, 112, 118, 110, 126, 132, 128, 145, 152]} height={120} showDots />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 18 }}>
          <AssetModule name="Crypto" accent="var(--br-crypto)" value="€ 2.150" delta="+6.4%" icon={I('bitcoin')} selected />
          <AssetModule name="ETF" accent="var(--br-etf)" value="€ 3.400" delta="+1.2%" icon={I('layers')} />
        </div>
      </Card>
    </div>
  );
}

/* ---------------- How it works ---------------- */
function HowItWorks() {
  const steps = [
    ['wallet', 'Ricevi 10.000 € virtuali', 'Parti con un capitale finto da investire come vuoi. Niente carte, niente rischi.'],
    ['layout-grid', 'Distribuisci tra 6 asset', 'Liquidità, BTP, ETF, azioni, crypto e immobili: ognuno reagisce in modo diverso.'],
    ['calendar-clock', 'Avanza di un mese', 'Il mercato si muove, gli eventi cambiano i prezzi. Scopri se le tue scelte pagano.'],
  ];
  return (
    <Section eyebrow="Come funziona" title="Tre mosse e sei dentro il gioco">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {steps.map(([icon, t, d], i) => (
          <Card key={t} style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <span style={{ width: 48, height: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)', background: 'var(--br-gradient-soft)', color: 'var(--br-teal)' }}>{I(icon)}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 40, fontWeight: 700, color: 'rgba(255,255,255,0.07)' }}>0{i + 1}</span>
            </div>
            <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, color: 'var(--br-text)' }}>{t}</h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--br-text-muted)' }}>{d}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Assets ---------------- */
function Assets() {
  const [sel, setSel] = React.useState('crypto');
  const assets = [
    ['cash', 'Liquidità', 'var(--br-cash)', 'wallet', '€ 1.200', '+0.1%'],
    ['bond', 'BTP', 'var(--br-bond)', 'landmark', '€ 1.850', '+1.0%'],
    ['etf', 'ETF', 'var(--br-etf)', 'layers', '€ 3.400', '+1.2%'],
    ['stock', 'Azioni', 'var(--br-stock)', 'trending-up', '€ 1.980', '-2.8%'],
    ['crypto', 'Crypto', 'var(--br-crypto)', 'bitcoin', '€ 2.150', '+6.4%'],
    ['realestate', 'Immobili', 'var(--br-realestate)', 'building-2', '€ 1.900', '+0.6%'],
  ];
  return (
    <Section eyebrow="Sei modi per investire" title="Ogni asset ha la sua personalità">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {assets.map(([id, name, accent, icon, val, delta]) => (
          <AssetModule key={id} name={name} accent={accent} icon={I(icon)} value={val} delta={delta}
            allocation={Math.round(parseInt(val.replace(/\D/g, '')) / 124)} selected={sel === id} onClick={() => setSel(id)} />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Events ---------------- */
function Events() {
  return (
    <Section eyebrow="Evento del mese" title="Il mercato ti mette alla prova">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center' }}>
        <EventPanel title="La BCE alza i tassi di interesse" icon={I('newspaper')}
          body="Prendere prestiti costa di più: le aziende rallentano, ma le obbligazioni diventano più interessanti. Cosa fai col tuo portafoglio?"
          impacts={[{ label: 'BTP', delta: '+3%' }, { label: 'Azioni', delta: '-5%', dir: 'down' }, { label: 'Crypto', delta: '-7%', dir: 'down' }]} />
        <div>
          <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--br-text)' }}>Una notizia vera, spiegata semplice</h3>
          <p style={{ margin: '0 0 20px', fontSize: 16, lineHeight: 1.65, color: 'var(--br-text-muted)' }}>
            Ogni turno introduce un evento ispirato all'economia reale. Capisci perché i prezzi si muovono, poi decidi la tua strategia per il mese successivo.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button variant="neonOutline" iconLeft={I('calendar-arrow-down')}>Avanza mese</Button>
            <span style={{ fontSize: 13, color: 'var(--br-text-dim)' }}>+ guadagni XP a ogni decisione</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Learn ---------------- */
function Learn() {
  const items = [
    ['graduation-cap', 'Concetti reali', 'Rischio, rendimento, diversificazione e interesse composto — spiegati giocando.'],
    ['gamepad-2', 'Zero noia', 'Niente lezioni infinite: impari facendo scelte e vedendo subito le conseguenze.'],
    ['shield-check', 'Zero rischi', 'Tutto è virtuale. Sbagliare qui costa solo un po di XP.'],
    ['users', 'Sfida la classe', 'Classifiche e tornei tra compagni per imparare insieme.'],
  ];
  return (
    <Section eyebrow="Impari giocando" title="Educazione finanziaria che non sembra scuola">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        {items.map(([icon, t, d]) => (
          <Card key={t} interactive style={{ padding: 22 }}>
            <span style={{ width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)', background: 'rgba(37,228,212,0.1)', color: 'var(--br-teal)', marginBottom: 16 }}>{I(icon)}</span>
            <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--br-text)' }}>{t}</h3>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: 'var(--br-text-muted)' }}>{d}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- CTA + Footer ---------------- */
function CTA() {
  return (
    <section style={{ padding: '40px 32px 88px' }}>
      <div style={{ position: 'relative', overflow: 'hidden', maxWidth: 1000, margin: '0 auto', textAlign: 'center', padding: '56px 40px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--br-line-neon)', background: 'linear-gradient(180deg, rgba(37,228,212,0.08), rgba(19,27,40,0.6))' }}>
        <span style={{ position: 'absolute', bottom: -160, left: '50%', transform: 'translateX(-50%)', width: 520, height: 320, background: 'radial-gradient(circle, rgba(182,242,60,0.18), transparent 60%)', pointerEvents: 'none' }} />
        <img src={LOGO} alt="" style={{ height: 80, marginBottom: 18, filter: 'drop-shadow(0 0 24px rgba(37,228,212,0.45))', position: 'relative' }} />
        <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--br-text)', position: 'relative' }}>
          Pronto a far correre il tuo toro?
        </h2>
        <p style={{ margin: '0 auto 28px', fontSize: 17, color: 'var(--br-text-muted)', maxWidth: 480, position: 'relative' }}>
          Crea il tuo portafoglio in 30 secondi. Gratis, per sempre, per ogni studente.
        </p>
        <a href={DASH} style={{ position: 'relative' }}><Button variant="primary" size="lg" iconRight={I('arrow-right')}>Inizia a giocare</Button></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--br-line)', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src={LOGO} alt="" style={{ height: 28 }} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--br-text)' }}>BullRun</span>
        <span style={{ fontSize: 13, color: 'var(--br-text-dim)', marginLeft: 10 }}>© 2026 · Gioco educativo di finanza</span>
      </div>
      <div style={{ display: 'flex', gap: 22 }}>
        {['Privacy', 'Per le scuole', 'Contattaci'].map((l) => (
          <a key={l} href="#" style={{ fontSize: 13, color: 'var(--br-text-muted)', textDecoration: 'none' }}>{l}</a>
        ))}
      </div>
    </footer>
  );
}

/* ---------------- Section wrapper ---------------- */
function Section({ eyebrow, title, children }) {
  return (
    <section style={{ padding: '56px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span className="br-eyebrow">{eyebrow}</span>
          <h2 style={{ margin: '10px 0 0', fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--br-text)' }}>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */
function Landing() {
  useIcons();
  return (
    <div className="br-grid-bg" style={{ minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <HowItWorks />
      <Assets />
      <Events />
      <Learn />
      <CTA />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Landing />);
