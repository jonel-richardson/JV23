import { describe, expect, it } from 'vitest'
import { formatProjectDate } from './formatProjectDate'

describe('formatProjectDate', () => {
  it('strips leading zero from single-digit months', () => {
    expect(formatProjectDate('2024-09-15')).toBe('9.2024')
    expect(formatProjectDate('2024-02-01')).toBe('2.2024')
  })

  it('preserves double-digit months', () => {
    expect(formatProjectDate('2024-11-30')).toBe('11.2024')
    expect(formatProjectDate('2024-10-05')).toBe('10.2024')
  })

  it('returns empty string for malformed input', () => {
    expect(formatProjectDate('not-a-date')).toBe('')
    expect(formatProjectDate('2024/09/15')).toBe('')
    expect(formatProjectDate('2024-9-15')).toBe('')
  })

  it('returns empty string for empty/null/undefined', () => {
    expect(formatProjectDate('')).toBe('')
    expect(formatProjectDate(null)).toBe('')
    expect(formatProjectDate(undefined)).toBe('')
  })
})
