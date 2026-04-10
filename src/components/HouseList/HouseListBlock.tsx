import Link from 'next/link'

import config from '@payload-config'
import { getPayload } from 'payload'

import type { Home, Media } from '@/payload-types'

function isMediaObject(media: number | Media | null | undefined): media is Media {
  return typeof media === 'object' && media !== null
}

function formatStatus(status: Home['status']) {
  switch (status) {
    case 'sold':
      return 'Sold'
    case 'underConstruction':
      return 'Under Construction'
    case 'available':
    default:
      return 'Available'
  }
}

function getStatusClasses(status: Home['status']) {
  switch (status) {
    case 'sold':
      return 'bg-neutral-900 text-white'
    case 'underConstruction':
      return 'bg-amber-100 text-amber-900'
    case 'available':
    default:
      return 'bg-emerald-100 text-emerald-900'
  }
}

function getCoverImage(home: Home) {
  const cover = home.heroCarousel?.find((item) => isMediaObject(item.media) && item.media.url)

  if (!cover || !isMediaObject(cover.media) || !cover.media.url) {
    return null
  }

  return {
    alt: cover.alt?.trim() || cover.media.alt,
    src: cover.media.url,
  }
}

export async function HouseListBlock() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'homes',
    limit: 100,
    sort: '-updatedAt',
  })

  if (docs.length === 0) {
    return null
  }

  return (
    <section className="px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-6">
        {docs.map((home) => {
          const image = getCoverImage(home)

          return (
            <Link
              className="group flex w-full flex-col overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.05)] transition-transform duration-200 ease-out hover:scale-[1.02] md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
              href={`/our-homes/${home.slug}`}
              key={home.id}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                {image ? (
                  <img
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                    src={image.src}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-6 text-center text-neutral-500">
                    Add a hero image in the home entry to display it here.
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-2 p-4" >
                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${getStatusClasses(home.status)}`}
                  >
                    {formatStatus(home.status)}
                  </span>
                </div>

                <h3 className="m-0 text-2xl font-semibold tracking-tight text-neutral-950">
                  {home.title}
                </h3>

                <p className="m-0 text-sm leading-6 text-neutral-600 md:text-base">
                  Bedrooms: {home.bedrooms ?? '-'} | Baths: {home.baths ?? '-'}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
