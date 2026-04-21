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
    <section className="px-4 pt-28 text-center md:px-8 md:text-left">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        {eyebrow ? (
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
            {eyebrow}
          </span>
        ) : null}

        <div className="max-w-3xl">
          <h1 className="m-0 pb-4 text-5xl font-semibold tracking-tight text-balance md:text-7xl md:leading-none">
            {title}
          </h1>

          <p className="m-0 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
