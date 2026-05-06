import type { Block } from 'payload'

export const HouseGrid: Block = {
  slug: 'houseGrid',
  interfaceName: 'HouseGridBlock',
  labels: {
    plural: 'House grids',
    singular: 'House grid',
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      options: [
        {
          label: 'Completed',
          value: 'sold',
        },
        {
          label: 'Under Construction',
          value: 'underConstruction',
        },
        {
          label: 'Available',
          value: 'available',
        },
      ],
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
    },
  ],
}
