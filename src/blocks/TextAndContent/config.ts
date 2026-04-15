import type { Block } from 'payload'

export const TextAndContent: Block = {
  slug: 'textAndContent',
  interfaceName: 'TextAndContentBlock',
  labels: {
    plural: 'Text and content',
    singular: 'Text and content',
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
      type: 'richText',
      label: 'Content',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image position',
      defaultValue: 'right',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
      required: true,
    },
  ],
}
