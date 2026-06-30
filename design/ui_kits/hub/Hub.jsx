/* BullRun — Hub ("la tua cameretta").
   The bedroom scene is the menu: every glowing object is a glass portal. */
const NS = window.BullRunDesignSystem_5f2728;
const { Avatar, Badge, Button } = NS;

const SCENE = '../../assets/hub-scene.png';
const LOGO = '../../assets/bullrun-logo-transparent.png';
const I = (n, p = {}) => <i data-lucide={n} {...p}></i>;

/* hotspots positioned as % of the 1376×768 scene */
const SPOTS = [
  { id: 'stock', x: 8.5, y: 13.5, w: 26, h: 33, accent: 'var(--br-stock)', icon: 'candlestick-chart', label: 'Azioni', sub: 'Borsa · Trading', href: '../dashboard/index.html#stock' },
  { id: 'etf', x: 40.5, y: 20, w: 18, h: 26, accent: 'var(--br-etf)', icon: 'bar-chart-3', label: 'ETF', sub: 'Indici · Crescita', href: '../dashboard/index.html#etf' },
  { id: 'crypto', x: 70, y: 20, w: 10, h: 21, accent: 'var(--br-crypto)', icon: 'bitcoin', label: 'Crypto', sub: 'Valute digitali', href: '../dashboard/index.html#crypto' },
  { id: 'bond', x: 18, y: 54, w: 11, h: 19, accent: 'var(--br-bond)', icon: 'landmark', label: 'BTP', sub: 'Obbligazioni', href: '../dashboard/index.html#bond' },
  { id: 'realestate', x: 69.5, y: 55, w: 10, h: 18, accent: 'var(--br-realestate)', icon: 'home', label: 'Immobili', sub: 'REIT · Case', href: '../dashboard/index.html#realestate' },
  { id: 'wallet', x: 38.5, y: 48, w: 22, h: 30, accent: 'var(--br-teal)', icon: 'wallet', label: 'Il tuo portafoglio', sub: 'Patrimonio · €12.480', href: '../dashboard/index.html', primary: true },
];

function HotSpot({ s }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a className="hot" href={s.href}
       onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
       style={{ left: s.x + '%', top: s.y + '%', width: s.w + '%', height: s.h + '%', '--acc': s.accent }}>
      <span className="ring" />
      <span className="ping" />
      <span className={'pill' + (s.primary ? ' pill-primary' : '') + (s.up ? ' up' : '')}>
        <span className="pill-ic">{I(s.icon)}</span>
        <span className="pill-txt">
          <b>{s.label}</b>
          <i>{s.sub}</i>
        </span>
        <span className="pill-go">{I('arrow-up-right')}</span>
      </span>
    </a>
  );
}

function Hub() {
  React.useEffect(() => { window.lucide && window.lucide.createIcons(); });
  return (
    <div className="hub-bg">
      <div className="stage">
        <img className="scene" src={SCENE} alt="La tua cameretta" />
        <span className="vignette" />

        {/* top HUD */}
        <header className="hud">
          <a href="../landing/index.html" className="brand">
            <img src={LOGO} alt="" />
            <span><b className="g">Bull</b>Run</span>
          </a>
          <div className="hud-hint">
            <span className="dot" />
            <i data-lucide="mouse-pointer-click"></i>
            Tocca un oggetto per entrare
          </div>
          <div className="hud-right">
            <span className="cash"><i data-lucide="wallet"></i>€ 1.200 liquidi</span>
            <Avatar initials="LM" size={40} level={7} />
          </div>
        </header>

        {/* hotspots */}
        {SPOTS.map((s) => <HotSpot key={s.id} s={s} />)}

        {/* footer caption */}
        <div className="caption">
          <h1>La tua cameretta</h1>
          <p>Ogni oggetto è un portale. Scegli dove investire — o apri il portafoglio sul portatile.</p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Hub />);
