/* @ds-bundle: {"format":3,"namespace":"BullRunDesignSystem_5f2728","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"AssetModule","sourcePath":"components/game/AssetModule.jsx"},{"name":"EventPanel","sourcePath":"components/game/EventPanel.jsx"},{"name":"ProgressBar","sourcePath":"components/game/ProgressBar.jsx"},{"name":"Sparkline","sourcePath":"components/game/Sparkline.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"9c02b36e2c72","components/core/Badge.jsx":"8f271b767bd1","components/core/Button.jsx":"8ae26215f66e","components/core/Card.jsx":"5c458a7c55c6","components/core/IconButton.jsx":"1ae8d7351c77","components/core/Input.jsx":"9aa4bcfd2512","components/core/Stat.jsx":"bd8ca120e082","components/core/Tabs.jsx":"4976320d6e5c","components/game/AssetModule.jsx":"4895e4d71c3d","components/game/EventPanel.jsx":"4e0b9ecc23ba","components/game/ProgressBar.jsx":"21ba4e25e1d8","components/game/Sparkline.jsx":"58fdbac97e76","ui_kits/dashboard/Dashboard.jsx":"865ed39aa92b","ui_kits/hub/Hub.jsx":"3ff9160261be","ui_kits/landing/Landing.jsx":"a13315420324"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BullRunDesignSystem_5f2728 = window.BullRunDesignSystem_5f2728 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Player avatar with optional neon level ring. */
function Avatar({
  src = null,
  initials = 'BR',
  size = 48,
  ring = true,
  // gradient ring
  level = null,
  // number badge bottom-right
  style = {},
  ...rest
}) {
  const ringW = Math.max(2, Math.round(size * 0.06));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      width: size,
      height: size,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      padding: ring ? ringW : 0,
      background: ring ? 'var(--br-gradient)' : 'transparent',
      boxShadow: ring ? 'var(--glow-soft-teal)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      overflow: 'hidden',
      background: 'var(--br-surface-3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid var(--br-bg)'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: size * 0.34,
      color: 'var(--br-text)'
    }
  }, initials))), level != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: -2,
      bottom: -2,
      minWidth: size * 0.42,
      height: size * 0.42,
      padding: '0 5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--br-bg)',
      border: '1.5px solid var(--br-teal)',
      color: 'var(--br-teal-bright)',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: size * 0.24,
      lineHeight: 1,
      boxShadow: '0 0 10px rgba(37,228,212,0.4)'
    }
  }, level));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small status / label pill. Tone maps to semantic or asset colors. */
