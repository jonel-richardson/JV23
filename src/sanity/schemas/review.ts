import { defineField, defineType } from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Title · Company, e.g. "Brand Director · Grey Goose Caribbean"',
    }),
    defineField({
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Must be a published project',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
      description: 'Max 280 characters — keep it pull-quote sized',
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'For verification only. Never displayed.',
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
