import { TRUSTED_BY_LOGO_SLUGS } from './constants'

// Slugify a free-text brand string into the canonical filename slug used
// at /public/images/trusted-by/{slug}.png. Trims whitespace, lowercases,
// strips diacritics, replaces non-alphanumeric runs with single dashes,
// and trims leading/trailing dashes. The result is checked against the
// hardcoded TRUSTED_BY_LOGO_SLUGS list — return null when the brand
// doesn't have a logo on disk so callers can render a no-logo state
// rather than a broken-image icon.
//
// Example mappings:
//   "Grey Goose"           → "grey-goose"           ✓ (in list)
//   "Grey Goose Caribbean" → "grey-goose-caribbean" ✗ (not in list, returns null)
//   "Patrón"               → "patron"               ✓ (diacritic stripped)
//   "Carnival Trinidad"    → "carnival-trinidad"    ✗ (returns null)
//   ""  / undefined        → null
export function getBrandLogoSlug(brand: string | undefined | null): string | null {
  if (!brand) return null
  const slug = brand
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  if (!slug) return null
  return (TRUSTED_BY_LOGO_SLUGS as readonly string[]).includes(slug)
    ? slug
    : null
}
