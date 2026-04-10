import React from 'react'

import config from '@payload-config'
import { getPayload } from 'payload'

import { RenderBlocks } from '@/components/RenderBlocks'

import './styles.css'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      pageType: {
        equals: 'home',
      },
    },
  })

  const homePage = docs[0]

  return (
    <main className="min-h-screen bg-stone-50 text-neutral-950">
      {homePage?.layout?.length ? (
        <RenderBlocks blocks={homePage.layout} />
      ) : (
        <section className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-20 text-center md:px-8">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
            Payload CMS
          </span>
          <h1 className="m-0 text-4xl font-semibold tracking-tight md:text-6xl">
            Crea una pagina Home en el admin para empezar.
          </h1>
          <p className="m-0 text-base leading-7 text-neutral-600 md:text-lg">
            Asignale el tipo de pagina `Home` y agrega los bloques `Title and subtitle` y `Carousel`
            para ver el contenido renderizado aca.
          </p>
        </section>
      )}
    </main>
  )
}
