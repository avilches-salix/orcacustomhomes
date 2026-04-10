import type { CollectionConfig } from 'payload'

export const Homes: CollectionConfig = {
  slug: 'homes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL de la casa dentro de /our-homes. Ejemplo: modern-lake-house.',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      defaultValue: 'available',
      options: [
        {
          label: 'Available',
          value: 'available',
        },
        {
          label: 'Sold',
          value: 'sold',
        },
        {
          label: 'Under Construction',
          value: 'underConstruction',
        },
      ],
    },
    {
      name: 'details',
      type: 'textarea',
      label: 'Details',
    },
    {
      name: 'direction',
      type: 'text',
      label: 'Direction',
    },
    {
      name: 'neighbour',
      type: 'text',
      label: 'Neighbour',
    },
    {
      name: 'bedrooms',
      type: 'number',
      label: 'Bedrooms',
      min: 0,
    },
    {
      name: 'baths',
      type: 'number',
      label: 'Baths',
      min: 0,
    },
    {
      name: 'sq',
      type: 'number',
      label: 'Sq',
      min: 0,
    },
    {
      name: 'totalsq',
      type: 'number',
      label: 'Total sq',
      min: 0,
    },
    {
      name: 'mainfeatures',
      type: 'array',
      label: 'Main features',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Feature',
          required: true,
        },
      ],
    },
    {
      name: 'mainFeaturesImage',
      type: 'upload',
      label: 'Main features image',
      relationTo: 'media',
    },
    {
      name: 'interestPoints',
      type: 'array',
      label: 'Interest points',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Interest point',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'heroCarousel',
      type: 'array',
      label: 'Hero carousel',
      minRows: 1,
      fields: [
        {
          name: 'media',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt override',
        },
      ],
    },
    {
      name: 'floorPlans',
      type: 'array',
      label: 'Floor plans',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
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
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta title',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta description',
        },
        {
          name: 'ogTitle',
          type: 'text',
          label: 'Open Graph title',
        },
        {
          name: 'ogDescription',
          type: 'textarea',
          label: 'Open Graph description',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Open Graph image',
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
          label: 'No index',
        },
      ],
    },
  ],
}
