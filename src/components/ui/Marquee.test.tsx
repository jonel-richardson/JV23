import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import Marquee from './Marquee'

describe('Marquee', () => {
  it('applies the duration prop as inline animation-duration on the track', () => {
    const { container } = render(
      <Marquee duration={42}>
        <span>child</span>
      </Marquee>,
    )

    const track = container.querySelector(
      '.motion-safe\\:animate-scroll-marquee',
    ) as HTMLElement | null
    expect(track).not.toBeNull()
    expect(track?.style.animationDuration).toBe('42s')
  })

  it('renders children twice for seamless loop', () => {
    const { container } = render(
      <Marquee duration={20}>
        <span data-testid="child">brand</span>
      </Marquee>,
    )

    const matches = container.querySelectorAll('[data-testid="child"]')
    expect(matches).toHaveLength(2)
  })

  it('marks the duplicate set as aria-hidden so screen readers announce it once', () => {
    const { container } = render(
      <Marquee duration={20}>
        <span>brand</span>
      </Marquee>,
    )

    const track = container.querySelector(
      '.motion-safe\\:animate-scroll-marquee',
    ) as HTMLElement | null
    expect(track).not.toBeNull()
    const sets = track!.children
    expect(sets).toHaveLength(2)
    expect(sets[0].getAttribute('aria-hidden')).toBeNull()
    expect(sets[1].getAttribute('aria-hidden')).toBe('true')
  })
})
