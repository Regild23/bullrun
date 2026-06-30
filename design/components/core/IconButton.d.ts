import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'surface' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  /** Accessible label (also used as tooltip). */
  label?: string;
  /** Icon node. */
  children?: React.ReactNode;
}

/** Square icon-only button matching Button's variants. */
export function IconButton(props: IconButtonProps): JSX.Element;
