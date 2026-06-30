import React from 'react';

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of strings or {value,label,icon}. */
  tabs: (string | TabItem)[];
  value?: string;
  onChange?: (value: string) => void;
}

/** Pill-style segmented tabs; active tab uses the gradient fill. */
export function Tabs(props: TabsProps): JSX.Element;
