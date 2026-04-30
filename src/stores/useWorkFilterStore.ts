import { create } from 'zustand'
import type { WorkFilterCategory } from '@/lib/types'

interface WorkFilterState {
  activeCategory: WorkFilterCategory
  setCategory: (category: WorkFilterCategory) => void
  reset: () => void
}

export const useWorkFilterStore = create<WorkFilterState>((set) => ({
  activeCategory: 'All',
  setCategory: (category) => set({ activeCategory: category }),
  reset: () => set({ activeCategory: 'All' }),
}))
