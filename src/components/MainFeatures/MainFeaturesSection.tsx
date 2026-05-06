'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'

import { ImageLightbox } from '@/components/Lightbox/ImageLightbox'
import type { CarouselSlide } from '@/types/types'

type MainFeaturesSectionProps = {
  images: CarouselSlide[]
  items: string[]
}

export function MainFeaturesSection({ images, items }: MainFeaturesSectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const showNextImage = useCallback(() => {
    setLightboxIndex((currentIndex) => {
      if (currentIndex === null) {
        return 0
      }

      return (currentIndex + 1) % images.length
    })
  }, [images.length])
  const showPreviousImage = useCallback(() => {
    setLightboxIndex((currentIndex) => {
      if (currentIndex === null) {
        return 0
      }

      return (currentIndex - 1 + images.length) % images.length
    })
  }, [images.length])

  if (items.length === 0) {
    return null
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="rounded-[2rem] border border-black/8 bg-white p-4 shadow-[0_18px_45px_rgba(0,0,0,0.05)] md:p-6">
        {images.length > 0 ? (
          <div className={images.length === 1 ? 'grid' : 'grid gap-4 md:grid-cols-2'}>
            {images.map((image, index) => (
              <button
                aria-label={`Open main feature image ${index + 1}`}
                className={
                  images.length === 1
                    ? 'relative block min-h-[320px] cursor-zoom-in overflow-hidden rounded-2xl bg-stone-100 md:min-h-[520px]'
                    : 'relative block min-h-[260px] cursor-zoom-in overflow-hidden rounded-2xl bg-stone-100 md:min-h-[360px]'
                }
                key={`${image.src}-${index}`}
                onClick={() => setLightboxIndex(index)}
                type="button"
              >
                <Image
                  alt={image.alt}
                  className="object-contain transition-transform duration-200 ease-out hover:scale-[1.01]"
                  fill
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 28vw"
                  src={image.src}
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[320px] items-center justify-center bg-stone-100 px-6 text-center text-neutral-500">
            Add main features images in the CMS to display them here.
          </div>
        )}
      </div>

      <div className="space-y-5">
        <h2 className="m-0 text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
          Main Features
        </h2>
        <ul className="space-y-3 p-0">
          {items.map((item) => (
            <li
              className="list-none rounded-2xl border border-black/8 bg-white px-5 py-4 text-neutral-700 shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {lightboxIndex !== null ? (
        <ImageLightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNext={images.length > 1 ? showNextImage : undefined}
          onPrevious={images.length > 1 ? showPreviousImage : undefined}
        />
      ) : null}
    </section>
  )
}
