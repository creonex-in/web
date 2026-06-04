import { api } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import type {
  LearnerStep1Data,
  CreatorStep1Data,
  CreatorStep2Data,
  CreatorStep3Data,
  OnboardingStepResponse,
  GoLiveResponse,
} from '@/types/api'

export const onboardingService = {
  saveLearnerStep1: (data: LearnerStep1Data, token: string) =>
    api.post<OnboardingStepResponse>(endpoints.onboarding.learnerStep1(), data, token),

  saveCreatorStep1: (data: CreatorStep1Data, token: string) =>
    api.post<OnboardingStepResponse>(endpoints.onboarding.creatorStep1(), data, token),

  saveCreatorStep2: (data: CreatorStep2Data, token: string) =>
    api.post<OnboardingStepResponse>(endpoints.onboarding.creatorStep2(), data, token),

  saveCreatorStep3: (data: CreatorStep3Data, token: string) =>
    api.post<GoLiveResponse>(endpoints.onboarding.creatorStep3(), data, token),
}
