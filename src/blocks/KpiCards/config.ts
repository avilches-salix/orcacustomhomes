import type { Block } from 'payload'

export const KpiCards: Block = {
  slug: 'kpiCards',
  interfaceName: 'KpiCards',
  labels: {
    plural: 'KPI Cards',
    singular: 'KPI Card',
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
      label: 'Description',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      label: 'KPIs',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Icon',
        },
        {
          name: 'number',
          type: 'text',
          required: true,
          label: 'Number',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
      ],
    },
  ],
}
