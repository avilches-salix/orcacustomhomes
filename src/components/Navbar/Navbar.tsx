import Link from 'next/link'

import type { Header, Page } from '@/payload-types'

type NavbarProps = {
  header: Header | null
}

type HeaderNavItem = {
  label?: string | null
  page?: number | Page | null
}

function isPage(page: HeaderNavItem['page']): page is Page {
  return typeof page === 'object' && page !== null
}

export function Navbar({ header }: NavbarProps) {
  const items =
    header?.navItems
      ?.map((item) => {
        if (!item?.label || !isPage(item.page) || !item.page.slug) {
          return null
        }

        return {
          href: item.page.pageType === 'home' ? '/' : `/${item.page.slug}`,
          label: item.label,
        }
      })
      .filter((item): item is { href: string; label: string } => item !== null) ?? []

  return (
    <div className="pointer-events-none sticky top-4 z-50 flex justify-center px-4 pt-4 md:px-6">
      <nav className="pointer-events-auto flex w-fit items-center gap-2 rounded-full border bg-white/75 px-3 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl md:gap-3 md:px-4">
        <Link
          aria-label="Go to homepage"
          className="inline-flex items-center rounded-full  px-4 py-2 text-sm font-semibold tracking-[0.28em] text-black transition "
          href="/"
        >
          <img className='w-10' src="/img/logo.webp" alt="Logo" />
        </Link>

        <div className="h-7 w-px bg-black/10" />

        <div className="flex items-center gap-1">
          {items.map((item) => (
            <Link
              className="rounded-full px-3 py-2 text-sm font-medium text-neutral-950"
              href={item.href}
              key={`${item.label}-${item.href}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
