import React from 'react';

/** Surface container. `glow` adds a neon ring; `accent` tints the border. */
export function Card({
  glow = null,          // 'green' | 'teal' | 'purple' | null
  accent = null,        // any CSS color for a left/border accent
  raised = false,
  padding = 'var(--space-6)',
  interactive = false,
  style = {},
  children,
  ...rest
}) {
  const glows = {
    green: 'var(--glow-green)',
    teal: 'var(--glow-teal)',
    purple: 'var(--glow-purple)',
  };

  const base = {
    background: raised ? 'var(--br-surface-2)' : 'var(--br-surface)',
    border: `1px solid ${accent ? accent : 'var(--br-line)'}`,
    borderRadius: 'var(--radius-card)',
    padding,
    boxShadow: glow ? glows[glow] : 'var(--shadow-md)',
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
    cursor: interactive ? 'pointer' : 'default',
  };

  return (
    <div
      style={{ ...base, ...style }}
      onMouseEnter={interactive ? (e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--br-line-neon)'; e.currentTarget.style.boxShadow = 'var(--glow-soft-teal)'; } : undefined}
      onMouseLeave={interactive ? (e) => { e.currentTarget.style.transform = 'translateY(0)'; Object.assign(e.currentTarget.style, { borderColor: accent || 'var(--br-line)', boxShadow: glow ? glows[glow] : 'var(--shadow-md)' }); } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