function Badge({
  tone = 'neutral',
  soft = true,
  dot = false,
  style = {},
  children,
  ...rest
}) {
  const map = {
    neutral: ['var(--br-text-muted)', 'rgba(255,255,255,0.06)'],
    green: ['var(--br-green)', 'rgba(182,242,60,0.14)'],
    teal: ['var(--br-teal)', 'rgba(37,228,212,0.14)'],
    purple: ['var(--br-purple)', 'rgba(199,161,245,0.16)'],
    up: ['var(--br-up)', 'var(--br-up-soft)'],
    down: ['var(--br-down)', 'var(--br-down-soft)'],
    warn: ['var(--br-warn)', 'var(--br-warn-soft)']
  };
  const [fg, bg] = map[tone] || map.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
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
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: fg,
      boxShadow: `0 0 8px ${fg}`
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BullRun primary button. Neon gradient fill is the hero CTA; secondary
 * and ghost are quieter. Icons are passed as children alongside text.
 */
function Button({
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
    sm: {
      padding: '8px 14px',
      fontSize: 14,
      height: 36,
      gap: 8,
      radius: 'var(--radius-sm)'
    },
    md: {
      padding: '11px 20px',
      fontSize: 15,
      height: 44,
      gap: 9,
      radius: 'var(--radius-md)'
    },
    lg: {
      padding: '15px 28px',
      fontSize: 17,
      height: 54,
      gap: 10,
      radius: 'var(--radius-md)'
    }
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
    userSelect: 'none'
  };
  const variants = {
    primary: {
      background: 'var(--br-gradient)',
      color: 'var(--br-ink)',
      boxShadow: 'var(--glow-soft-teal)'
    },
    secondary: {
      background: 'var(--br-surface-2)',
      color: 'var(--br-text)',
      border: '1px solid var(--br-line-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--br-text)',
      border: '1px solid var(--br-line)'
    },
    neonOutline: {
      background: 'rgba(37,228,212,0.06)',
      color: 'var(--br-teal-bright)',
      border: '1px solid var(--br-line-neon)'
    },
    danger: {
      background: 'var(--br-down-soft)',
      color: 'var(--br-down)',
      border: '1px solid rgba(255,92,122,0.4)'
    }
  };
  const v = variants[variant] || variants.primary;
  const onEnter = e => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(-1px)';
    if (variant === 'primary') e.currentTarget.style.boxShadow = 'var(--glow-teal)';else if (variant === 'secondary') e.currentTarget.style.background = 'var(--br-surface-3)';else e.currentTarget.style.background = 'rgba(37,228,212,0.1)';
  };
  const onLeave = e => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(0)';
    Object.assign(e.currentTarget.style, {
      boxShadow: v.boxShadow || 'none',
      background: v.background
    });
  };
  const onDown = e => {
    if (!disabled) e.currentTarget.style.transform = 'translateY(1px) scale(0.985)';
  };
  const onUp = e => {
    if (!disabled) e.currentTarget.style.transform = 'translateY(-1px)';
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: {
      ...base,
      ...v,
      ...style
    },
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onMouseDown: onDown,
    onMouseUp: onUp
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface container. `glow` adds a neon ring; `accent` tints the border. */
function Card({
  glow = null,
  // 'green' | 'teal' | 'purple' | null
  accent = null,
  // any CSS color for a left/border accent
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
    purple: 'var(--glow-purple)'
  };
  const base = {
    background: raised ? 'var(--br-surface-2)' : 'var(--br-surface)',
    border: `1px solid ${accent ? accent : 'var(--br-line)'}`,
    borderRadius: 'var(--radius-card)',
    padding,
    boxShadow: glow ? glows[glow] : 'var(--shadow-md)',
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
    cursor: interactive ? 'pointer' : 'default'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...base,
      ...style
    },
    onMouseEnter: interactive ? e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.borderColor = 'var(--br-line-neon)';
      e.currentTarget.style.boxShadow = 'var(--glow-soft-teal)';
    } : undefined,
    onMouseLeave: interactive ? e => {
      e.currentTarget.style.transform = 'translateY(0)';
      Object.assign(e.currentTarget.style, {
        borderColor: accent || 'var(--br-line)',
        boxShadow: glow ? glows[glow] : 'var(--shadow-md)'
      });
    } : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Square icon-only button. Variants mirror Button but compact. */
function IconButton({
  variant = 'ghost',
  size = 'md',
  disabled = false,
  label = '',
  style = {},
  children,
  ...rest
}) {
  const dims = {
    sm: 32,
    md: 40,
    lg: 48
  };
  const d = dims[size] || dims.md;
  const variants = {
    solid: {
      background: 'var(--br-gradient)',
      color: 'var(--br-ink)'
    },
    surface: {
      background: 'var(--br-surface-2)',
      color: 'var(--br-text)',
      border: '1px solid var(--br-line-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--br-text-muted)',
      border: '1px solid var(--br-line)'
    }
  };
  const v = variants[variant] || variants.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    style: {
      width: d,
      height: d,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      border: '1px solid transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
      ...v,
      ...style
    },
    onMouseEnter: e => {
      if (!disabled && variant !== 'solid') {
        e.currentTarget.style.color = 'var(--br-teal-bright)';
        e.currentTarget.style.background = 'rgba(37,228,212,0.08)';
      }
    },
    onMouseLeave: e => {
      Object.assign(e.currentTarget.style, v);
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.92)';
    },
    onMouseUp: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(1)';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input with optional leading icon. Neon focus ring. */
function Input({
  iconLeft = null,
  size = 'md',
  invalid = false,
  style = {},
  wrapStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = {
    sm: 38,
    md: 46,
    lg: 54
  };
  const h = heights[size] || heights.md;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: h,
      padding: '0 14px',
      background: 'var(--br-surface-3)',
      border: `1px solid ${invalid ? 'var(--br-down)' : focus ? 'var(--br-teal)' : 'var(--br-line)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--glow-soft-teal)' : 'none',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...wrapStyle
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--br-text-dim)'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      flex: 1,
      height: '100%',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--br-text)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body)',
      ...style
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Labelled metric: eyebrow label + big mono value + optional delta. */
function Stat({
  label,
  value,
  delta = null,
  // e.g. "+4.2%"
  direction = null,
  // 'up' | 'down'
  size = 'md',
  // 'sm' | 'md' | 'xl'
  glowValue = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: 22,
    md: 32,
    xl: 56
  };
  const vSize = sizes[size] || sizes.md;
  const dir = direction || (delta && delta.trim().startsWith('-') ? 'down' : delta ? 'up' : null);
  const dColor = dir === 'down' ? 'var(--br-down)' : 'var(--br-up)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-xs)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--br-text-dim)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontVariantNumeric: 'tabular-nums',
      fontSize: vSize,
      lineHeight: 1,
      color: 'var(--br-text)',
      textShadow: glowValue ? 'var(--glow-text-teal)' : 'none',
      letterSpacing: '-0.01em'
    }
  }, value), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-mono)',
      fontWeight: 600,
      fontSize: Math.max(13, vSize * 0.32),
      color: dColor
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.9em'
    }
  }, dir === 'down' ? '▾' : '▴'), delta)));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Segmented tab control. Active tab gets the neon underline + glow. */
function Tabs({
  tabs = [],
  value,
  onChange = () => {},
  style = {},
  ...rest
}) {
  const list = tabs.map(t => typeof t === 'string' ? {
    value: t,
    label: t
  } : t);
  const active = value ?? (list[0] && list[0].value);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      gap: 4,
      padding: 4,
      background: 'var(--br-surface)',
      border: '1px solid var(--br-line)',
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }, rest), list.map(t => {
    const on = t.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      type: "button",
      onClick: () => onChange(t.value),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '8px 16px',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 14,
        color: on ? 'var(--br-ink)' : 'var(--br-text-muted)',
        background: on ? 'var(--br-gradient)' : 'transparent',
        border: 'none',
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        boxShadow: on ? 'var(--glow-soft-teal)' : 'none',
        transition: 'color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)'
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.color = 'var(--br-text)';
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.color = 'var(--br-text-muted)';
      }
    }, t.icon && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex'
      }
    }, t.icon), t.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/game/AssetModule.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A selectable asset-class module (Liquidità, BTP, ETF, Azioni, Crypto,
 * Immobili). Lights up with its accent neon when selected — the core
 * interaction of the BullRun dashboard.
 */
function AssetModule({
  name,
  icon = null,
  value,
  delta = null,
  accent = 'var(--br-teal)',
  selected = false,
  allocation = null,
  // 0-100 % share of portfolio
  onClick = () => {},
  style = {},
  ...rest
}) {
  const dir = delta && delta.trim().startsWith('-') ? 'down' : 'up';
  const dColor = dir === 'down' ? 'var(--br-down)' : 'var(--br-up)';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    style: {
      position: 'relative',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      padding: 18,
      background: selected ? 'var(--br-surface-2)' : 'var(--br-surface)',
      border: `1px solid ${selected ? accent : 'var(--br-line)'}`,
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer',
      boxShadow: selected ? `0 0 0 1px ${accent}, 0 0 26px -4px ${accent}` : 'var(--shadow-md)',
      transform: selected ? 'translateY(-2px)' : 'none',
      transition: 'all var(--dur-base) var(--ease-out)',
      overflow: 'hidden',
      ...style
    },
    onMouseEnter: e => {
      if (!selected) {
        e.currentTarget.style.borderColor = 'var(--br-line-strong)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }
    },
    onMouseLeave: e => {
      if (!selected) {
        e.currentTarget.style.borderColor = 'var(--br-line)';
        e.currentTarget.style.transform = 'none';
      }
    }
  }, rest), selected && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(120% 80% at 0% 0%, ${accent}22, transparent 60%)`,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-sm)',
      background: selected ? accent : 'rgba(255,255,255,0.05)',
      color: selected ? 'var(--br-ink)' : accent,
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, icon), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 600,
      color: dColor
    }
  }, dir === 'down' ? '▾' : '▴', " ", delta)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 16,
      color: 'var(--br-text)'
    }
  }, name), value != null && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 15,
      color: 'var(--br-text-muted)',
      marginTop: 4,
      fontVariantNumeric: 'tabular-nums'
    }
  }, value)), allocation != null && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(255,255,255,0.07)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${allocation}%`,
      height: '100%',
      background: accent,
      borderRadius: 'inherit'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--br-text-dim)',
      marginTop: 5
    }
  }, allocation, "% del portafoglio")));
}
Object.assign(__ds_scope, { AssetModule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/AssetModule.jsx", error: String((e && e.message) || e) }); }

// components/game/EventPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * "Evento del mese" panel — the news item that moves prices each turn.
 * Warm amber accent, like a market alert.
 */
function EventPanel({
  kicker = 'Evento del mese',
  title,
  body,
  icon = null,
  impacts = [],
  // [{ label: 'Crypto', delta: '+8%', dir: 'up' }]
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      background: 'linear-gradient(180deg, rgba(255,194,75,0.07), var(--br-surface))',
      border: '1px solid rgba(255,194,75,0.28)',
      borderRadius: 'var(--radius-lg)',
      padding: 20,
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -40,
      right: -40,
      width: 140,
      height: 140,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,194,75,0.18), transparent 70%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 14,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--br-warn)',
      boxShadow: '0 0 10px var(--br-warn)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-xs)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--br-warn)'
    }
  }, kicker)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      position: 'relative'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 44,
      height: 44,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(255,194,75,0.14)',
      color: 'var(--br-warn)'
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 18,
      color: 'var(--br-text)',
      lineHeight: 1.25
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontSize: 14,
      color: 'var(--br-text-muted)',
      lineHeight: 1.55
    }
  }, body))), impacts.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 16,
      position: 'relative'
    }
  }, impacts.map((im, i) => {
    const down = im.dir === 'down' || im.delta && im.delta.startsWith('-');
    const c = down ? 'var(--br-down)' : 'var(--br-up)';
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 10px',
        borderRadius: 'var(--radius-pill)',
        background: down ? 'var(--br-down-soft)' : 'var(--br-up-soft)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        fontWeight: 500
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--br-text-muted)'
      }
    }, im.label), /*#__PURE__*/React.createElement("span", {
      style: {
        color: c,
        fontWeight: 700
      }
    }, down ? '▾' : '▴', " ", im.delta));
  })));
}
Object.assign(__ds_scope, { EventPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/EventPanel.jsx", error: String((e && e.message) || e) }); }

// components/game/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** XP / progress bar with gradient fill. */
function ProgressBar({
  value = 0,
  // 0-100
  label = null,
  valueText = null,
  // e.g. "740 / 1000 XP"
  height = 10,
  glow = true,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...style
    }
  }, rest), (label || valueText) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 7
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-xs)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--br-text-dim)'
    }
  }, label), valueText && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--br-text-muted)'
    }
  }, valueText)), /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(255,255,255,0.07)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      background: 'var(--br-gradient)',
      borderRadius: 'inherit',
      boxShadow: glow ? '0 0 12px rgba(37,228,212,0.5)' : 'none',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/game/Sparkline.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Lightweight SVG sparkline / area chart for portfolio history. */
function Sparkline({
  data = [],
  width = 600,
  height = 160,
  stroke = 'url(#br-spark-grad)',
  fill = true,
  showDots = false,
  strokeWidth = 2.5,
  style = {},
  ...rest
}) {
  const id = React.useId ? React.useId().replace(/:/g, '') : 'sp' + Math.random().toString(36).slice(2);
  const pad = 6;
  const min = Math.min(...data),
    max = Math.max(...data);
  const range = max - min || 1;
  const n = data.length;
  const x = i => pad + i / Math.max(1, n - 1) * (width - pad * 2);
  const y = v => pad + (1 - (v - min) / range) * (height - pad * 2);
  const linePts = data.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  const areaPath = `M ${x(0)},${y(data[0])} ` + data.map((v, i) => `L ${x(i)},${y(v)}`).join(' ') + ` L ${x(n - 1)},${height - pad} L ${x(0)},${height - pad} Z`;
  const last = data[n - 1];
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: `0 0 ${width} ${height}`,
    width: "100%",
    preserveAspectRatio: "none",
    style: {
      display: 'block',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `br-spark-grad-${id}`,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "var(--br-green)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "var(--br-teal)"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: `br-spark-fill-${id}`,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(37,228,212,0.28)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(37,228,212,0)"
  }))), fill && /*#__PURE__*/React.createElement("path", {
    d: areaPath,
    fill: `url(#br-spark-fill-${id})`
  }), /*#__PURE__*/React.createElement("polyline", {
    points: linePts,
    fill: "none",
    stroke: stroke === 'url(#br-spark-grad)' ? `url(#br-spark-grad-${id})` : stroke,
    strokeWidth: strokeWidth,
    strokeLinejoin: "round",
    strokeLinecap: "round",
    style: {
      filter: 'drop-shadow(0 0 6px rgba(37,228,212,0.45))'
    }
  }), showDots && n > 0 && /*#__PURE__*/React.createElement("circle", {
    cx: x(n - 1),
    cy: y(last),
    r: 4,
    fill: "var(--br-teal-bright)",
    style: {
      filter: 'drop-shadow(0 0 6px rgba(37,228,212,0.8))'
    }
  }));
}
Object.assign(__ds_scope, { Sparkline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/game/Sparkline.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Dashboard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* BullRun — Dashboard (game) UI kit.
   Single-scope file: control-panel layout + live "Avanza mese" loop. */
const NS = window.BullRunDesignSystem_5f2728;
const {
  Button,
  IconButton,
  Badge,
  Card,
  Stat,
  AssetModule,
  EventPanel,
  Sparkline,
  Avatar,
  ProgressBar,
  Tabs
} = NS;
const LOGO = '../../assets/bullrun-logo-transparent.png';
const HOME = '../hub/index.html';
const I = (n, p = {}) => /*#__PURE__*/React.createElement("i", _extends({
  "data-lucide": n
}, p));
const eur = n => '€ ' + Math.round(n).toLocaleString('it-IT');
const ASSET_DEFS = [{
  id: 'cash',
  name: 'Liquidità',
  accent: 'var(--br-cash)',
  icon: 'wallet'
}, {
  id: 'bond',
  name: 'BTP',
  accent: 'var(--br-bond)',
  icon: 'landmark'
}, {
  id: 'etf',
  name: 'ETF',
  accent: 'var(--br-etf)',
  icon: 'layers'
}, {
  id: 'stock',
  name: 'Azioni',
  accent: 'var(--br-stock)',
  icon: 'trending-up'
}, {
  id: 'crypto',
  name: 'Crypto',
  accent: 'var(--br-crypto)',
  icon: 'bitcoin'
}, {
  id: 'realestate',
  name: 'Immobili',
  accent: 'var(--br-realestate)',
  icon: 'building-2'
}];
const START = {
  cash: 1200,
  bond: 1850,
  etf: 3400,
  stock: 1980,
  crypto: 2150,
  realestate: 1900
};

/* events: per-asset multiplier deltas (fraction). */
const EVENTS = [{
  title: 'La BCE alza i tassi di interesse',
  icon: 'newspaper',
  body: 'Prendere prestiti costa di più: le aziende rallentano, ma le obbligazioni rendono di più.',
  fx: {
    bond: 0.03,
    stock: -0.05,
    crypto: -0.07,
    etf: -0.02,
    realestate: -0.01,
    cash: 0.001
  }
}, {
  title: "Boom dell'intelligenza artificiale",
  icon: 'cpu',
  body: 'Le aziende tech volano. Azioni ed ETF ne traggono vantaggio, e anche le crypto salgono.',
  fx: {
    stock: 0.08,
    etf: 0.05,
    crypto: 0.06,
    bond: -0.01,
    realestate: 0.01,
    cash: 0
  }
}, {
  title: "L'inflazione torna a scendere",
  icon: 'trending-down',
  body: 'I prezzi crescono più lentamente: buone notizie per azioni e immobili.',
  fx: {
    stock: 0.04,
    realestate: 0.03,
    etf: 0.03,
    bond: 0.01,
    crypto: 0.02,
    cash: -0.002
  }
}, {
  title: 'Crollo improvviso di una grande crypto',
  icon: 'zap',
  body: 'Il panico colpisce il mercato cripto. Chi era diversificato sente meno il colpo.',
  fx: {
    crypto: -0.18,
    stock: -0.02,
    etf: -0.01,
    bond: 0.01,
    realestate: 0,
    cash: 0
  }
}, {
  title: 'Nuovi incentivi per la casa',
  icon: 'building-2',
  body: 'Il governo sostiene il mercato immobiliare. Gli immobili si rivalutano.',
  fx: {
    realestate: 0.06,
    bond: 0.01,
    stock: 0.01,
    etf: 0.01,
    crypto: -0.01,
    cash: 0
  }
}];
function impactsFromFx(fx) {
  return Object.entries(fx).filter(([, v]) => Math.abs(v) >= 0.02).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])).slice(0, 4).map(([id, v]) => ({
    label: ASSET_DEFS.find(a => a.id === id).name,
    delta: (v > 0 ? '+' : '') + Math.round(v * 100) + '%',
    dir: v < 0 ? 'down' : 'up'
  }));
}
function useIcons(dep) {
  React.useEffect(() => {
    window.lucide && window.lucide.createIcons();
  }, [dep]);
}
function Dashboard() {
  const [month, setMonth] = React.useState(7);
  const [holdings, setHoldings] = React.useState(START);
  const [prev, setPrev] = React.useState(START);
  const [eventIdx, setEventIdx] = React.useState(0);
  const [sel, setSel] = React.useState(() => {
    const h = (typeof location !== 'undefined' ? location.hash : '').replace('#', '');
    return ['cash', 'bond', 'etf', 'stock', 'crypto', 'realestate'].includes(h) ? h : 'crypto';
  });
  const [history, setHistory] = React.useState([10000, 10420, 10180, 10890, 11240, 11020, 11480]);
  const [xp, setXp] = React.useState(740);
  const [range, setRange] = React.useState('Anno');
  const total = Object.values(holdings).reduce((a, b) => a + b, 0);
  const prevTotal = Object.values(prev).reduce((a, b) => a + b, 0);
  const totalDelta = (total - prevTotal) / prevTotal * 100;
  const ev = EVENTS[eventIdx];
  useIcons(month + sel);
  function advance() {
    const next = EVENTS[(eventIdx + 1) % EVENTS.length];
    const newHold = {};
    for (const a of ASSET_DEFS) {
      const drift = (Math.random() - 0.45) * 0.03;
      const f = (next.fx[a.id] || 0) + drift;
      newHold[a.id] = Math.max(0, holdings[a.id] * (1 + f));
    }
    setPrev(holdings);
    setHoldings(newHold);
    setHistory(h => [...h.slice(-11), Object.values(newHold).reduce((x, y) => x + y, 0)]);
    setEventIdx((eventIdx + 1) % EVENTS.length);
    setMonth(m => m + 1);
    setXp(x => Math.min(1000, x + 35));
  }
  function assetDelta(id) {
    const d = (holdings[id] - prev[id]) / (prev[id] || 1) * 100;
    return (d >= 0 ? '+' : '') + d.toFixed(1) + '%';
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "br-grid-bg",
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    month: month,
    cash: holdings.cash
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      maxWidth: 1280,
      width: '100%',
      margin: '0 auto',
      padding: '28px 32px 56px',
      display: 'grid',
      gridTemplateColumns: '1fr 360px',
      gap: 24,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    glow: "teal",
    style: {
      padding: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Patrimonio totale",
    value: eur(total),
    delta: (totalDelta >= 0 ? '+' : '') + totalDelta.toFixed(1) + '%',
    size: "xl",
    glowValue: true
  }), /*#__PURE__*/React.createElement(Tabs, {
    tabs: ['Mese', 'Anno', 'Tutto'],
    value: range,
    onChange: setRange
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Sparkline, {
    data: history,
    height: 190,
    showDots: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      marginTop: 18,
      paddingTop: 18,
      borderTop: '1px solid var(--br-line)'
    }
  }, /*#__PURE__*/React.createElement(MiniStat, {
    label: "Capitale iniziale",
    value: "\u20AC 10.000"
  }), /*#__PURE__*/React.createElement(MiniStat, {
    label: "Guadagno totale",
    value: eur(total - 10000),
    tone: total >= 10000 ? 'up' : 'down'
  }), /*#__PURE__*/React.createElement(MiniStat, {
    label: "Mese di gioco",
    value: '#' + month
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      fontWeight: 600,
      color: 'var(--br-text)'
    }
  }, "I tuoi asset"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--br-text-dim)'
    }
  }, "Tocca un modulo per i dettagli")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16
    }
  }, ASSET_DEFS.map(a => /*#__PURE__*/React.createElement(AssetModule, {
    key: a.id,
    name: a.name,
    accent: a.accent,
    icon: I(a.icon),
    value: eur(holdings[a.id]),
    delta: assetDelta(a.id),
    allocation: Math.round(holdings[a.id] / total * 100),
    selected: sel === a.id,
    onClick: () => setSel(a.id)
  }))))), /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      position: 'sticky',
      top: 88
    }
  }, /*#__PURE__*/React.createElement(PlayerCard, {
    xp: xp
  }), /*#__PURE__*/React.createElement(EventPanel, {
    title: ev.title,
    icon: I(ev.icon),
    body: ev.body,
    impacts: impactsFromFx(ev.fx)
  }), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "br-eyebrow"
  }, "Turno"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--br-text-muted)'
    }
  }, "Mese ", month, " \u2192 ", month + 1)), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    block: true,
    iconRight: I('calendar-arrow-down'),
    onClick: advance
  }, "Avanza mese"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      fontSize: 12.5,
      lineHeight: 1.5,
      color: 'var(--br-text-dim)',
      textAlign: 'center'
    }
  }, "Il mercato reagisce all'evento e guadagni ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--br-teal)'
    }
  }, "+35 XP"), ".")))));
}
function TopBar({
  month,
  cash
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 32px',
      background: 'rgba(10,14,20,0.78)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--br-line)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: HOME,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "",
    style: {
      height: 36,
      filter: 'drop-shadow(0 0 10px rgba(37,228,212,0.35))'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 20,
      letterSpacing: '-0.02em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "br-gradient-text"
  }, "Bull"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--br-text)'
    }
  }, "Run"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "teal",
    dot: true
  }, "Mese ", month), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 14px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--br-surface-2)',
      border: '1px solid var(--br-line)',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--br-text)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "wallet",
    style: {
      width: 15,
      height: 15,
      color: 'var(--br-cash)'
    }
  }), eur(cash), " liquidi"), /*#__PURE__*/React.createElement(IconButton, {
    label: "Classifica",
    variant: "surface"
  }, I('trophy')), /*#__PURE__*/React.createElement(IconButton, {
    label: "Notifiche",
    variant: "surface"
  }, I('bell')), /*#__PURE__*/React.createElement(Avatar, {
    initials: "LM",
    size: 40,
    level: 7
  })));
}
function PlayerCard({
  xp
}) {
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: "LM",
    size: 52,
    level: 7
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 17,
      color: 'var(--br-text)'
    }
  }, "Luca M."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--br-text-dim)'
    }
  }, "Investitore in erba"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    label: "Livello 7",
    valueText: xp + ' / 1000 XP',
    value: xp / 10
  })));
}
function MiniStat({
  label,
  value,
  tone
}) {
  const color = tone === 'up' ? 'var(--br-up)' : tone === 'down' ? 'var(--br-down)' : 'var(--br-text)';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--br-text-dim)',
      marginBottom: 5
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 17,
      color
    }
  }, value));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Dashboard, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/hub/Hub.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* BullRun — Hub ("la tua cameretta").
   The bedroom scene is the menu: every glowing object is a glass portal. */
