# Progress Tracker — Creonex Frontend

Last updated: 2026-05-22

---

## Current Phase

**Phase 1 — Marketing Homepage (MVP shell)**

The homepage is functionally complete as a static marketing page. No real API data yet — all content is hardcoded/demo. The focus now shifts to wiring up real routes, auth, and data-fetching.

---

## Completed

### Design System

- [x] `app/globals.css` fully rewritten with OKLCH design tokens
- [x] Brand color migrated from purple (`#7C5CFF`) to blue (`#337DEB`)
- [x] All linear-gradient and radial-gradient declarations removed — flat solid colors only
- [x] `.bg-brand-gradient` → solid `var(--brand)` blue
- [x] `.text-brand-gradient` → solid `var(--brand)` text color
- [x] `.hero-glow` → flat `var(--brand-faint)` tint background
- [x] Dark mode tokens defined (`.dark` class based)
- [x] Full typography scale defined (hero, h1–h6, body-lg/md/sm)
- [x] Section utilities: `.section`, `.section-sm`, `.section-surface`, `.container-inner`
- [x] Component utilities: `.btn-primary`, `.btn-outline`, `.card-feature-hover`, `.section-badge`, `.section-header`
- [x] Icon pad utilities: `.icon-pad-indigo/orange/green/purple`

### Homepage Sections

- [x] `HeroSection` — headline, subtext, CTAs, hero glow
- [x] `StatsSection` — key platform stats bar
- [x] `CategoriesSection` — browse by category chips
- [x] `CoursesSection` — featured course cards
- [x] `ExpertsSection` — expert card grid
- [x] `WhyCreonexSection` — feature cards with icon pads
- [x] `HowItWorksSection` — numbered step flow
- [x] `TestimonialsSection` — testimonial cards
- [x] `FAQSection` — accordion FAQ
- [x] `CTASection` — bottom conversion section

### Layout

- [x] `Navbar` — desktop nav + mobile sheet (MobileNav)
- [x] `Footer` — links, brand info, social

### shadcn Components Added

- [x] Button, Badge, Card, Input, Accordion, Avatar
- [x] Sheet, Tabs, ScrollArea, Separator

### Documentation

- [x] `.claude/CLAUDE.md` — comprehensive AI assistant guide
- [x] `.claude/architecture.md` — system architecture + routing plan
- [x] `.claude/ui-context.md` — design tokens + component patterns
- [x] `.claude/code-standards.md` — TypeScript/React/Next.js standards
- [x] `.claude/project-overview.md` — product brief
- [x] `.claude/progress-tracker.md` — this file
- [x] `.claude/style-guide.md` — updated with blue brand palette

---

## In Progress

_Nothing actively in progress._

---

## Planned — Next Up

### Immediate (before any new features)

- [x] Install TanStack Query v5
- [x] Create `providers/tanstack.tsx` with `QueryClientProvider`
- [x] Wrap root layout with `<TanstackProvider>`
- [x] Create `lib/tanstack/query-keys.ts` with key factory
- [x] Create `lib/tanstack/query-client.ts` with `getQueryClient`
- [ ] Create `lib/api/client.ts` with typed `apiGet`, `apiPost`, `apiPut`, `apiDelete`

### Auth — Clerk

- [ ] Install Clerk: `npm install @clerk/nextjs`
- [ ] Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY` to `.env.local`
- [ ] Wrap root layout with `<ClerkProvider>`
- [ ] Add `middleware.ts` with `clerkMiddleware` + protected route matcher
- [ ] `app/(auth)/login/page.tsx` — `<SignIn />` component
- [ ] `app/(auth)/signup/page.tsx` — `<SignUp />` component
- [ ] `app/(auth)/onboarding/page.tsx` — post-signup profile setup
- [ ] Add `<UserButton />` to Navbar
- [ ] Install React Hook Form (for onboarding form only): `npm install react-hook-form @hookform/resolvers zod`

### Course Pages

- [ ] `app/(marketing)/courses/page.tsx` — listing with filters
- [ ] `app/(marketing)/courses/[slug]/page.tsx` — detail page (ISR)
- [ ] `features/courses/` slice
- [ ] `components/shared/CourseCard.tsx` refactor to accept real `Course` type
- [ ] Course filter UI (category, level, price)

### Expert Pages

- [ ] `app/(marketing)/experts/page.tsx`
- [ ] `app/(marketing)/experts/[username]/page.tsx`
- [ ] `features/experts/` slice

### Dashboard

- [ ] `app/(dashboard)/layout.tsx`
- [ ] `app/(dashboard)/dashboard/page.tsx`
- [ ] `app/(dashboard)/my-courses/page.tsx`
- [ ] `app/(dashboard)/bookings/page.tsx`

---

## Open Questions

| Question | Owner | Status |
|----------|-------|--------|
| What is the backend API base URL for staging? | Backend lead | ❓ Open |
| Razorpay key for test env? | Backend lead | ❓ Open |
| Is the Figma file fully spec'd for course detail page? | Design | ❓ Open |
| Are we doing SSR or ISR for course listing? (SEO priority?) | Team | ❓ Open |
| Which Clerk sign-in methods to enable? (email, Google, GitHub) | PM | ❓ Open |

---

## Known Issues

| Issue | Severity | Notes |
|-------|----------|-------|
| VS Code `@apply` lint warnings in globals.css | Low | IDE-only, not a build error. Set `"css.lint.unknownAtRules": "ignore"` in VS Code settings |
| Homepage data is all hardcoded | Medium | Intentional for MVP shell — will be replaced when API is ready |

---

## Dependencies Needed

```bash
# Auth
npm install @clerk/nextjs

# Forms (for onboarding)
npm install react-hook-form @hookform/resolvers zod
```
