import type { CtaLink } from '@du/schemas'
import { cn } from '@/lib/cn'
import { CtaButton } from '@/components/ui/cta-button'
import { AccentText } from './accent-text'

interface SectionHeaderProps {
  eyebrow?: string
  heading?: string
  headingAccent?: string
  description?: string
  cta?: CtaLink | null
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  className?: string
  onDark?: boolean
}

export function SectionHeader({
  eyebrow,
  heading,
  headingAccent,
  description,
  cta,
  align = 'left',
  as: HeadingTag = 'h2',
  className,
  onDark,
}: SectionHeaderProps) {
  if (!eyebrow && !heading && !description) return null
  return (
    <div
      className={cn(
        'mb-12 flex flex-col gap-6 md:mb-16',
        align === 'center'
          ? 'items-center text-center'
          : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? (
          <p className="eyebrow mb-5" data-reveal>
            {eyebrow}
          </p>
        ) : null}
        {heading ? (
          <HeadingTag
            className={cn(
              'font-medium',
              HeadingTag === 'h1' ? 'text-display' : 'text-h2',
              onDark ? 'text-on-teal' : 'text-ink',
            )}
            data-reveal="heading"
          >
            <AccentText text={heading} accent={headingAccent} />
          </HeadingTag>
        ) : null}
        {description ? (
          <p
            className={cn(
              'mt-5 max-w-2xl text-lead',
              onDark ? 'text-on-teal-muted' : 'text-ink-muted',
              align === 'center' && 'mx-auto',
            )}
            data-reveal
          >
            {description}
          </p>
        ) : null}
      </div>
      {cta && align === 'left' ? (
        <div className="shrink-0" data-reveal>
          <CtaButton cta={cta} onDark={onDark} />
        </div>
      ) : null}
    </div>
  )
}
