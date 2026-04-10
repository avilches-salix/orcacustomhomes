type TitleAndSubtitleBlockProps = {
  eyebrow?: string | null
  subtitle: string
  title: string
}

export function TitleAndSubtitleBlock({
  eyebrow,
  subtitle,
  title,
}: TitleAndSubtitleBlockProps) {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-8 md:px-8 md:pt-20">
      {eyebrow ? (
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
          {eyebrow}
        </span>
      ) : null}

      <div className="max-w-3xl space-y-4">
        <h1 className="m-0 text-5xl font-semibold tracking-tight text-balance md:text-7xl md:leading-none">
          {title}
        </h1>

        <p className="m-0 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
