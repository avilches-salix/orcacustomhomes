import config from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'
import type { Media } from '@/payload-types'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

function isMediaObject(media: number | Media | null | undefined): media is Media {
  return typeof media === 'object' && media !== null
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'blogs',
    limit: 1,
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
        {
          slug: {
            equals: slug,
          },
        },
      ],
    },
  })

  const blog = docs[0]

  if (!blog) {
    return (
      <main className="min-h-screen bg-och-primary px-4 py-20 text-white md:px-8">
        <section className="mx-auto max-w-4xl">
          <h1 className="m-0 text-4xl font-semibold tracking-tight md:text-6xl">
            Blog no encontrado
          </h1>
          <p className="mt-4 text-base leading-7 text-neutral-400 md:text-lg">
            Este blog no existe o no esta publicado.
          </p>
        </section>
      </main>
    )
  }

  const featuredMedia = isMediaObject(blog.featuredImage) ? blog.featuredImage : null
  const featuredImageUrl = featuredMedia?.url
  const featuredImageAlt = featuredMedia?.alt || blog.title

  return (
    <main className="min-h-screen bg-stone-50 text-neutral-950">
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          {featuredImageUrl ? (
            <Image
              alt={featuredImageAlt}
              className="object-cover"
              fill
              priority
              quality={75}
              sizes="100vw"
              src={featuredImageUrl}
            />
          ) : (
            <div className="h-full w-full bg-neutral-200" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-4 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto max-w-7xl">
            <h1 className="m-0 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl md:leading-none">
              {blog.title}
            </h1>
            {blog.extract ? (
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                {blog.extract}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-20">
        {blog.content && blog.content.length > 0 ? (
          <div className="space-y-8">
            {blog.content.map((block, index) => {
              const key = block.id ?? `block-${index}`

              if (block.blockType === 'textBlock' && block.text) {
                return (
                  <div key={key} className="text-lg text-neutral-700">
                    {block.text.split('\n').map((line, i) => {
                      if (line.trim() === '') {
                        return <br key={i} />
                      }
                      return (
                        <p key={i} className="m-0 mb-4 last:mb-0">
                          {line}
                        </p>
                      )
                    })}
                  </div>
                )
              }

              if (block.blockType === 'imageBlock') {
                const mediaObj = isMediaObject(block.image) ? block.image : null

                if (!mediaObj) {
                  return null
                }

                const imgUrl = mediaObj.url ?? ''
                const altText = block.caption || mediaObj.alt || ''

                return (
                  <figure key={key} className="my-8">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                      <Image
                        alt={altText}
                        className="object-cover"
                        fill
                        quality={75}
                        sizes="(max-width: 768px) 100vw, 768px"
                        src={imgUrl}
                      />
                    </div>
                    {block.caption ? (
                      <figcaption className="mt-2 text-sm text-neutral-500">
                        {block.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                )
              }

              return null
            })}
          </div>
        ) : null}
      </article>
    </main>
  )
}
