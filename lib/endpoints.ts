// Single source of truth for all API endpoint paths.
// Used by both DAL (server) and hooks (client) — never hardcode paths elsewhere.

export const endpoints = {
  users: {
    me: "/users/me",
  },
} as const;
