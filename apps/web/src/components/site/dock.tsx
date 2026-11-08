'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Briefcase,
  ChatCircleDots,
  Hash,
  Moon,
  PenNib,
  Stack,
  Sun,
  Tag,
  TerminalWindow,
  User,
  type Icon,
} from '@phosphor-icons/react'
import { useEffect, type MouseEvent } from 'react'
import type { NavigationItem } from '@du/types'
import { cn } from '@/lib/cn'
import { sectionIdFromHref } from '@/lib/nav'
import { useActiveSection } from '@/lib/use-active-section'
import { scrollToSection } from '@/components/motion/motion-root'
import { useTheme } from '@/components/theme/theme-toggle'

/** Icon keys the CMS can use on side menu items; unknown keys fall back to a hash. */
const ICONS: Record<string, Icon> = {
  user: User,
  'pen-nib': PenNib,
  stack: Stack,
  briefcase: Briefcase,
  terminal: TerminalWindow,
  tag: Tag,
  chat: ChatCircleDots,
}

/** Timing for scrolling to a section named in the URL once it has rendered. */
const HASH_POLL_MS = 100
const HASH_MAX_ATTEMPTS = 40
const HASH_SETTLE_MS = 600

interface DockProps {
  items: NavigationItem[]
}

/** Side menu: each item scrolls to a section of the home page. */
export function Dock({ items }: DockProps) {
  const pathname = usePathname()
  const onHome = pathname === '/'
  const links = items
    .map((item) => ({ item, sectionId: sectionIdFromHref(item.href) }))
    .filter((link): link is { item: NavigationItem; sectionId: string } => link.sectionId !== null)
  const activeId = useActiveSection(
    links.map((link) => link.sectionId),
    onHome,
  )

  const sectionKey = links.map((link) => link.sectionId).join('|')

  // Arriving at "/#skills" (a fresh load or a link from another page): the section may
  // render after this runs and reveals shift the layout, so wait for the section,
  // scroll to it, then correct once more after the layout settles.
  useEffect(() => {
    if (!onHome) return
    const id = sectionIdFromHref(window.location.hash)
    if (!id || !sectionKey.split('|').includes(id)) return
    let attempts = 0
    let timer = window.setTimeout(function waitForSection() {
      if (scrollToSection(id)) {
        timer = window.setTimeout(() => scrollToSection(id), HASH_SETTLE_MS)
      } else if (attempts++ < HASH_MAX_ATTEMPTS) {
        timer = window.setTimeout(waitForSection, HASH_POLL_MS)
      }
    }, HASH_POLL_MS)
    return () => window.clearTimeout(timer)
  }, [onHome, sectionKey])

  function handleClick(event: MouseEvent<HTMLAnchorElement>, sectionId: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    // On the home page scroll in place; elsewhere let the link open the home page at the section.
    if (onHome && scrollToSection(sectionId)) event.preventDefault()
  }

  return (
    <nav
      aria-label="Sections"
      className="group/dock fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-[16px] border border-line bg-surface-2 p-1.5 shadow-[0_0.5px_2px_-1.6px_rgb(0_0_0/0.15),0_4px_16.8px_-3.25px_rgb(0_0_0/0.09)] lg:top-1/2 lg:bottom-auto lg:left-6 lg:translate-x-0 lg:-translate-y-1/2 lg:px-2 lg:py-2.5"
    >
      <ul className="flex flex-row items-center gap-0 sm:gap-1 lg:flex-col lg:items-stretch lg:gap-2">
        {links.map(({ item, sectionId }) => {
          const IconComponent = (item.icon && ICONS[item.icon]) || Hash
          const active = activeId === sectionId
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={active ? 'location' : undefined}
                onClick={(event) => handleClick(event, sectionId)}
                className={cn(
                  'flex size-9 items-center justify-center rounded-[8px] transition-[color,background-color,transform] duration-200 ease-out active:scale-[0.96] sm:size-10 lg:h-10 lg:w-auto lg:justify-start lg:px-2.5',
                  active
                    ? 'bg-accent-soft text-accent'
                    : 'text-ink-subtle hover:bg-accent-soft hover:text-accent focus-visible:bg-accent-soft focus-visible:text-accent',
                )}
              >
                <IconComponent aria-hidden weight="fill" className="size-[18px] shrink-0" />
                <DockLabel>{item.label}</DockLabel>
              </Link>
            </li>
          )
        })}
        <li aria-hidden className="mx-1 h-6 w-px bg-line lg:mx-0 lg:h-px lg:w-auto" />
        <li>
          <ModeButton />
        </li>
      </ul>
    </nav>
  )
}

/** Theme switch styled as the reference "Mode" row: a round icon plus a label. */
function ModeButton() {
  const { theme, next, toggle } = useTheme()
  const ThemeIcon = theme === 'dark' ? Sun : Moon
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={'Switch to ' + next + ' theme'}
      title={'Switch to ' + next + ' theme'}
      className="flex size-9 items-center justify-center rounded-[8px] text-ink-subtle transition-[color,transform] duration-200 ease-out hover:text-ink active:scale-[0.96] sm:size-10 lg:h-10 lg:w-full lg:justify-start lg:px-[7px]"
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-line-strong">
        <ThemeIcon aria-hidden className="size-3.5" />
      </span>
      <DockLabel>Mode</DockLabel>
    </button>
  )
}

/**
 * Label that stays collapsed until the menu is hovered or focused (desktop only),
 * so the menu widens to show every label at once, as in the reference.
 */
function DockLabel({ children }: { children: string }) {
  return (
    <span
      aria-hidden
      className="hidden grid-cols-[0fr] opacity-0 transition-[grid-template-columns,opacity,margin-left] duration-300 ease-[var(--ease-out)] group-focus-within/dock:ml-3 group-focus-within/dock:grid-cols-[1fr] group-focus-within/dock:opacity-100 group-hover/dock:ml-3 group-hover/dock:grid-cols-[1fr] group-hover/dock:opacity-100 motion-reduce:transition-none lg:grid"
    >
      <span className="overflow-hidden text-base whitespace-nowrap">{children}</span>
    </span>
  )
}
