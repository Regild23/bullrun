import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  /** Style for the outer wrapper. */
  wrapStyle?: React.CSSProperties;
}

/** Text input with neon teal focus ring and optional leading icon. */
export function Input(props: InputProps): JSX.Element;
