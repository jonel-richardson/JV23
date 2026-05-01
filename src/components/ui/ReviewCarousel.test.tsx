import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import ReviewCarousel from './ReviewCarousel'
import type { Review } from '@/lib/types'

// Mocking the hook directly avoids wiring a matchMedia stub into jsdom.
// Default returns false; individual tests can override by re-mocking.
vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}))

import { useReducedMotion } from '@/hooks/useReducedMotion'

const REVIEWS: Review[] = [
  {
    _id: 'r1',
    name: 'Aiyana Charles',
    roleCompany: 'Brand Director, Grey Goose Caribbean',
    brand: 'Grey Goose',
    project: 'Grey Goose Launch 2025',
    projectType: 'Brand Films',
    review: 'Nathan made our launch feel like a film, not an ad.',
  },
  {
    _id: 'r2',
    name: 'Marcus De Silva',
    roleCompany: 'Festival Producer, Carnival Trinidad',
    brand: 'Carnival Trinidad',
    project: 'Carnival Highlights 2025',
    projectType: 'Event Coverage',
    review: 'Three days, eight cameras, zero drama.',
  },
  {
    _id: 'r3',
    name: 'Keshia Joseph',
    roleCompany: 'Recording Artist, Independent',
    brand: 'Independent',
    project: 'Soca Summer 2025',
    projectType: 'Music Videos',
    review: 'He sees the moment before it happens.',
  },
]

describe('ReviewCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.mocked(useReducedMotion).mockReturnValue(false)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('clicking a dot switches the active review and pauses auto-advance', () => {
    render(<ReviewCarousel reviews={REVIEWS} />)

    const dots = screen.getAllByRole('tab')
    expect(dots).toHaveLength(3)
    expect(dots[0]).toHaveAttribute('aria-selected', 'true')
    expect(dots[2]).toHaveAttribute('aria-selected', 'false')

    fireEvent.click(dots[2])

    expect(dots[0]).toHaveAttribute('aria-selected', 'false')
    expect(dots[2]).toHaveAttribute('aria-selected', 'true')

    // Auto-advance is paused; advancing time past one full cycle should
    // not change the active dot.
    act(() => {
      vi.advanceTimersByTime(8000)
    })
    expect(dots[2]).toHaveAttribute('aria-selected', 'true')
  })

  it('auto-advances to the next review after WORDS_AUTO_ADVANCE_MS', () => {
    render(<ReviewCarousel reviews={REVIEWS} />)

    const dots = screen.getAllByRole('tab')
    expect(dots[0]).toHaveAttribute('aria-selected', 'true')

    act(() => {
      vi.advanceTimersByTime(7100)
    })

    expect(dots[0]).toHaveAttribute('aria-selected', 'false')
    expect(dots[1]).toHaveAttribute('aria-selected', 'true')
  })

  it('does not auto-advance when prefers-reduced-motion is set', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true)
    render(<ReviewCarousel reviews={REVIEWS} />)

    const dots = screen.getAllByRole('tab')
    expect(dots[0]).toHaveAttribute('aria-selected', 'true')

    act(() => {
      vi.advanceTimersByTime(15000)
    })

    expect(dots[0]).toHaveAttribute('aria-selected', 'true')
  })
})
