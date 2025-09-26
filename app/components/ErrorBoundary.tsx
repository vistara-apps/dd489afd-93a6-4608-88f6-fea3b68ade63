'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="glass-card p-8 max-w-md w-full text-center space-y-4">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-red-400" />
            </div>

            <h2 className="text-xl font-bold text-foreground mb-2">
              Oops! Something went wrong
            </h2>

            <p className="text-muted-foreground text-sm mb-6">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>

            <button
              onClick={this.handleRetry}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-sm text-muted-foreground cursor-pointer">
                  Error Details (Development)
                </summary>
                <pre className="text-xs text-red-400 mt-2 p-2 bg-red-50 dark:bg-red-950 rounded overflow-auto">
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

