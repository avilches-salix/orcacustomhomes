import config from '@payload-config'
import { getPayload } from 'payload'

import { RenderBlocks } from '@/components/RenderBlocks'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      and: [
        {
          pageType: {
            not_equals: 'home',
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

  const page = docs[0]

  if (!page) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 py-20 text-neutral-950 md:px-8">
        <section className="mx-auto max-w-4xl text-center">
          <h1 className="m-0 text-4xl font-semibold tracking-tight md:text-6xl">Page not found</h1>
          <p className="mt-4 text-base leading-7 text-neutral-600 md:text-lg">
            Create this page in Payload or update the navigation item to point to an existing one.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50 text-neutral-950">
      <RenderBlocks blocks={page.layout} />
    </main>
  )
}
