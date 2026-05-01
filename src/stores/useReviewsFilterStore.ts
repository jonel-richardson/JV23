import { create } from 'zustand'
import type { ReviewFilterCategory } from '@/lib/types'

interface ReviewsFilterState {
  activeCategory: ReviewFilterCategory
  setCategory: (category: ReviewFilterCategory) => void
  reset: () => void
}

export const useReviewsFilterStore = create<ReviewsFilterState>((set) => ({
  activeCategory: 'All',
  setCategory: (category) => set({ activeCategory: category }),
  reset: () => set({ activeCategory: 'All' }),
}))
