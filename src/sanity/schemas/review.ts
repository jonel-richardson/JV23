import { defineField, defineType } from 'sanity'

// Phase 8 schema rewrite. The original review schema (clientName / role /
// reviewText / project-as-required-reference) was designed before public
// submission existed and assumed every review tied to a published Sanity
// Project. Public reviews need broader semantics — NDA work, ongoing
// relationships, off-site projects. New shape supports free-text project
// names, separate brand-for-logo derivation, and a controlled projectType
// vocabulary aligned with the Inquire form's pills. See DESIGN-GUIDELINES
// change log entry of 2026-05-01 for the full rationale.
export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Reviewer\'s name as it should appear on the site.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roleCompany',
      title: 'Role / Company',
      type: 'string',
      description:
        'Combined attribution shown beneath the name, e.g. "Brand Director, Grey Goose Caribbean". Display-only.',
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      description:
        'Brand or organization name only, e.g. "Grey Goose". Used to map the review to a Trusted By logo at /public/images/trusted-by/{slug}.png. Separate from roleCompany so the logo lookup is unambiguous.',
    }),
    defineField({
      name: 'project',
      title: 'Project Name',
      type: 'string',
      description:
        'Free-text project name, e.g. "Grey Goose Launch 2025". Optional context line below the attribution; not tied to a Sanity Project document so off-site / NDA / unpublished work can still be reviewed.',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      description:
        'Used by the /reviews archive filter. Vocabulary mirrors the Inquire form pills.',
      options: {
        list: [
          { title: 'Brand Films', value: 'Brand Films' },
          { title: 'Event Coverage', value: 'Event Coverage' },
          { title: 'Drone Cinematography', value: 'Drone Cinematography' },
          { title: 'Music Videos', value: 'Music Videos' },
          { title: 'Other', value: 'Other' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'review',
      title: 'Review',
      type: 'text',
      description: 'Max 280 characters — keep it pull-quote sized.',
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'For verification only. Never displayed.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Auto-generated from name. Reserved for future review detail pages; unused at launch.',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle ON to publish on the site.',
    }),
  ],
})
