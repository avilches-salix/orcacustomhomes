import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titulo',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug',
      admin: {
        description: 'URL del blog. Ejemplo: mi-primer-blog',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen principal',
    },
    {
      name: 'extract',
      type: 'textarea',
      label: 'Extracto',
      admin: {
        description: 'Texto corto que aparece en la grilla de blogs.',
      },
    },
    {
      name: 'content',
      type: 'blocks',
      required: true,
      label: 'Contenido',
      blocks: [
        {
          slug: 'textBlock',
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
              label: 'Texto',
            },
          ],
        },
        {
          slug: 'imageBlock',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Imagen',
            },
            {
              name: 'caption',
              type: 'text',
              label: 'Caption',
            },
          ],
        },
      ],
      admin: {
        description: 'Agrega bloques de texto o imagen y ordenalos arrastrando.',
      },
    },
  ],
}
