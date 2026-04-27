import type { Block } from 'payload'

export const TitleAndSubtitle: Block = {
  slug: 'titleAndSubtitle',
  interfaceName: 'TitleAndSubtitleBlock',
  labels: {
    plural: 'Title and subtitle',
    singular: 'Title and subtitle',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'default',
      label: 'Variant',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Hero',
          value: 'hero',
        },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      required: true,
    },
  ],
}
