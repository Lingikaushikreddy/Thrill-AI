# Accessibility Quick Reference Guide
## Common Patterns & Code Snippets

---

## 🎯 Button Accessibility

### Standard Button
```tsx
<button
  type="button"
  onClick={handleClick}
  aria-label="Descriptive action name"
  className="focus:outline-none focus:ring-2 focus:ring-brand-sky focus:ring-offset-2"
>
  Button Text
</button>
```

### Icon Button
```tsx
<button
  type="button"
  onClick={handleClick}
  aria-label="Close modal"
  className="focus:outline-none focus:ring-2 focus:ring-brand-sky"
>
  <X className="w-5 h-5" aria-hidden="true" />
</button>
```

### Button with Loading State
```tsx
<button
  type="submit"
  disabled={loading}
  aria-busy={loading}
  aria-label={loading ? "Processing request" : "Submit form"}
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

## 🔗 Link Accessibility

### Standard Link
```tsx
<Link
  href="#features"
  className="focus:outline-none focus:ring-2 focus:ring-brand-sky focus:ring-offset-2 rounded px-2 py-1"
>
  Features
</Link>
```

### External Link
```tsx
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit example.com (opens in new tab)"
  className="focus:outline-none focus:ring-2 focus:ring-brand-sky"
>
  External Link
  <ArrowUpRight className="w-4 h-4 inline ml-1" aria-hidden="true" />
</a>
```

---

## 📝 Form Accessibility

### Text Input
```tsx
<div>
  <label htmlFor="email-input" className="block mb-2">
    Email Address
    <span className="text-red-400" aria-label="required">*</span>
  </label>
  <input
    id="email-input"
    type="email"
    required
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
    className="focus:outline-none focus:ring-2 focus:ring-brand-sky"
  />
  {hasError && (
    <div id="email-error" role="alert" className="text-red-400 text-sm mt-1">
      Please enter a valid email address
    </div>
  )}
</div>
```

### Checkbox
```tsx
<div>
  <input
    id="terms-checkbox"
    type="checkbox"
    checked={accepted}
    onChange={handleChange}
    className="focus:outline-none focus:ring-2 focus:ring-brand-sky"
  />
  <label htmlFor="terms-checkbox" className="ml-2">
    I agree to the terms and conditions
  </label>
</div>
```

### Radio Group
```tsx
<fieldset>
  <legend>Select Plan</legend>
  <div role="radiogroup" aria-label="Billing frequency">
    <input
      id="monthly"
      type="radio"
      name="billing"
      value="monthly"
      checked={billing === 'monthly'}
      onChange={handleChange}
      className="focus:outline-none focus:ring-2 focus:ring-brand-sky"
    />
    <label htmlFor="monthly">Monthly</label>
    
    <input
      id="yearly"
      type="radio"
      name="billing"
      value="yearly"
      checked={billing === 'yearly'}
      onChange={handleChange}
      className="focus:outline-none focus:ring-2 focus:ring-brand-sky"
    />
    <label htmlFor="yearly">Yearly</label>
  </div>
</fieldset>
```

---

## 🪟 Modal/Dialog Accessibility

### Basic Modal Structure
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-description" className="sr-only">
    Modal description for screen readers
  </p>
  
  <button
    onClick={onClose}
    aria-label="Close modal"
    className="focus:outline-none focus:ring-2 focus:ring-brand-sky"
  >
    <X aria-hidden="true" />
  </button>
  
  {/* Modal content */}
</div>
```

### Focus Trap Hook
```tsx
import { useEffect, useRef } from 'react';

export function useFocusTrap(isOpen: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  return containerRef;
}
```

---

## 🖼️ Image Accessibility

### Informative Image
```tsx
<Image
  src="/logo.png"
  alt="Thrill AI company logo"
  width={40}
  height={40}
/>
```

### Decorative Image
```tsx
<Image
  src="/decoration.svg"
  alt=""
  aria-hidden="true"
  width={100}
  height={100}
/>
```

### Image with Caption
```tsx
<figure>
  <Image
    src="/screenshot.png"
    alt="Dashboard showing analytics overview"
    width={800}
    height={600}
  />
  <figcaption>Analytics dashboard with key metrics</figcaption>
</figure>
```

---

## 📢 ARIA Live Regions

