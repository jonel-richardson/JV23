interface SanitySystemFields {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SanityImageAsset {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
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

export interface TrustedBy extends SanitySystemFields {
  _type: 'trustedBy'
  name: string
  logo: SanityImageAsset
  order: number
}

export interface Kit extends SanitySystemFields {
  _type: 'kit'
  name: string
  description?: string
  image?: SanityImageAsset
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
