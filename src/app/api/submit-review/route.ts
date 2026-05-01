import { NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'
import { LEAVE_REVIEW_MAX_LENGTH, INQUIRE_PROJECT_TYPES } from '@/lib/constants'

const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

const ALLOWED_PROJECT_TYPES: readonly string[] = INQUIRE_PROJECT_TYPES

interface SubmitReviewBody {
  name?: unknown
  roleCompany?: unknown
  brand?: unknown
  project?: unknown
  projectType?: unknown
  review?: unknown
  email?: unknown
  turnstileToken?: unknown
  honeypot?: unknown
}

function asString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

// POST /api/submit-review
//
// Three-layer defense:
//   1. Honeypot field — if `honeypot` is non-empty, return 200 silently
//      without writing. The client form already silent-drops before fetch
//      for the most-common naive-bot case; this is defense-in-depth for
//      a bot that POSTs the JSON directly with a honeypot value.
//   2. Turnstile token — server validates against Cloudflare's siteverify
//      endpoint. Bots without a valid token are rejected with 400.
//   3. Field validation — name + review required, review length capped
//      at LEAVE_REVIEW_MAX_LENGTH, projectType (if provided) must come
//      from the allowed vocabulary.
//
// Successful writes set approved:false so Nathan's moderation toggle in
// Studio is the publish gate. submittedAt is set server-side here so
// reviews submitted publicly sort by their real submission time even
// though the schema field is readOnly to Studio editors.
export async function POST(request: Request) {
  let body: SubmitReviewBody
  try {
    body = (await request.json()) as SubmitReviewBody
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 },
    )
  }

  // Honeypot — silent success for bots that filled the trap field.
  if (asString(body.honeypot)) {
    return NextResponse.json({ ok: true })
  }

  const name = asString(body.name)
  const review = asString(body.review)
  if (!name || !review) {
    return NextResponse.json(
      { error: 'Name and review are required.' },
      { status: 400 },
    )
  }
  if (review.length > LEAVE_REVIEW_MAX_LENGTH) {
    return NextResponse.json(
      { error: `Review must be ${LEAVE_REVIEW_MAX_LENGTH} characters or fewer.` },
      { status: 400 },
    )
  }

  const projectType = asString(body.projectType)
  if (projectType && !ALLOWED_PROJECT_TYPES.includes(projectType)) {
    return NextResponse.json(
      { error: 'Invalid project type.' },
      { status: 400 },
    )
  }

  const turnstileToken = asString(body.turnstileToken)
  if (!turnstileToken) {
    return NextResponse.json(
      { error: 'Missing Turnstile token.' },
      { status: 400 },
    )
  }

  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('submit-review: TURNSTILE_SECRET_KEY not configured')
    return NextResponse.json(
      { error: 'Server misconfigured.' },
      { status: 500 },
    )
  }

  try {
    const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: turnstileToken,
      }),
    })
    const verifyJson = (await verifyResponse.json()) as { success?: boolean }
    if (!verifyJson.success) {
      return NextResponse.json(
        { error: 'Turnstile verification failed.' },
        { status: 400 },
      )
    }
  } catch (err) {
    console.error('submit-review: Turnstile verify error', err)
    return NextResponse.json(
      { error: 'Could not verify Turnstile token.' },
      { status: 502 },
    )
  }

  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('submit-review: SANITY_WRITE_TOKEN not configured')
    return NextResponse.json(
      { error: 'Server misconfigured.' },
      { status: 500 },
    )
  }

  try {
    await writeClient.create({
      _type: 'review',
      name,
      roleCompany: asString(body.roleCompany),
      brand: asString(body.brand),
      project: asString(body.project),
      projectType: projectType,
      review,
      email: asString(body.email),
      submittedAt: new Date().toISOString(),
      approved: false,
    })
  } catch (err) {
    console.error('submit-review: Sanity write failed', err)
    return NextResponse.json(
      { error: 'Could not save review. Try again.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
