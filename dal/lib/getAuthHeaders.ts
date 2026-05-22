// Server-only — safe to import Clerk's server SDK here.
import "server-only";
import { auth } from "@clerk/nextjs/server";

type AuthHeaders = { readonly Authorization: string };

// Returns null when user is unauthenticated — callers decide how to handle that state,
// rather than forcing them to catch a thrown error for an expected condition.
export async function getAuthHeaders(): Promise<AuthHeaders | null> {
  const { getToken } = await auth();
  const token = await getToken();
  if (!token) return null;

  return {
    Authorization: `Bearer ${token}`,
  };
}
