'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'
import {
  Briefcase,
  ChatCircleDots,
  FileText,
  PenNib,
  Stack,
  User,
  type Icon,
} from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import type { NavigationItem } from '@du/types'
import { LogoMark } from '@du/ui'
import { cn } from '@/lib/cn'
import { isActivePath } from '@/lib/nav'
import { ThemeToggle } from '@/components/theme/theme-toggle'

/** Icons for known routes; CMS pages fall back to a document icon. */
const ROUTE_ICONS: Record<string, Icon> = {
  '/about': User,
  '/projects': PenNib,
  '/experience': Briefcase,
  '/skills': Stack,
  '/resume': FileText,
  '/contact': ChatCircleDots,
}

interface DockProps {
  items: NavigationItem[]
  contactHref?: string
}

export function Dock({ items, contactHref = '/contact' }: DockProps) {
  const pathname = usePathname()
  const reduceMotion = Boolean(useReducedMotion())
  const links: NavigationItem[] = [
    ...items,
    { id: 'dock-contact', label: 'Contact', href: contactHref },
  ]

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 flex-row items-center gap-1 rounded-full border border-line bg-surface-2/90 p-1.5 shadow-float backdrop-blur-xl lg:top-1/2 lg:bottom-auto lg:left-6 lg:translate-x-0 lg:-translate-y-1/2 lg:flex-col lg:rounded-[26px]"
    >
      <DockLink href="/" label="Home" active={pathname === '/'} reduceMotion={reduceMotion}>
        <LogoMark size={26} />
      </DockLink>
      <Divider />
      {links.map((item) => {
        const IconComponent = ROUTE_ICONS[item.href] ?? FileText
        return (
          <DockLink
            key={item.id}
            href={item.href}
            label={item.label}
            active={isActivePath(pathname, item.href)}
            reduceMotion={reduceMotion}
            className={item.href === '/resume' ? 'hidden sm:inline-flex' : undefined}
          >
            <IconComponent aria-hidden weight="fill" className="size-[19px]" />
          </DockLink>
        )
      })}
      <Divider />
      <ThemeToggle className="size-10 border-transparent" />
    </nav>
  )
}

function Divider() {
  return <span aria-hidden className="mx-0.5 h-6 w-px bg-line lg:mx-0 lg:my-0.5 lg:h-px lg:w-6" />
}

interface DockLinkProps {
  href: string
  label: string
  active: boolean
  reduceMotion: boolean
  className?: string
  children: ReactNode
}

function DockLink({ href, label, active, reduceMotion, className, children }: DockLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group/dock relative inline-flex size-10 items-center justify-center rounded-full transition-[color,transform] duration-200 active:scale-[0.92]',
        active ? 'text-accent' : 'text-ink-subtle hover:text-ink',
        className,
      )}
    >
      {active ? (
        <motion.span
          layoutId="dock-active"
          aria-hidden
          className="absolute inset-0 rounded-full bg-accent-soft"
          transition={
            reduceMotion ? { duration: 0 } : { type: 'spring', duration: 0.45, bounce: 0.15 }
          }
        />
      ) : null}
      <span className="relative">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-full mb-3 rounded-full bg-ink px-2.5 py-1 text-xs whitespace-nowrap text-canvas opacity-0 transition-opacity duration-150 group-hover/dock:opacity-100 group-focus-visible/dock:opacity-100 lg:bottom-auto lg:left-full lg:mb-0 lg:ml-3"
      >
        {label}
      </span>
    </Link>
  )
}
