import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import config from '@payload-config'
import { getPayload } from 'payload'

import { Carousel } from '@/components/Carousel/Carousel'
import { FloorPlanCard } from '@/components/FloorPlan/FloorPlanCard'
import { FormSectionBlock } from '@/components/FormSection/FormSectionBlock'
import { MainFeaturesSection } from '@/components/MainFeatures/MainFeaturesSection'
import type { Home, Media } from '@/payload-types'
import type { CarouselSlide } from '@/types/types'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

type TextItem = {
  id?: string | null
  text?: string | null
}

function isMediaObject(media: number | Media | null | undefined): media is Media {
  return typeof media === 'object' && media !== null
}

async function getHome(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'homes',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return docs[0] ?? null
}

function normalizeList(items?: TextItem[] | null) {
  return (
    items?.map((item) => item.text?.trim()).filter((item): item is string => Boolean(item)) ?? []
  )
}

function normalizeMainFeatureImages(home: Home) {
  return (
    home.mainFeaturesImages
      ?.map((image) => {
        if (!isMediaObject(image) || !image.url) {
          return null
        }

        return {
          alt: image.alt,
          src: image.url,
        }
      })
      .filter((image): image is CarouselSlide => image !== null) ?? []
  )
}

function formatStatus(status: Home['status']) {
  switch (status) {
    case 'underConstruction':
      return 'Under Construction'
    case 'sold':
      return 'Completed Homes'
    case 'available':
    default:
      return 'Available'
  }
}

function getSlides(home: Home): CarouselSlide[] {
  return (
    home.heroCarousel
      ?.map((item) => {
        if (!isMediaObject(item.media) || !item.media.url) {
          return null
        }

        return {
          alt: item.alt?.trim() || item.media.alt,
          src: item.media.url,
        }
      })
      .filter((item): item is CarouselSlide => item !== null) ?? []
  )
}

function InfoCard({ label, value }: { label: string; value?: number | string | null }) {
  if (value === null || value === undefined || value === '') {
    return null
  }

  return (
    <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
      <p className="m-0 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">{value}</p>
    </div>
  )
}

function ListSection({ items, title }: { items: string[]; title: string }) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="space-y-5">
      <h2 className="m-0 text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
        {title}
      </h2>
      <ul className="grid gap-3 p-0 md:grid-cols-2">
        {items.map((item) => (
          <li
            className="list-none rounded-2xl border border-black/8 bg-white px-5 py-4 text-neutral-700 shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const home = await getHome(slug)

  if (!home) {
    return {
      title: 'Home not found',
    }
  }

  const seoImage = isMediaObject(home.seo?.ogImage) ? home.seo.ogImage.url : null

  return {
    title: home.seo?.metaTitle || home.title,
    description: home.seo?.metaDescription || home.details || undefined,
    openGraph: {
      title: home.seo?.ogTitle || home.seo?.metaTitle || home.title,
      description:
        home.seo?.ogDescription || home.seo?.metaDescription || home.details || undefined,
      images: seoImage ? [{ url: seoImage }] : undefined,
    },
    robots: home.seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}

export default async function HomeDetailPage({ params }: PageProps) {
  const { slug } = await params
  const home = await getHome(slug)

  if (!home) {
    notFound()
  }

  const slides = getSlides(home)
  const mainFeatures = normalizeList(home.mainfeatures)
  const mainFeatureImages = normalizeMainFeatureImages(home)
  const interestPoints = normalizeList(home.interestPoints)

  return (
    <main className="min-h-screen bg-stone-50 text-neutral-950">
      <section className="mx-auto max-w-7xl px-4 pt-32 md:px-8 md:pt-36">
        <div className="max-w-4xl space-y-3">
          <span className="inline-flex rounded-full bg-och-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white">
            {formatStatus(home.status)}
          </span>

          <div className="space-y-2">
            <h1 className="m-0 text-4xl font-semibold tracking-tight text-balance md:text-7xl md:leading-none">
              {home.title}
            </h1>
            {home.details ? (
              <p className="m-0 max-w-3xl text-lg leading-8 text-neutral-600">{home.details}</p>
            ) : null}
          </div>
        </div>
      </section>

      {slides.length > 0 ? <Carousel enableLightbox slides={slides} /> : null}

      <section className="mx-auto max-w-7xl space-y-16 px-4 py-8 md:px-8 md:py-12">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <InfoCard label="City" value={home.direction} />
          <InfoCard label="Neighborhood" value={home.neighbour} />
          <InfoCard label="Bedrooms" value={home.bedrooms} />
          <InfoCard label="Baths" value={home.baths} />
          <InfoCard label="SQFT" value={home.sq} />
          <InfoCard label="Lot Size" value={home.totalsq} />
        </div>

        {home.description ? (
          <section className="space-y-5">
            <h2 className="m-0 text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
              Description
            </h2>
            <p className="m-0 max-w-4xl whitespace-pre-line text-base leading-8 text-neutral-700 md:text-lg">
              {home.description}
            </p>
          </section>
        ) : null}

        <MainFeaturesSection images={mainFeatureImages} items={mainFeatures} />
        <ListSection items={interestPoints} title="Interest Points" />

        {home.floorPlans?.length ? (
          <section className="space-y-5">
            <h2 className="m-0 text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
              Floor Plans
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {home.floorPlans.map((plan) => {
                if (!isMediaObject(plan.image) || !plan.image.url) {
                  return null
                }

                return (
                  <FloorPlanCard
                    alt={plan.image.alt}
                    description={plan.description}
                    key={plan.id ?? `${plan.title}-${plan.image.url}`}
                    src={plan.image.url}
                    title={plan.title}
                  />
                )
              })}
            </div>
          </section>
        ) : null}
      </section>

      {home.formTitle && home.formSubtitle ? (
        <FormSectionBlock
          formPosition="right"
          formType="contact"
          subtitle={home.formSubtitle}
          title={home.formTitle}
        />
      ) : null}
    </main>
  )
}