const NS = window.BullRunDesignSystem_5f2728;
const {
  Avatar,
  Badge,
  Button
} = NS;
const SCENE = '../../assets/hub-scene.png';
const LOGO = '../../assets/bullrun-logo-transparent.png';
const I = (n, p = {}) => /*#__PURE__*/React.createElement("i", _extends({
  "data-lucide": n
}, p));

/* hotspots positioned as % of the 1376×768 scene */
const SPOTS = [{
  id: 'stock',
  x: 8.5,
  y: 13.5,
  w: 26,
  h: 33,
  accent: 'var(--br-stock)',
  icon: 'candlestick-chart',
  label: 'Azioni',
  sub: 'Borsa · Trading',
  href: '../dashboard/index.html#stock'
}, {
  id: 'etf',
  x: 40.5,
  y: 20,
  w: 18,
  h: 26,
  accent: 'var(--br-etf)',
  icon: 'bar-chart-3',
  label: 'ETF',
  sub: 'Indici · Crescita',
  href: '../dashboard/index.html#etf'
}, {
  id: 'crypto',
  x: 70,
  y: 20,
  w: 10,
  h: 21,
  accent: 'var(--br-crypto)',
  icon: 'bitcoin',
  label: 'Crypto',
  sub: 'Valute digitali',
  href: '../dashboard/index.html#crypto'
}, {
  id: 'bond',
  x: 18,
  y: 54,
  w: 11,
  h: 19,
  accent: 'var(--br-bond)',
  icon: 'landmark',
  label: 'BTP',
  sub: 'Obbligazioni',
  href: '../dashboard/index.html#bond'
}, {
  id: 'realestate',
  x: 69.5,
  y: 55,
  w: 10,
  h: 18,
  accent: 'var(--br-realestate)',
  icon: 'home',
  label: 'Immobili',
  sub: 'REIT · Case',
  href: '../dashboard/index.html#realestate'
}, {
  id: 'wallet',
  x: 38.5,
  y: 48,
  w: 22,
  h: 30,
  accent: 'var(--br-teal)',
  icon: 'wallet',
  label: 'Il tuo portafoglio',
  sub: 'Patrimonio · €12.480',
  href: '../dashboard/index.html',
  primary: true
}];
function HotSpot({
  s
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    className: "hot",
    href: s.href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      left: s.x + '%',
      top: s.y + '%',
      width: s.w + '%',
      height: s.h + '%',
      '--acc': s.accent
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ring"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ping"
  }), /*#__PURE__*/React.createElement("span", {
    className: 'pill' + (s.primary ? ' pill-primary' : '') + (s.up ? ' up' : '')
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill-ic"
  }, I(s.icon)), /*#__PURE__*/React.createElement("span", {
    className: "pill-txt"
  }, /*#__PURE__*/React.createElement("b", null, s.label), /*#__PURE__*/React.createElement("i", null, s.sub)), /*#__PURE__*/React.createElement("span", {
    className: "pill-go"
  }, I('arrow-up-right'))));
}
function Hub() {
  React.useEffect(() => {
    window.lucide && window.lucide.createIcons();
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "hub-bg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stage"
  }, /*#__PURE__*/React.createElement("img", {
    className: "scene",
    src: SCENE,
    alt: "La tua cameretta"
  }), /*#__PURE__*/React.createElement("span", {
    className: "vignette"
  }), /*#__PURE__*/React.createElement("header", {
    className: "hud"
  }, /*#__PURE__*/React.createElement("a", {
    href: "../landing/index.html",
    className: "brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: ""
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    className: "g"
  }, "Bull"), "Run")), /*#__PURE__*/React.createElement("div", {
    className: "hud-hint"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "mouse-pointer-click"
  }), "Tocca un oggetto per entrare"), /*#__PURE__*/React.createElement("div", {
    className: "hud-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cash"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "wallet"
  }), "\u20AC 1.200 liquidi"), /*#__PURE__*/React.createElement(Avatar, {
    initials: "LM",
    size: 40,
    level: 7
  }))), SPOTS.map(s => /*#__PURE__*/React.createElement(HotSpot, {
    key: s.id,
    s: s
  })), /*#__PURE__*/React.createElement("div", {
    className: "caption"
  }, /*#__PURE__*/React.createElement("h1", null, "La tua cameretta"), /*#__PURE__*/React.createElement("p", null, "Ogni oggetto \xE8 un portale. Scegli dove investire \u2014 o apri il portafoglio sul portatile."))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Hub, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hub/Hub.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Landing.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* BullRun — Landing page UI kit.
   Single-scope file: defines all sections + renders.
   Primitives come from the compiled DS bundle (window namespace). */
