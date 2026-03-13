// This file exports a self-dismissing toast component for quick feedback.
import React from 'react';
import { classNames } from '@mf-demo/shared';

type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

const toastClasses: Record<ToastType, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-rose-200 bg-rose-50 text-rose-900',
  info: 'border-sky-200 bg-sky-50 text-sky-900'
};

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
  React.useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      onClose?.();
    }, duration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [duration, message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className={classNames('fixed bottom-6 right-6 z-50 max-w-sm rounded-3xl border px-4 py-3 shadow-panel', toastClasses[type])}>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};
