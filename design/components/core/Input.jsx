import React from 'react';

/** Text input with optional leading icon. Neon focus ring. */
export function Input({
  iconLeft = null,
  size = 'md',
  invalid = false,
  style = {},
  wrapStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = { sm: 38, md: 46, lg: 54 };
  const h = heights[size] || heights.md;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      height: h, padding: '0 14px',
      background: 'var(--br-surface-3)',
      border: `1px solid ${invalid ? 'var(--br-down)' : focus ? 'var(--br-teal)' : 'var(--br-line)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--glow-soft-teal)' : 'none',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...wrapStyle,
    }}>
      {iconLeft && <span style={{ display: 'inline-flex', color: 'var(--br-text-dim)' }}>{iconLeft}</span>}
      <input
        onFocus={(e) => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
        onBlur={(e) => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
        style={{
          flex: 1, height: '100%',
          background: 'transparent', border: 'none', outline: 'none',
          color: 'var(--br-text)',
          fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)',
          ...style,
        }}
        {...rest}
      />
    </div>
  );
}
