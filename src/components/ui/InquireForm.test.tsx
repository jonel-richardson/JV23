import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import InquireForm, { isValidEmail } from './InquireForm'

describe('isValidEmail', () => {
  it('accepts a normal address', () => {
    expect(isValidEmail('hello@jackvisuals23.com')).toBe(true)
  })

  it('rejects a missing @', () => {
    expect(isValidEmail('hellojackvisuals23.com')).toBe(false)
  })

  it('rejects a missing domain dot', () => {
    expect(isValidEmail('hello@local')).toBe(false)
  })
})

describe('InquireForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('toggles the selected pill when a non-default pill is clicked', () => {
    render(<InquireForm />)

    const brand = screen.getByRole('radio', { name: 'Brand Films' })
    const drone = screen.getByRole('radio', { name: 'Drone Cinematography' })

    expect(brand).toHaveAttribute('aria-checked', 'true')
    expect(drone).toHaveAttribute('aria-checked', 'false')

    fireEvent.click(drone)

    expect(drone).toHaveAttribute('aria-checked', 'true')
    expect(brand).toHaveAttribute('aria-checked', 'false')
  })

  it('shows validation errors when submitted empty', () => {
    render(<InquireForm />)
    fireEvent.click(screen.getByRole('button', { name: /Send inquiry/i }))

    expect(screen.getByText(/Name required/i)).toBeInTheDocument()
    expect(screen.getByText(/Email required/i)).toBeInTheDocument()
    expect(screen.getByText(/Message required/i)).toBeInTheDocument()
  })

  it('silent-drops the submission when the honeypot has a value (no fetch)', async () => {
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(null, { status: 200 }))
    const { container } = render(<InquireForm />)

    fireEvent.change(screen.getByLabelText('NAME'), {
      target: { value: 'Bot' },
    })
    fireEvent.change(screen.getByLabelText('EMAIL'), {
      target: { value: 'bot@bot.com' },
    })
    fireEvent.change(screen.getByLabelText('MESSAGE'), {
      target: { value: 'Spam payload' },
    })

    const honeypot = container.querySelector(
      'input[name="website"]',
    ) as HTMLInputElement
    fireEvent.change(honeypot, { target: { value: 'http://spam.example' } })

    fireEvent.click(screen.getByRole('button', { name: /Send inquiry/i }))

    await waitFor(() => {
      expect(screen.getByText(/THANKS,/i)).toBeInTheDocument()
    })

    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
