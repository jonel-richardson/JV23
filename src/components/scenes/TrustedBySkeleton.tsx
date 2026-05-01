// Mirrors the resolved TrustedBy scene's vertical footprint so the
// Suspense fallback doesn't shift layout when content streams in.
export default function TrustedBySkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading trusted by"
      /* @container frame: standard scene padding mirrors TrustedBy.tsx */
      className="relative bg-[var(--color-bg-base)] px-6 pt-10 pb-15 @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-20 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-24"
    >
      <div className="mb-5 h-2.5 w-24 bg-[var(--color-surface-card)] rounded" />
      <div className="mb-10 h-12 w-3/4 bg-[var(--color-surface-card)] rounded @[1024px]/frame:h-16 @[1024px]/frame:mb-12" />
      <div className="flex gap-12 overflow-hidden">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-7 w-20 flex-shrink-0 bg-[var(--color-surface-card)] rounded @[1024px]/frame:h-9 @[1024px]/frame:w-28"
          />
        ))}
      </div>
      <div className="mt-6 h-2 w-40 bg-[var(--color-surface-card)] rounded @[1024px]/frame:mt-8" />
    </section>
  )
}
