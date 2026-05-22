/**
 * Query Keys Factory
 *
 * Centralized query key management for TanStack Query.
 * This ensures consistency across the application and provides type safety.
 *
 * Benefits:
 * - Single source of truth for all query keys
 * - Type-safe query key generation
 * - Easy to refactor and maintain
 * - Prevents key mismatches between prefetch and client queries
 *
 * Usage:
 *   queryKey: queryKeys.courses.list({ category: "design" })
 *   → ["courses", "list", { category: "design" }]
 *
 * Invalidation:
 *   queryClient.invalidateQueries({ queryKey: queryKeys.courses.all() })
 *   → busts every courses query at once
 */

export const queryKeys = {
  // ─── Courses ──────────────────────────────────────────────────────────────

  courses: {
    /**
     * Base key for all course queries.
     * Invalidate this to bust the entire courses cache.
     */
    all: () => ["courses"] as const,

    /**
     * Paginated / filtered course listing.
     * Each unique filter object gets its own isolated cache entry.
     * @param filters - Optional filter params (category, level, price, etc.)
     */
    list: (filters?: Record<string, unknown>) =>
      filters
        ? (["courses", "list", filters] as const)
        : (["courses", "list"] as const),

    /**
     * Single course by URL slug.
     * @param slug - Course URL slug (e.g. "intro-to-figma")
     */
    detail: (slug: string) => ["courses", "detail", slug] as const,
  },

  // ─── Experts ──────────────────────────────────────────────────────────────

  experts: {
    /**
     * Base key for all expert queries.
     * Invalidate this to bust the entire experts cache.
     */
    all: () => ["experts"] as const,

    /**
     * Paginated / filtered expert listing.
     * Each unique filter object gets its own isolated cache entry.
     * @param filters - Optional filter params (category, rating, availability, etc.)
     */
    list: (filters?: Record<string, unknown>) =>
      filters
        ? (["experts", "list", filters] as const)
        : (["experts", "list"] as const),

    /**
     * Single expert profile by username.
     * @param username - Expert's public username (e.g. "john-doe")
     */
    detail: (username: string) => ["experts", "detail", username] as const,
  },

  // ─── Categories ───────────────────────────────────────────────────────────

  categories: {
    /**
     * Base key for all category queries.
     * Invalidate this to bust the entire categories cache.
     */
    all: () => ["categories"] as const,

    /**
     * Root-level categories with minimal data for nav / chips.
     */
    root: () => ["categories", { minimal: true }] as const,

    /**
     * Category list with optional filters.
     * @param filters - Optional filter params
     */
    list: (filters?: Record<string, unknown>) =>
      filters
        ? (["categories", filters] as const)
        : (["categories"] as const),

    /**
     * Direct children of a category by slug.
     * @param slug - Parent category slug
     */
    children: (slug: string) => ["category-children", slug] as const,

    /**
     * Single category by ID or slug.
     * @param identifier - Category ID (number) or slug (string)
     */
    detail: (identifier: string | number) =>
      ["categories", "detail", identifier] as const,
  },

  // ─── Bookings ─────────────────────────────────────────────────────────────

  bookings: {
    /**
     * Base key for all booking queries.
     * Invalidate this after any booking mutation.
     */
    all: () => ["bookings"] as const,

    /**
     * Authenticated user's full booking history.
     */
    list: () => ["bookings", "list"] as const,

    /**
     * Single booking detail by ID.
     * @param id - Booking UUID
     */
    detail: (id: string) => ["bookings", "detail", id] as const,
  },

  // ─── Auth ─────────────────────────────────────────────────────────────────

  auth: {
    /**
     * Currently authenticated user profile.
     * Fetched once on mount via GET /auth/me.
     * Invalidate on logout or profile update.
     */
    me: () => ["auth", "me"] as const,
  },
} as const;