const NS = window.BullRunDesignSystem_5f2728;
const {
  Button,
  IconButton,
  Badge,
  Card,
  Stat,
  AssetModule,
  EventPanel,
  Sparkline,
  Avatar,
  ProgressBar
} = NS;
const LOGO = '../../assets/bullrun-logo-transparent.png';
const DASH = '../hub/index.html';
const I = (n, props = {}) => /*#__PURE__*/React.createElement("i", _extends({
  "data-lucide": n
}, props));
function useIcons() {
  React.useEffect(() => {
    window.lucide && window.lucide.createIcons();
  });
}

/* ---------------- Nav ---------------- */
function Nav() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 32px',
      background: 'rgba(10,14,20,0.72)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--br-line)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "",
    style: {
      height: 40,
      filter: 'drop-shadow(0 0 12px rgba(37,228,212,0.35))'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: '-0.02em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "br-gradient-text"
  }, "Bull"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--br-text)'
    }
  }, "Run"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 26,
      marginRight: 8
    }
  }, ['Come funziona', 'Investimenti', 'Per le scuole'].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontSize: 14,
      color: 'var(--br-text-muted)',
      textDecoration: 'none',
      fontWeight: 500
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--br-text)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--br-text-muted)'
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: DASH
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Accedi")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: 14,
      color: 'var(--br-text-muted)',
      textDecoration: 'none',
      fontWeight: 500,
      padding: '0 6px'
    }
  }, "Contattaci"), /*#__PURE__*/React.createElement("a", {
    href: DASH
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "Iscriviti")))));
}

