/**
 * ErrorMessage component - Displays error messages with retry option
 */

import { AlertCircleIcon } from './icons';

interface ErrorMessageProps {
  error: Error;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-md mx-auto bg-red-900 bg-opacity-20 border border-red-500 rounded-lg p-6 text-center">
        <div className="text-red-500 mb-4">
          <AlertCircleIcon className="mx-auto h-12 w-12" />
        </div>
        
        <h3 className="text-lg font-semibold text-red-400 mb-2">
          Error Loading Media
        </h3>
        
        <p className="text-red-300 text-sm mb-4">
          {error.message}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
