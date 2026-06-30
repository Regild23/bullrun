import React from 'react';

/** XP / progress bar with gradient fill. */
export function ProgressBar({
  value = 0,          // 0-100
  label = null,
  valueText = null,   // e.g. "740 / 1000 XP"
  height = 10,
  glow = true,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{ ...style }} {...rest}>
      {(label || valueText) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
          {label && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--br-text-dim)' }}>{label}</span>}
          {valueText && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--br-text-muted)' }}>{valueText}</span>}
        </div>
      )}
      <div style={{ height, borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: 'var(--br-gradient)',
          borderRadius: 'inherit',
          boxShadow: glow ? '0 0 12px rgba(37,228,212,0.5)' : 'none',
          transition: 'width var(--dur-slow) var(--ease-out)',
        }} />
      </div>
    </div>
  );
}
