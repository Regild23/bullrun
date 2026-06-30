import React from 'react';

/** Square icon-only button. Variants mirror Button but compact. */
export function IconButton({
  variant = 'ghost',
  size = 'md',
  disabled = false,
  label = '',
  style = {},
  children,
  ...rest
}) {
  const dims = { sm: 32, md: 40, lg: 48 };
  const d = dims[size] || dims.md;

  const variants = {
    solid: { background: 'var(--br-gradient)', color: 'var(--br-ink)' },
    surface: { background: 'var(--br-surface-2)', color: 'var(--br-text)', border: '1px solid var(--br-line-strong)' },
    ghost: { background: 'transparent', color: 'var(--br-text-muted)', border: '1px solid var(--br-line)' },
  };
  const v = variants[variant] || variants.ghost;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      style={{
        width: d, height: d,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-md)',
        border: '1px solid transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
        ...v, ...style,
      }}
      onMouseEnter={(e) => { if (!disabled && variant !== 'solid') { e.currentTarget.style.color = 'var(--br-teal-bright)'; e.currentTarget.style.background = 'rgba(37,228,212,0.08)'; } }}
      onMouseLeave={(e) => { Object.assign(e.currentTarget.style, v); }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.92)'; }}
      onMouseUp={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(1)'; }}
      {...rest}
    >
      {children}
    </button>
  );
}
