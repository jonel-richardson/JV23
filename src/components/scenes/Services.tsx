import { Fragment } from 'react'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import SceneMeta from '@/components/ui/SceneMeta'
import Marquee from '@/components/ui/Marquee'
import ServiceCard from '@/components/ui/ServiceCard'
import { client, SERVICES_QUERY } from '@/lib/sanity'
import { MARQUEE_SERVICES_DURATION, SERVICES_TITLE } from '@/lib/constants'
import type { Service } from '@/lib/types'

// Numbers (01, 02, ...) are derived from sort position rather than stored
// on the schema — services render in `order asc`, so the visual sequence
// always matches the array index. Avoids redundant data and stays correct
// if Nathan reorders services.
function numberFor(index: number): string {
  return String(index + 1).padStart(2, '0')
}

export default async function Services() {
  const services = await client.fetch<Service[]>(SERVICES_QUERY)

  return (
    <section
      id="services"
      /* @container frame: standard scene padding; Services alternates back to bg-base after Kit's bg-secondary */
      className="relative bg-[var(--color-bg-base)] px-6 pt-10 pb-15 @[768px]/frame:px-8 @[768px]/frame:pt-14 @[768px]/frame:pb-20 @[1024px]/frame:px-12 @[1024px]/frame:pt-16 @[1024px]/frame:pb-24"
    >
      <SceneMeta scene="06" label="SERVICES" />

      <EyebrowLabel number="06" label="WHAT WE OFFER" className="mb-5" />

      <h2 className="font-display tracking-[0.02em] leading-[0.92] text-[var(--color-text-primary)] mb-10 text-[clamp(40px,12cqw,60px)] @[1024px]/frame:mb-12">
        {SERVICES_TITLE}
      </h2>

      {services.length > 0 && (
        <Marquee
          duration={MARQUEE_SERVICES_DURATION}
          edgeFadeMobile={60}
          edgeFadeDesktop={60}
          ariaLabel="Services offered by Jack Visuals"
        >
          {services.map((service, idx) => (
            <Fragment key={service._id}>
              <ServiceCard service={service} number={numberFor(idx)} />
              <span aria-hidden="true" className="w-5 flex-shrink-0" />
            </Fragment>
          ))}
        </Marquee>
      )}
    </section>
  )
}
