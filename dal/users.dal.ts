// Server-only data access layer — called from RSC pages to prefetch data.
// Passes result as initialData to client hooks, avoiding a second network round-trip.
import "server-only";
import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";
import { isUnauthorized } from "@/lib/errors";
import { getAuthHeaders } from "@/dal/lib/getAuthHeaders";
import type { User } from "@/types";

export async function getMe(): Promise<User | null> {
  try {
    const headers = await getAuthHeaders();
    // No token = unauthenticated session — return null, not an error.
    if (!headers) return null;
    return await http<User>(endpoints.users.me, { headers });
  } catch (e) {
    // 401 from backend means token was invalid/expired — treat as unauthenticated.
    if (isUnauthorized(e)) return null;
    throw e;
  }
}
