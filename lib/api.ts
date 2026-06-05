export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly data?: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export function isApiError(e: unknown): e is ApiError {
  return e instanceof ApiError
}

export function isUnauthorized(e: unknown): boolean {
  return isApiError(e) && e.status === 401
}

export function isNotFound(e: unknown): boolean {
  return isApiError(e) && e.status === 404
}

export function isServerError(e: unknown): boolean {
  return isApiError(e) && e.status >= 500
}

export function isRetryable(e: unknown): boolean {
  return isApiError(e) && e.status >= 500
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions {
  method?: Method
  body?: unknown
  token?: string
  next?: { revalidate?: number | false; tags?: string[] }
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token, next } = options
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    ...(next ? { next } : {}),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new ApiError(
      res.status,
      (err as Record<string, string>)?.message ?? res.statusText,
      err,
    )
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export const api = {
  get: <T>(path: string, token?: string, next?: { revalidate?: number | false; tags?: string[] }) =>
    request<T>(path, { token, next }),
  post: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: 'POST', body, token }),
  patch: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: 'PATCH', body, token }),
  delete: <T>(path: string, token?: string) =>
    request<T>(path, { method: 'DELETE', token }),
}
