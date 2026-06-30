import React from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fill percentage 0–100. */
  value?: number;
  label?: string | null;
  /** Right-aligned value text, e.g. "740 / 1000 XP". */
  valueText?: string | null;
  height?: number;
  glow?: boolean;
}

/** Gradient XP / progress bar. */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
