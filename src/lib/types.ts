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

export interface Review extends SanitySystemFields {
  _type: 'review'
  clientName: string
  role?: string
  project: SanityReference
  reviewText: string
  email?: string
  submittedAt?: string
  approved: boolean
}

export type { WorkFilterCategory } from './constants'
