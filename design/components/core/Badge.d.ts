import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'green' | 'teal' | 'purple' | 'up' | 'down' | 'warn';
  /** Soft tinted fill (default) vs outline only. */
  soft?: boolean;
  /** Leading glowing status dot. */
  dot?: boolean;
  children?: React.ReactNode;
}

/** Uppercase mono pill for statuses, levels, deltas. */
export function Badge(props: BadgeProps): JSX.Element;
