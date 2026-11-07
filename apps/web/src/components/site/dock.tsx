'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Briefcase,
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
import type { MouseEvent } from 'react'
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
}

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

  function handleClick(event: MouseEvent<HTMLAnchorElement>, sectionId: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    // On the home page scroll in place; elsewhere let the link open the home page at the section.
    if (onHome && scrollToSection(sectionId)) event.preventDefault()
  }

  return (
    <nav
      aria-label="Sections"
      className="group/dock fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-[16px] border border-line bg-surface-2 px-2 py-2.5 shadow-[0_0.5px_2px_-1.6px_rgb(0_0_0/0.15),0_4px_16.8px_-3.25px_rgb(0_0_0/0.09)] lg:top-1/2 lg:bottom-auto lg:left-6 lg:translate-x-0 lg:-translate-y-1/2"
    >
      <ul className="flex flex-row items-center gap-2 lg:flex-col lg:items-stretch">
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
                  'flex h-10 items-center justify-center rounded-[8px] px-2.5 transition-[color,background-color,transform] duration-200 ease-out active:scale-[0.96] lg:justify-start',
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
        <li aria-hidden className="h-6 w-px bg-line lg:h-px lg:w-auto" />
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
      className="flex h-10 w-full items-center justify-center rounded-[8px] px-[7px] text-ink-subtle transition-[color,transform] duration-200 ease-out hover:text-ink active:scale-[0.96] lg:justify-start"
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
