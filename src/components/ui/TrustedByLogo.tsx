import { TRUSTED_BY_LOGO_PATH } from '@/lib/constants'
import type { TrustedBy } from '@/lib/types'

interface TrustedByLogoProps {
  brand: TrustedBy
}

// Renders a single brand logo from local assets. Slug from Sanity must
// match the PNG filename in /public/images/trusted-by/. The brightness-0
// invert opacity-60 filter chain converts every logo (regardless of its
// native palette) to uniform white-on-dark — visual uniformity in a logo
// wall context outweighs individual brand color fidelity. Hover lifts the
// opacity to 1 so the brand is recognizable on inspection.
export default function TrustedByLogo({ brand }: TrustedByLogoProps) {
  return (
    <img
      src={`${TRUSTED_BY_LOGO_PATH}/${brand.slug}.png`}
      alt={brand.name}
      loading="lazy"
      /* @container frame: logo height steps up at desktop so the wall reads heavier on wide viewports */
      className="block h-14 w-auto flex-shrink-0 brightness-0 invert opacity-60 motion-safe:transition-opacity motion-safe:duration-200 hover:opacity-100 @[1024px]/frame:h-16"
    />
  )
}
