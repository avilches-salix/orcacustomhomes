import type { Block } from 'payload'

export const BlogPostsGrid: Block = {
  slug: 'blogPostsGrid',
  interfaceName: 'BlogPostsGridBlock',
  labels: {
    plural: 'Blog posts grids',
    singular: 'Blog posts grid',
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
      name: 'limit',
      type: 'number',
      label: 'Cantidad de posts',
      admin: {
        description: 'Cantidad maxima de blogs a mostrar. Dejar vacio para mostrar todos.',
      },
    },
  ],
}
