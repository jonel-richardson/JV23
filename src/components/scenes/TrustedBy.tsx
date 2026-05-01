import { Fragment } from 'react'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import SceneMeta from '@/components/ui/SceneMeta'
import Marquee from '@/components/ui/Marquee'
import TrustedByLogo from '@/components/ui/TrustedByLogo'
import { client, TRUSTED_BY_QUERY } from '@/lib/sanity'
import {
  MARQUEE_TRUSTED_BY_DURATION,
  TRUSTED_BY_TITLE,
} from '@/lib/constants'
import type { TrustedBy as TrustedByDoc } from '@/lib/types'

export default async function TrustedBy() {
  const brands = await client.fetch<TrustedByDoc[]>(TRUSTED_BY_QUERY)

  return (
    <section
      id="trusted"
      /* @container frame: standard scene padding (mobile/768/1024) per DESIGN-GUIDELINES — Trusted By alternates back to bg-base after Featured Work's bg-secondary */
      className="relative bg-[var(--color-bg-base)] px-6 pt-10 pb-15 @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-20 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-24"
    >
      <SceneMeta scene="04" label="TRUSTED BY" />

      <EyebrowLabel number="04" label="TRUSTED BY" className="mb-5" />

      <h2
        /* @container frame: section title here is intentionally smaller than Hero/About — the marquee is the visual centerpiece, the title is supporting */
        className="font-display tracking-[0.02em] leading-[0.92] text-[var(--color-text-primary)] mb-10 text-[clamp(36px,8cqw,56px)] @[1024px]/frame:mb-12"
      >
        {TRUSTED_BY_TITLE}
      </h2>

      {brands.length > 0 && (
        <Marquee
          duration={MARQUEE_TRUSTED_BY_DURATION}
          edgeFadeMobile={80}
          edgeFadeDesktop={120}
          ariaLabel="Brands Jack Visuals has worked with"
        >
          {brands.map((brand) => (
            <Fragment key={brand._id}>
              <TrustedByLogo brand={brand} />
              <span
                aria-hidden="true"
                className="mx-6 self-center h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-surface-card-raised)] @[1024px]/frame:mx-8"
              />
            </Fragment>
          ))}
        </Marquee>
      )}
    </section>
  )
}
