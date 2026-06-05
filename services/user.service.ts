import { api } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import type {
  UserContext,
  CreatorProfile,
  LearnerProfile,
  AddCreatorRoleResponse,
} from '@/types/api'

export const userService = {
  getMe: (token: string) =>
    api.get<UserContext>(endpoints.users.me(), token),

  addCreatorRole: (token: string) =>
    api.post<AddCreatorRoleResponse>(endpoints.users.addCreatorRole(), {}, token),

  getCreatorProfile: (token: string) =>
    api.get<CreatorProfile>(endpoints.users.creatorProfile(), token),

  getLearnerProfile: (token: string) =>
    api.get<LearnerProfile>(endpoints.users.learnerProfile(), token),
}
