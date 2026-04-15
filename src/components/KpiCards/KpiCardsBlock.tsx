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
                className="flex w-full flex-col items-center gap-4 rounded-[2rem] border border-black/10 bg-och-primary p-8 md:w-[calc(50%-12px)] xl:w-[calc(25%-16px)]"
                key={item.number + index}
              >
                {iconUrl ? (
                  <img
                    alt={mediaObj.alt || ''}
                    className="h-12 w-12 object-contain"
                    src={iconUrl}
                  />
                ) : null}
                <div className="text-center">
                  <p className="m-0 text-4xl font-semibold tracking-tight text-white">
                    {item.number}
                  </p>
                  <p className="m-0 text-base text-neutral-400">{item.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
