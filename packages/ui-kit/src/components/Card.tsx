// This file exports a reusable card layout for product-style content.
import React from 'react';
import { classNames } from '@mf-demo/shared';

export interface CardProps {
  image: string;
  title: string;
  description: string;
  footer?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ image, title, description, footer, className }) => (
  <article className={classNames('overflow-hidden rounded-[28px] bg-white shadow-panel ring-1 ring-slate-200', className)}>
    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-50 p-6">
      <img className="h-full w-full object-contain" src={image} alt={title} loading="lazy" />
    </div>
    <div className="space-y-3 p-5">
      <h3 className="text-xl font-semibold text-ink-900">{title}</h3>
      <p className="text-sm leading-6 text-ink-700">{description}</p>
      {footer ? <div className="pt-2">{footer}</div> : null}
    </div>
  </article>
);
