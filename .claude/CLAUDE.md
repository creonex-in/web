# Creonex — Quick Reference

**Product**: Indian creator-education marketplace (courses + 1-on-1 mentorship).
**Repo**: Frontend only. Backend is NestJS + Neon PostgreSQL (separate repo), REST API at `NEXT_PUBLIC_API_URL`.
**Stack**: Next.js 16 App Router · React 19 · TypeScript strict · Tailwind v4 · shadcn (Base UI)· TanStack Query v5 · Clerk auth · react-hook-form + zod.
**Middleware**: `proxy.ts` at repo root (Next.js 16 uses this instead of `middleware.ts`).

---

## Hard Rules

- **Icons**: Font Awesome only (`@fortawesome/react-fontawesome`). Never `lucide-react` or `react-icons`. → `code-standards.md`
- **UI components**: shadcn only (`components/ui/`). Add via `npx shadcn add <name>`. Never MUI, Chakra, or any third-party library.
- **Styling**: Tailwind classes only. No `style={{}}`. Use `cn()` for conditionals.
- **Images / Links**: `next/image` and `next/link` always. No bare `<img>` or `<a>` for internal navigation.
- **Types**: No `any`. No `React.FC`. Explicit return types on all exported functions. → `code-standards.md`
- **Imports**: `@/` alias always. No `../../` across feature boundaries.
- **Server-first**: Default to `async` Server Component fetching via DAL directly. Only add `"use client"` when the component needs hooks, browser APIs, or must re-render on user interaction. → `code-standards.md`
- **Parallel fetching**: Use `Promise.all([...])` whenever a Server Component needs multiple independent data sources. Never chain sequential `await` calls. → `code-standards.md`
- **TanStack Query**: Only for data that changes based on client interaction (filters, pagination, live updates). Never use it as a replacement for a plain Server Component fetch. → `code-standards.md`
- **DAL**: Functions in `dal/` are `server-only` — never import in client components. Client `queryFn` hits `/api` proxy.
- **Comments**: Write only when the WHY is non-obvious. Never explain what the code does.
- **Metadata**: Every `page.tsx` exports a `Metadata` object or `generateMetadata`. → `code-standards.md`
- **Barrel exports**: Only inside `features/{domain}/`. Never in `components/`.
- **Brand color**: `--brand: #337DEB`. Full token table → `style-guide.md`.

---

## Rendering Strategy

| Route | Strategy |
|-------|----------|
| `/` | SSG |
| `/courses` | SSR + `force-dynamic` + TanStack prefetch |
| `/courses/[slug]` | ISR `revalidate: 3600` |
| `/experts/[username]` | ISR `revalidate: 1800` |
| `/dashboard`, `/my-courses`, `/bookings` | CSR — client-only, behind Clerk auth |
| `/login`, `/signup` | SSG |

Implementation patterns with code → `architecture.md`.

---

## File Structure

```
app/                 Pages and layouts (App Router)
components/ui/       shadcn primitives (never edit directly)
components/shared/   Custom reusable components
components/layout/   Navbar, Footer
components/sections/ Homepage section components
features/{domain}/   Domain slice: components/, hooks/, types/
dal/                 Server-only data access (import "server-only")
lib/                 http, endpoints, errors, tanstack utilities
types/               Global TypeScript interfaces
```

---

## When to Read Detail Files

| Task involves... | Read |
|-----------------|------|
| Colors, typography, spacing, tokens | `style-guide.md` |
| Component patterns, section structure, Tailwind utilities | `ui-context.md` |
| Routing, auth, data flow, DAL patterns, dependencies | `architecture.md` |
| TypeScript, React, Next.js, icons, Tailwind rules + examples | `code-standards.md` |
| What's built, what's planned, open questions | `progress-tracker.md` |
| Product scope, feature list, business context | `project-overview.md` |

---

## After Meaningful Changes

Update `progress-tracker.md`. If a change affects architecture, scope, or standards — update the relevant detail file.
