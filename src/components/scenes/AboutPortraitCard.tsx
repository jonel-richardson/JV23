import Image from 'next/image'
import {
  ABOUT_PORTRAIT_PHOTO,
  ABOUT_PORTRAIT_REC_LABEL,
  ABOUT_PORTRAIT_TIMECODE,
} from '@/lib/constants'

// Photo is the content. Viewfinder overlays (glow, fade, timecode, REC,
// corner brackets) are cinematic framing layered on top. Phase 9 adds a
// one-time scroll-triggered camera-pan animation over the photo — this
// card is the persistent visual; the animation is the flourish.
export default function AboutPortraitCard() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl border-[0.5px] border-[var(--color-surface-card)] bg-[linear-gradient(180deg,#0a0a0a_0%,#050505_100%)]">
      <Image
        src={ABOUT_PORTRAIT_PHOTO.src}
        alt={ABOUT_PORTRAIT_PHOTO.alt}
        fill
        priority
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 40vw, 100vw"
        className="object-cover object-top"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_30%,rgba(0,102,255,0.18)_0%,transparent_65%)]"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-[linear-gradient(180deg,transparent,#050505)]"
      />

      <div
        aria-hidden="true"
        className="absolute top-4 left-4 z-20 font-mono text-[9px] tracking-[0.15em] text-[var(--color-accent-secondary)]"
      >
        {ABOUT_PORTRAIT_TIMECODE}
      </div>

      <div
        aria-hidden="true"
        className="absolute top-4 right-4 z-20 flex items-center gap-1.5"
      >
        <span className="block h-[5px] w-[5px] rounded-full bg-[var(--color-accent-secondary)] motion-safe:animate-pulse-rec" />
        <span className="font-mono text-[9px] text-[var(--color-accent-secondary)]">
          {ABOUT_PORTRAIT_REC_LABEL}
        </span>
      </div>

      <span
        aria-hidden="true"
        className="absolute top-2.5 left-2.5 z-20 h-[14px] w-[14px] border-t border-l border-[var(--color-border)]"
      />
      <span
        aria-hidden="true"
        className="absolute top-2.5 right-2.5 z-20 h-[14px] w-[14px] border-t border-r border-[var(--color-border)]"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-2.5 left-2.5 z-20 h-[14px] w-[14px] border-b border-l border-[var(--color-border)]"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-2.5 right-2.5 z-20 h-[14px] w-[14px] border-b border-r border-[var(--color-border)]"
      />
    </div>
  )
}
