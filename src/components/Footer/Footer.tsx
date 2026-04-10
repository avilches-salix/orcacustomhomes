import Link from 'next/link'

import type { Footer, Page } from '@/payload-types'

type FooterProps = {
  footer: Footer | null
}

type NavItem = {
  href: string
  label: string
}

function isPage(page: number | Page | null | undefined): page is Page {
  return typeof page === 'object' && page !== null
}

function getPageHref(page: number | Page | null | undefined) {
  if (!isPage(page) || !page.slug) {
    return null
  }

  return page.pageType === 'home' ? '/' : `/${page.slug}`
}

function getNavItems(footer: Footer | null): NavItem[] {
  return (
    footer?.navItems
      ?.map((item) => {
        const href = getPageHref(item.page)

        if (!item?.label || !href) {
          return null
        }

        return {
          href,
          label: item.label,
        }
      })
      .filter((item): item is NavItem => item !== null) ?? []
  )
}

export function Footer({ footer }: FooterProps) {
  const navItems = getNavItems(footer)

  if (navItems.length === 0) {
    return null
  }

  return (
    <footer className="bg-stone-200 text-neutral-950 py-4">
      <div className="px-6">
        <section className="w-full rounded-2xl bg-och-primary px-8 py-8 text-white shadow-[0_24px_80px_rgba(14,23,45,0.18)] md:px-12 md:py-10">
          <div className="flex w-full flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex shrink-0 items-center gap-4">
              <img alt="Orca Custom Homes logo" className="w-12" src="/img/logo.webp" />
              <span className="text-lg font-semibold tracking-[0.08em] text-white">
                Orca Custom Homes
              </span>
            </div>

            <nav
              aria-label="Footer navigation"
              className="ml-auto flex flex-wrap items-center gap-x-6 gap-y-3 md:justify-end"
            >
              {navItems.map((item) => (
                <Link
                  className="text-sm font-medium text-white/82 no-underline transition-colors duration-200 hover:text-white"
                  href={item.href}
                  key={`${item.label}-${item.href}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </div>
    </footer>
  )
}
