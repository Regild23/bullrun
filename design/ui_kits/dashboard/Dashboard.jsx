/* BullRun — Dashboard (game) UI kit.
   Single-scope file: control-panel layout + live "Avanza mese" loop. */
const NS = window.BullRunDesignSystem_5f2728;
const { Button, IconButton, Badge, Card, Stat, AssetModule, EventPanel, Sparkline, Avatar, ProgressBar, Tabs } = NS;

const LOGO = '../../assets/bullrun-logo-transparent.png';
const HOME = '../hub/index.html';
const I = (n, p = {}) => <i data-lucide={n} {...p}></i>;
const eur = (n) => '€ ' + Math.round(n).toLocaleString('it-IT');

const ASSET_DEFS = [
  { id: 'cash', name: 'Liquidità', accent: 'var(--br-cash)', icon: 'wallet' },
  { id: 'bond', name: 'BTP', accent: 'var(--br-bond)', icon: 'landmark' },
  { id: 'etf', name: 'ETF', accent: 'var(--br-etf)', icon: 'layers' },
  { id: 'stock', name: 'Azioni', accent: 'var(--br-stock)', icon: 'trending-up' },
  { id: 'crypto', name: 'Crypto', accent: 'var(--br-crypto)', icon: 'bitcoin' },
  { id: 'realestate', name: 'Immobili', accent: 'var(--br-realestate)', icon: 'building-2' },
];

const START = { cash: 1200, bond: 1850, etf: 3400, stock: 1980, crypto: 2150, realestate: 1900 };

/* events: per-asset multiplier deltas (fraction). */
const EVENTS = [
  { title: 'La BCE alza i tassi di interesse', icon: 'newspaper',
    body: 'Prendere prestiti costa di più: le aziende rallentano, ma le obbligazioni rendono di più.',
    fx: { bond: 0.03, stock: -0.05, crypto: -0.07, etf: -0.02, realestate: -0.01, cash: 0.001 } },
  { title: "Boom dell'intelligenza artificiale", icon: 'cpu',
    body: 'Le aziende tech volano. Azioni ed ETF ne traggono vantaggio, e anche le crypto salgono.',
    fx: { stock: 0.08, etf: 0.05, crypto: 0.06, bond: -0.01, realestate: 0.01, cash: 0 } },
  { title: "L'inflazione torna a scendere", icon: 'trending-down',
    body: 'I prezzi crescono più lentamente: buone notizie per azioni e immobili.',
    fx: { stock: 0.04, realestate: 0.03, etf: 0.03, bond: 0.01, crypto: 0.02, cash: -0.002 } },
  { title: 'Crollo improvviso di una grande crypto', icon: 'zap',
    body: 'Il panico colpisce il mercato cripto. Chi era diversificato sente meno il colpo.',
    fx: { crypto: -0.18, stock: -0.02, etf: -0.01, bond: 0.01, realestate: 0, cash: 0 } },
  { title: 'Nuovi incentivi per la casa', icon: 'building-2',
    body: 'Il governo sostiene il mercato immobiliare. Gli immobili si rivalutano.',
    fx: { realestate: 0.06, bond: 0.01, stock: 0.01, etf: 0.01, crypto: -0.01, cash: 0 } },
];

function impactsFromFx(fx) {
  return Object.entries(fx)
    .filter(([, v]) => Math.abs(v) >= 0.02)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 4)
    .map(([id, v]) => ({
      label: ASSET_DEFS.find((a) => a.id === id).name,
      delta: (v > 0 ? '+' : '') + Math.round(v * 100) + '%',
      dir: v < 0 ? 'down' : 'up',
    }));
}

function useIcons(dep) { React.useEffect(() => { window.lucide && window.lucide.createIcons(); }, [dep]); }