/* ---------------- Hero ---------------- */
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: '72px 32px 88px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -120,
      left: '8%',
      width: 380,
      height: 380,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(182,242,60,0.16), transparent 65%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 40,
      right: '4%',
      width: 460,
      height: 460,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(37,228,212,0.16), transparent 65%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 1200,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 12px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--br-line-neon)',
      background: 'rgba(37,228,212,0.06)',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--br-teal)',
      boxShadow: '0 0 8px var(--br-teal)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "br-eyebrow"
  }, "Finanza ed economia \xB7 scuole medie")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 64,
      lineHeight: 1.02,
      letterSpacing: '-0.025em',
      color: 'var(--br-text)'
    }
  }, "Impara a investire.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "br-gradient-text"
  }, "Senza rischiare un euro.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '22px 0 32px',
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--br-text-muted)',
      maxWidth: 520
    }
  }, "BullRun \xE8 il gioco dove gestisci un portafoglio virtuale, superi gli eventi del mercato e diventi pi\xF9 bravo con i soldi \u2014 un mese alla volta."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: DASH
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: I('arrow-right')
  }, "Inizia a giocare")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    iconLeft: I('play')
  }, "Guarda come funziona")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 26,
      marginTop: 36
    }
  }, [['12.400+', 'studenti in gioco'], ['6', 'classi di asset'], ['0 €', 'soldi reali a rischio']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 24,
      color: 'var(--br-text)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--br-text-dim)'
    }
  }, l))))), /*#__PURE__*/React.createElement(HeroPreview, null)));
}
function HeroPreview() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "",
    style: {
      position: 'absolute',
      top: -64,
      right: -24,
      width: 200,
      opacity: 0.95,
      filter: 'drop-shadow(0 0 30px rgba(37,228,212,0.4))',
      zIndex: 2
    }
  }), /*#__PURE__*/React.createElement(Card, {
    glow: "teal",
    style: {
      padding: 24,
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Patrimonio totale",
    value: "\u20AC 12.480",
    delta: "+4.2%",
    size: "xl",
    glowValue: true
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "teal",
    dot: true
  }, "Mese 7")), /*#__PURE__*/React.createElement(Sparkline, {
    data: [100, 104, 99, 112, 118, 110, 126, 132, 128, 145, 152],
    height: 120,
    showDots: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(AssetModule, {
    name: "Crypto",
    accent: "var(--br-crypto)",
    value: "\u20AC 2.150",
    delta: "+6.4%",
    icon: I('bitcoin'),
    selected: true
  }), /*#__PURE__*/React.createElement(AssetModule, {
    name: "ETF",
    accent: "var(--br-etf)",
    value: "\u20AC 3.400",
    delta: "+1.2%",
    icon: I('layers')
  }))));
}

