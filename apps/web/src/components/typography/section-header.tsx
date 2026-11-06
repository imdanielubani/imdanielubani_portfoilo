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
  as?: 'h1' | 'h2'
  className?: string
}

/** Orange italic label, medium heading and optional description, as in the reference. */
export function SectionHeader({
  eyebrow,
  heading,
  headingAccent,
  description,
  cta,
  as: HeadingTag = 'h2',
  className,
}: SectionHeaderProps) {
  if (!eyebrow && !heading && !description) return null
  return (
    <div className={cn('mb-10 md:mb-14', className)}>
      {eyebrow ? (
        <p className="section-label mb-3" data-reveal>
          {eyebrow}
        </p>
      ) : null}
      {heading ? (
        <HeadingTag
          className={cn(
            HeadingTag === 'h1' ? 'text-display' : 'text-h2',
            'max-w-3xl text-ink-soft',
          )}
          data-reveal="heading"
        >
          <AccentText text={heading} accent={headingAccent} />
        </HeadingTag>
      ) : null}
      {description ? (
        <p className="mt-4 max-w-[60ch] text-ink-muted" data-reveal>
          {description}
        </p>
      ) : null}
      {cta ? (
        <div className="mt-6" data-reveal>
          <CtaButton cta={cta} size="sm" />
        </div>
      ) : null}
    </div>
  )
}
