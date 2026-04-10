import type { Block } from 'payload'

export const ServiceAreas: Block = {
  slug: 'serviceAreas',
  interfaceName: 'ServiceAreasBlock',
  labels: {
    plural: 'Service areas',
    singular: 'Service areas',
  },
  fields: [
    {
      name: 'areas',
      type: 'array',
      label: 'Areas',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Area name',
          required: true,
        },
      ],
    },
  ],
}
