import type { OfferType } from './offer'
import type { Creator } from './creator'

export interface Purchase {
  id: string
  creatorName: string
  creatorInitials: string
  offerTitle: string
  offerType: OfferType
  purchasedAt: string
  price: number
  completed: boolean
  rated: boolean
  rating?: number
}

export interface SavedCreator extends Creator {
  savedAt: string
}
