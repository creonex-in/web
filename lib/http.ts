// Shared fetch wrapper used by both server (DAL) and client (hooks).
// On server → hits API_URL directly. On client → hits /api proxy (see app/api/[...proxy]/route.ts).

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

type ApiErrorBody = { message?: string };

function isApiErrorBody(body: unknown): body is ApiErrorBody {
  return (
    typeof body === "object" &&
    body !== null &&
    "message" in body &&
    typeof (body as Record<string, unknown>).message === "string"
  );
}

// No Next.js import here — http.ts is runtime-agnostic, usable in any context.
function getBaseUrl(): string {
  return typeof window === "undefined" ? (process.env.API_URL ?? "") : "/api";
}

export async function http<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${endpoint}`, options);

  if (!res.ok) {
    const raw: unknown = await res.json().catch(() => ({}));
    const message = isApiErrorBody(raw) ? (raw.message ?? res.statusText) : res.statusText;
    throw new HttpError(res.status, message);
  }

  // 204 No Content — valid success with no body, return undefined typed as T.
  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}
