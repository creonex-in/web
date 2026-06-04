import 'server-only'
import { auth } from '@clerk/nextjs/server'
import { userService } from '@/services/user.service'
import { isUnauthorized } from '@/lib/api'
import type { UserContext } from '@/types/api'

export async function getMe(): Promise<UserContext | null> {
  const { getToken } = await auth()
  const token = await getToken()
  if (!token) return null
  try {
    return await userService.getMe(token)
  } catch (e) {
    if (isUnauthorized(e)) return null
    throw e
  }
}
