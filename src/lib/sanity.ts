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
