# Frontend Architecture — Creonex

## System Boundaries

This repo contains **only the frontend**. All data persistence, auth logic, and business rules live in the backend.

```
┌─────────────────────────────────────────────────────┐
│                  BROWSER / CLIENT                   │
│                                                     │
│  Next.js 16 App Router (this repo)                  │
│  ┌──────────────┐  ┌────────────────────────────┐   │
│  │ Server Comps │  │ Client Comps (TanStack Q)  │   │
│  │  (RSC/SSR)   │  │  "use client" + hooks      │   │
│  └──────┬───────┘  └──────────┬─────────────────┘   │
│         │                     │                     │
│         └──────────┬──────────┘                     │
│                    │ fetch() / REST                  │
└────────────────────┼────────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────────────────┐
│               BACKEND (separate repo)              │
│  NestJS + Neon PostgreSQL + Drizzle ORM            │
│  REST API at NEXT_PUBLIC_API_URL                   │
└────────────────────────────────────────────────────┘
```

---

## Rendering Strategy

| Route type | Strategy | Reason |
|-----------|---------|--------|
| Homepage (`/`) | **SSG** (no dynamic data yet) | Fast TTFB, CDN-cacheable |
| Course listing (`/courses`) | **SSR** + TanStack Query hydration | SEO + fresh filter state |
| Course detail (`/courses/[slug]`) | **ISR** (revalidate: 3600) | SEO + freshness |
| Expert profile (`/experts/[username]`) | **ISR** (revalidate: 1800) | SEO |
| Dashboard (`/dashboard`) | **CSR** (client-only behind auth) | No SEO needed |
| Auth pages (`/login`, `/signup`) | **SSG** | Static forms |

---

## Component Rendering Decisions

```
Server Component (default)             Client Component ("use client")
────────────────────────────────       ────────────────────────────────
• Sections (no interactivity)          • Navbar (mobile menu toggle)
• Static card displays                 • CourseGrid (TanStack Query)
• Section headers, badges              • FilterBar (URL state)
• Footer                               • AuthForms (form state)
• Course/Expert card shells            • CourseCard w/ wishlist button
• Layout wrappers                      • Booking modals
```

---

## Data Flow

### Server Component (static / SSR page sections)

```
Page (Server)
  └── fetch() from API directly
        └── pass typed props to child Server Components
              └── render → HTML streamed to browser
```

### Client Feature (TanStack Query)

```
Feature Component ("use client")
  └── useQuery({ queryKey, queryFn })
        └── queryFn → apiGet('/courses')
              └── Returns typed Course[]
                    └── Renders CourseGrid → CourseCard[]
```

---

## Route Structure (planned)

```
app/
├── page.tsx                    # / (homepage)
├── layout.tsx                  # Root layout
├── (auth)/
│   ├── layout.tsx              # Auth layout (no Navbar/Footer)
│   ├── login/page.tsx          # /login
│   ├── signup/page.tsx         # /signup
│   └── onboarding/page.tsx     # /onboarding (post-signup)
├── (marketing)/
│   ├── courses/
│   │   ├── page.tsx            # /courses (listing)
│   │   └── [slug]/page.tsx     # /courses/intro-to-figma
│   └── experts/
│       ├── page.tsx            # /experts (listing)
│       └── [username]/page.tsx # /experts/john-doe
└── (dashboard)/
    ├── layout.tsx              # Dashboard shell
    ├── dashboard/page.tsx      # /dashboard (overview)
    ├── my-courses/page.tsx     # /my-courses
    └── bookings/page.tsx       # /bookings
```

---

## Auth Architecture

Auth is handled entirely by **Clerk**. No custom auth logic, no JWT management, no session cookies written by the app.

### How it works

```
Browser
  └── @clerk/nextjs ClerkProvider (wraps the app in layout.tsx)
        ├── useAuth / useUser / useClerk  — client-side auth state
        ├── auth() / currentUser()        — server-side auth (RSC / Route Handlers)
        └── middleware.ts (clerkMiddleware) — protects routes at the edge
```

### Middleware

`middleware.ts` at the repo root uses Clerk's `clerkMiddleware` to protect routes:

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/my-courses(.*)",
  "/bookings(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});
```

### Client Components

```ts
import { useAuth, useUser } from "@clerk/nextjs";

const { isSignedIn, userId } = useAuth();
const { user } = useUser();
```

### Server Components / Route Handlers

```ts
import { auth, currentUser } from "@clerk/nextjs/server";

const { userId } = await auth();
const user = await currentUser();
```

### Auth UI

Use Clerk's hosted components — do not build custom login/signup forms:

```tsx
import { SignIn, SignUp, UserButton } from "@clerk/nextjs";

// In page.tsx
<SignIn />   // /login
<SignUp />   // /signup

// In Navbar
<UserButton afterSignOutUrl="/" />
```

### Rules

- **Never** store auth state in React Context or `localStorage` — use Clerk hooks directly.
- **Never** read the Clerk session token manually — let `auth()` / `useAuth()` handle it.
- Pass `userId` from Clerk as a header or cookie to the NestJS backend for identity verification.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are required env vars (see §Environment Variables).

---

## Import Path Conventions

All imports use the `@/` alias (mapped to repo root in `tsconfig.json`):

```ts
import { cn } from "@/lib/utils";
import { CourseCard } from "@/components/shared/CourseCard";
import { useCourses } from "@/features/courses/hooks/useCourses";
import type { Course } from "@/types/course.types";
```

Never use relative `../../` paths across feature boundaries.

---

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.2.6 | Framework |
| react | 19.2.4 | UI runtime |
| tailwindcss | ^4 | Styling |
| shadcn | ^4.8.0 | UI primitives |
| tw-animate-css | ^1.4.0 | CSS animations |
| lucide-react | ^1.16.0 | Icons |
| react-icons | ^5.6.0 | Extended icons |
| class-variance-authority | ^0.7.1 | Variant props |
| clsx + tailwind-merge | latest | Class utilities |
| @tanstack/react-query | v5 ✅ | Server state |
| @clerk/nextjs | **to install** | Authentication |
| react-hook-form | **not yet** | Form state |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID / INP | < 100ms |
| CLS | < 0.1 |
| JS bundle (initial) | < 150KB gzipped |
| Lighthouse (mobile) | > 85 |

To keep the bundle lean: prefer Server Components, lazy-load heavy Client Components with `next/dynamic`, import icons individually, and avoid barrel re-exports in `components/ui/`.
