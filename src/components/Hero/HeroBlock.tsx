import Image from 'next/image'
import type { Media } from '@/payload-types'

type HeroBlockProps = {
  backgroundImage?: number | Media | null
  backgroundType?: 'image' | 'video' | null
  backgroundVideo?: number | Media | null
  contentAlignment?: 'center' | 'left' | null
  subtitle?: string | null
  title: string
}

function isMediaObject(media: number | Media | null | undefined): media is Media {
  return typeof media === 'object' && media !== null
}

export function HeroBlock({
  backgroundImage,
  backgroundType = 'image',
  backgroundVideo,
  contentAlignment = 'center',
  subtitle,
  title,
}: HeroBlockProps) {
  if (!title) return null

  const imageMedia =
    isMediaObject(backgroundImage) && backgroundImage.url ? backgroundImage : null

  const videoMedia =
    isMediaObject(backgroundVideo) && backgroundVideo.url ? backgroundVideo : null

  const isLeftAligned = contentAlignment === 'left'

  if (backgroundType === 'image' && !imageMedia) return null
  if (backgroundType === 'video' && !videoMedia) return null

  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden py-20 text-white md:min-h-[90vh]">
      <div className="absolute inset-0">
        {backgroundType === 'video' && videoMedia ? (
          <video
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            className="h-full w-full object-cover"
            src={videoMedia.url ?? undefined}
          />
        ) : imageMedia ? (
          <Image
            src={imageMedia.url ?? ''}
            alt={title}
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
          />
        ) : null}

        {/* overlay */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div
        className={`relative z-10 mx-auto flex w-full flex-col gap-4 px-4 md:px-8 ${
          isLeftAligned
            ? 'max-w-7xl items-start text-left'
            : 'max-w-4xl items-center text-center'
        }`}
      >
        <h1
          className={`m-0 text-5xl font-semibold tracking-tight text-balance md:text-7xl md:leading-none ${
            isLeftAligned ? 'max-w-3xl' : ''
          }`}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className={`m-0 text-base leading-8 text-white/82 md:text-lg ${
              isLeftAligned ? 'max-w-xl text-balance' : 'max-w-3xl'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}