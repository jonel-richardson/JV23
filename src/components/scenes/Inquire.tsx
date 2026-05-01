import EyebrowLabel from '@/components/ui/EyebrowLabel'
import SceneMeta from '@/components/ui/SceneMeta'
import ContactList from '@/components/ui/ContactList'
import InquireForm from '@/components/ui/InquireForm'
import { INQUIRE_BODY, INQUIRE_TITLE } from '@/lib/constants'

// Scene 08 — ships in Phase 7 (Inquire/Reviews swapped per the 2026-05-01
// change log; see CLAUDE.md phase table). Two columns at 768+: intro +
// contact list left, form right (flex-1 / flex-[1.3]). Stacks on mobile.
// Background carries two decorative radial glows positioned with negative
// offsets so they bleed in from the corners — overflow-hidden on the
// section keeps them from leaking onto the previous scene.
export default function Inquire() {
  return (
    <section
      id="inquire"
      /* @container frame: standard scene padding; bg #000 alternates back to secondary after Services' bg-base. relative + overflow-hidden anchors and contains the decorative glows. */
      className="relative overflow-hidden bg-[var(--color-bg-secondary)] px-6 pt-10 pb-15 @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-20 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-24"
    >
      <SceneMeta scene="08" label="INQUIRE" />

      {/* Top-right blue glow. 400×400, 13% accent-primary. Negative top/right
         offsets push the gradient center outside the section so only the
         feathered edge bleeds in. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0 h-[400px] w-[400px] rounded-full"
        style={{
          top: '-150px',
          right: '-150px',
          background:
            'radial-gradient(circle, rgba(0,102,255,0.13) 0%, transparent 60%)',
        }}
      />
      {/* Bottom-left green glow. 500×500, 7% accent-secondary. Larger and
         softer than the blue counterpart so it reads as ambient atmosphere
         rather than a second focal point. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0 h-[500px] w-[500px] rounded-full"
        style={{
          bottom: '-200px',
          left: '-200px',
          background:
            'radial-gradient(circle, rgba(0,255,163,0.07) 0%, transparent 60%)',
        }}
      />

      {/* @container frame: stacked on mobile, two-column at 768+ with the
         form column getting the larger flex weight (1.3 vs 1) per mockup.
         Gap widens at 1024+. relative + z-10 lifts content above the glows. */}
      <div className="relative z-10 flex flex-col gap-8 @[768px]/frame:flex-row @[768px]/frame:items-start @[768px]/frame:gap-12 @[1024px]/frame:gap-20">
        <div className="@[768px]/frame:flex-1">
          <EyebrowLabel number="08" label="INQUIRE" />

          <h2
            /* @container frame: clamp-driven scale within the mobile range, then discrete steps at 768/1024 per mockup. mt-3.5 = 14px aligns the title with the top of the form card. */
            className="mt-3.5 mb-4 font-display text-[clamp(36px,12cqw,56px)] leading-[0.92] tracking-[0.02em] text-[var(--color-text-primary)] @[768px]/frame:text-[72px] @[1024px]/frame:text-[88px]"
          >
            {INQUIRE_TITLE.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p className="mb-6 font-body text-[15px] leading-[1.7] text-[var(--color-text-body)]">
            {INQUIRE_BODY}
          </p>

          <ContactList />
        </div>

        <div className="@[768px]/frame:flex-[1.3]">
          <InquireForm />
        </div>
      </div>
    </section>
  )
}
