# Progress Tracker — Creonex Frontend

Last updated: 2026-05-23

---

## Current Phase

**Phase 2 — Auth, Data Layer, and Route Pages**

## Current State

The marketing homepage is complete as a static shell with all 10 sections (Hero through CTA), Navbar, and Footer. The design system is fully established in `globals.css` with OKLCH tokens, typography scale, section utilities, and component classes. TanStack Query v5 is installed and wired up with `QueryClientProvider`, `getQueryClient`, and query-keys factory. A server-side DAL is in place with `users.dal.ts`, `http.ts`, `endpoints.ts`, and Clerk-based `getAuthHeaders`. All homepage content is currently hardcoded — no live API data.

---

## In Progress

_Nothing actively in progress._

---

## Planned — Next Up

### Immediate (before new features)

- [ ] Install Font Awesome: `npm install @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons`
- [ ] Replace existing `lucide-react` / `react-icons` icon usages with Font Awesome equivalents
- [ ] Create `lib/api/client.ts` with typed `apiGet`, `apiPost`, `apiPut`, `apiDelete`

### Auth — Clerk

- [ ] Install: `npm install @clerk/nextjs`
- [ ] Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY` to `.env.local`
- [ ] Wrap root layout with `<ClerkProvider>`
- [ ] Configure `proxy.ts` with `clerkMiddleware` + protected route matcher
- [ ] `app/(auth)/login/page.tsx` — `<SignIn />`
- [ ] `app/(auth)/signup/page.tsx` — `<SignUp />`
- [ ] `app/(auth)/onboarding/page.tsx` — post-signup profile (react-hook-form + zod)
- [ ] Add `<UserButton />` to Navbar
- [ ] Install forms: `npm install react-hook-form @hookform/resolvers zod`

### Course Pages

- [ ] `app/(marketing)/courses/page.tsx` — SSR listing with filters
- [ ] `app/(marketing)/courses/[slug]/page.tsx` — ISR detail page
- [ ] `features/courses/` slice (components, hooks, schemas, types)
- [ ] `dal/courses.dal.ts`
- [ ] `components/shared/CourseCard.tsx` — typed to real `Course` interface
- [ ] Course filter UI (category, level, price)

### Expert Pages

- [ ] `app/(marketing)/experts/page.tsx`
- [ ] `app/(marketing)/experts/[username]/page.tsx`
- [ ] `features/experts/` slice
- [ ] `dal/experts.dal.ts`

### Dashboard

- [ ] `app/(dashboard)/layout.tsx`
- [ ] `app/(dashboard)/dashboard/page.tsx`
- [ ] `app/(dashboard)/my-courses/page.tsx`
- [ ] `app/(dashboard)/bookings/page.tsx`

---

## Open Questions

| Question | Owner | Status |
|----------|-------|--------|
| Backend API base URL for staging? | Backend lead | ❓ Open |
| Razorpay key for test env? | Backend lead | ❓ Open |
| Figma spec complete for course detail page? | Design | ❓ Open |
| Which Clerk sign-in methods? (email, Google, GitHub) | PM | ❓ Open |

---

## Known Issues

| Issue | Severity | Notes |
|-------|----------|-------|
| VS Code `@apply` lint warnings in globals.css | Low | IDE-only. Set `"css.lint.unknownAtRules": "ignore"` in VS Code settings |
| Homepage data is hardcoded | Medium | Intentional for MVP shell — replaced when API is ready |
