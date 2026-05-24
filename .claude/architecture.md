# Frontend Architecture — Creonex

## System Boundaries

This repo contains **only the frontend**. All data persistence, auth logic, and business rules live in the backend.

```
┌─────────────────────────────────────────────────────┐
│                  BROWSER / CLIENT                   │
│  Next.js 16 App Router (this repo)                  │
│  ┌──────────────┐  ┌────────────────────────────┐   │
│  │ Server Comps │  │ Client Comps (TanStack Q)  │   │
│  │  (RSC/SSR)   │  │  "use client" + hooks      │   │
│  └──────┬───────┘  └──────────┬─────────────────┘   │
│         └──────────┬──────────┘                     │
│                    │ fetch() / REST                  │
└────────────────────┼────────────────────────────────┘
                     ▼
┌────────────────────────────────────────────────────┐
│               BACKEND (separate repo)              │
│  NestJS + Neon PostgreSQL + Drizzle ORM            │
│  REST API at NEXT_PUBLIC_API_URL                   │
└────────────────────────────────────────────────────┘
```

---

## Rendering Strategy

| Route | Strategy | Reason |
|-------|----------|--------|
| `/` | SSG | Static, CDN-cacheable |
| `/courses` | SSR + `force-dynamic` + TanStack prefetch | SEO + interactive filter state |
| `/courses/[slug]` | ISR `revalidate: 3600` | SEO + freshness |
| `/experts/[username]` | ISR `revalidate: 1800` | SEO |
| `/dashboard`, `/my-courses`, `/bookings` | CSR — client-only, behind Clerk auth | No SEO needed |
| `/login`, `/signup` | SSG | Static Clerk components |

---

## Component Rendering Decisions

Default is Server Component. Only promote to Client Component when the component needs hooks, browser APIs, or must re-render in response to user interaction.

```
Server Component (default)             Client Component ("use client")
────────────────────────────────       ────────────────────────────────
• All page sections (no interaction)   • Navbar (mobile menu toggle)
• Course / Expert card shells          • FilterBar (drives URL params)
• Static course/expert grids           • CourseGrid when filter-driven
• Section headers, badges              • WishlistButton (optimistic UI)
• Footer                               • AuthForms (react-hook-form)
• Layout wrappers                      • Booking modals
• Any component receiving props only   • Any component using useQuery
```

Promote the **smallest possible subtree** to Client Component — keep parent layouts and shells as Server Components and push interactivity down to leaf nodes.

---

## Data Flow

This project is **server-first**. Choose the simplest pattern that satisfies the requirement — reach for client-side patterns only when server-side is genuinely insufficient.

### 1 — Server Component Direct Fetch (default)

For all pages where data does not change based on user interaction. No TanStack, no `"use client"`.

```
Page (async Server Component)
  └── DAL functions called directly (server-to-server, no proxy)
        └── Promise.all([...]) for multiple independent sources
              └── typed props passed to child Server Components
                    └── HTML streamed to browser
```

```tsx
export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const [course, related] = await Promise.all([
    getCourse(params.slug),
    getRelatedCourses(params.slug),
  ]);
  return <CourseDetail course={course} related={related} />;
}
```

### 2 — Server Prefetch → Client Hydration (SSR + interactive client state)

Only when a part of the page must re-fetch based on client input (filters, pagination). The DAL prefetches on the server, dehydrates into `HydrationBoundary`, and the client component rehydrates — no second network round-trip on first render.

```
Page (Server Component)
  └── getQueryClient() → fresh QueryClient per request
        └── queryClient.prefetchQuery({ queryKey, queryFn: dal.getCourses })
              └── DAL hits API_URL directly
                    └── dehydrate(queryClient) → serialized cache
                          └── HydrationBoundary passes cache to client tree
                                └── useQuery rehydrates — no refetch on mount
                                      └── filter change → useQuery refetches via /api proxy
```

### 3 — Pure CSR (dashboard / private routes only)

No server prefetch. `useQuery` runs on mount. Used only for authenticated private routes where SEO is irrelevant.

```
Client Component (behind Clerk auth)
  └── useQuery({ queryFn: () => fetch("/api/...") })
        └── renders on client only
```

**Next.js fetch caching inside DAL functions** (pass as `options` through `http()`):

```ts
fetch(url, { next: { revalidate: 3600 } })  // ISR — regenerate after 1 hour
fetch(url, { cache: 'force-cache' })         // SSG — cache at build time
fetch(url, { cache: 'no-store' })            // SSR — always fresh
```

---

## Auth Architecture

Auth is handled entirely by **Clerk**. No custom auth logic, no JWT management, no session cookies written by the app.

```
Browser
  └── @clerk/nextjs ClerkProvider (wraps the app in layout.tsx)
        ├── useAuth / useUser / useClerk  — client-side auth state
        ├── auth() / currentUser()        — server-side auth (RSC / Route Handlers)
        └── proxy.ts (clerkMiddleware)    — protects routes at the edge
```

### Middleware — proxy.ts

In Next.js 16, `proxy.ts` at the repo root acts as the middleware file:

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

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
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
<SignIn />              // /login page
<SignUp />              // /signup page
<UserButton afterSignOutUrl="/" />  // Navbar
```

### Auth Rules

- Never store auth state in React Context or `localStorage` — use Clerk hooks directly.
- Never read the Clerk session token manually — let `auth()` / `useAuth()` handle it.
- Required env vars: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`.

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| next 16.2.6 | Framework |
| react 19.2.4 | UI runtime |
| tailwindcss ^4 | Styling |
| shadcn ^4.8.0 | UI primitives — **only component library allowed** |
| tw-animate-css ^1.4.0 | CSS animations |
| @fortawesome/react-fontawesome | Icon renderer |
| @fortawesome/fontawesome-svg-core | FA core |
| @fortawesome/free-solid-svg-icons | Solid icons |
| @fortawesome/free-regular-svg-icons | Outline icons |
| @fortawesome/free-brands-svg-icons | Brand/social icons |
| class-variance-authority ^0.7.1 | Variant props |
| clsx + tailwind-merge | Class utilities |
| @tanstack/react-query v5 | Client-side data fetching |
| @clerk/nextjs | Authentication |
| react-hook-form + @hookform/resolvers | Form state (onboarding, booking) |
| zod | Schema validation for forms |

**Banned**: `lucide-react`, `react-icons`, any third-party component library.

---

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID / INP | < 100ms |
| CLS | < 0.1 |
| JS bundle (initial) | < 150KB gzipped |
| Lighthouse (mobile) | > 85 |

Prefer Server Components, lazy-load heavy Client Components with `next/dynamic`, import FA icons individually, avoid barrel re-exports in `components/ui/`.
