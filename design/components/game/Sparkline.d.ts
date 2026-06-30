import React from 'react';

export interface SparklineProps extends React.SVGAttributes<SVGSVGElement> {
  /** Series of numbers (portfolio value over time). */
  data: number[];
  width?: number;
  height?: number;
  /** Stroke color/url; defaults to the lime→cyan gradient. */
  stroke?: string;
  /** Show gradient area fill under the line. */
  fill?: boolean;
  /** Show a glowing dot on the latest point. */
  showDots?: boolean;
  strokeWidth?: number;
}

/** Glowing gradient sparkline / area chart for portfolio history. */
export function Sparkline(props: SparklineProps): JSX.Element;
