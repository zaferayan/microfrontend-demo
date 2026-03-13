// This file renders a loading skeleton while remote apps are fetched.
import React from 'react';
import { Skeleton } from '@mf-demo/ui-kit';

export const RemoteSkeleton: React.FC = () => (
  <div className="space-y-5 rounded-[32px] bg-white/80 p-8 shadow-panel backdrop-blur">
    <Skeleton height={24} width="26%" />
    <Skeleton height={42} width="48%" />
    <Skeleton height={18} width="100%" />
    <Skeleton height={18} width="74%" />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-4 rounded-[24px] bg-slate-50 p-4">
          <Skeleton height={160} />
          <Skeleton height={20} width="70%" />
          <Skeleton height={16} width="100%" />
          <Skeleton height={16} width="85%" />
        </div>
      ))}
    </div>
  </div>
);
