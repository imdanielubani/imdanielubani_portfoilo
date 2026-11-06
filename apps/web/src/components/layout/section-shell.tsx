import type { ReactNode } from 'react'
import type { SectionSettings } from '@du/schemas'
import { cn } from '@/lib/cn'

const backgrounds: Record<SectionSettings['background'], string> = {
  canvas: 'bg-canvas text-ink',
  surface: 'bg-surface text-ink',
  teal: 'on-dark bg-teal-900 text-on-teal',
  ink: 'on-dark bg-[#0b1419] text-on-teal',
}

const spacings: Record<SectionSettings['spacing'], string> = {
  none: 'py-0',
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-[var(--section-y)]',
}

interface SectionShellProps {
  settings?: Partial<SectionSettings>
  id?: string
  className?: string
  containerClassName?: string
  children: ReactNode
  /** Skip the inner container for full-bleed content. */
  bleed?: boolean
}

export function isDarkBackground(settings?: Partial<SectionSettings>): boolean {
  return settings?.background === 'teal' || settings?.background === 'ink'
}

export function SectionShell({
  settings,
  id,
  className,
  containerClassName,
  children,
  bleed,
}: SectionShellProps) {
  const background = settings?.background ?? 'canvas'
  const spacing = settings?.spacing ?? 'lg'
  return (
    <section
      id={settings?.anchor || id}
      className={cn('relative', backgrounds[background], spacings[spacing], className)}
      data-section
    >
      {bleed ? children : <div className={cn('container-du', containerClassName)}>{children}</div>}
    </section>
  )
}
