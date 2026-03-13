// This file exports a lightweight skeleton placeholder for loading states.
import React from 'react';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = 16, className = '' }) => (
  <div
    className={`animate-pulse rounded-2xl bg-slate-200/80 ${className}`}
    style={{ width, height }}
    aria-hidden="true"
  />
);
