"use client";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { http, HttpError } from "@/lib/http";
import { queryKeys } from "@/lib/tanstack/query-keys";
import { endpoints } from "@/lib/endpoints";
import { isRetryable } from "@/lib/errors";
import type { User } from "@/types";

export function useGetMe(initialData?: User): UseQueryResult<User, HttpError> {
  return useQuery<User, HttpError>({
    queryKey: queryKeys.users.me(),
    // On client, http() routes through /api proxy which attaches the Bearer token server-side.
    queryFn: (): Promise<User> => http<User>(endpoints.users.me),
    // RSC prefetch passes server data here — prevents a redundant client fetch on mount.
    initialData,
    initialDataUpdatedAt: initialData ? Date.now() : undefined,
    // Only retry on 5xx (transient backend errors) — 4xx errors won't resolve on retry.
    retry: (failureCount, error) => isRetryable(error) && failureCount < 2,
  });
}
