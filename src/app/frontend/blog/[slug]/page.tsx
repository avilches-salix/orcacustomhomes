import config from '@payload-config'
import { getPayload } from 'payload'
import type { Media } from '@/payload-types'

type BlogContentBlock = {
  blockType: 'textBlock' | 'imageBlock'
  id?: string
  text?: string | null
  image?: number | Media | null
  caption?: string | null
}

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
    <main className="min-h-screen bg-och-primary text-white">
      {featuredImageUrl ? (
        <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
          <img
            alt={featuredImageAlt}
            className="h-full w-full object-cover"
            src={featuredImageUrl}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ) : null}

      <article className="mx-auto max-w-3xl px-4 py-20 md:px-8">
        <header className="mb-10">
          <h1 className="m-0 text-4xl font-semibold tracking-tight md:text-5xl">{blog.title}</h1>
        </header>

        {blog.content && blog.content.length > 0 ? (
          <div className="space-y-8">
            {blog.content.map((block, index) => {
              const key = block.id ?? `block-${index}`

              if (block.blockType === 'textBlock' && block.text) {
                return (
                  <div key={key} className="text-lg text-neutral-300">
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
                    <img alt={altText} className="w-full rounded-xl" src={imgUrl} />
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
