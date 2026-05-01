// Mirrors Kit.tsx's dual-composition footprint so the Suspense fallback
// doesn't shift layout when content streams in. Order: title → LOADOUT →
// pills (pills as film-credit footer). On desktop the camera placeholder
// floats absolutely at z-0 with the LOADOUT placeholder at z-10, matching
// the resolved scene's stacking.
export default function KitSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading kit"
      /* @container frame: standard scene padding mirrors Kit.tsx; relative anchors the desktop absolute camera placeholder and establishes the stacking context for z-0 / z-10. */
      className="relative bg-[var(--color-bg-secondary)] px-6 pt-10 pb-15 @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-20 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-24"
    >
      <div className="mb-5 h-2.5 w-32 bg-[var(--color-surface-card)] rounded" />

      {/* Mobile + tablet camera placeholder. Mirrors Kit.tsx width caps: full content width on mobile (max-w-[360px] under-constrains), max-w-[440px] centered at tablet. Hidden at 1024+. */}
      <div className="mb-8 h-[280px] w-full max-w-[360px] mx-auto bg-[var(--color-surface-card)] rounded-xl @[768px]/frame:max-w-[440px] @[1024px]/frame:hidden" />

      {/* Title placeholder — full width on mobile + tablet, max-w-[60%] at 1024+. Bars centered through tablet / left-aligned at 1024+ to mirror the resolved scene's text-center → text-left switch on the headline. */}
      <div className="@[1024px]/frame:max-w-[60%]">
        <div className="mb-6 space-y-2">
          <div className="h-12 w-2/3 bg-[var(--color-surface-card)] rounded mx-auto @[1024px]/frame:mx-0 @[1024px]/frame:h-16" />
          <div className="h-12 w-1/2 bg-[var(--color-surface-card)] rounded mx-auto @[1024px]/frame:mx-0 @[1024px]/frame:h-16" />
          <div className="h-12 w-3/4 bg-[var(--color-surface-card)] rounded mx-auto @[1024px]/frame:mx-0 @[1024px]/frame:h-16" />
        </div>
      </div>

      {/* Desktop-only absolute camera placeholder (1024+), z-0 (behind LOADOUT placeholder). top-0 mirrors Kit.tsx — camera flush with the section's padding-box top. */}
      <div className="hidden @[1024px]/frame:block absolute top-0 right-[12%] w-[320px] aspect-[416/752] max-h-[400px] z-0 bg-[var(--color-surface-card)] rounded-xl" />

      {/* LOADOUT placeholder — relative z-10 covers camera placeholder where they overlap */}
      <div className="relative z-10 mt-8 rounded-2xl border-[0.5px] border-[var(--color-surface-card)] bg-[#0a0a0a] p-6 @[1024px]/frame:p-8">
        <div className="mb-5 flex justify-between">
          <div className="h-3 w-24 bg-[var(--color-surface-card)] rounded" />
          <div className="h-3 w-16 bg-[var(--color-surface-card)] rounded" />
        </div>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex justify-between py-3 border-b-[0.5px] border-[var(--color-surface-card)] last:border-b-0"
          >
            <div className="h-3 w-20 bg-[var(--color-surface-card)] rounded" />
            <div className="h-3 w-32 bg-[var(--color-surface-card)] rounded" />
          </div>
        ))}
      </div>

      {/* Pill placeholders — film-credit footer below LOADOUT */}
      <div className="mt-8 flex flex-wrap gap-2">
        <div className="h-7 w-36 bg-[var(--color-surface-card)] rounded-full" />
        <div className="h-7 w-28 bg-[var(--color-surface-card)] rounded-full" />
        <div className="h-7 w-20 bg-[var(--color-surface-card)] rounded-full" />
      </div>
    </section>
  )
}
