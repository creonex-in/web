import type { Creator } from '@/types/creator'
import type { SortOption, ExploreFilters } from '@/types/explore'

export function sortCreators(creators: Creator[], sortBy: SortOption): Creator[] {
  return [...creators].sort((a, b) => {
    switch (sortBy) {
      case 'top_rated':  return b.rating - a.rating || b.reviewCount - a.reviewCount
      case 'price_asc':  return a.sessionPrice - b.sessionPrice
      case 'price_desc': return b.sessionPrice - a.sessionPrice
      case 'newest':     return b.id.localeCompare(a.id)
      default:           return b.cqsScore - a.cqsScore
    }
  })
}

export function matchesCreator(creator: Creator, query: string): boolean {
  const q = query.toLowerCase()
  return (
    creator.name.toLowerCase().includes(q) ||
    creator.niche.toLowerCase().includes(q) ||
    creator.bio.toLowerCase().includes(q) ||
    creator.tags.some((t) => t.toLowerCase().includes(q))
  )
}

export function computeActiveFilterCount(filters: ExploreFilters): number {
  let count = 0
  if (filters.priceMin > 0 || filters.priceMax < 10000) count++
  if (filters.minRating !== null) count++
  if (filters.liveToday) count++
  if (filters.inBoost) count++
  if (filters.responseTime !== 'any') count++
  return count
}

export function creatorsForNiche(niche: string, creators: Creator[]): Creator[] {
  return [...creators]
    .filter((c) => c.niche.toLowerCase().includes(niche.toLowerCase()))
    .sort((a, b) => b.cqsScore - a.cqsScore)
}

export function parseResponseMinutes(responseTime: string): number {
  const mMatch = responseTime.match(/(\d+)m/)
  if (mMatch) return parseInt(mMatch[1])
  const hMatch = responseTime.match(/(\d+(?:\.\d+)?)h/)
  if (hMatch) return Math.round(parseFloat(hMatch[1]) * 60)
  return 999
}
