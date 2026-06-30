import React from 'react';

export interface AssetModuleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Asset class name, e.g. "Crypto". */
  name: string;
  icon?: React.ReactNode;
  /** Current holding value, e.g. "€ 2.150". */
  value?: React.ReactNode;
  /** Period delta, e.g. "+6.4%". */
  delta?: string | null;
  /** Accent neon color (use --br-cash/bond/etf/stock/crypto/realestate). */
  accent?: string;
  /** Lit-up selected state. */
  selected?: boolean;
  /** Portfolio share 0–100 for the mini allocation bar. */
  allocation?: number | null;
  onClick?: () => void;
}

/**
 * Selectable asset-class tile for the dashboard. Lights up with its
 * accent neon when selected.
 * @startingPoint section="Game" subtitle="Glowing asset-class game tile" viewport="320x220"
 */
export function AssetModule(props: AssetModuleProps): JSX.Element;
