import { defineField, defineType } from 'sanity'

// v2 brand workflow: brand logos live in /public/images/trusted-by/{slug}.png
// (committed locally for quality control). Sanity stores only the metadata
// (name, slug, order) — no image upload. Slug auto-generates from name and
// must match the local PNG filename. See NATHAN_GUIDE.md for the new-brand
// workflow.
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Auto-generates from Name. Must match the PNG filename in /public/images/trusted-by/.',
      options: { source: 'name', maxLength: 96 },
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
