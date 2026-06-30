import React from 'react';

/** Player avatar with optional neon level ring. */
export function Avatar({
  src = null,
  initials = 'BR',
  size = 48,
  ring = true,        // gradient ring
  level = null,       // number badge bottom-right
  style = {},
  ...rest
}) {
  const ringW = Math.max(2, Math.round(size * 0.06));
  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }} {...rest}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        padding: ring ? ringW : 0,
        background: ring ? 'var(--br-gradient)' : 'transparent',
        boxShadow: ring ? 'var(--glow-soft-teal)' : 'none',
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          overflow: 'hidden', background: 'var(--br-surface-3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid var(--br-bg)',
        }}>
          {src
            ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: size * 0.34, color: 'var(--br-text)' }}>{initials}</span>}
        </div>
      </div>
      {level != null && (
        <span style={{
          position: 'absolute', right: -2, bottom: -2,
          minWidth: size * 0.42, height: size * 0.42,
          padding: '0 5px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--br-bg)',
          border: '1.5px solid var(--br-teal)',
          color: 'var(--br-teal-bright)',
          borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-mono)', fontWeight: 700,
          fontSize: size * 0.24, lineHeight: 1,
          boxShadow: '0 0 10px rgba(37,228,212,0.4)',
        }}>{level}</span>
      )}
    </div>
  );
}