/* ---------------- How it works ---------------- */
function HowItWorks() {
  const steps = [['wallet', 'Ricevi 10.000 € virtuali', 'Parti con un capitale finto da investire come vuoi. Niente carte, niente rischi.'], ['layout-grid', 'Distribuisci tra 6 asset', 'Liquidità, BTP, ETF, azioni, crypto e immobili: ognuno reagisce in modo diverso.'], ['calendar-clock', 'Avanza di un mese', 'Il mercato si muove, gli eventi cambiano i prezzi. Scopri se le tue scelte pagano.']];
  return /*#__PURE__*/React.createElement(Section, {
    eyebrow: "Come funziona",
    title: "Tre mosse e sei dentro il gioco"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20
    }
  }, steps.map(([icon, t, d], i) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    style: {
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      background: 'var(--br-gradient-soft)',
      color: 'var(--br-teal)'
    }
  }, I(icon)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 40,
      fontWeight: 700,
      color: 'rgba(255,255,255,0.07)'
    }
  }, "0", i + 1)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 8px',
      fontFamily: 'var(--font-display)',
      fontSize: 19,
      fontWeight: 600,
      color: 'var(--br-text)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--br-text-muted)'
    }
  }, d)))));
}

/* ---------------- Assets ---------------- */
function Assets() {
  const [sel, setSel] = React.useState('crypto');
  const assets = [['cash', 'Liquidità', 'var(--br-cash)', 'wallet', '€ 1.200', '+0.1%'], ['bond', 'BTP', 'var(--br-bond)', 'landmark', '€ 1.850', '+1.0%'], ['etf', 'ETF', 'var(--br-etf)', 'layers', '€ 3.400', '+1.2%'], ['stock', 'Azioni', 'var(--br-stock)', 'trending-up', '€ 1.980', '-2.8%'], ['crypto', 'Crypto', 'var(--br-crypto)', 'bitcoin', '€ 2.150', '+6.4%'], ['realestate', 'Immobili', 'var(--br-realestate)', 'building-2', '€ 1.900', '+0.6%']];
  return /*#__PURE__*/React.createElement(Section, {
    eyebrow: "Sei modi per investire",
    title: "Ogni asset ha la sua personalit\xE0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16
    }
  }, assets.map(([id, name, accent, icon, val, delta]) => /*#__PURE__*/React.createElement(AssetModule, {
    key: id,
    name: name,
    accent: accent,
    icon: I(icon),
    value: val,
    delta: delta,
    allocation: Math.round(parseInt(val.replace(/\D/g, '')) / 124),
    selected: sel === id,
    onClick: () => setSel(id)
  }))));
}

