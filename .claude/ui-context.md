# UI Context — Creonex Component Patterns

Component patterns, utility class usage, and Tailwind conventions.
Design tokens (colors, typography, spacing) → see `style-guide.md`.

---

## Design Philosophy

- White-dominant, flat solid colors, no gradients
- All sections: `.section > .container-inner > content`
- WCAG AA contrast on every text/background pair
- Dark mode via `.dark` on `<html>` — never `prefers-color-scheme`

---

## Using Design Tokens in Tailwind

```tsx
<div className="bg-[var(--brand)]">        // brand blue background
<span className="text-[var(--brand)]">     // brand blue text
<div className="border-[var(--brand)]">    // brand blue border
<div className="bg-[var(--surface)]">      // surface gray background
```

---

## Section Structure

Every page section must follow this wrapper:

```tsx
<section className="section">              // white bg
<section className="section section-surface"> // gray bg

  <div className="container-inner">
    {/* content */}
  </div>

</section>
```

### Section Header

```tsx
<div className="section-header">
  <span className="section-badge">Label</span>
  <h2>Section Heading</h2>
  <p className="body-lg max-w-xl">Supporting sentence.</p>
</div>
```

---

## Buttons

```tsx
// Primary CTA — solid brand blue
<button className="btn-primary">Get Started Free</button>

// Outlined secondary
<button className="btn-outline">Browse Courses</button>
```

---

## Feature Cards

```tsx
<div className="card-feature-hover">
  <div className="icon-pad-indigo mb-6">   // or: icon-pad-orange / green / purple
    <Icon className="size-8" />
  </div>
  <h3 className="mb-3">Card Title</h3>
  <p className="body-lg">Description.</p>
</div>
```

---

## Step Circle

```tsx
<div className="bg-brand-gradient rounded-full size-20 flex items-center justify-center
                shadow-[0_8px_16px_oklch(0.516_0.160_249.5/0.2)]">
  <span className="font-display font-extrabold text-[28px] text-white">1</span>
</div>
```

---

## Brand Utility Classes

| Class | Effect |
|-------|--------|
| `.bg-brand-gradient` | Solid `var(--brand)` background (no gradient) |
| `.text-brand-gradient` | `var(--brand)` text color |
| `.hero-glow` | `var(--brand-faint)` background tint for hero |
| `.section-badge` | Small pill label above section headings |

---

## Page Sections Inventory

| Component | File | Background |
|-----------|------|-----------|
| HeroSection | `components/sections/HeroSection.tsx` | bg-background |
| StatsSection | `components/sections/StatsSection.tsx` | bg-surface |
| CategoriesSection | `components/sections/CategoriesSection.tsx` | bg-surface |
| CoursesSection | `components/sections/CoursesSection.tsx` | bg-background |
| ExpertsSection | `components/sections/ExpertsSection.tsx` | bg-background |
| WhyCreonexSection | `components/sections/WhyCreonexSection.tsx` | bg-surface |
| HowItWorksSection | `components/sections/HowItWorksSection.tsx` | bg-surface |
| TestimonialsSection | `components/sections/TestimonialsSection.tsx` | bg-surface |
| FAQSection | `components/sections/FAQSection.tsx` | bg-background |
| CTASection | `components/sections/CTASection.tsx` | bg-background |

---

## shadcn Components

Located in `components/ui/` — never edit directly. Add with `npx shadcn add <name>`.

Installed: Accordion, Avatar, Badge, Button, Card, Input, ScrollArea, Separator, Sheet, Tabs
