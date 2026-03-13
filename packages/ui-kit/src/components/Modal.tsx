// This file exports a modal wrapper for focused confirmation flows.
import React from 'react';
import { Button } from './Button';

export interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
    <div className="w-full max-w-lg rounded-[32px] bg-white p-6 shadow-panel">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-ink-900">{title}</h3>
        </div>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
      <div>{children}</div>
    </div>
  </div>
);
