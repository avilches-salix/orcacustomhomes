import { Carousel } from '@/blocks/Carousel/config'
import { FormSection } from '@/blocks/FormSection/config'
import { Hero } from '@/blocks/Hero/config'
import { HouseList } from '@/blocks/HouseList/config'
import { ServiceAreas } from '@/blocks/ServiceAreas/config'
import { TextAndContent } from '@/blocks/TextAndContent/config'
import { TitleAndSubtitle } from '@/blocks/TitleAndSubtitle/config'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'pageType', 'updatedAt'],
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
        description: 'URL de la pagina. Ejemplo: nosotros, contacto.',
      },
    },
    {
      name: 'pageType',
      type: 'select',
      required: true,
      defaultValue: 'default',
      label: 'Tipo de pagina',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Home',
          value: 'home',
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      label: 'Secciones',
      blocks: [
        Hero,
        TitleAndSubtitle,
        Carousel,
        FormSection,
        TextAndContent,
        ServiceAreas,
        HouseList,
      ],
      admin: {
        description: 'Aca vas a agregar las secciones de la pagina.',
      },
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
