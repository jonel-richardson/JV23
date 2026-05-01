// Mirrors WordsFromSet.tsx vertical footprint so the Suspense fallback
// doesn't shift layout when reviews stream in.
export default function WordsFromSetSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading reviews"
      /* @container frame: tightened padding mirrors WordsFromSet.tsx — see DESIGN-GUIDELINES change log 2026-04-30 */
      className="relative bg-[var(--color-bg-base)] px-6 pt-12 pb-12 @[768px]/frame:px-8 @[768px]/frame:pt-16 @[768px]/frame:pb-16 @[1024px]/frame:px-12 @[1024px]/frame:pt-20 @[1024px]/frame:pb-20"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="h-2.5 w-40 bg-[var(--color-surface-card)] rounded" />
        <div className="h-2.5 w-32 bg-[var(--color-surface-card)] rounded" />
      </div>
      <div className="mb-10 h-10 w-56 bg-[var(--color-surface-card)] rounded @[1024px]/frame:h-14 @[1024px]/frame:w-72 @[1024px]/frame:mb-12" />
      <div className="min-h-[240px] @[1024px]/frame:min-h-[220px] grid grid-cols-1 gap-8 @[768px]/frame:grid-cols-[2fr_1fr] @[768px]/frame:gap-16">
        <div>
          <div className="mb-4 h-20 w-12 bg-[var(--color-surface-card)] rounded" />
          <div className="space-y-2">
            <div className="h-6 w-full bg-[var(--color-surface-card)] rounded" />
            <div className="h-6 w-5/6 bg-[var(--color-surface-card)] rounded" />
            <div className="h-6 w-3/4 bg-[var(--color-surface-card)] rounded" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5 border-t-[0.5px] border-[#1a1a1a] pt-[18px] @[768px]/frame:self-end">
          <div className="h-3.5 w-32 bg-[var(--color-surface-card)] rounded" />
          <div className="h-2.5 w-40 bg-[var(--color-surface-card)] rounded" />
        </div>
      </div>
      <div className="mt-12 flex items-center gap-6 border-t-[0.5px] border-[#1a1a1a] pt-6">
        <div className="h-2.5 w-12 bg-[var(--color-surface-card)] rounded" />
        <div className="h-px flex-1 bg-[#1a1a1a]" />
        <div className="flex items-center gap-2.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[#2a2a2a]"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
