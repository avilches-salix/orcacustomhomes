type ServiceArea = {
  id?: string | null
  name?: string | null
}

type ServiceAreasBlockProps = {
  areas?: ServiceArea[] | null
}

const ITEMS_PER_COLUMN = 6

function chunkAreas(areas: string[]) {
  const columns: string[][] = []

  for (let index = 0; index < areas.length; index += ITEMS_PER_COLUMN) {
    columns.push(areas.slice(index, index + ITEMS_PER_COLUMN))
  }

  return columns
}

function HouseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 flex-none text-white"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 10.5 12 4l8.25 6.5v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V10.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9.75 20.25v-5.5a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1v5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

export function ServiceAreasBlock({ areas }: ServiceAreasBlockProps) {
  const normalizedAreas =
    areas?.map((area) => area.name?.trim()).filter((area): area is string => Boolean(area)) ?? []

  if (normalizedAreas.length === 0) {
    return null
  }

  const columns = chunkAreas(normalizedAreas)

  return (
    <section className="px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto flex gap-10 max-w-7xl flex-col items-center space-y-8">
        <h2 className="m-0 text-center text-3xl font-semibold tracking-tight text-balance text-neutral-950 md:text-5xl md:leading-none">
          Areas We Serve
        </h2>

        <div className="flex w-full flex-col gap-8 md:flex-row md:flex-wrap md:justify-center">
          {columns.map((column, columnIndex) => (
            <ul
              className="m-0 w-full space-y-4 p-0 md:w-[240px]"
              key={`service-areas-column-${columnIndex}`}
            >
              {column.map((area, areaIndex) => (
                <li
                  className="flex items-center justify-center gap-3 rounded-2xl bg-och-primary px-2 py-2 text-center text-base leading-7 text-white transition-transform duration-200 ease-out hover:scale-[1.03] md:text-lg"
                  key={`${columnIndex}-${areaIndex}-${area}`}
                >
                  <HouseIcon />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
