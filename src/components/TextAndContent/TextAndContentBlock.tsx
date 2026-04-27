import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type TextAndContentBlockProps = {
  eyebrow?: string | null
  image?: number | Media | null
  imagePosition?: 'left' | 'right' | null
  subtitle?: SerializedEditorState | string | null
  title: string
}

function isMediaObject(image: TextAndContentBlockProps['image']): image is Media {
  return typeof image === 'object' && image !== null
}

function isRichText(value: unknown): value is SerializedEditorState {
  return typeof value === 'object' && value !== null && 'root' in (value as object)
}

export function TextAndContentBlock({
  eyebrow,
  image,
  imagePosition = 'right',
  subtitle,
  title,
}: TextAndContentBlockProps) {
  if (!isMediaObject(image) || !image.url) {
    return null
  }

  const textOrder = imagePosition === 'left' ? 'md:order-2' : 'md:order-1'
  const imageOrder = imagePosition === 'left' ? 'md:order-1' : 'md:order-2'

  return (
    <section className="px-4 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div className={`space-y-5 ${textOrder}`}>
          {eyebrow ? (
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
              {eyebrow}
            </span>
          ) : null}

          <div className="max-w-2xl space-y-4">
            <h2 className="m-0 text-2xl font-semibold tracking-tight text-balance text-neutral-950 md:text-3xl md:leading-none pb-4">
              {title}
            </h2>

            {subtitle ? (
              <div className="prose prose-base max-w-none text-neutral-600">
                {isRichText(subtitle) ? <RichText data={subtitle} /> : <p>{subtitle}</p>}
              </div>
            ) : null}
          </div>
        </div>

        <div className={imageOrder}>
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-stone-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <img
              alt={image.alt}
              className="h-[420px] w-full object-cover md:h-[560px]"
              src={image.url}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
