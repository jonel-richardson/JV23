import Link from 'next/link'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import LeaveReviewForm from '@/components/ui/LeaveReviewForm'
import {
  LEAVE_REVIEW_BODY,
  LEAVE_REVIEW_EYEBROW,
  LEAVE_REVIEW_TITLE,
} from '@/lib/constants'

// /leave-review — public submission page. Verb-based URL prevents
// collision with the /reviews archive (the singular /review namespace
// would have crowded the plural archive route in unhelpful ways).
//
// Two-column at 768+ mirroring the Inquire scene composition (intro +
// copy left flex-1, form right flex-[1.3]) so submission flows feel
// rhythmically consistent across the site. Stacks single column under
// 768. Decorative blue + green radial glows match Inquire's atmosphere
// since both pages are submission moments worth marking visually.
export default function LeaveReviewPage() {
  return (
    <main
      /* @container frame: standard scene padding (mobile/768/1024); relative + overflow-hidden anchors and contains the decorative glows */
      className="relative overflow-hidden bg-[var(--color-bg-secondary)] px-6 pt-12 pb-12 @[768px]/frame:px-8 @[768px]/frame:pt-16 @[768px]/frame:pb-16 @[1024px]/frame:px-12 @[1024px]/frame:pt-20 @[1024px]/frame:pb-20"
    >
      {/* Top-right blue glow — same shape + offsets as Inquire. */}
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
      {/* Bottom-left green glow — same shape + offsets as Inquire. */}
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
         form column getting the larger flex weight (1.3 vs 1) per Inquire. */}
      <div className="relative z-10 flex flex-col gap-8 @[768px]/frame:flex-row @[768px]/frame:items-start @[768px]/frame:gap-12 @[1024px]/frame:gap-20">
        <div className="@[768px]/frame:flex-1">
          <EyebrowLabel label={LEAVE_REVIEW_EYEBROW} className="mb-5" />

          <h1
            /* @container frame: clamp scales the headline within the mobile range, then discrete steps at 768/1024. mt-3.5 = 14px aligns the title with the top of the form card. */
            className="mt-3.5 mb-4 font-display text-[clamp(36px,12cqw,56px)] leading-[0.92] tracking-[0.02em] text-[var(--color-text-primary)] @[768px]/frame:text-[72px] @[1024px]/frame:text-[88px]"
          >
            {LEAVE_REVIEW_TITLE.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mb-6 font-body text-[15px] leading-[1.7] text-[var(--color-text-body)]">
            {LEAVE_REVIEW_BODY}
          </p>
        </div>

        <div className="@[768px]/frame:flex-[1.3]">
          <LeaveReviewForm />
        </div>
      </div>

      {/* Back-to-home exit affordance. Same text-link pattern used on
         /reviews and /work so visitors get a consistent way out of any
         sub-page. Centered (single link) vs justify-between (/reviews
         has two). */}
      <div className="relative z-10 mt-8 flex justify-center border-t-[0.5px] border-[#1a1a1a] pt-6">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#888] motion-safe:transition-colors motion-safe:duration-150 hover:text-[var(--color-accent-secondary)] focus-visible:text-[var(--color-accent-secondary)] focus-visible:outline-none"
        >
          ← BACK TO HOME
        </Link>
      </div>
    </main>
  )
}
