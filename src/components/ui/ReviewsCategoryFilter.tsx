'use client'

import { REVIEW_FILTER_CATEGORIES } from '@/lib/constants'
import { useReviewsFilterStore } from '@/stores/useReviewsFilterStore'

// Category filter for the /reviews archive. Mirrors the /work
// CategoryFilter shape (tab-style underline, mono labels, horizontal
// scroll on mobile) — keeping the two filter surfaces visually aligned
// since they serve the same function on different content types.
//
// Vocabulary is "All" + the Inquire project-type pills, sourced from
// REVIEW_FILTER_CATEGORIES which composes from INQUIRE_PROJECT_TYPES
// so the two surfaces stay coupled.
export default function ReviewsCategoryFilter() {
  const activeCategory = useReviewsFilterStore((s) => s.activeCategory)
  const setCategory = useReviewsFilterStore((s) => s.setCategory)

  return (
    <div
      role="tablist"
      aria-label="Filter reviews by project type"
      className="flex gap-6 overflow-x-auto -mx-6 px-6 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] @[768px]/frame:mx-0 @[768px]/frame:px-0 @[768px]/frame:overflow-x-visible"
    >
      {REVIEW_FILTER_CATEGORIES.map((category) => {
        const isActive = activeCategory === category
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setCategory(category)}
            className={
              isActive
                ? 'flex-shrink-0 font-mono text-[11px] tracking-[0.10em] uppercase pb-2 border-b-[1.5px] border-[var(--color-accent-primary)] text-[var(--color-text-primary)]'
                : 'flex-shrink-0 font-mono text-[11px] tracking-[0.10em] uppercase pb-2 border-b-[1.5px] border-transparent text-[var(--color-text-quiet)] motion-safe:transition-colors motion-safe:duration-150 hover:text-[var(--color-text-body)]'
            }
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