function Dashboard() {
  const [month, setMonth] = React.useState(7);
  const [holdings, setHoldings] = React.useState(START);
  const [prev, setPrev] = React.useState(START);
  const [eventIdx, setEventIdx] = React.useState(0);
  const [sel, setSel] = React.useState(() => {
    const h = (typeof location !== 'undefined' ? location.hash : '').replace('#', '');
    return ['cash', 'bond', 'etf', 'stock', 'crypto', 'realestate'].includes(h) ? h : 'crypto';
  });
  const [history, setHistory] = React.useState([10000, 10420, 10180, 10890, 11240, 11020, 11480]);
  const [xp, setXp] = React.useState(740);
  const [range, setRange] = React.useState('Anno');

  const total = Object.values(holdings).reduce((a, b) => a + b, 0);
  const prevTotal = Object.values(prev).reduce((a, b) => a + b, 0);
  const totalDelta = ((total - prevTotal) / prevTotal) * 100;
  const ev = EVENTS[eventIdx];

  useIcons(month + sel);

  function advance() {
    const next = EVENTS[(eventIdx + 1) % EVENTS.length];
    const newHold = {};
    for (const a of ASSET_DEFS) {
      const drift = (Math.random() - 0.45) * 0.03;
      const f = (next.fx[a.id] || 0) + drift;
      newHold[a.id] = Math.max(0, holdings[a.id] * (1 + f));
    }
    setPrev(holdings);
    setHoldings(newHold);
    setHistory((h) => [...h.slice(-11), Object.values(newHold).reduce((x, y) => x + y, 0)]);
    setEventIdx((eventIdx + 1) % EVENTS.length);
    setMonth((m) => m + 1);
    setXp((x) => Math.min(1000, x + 35));
  }

  function assetDelta(id) {
    const d = ((holdings[id] - prev[id]) / (prev[id] || 1)) * 100;
    return (d >= 0 ? '+' : '') + d.toFixed(1) + '%';
  }

  return (
    <div className="br-grid-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar month={month} cash={holdings.cash} />
      <main style={{ flex: 1, maxWidth: 1280, width: '100%', margin: '0 auto', padding: '28px 32px 56px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
        {/* MAIN COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Card glow="teal" style={{ padding: 26 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
              <Stat label="Patrimonio totale" value={eur(total)} delta={(totalDelta >= 0 ? '+' : '') + totalDelta.toFixed(1) + '%'} size="xl" glowValue />
              <Tabs tabs={['Mese', 'Anno', 'Tutto']} value={range} onChange={setRange} />
            </div>
            <div style={{ marginTop: 22 }}>
              <Sparkline data={history} height={190} showDots />
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--br-line)' }}>
              <MiniStat label="Capitale iniziale" value="€ 10.000" />
              <MiniStat label="Guadagno totale" value={eur(total - 10000)} tone={total >= 10000 ? 'up' : 'down'} />
              <MiniStat label="Mese di gioco" value={'#' + month} />
            </div>
          </Card>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--br-text)' }}>I tuoi asset</h2>
              <span style={{ fontSize: 13, color: 'var(--br-text-dim)' }}>Tocca un modulo per i dettagli</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {ASSET_DEFS.map((a) => (
                <AssetModule key={a.id} name={a.name} accent={a.accent} icon={I(a.icon)}
                  value={eur(holdings[a.id])} delta={assetDelta(a.id)}
                  allocation={Math.round((holdings[a.id] / total) * 100)}
                  selected={sel === a.id} onClick={() => setSel(a.id)} />
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 88 }}>
          <PlayerCard xp={xp} />
          <EventPanel title={ev.title} icon={I(ev.icon)} body={ev.body} impacts={impactsFromFx(ev.fx)} />
          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <span className="br-eyebrow">Turno</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--br-text-muted)' }}>Mese {month} → {month + 1}</span>
            </div>
            <Button variant="primary" size="lg" block iconRight={I('calendar-arrow-down')} onClick={advance}>Avanza mese</Button>
            <p style={{ margin: '12px 0 0', fontSize: 12.5, lineHeight: 1.5, color: 'var(--br-text-dim)', textAlign: 'center' }}>
              Il mercato reagisce all'evento e guadagni <span style={{ color: 'var(--br-teal)' }}>+35 XP</span>.
            </p>
          </Card>
        </aside>
      </main>
    </div>
  );
}

function TopBar({ month, cash }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 32px', background: 'rgba(10,14,20,0.78)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--br-line)',
    }}>
      <a href={HOME} style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
        <img src={LOGO} alt="" style={{ height: 36, filter: 'drop-shadow(0 0 10px rgba(37,228,212,0.35))' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>
          <span className="br-gradient-text">Bull</span><span style={{ color: 'var(--br-text)' }}>Run</span>
        </span>
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Badge tone="teal" dot>Mese {month}</Badge>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--br-surface-2)', border: '1px solid var(--br-line)', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--br-text)' }}>
          <i data-lucide="wallet" style={{ width: 15, height: 15, color: 'var(--br-cash)' }}></i>
          {eur(cash)} liquidi
        </span>
        <IconButton label="Classifica" variant="surface">{I('trophy')}</IconButton>
        <IconButton label="Notifiche" variant="surface">{I('bell')}</IconButton>
        <Avatar initials="LM" size={40} level={7} />
      </div>
    </header>
  );
}

function PlayerCard({ xp }) {
  return (
    <Card style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Avatar initials="LM" size={52} level={7} />
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, color: 'var(--br-text)' }}>Luca M.</div>
          <div style={{ fontSize: 13, color: 'var(--br-text-dim)' }}>Investitore in erba</div>
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <ProgressBar label="Livello 7" valueText={xp + ' / 1000 XP'} value={xp / 10} />
      </div>
    </Card>
  );
}

function MiniStat({ label, value, tone }) {
  const color = tone === 'up' ? 'var(--br-up)' : tone === 'down' ? 'var(--br-down)' : 'var(--br-text)';
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--br-text-dim)', marginBottom: 5 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 17, color }}>{value}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Dashboard />);