/* ---------------- Events ---------------- */
function Events() {
  return /*#__PURE__*/React.createElement(Section, {
    eyebrow: "Evento del mese",
    title: "Il mercato ti mette alla prova"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(EventPanel, {
    title: "La BCE alza i tassi di interesse",
    icon: I('newspaper'),
    body: "Prendere prestiti costa di pi\xF9: le aziende rallentano, ma le obbligazioni diventano pi\xF9 interessanti. Cosa fai col tuo portafoglio?",
    impacts: [{
      label: 'BTP',
      delta: '+3%'
    }, {
      label: 'Azioni',
      delta: '-5%',
      dir: 'down'
    }, {
      label: 'Crypto',
      delta: '-7%',
      dir: 'down'
    }]
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 12px',
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      fontWeight: 600,
      color: 'var(--br-text)'
    }
  }, "Una notizia vera, spiegata semplice"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 20px',
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--br-text-muted)'
    }
  }, "Ogni turno introduce un evento ispirato all'economia reale. Capisci perch\xE9 i prezzi si muovono, poi decidi la tua strategia per il mese successivo."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "neonOutline",
    iconLeft: I('calendar-arrow-down')
  }, "Avanza mese"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--br-text-dim)'
    }
  }, "+ guadagni XP a ogni decisione")))));
}

