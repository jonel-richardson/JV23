'use client'

import { type FormEvent, useRef, useState } from 'react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import {
  INQUIRE_HONEYPOT_FIELD,
  INQUIRE_PROJECT_TYPES,
  LEAVE_REVIEW_BRAND_HELPER,
  LEAVE_REVIEW_EMAIL_HELPER,
  LEAVE_REVIEW_ERROR_MESSAGE,
  LEAVE_REVIEW_FORM_FOOT_META,
  LEAVE_REVIEW_FORM_HEADER_LEFT,
  LEAVE_REVIEW_FORM_HEADER_RIGHT,
  LEAVE_REVIEW_MAX_LENGTH,
  LEAVE_REVIEW_SUBMIT_LABEL,
  LEAVE_REVIEW_SUBMIT_LABEL_SENDING,
  LEAVE_REVIEW_SUCCESS_BODY,
  LEAVE_REVIEW_SUCCESS_HEADER,
  type InquireProjectType,
} from '@/lib/constants'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Exported for unit-test reuse; keeps the regex single-sourced.
export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value)
}

interface FieldErrors {
  name?: string
  email?: string
  review?: string
  turnstile?: string
}

const FIELD_INPUT_CLASSES =
  'block w-full rounded-md border-[0.5px] border-[var(--color-surface-card-raised)] bg-[var(--color-bg-base)] px-4 py-[14px] font-body text-[13px] text-white placeholder:text-[#555] motion-safe:transition-colors focus:border-[var(--color-accent-primary)] focus:outline-none'

const FIELD_LABEL_CLASSES =
  'mb-2 block font-mono text-[9px] tracking-[0.15em] text-[var(--color-text-quiet)]'

const FIELD_HELPER_CLASSES =
  'mt-1.5 font-mono text-[10px] tracking-[0.10em] text-[#666]'

const FIELD_ERROR_CLASSES =
  'mt-1.5 font-mono text-[10px] tracking-[0.10em] text-[#ff8080]'

