import EyebrowLabel from '@/components/ui/EyebrowLabel'
import SceneMeta from '@/components/ui/SceneMeta'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import ButtonSecondary from '@/components/ui/ButtonSecondary'
import HeroScanLines from './HeroScanLines'
import { HERO_GLOW, HERO_STATS } from '@/lib/constants'

export default function Hero() {
  const glowStyle = {
    width: HERO_GLOW.width,
    height: HERO_GLOW.height,
    bottom: HERO_GLOW.bottom,
    left: HERO_GLOW.left,
    background: HERO_GLOW.gradient,
  } as React.CSSProperties

  return (
    <section
      id="top"
      /* @container frame: three-step responsive padding (mobile/768/1024) per mockup. Top padding is reduced to match standard scenes for consistent rhythm; bottom keeps the larger Hero values for breathing room on tablet/desktop. Mobile pb tightened to pb-12 (down from pb-20) so the Hero→About transition doesn't sit on a large empty band — desktop's pb-30/pb-[140px] still reads as breathing room because tablet/desktop have the 88vh min-height giving content vertical room to begin with. Hero centers content vertically and caps at 88vh on desktop so the bottom edge stays visually ambiguous — cinematic cue that more content exists below the fold. */
      className="relative min-h-screen overflow-hidden bg-[var(--color-bg-secondary)] px-6 pt-10 pb-12 flex flex-col justify-center @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-30 @[768px]/frame:min-h-0 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-[140px] @[1024px]/frame:min-h-[88vh]"
    >
      <SceneMeta scene="01" label="HERO" />

      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={glowStyle}
      />

      <HeroScanLines />

      <div className="relative z-[2] w-full mx-auto max-w-[1440px]">
        <EyebrowLabel number="01" label="TRINIDAD & TOBAGO" className="mb-5" />

        <h1
          /* @container frame: clamp() scales smoothly within each range; three breakpoint stops at base/768/1024 per mockup */
          className="font-display tracking-[0.02em] leading-[0.92] text-[var(--color-text-primary)] mb-5 @[768px]/frame:mb-7 @[1024px]/frame:mb-8 text-[clamp(40px,13cqw,56px)] @[768px]/frame:text-[clamp(72px,11cqw,96px)] @[1024px]/frame:text-[clamp(96px,10cqw,132px)]"
        >
          <span className="block">CINEMATIC</span>
          <span className="block">STORYTELLING</span>
        </h1>

        <p className="font-body text-[15px] @[768px]/frame:text-[16px] @[1024px]/frame:text-[17px] leading-[1.65] text-[var(--color-text-body)] max-w-[480px] mb-5">
          Where every frame tells a story.
        </p>

        <div className="flex flex-col gap-2.5 mb-9 @[768px]/frame:flex-row @[768px]/frame:gap-3">
          <ButtonPrimary href="#inquire">Start a project</ButtonPrimary>
          <ButtonSecondary href="/work">View work →</ButtonSecondary>
        </div>

        <dl className="grid grid-cols-3 gap-x-7 gap-y-4 pt-5 @[768px]/frame:gap-12 @[1024px]/frame:pt-6 border-t-[0.5px] border-[var(--color-surface-card)]">
          {HERO_STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-[9px] tracking-[0.15em] text-[var(--color-text-quiet)] mb-1">
                {stat.label}
              </dt>
              <dd
                className={
                  stat.accent
                    ? 'font-mono text-[12px] text-[var(--color-accent-secondary)]'
                    : 'font-mono text-[12px] text-[var(--color-text-primary)]'
                }
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
