'use client'

import ReviewCard from '@/components/ui/ReviewCard'
import { useReviewsFilterStore } from '@/stores/useReviewsFilterStore'
import {
  REVIEWS_EMPTY_ALL,
  REVIEWS_EMPTY_FOR_CATEGORY,
} from '@/lib/constants'
import type { Review } from '@/lib/types'

interface ReviewsGridProps {
  reviews: Review[]
}

// Co-located with /reviews/page.tsx (mirrors /work/WorkGrid.tsx pattern).
// Reads filter state from the Zustand store and filters the server-fetched
// review list client-side. Empty-state copy varies by selected category so
// "no reviews here yet" reads as specific to the filter, not the entire
// archive.
export default function ReviewsGrid({ reviews }: ReviewsGridProps) {
  const activeCategory = useReviewsFilterStore((s) => s.activeCategory)

  const filtered =
    activeCategory === 'All'
      ? reviews
      : reviews.filter((r) => r.projectType === activeCategory)

  if (filtered.length === 0) {
    const message =
      activeCategory === 'All' ? REVIEWS_EMPTY_ALL : REVIEWS_EMPTY_FOR_CATEGORY
    return (
      <p className="font-body text-[#aaa] mt-10">{message}</p>
    )
  }

  return (
    /* @container frame: 1-col mobile / 2-col tablet / 3-col desktop — same grid rhythm as /work */
    <div className="mt-10 grid grid-cols-1 gap-6 @[768px]/frame:grid-cols-2 @[1024px]/frame:grid-cols-3 @[1024px]/frame:gap-8">
      {filtered.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  )
}
