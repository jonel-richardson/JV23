import { describe, it, expect } from 'vitest'
import { getBrandLogoSlug } from './getBrandLogoSlug'

describe('getBrandLogoSlug', () => {
  it('returns the slug when brand matches a known Trusted By logo', () => {
    expect(getBrandLogoSlug('Grey Goose')).toBe('grey-goose')
    expect(getBrandLogoSlug('Diplomatico')).toBe('diplomatico')
    expect(getBrandLogoSlug('JP Chenet')).toBe('jp-chenet')
  })

  it('strips diacritics so accented brand names still match', () => {
    expect(getBrandLogoSlug('Patrón')).toBe('patron')
  })

  it('trims whitespace before slugifying', () => {
    expect(getBrandLogoSlug('  Grey Goose  ')).toBe('grey-goose')
  })

  it('returns null when the brand is not in the known logo list', () => {
    expect(getBrandLogoSlug('Carnival Trinidad')).toBeNull()
    expect(getBrandLogoSlug('Independent')).toBeNull()
    expect(getBrandLogoSlug('Grey Goose Caribbean')).toBeNull()
  })

  it('returns null for empty / nullish input', () => {
    expect(getBrandLogoSlug('')).toBeNull()
    expect(getBrandLogoSlug('   ')).toBeNull()
    expect(getBrandLogoSlug(undefined)).toBeNull()
    expect(getBrandLogoSlug(null)).toBeNull()
  })
})
