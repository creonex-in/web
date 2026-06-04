'use client'
import { useAuth } from '@clerk/nextjs'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/user.service'
import type { UserContext } from '@/types/api'

export const userKeys = {
  me: () => ['user', 'me'] as const,
  creatorProfile: () => ['user', 'creator-profile'] as const,
  learnerProfile: () => ['user', 'learner-profile'] as const,
}

export function useMe(initialData?: UserContext) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: userKeys.me(),
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('Unauthenticated')
      return userService.getMe(token)
    },
    initialData,
    staleTime: 5 * 60 * 1000,
  })
}

export function useAddCreatorRole() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('Unauthenticated')
      return userService.addCreatorRole(token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}
