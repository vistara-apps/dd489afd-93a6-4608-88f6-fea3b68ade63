'use client';

import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex items-center justify-center">
          <div className="glass-card p-4 rounded-full">
            <AlertTriangle className="w-12 h-12 text-accent" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gradient">Oops! Something went wrong</h2>
          <p className="text-text-muted">
            Don't worry, even the best storytellers sometimes need a moment to gather their thoughts.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="text-left">
            <summary className="text-sm text-text-muted cursor-pointer">Error Details</summary>
            <pre className="text-xs text-red-400 mt-2 p-2 bg-red-900 bg-opacity-20 rounded">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
