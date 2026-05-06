'use client'

import { ContactForm } from '@/components/forms/ContactForm'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type FormSectionBlockProps = {
  eyebrow?: string | null
  formPosition?: 'left' | 'right' | null
  formType?: 'contact' | null
  subtitle: SerializedEditorState | string
  title: string
}

function isRichText(value: unknown): value is SerializedEditorState {
  return typeof value === 'object' && value !== null && 'root' in (value as object)
}

function renderForm(formType: FormSectionBlockProps['formType']) {
  switch (formType) {
    case 'contact':
    default:
      return <ContactForm />
  }
}

export function FormSectionBlock({
  eyebrow,
  formPosition = 'right',
  formType = 'contact',
  subtitle,
  title,
}: FormSectionBlockProps) {
  const textOrder = formPosition === 'left' ? 'md:order-2' : 'md:order-1'
  const formOrder = formPosition === 'left' ? 'md:order-1' : 'md:order-2'

  return (
    <section className="bg-[#0e172d] px-4 py-12 md:px-8 md:py-20 ">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:gap-16">
        <div className={`space-y-5 ${textOrder}`}>
          {eyebrow ? (
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/55">
              {eyebrow}
            </span>
          ) : null}

          <div className="flex max-w-2xl flex-col gap-2">
            <h2 className="m-0 text-4xl font-semibold tracking-tight text-balance text-white md:text-6xl md:leading-none">
              {title}
            </h2>

            <div className="prose prose-base max-w-none text-white/72 prose-p:m-0 prose-p:leading-7 prose-li:my-1 prose-ul:my-0 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-0 prose-ol:list-decimal prose-ol:pl-6 md:prose-lg">
              {isRichText(subtitle) ? <RichText data={subtitle} /> : <p>{subtitle}</p>}
            </div>
          </div>
        </div>

        <div className={formOrder}>
          <div className="rounded-[2rem] border border-black/10 bg-stone-100/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-sm md:p-8">
            {renderForm(formType)}
          </div>
        </div>
      </div>
    </section>
  )
}
