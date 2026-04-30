'use client'

import { WORK_FILTER_CATEGORIES } from '@/lib/constants'
import { useWorkFilterStore } from '@/stores/useWorkFilterStore'

export default function CategoryFilter() {
  const activeCategory = useWorkFilterStore((s) => s.activeCategory)
  const setCategory = useWorkFilterStore((s) => s.setCategory)

  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="flex gap-6 overflow-x-auto -mx-6 px-6 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] @[768px]/frame:mx-0 @[768px]/frame:px-0 @[768px]/frame:overflow-x-visible"
    >
      {WORK_FILTER_CATEGORIES.map((category) => {
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
