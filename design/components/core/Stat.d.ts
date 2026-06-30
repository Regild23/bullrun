import React from 'react';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  value: React.ReactNode;
  /** Delta string, e.g. "+4.2%" or "-1.1%". */
  delta?: string | null;
  /** Force arrow direction; otherwise inferred from delta sign. */
  direction?: 'up' | 'down' | null;
  size?: 'sm' | 'md' | 'xl';
  /** Neon text glow on the value (use for the hero portfolio number). */
  glowValue?: boolean;
}

/**
 * Financial metric: mono tabular value with up/down delta.
 * @startingPoint section="Game" subtitle="Portfolio / metric readout" viewport="700x160"
 */
export function Stat(props: StatProps): JSX.Element;
