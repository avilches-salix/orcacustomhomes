import config from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import Image from 'next/image'

import type { Media } from '@/payload-types'

type BlogPostsGridBlockProps = {
  limit?: number | null
  subtitle?: string | null
  title: string
}

function isMediaObject(media: number | Media | null | undefined): media is Media {
  return typeof media === 'object' && media !== null
}

export async function BlogPostsGridBlock({ title, subtitle, limit }: BlogPostsGridBlockProps) {
  const payload = await getPayload({ config })

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
    <section className="bg-och-primary px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl mb-10">
        <h2 className="m-0 text-4xl font-semibold tracking-tight text-white">{title}</h2>
        {subtitle ? <p className="mt-3 text-base text-neutral-300">{subtitle}</p> : null}
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap gap-4">
        {blogs.map((blog) => {
          const featuredMedia = isMediaObject(blog.featuredImage) ? blog.featuredImage : null
          const imageUrl = featuredMedia?.url
          const imageAlt = featuredMedia?.alt || blog.title

          return (
            <Link
              className="group flex w-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition-transform duration-200 ease-out hover:scale-[1.02] md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
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
                <h3 className="m-0 text-lg font-semibold tracking-tight text-white group-hover:text-neutral-200">
                  {blog.title}
                </h3>
                {blog.extract ? (
                  <p className="m-0 line-clamp-3 text-sm text-neutral-400">{blog.extract}</p>
                ) : null}
              </div>
            </Link>
          )
        })}
      </div>

      {blogs.length === 0 ? <p className="text-neutral-500">No hay blogs publicados.</p> : null}
    </section>
  )
}
