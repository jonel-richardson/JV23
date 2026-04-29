import { defineField, defineType } from 'sanity'

export const trustedBy = defineType({
  name: 'trustedBy',
  title: 'Trusted By',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client / Brand Name',
      type: 'string',
      description: 'Used as alt text and screen reader label',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
    }),
  ],
})
