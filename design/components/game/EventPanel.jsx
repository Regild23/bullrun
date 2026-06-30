import React from 'react';

/**
 * "Evento del mese" panel — the news item that moves prices each turn.
 * Warm amber accent, like a market alert.
 */
export function EventPanel({
  kicker = 'Evento del mese',
  title,
  body,
  icon = null,
  impacts = [],   // [{ label: 'Crypto', delta: '+8%', dir: 'up' }]
  style = {},
  ...rest
}) {
  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(180deg, rgba(255,194,75,0.07), var(--br-surface))',
      border: '1px solid rgba(255,194,75,0.28)',
      borderRadius: 'var(--radius-lg)',
      padding: 20,
      overflow: 'hidden',
      ...style,
    }} {...rest}>
      <span style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,194,75,0.18), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, position: 'relative' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--br-warn)', boxShadow: '0 0 10px var(--br-warn)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--br-warn)' }}>{kicker}</span>
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', position: 'relative' }}>
        {icon && (
          <span style={{ flex: 'none', width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)', background: 'rgba(255,194,75,0.14)', color: 'var(--br-warn)' }}>{icon}</span>
        )}
        <div>
          <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, color: 'var(--br-text)', lineHeight: 1.25 }}>{title}</h4>
          {body && <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--br-text-muted)', lineHeight: 1.55 }}>{body}</p>}
        </div>
      </div>
      {impacts.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16, position: 'relative' }}>
          {impacts.map((im, i) => {
            const down = im.dir === 'down' || (im.delta && im.delta.startsWith('-'));
            const c = down ? 'var(--br-down)' : 'var(--br-up)';
            return (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 10px', borderRadius: 'var(--radius-pill)',
                background: down ? 'var(--br-down-soft)' : 'var(--br-up-soft)',
                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
              }}>
                <span style={{ color: 'var(--br-text-muted)' }}>{im.label}</span>
                <span style={{ color: c, fontWeight: 700 }}>{down ? '▾' : '▴'} {im.delta}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
