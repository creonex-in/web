// Centralized React Query cache keys — factory functions ensure consistent key shape
// for cache reads, invalidations, and optimistic updates across the app.

export const queryKeys = {
  users: {
    all: ["users"] as const,
    // Nested under users.all so invalidating all users also invalidates "me".
    me: () => [...queryKeys.users.all, "me"] as const,
  },
} as const;
