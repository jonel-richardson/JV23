export default function FeaturedWorkSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading featured work"
      /* @container frame: standard scene padding (mobile/768/1024) per DESIGN-GUIDELINES — mirrors FeaturedWork so the skeleton occupies the same footprint and Suspense fallback avoids layout shift */
      className="relative bg-[var(--color-bg-secondary)] px-6 pt-10 pb-15 @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-20 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-24"
    >
      <div className="grid grid-cols-1 gap-4 @[768px]/frame:grid-cols-2 @[768px]/frame:gap-6 @[1024px]/frame:grid-cols-3 @[1024px]/frame:gap-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-lg border-[0.5px] border-[var(--color-surface-card)] overflow-hidden"
          >
            <div className="aspect-[16/9] bg-[var(--color-surface-card)]" />
            <div className="p-4 @[1024px]/frame:p-5">
              <div className="h-6 bg-[var(--color-surface-card)] rounded w-3/4" />
              <div className="mt-3 h-3 bg-[var(--color-surface-card)] rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
