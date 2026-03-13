// This file provides a friendly fallback when a remote cannot be loaded.
import React from 'react';
import { Button } from '@mf-demo/ui-kit';

interface ErrorBoundaryProps {
  title: string;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.error(`${this.props.title} failed to load`, error);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="rounded-[32px] border border-amber-200 bg-amber-50 p-8 shadow-panel">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-700">Remote unavailable</p>
          <h2 className="mt-3 text-2xl font-semibold text-amber-950">{this.props.title} could not be loaded</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-amber-900">The shell is still running, but this remote entry is currently unreachable. Start the missing micro app and refresh the page.</p>
          <Button className="mt-6" onClick={() => window.location.reload()} variant="secondary">
            Reload shell
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
