import { CarouselBlock } from '@/components/Carousel/CarouselBlock'
import { FormSectionBlock } from '@/components/FormSection/FormSectionBlock'
import { HouseListBlock } from '@/components/HouseList/HouseListBlock'
import { ServiceAreasBlock } from '@/components/ServiceAreas/ServiceAreasBlock'
import { TextAndContentBlock } from '@/components/TextAndContent/TextAndContentBlock'
import { TitleAndSubtitleBlock } from '@/components/TitleAndSubtitle/TitleAndSubtitleBlock'
import type { Media } from '@/payload-types'

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

type HouseListLayoutBlock = {
  blockType: 'houseList'
  id?: string | null
}

type LayoutBlock =
  | CarouselLayoutBlock
  | TitleAndSubtitleLayoutBlock
  | FormSectionLayoutBlock
  | TextAndContentLayoutBlock
  | ServiceAreasLayoutBlock
  | HouseListLayoutBlock

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

      case 'houseList':
        return <HouseListBlock key={key} />

      default:
        return null
    }
  })
}
