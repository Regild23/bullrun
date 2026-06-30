import React from 'react';

/** Lightweight SVG sparkline / area chart for portfolio history. */
export function Sparkline({
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
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const n = data.length;
  const x = (i) => pad + (i / Math.max(1, n - 1)) * (width - pad * 2);
  const y = (v) => pad + (1 - (v - min) / range) * (height - pad * 2);
  const linePts = data.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  const areaPath = `M ${x(0)},${y(data[0])} ` + data.map((v, i) => `L ${x(i)},${y(v)}`).join(' ') + ` L ${x(n - 1)},${height - pad} L ${x(0)},${height - pad} Z`;
  const last = data[n - 1];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" preserveAspectRatio="none" style={{ display: 'block', ...style }} {...rest}>
      <defs>
        <linearGradient id={`br-spark-grad-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--br-green)" />
          <stop offset="100%" stopColor="var(--br-teal)" />
        </linearGradient>
        <linearGradient id={`br-spark-fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(37,228,212,0.28)" />
          <stop offset="100%" stopColor="rgba(37,228,212,0)" />
        </linearGradient>
      </defs>
      {fill && <path d={areaPath} fill={`url(#br-spark-fill-${id})`} />}
      <polyline
        points={linePts}
        fill="none"
        stroke={stroke === 'url(#br-spark-grad)' ? `url(#br-spark-grad-${id})` : stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 0 6px rgba(37,228,212,0.45))' }}
      />
      {showDots && n > 0 && (
        <circle cx={x(n - 1)} cy={y(last)} r={4} fill="var(--br-teal-bright)" style={{ filter: 'drop-shadow(0 0 6px rgba(37,228,212,0.8))' }} />
      )}
    </svg>
  );
}
