import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    plural: 'Heroes',
    singular: 'Hero',
  },
  fields: [
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
    },
    {
      name: 'contentAlignment',
      type: 'select',
      label: 'Content alignment',
      required: true,
      defaultValue: 'center',
      options: [
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Left',
          value: 'left',
        },
      ],
    },
    {
      name: 'backgroundType',
      type: 'select',
      label: 'Background type',
      required: true,
      defaultValue: 'image',
      options: [
        {
          label: 'Image',
          value: 'image',
        },
        {
          label: 'Video',
          value: 'video',
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Background image',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData.backgroundType === 'image',
      },
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      label: 'Background video',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData.backgroundType === 'video',
      },
    },
  ],
}
