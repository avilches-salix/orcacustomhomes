'use client'

import Image from 'next/image'
import { useEffect } from 'react'

type LightboxImage = {
  alt: string
  src: string
}

type ImageLightboxProps = {
  images: LightboxImage[]
  index: number
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
}

export function ImageLightbox({ images, index, onClose, onNext, onPrevious }: ImageLightboxProps) {
  const image = images[index]

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'ArrowRight' && onNext) {
        onNext()
      }

      if (event.key === 'ArrowLeft' && onPrevious) {
        onPrevious()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onNext, onPrevious])

  if (!image) {
    return null
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 px-4 py-6"
      onClick={onClose}
      role="dialog"
    >
      <button
        aria-label="Close image"
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
        onClick={onClose}
        type="button"
      >
        <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path
            d="m6 6 12 12M18 6 6 18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>

      {images.length > 1 && onPrevious ? (
        <button
          aria-label="Previous image"
          className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
          onClick={(event) => {
            event.stopPropagation()
            onPrevious()
          }}
          type="button"
        >
          <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path
              d="M15 18 9 12l6-6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      ) : null}

      <div
        className="relative h-[88vh] w-[min(100vw-2rem,72rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          alt={image.alt}
          className="rounded-2xl object-contain"
          fill
          quality={75}
          sizes="100vw"
          src={image.src}
        />
      </div>

      {images.length > 1 && onNext ? (
        <button
          aria-label="Next image"
          className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
          onClick={(event) => {
            event.stopPropagation()
            onNext()
          }}
          type="button"
        >
          <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path
              d="m9 6 6 6-6 6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      ) : null}
    </div>
  )
}
