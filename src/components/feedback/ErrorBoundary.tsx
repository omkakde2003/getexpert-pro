import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon } from 'lucide-react';
import Button from '../ui/Button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-zinc-900/40 rounded-xl border border-slate-200 dark:border-zinc-800/80 text-center">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-md mb-6">
            An unexpected client-side error occurred: {this.state.error?.message || 'Unknown Error'}
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" onClick={this.handleReset}>
              Reload Application
            </Button>
            <Button variant="primary" size="sm" onClick={() => (window.location.href = '/')}>
              Go back home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
