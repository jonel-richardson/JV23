interface SanitySystemFields {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SanityReference {
  _type: 'reference'
  _ref: string
}

export type ProjectCategory =
  | 'Brand'
  | 'Event'
  | 'Music'
  | 'Drone'
  | 'Commercial'

export interface Project extends SanitySystemFields {
  _type: 'project'
  title: string
  category: ProjectCategory
  videoUrl?: string
  description?: string
  date: string
  featured: boolean
}

export interface Service extends SanitySystemFields {
  _type: 'service'
  title: string
  description?: string
  order: number
}

// Projected shape returned by TRUSTED_BY_QUERY (slug.current → slug). The raw
// Sanity doc has slug as { _type: 'slug', current: string } but the query
// flattens it. Logo image lives locally at /public/images/trusted-by/{slug}.png.
export interface TrustedBy {
  _id: string
  name: string
  slug: string
  order: number
}

// Projected shape returned by KIT_QUERY. Schema simplified to four fields
// in Phase 6 — see DESIGN-GUIDELINES change log.
export interface Kit {
  _id: string
  category: string
  item: string
  accent: boolean
  order: number
}

// Phase 8 schema rewrite — see src/sanity/schemas/review.ts header comment
// and DESIGN-GUIDELINES change log entry of 2026-05-01 for rationale. The
// previous shape (clientName / role / reviewText / project-as-reference)
// assumed every review tied to a published Sanity Project; the new shape
// supports public submission of free-text project names, brand-for-logo
// derivation, and a controlled projectType filter vocabulary.
//
// projectType reuses the Inquire vocabulary directly so the two forms stay
// coupled — if Inquire's pills evolve, Review's filter follows. See
// constants.ts INQUIRE_PROJECT_TYPES for the source list.
export type { InquireProjectType as ReviewProjectType } from './constants'

// Projected shape returned by WORDS_QUERY and REVIEWS_QUERY. The full
// Sanity document also carries email + slug + submittedAt + approved, but
// those don't reach the client — email is private, the rest are query
// filters / sort keys.
import type { InquireProjectType } from './constants'

export interface Review {
  _id: string
  name: string
  roleCompany?: string
  brand?: string
  project?: string
  projectType?: InquireProjectType
  review: string
}

export type { WorkFilterCategory } from './constants'

export type { ReviewFilterCategory } from './constants'

// Phase 7: Inquire contact list. Discriminated on `icon` — text items
// render with an arrow prefix, link items render with the Instagram glyph
// and open in a new tab. Constants array lives in lib/constants.ts so the
// shape stays inspectable alongside the other locked-copy blocks.
export interface ContactTextItem {
  icon: 'arrow'
  value: string
}

export interface ContactLinkItem {
  icon: 'instagram'
  value: string
  href: string
}

export type ContactItem = ContactTextItem | ContactLinkItem
