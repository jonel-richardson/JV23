'use client'

import { type FormEvent, useState } from 'react'
import {
  INQUIRE_ERROR_MESSAGE,
  INQUIRE_FORM_FOOT_META,
  INQUIRE_FORM_HEADER_LEFT,
  INQUIRE_FORM_HEADER_RIGHT,
  INQUIRE_HONEYPOT_FIELD,
  INQUIRE_PROJECT_TYPES,
  INQUIRE_SUBMIT_LABEL,
  INQUIRE_SUBMIT_LABEL_SENDING,
  INQUIRE_SUCCESS_BODY,
  INQUIRE_SUCCESS_HEADER,
  type InquireProjectType,
} from '@/lib/constants'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Exported for unit tests — pulls double duty so the regex is the single
// source of truth for both the live form and the test suite.
export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value)
}

interface FieldErrors {
  name?: string
  email?: string
  message?: string
}

const FIELD_INPUT_CLASSES =
  'block w-full rounded-md border-[0.5px] border-[var(--color-surface-card-raised)] bg-[var(--color-bg-base)] px-4 py-[14px] font-body text-[13px] text-white placeholder:text-[#555] motion-safe:transition-colors focus:border-[var(--color-accent-primary)] focus:outline-none'

const FIELD_LABEL_CLASSES =
  'mb-2 block font-mono text-[9px] tracking-[0.15em] text-[var(--color-text-quiet)]'

const FIELD_ERROR_CLASSES =
  'mt-1.5 font-mono text-[10px] tracking-[0.10em] text-[#ff8080]'

// Hand-rolled form (no react-hook-form). Pill single-select with default
// "Brand Films" and no-deselect — clicking the active pill is a no-op so
// projectType is always defined. Honeypot field is positioned off-screen
// at -9999px; any value present at submit means a bot scraped the markup,
// in which case we silently drop the submission and show the success
// state to discourage retries. Real submissions POST to Formspree as
// JSON; the env var resolves at runtime — if it's undefined the fetch
// 404s naturally and we land on the error state.
export default function InquireForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState<InquireProjectType>(
    INQUIRE_PROJECT_TYPES[0],
  )
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submittedName, setSubmittedName] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState(false)

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    if (!name.trim()) next.name = 'Name required.'
    if (!email.trim()) next.email = 'Email required.'
    else if (!isValidEmail(email.trim())) next.email = 'Enter a valid email.'
    if (!message.trim()) next.message = 'Message required.'
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
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? ''
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: email.trim(),
          projectType,
          message: message.trim(),
          _subject: `New inquiry from ${trimmedName} — ${projectType}`,
        }),
      })
      if (!response.ok) {
        throw new Error(`Formspree returned ${response.status}`)
      }
      setSubmittedName(trimmedName)
    } catch (err) {
      console.error('Inquiry submission failed:', err)
      setSubmitError(true)
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
          {INQUIRE_SUCCESS_HEADER}
        </div>
        <h3 className="mb-4 font-display text-[clamp(28px,8cqw,40px)] leading-[0.92] tracking-[0.02em] text-white">
          THANKS,
          <br />
          {submittedName.toUpperCase()}.
        </h3>
        <p className="font-body text-[15px] leading-[1.7] text-[var(--color-text-body)]">
          {INQUIRE_SUCCESS_BODY}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Inquiry form"
      className="rounded-[14px] border-[0.5px] border-[var(--color-surface-card)] bg-[#0a0a0a] p-6 @[1024px]/frame:p-8"
    >
      {/* Header — mono left, mono right, separated by a 0.5px dashed underline. */}
      <div className="mb-5 flex items-center justify-between border-b-[0.5px] border-dashed border-[#222] pb-3.5">
        <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--color-accent-secondary)]">
          {INQUIRE_FORM_HEADER_LEFT}
        </span>
        <span className="font-mono text-[9px] tracking-[0.10em] text-[#444]">
          {INQUIRE_FORM_HEADER_RIGHT}
        </span>
      </div>

      {submitError && (
        <div
          role="alert"
          className="mb-4 rounded-md border-[0.5px] border-[#ff3b3b] bg-[#1a0a0a] px-4 py-3 font-body text-[13px] text-[#ff8080]"
        >
          {INQUIRE_ERROR_MESSAGE}
        </div>
      )}

      <div className="flex flex-col gap-[18px]">
        {/* Honeypot — visually + AT-hidden, tab-skipped. Bots fill any input
           they can scrape; humans never see this one. */}
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
          <label htmlFor="inquire-name" className={FIELD_LABEL_CLASSES}>
            NAME
          </label>
          <input
            id="inquire-name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'inquire-name-error' : undefined}
            className={FIELD_INPUT_CLASSES}
          />
          {errors.name && (
            <p id="inquire-name-error" className={FIELD_ERROR_CLASSES}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="inquire-email" className={FIELD_LABEL_CLASSES}>
            EMAIL
          </label>
          <input
            id="inquire-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'inquire-email-error' : undefined}
            className={FIELD_INPUT_CLASSES}
          />
          {errors.email && (
            <p id="inquire-email-error" className={FIELD_ERROR_CLASSES}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <span id="inquire-project-type-label" className={FIELD_LABEL_CLASSES}>
            PROJECT TYPE
          </span>
          <div
            role="radiogroup"
            aria-labelledby="inquire-project-type-label"
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
                  onClick={() => setProjectType(type)}
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
          <label htmlFor="inquire-message" className={FIELD_LABEL_CLASSES}>
            MESSAGE
          </label>
          <textarea
            id="inquire-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your project, timeline, and budget..."
            rows={4}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? 'inquire-message-error' : undefined
            }
            className={`${FIELD_INPUT_CLASSES} min-h-[100px] resize-y`}
          />
          {errors.message && (
            <p id="inquire-message-error" className={FIELD_ERROR_CLASSES}>
              {errors.message}
            </p>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[9px] tracking-[0.15em] text-[#555]">
            {INQUIRE_FORM_FOOT_META}
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent-primary)] px-[22px] py-3 font-body text-[13px] font-medium leading-none text-white motion-safe:transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? INQUIRE_SUBMIT_LABEL_SENDING : INQUIRE_SUBMIT_LABEL}
          </button>
        </div>
      </div>
    </form>
  )
}
