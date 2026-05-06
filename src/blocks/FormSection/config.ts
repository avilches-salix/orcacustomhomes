import type { Block } from 'payload'

export const FormSection: Block = {
  slug: 'formSection',
  interfaceName: 'FormSectionBlock',
  labels: {
    plural: 'Form sections',
    singular: 'Form section',
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
      label: 'Subtitle',
      required: true,
    },
    {
      name: 'formType',
      type: 'select',
      label: 'Form type',
      defaultValue: 'contact',
      options: [
        {
          label: 'Contact',
          value: 'contact',
        },
      ],
      required: true,
    },
    {
      name: 'formPosition',
      type: 'select',
      label: 'Form position',
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
