/**
 * ErrorBoundary component - Catches React errors and displays fallback UI
 * Functional implementation using react-error-boundary
 */

import type { PropsWithChildren } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';
import { AlertTriangleIcon } from './icons';

/**
 * Error fallback component displayed when an error occurs
 */
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-lg shadow-xl p-8 text-center">
        <div className="text-red-500 mb-4">
          <AlertTriangleIcon className="mx-auto h-16 w-16" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          Something went wrong
        </h2>
        
        <p className="text-slate-400 mb-6">
          {error?.message || 'An unexpected error occurred'}
        </p>
        
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

/**
 * Error logging handler
 */
function logError(error: Error, info: { componentStack?: string | null }) {
  console.error('ErrorBoundary caught an error:', error, info);
}

/**
 * Functional ErrorBoundary wrapper component
 */
export function ErrorBoundary({ children }: PropsWithChildren) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={() => window.location.reload()}
    >
      {children}
    </ReactErrorBoundary>
  );
}
