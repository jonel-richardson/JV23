import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Brand', 'Event', 'Music', 'Drone', 'Commercial'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Vimeo or YouTube URL — embed component auto-detects platform',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Show on homepage. Max 3 enforced.',
      validation: (Rule) =>
        Rule.custom(async (featured, context) => {
          if (!featured) return true
          const { getClient, document } = context
          const client = getClient({ apiVersion: '2024-01-01' })
          const publishedId = document?._id?.replace(/^drafts\./, '') ?? ''
          const draftId = `drafts.${publishedId}`
          const count = await client.fetch<number>(
            'count(*[_type == "project" && featured == true && !(_id in [$publishedId, $draftId])])',
            { publishedId, draftId },
          )
          if (count >= 3) {
            return 'Only 3 projects can be featured at a time. Unfeature another project first.'
          }
          return true
        }),
    }),
  ],
})
