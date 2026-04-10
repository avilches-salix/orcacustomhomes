import { Carousel } from '@/components/Carousel/Carousel'
import type { Media } from '@/payload-types'
import type { CarouselSlide } from '@/types/types'

type CarouselBlockSlide = {
  alt?: string | null
  media?: number | Media | null
}

type CarouselBlockProps = {
  slides?: CarouselBlockSlide[] | null
}

const fallbackSlides: CarouselSlide[] = [
  {
    alt: 'Casa moderna con pileta y grandes ventanales',
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
  },
  {
    alt: 'Fachada de casa suburbana luminosa con jardin frontal',
    src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80',
  },
  {
    alt: 'Living amplio de una casa contemporanea con vista al exterior',
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
  },
]

function isMediaObject(media: number | Media | null | undefined): media is Media {
  return typeof media === 'object' && media !== null
}

export function CarouselBlock({ slides }: CarouselBlockProps) {
  const mappedSlides =
    slides
      ?.map((slide) => {
        if (!isMediaObject(slide.media) || !slide.media.url) {
          return null
        }

        return {
          alt: slide.alt?.trim() || slide.media.alt,
          src: slide.media.url,
        }
      })
      .filter((slide): slide is CarouselSlide => slide !== null) ?? []

  return <Carousel slides={mappedSlides.length > 0 ? mappedSlides : fallbackSlides} />
}
