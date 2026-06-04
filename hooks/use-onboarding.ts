'use client'
import { useAuth } from '@clerk/nextjs'
import { useMutation } from '@tanstack/react-query'
import { onboardingService } from '@/services/onboarding.service'
import type {
  LearnerStep1Data,
  CreatorStep1Data,
  CreatorStep2Data,
  CreatorStep3Data,
} from '@/types/api'

export function useSaveLearnerStep1() {
  const { getToken } = useAuth()
  return useMutation({
    mutationFn: async (data: LearnerStep1Data) => {
      const token = await getToken()
      if (!token) throw new Error('Unauthenticated')
      return onboardingService.saveLearnerStep1(data, token)
    },
  })
}

export function useSaveCreatorStep1() {
  const { getToken } = useAuth()
  return useMutation({
    mutationFn: async (data: CreatorStep1Data) => {
      const token = await getToken()
      if (!token) throw new Error('Unauthenticated')
      return onboardingService.saveCreatorStep1(data, token)
    },
  })
}

export function useSaveCreatorStep2() {
  const { getToken } = useAuth()
  return useMutation({
    mutationFn: async (data: CreatorStep2Data) => {
      const token = await getToken()
      if (!token) throw new Error('Unauthenticated')
      return onboardingService.saveCreatorStep2(data, token)
    },
  })
}

export function useSaveCreatorStep3() {
  const { getToken } = useAuth()
  return useMutation({
    mutationFn: async (data: CreatorStep3Data) => {
      const token = await getToken()
      if (!token) throw new Error('Unauthenticated')
      return onboardingService.saveCreatorStep3(data, token)
    },
  })
}
