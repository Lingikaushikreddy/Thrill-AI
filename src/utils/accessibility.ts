/**
 * Accessibility Utility Functions
 * Helper functions for improving accessibility across the application
 */

/**
 * Announces a message to screen readers
 * @param message - The message to announce
 * @param priority - 'polite' for non-critical, 'assertive' for critical
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
}

/**
 * Creates a focus trap within a container element
 * @param container - The container element to trap focus within
 * @param onEscape - Optional callback for escape key
 */
export function createFocusTrap(
  container: HTMLElement,
  onEscape?: () => void
): () => void {
  const focusableSelectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  const focusableElements = Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelectors)
  );

  if (focusableElements.length === 0) {
    return () => {}; // No cleanup needed
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  // Focus first element
  firstElement?.focus();

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab (backwards)
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab (forwards)
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && onEscape) {
      onEscape();
    }
  };

  document.addEventListener('keydown', handleTabKey);
  document.addEventListener('keydown', handleEscape);

  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleTabKey);
    document.removeEventListener('keydown', handleEscape);
  };
}

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Gets the next focusable element in the DOM
 */
export function getNextFocusableElement(
  currentElement: HTMLElement,
  reverse: boolean = false
): HTMLElement | null {
  const focusableSelectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  const allFocusable = Array.from(
    document.querySelectorAll<HTMLElement>(focusableSelectors)
  );

  const currentIndex = allFocusable.indexOf(currentElement);

  if (reverse) {
    return currentIndex > 0 ? allFocusable[currentIndex - 1] : null;
  } else {
    return currentIndex < allFocusable.length - 1
      ? allFocusable[currentIndex + 1]
      : null;
  }
}

/**
 * Scrolls element into view with smooth behavior (respects reduced motion)
 */
export function scrollIntoViewSmoothly(element: HTMLElement): void {
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
  element.scrollIntoView({ behavior, block: 'start' });
}

/**
 * Validates ARIA attributes on an element
 */
export function validateARIA(element: HTMLElement): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check if button has label
  const role = element.getAttribute('role');
  const isButton = element.tagName === 'BUTTON' || role === 'button';
  const hasLabel =
    element.getAttribute('aria-label') ||
    element.getAttribute('aria-labelledby') ||
    element.textContent?.trim();

  if (isButton && !hasLabel) {
    errors.push('Button missing accessible label');
  }

  // Check if modal has required attributes
  if (role === 'dialog' || element.getAttribute('aria-modal') === 'true') {
    if (!element.getAttribute('aria-labelledby') && !element.getAttribute('aria-label')) {
      errors.push('Modal missing aria-labelledby or aria-label');
    }
  }

  // Check if form input has label
  if (
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName) &&
    element.getAttribute('type') !== 'hidden'
  ) {
    const id = element.getAttribute('id');
    const hasLabelElement = id
      ? document.querySelector(`label[for="${id}"]`)
      : null;
    const hasAriaLabel =
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby');

    if (!hasLabelElement && !hasAriaLabel) {
      errors.push('Form input missing associated label');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Gets contrast ratio between two colors
 * Returns ratio (4.5+ is good for normal text, 3+ for large text)
 */
export function getContrastRatio(
  color1: string,
  color2: string
): number {
  // Simple implementation - for production, use a library like 'polished'
  // This is a placeholder that should be replaced with proper color parsing
  // For now, returns a mock value - implement proper color contrast calculation
  console.warn('getContrastRatio: Implement proper color contrast calculation');
  return 4.5; // Placeholder
}

/**
 * Checks if color meets WCAG contrast requirements
 */
export function meetsContrastRequirements(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  
  if (isLargeText) {
    return level === 'AA' ? ratio >= 3 : ratio >= 4.5;
  } else {
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  }
}

/**
 * Prevents body scroll when modal is open
 */
export function preventBodyScroll(prevent: boolean): void {
  if (typeof document === 'undefined') return;
  
  if (prevent) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

/**
 * Generates a unique ID for ARIA relationships
 */
export function generateAriaId(prefix: string = 'aria'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Checks if element is visible to screen readers
 */
export function isVisibleToScreenReader(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  const ariaHidden = element.getAttribute('aria-hidden');
  
  return (
    ariaHidden !== 'true' &&
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    !element.hasAttribute('hidden')
  );
}

