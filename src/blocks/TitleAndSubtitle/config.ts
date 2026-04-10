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
