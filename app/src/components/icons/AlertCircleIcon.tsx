/**
 * AlertCircleIcon component - Alert/error circle indicator
 */

import type { IconProps } from './types';

export function AlertCircleIcon({ 
  className = "h-4 w-4", 
  strokeWidth = 2 
}: IconProps) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
