import React from 'react';

export interface EventImpact {
  label: string;
  delta: string;
  dir?: 'up' | 'down';
}

export interface EventPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Eyebrow label; defaults to "Evento del mese". */
  kicker?: string;
  title: string;
  body?: string;
  icon?: React.ReactNode;
  /** Per-asset impact chips. */
  impacts?: EventImpact[];
}

/**
 * Monthly market-event panel that explains the news moving prices.
 * @startingPoint section="Game" subtitle="Monthly market event card" viewport="700x260"
 */
export function EventPanel(props: EventPanelProps): JSX.Element;
