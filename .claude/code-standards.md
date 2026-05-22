# Code Standards — Creonex Frontend

Specific rules for TypeScript, React, Next.js, and Tailwind CSS in this codebase.

---

## TypeScript

### Strictness

`tsconfig.json` has `"strict": true`. All the following are enforced:
- `noImplicitAny`
- `strictNullChecks`
- `strictFunctionTypes`
- `strictPropertyInitialization`

**No exceptions.** Never add `// @ts-ignore` or `// @ts-expect-error` without a comment explaining the exact limitation.

### Type vs Interface

```ts
// ✅ Use interface for object shapes
interface Course {
  id: string;
  title: string;
  slug: string;
  instructor: Instructor;
}

// ✅ Use type for unions, mapped types, utility types
type CourseStatus = "draft" | "published" | "archived";
type CourseFilters = Partial<Pick<Course, "category" | "level">>;
```

### No `any`

```ts
// ❌ never
const data: any = await fetchCourses();

// ✅ use unknown + type guard, or type it correctly
const data: unknown = await response.json();
if (isCourse(data)) { ... }

// ✅ or use your typed fetch wrapper
const data = await apiGet<Course[]>("/courses");
```

### Function Signatures

```ts
// ✅ explicit return type on all exported functions
export function formatPrice(cents: number): string {
  return `₹${(cents / 100).toFixed(0)}`;
}

// ✅ async functions
export async function fetchCourse(slug: string): Promise<Course> {
  return apiGet<Course>(`/courses/${slug}`);
}

// ❌ never React.FC
const Card: React.FC<CardProps> = () => {};

// ✅ plain function signature
function Card({ title }: CardProps): JSX.Element {
  return <div>{title}</div>;
}
```

---

## React

### Component Files

Each component file exports exactly **one default export** (the component) and may have named type exports.

```ts
// CourseCard.tsx
export interface CourseCardProps {
  course: Course;
  onWishlist?: (id: string) => void;
}

export default function CourseCard({ course, onWishlist }: CourseCardProps): JSX.Element {
  // ...
}
```

### Server vs Client Components

Add `"use client"` only when the component uses:
- `useState`, `useReducer`, `useEffect`, `useRef`, `useContext`
- `useRouter`, `usePathname`, `useSearchParams`
- Browser APIs (`window`, `document`, `localStorage`)
- Event handlers that trigger state changes
- TanStack Query hooks

```tsx
// ✅ Server Component (no directive needed)
export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="card-feature-hover">
      <h3>{course.title}</h3>
    </div>
  );
}

// ✅ Client Component (only when needed)
"use client";
import { useState } from "react";

export default function WishlistButton({ courseId }: { courseId: string }) {
  const [saved, setSaved] = useState(false);
  return <button onClick={() => setSaved(!saved)}>...</button>;
}
```

### Hooks Rules

- Custom hooks go in `lib/hooks/` (generic) or `features/{domain}/hooks/` (domain-specific).
- Never define a hook inside a component file.
- Always prefix with `use`.
- Custom hooks must be pure — no side effects beyond what React allows.

### Key Props

Always provide a stable `key` when rendering lists. Never use array index as key when items can be reordered or filtered.

```tsx
// ✅
{courses.map((course) => (
  <CourseCard key={course.id} course={course} />
))}

// ❌
{courses.map((course, i) => (
  <CourseCard key={i} course={course} />
))}
```

### Conditional Rendering

```tsx
// ✅ for single condition
{isLoading && <Spinner />}

// ✅ for if/else
{isLoading ? <Spinner /> : <CourseGrid courses={data} />}

// ✅ for complex conditions — extract to a variable
const content = error ? <ErrorState /> : isLoading ? <Spinner /> : <CourseGrid />;
return <section>{content}</section>;
```

---

## Next.js

### Image

```tsx
// ✅ always next/image
import Image from "next/image";

<Image
  src={course.thumbnailUrl}
  alt={course.title}
  width={400}
  height={225}
  className="rounded-xl object-cover"
/>

// For fill (responsive container)
<div className="relative aspect-video">
  <Image src={url} alt={alt} fill className="object-cover" />
</div>
```

### Link

```tsx
// ✅ always next/link
import Link from "next/link";
<Link href={`/courses/${course.slug}`}>View Course</Link>

// ❌ never bare <a> for internal nav
<a href="/courses">Courses</a>
```

### Metadata

Every `page.tsx` must export a `Metadata` object:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses — Creonex",
  description: "Browse courses taught by India's top creators.",
  openGraph: {
    title: "Courses — Creonex",
    description: "...",
    images: [{ url: "/og/courses.jpg" }],
  },
};
```

For dynamic routes, use `generateMetadata`:

```ts
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const course = await fetchCourse(params.slug);
  return { title: `${course.title} — Creonex` };
}
```

### Suspense Boundaries

Wrap Client Components that use TanStack Query in `<Suspense>`:

```tsx
// In a Server Component page
import { Suspense } from "react";
import CourseGrid from "@/features/courses/components/CourseGrid";

export default function CoursesPage() {
  return (
    <section className="section">
      <div className="container-inner">
        <Suspense fallback={<CourseGridSkeleton />}>
          <CourseGrid />
        </Suspense>
      </div>
    </section>
  );
}
```

---

## Tailwind CSS

### Class Order

Follow this order for readability (not enforced by linter, but follow the convention):

1. Layout (`flex`, `grid`, `block`)
2. Sizing (`w-`, `h-`, `size-`)
3. Positioning (`relative`, `absolute`, `inset-`)
4. Spacing (`p-`, `m-`, `gap-`)
5. Typography (`text-`, `font-`, `leading-`)
6. Visual (`bg-`, `border-`, `rounded-`, `shadow-`)
7. State (`hover:`, `focus:`, `active:`)
8. Responsive (`sm:`, `md:`, `lg:`)

### `cn()` for Conditional Classes

```tsx
import { cn } from "@/lib/utils";

// ✅
<div className={cn(
  "card-feature-hover p-6",
  isActive && "ring-2 ring-[var(--brand)]",
  className,
)}>
```

### No Inline Styles

```tsx
// ❌ never
<div style={{ color: "#337DEB" }}>

// ✅
<div className="text-[var(--brand)]">

// ✅ or for one-off dynamic values
<div className={`text-[${dynamicColor}]`}>  // only if truly dynamic
```

### Responsive Values

```tsx
// ✅ mobile-first
<h2 className="text-3xl lg:text-5xl font-extrabold">

// ✅ grid columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

## File Exports

### Barrel Exports

Use barrel `index.ts` only for `features/{domain}/` public APIs. Never create barrel files in `components/` — import directly to avoid bundler issues.

```ts
// features/courses/index.ts
export { default as CourseGrid } from "./components/CourseGrid";
export { useCourses } from "./hooks/useCourses";
export type { Course } from "./types/course.types";
```

### Avoid Re-exporting UI Primitives

```ts
// ❌ don't re-export shadcn
export { Button } from "@/components/ui/button"; // in some barrel

// ✅ import directly at use site
import { Button } from "@/components/ui/button";
```

---

## Linting

The project uses ESLint with `eslint-config-next`. Run before committing:

```bash
npm run lint
```

Key rules enforced by `eslint-config-next`:
- No `<img>` without `next/image`
- No `<a>` without `next/link` for internal hrefs
- No unused variables
- No missing `key` props in lists

The `@apply` rule in VS Code CSS lint will flag Tailwind directives with "Unknown at rule". This is a **VS Code IDE warning only** — not a real error. It does not affect `npm run build`. Configure VS Code to ignore with:
```json
{ "css.lint.unknownAtRules": "ignore" }
```
