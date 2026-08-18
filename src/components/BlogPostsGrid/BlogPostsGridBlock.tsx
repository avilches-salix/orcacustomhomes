import config from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import Image from 'next/image'

import type { Media } from '@/payload-types'

type BlogPostsGridBlockProps = {
  background?: 'blue' | 'white' | null
  limit?: number | null
  subtitle?: string | null
  title?: string | null
}

function isMediaObject(media: number | Media | null | undefined): media is Media {
  return typeof media === 'object' && media !== null
}

const backgroundStyles = {
  blue: {
    section: 'bg-och-primary',
    title: 'text-white',
    subtitle: 'text-neutral-300',
    card: 'border-white/10 bg-white/5',
    cardTitle: 'text-white group-hover:text-neutral-200',
    cardExtract: 'text-neutral-400',
    empty: 'text-neutral-500',
  },
  white: {
    section: 'bg-white',
    title: 'text-och-primary',
    subtitle: 'text-neutral-600',
    card: 'border-neutral-200 bg-neutral-50',
    cardTitle: 'text-och-primary group-hover:text-neutral-700',
    cardExtract: 'text-neutral-500',
    empty: 'text-neutral-500',
  },
} as const

export async function BlogPostsGridBlock({
  background,
  title,
  subtitle,
  limit,
}: BlogPostsGridBlockProps) {
  const payload = await getPayload({ config })
  const styles = backgroundStyles[background || 'blue']

  const { docs: blogs } = await payload.find({
    collection: 'blogs',
    limit: limit || 100,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-createdAt',
  })

  return (
    <section className={`${styles.section} px-4 py-20 md:px-8`}>
      <div className="mx-auto max-w-7xl mb-10">
        {title ? (
          <h2 className={`m-0 text-4xl font-semibold tracking-tight ${styles.title}`}>{title}</h2>
        ) : null}
        {subtitle ? <p className={`mt-3 text-base ${styles.subtitle}`}>{subtitle}</p> : null}
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap gap-4">
        {blogs.map((blog) => {
          const featuredMedia = isMediaObject(blog.featuredImage) ? blog.featuredImage : null
          const imageUrl = featuredMedia?.url
          const imageAlt = featuredMedia?.alt || blog.title

          return (
            <Link
              className={`group flex w-full flex-col overflow-hidden rounded-[2rem] border ${styles.card} transition-transform duration-200 ease-out hover:scale-[1.02] md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]`}
              href={`/blog/${blog.slug}`}
              key={blog.id}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-800">
                {imageUrl ? (
                  <Image
                    alt={imageAlt}
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                    fill
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    src={imageUrl}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-neutral-500">
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className={`m-0 text-lg font-semibold tracking-tight ${styles.cardTitle}`}>
                  {blog.title}
                </h3>
                {blog.extract ? (
                  <p className={`m-0 line-clamp-3 text-sm ${styles.cardExtract}`}>
                    {blog.extract}
                  </p>
                ) : null}
              </div>
            </Link>
          )
        })}
      </div>

      {blogs.length === 0 ? <p className={styles.empty}>No hay blogs publicados.</p> : null}
    </section>
  )
}
