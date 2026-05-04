'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { ImageLightbox } from '@/components/Lightbox/ImageLightbox'
import type { CarouselSlide } from '@/types/types'

type CarouselProps = {
  enableLightbox?: boolean
  slides: CarouselSlide[]
}

export function Carousel({ enableLightbox = false, slides }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const showNextImage = useCallback(() => {
    setLightboxIndex((currentIndex) => {
      if (currentIndex === null) {
        return 0
      }

      return (currentIndex + 1) % slides.length
    })
  }, [slides.length])
  const showPreviousImage = useCallback(() => {
    setLightboxIndex((currentIndex) => {
      if (currentIndex === null) {
        return 0
      }

      return (currentIndex - 1 + slides.length) % slides.length
    })
  }, [slides.length])

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  if (slides.length === 0) {
    return null
  }

  return (
    <section className="w-full px-4 py-10 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide, index) => (
                <div className="flex-[0_0_100%]" key={`${slide.src}-${index}`}>
                  <div className="relative h-[55vh] min-h-[320px] w-full overflow-hidden bg-neutral-950 md:min-h-[520px]">
                    {enableLightbox ? (
                      <button
                        className="relative block h-full w-full cursor-zoom-in"
                        onClick={() => setLightboxIndex(index)}
                        type="button"
                      >
                        <Image
                          alt={slide.alt}
                          className="object-cover transition-transform duration-200 ease-out hover:scale-[1.01]"
                          fill
                          priority={index === 0}
                          quality={75}
                          sizes="(max-width: 768px) 100vw, 1280px"
                          src={slide.src}
                        />
                      </button>
                    ) : (
                      <Image
                        alt={slide.alt}
                        className="object-cover"
                        fill
                        priority={index === 0}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, 1280px"
                        src={slide.src}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 md:px-5">
            <button
              aria-label="Slide anterior"
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white transition hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-white/60"
              onClick={scrollPrev}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              aria-label="Siguiente slide"
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white transition hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-white/60"
              onClick={scrollNext}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {scrollSnaps.map((_, index) => {
            const isSelected = index === selectedIndex

            return (
              <button
                aria-label={`Ir al slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${isSelected ? 'w-10 bg-neutral-900' : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'}`}
                key={index}
                onClick={() => scrollTo(index)}
                type="button"
              />
            )
          })}
        </div>
      </div>

      {lightboxIndex !== null ? (
        <ImageLightbox
          images={slides}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNext={slides.length > 1 ? showNextImage : undefined}
          onPrevious={slides.length > 1 ? showPreviousImage : undefined}
        />
      ) : null}
    </section>
  )
}
