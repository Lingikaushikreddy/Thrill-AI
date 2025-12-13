# Accessibility Improvement Plan
## Thrill AI Web Application

**Version:** 1.0  
**Date:** 2024  
**Status:** Implementation Ready  
**Target Compliance:** WCAG 2.1 Level AA

---

## 📋 Executive Summary

This document outlines a comprehensive plan to improve the accessibility of the Thrill AI web application. The plan addresses critical accessibility issues identified in the codebase, with a focus on WCAG 2.1 Level AA compliance.

**Current State:** 5/10 Accessibility Score  
**Target State:** 9/10 Accessibility Score  
**Estimated Implementation Time:** 2-3 weeks

---

## 🎯 Goals & Objectives

1. **WCAG 2.1 Level AA Compliance** - Meet international accessibility standards
2. **Keyboard Navigation** - Full functionality via keyboard only
3. **Screen Reader Support** - Proper ARIA labels and semantic HTML
4. **Visual Accessibility** - Color contrast, focus indicators, and visual hierarchy
5. **Form Accessibility** - Proper labels, error handling, and validation feedback
6. **Modal & Dialog Accessibility** - Focus management and escape handling

---

## 🔍 Current State Assessment

### Critical Issues Found

| Issue | Severity | Impact | Components Affected |
|-------|----------|--------|-------------------|
| Missing ARIA labels | High | Screen readers can't identify interactive elements | All buttons, links |
| No keyboard navigation | High | Keyboard users can't access features | Navigation, modals, buttons |
| Missing focus indicators | High | Users can't track keyboard focus | All interactive elements |
| Color contrast issues | Medium | Low vision users can't read text | Text with low opacity |
| Missing form labels | High | Screen readers can't identify inputs | GetStartedModal |
| No skip links | Medium | Keyboard users must tab through nav | Landing page |
| Missing alt text | Medium | Screen readers can't describe images | Some images |
| Modal focus trap | High | Keyboard users can escape modal | GetStartedModal |
| No error announcements | Medium | Screen readers don't announce errors | Forms |

---

## 📅 Implementation Phases

### Phase 1: Critical Fixes (Week 1) - Priority: HIGH
**Goal:** Fix blocking accessibility issues

### Phase 2: Enhanced Experience (Week 2) - Priority: MEDIUM
**Goal:** Improve usability for assistive technologies

### Phase 3: Polish & Testing (Week 3) - Priority: LOW
**Goal:** Final testing and optimization

---

## 🚀 Phase 1: Critical Fixes

### 1.1 Add ARIA Labels to Interactive Elements

#### Buttons
**Current Issue:** Buttons lack descriptive labels for screen readers

**Files to Update:**
- `src/components/LandingPage.tsx`
- `src/components/GetStartedModal.tsx`
- `src/components/DashboardLayout.tsx`
- `src/components/VoiceReceptionist.tsx`
- `src/components/TeluguVoiceAgent.tsx`
- `src/components/HindiVoiceAgent.tsx`

**Example Fix:**

```tsx
// ❌ Before
<button
  onClick={() => setIsModalOpen(true)}
  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black"
>
  Start Free Trial
  <ArrowRight className="w-4 h-4" />
</button>

// ✅ After
<button
  onClick={() => setIsModalOpen(true)}
  aria-label="Start free trial - Opens signup modal"
  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-brand-sky focus:ring-offset-2 focus:ring-offset-black"
>
  <span>Start Free Trial</span>
  <ArrowRight className="w-4 h-4" aria-hidden="true" />
</button>
```

**Implementation Checklist:**
- [ ] Add `aria-label` to all icon-only buttons
- [ ] Add `aria-hidden="true"` to decorative icons
- [ ] Wrap button text in `<span>` for better screen reader support
- [ ] Add descriptive labels for context (e.g., "Open pricing modal")

---

### 1.2 Implement Keyboard Navigation

#### Focus Management
**Current Issue:** No visible focus indicators, keyboard navigation broken

**Files to Update:**
- `src/app/globals.css` - Add focus styles
- All component files with interactive elements

**Example Fix:**

