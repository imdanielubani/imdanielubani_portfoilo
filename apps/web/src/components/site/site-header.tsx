'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { NavigationItem } from '@du/types'
import { Logo } from '@du/ui'
import { cn } from '@/lib/cn'
import { isActivePath } from '@/lib/nav'
import { ThemeToggle } from '@/components/theme/theme-toggle'

interface SiteHeaderProps {
  items: NavigationItem[]
  isAvailable: boolean
  contactHref?: string
}

const EASE = [0.22, 1, 0.36, 1] as const

export function SiteHeader({ items, isAvailable, contactHref = '/contact' }: SiteHeaderProps) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  const mobileItems: NavigationItem[] = [
    { id: 'm-home', label: 'Home', href: '/' },
    ...items,
    { id: 'm-contact', label: 'Contact', href: contactHref },
  ]

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 md:pt-5">
      <div className="container-du">
        <div
          className={cn(
            'pointer-events-auto flex h-16 items-center justify-between gap-4 rounded-full border px-3 pl-5 transition-[background-color,border-color,box-shadow] duration-500',
            isScrolled || isOpen
              ? 'border-line bg-canvas/80 shadow-card backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
        >
          <Link
            href="/"
            aria-label="imdanielubani, home"
            className="shrink-0 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => {
                const active = isActivePath(pathname, item.href)
                return (
                  <li key={item.id} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative z-10 block rounded-full px-4 py-2 text-[0.92rem] transition-colors',
                        active ? 'text-canvas' : 'text-ink-muted hover:text-ink',
                      )}
                    >
                      {item.label}
                    </Link>
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 380, damping: 32 }
                        }
                      />
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            {isAvailable ? (
              <span className="mr-2 hidden items-center gap-2 font-mono text-[0.7rem] tracking-wider text-ink-muted uppercase xl:inline-flex">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                Available
              </span>
            ) : null}
            <ThemeToggle />
            <Link
              href={contactHref}
              data-magnetic=""
              className="group hidden h-11 items-center gap-2 rounded-full bg-ink px-5 text-[0.92rem] font-medium text-canvas transition-colors hover:bg-accent hover:text-accent-ink sm:inline-flex"
            >
              Let&apos;s talk
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface-2 text-ink lg:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsOpen((open) => !open)}
            >
              {isOpen ? (
                <X className="size-5" aria-hidden />
              ) : (
                <Menu className="size-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="pointer-events-auto fixed inset-x-3 top-[5.25rem] bottom-3 overflow-y-auto rounded-[var(--radius-xl)] border border-line bg-canvas p-6 shadow-float lg:hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {mobileItems.map((item, index) => {
                  const active = isActivePath(pathname, item.href)
                  return (
                    <motion.li
                      key={item.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + index * 0.04, duration: 0.45, ease: EASE }}
                      className="border-b border-line-soft"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className="flex items-center justify-between py-4 text-3xl font-medium tracking-tight"
                      >
                        <span className={active ? 'text-ink' : 'text-ink-muted'}>{item.label}</span>
                        <span className="font-mono text-xs text-ink-subtle">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