/* ---------------- Learn ---------------- */
function Learn() {
  const items = [['graduation-cap', 'Concetti reali', 'Rischio, rendimento, diversificazione e interesse composto — spiegati giocando.'], ['gamepad-2', 'Zero noia', 'Niente lezioni infinite: impari facendo scelte e vedendo subito le conseguenze.'], ['shield-check', 'Zero rischi', 'Tutto è virtuale. Sbagliare qui costa solo un po di XP.'], ['users', 'Sfida la classe', 'Classifiche e tornei tra compagni per imparare insieme.']];
  return /*#__PURE__*/React.createElement(Section, {
    eyebrow: "Impari giocando",
    title: "Educazione finanziaria che non sembra scuola"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16
    }
  }, items.map(([icon, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    interactive: true,
    style: {
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(37,228,212,0.1)',
      color: 'var(--br-teal)',
      marginBottom: 16
    }
  }, I(icon)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 8px',
      fontFamily: 'var(--font-display)',
      fontSize: 17,
      fontWeight: 600,
      color: 'var(--br-text)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13.5,
      lineHeight: 1.6,
      color: 'var(--br-text-muted)'
    }
  }, d)))));
}

/* ---------------- CTA + Footer ---------------- */
function CTA() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '40px 32px 88px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      maxWidth: 1000,
      margin: '0 auto',
      textAlign: 'center',
      padding: '56px 40px',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--br-line-neon)',
      background: 'linear-gradient(180deg, rgba(37,228,212,0.08), rgba(19,27,40,0.6))'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: -160,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 520,
      height: 320,
      background: 'radial-gradient(circle, rgba(182,242,60,0.18), transparent 60%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "",
    style: {
      height: 80,
      marginBottom: 18,
      filter: 'drop-shadow(0 0 24px rgba(37,228,212,0.45))',
      position: 'relative'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 12px',
      fontFamily: 'var(--font-display)',
      fontSize: 40,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: 'var(--br-text)',
      position: 'relative'
    }
  }, "Pronto a far correre il tuo toro?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 auto 28px',
      fontSize: 17,
      color: 'var(--br-text-muted)',
      maxWidth: 480,
      position: 'relative'
    }
  }, "Crea il tuo portafoglio in 30 secondi. Gratis, per sempre, per ogni studente."), /*#__PURE__*/React.createElement("a", {
    href: DASH,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: I('arrow-right')
  }, "Inizia a giocare"))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--br-line)',
      padding: '32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "",
    style: {
      height: 28
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--br-text)'
    }
  }, "BullRun"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--br-text-dim)',
      marginLeft: 10
    }
  }, "\xA9 2026 \xB7 Gioco educativo di finanza")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22
    }
  }, ['Privacy', 'Per le scuole', 'Contattaci'].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontSize: 13,
      color: 'var(--br-text-muted)',
      textDecoration: 'none'
    }
  }, l))));
}

/* ---------------- Section wrapper ---------------- */
function Section({
  eyebrow,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '56px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "br-eyebrow"
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '10px 0 0',
      fontFamily: 'var(--font-display)',
      fontSize: 36,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: 'var(--br-text)'
    }
  }, title)), children));
}

/* ---------------- Page ---------------- */
function Landing() {
  useIcons();
  return /*#__PURE__*/React.createElement("div", {
    className: "br-grid-bg",
    style: {
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(HowItWorks, null), /*#__PURE__*/React.createElement(Assets, null), /*#__PURE__*/React.createElement(Events, null), /*#__PURE__*/React.createElement(Learn, null), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Landing, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Landing.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.AssetModule = __ds_scope.AssetModule;

__ds_ns.EventPanel = __ds_scope.EventPanel;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Sparkline = __ds_scope.Sparkline;

})();
