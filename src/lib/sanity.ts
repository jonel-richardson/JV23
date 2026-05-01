import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yqj0dj48'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(date desc)[0...3]`

export const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(date desc)`

// Phase 6 queries. Each projects only the fields the rendering component
// reads — slug.current is unwrapped to a flat string so consumers don't
// have to dig through Sanity's slug object shape.
export const TRUSTED_BY_QUERY = `*[_type == "trustedBy"] | order(order asc) { _id, name, "slug": slug.current, order }`

export const KIT_QUERY = `*[_type == "kit"] | order(order asc) { _id, category, item, accent, order }`

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) { _id, title, description, order }`
