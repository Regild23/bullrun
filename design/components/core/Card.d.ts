import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Neon glow ring color. */
  glow?: 'green' | 'teal' | 'purple' | null;
  /** Border accent color (e.g. an asset-class token). */
  accent?: string | null;
  /** Use the elevated surface shade. */
  raised?: boolean;
  padding?: string;
  /** Lift + neon border on hover. */
  interactive?: boolean;
  children?: React.ReactNode;
}

/**
 * Rounded dark surface card. Optional neon glow / accent border.
 * @startingPoint section="Core" subtitle="Dark surface card with optional glow" viewport="700x200"
 */
export function Card(props: CardProps): JSX.Element;
