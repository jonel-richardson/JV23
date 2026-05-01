import EyebrowLabel from '@/components/ui/EyebrowLabel'
import SceneMeta from '@/components/ui/SceneMeta'
import KitCameraVideo from '@/components/ui/KitCameraVideo'
import Loadout from '@/components/ui/Loadout'
import { client, KIT_QUERY } from '@/lib/sanity'
import { KIT_PILLS, KIT_TITLE } from '@/lib/constants'
import type { Kit as KitDoc } from '@/lib/types'

// Kit composition uses two layouts in one component, viewport-driven via
// container queries. Order at every viewport: title → LOADOUT → pills.
// Pills sit below LOADOUT as a film-credit-style footer.
//   - Mobile + Tablet (< 1024px): camera-hero at top, full content width
//     capped at 280px tall (object-cover crops); title → LOADOUT → pills
//     stack below. Title is centered. Tablet collapses to the mobile
//     composition because at narrow desktop widths (820px) the right:12%
//     percentage math overlaps the text column at max-w-[60%].
//   - Desktop (1024px+): camera floats absolutely on the right at z-0;
//     LOADOUT is relative z-10 so it covers the camera where they overlap
//     (magazine editorial pattern — photo behind text block, video keeps
//     animating in the unhidden portion). Title left-aligned, constrained
//     to max-w-[60%] so it doesn't wrap under the camera. Section's
//     `relative` anchors the absolute camera AND establishes the stacking
//     context for the z-0 / z-10 layering.
// KitCameraVideo renders twice — once in each composition's wrapper —
// with the unused one display:none via container query (browsers don't
// load resources for display:none video elements).
//
// Aspect ratio literal `416/752` is the source video's native ratio
// (file: /public/videos/kit-camera.mp4). On desktop the wrapper has both
// w-[320px] and max-h-[400px], so aspect-ratio is overridden and the box
// becomes 320×400 — the video uses object-cover to crop top/bottom of
// the source. KitSkeleton mirrors the same literal.
export default async function Kit() {
  const items = await client.fetch<KitDoc[]>(KIT_QUERY)

  return (
    <section
      id="kit"
      /* @container frame: standard scene padding; bg #000 alternates back to secondary after TrustedBy's bg-base. relative anchors the desktop absolute camera to the section's padding box. */
      className="relative bg-[var(--color-bg-secondary)] px-6 pt-10 pb-15 @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-20 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-24"
    >
      <SceneMeta scene="05" label="KIT" />

      <EyebrowLabel number="05" label="PRODUCTION KIT" className="mb-5" />

      {/* Mobile + tablet camera hero. Full content width on mobile (max-w-[360px] is larger than mobile's available content width so the parent constrains naturally), capped at max-w-[440px] centered at tablet so the camera doesn't dominate the wider tablet width. Capped at 280px tall via object-cover. Hidden at 1024+ where the desktop floating composition takes over. */}
      <div className="mb-8 h-[280px] w-full max-w-[360px] mx-auto @[768px]/frame:max-w-[440px] @[1024px]/frame:hidden">
        <KitCameraVideo />
      </div>

      {/* Title block. Full width on mobile + tablet; constrained to 60% at 1024+ so it doesn't wrap under the absolutely-positioned camera. Pills moved below LOADOUT (film-credit footer pattern). */}
      <div className="@[1024px]/frame:max-w-[60%]">
        <h2
          /* @container frame: title scales smoothly within the mobile range, then steps to discrete sizes at 768/1024. Three lines per KIT_TITLE array. Centered on mobile + tablet (camera-hero-first composition reads better with a centered title); left-aligned at 1024+ where the floating-camera composition activates. */
          className="font-display tracking-[0.02em] leading-[0.92] text-[var(--color-text-primary)] mb-6 text-center text-[clamp(44px,12cqw,64px)] @[768px]/frame:text-[64px] @[1024px]/frame:text-left @[1024px]/frame:text-[76px]"
        >
          {KIT_TITLE.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>

      {/* Desktop-only absolute camera (1024+). Anchored to the section's padding box. top:0 (flush with section padding-box top) so the camera's heavy lower visual mass aligns horizontally with the EyebrowLabel + headline composition. right:12% from section's outer right. Activated at 1024+ rather than 768+ because at 820px viewport width, the right:12% percentage math collides horizontally with the text column at max-w-[60%] — there isn't enough horizontal room for both. Width 320px capped at 400px tall via max-h. aspect-[416/752] is the visual hint, but with both width and max-height constrained the aspect is overridden — the container is effectively 320×400 (aspect ~0.80 vs source's 0.553), and the video's object-cover crops ~89px from top + ~89px from bottom of the source to fit. z-0 places the camera BEHIND the LOADOUT (which is z-10) where they overlap — magazine editorial pattern: photo behind text block, the video continues animating in the unhidden portion. */}
      <div className="hidden @[1024px]/frame:block absolute top-0 right-[12%] w-[320px] aspect-[416/752] max-h-[400px] z-0">
        <KitCameraVideo />
      </div>

      {/* LOADOUT — full-width data card. relative + z-10 lifts it above the camera (z-0) where they overlap on desktop, so the gear list never has the camera bleeding through. mt-8 flat at every breakpoint — the z-layering removes the need for graduated margins to dodge camera overlap. */}
      <div className="relative z-10 mt-8">
        <Loadout items={items} />
      </div>

      {/* Pills as film-credit footer. Sits below LOADOUT — scene ends with metadata about the data above. mt-8 = 32px gap from LOADOUT bottom. */}
      <div className="mt-8 flex flex-wrap gap-2">
        {KIT_PILLS.map((pill) => (
          <span
            key={pill}
            className="inline-flex items-center rounded-full border-[0.5px] border-[var(--color-surface-card)] bg-[#0a0a0a] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.10em] text-[var(--color-text-muted)]"
          >
            {pill}
          </span>
        ))}
      </div>
    </section>
  )
}
