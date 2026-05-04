import Image from 'next/image'
import { TRUSTED_BY_LOGOS } from '@/lib/trustedByLogos'
import type { TrustedBy } from '@/lib/types'

interface TrustedByLogoProps {
  brand: TrustedBy
}

// Renders a single brand logo from a static-imported PNG. Slug from Sanity
// gates the lookup in TRUSTED_BY_LOGOS — when no entry exists we render
// nothing rather than a broken image. The brightness-0 invert opacity-60
// filter chain converts every logo (regardless of its native palette) to
// uniform white-on-dark — visual uniformity in a logo wall context
// outweighs individual brand color fidelity. Hover lifts the opacity to 1
// so the brand is recognizable on inspection.
//
// `priority` is critical for the marquee: lazy-loading caused a cold-cache
// flicker where logos contributed zero width until decode and the CSS
// infinite-scroll transform recomputed against a growing track width.
// Eager preload keeps the track stable from frame 1.
export default function TrustedByLogo({ brand }: TrustedByLogoProps) {
  const logo = TRUSTED_BY_LOGOS[brand.slug]
  if (!logo) return null

  return (
    <Image
      src={logo}
      alt={brand.name}
      priority
      /* @container frame: logo height steps up at desktop so the wall reads heavier on wide viewports */
      className="block h-14 w-auto flex-shrink-0 brightness-0 invert opacity-60 motion-safe:transition-opacity motion-safe:duration-200 hover:opacity-100 @[1024px]/frame:h-16"
    />
  )
}
