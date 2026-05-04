import Image from 'next/image'

import type { Media } from '@/payload-types'

type KpiCardItem = {
  icon?: number | Media | null
  number?: string | null
  label?: string | null
}

type KpiCardsBlockProps = {
  eyebrow?: string | null
  items?: KpiCardItem[]
  subtitle?: string | null
  title?: string | null
}

function isMediaObject(media: number | Media | null | undefined): media is Media {
  return typeof media === 'object' && media !== null
}

export function KpiCardsBlock({ eyebrow, title, subtitle, items }: KpiCardsBlockProps) {
  if (!title) return null

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="space-y-2">
          {eyebrow ? (
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="m-0 text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
            {title}
          </h2>
          {subtitle ? <p className="m-0 text-lg leading-8 text-neutral-600">{subtitle}</p> : null}
        </div>

        <div className="flex flex-wrap gap-4">
          {items?.map((item, index) => {
            if (!item?.number || !item?.label) return null

            const mediaObj = isMediaObject(item.icon) ? item.icon : null
            const iconUrl = mediaObj?.url

            return (
              <div
                className="group relative flex w-full flex-col items-center gap-6 rounded-[2rem] bg-och-primary p-10 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:w-[calc(50%-12px)] xl:w-[calc(25%-16px)]"
                key={item.number + index}
              >
                {iconUrl ? (
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                    <Image
                      alt={mediaObj.alt || ''}
                      className="object-contain p-3"
                      fill
                      quality={75}
                      sizes="64px"
                      src={iconUrl}
                    />
                  </div>
                ) : null}

                <div className="text-center">
                  <p className="m-0 text-5xl font-bold tracking-tight text-white">{item.number}</p>
                  <p className="m-0 mt-1 text-sm font-medium uppercase tracking-widest text-white/70">
                    {item.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
