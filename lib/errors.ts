// Typed error predicates — used in DAL catch blocks and React Query retry logic.
// Keeps error handling consistent across server and client without instanceof sprawl.

import { HttpError } from "@/lib/http";

export function isHttpError(e: unknown): e is HttpError {
  return e instanceof HttpError;
}

export function isUnauthorized(e: unknown): boolean {
  return isHttpError(e) && e.status === 401;
}

export function isForbidden(e: unknown): boolean {
  return isHttpError(e) && e.status === 403;
}

export function isNotFound(e: unknown): boolean {
  return isHttpError(e) && e.status === 404;
}

export function isServerError(e: unknown): boolean {
  return isHttpError(e) && e.status >= 500;
}

// Only 5xx errors are transient — worth retrying. 4xx are permanent client/auth errors.
export function isRetryable(e: unknown): boolean {
  return isHttpError(e) && e.status >= 500;
}
