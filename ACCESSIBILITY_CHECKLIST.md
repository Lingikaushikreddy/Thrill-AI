# Accessibility Implementation Checklist

Use this checklist to track your progress implementing accessibility improvements.

---

## Phase 1: Critical Fixes (Week 1)

### 1.1 ARIA Labels & Semantic HTML
- [ ] Add `aria-label` to all icon-only buttons
- [ ] Add `aria-label` to all interactive elements without visible text
- [ ] Add `aria-hidden="true"` to all decorative icons
- [ ] Replace div buttons with actual `<button>` elements
- [ ] Replace div links with actual `<a>` elements
- [ ] Add proper heading hierarchy (h1 → h2 → h3)
- [ ] Use semantic HTML (header, nav, main, section, footer)

**Files:**
- [ ] `src/components/LandingPage.tsx`
- [ ] `src/components/GetStartedModal.tsx`
- [ ] `src/components/DashboardLayout.tsx`
- [ ] `src/components/VoiceReceptionist.tsx`
- [ ] `src/components/TeluguVoiceAgent.tsx`
- [ ] `src/components/HindiVoiceAgent.tsx`
- [ ] `src/components/Hero.tsx`
- [ ] `src/components/Features.tsx`
- [ ] `src/components/Navbar.tsx`

---

### 1.2 Keyboard Navigation
- [ ] Add focus styles to `globals.css`
- [ ] Add `focus:outline-none focus:ring-2` classes to all buttons
- [ ] Add `focus:outline-none focus:ring-2` classes to all links
- [ ] Test tab navigation through entire page
- [ ] Test shift+tab reverse navigation
- [ ] Ensure logical tab order
- [ ] Test Enter/Space on buttons
- [ ] Test Escape key on modals

**Files:**
- [ ] `src/app/globals.css`
- [ ] All component files

---

### 1.3 Modal Accessibility
- [ ] Add `role="dialog"` to modal
- [ ] Add `aria-modal="true"` to modal
- [ ] Add `aria-labelledby` pointing to modal title
- [ ] Add `aria-describedby` pointing to modal description
- [ ] Implement focus trap
- [ ] Add Escape key handler
- [ ] Prevent body scroll when modal open
- [ ] Focus first element when modal opens
- [ ] Return focus to trigger when modal closes

**Files:**
- [ ] `src/components/GetStartedModal.tsx`

---

### 1.4 Skip Links
- [ ] Add skip links to root layout
- [ ] Add `sr-only` utility class to CSS
- [ ] Add `id="main-content"` to main element
- [ ] Add `id="navigation"` to nav element
- [ ] Test skip links with keyboard

**Files:**
- [ ] `src/app/layout.tsx`
- [ ] `src/app/globals.css`
- [ ] `src/components/LandingPage.tsx`

---

### 1.5 Form Labels
- [ ] Add `<label>` with `htmlFor` to all inputs
- [ ] Add `aria-required="true"` to required fields
- [ ] Add `aria-invalid` for validation errors
- [ ] Add `aria-describedby` for error messages
- [ ] Add error announcements with `role="alert"`
- [ ] Test form with screen reader

**Files:**
- [ ] `src/components/GetStartedModal.tsx`

---

## Phase 2: Enhanced Experience (Week 2)

### 2.1 Color Contrast
- [ ] Audit all text colors for contrast
- [ ] Update `text-white/40` to meet contrast requirements
- [ ] Update `text-white/50` to meet contrast requirements
- [ ] Test with contrast checker tool
- [ ] Ensure 4.5:1 ratio for normal text
- [ ] Ensure 3:1 ratio for large text

**Files:**
- [ ] `src/app/globals.css`
- [ ] All component files

---

### 2.2 ARIA Live Regions
- [ ] Add status announcement region
- [ ] Add error announcement region
- [ ] Use `aria-live="polite"` for status updates
- [ ] Use `aria-live="assertive"` for errors
- [ ] Add `aria-atomic="true"` where appropriate

