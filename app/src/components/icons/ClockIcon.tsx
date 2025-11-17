/**
 * ClockIcon component - Duration/time indicator
 */

import type { IconProps } from './types';

export function ClockIcon({
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
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
