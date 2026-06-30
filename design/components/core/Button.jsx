import React from 'react';

/**
 * BullRun primary button. Neon gradient fill is the hero CTA; secondary
 * and ghost are quieter. Icons are passed as children alongside text.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  children,
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 14, height: 36, gap: 8, radius: 'var(--radius-sm)' },
    md: { padding: '11px 20px', fontSize: 15, height: 44, gap: 9, radius: 'var(--radius-md)' },
    lg: { padding: '15px 28px', fontSize: 17, height: 54, gap: 10, radius: 'var(--radius-md)' },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: block ? 'flex' : 'inline-flex',
    width: block ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: s.fontSize,
    letterSpacing: '0.01em',
    lineHeight: 1,
    borderRadius: s.radius,
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  };

  const variants = {
    primary: {
      background: 'var(--br-gradient)',
      color: 'var(--br-ink)',
      boxShadow: 'var(--glow-soft-teal)',
    },
    secondary: {
      background: 'var(--br-surface-2)',
      color: 'var(--br-text)',
      border: '1px solid var(--br-line-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--br-text)',
      border: '1px solid var(--br-line)',
    },
    neonOutline: {
      background: 'rgba(37,228,212,0.06)',
      color: 'var(--br-teal-bright)',
      border: '1px solid var(--br-line-neon)',
    },
    danger: {
      background: 'var(--br-down-soft)',
      color: 'var(--br-down)',
      border: '1px solid rgba(255,92,122,0.4)',
    },
  };

  const v = variants[variant] || variants.primary;

  const onEnter = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(-1px)';
    if (variant === 'primary') e.currentTarget.style.boxShadow = 'var(--glow-teal)';
    else if (variant === 'secondary') e.currentTarget.style.background = 'var(--br-surface-3)';
    else e.currentTarget.style.background = 'rgba(37,228,212,0.1)';
  };
  const onLeave = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(0)';
    Object.assign(e.currentTarget.style, {
      boxShadow: v.boxShadow || 'none',
      background: v.background,
    });
  };
  const onDown = (e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(1px) scale(0.985)'; };
  const onUp = (e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(-1px)'; };

  return (
    <button
      type="button"
      disabled={disabled}
      style={{ ...base, ...v, ...style }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onDown}
      onMouseUp={onUp}
      {...rest}
    >
      {iconLeft && <span style={{ display: 'inline-flex' }}>{iconLeft}</span>}
      {children}
      {iconRight && <span style={{ display: 'inline-flex' }}>{iconRight}</span>}
    </button>
  );
}
