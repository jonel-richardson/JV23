import EyebrowLabel from '@/components/ui/EyebrowLabel'
import SceneMeta from '@/components/ui/SceneMeta'
import AboutPortraitCard from './AboutPortraitCard'
import {
  ABOUT_BODY_PARAGRAPHS,
  ABOUT_LOCATION,
  ABOUT_TITLE,
} from '@/lib/constants'

export default function About() {
  return (
    <section
      id="about"
      /* @container frame: standard scene padding (mobile/768/1024) per DESIGN-GUIDELINES — asymmetric vertical (lighter top, full bottom). Background is #050505 to alternate with Hero (#000) and Featured Work (#000). */
      className="relative bg-[var(--color-bg-base)] px-6 pt-10 pb-15 @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-20 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-24"
    >
      <SceneMeta scene="02" label="ABOUT" />

      {/* @container frame: stacked on mobile, two-column at 768+ with asymmetric flex (text 1.1 / portrait 1) per mockup. Gap widens at 1024+. */}
      <div className="flex flex-col gap-8 @[768px]/frame:flex-row @[768px]/frame:items-center @[768px]/frame:gap-12 @[1024px]/frame:gap-20">
        <div className="@[768px]/frame:flex-[1.1]">
          <EyebrowLabel number="02" label="ABOUT" />

          <h2
            /* @container frame: clamp-driven scale within the mobile range, then discrete steps at 768/1024 per DESIGN-GUIDELINES. mt-3.5 = 14px aligns the title with the top of the portrait card per mockup. */
            className="font-display tracking-[0.02em] leading-[0.95] text-[var(--color-text-primary)] mt-3.5 mb-5 text-[clamp(44px,14cqw,64px)] @[768px]/frame:text-[72px] @[1024px]/frame:text-[88px]"
          >
            {ABOUT_TITLE.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div className="font-body text-[15px] @[1024px]/frame:text-[16px] leading-[1.7] text-[var(--color-text-body)]">
            {ABOUT_BODY_PARAGRAPHS.map((paragraph, idx) => (
              <p
                key={paragraph}
                className={
                  idx < ABOUT_BODY_PARAGRAPHS.length - 1 ? 'mb-3.5' : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-4 font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--color-text-quiet)]">
            {ABOUT_LOCATION}
          </div>
        </div>

        <div className="@[768px]/frame:flex-1">
          <AboutPortraitCard />
        </div>
      </div>
    </section>
  )
}