### Status Announcement
```tsx
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
  id="status-announcements"
/>

// Usage
const announce = (message: string) => {
  const el = document.getElementById('status-announcements');
  if (el) {
    el.textContent = message;
    setTimeout(() => el.textContent = '', 1000);
  }
};
```

### Error Announcement
```tsx
<div
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
  className="sr-only"
  id="error-announcements"
/>
```

---

## 🎨 Focus Styles

### Global Focus Styles (globals.css)
```css
/* Visible focus for keyboard users */
*:focus-visible {
  outline: 2px solid var(--color-brand-sky);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Remove default focus for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}

/* Button focus */
button:focus-visible {
  outline: 2px solid var(--color-brand-sky);
  outline-offset: 2px;
}

/* Link focus */
a:focus-visible {
  outline: 2px solid var(--color-brand-sky);
  outline-offset: 2px;
  text-decoration: underline;
}
```

### Tailwind Focus Classes
```tsx
className="focus:outline-none focus:ring-2 focus:ring-brand-sky focus:ring-offset-2 focus:ring-offset-black"
```

---

## 🏷️ Semantic HTML

### Page Structure
```tsx
<header role="banner">
  <nav aria-label="Main navigation">
    {/* Navigation items */}
  </nav>
</header>

<main role="main" id="main-content">
  <section aria-labelledby="features-heading">
    <h2 id="features-heading">Features</h2>
    {/* Content */}
  </section>
</main>

<footer role="contentinfo">
  {/* Footer content */}
</footer>
```

### Lists
```tsx
<ul role="list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li aria-current="page">Current Page</li>
  </ol>
</nav>
```

---

## ⌨️ Keyboard Navigation

### Skip Links
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-sky focus:text-black focus:rounded-lg"
>
  Skip to main content
</a>
```

### Keyboard Shortcuts
```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Alt + M: Open modal
    if (e.altKey && e.key === 'm') {
      e.preventDefault();
      openModal();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);
```

---

## 🎭 Screen Reader Only Content

### CSS Class
```css
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

.sr-only:focus {
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

### Usage
```tsx
<button>
  <span className="sr-only">Close modal</span>
  <X className="w-5 h-5" aria-hidden="true" />
</button>

<p id="modal-description" className="sr-only">
  This modal allows you to sign up for a free trial
</p>
```

---

## 🎨 Color Contrast

### Minimum Requirements
- **Normal text:** 4.5:1 contrast ratio
- **Large text (18pt+):** 3:1 contrast ratio
- **UI components:** 3:1 contrast ratio

### Testing
```tsx
// Use WebAIM Contrast Checker
// https://webaim.org/resources/contrastchecker/

// Or use a library
import { getContrast } from 'polished';

const contrast = getContrast('#ffffff', '#030303');
// Should be >= 4.5 for normal text
```

---

## 🔍 Common ARIA Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `aria-label` | Label for screen readers | `aria-label="Close modal"` |
| `aria-labelledby` | Reference to label element | `aria-labelledby="modal-title"` |
| `aria-describedby` | Reference to description | `aria-describedby="modal-desc"` |
| `aria-hidden` | Hide from screen readers | `aria-hidden="true"` |
| `aria-live` | Announce dynamic content | `aria-live="polite"` |
| `aria-busy` | Indicate loading state | `aria-busy="true"` |
| `aria-invalid` | Form validation | `aria-invalid="true"` |
| `aria-required` | Required field | `aria-required="true"` |
| `aria-expanded` | Expandable content | `aria-expanded="false"` |
| `aria-current` | Current item | `aria-current="page"` |

---

## ✅ Quick Checklist

Before marking a component as accessible:

- [ ] All interactive elements have focus styles
- [ ] All buttons have descriptive labels
- [ ] All images have alt text (or aria-hidden for decorative)
- [ ] All forms have proper labels
- [ ] Keyboard navigation works
- [ ] Color contrast meets standards
- [ ] ARIA attributes used correctly
- [ ] Semantic HTML used
- [ ] Error messages are announced
- [ ] Loading states are announced

---

## 🧪 Testing Commands

```bash
# Run accessibility tests
npm test -- --testPathPattern=accessibility

# Run Lighthouse
npx lighthouse http://localhost:3000 --view

# Run axe DevTools (browser extension)
# Install from Chrome Web Store
```

---

## 📚 Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

*Keep this guide handy during development!*

