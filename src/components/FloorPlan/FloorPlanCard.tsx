'use client'

import { useCallback, useState } from 'react'

import { ImageLightbox } from '@/components/Lightbox/ImageLightbox'

type FloorPlanCardProps = {
  alt: string
  description?: string | null
  src: string
  title: string
}

export function FloorPlanCard({ alt, description, src, title }: FloorPlanCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <article className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.05)]">
        <button
          className="block w-full cursor-zoom-in bg-stone-100 p-6"
          onClick={open}
          type="button"
        >
          <img
            alt={alt}
            className="w-full rounded-2xl transition-transform duration-200 ease-out hover:scale-[1.01]"
            src={src}
          />
        </button>
        <div className="space-y-3 px-6 py-5">
          <h3 className="m-0 text-xl font-semibold tracking-tight text-neutral-950">{title}</h3>
          {description ? (
            <p className="m-0 whitespace-pre-line text-sm leading-7 text-neutral-600 md:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </article>

      {isOpen ? <ImageLightbox images={[{ alt, src }]} index={0} onClose={close} /> : null}
    </>
  )
}
