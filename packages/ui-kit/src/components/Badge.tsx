// This file exports a compact badge component for counters and status.
import React from 'react';
import { classNames } from '@mf-demo/shared';

type BadgeColor = 'brand' | 'slate' | 'danger';

export interface BadgeProps {
  count: number;
  color?: BadgeColor;
}

const colorClasses: Record<BadgeColor, string> = {
  brand: 'bg-brand-500 text-white',
  slate: 'bg-slate-800 text-white',
  danger: 'bg-rose-600 text-white'
};

export const Badge: React.FC<BadgeProps> = ({ count, color = 'brand' }) => (
  <span className={classNames('inline-flex min-w-6 items-center justify-center rounded-full px-2 py-1 text-xs font-bold', colorClasses[color])}>
    {count}
  </span>
);
