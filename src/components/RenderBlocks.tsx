import { CarouselBlock } from '@/components/Carousel/CarouselBlock'
import { FormSectionBlock } from '@/components/FormSection/FormSectionBlock'
import { HeroBlock } from '@/components/Hero/HeroBlock'
import { HouseGridBlock } from '@/components/HouseGrid/HouseGridBlock'
import { ServiceAreasBlock } from '@/components/ServiceAreas/ServiceAreasBlock'
import { TextAndContentBlock } from '@/components/TextAndContent/TextAndContentBlock'
import { TitleAndSubtitleBlock } from '@/components/TitleAndSubtitle/TitleAndSubtitleBlock'
import { BlogPostsGridBlock } from '@/components/BlogPostsGrid/BlogPostsGridBlock'
import { KpiCardsBlock } from '@/components/KpiCards/KpiCardsBlock'
import type { Media } from '@/payload-types'

type HeroLayoutBlock = {
  backgroundImage?: number | Media | null
  backgroundType?: 'image' | 'video' | null
  backgroundVideo?: number | Media | null
  blockType: 'hero'
  id?: string | null
  subtitle?: string | null
  title?: string | null
}

type CarouselLayoutBlock = {
  blockType: 'carousel'
  id?: string | null
  slides?:
    | {
        alt?: string | null
        media?: number | Media | null
      }[]
    | null
}

type TitleAndSubtitleLayoutBlock = {
  blockType: 'titleAndSubtitle'
  eyebrow?: string | null
  id?: string | null
  subtitle?: string | null
  title?: string | null
}

type FormSectionLayoutBlock = {
  blockType: 'formSection'
  eyebrow?: string | null
  formPosition?: 'left' | 'right' | null
  formType?: 'contact' | null
  id?: string | null
  subtitle?: string | null
  title?: string | null
}

type TextAndContentLayoutBlock = {
  blockType: 'textAndContent'
  eyebrow?: string | null
  id?: string | null
  image?: number | Media | null
  imagePosition?: 'left' | 'right' | null
  subtitle?: string | null
  title?: string | null
}

type ServiceAreasLayoutBlock = {
  blockType: 'serviceAreas'
  areas?:
    | {
        id?: string | null
        name?: string | null
      }[]
    | null
  id?: string | null
}

type HouseGridLayoutBlock = {
  blockType: 'houseGrid'
  id?: string | null
  status?: 'sold' | 'underConstruction' | 'available' | null
  subtitle?: string | null
  title?: string | null
}

type BlogPostsGridLayoutBlock = {
  blockType: 'blogPostsGrid'
  id?: string | null
  limit?: number | null
  subtitle?: string | null
  title?: string | null
}

type KpiCardsLayoutBlock = {
  blockType: 'kpiCards'
  eyebrow?: string | null
  id?: string | null
  items?:
    | {
        icon?: number | Media | null
        label?: string | null
        number?: string | null
      }[]
    | null
  subtitle?: string | null
  title?: string | null
}

type LayoutBlock =
  | HeroLayoutBlock
  | CarouselLayoutBlock
  | TitleAndSubtitleLayoutBlock
  | FormSectionLayoutBlock
  | TextAndContentLayoutBlock
  | ServiceAreasLayoutBlock
  | HouseGridLayoutBlock
  | BlogPostsGridLayoutBlock
  | KpiCardsLayoutBlock

type RenderBlocksProps = {
  blocks?: LayoutBlock[] | null
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return blocks.map((block, index) => {
    const key = block.id ?? `${block.blockType}-${index}`

    switch (block.blockType) {
      case 'hero': {
        if (!block.title || !block.subtitle) {
          return null
        }

        return (
          <HeroBlock
            backgroundImage={block.backgroundImage}
            backgroundType={block.backgroundType}
            backgroundVideo={block.backgroundVideo}
            key={key}
            subtitle={block.subtitle}
            title={block.title}
          />
        )
      }

      case 'titleAndSubtitle': {
        if (!block.title || !block.subtitle) {
          return null
        }

        return (
          <TitleAndSubtitleBlock
            eyebrow={block.eyebrow}
            key={key}
            subtitle={block.subtitle}
            title={block.title}
          />
        )
      }

      case 'carousel':
        return <CarouselBlock key={key} slides={block.slides} />

      case 'formSection': {
        if (!block.title || !block.subtitle) {
          return null
        }

        return (
          <FormSectionBlock
            eyebrow={block.eyebrow}
            formPosition={block.formPosition}
            formType={block.formType}
            key={key}
            subtitle={block.subtitle}
            title={block.title}
          />
        )
      }

      case 'textAndContent': {
        if (!block.title || !block.subtitle || !block.image) {
          return null
        }

        return (
          <TextAndContentBlock
            eyebrow={block.eyebrow}
            image={block.image}
            imagePosition={block.imagePosition}
            key={key}
            subtitle={block.subtitle}
            title={block.title}
          />
        )
      }

      case 'serviceAreas':
        return <ServiceAreasBlock areas={block.areas} key={key} />

      case 'houseGrid':
        return (
          <HouseGridBlock
            key={key}
            status={block.status ?? 'available'}
            subtitle={block.subtitle}
            title={block.title ?? ''}
          />
        )

      case 'blogPostsGrid':
        return (
          <BlogPostsGridBlock
            key={key}
            limit={block.limit}
            subtitle={block.subtitle}
            title={block.title ?? ''}
          />
        )

      case 'kpiCards':
        return (
          <KpiCardsBlock
            eyebrow={block.eyebrow}
            items={block.items ?? []}
            subtitle={block.subtitle}
            title={block.title ?? ''}
          />
        )

      default:
        return null
    }
  })
}
