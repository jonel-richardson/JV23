// Mirrors Services.tsx vertical footprint so the Suspense fallback
// doesn't shift layout when content streams in.
export default function ServicesSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading services"
      /* @container frame: standard scene padding mirrors Services.tsx */
      className="relative bg-[var(--color-bg-base)] px-6 pt-10 pb-15 @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-20 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-24"
    >
      <div className="mb-5 h-2.5 w-32 bg-[var(--color-surface-card)] rounded" />
      <div className="mb-10 h-12 w-48 bg-[var(--color-surface-card)] rounded @[1024px]/frame:h-16 @[1024px]/frame:mb-12" />
      <div className="flex gap-5 overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-[280px] min-h-[220px] flex-shrink-0 rounded-2xl border-[0.5px] border-[var(--color-surface-card-raised)] bg-[var(--color-surface-card)]"
          />
        ))}
      </div>
    </section>
  )
}