// Hand-rolled form (no react-hook-form). Mirrors InquireForm's structure
// so the form-card pattern stays consistent across both submission flows.
//
// Two-layer spam defense: Turnstile (server-side verified in the API
// route) + honeypot field (silent client-side drop). Turnstile catches
// most bots before they hit our endpoint; honeypot catches the rest in
// case a bot somehow gets a token but still scrapes hidden inputs.
//
// Submit flow: client validates → POST to /api/submit-review with all
// fields + Turnstile token → server re-validates Turnstile → server
// writes to Sanity with approved:false. Success state replaces the
// form inline, mirroring InquireForm's terminal-state pattern.
export default function LeaveReviewForm() {
  const [name, setName] = useState('')
  const [roleCompany, setRoleCompany] = useState('')
  const [brand, setBrand] = useState('')
  const [projectType, setProjectType] = useState<InquireProjectType | ''>('')
  const [project, setProject] = useState('')
  const [review, setReview] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submittedName, setSubmittedName] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState(false)
  const turnstileRef = useRef<TurnstileInstance | null>(null)

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''
  const reviewLength = review.length
  const reviewOverLimit = reviewLength > LEAVE_REVIEW_MAX_LENGTH

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    if (!name.trim()) next.name = 'Name required.'
    if (!review.trim()) next.review = 'Review required.'
    else if (reviewOverLimit) next.review = `Max ${LEAVE_REVIEW_MAX_LENGTH} characters.`
    if (email.trim() && !isValidEmail(email.trim())) {
      next.email = 'Enter a valid email.'
    }
    if (!turnstileToken) {
      next.turnstile = 'Verify you are human before submitting.'
    }
    return next
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(false)

    if (honeypot) {
      setSubmittedName(name.trim() || 'there')
      return
    }

    const fieldErrors = validate()
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }
    setErrors({})

    const trimmedName = name.trim()
    setSubmitting(true)
    try {
      const response = await fetch('/api/submit-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          roleCompany: roleCompany.trim() || undefined,
          brand: brand.trim() || undefined,
          project: project.trim() || undefined,
          projectType: projectType || undefined,
          review: review.trim(),
          email: email.trim() || undefined,
          turnstileToken,
        }),
      })
      if (!response.ok) {
        throw new Error(`Submit-review returned ${response.status}`)
      }
      setSubmittedName(trimmedName)
    } catch (err) {
      console.error('Review submission failed:', err)
      setSubmitError(true)
      // Reset Turnstile so visitor gets a fresh token on retry — single-use
      // tokens can expire or be consumed by the server even on failure.
      turnstileRef.current?.reset()
      setTurnstileToken(null)
    } finally {
      setSubmitting(false)
    }
  }

  if (submittedName) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[14px] border-[0.5px] border-[var(--color-surface-card)] bg-[#0a0a0a] p-6 @[1024px]/frame:p-8"
      >
        <div className="mb-5 font-mono text-[10px] tracking-[0.15em] text-[var(--color-accent-secondary)]">
          {LEAVE_REVIEW_SUCCESS_HEADER}
        </div>
        <h3 className="mb-4 font-display text-[clamp(28px,8cqw,40px)] leading-[0.92] tracking-[0.02em] text-white">
          THANKS,
          <br />
          {submittedName.toUpperCase()}.
        </h3>
        <p className="font-body text-[15px] leading-[1.7] text-[var(--color-text-body)]">
          {LEAVE_REVIEW_SUCCESS_BODY}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Leave a review"
      className="rounded-[14px] border-[0.5px] border-[var(--color-surface-card)] bg-[#0a0a0a] p-6 @[1024px]/frame:p-8"
    >
      {/* Header — mono left, mono right, separated by a 0.5px dashed underline. */}
      <div className="mb-5 flex items-center justify-between border-b-[0.5px] border-dashed border-[#222] pb-3.5">
        <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--color-accent-secondary)]">
          {LEAVE_REVIEW_FORM_HEADER_LEFT}
        </span>
        <span className="font-mono text-[9px] tracking-[0.10em] text-[#444]">
          {LEAVE_REVIEW_FORM_HEADER_RIGHT}
        </span>
      </div>

      {submitError && (
        <div
          role="alert"
          className="mb-4 rounded-md border-[0.5px] border-[#ff3b3b] bg-[#1a0a0a] px-4 py-3 font-body text-[13px] text-[#ff8080]"
        >
          {LEAVE_REVIEW_ERROR_MESSAGE}
        </div>
      )}

      <div className="flex flex-col gap-[18px]">
        {/* Honeypot — visually + AT-hidden, tab-skipped. Same shape as InquireForm. */}
        <input
          type="text"
          name={INQUIRE_HONEYPOT_FIELD}
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ position: 'absolute', left: '-9999px' }}
        />

        <div>
          <label htmlFor="review-name" className={FIELD_LABEL_CLASSES}>
            NAME
          </label>
          <input
            id="review-name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'review-name-error' : undefined}
            className={FIELD_INPUT_CLASSES}
          />
          {errors.name && (
            <p id="review-name-error" className={FIELD_ERROR_CLASSES}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="review-role-company" className={FIELD_LABEL_CLASSES}>
            ROLE / COMPANY
          </label>
          <input
            id="review-role-company"
            type="text"
            name="roleCompany"
            value={roleCompany}
            onChange={(e) => setRoleCompany(e.target.value)}
            placeholder="Brand Director, Diplomatico"
            className={FIELD_INPUT_CLASSES}
          />
        </div>

        <div>
          <label htmlFor="review-brand" className={FIELD_LABEL_CLASSES}>
            BRAND
          </label>
          <input
            id="review-brand"
            type="text"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Just the brand name, e.g. Diplomatico"
            className={FIELD_INPUT_CLASSES}
          />
          <p className={FIELD_HELPER_CLASSES}>{LEAVE_REVIEW_BRAND_HELPER}</p>
        </div>

        <div>
          <span id="review-project-type-label" className={FIELD_LABEL_CLASSES}>
            PROJECT TYPE
          </span>
          <div
            role="radiogroup"
            aria-labelledby="review-project-type-label"
            className="flex flex-wrap gap-2"
          >
            {INQUIRE_PROJECT_TYPES.map((type) => {
              const selected = projectType === type
              return (
                <button
                  key={type}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setProjectType(selected ? '' : type)}
                  className={
                    selected
                      ? 'inline-flex items-center rounded-full border-[0.5px] border-transparent bg-[var(--color-accent-primary)] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.10em] text-white'
                      : 'inline-flex items-center rounded-full border-[0.5px] border-[var(--color-surface-card-raised)] bg-transparent px-3.5 py-1.5 font-mono text-[11px] tracking-[0.10em] text-[var(--color-text-muted)] motion-safe:transition-colors hover:border-[var(--color-text-muted)] hover:text-white'
                  }
                >
                  {type}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label htmlFor="review-project" className={FIELD_LABEL_CLASSES}>
            PROJECT NAME
          </label>
          <input
            id="review-project"
            type="text"
            name="project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="Grey Goose Launch 2025"
            className={FIELD_INPUT_CLASSES}
          />
        </div>

        <div>
          <label htmlFor="review-text" className={FIELD_LABEL_CLASSES}>
            REVIEW
          </label>
          <textarea
            id="review-text"
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tell others what working with Nathan was like..."
            rows={5}
            aria-invalid={errors.review ? true : undefined}
            aria-describedby={errors.review ? 'review-text-error' : 'review-text-counter'}
            className={`${FIELD_INPUT_CLASSES} min-h-[120px] resize-y`}
          />
          <div className="mt-1.5 flex items-center justify-between gap-3">
            {errors.review ? (
              <p id="review-text-error" className={FIELD_ERROR_CLASSES}>
                {errors.review}
              </p>
            ) : (
              <span aria-hidden="true" />
            )}
            <span
              id="review-text-counter"
              className={
                reviewOverLimit
                  ? 'font-mono text-[10px] tracking-[0.10em] text-[#ff8080]'
                  : 'font-mono text-[10px] tracking-[0.10em] text-[#666]'
              }
            >
              {reviewLength} / {LEAVE_REVIEW_MAX_LENGTH}
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="review-email" className={FIELD_LABEL_CLASSES}>
            EMAIL <span className="text-[#444]">(private)</span>
          </label>
          <input
            id="review-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'review-email-error' : 'review-email-helper'}
            className={FIELD_INPUT_CLASSES}
          />
          {errors.email ? (
            <p id="review-email-error" className={FIELD_ERROR_CLASSES}>
              {errors.email}
            </p>
          ) : (
            <p id="review-email-helper" className={FIELD_HELPER_CLASSES}>
              {LEAVE_REVIEW_EMAIL_HELPER}
            </p>
          )}
        </div>

        <div>
          {turnstileSiteKey ? (
            <Turnstile
              ref={turnstileRef}
              siteKey={turnstileSiteKey}
              onSuccess={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
              onError={() => setTurnstileToken(null)}
              options={{ theme: 'dark' }}
            />
          ) : (
            <p className={FIELD_ERROR_CLASSES}>
              Turnstile not configured. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY.
            </p>
          )}
          {errors.turnstile && (
            <p className={FIELD_ERROR_CLASSES}>{errors.turnstile}</p>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[9px] tracking-[0.15em] text-[#555]">
            {LEAVE_REVIEW_FORM_FOOT_META}
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent-primary)] px-[22px] py-3 font-body text-[13px] font-medium leading-none text-white motion-safe:transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? LEAVE_REVIEW_SUBMIT_LABEL_SENDING : LEAVE_REVIEW_SUBMIT_LABEL}
          </button>
        </div>
      </div>
    </form>
  )
}