**Files:**
- [ ] `src/components/LandingPage.tsx`
- [ ] `src/components/GetStartedModal.tsx`
- [ ] All components with dynamic content

---

### 2.3 Image Accessibility
- [ ] Add descriptive `alt` text to all images
- [ ] Add `alt=""` to decorative images
- [ ] Add `aria-hidden="true"` to decorative images
- [ ] Ensure all images have proper dimensions
- [ ] Test with screen reader

**Files:**
- [ ] All components with images

---

### 2.4 Loading States
- [ ] Add `aria-busy="true"` to loading buttons
- [ ] Add `aria-label` for loading state
- [ ] Announce loading completion
- [ ] Hide loading spinners from screen readers with `aria-hidden`

**Files:**
- [ ] `src/components/GetStartedModal.tsx`
- [ ] All components with async operations

---

### 2.5 Error Handling
- [ ] Replace `alert()` with accessible error messages
- [ ] Add `role="alert"` to error messages
- [ ] Associate errors with form fields
- [ ] Announce errors to screen readers
- [ ] Provide clear error recovery paths

**Files:**
- [ ] `src/components/GetStartedModal.tsx`
- [ ] All components with forms

---

## Phase 3: Polish & Testing (Week 3)

### 3.1 Reduced Motion
- [ ] Add `prefers-reduced-motion` media query
- [ ] Disable animations for reduced motion users
- [ ] Update FadeIn component
- [ ] Test with reduced motion enabled

**Files:**
- [ ] `src/app/globals.css`
- [ ] `src/components/FadeIn.tsx`
- [ ] All animated components

---

### 3.2 Testing Setup
- [ ] Install testing dependencies
- [ ] Create accessibility test file
- [ ] Add axe-core tests
- [ ] Run automated tests
- [ ] Fix any violations

**Files:**
- [ ] `src/__tests__/accessibility.test.tsx`
- [ ] `package.json`

---

### 3.3 Manual Testing
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (Mac)
- [ ] Test keyboard navigation
- [ ] Test at 200% zoom
- [ ] Test at 320px width
- [ ] Test color contrast
- [ ] Test focus indicators

---

### 3.4 Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge
- [ ] Test on mobile browsers

---

### 3.5 Documentation
- [ ] Document accessibility features
- [ ] Add accessibility notes to README
- [ ] Create developer guidelines
- [ ] Update component documentation

---

## Quick Wins (Do First)

- [ ] Add `aria-label` to all buttons (30 min)
- [ ] Add focus styles to globals.css (15 min)
- [ ] Add skip links (20 min)
- [ ] Fix form labels in GetStartedModal (30 min)
- [ ] Add `aria-hidden` to decorative icons (15 min)

**Total: ~2 hours**

---

## Testing Checklist

### Keyboard Navigation
- [ ] Can navigate entire page with Tab
- [ ] Shift+Tab works in reverse
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals
- [ ] Arrow keys work in menus
- [ ] Focus indicators are visible

### Screen Reader
- [ ] All interactive elements are announced
- [ ] Form labels are read correctly
- [ ] Error messages are announced
- [ ] Modal content is announced
- [ ] Images have descriptive alt text
- [ ] Decorative images are hidden

### Visual
- [ ] Focus indicators are visible
- [ ] Color contrast meets standards
- [ ] Text readable at 200% zoom
- [ ] Layout works at 320px width
- [ ] No content loss at different zoom levels

### Forms
- [ ] All inputs have labels
- [ ] Required fields are marked
- [ ] Errors are announced
- [ ] Errors are associated with fields
- [ ] Form can be submitted with keyboard

---

## Progress Tracking

**Phase 1 Progress:** ___ / 5 sections complete  
**Phase 2 Progress:** ___ / 5 sections complete  
**Phase 3 Progress:** ___ / 5 sections complete  

**Overall Progress:** ___ / 15 sections complete

**Target Completion Date:** _______________

---

## Notes

_Add any notes, blockers, or questions here as you work through the checklist._

---

*Last Updated: _______________*