```css
/* Add to globals.css */

/* Focus Styles */
*:focus-visible {
  outline: 2px solid var(--color-brand-sky);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Remove default focus for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}

/* Button Focus States */
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--color-brand-sky);
  outline-offset: 2px;
}

/* Custom focus for shiny-cta */
.shiny-cta:focus-visible {
  outline: 2px solid var(--color-brand-sky);
  outline-offset: 4px;
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.2);
}
```

**Component Updates:**

```tsx
// Update LandingPage.tsx navigation links
<Link 
  href="#features" 
  className="text-xs font-medium text-white/50 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-sky focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
>
  Features
</Link>
```

**Implementation Checklist:**
- [ ] Add focus-visible styles to globals.css
- [ ] Update all buttons with focus states
- [ ] Update all links with focus states
- [ ] Test keyboard navigation flow
- [ ] Ensure tab order is logical

---

### 1.3 Fix Modal Accessibility

**Current Issue:** Modal lacks focus trap, escape handling, and ARIA attributes

**File to Update:** `src/components/GetStartedModal.tsx`

**Complete Fix:**

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { AnimatedLogo } from './AnimatedLogo';

export function GetStartedModal({ 
  isOpen, 
  onClose, 
  plan = 'starter' 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  plan?: string 
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  
  // Focus trap refs
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement>(null);
  const lastFocusableRef = useRef<HTMLElement>(null);

  // Focus trap implementation
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    // Get all focusable elements
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstFocusableRef.current = firstElement;
    lastFocusableRef.current = lastElement;

    // Focus first element
    firstElement?.focus();

    // Handle tab key
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, plan })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({ name: '', email: '', company: '' });
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        // Announce error to screen readers
        const errorMessage = data.error || "Something went wrong. Please try again.";
        const errorElement = document.createElement('div');
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'assertive');
        errorElement.className = 'sr-only';
        errorElement.textContent = errorMessage;
        document.body.appendChild(errorElement);
        setTimeout(() => document.body.removeChild(errorElement), 1000);
      }
    } catch (error) {
      console.error(error);
      const errorElement = document.createElement('div');
      errorElement.setAttribute('role', 'alert');
      errorElement.setAttribute('aria-live', 'assertive');
      errorElement.className = 'sr-only';
      errorElement.textContent = "Error submitting form. Please try again.";
      document.body.appendChild(errorElement);
      setTimeout(() => document.body.removeChild(errorElement), 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-[#0F110E] w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-white/10 ring-1 ring-white/5"
          >
            {/* Background Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-20" aria-hidden="true" />

            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 
                  id="modal-title"
                  className="text-2xl font-serif font-medium text-white tracking-tight"
                >
                  {success ? 'All set!' : 'Start your journey'}
                </h3>
                <button 
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky focus:ring-offset-2 focus:ring-offset-[#0F110E]"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <p id="modal-description" className="sr-only">
                {success 
                  ? 'Your signup was successful. You will be redirected shortly.'
                  : 'Fill out the form below to start your free trial.'
                }
              </p>

              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-brand-sky/10 rounded-full flex items-center justify-center mb-6 border border-brand-sky/20" aria-hidden="true">
                    <CheckCircle2 className="w-8 h-8 text-brand-sky" />
                  </div>
                  <p className="text-white/70 font-light text-lg">Thanks for signing up! We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label 
                      htmlFor="name-input"
                      className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="name-input"
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      aria-required="true"
                      aria-invalid={formData.name === '' ? 'false' : undefined}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-sky/50 focus:ring-2 focus:ring-brand-sky/50 transition-all font-light"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="email-input"
                      className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-2"
                    >
                      Work Email
                    </label>
                    <input
                      id="email-input"
                      required
                      type="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      aria-required="true"
                      aria-invalid={formData.email === '' ? 'false' : undefined}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-sky/50 focus:ring-2 focus:ring-brand-sky/50 transition-all font-light"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="company-input"
                      className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-2"
                    >
                      Company Name
                      <span className="text-white/20 ml-1" aria-label="optional">(optional)</span>
                    </label>
                    <input
                      id="company-input"
                      type="text"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-sky/50 focus:ring-2 focus:ring-brand-sky/50 transition-all font-light"
                    />
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    aria-busy={loading}
                    className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-brand-sky transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 focus:outline-none focus:ring-2 focus:ring-brand-sky focus:ring-offset-2 focus:ring-offset-[#0F110E]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      'Start Free Trial'
                    )}
                  </button>

                  <p className="text-[10px] text-center text-white/30 mt-4 leading-relaxed">
                    By signing up, you agree to our Terms and Privacy Policy.
                    <br />Your data is processed securely.
                  </p>
                </form>
              )}
            </div>

            {/* Bottom Gradient Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-sky to-transparent opacity-50" aria-hidden="true" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
```

**Implementation Checklist:**
- [ ] Add `role="dialog"` and `aria-modal="true"`
- [ ] Add `aria-labelledby` and `aria-describedby`
- [ ] Implement focus trap
- [ ] Add escape key handler
- [ ] Prevent body scroll
- [ ] Add proper form labels with `htmlFor`
- [ ] Add `aria-required` and `aria-invalid` to inputs
- [ ] Add error announcements with `role="alert"`

---

### 1.4 Add Skip Links

**File to Update:** `src/app/layout.tsx`

**Fix:**

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${newsreader.variable} antialiased bg-[#030303] text-white selection:bg-[#38BDF8] selection:text-black`}
      >
        {/* Skip Links */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-sky focus:text-black focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <a
          href="#navigation"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-sky focus:text-black focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to navigation
        </a>
        {children}
      </body>
    </html>
  );
}
```

**Add to globals.css:**

```css
/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus,
.sr-only:active {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

**Update LandingPage.tsx:**

```tsx
<nav 
  id="navigation"
  className="fixed -translate-x-1/2 flex shadow-black/50..."
  aria-label="Main navigation"
>
  {/* ... */}
</nav>

<main 
  id="main-content"
  className="container lg:px-12 lg:pt-0..."
  role="main"
>
  {/* ... */}
</main>
```

**Implementation Checklist:**
- [ ] Add skip links to root layout
- [ ] Add sr-only utility classes
- [ ] Add IDs to main navigation and content areas
- [ ] Test skip links with keyboard

---

### 1.5 Fix Form Labels

**File to Update:** `src/components/GetStartedModal.tsx` (see 1.3 for complete example)

**Key Points:**
- All inputs must have associated `<label>` with `htmlFor`
- Labels should be visible, not hidden
- Use `aria-required` for required fields
- Use `aria-invalid` for validation errors
- Provide error messages with `role="alert"`

---

## 🎨 Phase 2: Enhanced Experience

### 2.1 Improve Color Contrast

**Files to Update:** `src/app/globals.css`

**Current Issues:**
- Text with `text-white/40` and `text-white/50` may not meet contrast requirements
- Background colors with low opacity

**Fix:**

```css
/* Update color variables for better contrast */
:root {
  --color-text-primary: #ffffff;        /* WCAG AAA on #030303 */
  --color-text-secondary: #e5e7eb;     /* WCAG AA on #030303 */
  --color-text-tertiary: #d1d5db;      /* WCAG AA on #030303 */
  --color-text-muted: #9ca3af;          /* WCAG AA on #030303 */
  
  /* Minimum contrast ratios */
  /* Large text (18pt+): 3:1 */
  /* Normal text: 4.5:1 */
}

/* Update utility classes */
.text-white\/40 {
  color: var(--color-text-muted); /* Better contrast */
}

.text-white\/50 {
  color: var(--color-text-tertiary); /* Better contrast */
}

.text-white\/70 {
  color: var(--color-text-secondary); /* Better contrast */
}
```

**Implementation Checklist:**
- [ ] Audit all text colors for contrast
- [ ] Update low-contrast text colors
- [ ] Test with contrast checker tools
- [ ] Ensure 4.5:1 ratio for normal text
- [ ] Ensure 3:1 ratio for large text

---

### 2.2 Add ARIA Live Regions

**Files to Update:** All components with dynamic content

**Example:**

```tsx
// Add to LandingPage.tsx for status updates
<div 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
  className="sr-only"
  id="status-announcements"
>
  {/* Status messages will be announced here */}
</div>

// Usage
const announceStatus = (message: string) => {
  const statusEl = document.getElementById('status-announcements');
  if (statusEl) {
    statusEl.textContent = message;
    setTimeout(() => {
      statusEl.textContent = '';
    }, 1000);
  }
};
```

**Implementation Checklist:**
- [ ] Add aria-live regions for dynamic content
- [ ] Use `aria-live="polite"` for non-critical updates
- [ ] Use `aria-live="assertive"` for critical updates
- [ ] Add `aria-atomic="true"` where appropriate

---

### 2.3 Improve Semantic HTML

**Files to Update:** All component files

**Examples:**

```tsx
// ❌ Before
<div className="text-2xl font-bold">Features</div>

// ✅ After
<h2 className="text-2xl font-bold">Features</h2>

// ❌ Before
<div onClick={handleClick}>Click me</div>

// ✅ After
<button onClick={handleClick} type="button">Click me</button>

// ❌ Before
<div role="button" tabIndex={0}>Action</div>

// ✅ After
<button type="button">Action</button>
```

**Implementation Checklist:**
- [ ] Replace divs with semantic HTML (header, nav, main, section, article, footer)
- [ ] Use proper heading hierarchy (h1 → h2 → h3)
- [ ] Use buttons for actions, not divs
- [ ] Use lists for lists (ul, ol)
- [ ] Add landmarks (main, nav, aside, etc.)

---

### 2.4 Add Loading States with ARIA

**Files to Update:** Components with async operations

**Example:**

```tsx
<button
  disabled={loading}
  aria-busy={loading}
  aria-live="polite"
>
  {loading ? (
    <>
      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
      <span>Processing...</span>
    </>
  ) : (
    'Submit'
  )}
</button>
```

---

### 2.5 Improve Image Accessibility

**Files to Update:** All components with images

**Example:**

```tsx
// ❌ Before
<Image src="/logo.png" alt="Logo" />

// ✅ After
<Image 
  src="/logo.png" 
  alt="Thrill AI company logo" 
  width={40}
  height={40}
/>

// For decorative images
<Image 
  src="/decoration.svg" 
  alt="" 
  aria-hidden="true"
  width={100}
  height={100}
/>
```

**Implementation Checklist:**
- [ ] Add descriptive alt text to all images
- [ ] Use empty alt="" for decorative images
- [ ] Add aria-hidden="true" to decorative images
- [ ] Ensure images have proper dimensions

---

## ✨ Phase 3: Polish & Testing

### 3.1 Add Accessibility Testing

**Create:** `src/utils/accessibility-test.ts`

```typescript
// Utility functions for accessibility testing

export const checkColorContrast = (foreground: string, background: string): boolean => {
  // Implement contrast checking logic
  // Use library like 'color-contrast-checker'
  return true;
};

export const validateARIA = (element: HTMLElement): string[] => {
  const errors: string[] = [];
  
  // Check for required ARIA attributes
  if (element.getAttribute('role') === 'button' && !element.getAttribute('aria-label')) {
    errors.push('Button with role="button" missing aria-label');
  }
  
  return errors;
};
```

---

### 3.2 Add Keyboard Shortcuts

**File to Update:** `src/components/LandingPage.tsx`

```tsx
useEffect(() => {
  const handleKeyboardShortcuts = (e: KeyboardEvent) => {
    // Alt + M: Open modal
    if (e.altKey && e.key === 'm') {
      e.preventDefault();
      setIsModalOpen(true);
    }
    
    // Alt + F: Focus features section
    if (e.altKey && e.key === 'f') {
      e.preventDefault();
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  document.addEventListener('keydown', handleKeyboardShortcuts);
  return () => document.removeEventListener('keydown', handleKeyboardShortcuts);
}, []);
```

---

### 3.3 Add Reduced Motion Support

**File to Update:** `src/app/globals.css`

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Update FadeIn component:**

```tsx
export function FadeIn({
  children,
  delay = 0,
  className
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={prefersReducedMotion ? {} : { duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## 🧪 Testing Strategy

### Automated Testing

1. **Install Testing Tools:**
```bash
npm install --save-dev @axe-core/react @testing-library/react @testing-library/jest-dom jest-axe
```

2. **Create Test File:** `src/__tests__/accessibility.test.tsx`

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { LandingPage } from '@/components/LandingPage';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('LandingPage should have no accessibility violations', async () => {
    const { container } = render(<LandingPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Testing Checklist

- [ ] **Keyboard Navigation**
  - [ ] Tab through all interactive elements
  - [ ] Shift+Tab works in reverse
  - [ ] Enter/Space activates buttons
  - [ ] Escape closes modals
  - [ ] Arrow keys work in menus

- [ ] **Screen Reader Testing**
  - [ ] Test with NVDA (Windows)
  - [ ] Test with JAWS (Windows)
  - [ ] Test with VoiceOver (Mac)
  - [ ] All interactive elements are announced
  - [ ] Form labels are read correctly
  - [ ] Error messages are announced

- [ ] **Visual Testing**
  - [ ] Focus indicators are visible
  - [ ] Color contrast meets standards
  - [ ] Text is readable at 200% zoom
  - [ ] Layout works at 320px width

- [ ] **Browser Testing**
  - [ ] Chrome/Edge
  - [ ] Firefox
  - [ ] Safari
  - [ ] Mobile browsers

---

## 📊 Success Metrics

### Quantitative Goals

- **WCAG 2.1 Level AA Compliance:** 100%
- **Lighthouse Accessibility Score:** 95+
- **axe DevTools Violations:** 0
- **Keyboard Navigation Coverage:** 100%
- **Screen Reader Compatibility:** 100%

### Qualitative Goals

- All interactive elements accessible via keyboard
- All content readable by screen readers
- Clear focus indicators throughout
- Intuitive navigation structure
- Helpful error messages

---

## 🛠️ Tools & Resources

### Development Tools

1. **axe DevTools** - Browser extension for accessibility testing
2. **WAVE** - Web accessibility evaluation tool
3. **Lighthouse** - Built into Chrome DevTools
4. **Color Contrast Checker** - WebAIM Contrast Checker
5. **Screen Readers:**
   - NVDA (Windows, free)
   - JAWS (Windows, paid)
   - VoiceOver (Mac, built-in)
   - TalkBack (Android, built-in)

### Documentation

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Resources](https://webaim.org/resources/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Libraries

- `@axe-core/react` - React accessibility testing
- `react-aria` - Accessible component primitives
- `focus-trap-react` - Focus trap for modals
- `react-focus-lock` - Focus management

---

## 📝 Implementation Checklist

### Week 1: Critical Fixes
- [ ] Day 1-2: ARIA labels and semantic HTML
- [ ] Day 3: Keyboard navigation and focus management
- [ ] Day 4: Modal accessibility
- [ ] Day 5: Form labels and validation

### Week 2: Enhanced Experience
- [ ] Day 1-2: Color contrast improvements
- [ ] Day 3: ARIA live regions
- [ ] Day 4: Image accessibility
- [ ] Day 5: Loading states and error handling

### Week 3: Polish & Testing
- [ ] Day 1-2: Reduced motion support
- [ ] Day 3: Automated testing setup
- [ ] Day 4: Manual testing and fixes
- [ ] Day 5: Documentation and review

---

## 🎯 Quick Wins (Do First)

These can be implemented immediately for maximum impact:

1. ✅ Add `aria-label` to all buttons (30 min)
2. ✅ Add focus styles to globals.css (15 min)
3. ✅ Add skip links (20 min)
4. ✅ Fix form labels in GetStartedModal (30 min)
5. ✅ Add `aria-hidden` to decorative icons (15 min)

**Total Time:** ~2 hours for significant improvement

---

## 📞 Support & Questions

For questions or clarifications during implementation:
- Review WCAG 2.1 guidelines
- Test with actual screen readers
- Use browser DevTools accessibility features
- Consult ARIA authoring practices guide

---

## ✅ Sign-off

**Plan Status:** ✅ Ready for Implementation  
**Next Steps:** Begin Phase 1, Week 1  
**Review Date:** After Phase 1 completion

---

*This plan is a living document and should be updated as implementation progresses.*

