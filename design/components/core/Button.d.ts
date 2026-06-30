import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. primary = neon gradient hero CTA. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'neonOutline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to full container width. */
  block?: boolean;
  disabled?: boolean;
  /** Icon node rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * BullRun button. Primary uses the signature lime→cyan gradient with a
 * soft neon glow that intensifies on hover.
 *
 * @startingPoint section="Core" subtitle="Neon gradient CTA + variants" viewport="700x140"
 */
export function Button(props: ButtonProps): JSX.Element;
