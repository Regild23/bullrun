import React from 'react';

/** Segmented tab control. Active tab gets the neon underline + glow. */
export function Tabs({ tabs = [], value, onChange = () => {}, style = {}, ...rest }) {
  const list = tabs.map((t) => (typeof t === 'string' ? { value: t, label: t } : t));
  const active = value ?? (list[0] && list[0].value);

  return (
    <div style={{ display: 'inline-flex', gap: 4, padding: 4, background: 'var(--br-surface)', border: '1px solid var(--br-line)', borderRadius: 'var(--radius-pill)', ...style }} {...rest}>
      {list.map((t) => {
        const on = t.value === active;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '8px 16px',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14,
              color: on ? 'var(--br-ink)' : 'var(--br-text-muted)',
              background: on ? 'var(--br-gradient)' : 'transparent',
              border: 'none', borderRadius: 'var(--radius-pill)',
              cursor: 'pointer',
              boxShadow: on ? 'var(--glow-soft-teal)' : 'none',
              transition: 'color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
            }}
            onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = 'var(--br-text)'; }}
            onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = 'var(--br-text-muted)'; }}
          >
            {t.icon && <span style={{ display: 'inline-flex' }}>{t.icon}</span>}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
