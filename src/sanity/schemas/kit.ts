import { defineField, defineType } from 'sanity'

// Phase 6: schema simplified to four fields — category + item + accent + order.
// Earlier draft fields (description, image) dropped as unused in the v2
// loadout-terminal design. Item is the gear name (replaces the old `name`
// field via rename). Accent toggles secondary-accent rendering on a row.
export const kit = defineType({
  name: 'kit',
  title: 'Kit',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description:
        'All-caps key shown left of the row, e.g. CAMERA, LENS, DRONE, AUDIO.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'item',
      title: 'Item',
      type: 'string',
      description: 'Gear name shown right of the row, e.g. Sony FX3.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accent',
      title: 'Accent',
      type: 'boolean',
      initialValue: false,
      description: 'Highlight this item with the secondary accent color.',
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
