import React from 'react';

/** Labelled metric: eyebrow label + big mono value + optional delta. */
export function Stat({
  label,
  value,
  delta = null,        // e.g. "+4.2%"
  direction = null,    // 'up' | 'down'
  size = 'md',         // 'sm' | 'md' | 'xl'
  glowValue = false,
  style = {},
  ...rest
}) {
  const sizes = { sm: 22, md: 32, xl: 56 };
  const vSize = sizes[size] || sizes.md;
  const dir = direction || (delta && delta.trim().startsWith('-') ? 'down' : delta ? 'up' : null);
  const dColor = dir === 'down' ? 'var(--br-down)' : 'var(--br-up)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }} {...rest}>
      {label && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)',
          letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase',
          color: 'var(--br-text-dim)',
        }}>{label}</span>
      )}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          fontSize: vSize, lineHeight: 1, color: 'var(--br-text)',
          textShadow: glowValue ? 'var(--glow-text-teal)' : 'none',
          letterSpacing: '-0.01em',
        }}>{value}</span>
        {delta && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontFamily: 'var(--font-mono)', fontWeight: 600,
            fontSize: Math.max(13, vSize * 0.32), color: dColor,
          }}>
            <span style={{ fontSize: '0.9em' }}>{dir === 'down' ? '▾' : '▴'}</span>{delta}
          </span>
        )}
      </div>
    </div>
  );
}
