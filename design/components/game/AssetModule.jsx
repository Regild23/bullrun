import React from 'react';

/**
 * A selectable asset-class module (Liquidità, BTP, ETF, Azioni, Crypto,
 * Immobili). Lights up with its accent neon when selected — the core
 * interaction of the BullRun dashboard.
 */
export function AssetModule({
  name,
  icon = null,
  value,
  delta = null,
  accent = 'var(--br-teal)',
  selected = false,
  allocation = null,    // 0-100 % share of portfolio
  onClick = () => {},
  style = {},
  ...rest
}) {
  const dir = delta && delta.trim().startsWith('-') ? 'down' : 'up';
  const dColor = dir === 'down' ? 'var(--br-down)' : 'var(--br-up)';

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: 'relative', textAlign: 'left',
        display: 'flex', flexDirection: 'column', gap: 14,
        padding: 18,
        background: selected ? 'var(--br-surface-2)' : 'var(--br-surface)',
        border: `1px solid ${selected ? accent : 'var(--br-line)'}`,
        borderRadius: 'var(--radius-lg)',
        cursor: 'pointer',
        boxShadow: selected ? `0 0 0 1px ${accent}, 0 0 26px -4px ${accent}` : 'var(--shadow-md)',
        transform: selected ? 'translateY(-2px)' : 'none',
        transition: 'all var(--dur-base) var(--ease-out)',
        overflow: 'hidden',
        ...style,
      }}
      onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.borderColor = 'var(--br-line-strong)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
      onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.borderColor = 'var(--br-line)'; e.currentTarget.style.transform = 'none'; } }}
      {...rest}
    >
      {/* accent glow wash when selected */}
      {selected && (
        <span style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 80% at 0% 0%, ${accent}22, transparent 60%)`, pointerEvents: 'none' }} />
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <span style={{
          width: 38, height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 'var(--radius-sm)',
          background: selected ? accent : 'rgba(255,255,255,0.05)',
          color: selected ? 'var(--br-ink)' : accent,
          transition: 'all var(--dur-base) var(--ease-out)',
        }}>{icon}</span>
        {delta != null && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: dColor }}>
            {dir === 'down' ? '▾' : '▴'} {delta}
          </span>
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--br-text)' }}>{name}</div>
        {value != null && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--br-text-muted)', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
        )}
      </div>
      {allocation != null && (
        <div style={{ position: 'relative' }}>
          <div style={{ height: 5, borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <div style={{ width: `${allocation}%`, height: '100%', background: accent, borderRadius: 'inherit' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--br-text-dim)', marginTop: 5 }}>{allocation}% del portafoglio</div>
        </div>
      )}
    </button>
  );
}
