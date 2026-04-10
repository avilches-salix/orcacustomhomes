"use client"

import { ContactForm } from '@/components/forms/ContactForm'

type FormSectionBlockProps = {
  eyebrow?: string | null
  formPosition?: 'left' | 'right' | null
  formType?: 'contact' | null
  subtitle: string
  title: string
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

          <div className="max-w-2xl space-y-4">
            <h2 className="m-0 text-4xl font-semibold tracking-tight text-balance text-white md:text-6xl md:leading-none">
              {title}
            </h2>

            <p className="m-0 text-base leading-7 text-white/72 md:text-lg">{subtitle}</p>
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
