import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  /** Fallback initials when no src. */
  initials?: string;
  size?: number;
  /** Gradient glow ring. */
  ring?: boolean;
  /** Level number badge (bottom-right). */
  level?: number | null;
}

/** Player avatar with gradient level ring and level badge. */
export function Avatar(props: AvatarProps): JSX.Element;
