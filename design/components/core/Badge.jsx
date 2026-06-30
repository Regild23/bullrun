import React from 'react';

/** Small status / label pill. Tone maps to semantic or asset colors. */
export function Badge({ tone = 'neutral', soft = true, dot = false, style = {}, children, ...rest }) {
  const map = {
    neutral: ['var(--br-text-muted)', 'rgba(255,255,255,0.06)'],
    green: ['var(--br-green)', 'rgba(182,242,60,0.14)'],
    teal: ['var(--br-teal)', 'rgba(37,228,212,0.14)'],
    purple: ['var(--br-purple)', 'rgba(199,161,245,0.16)'],
    up: ['var(--br-up)', 'var(--br-up-soft)'],
    down: ['var(--br-down)', 'var(--br-down-soft)'],
    warn: ['var(--br-warn)', 'var(--br-warn-soft)'],
  };
  const [fg, bg] = map[tone] || map.neutral;

  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-xs)',
        fontWeight: 500,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: fg,
        background: soft ? bg : 'transparent',
        border: soft ? '1px solid transparent' : `1px solid ${fg}`,
        padding: '4px 10px',
        borderRadius: 'var(--radius-pill)',
        lineHeight: 1,
        ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: fg, boxShadow: `0 0 8px ${fg}` }} />}
      {children}
    </span>
  );
}
