import type { Media } from '@/payload-types'

type HeroBlockProps = {
  backgroundImage?: number | Media | null
  backgroundType?: 'image' | 'video' | null
  backgroundVideo?: number | Media | null
  subtitle: string
  title: string
}

function isMediaObject(media: number | Media | null | undefined): media is Media {
  return typeof media === 'object' && media !== null
}

export function HeroBlock({
  backgroundImage,
  backgroundType = 'image',
  backgroundVideo,
  subtitle,
  title,
}: HeroBlockProps) {
  const imageMedia = isMediaObject(backgroundImage) && backgroundImage.url ? backgroundImage : null
  const videoMedia = isMediaObject(backgroundVideo) && backgroundVideo.url ? backgroundVideo : null

  if (backgroundType === 'image' && !imageMedia) {
    return null
  }

  if (backgroundType === 'video' && !videoMedia) {
    return null
  }

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-20 text-white md:px-8">
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

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        <h1 className="m-0 text-5xl font-semibold tracking-tight text-balance md:text-7xl md:leading-none">
          {title}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-white/82 md:text-lg">{subtitle}</p>
      </div>
    </section>
  )
}
