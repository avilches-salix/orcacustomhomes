import type { Media } from '@/payload-types'

type HeroBlockProps = {
  backgroundImage?: number | Media | null
  contentAlignment?: 'center' | 'left' | null
  backgroundType?: 'image' | 'video' | null
  backgroundVideo?: number | Media | null
  subtitle?: string | null
  title: string
}

function isMediaObject(media: number | Media | null | undefined): media is Media {
  return typeof media === 'object' && media !== null
}

export function HeroBlock({
  backgroundImage,
  contentAlignment = 'center',
  backgroundType = 'image',
  backgroundVideo,
  subtitle,
  title,
}: HeroBlockProps) {
  if (!title) {
    return null
  }
  const imageMedia = isMediaObject(backgroundImage) && backgroundImage.url ? backgroundImage : null
  const videoMedia = isMediaObject(backgroundVideo) && backgroundVideo.url ? backgroundVideo : null

  if (backgroundType === 'image' && !imageMedia) {
    return null
  }

  if (backgroundType === 'video' && !videoMedia) {
    return null
  }

  const isLeftAligned = contentAlignment === 'left'

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-20 text-white">
      <div className="absolute inset-0">
        {backgroundType === 'video' && videoMedia ? (
          <video
            autoPlay
            className="h-full w-full object-cover"
            loop
            muted
            playsInline
            src={videoMedia.url ?? undefined}
          />
        ) : imageMedia ? (
          <img
            alt={imageMedia.alt}
            className="h-full w-full object-cover"
            src={imageMedia.url ?? undefined}
          />
        ) : null}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div
        className={`relative z-10 mx-auto flex w-full flex-col gap-4 px-4 md:px-8 ${
          isLeftAligned ? 'max-w-7xl items-start text-left' : 'max-w-4xl items-center text-center'
        }`}
      >
        <h1
          className={`m-0 text-5xl font-semibold tracking-tight text-balance md:text-7xl md:leading-none ${
            isLeftAligned ? 'max-w-3xl' : ''
          }`}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            className={`m-0 text-base leading-8 text-white/82 md:text-lg ${
              isLeftAligned ? 'max-w-xl text-balance' : 'max-w-3xl'
            }`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  )
}
