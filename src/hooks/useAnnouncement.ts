import { useCallback } from 'react';
import { announceToScreenReader } from '@/utils/accessibility';

/**
 * Hook to announce messages to screen readers
 * 
 * @returns Function to announce messages
 * 
 * @example
 * ```tsx
 * const announce = useAnnouncement();
 * 
 * const handleError = () => {
 *   announce('Error occurred. Please try again.', 'assertive');
 * };
 * ```
 */
export function useAnnouncement() {
  return useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      announceToScreenReader(message, priority);
    },
    []
  );
}

