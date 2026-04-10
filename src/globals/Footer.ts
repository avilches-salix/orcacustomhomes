import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation items',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'page',
          type: 'relationship',
          label: 'Page',
          relationTo: 'pages',
          required: true,
        },
      ],
    },
  ],
}
