'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

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
  const [isOpen, setIsOpen] = useState(false)

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
    <div className="pointer-events-none fixed left-1/2 top-4 z-50 w-full max-w-full -translate-x-1/2 px-4 md:px-6">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center md:max-w-max">
        <nav
          className={`pointer-events-auto w-full overflow-hidden rounded-[32px] border bg-white/75 px-3 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-400 ease-out md:min-w-max md:rounded-full md:px-4 ${
            isOpen ? 'py-3' : 'py-2'
          }`}
        >
          <div className="flex min-w-0 items-center justify-between gap-2 md:w-fit md:min-w-max md:justify-start md:gap-3">
            <Link
              aria-label="Go to homepage"
              className="flex-shrink-0 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold tracking-[0.28em] text-black transition"
              href="/"
              onClick={() => setIsOpen(false)}
            >
              <Image
                alt="Logo"
                className="object-contain"
                height={40}
                quality={75}
                src="/img/logo.webp"
                width={40}
              />
            </Link>

            <button
              aria-controls="mobile-nav"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
              className="pointer-events-auto inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-black md:hidden"
              onClick={() => setIsOpen((open) => !open)}
              type="button"
            >
              <span className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 block h-[2px] w-5 origin-center rounded-full bg-current transition-all duration-300 ease-out ${
                    isOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out ${
                    isOpen ? 'scale-x-0 opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] block h-[2px] w-5 origin-center rounded-full bg-current transition-all duration-300 ease-out ${
                    isOpen ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>

            <div className="hidden h-7 w-px bg-black/10 md:block" />

            <div className="hidden items-center gap-1 md:flex">
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
          </div>

          <div
            className={`pointer-events-none overflow-hidden transition-all duration-400 ease-out md:hidden ${
              isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
            }`}
            id="mobile-nav"
          >
            <div
              className={`border-black/10 pt-2 transition-all duration-400 ease-out ${
                isOpen ? 'mt-2 border-t translate-y-0' : 'mt-0 -translate-y-2'
              }`}
            >
              <div className="flex flex-col gap-1 pb-1">
                {items.map((item, index) => (
                  <Link
                    className={`pointer-events-auto rounded-2xl px-4 py-3 text-sm font-medium text-neutral-950 transition-all duration-300 ease-out ${
                      isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                    }`}
                    href={item.href}
                    key={`${item.label}-${item.href}`}
                    onClick={() => setIsOpen(false)}
                    style={{ transitionDelay: isOpen ? `${index * 45}ms` : '0ms' }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
