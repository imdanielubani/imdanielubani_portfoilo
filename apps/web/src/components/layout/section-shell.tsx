import type { ReactNode } from 'react'
import type { SectionSettings } from '@du/schemas'
import { cn } from '@/lib/cn'

/*
 * Every section lives inside the framed column and is separated by a hairline,
 * like the reference. The page keeps one theme: "teal" and "ink" backgrounds
 * from the CMS render as a tinted surface rather than a dark block.
 */

function backgroundClass(background: SectionSettings['background'] | undefined): string {
  if (background === 'surface' || background === 'teal' || background === 'ink')
    return 'bg-surface/50'
  return ''
}

function spacingClass(spacing: SectionSettings['spacing'] | undefined): string {
  if (spacing === 'none') return 'py-0'
  if (spacing === 'sm') return 'py-10 md:py-14'
  if (spacing === 'md') return 'py-14 md:py-20'
  return 'py-[var(--section-y)]'
}

interface SectionShellProps {
  settings?: Partial<SectionSettings>
  id?: string
  className?: string
  children: ReactNode
  /** Hide the top hairline (first section on a page). */
  isFirst?: boolean
  labelledBy?: string
}

export function SectionShell({
  settings,
  id,
  className,
  children,
  isFirst,
  labelledBy,
}: SectionShellProps) {
  return (
    <section
      id={settings?.anchor || id}
      aria-labelledby={labelledBy}
      // Anchored sections are focus targets for menu links. Rendering this from the server
      // keeps hydration stable (it must never be added to the DOM by script).
      tabIndex={settings?.anchor ? -1 : undefined}
      className={cn(
        'frame-pad relative',
        settings?.anchor && 'outline-none',
        !isFirst && 'border-t border-line-strong',
        backgroundClass(settings?.background),
        spacingClass(settings?.spacing),
        className,
      )}
      data-section
    >
      {children}
    </section>
  )
}
