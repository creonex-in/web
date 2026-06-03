export type OfferType = '1:1' | 'workshop' | 'group' | 'digital'
export type OfferStatus = 'live' | 'draft' | 'scheduled' | 'ended'

export interface Offer {
  id: string
  type: OfferType
  title: string
  description: string
  price: number
  status: OfferStatus
  bookings: number
  rating: number
  date?: string
  seats?: number
  seatsLeft?: number
  duration: number
  createdAt: string
  image?: string
}
