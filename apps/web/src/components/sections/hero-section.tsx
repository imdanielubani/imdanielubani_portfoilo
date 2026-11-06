import { MapPin } from '@phosphor-icons/react/dist/ssr'
import type { SectionOf } from '@du/schemas'
import type { SiteSettings } from '@du/types'
import { cn } from '@/lib/cn'
import { SplitWords } from '@/components/motion/split-words'
import { SectionShell } from '@/components/layout/section-shell'
import { CtaButton } from '@/components/ui/cta-button'
import { AvailabilityBadge } from '@/components/ui/availability-badge'
import { LanyardBadge } from './lanyard-badge'

interface HeroSectionProps {
  section: SectionOf<'hero'>
  site: SiteSettings
  /** The first hero on a page is the LCP element: load its image eagerly. */
  isFirst?: boolean
}

export function HeroSection({ section, site, isFirst = false }: HeroSectionProps) {
  const { data } = section
  const hasImage = Boolean(data.image)
  return (
    <SectionShell
      settings={section.settings}
      isFirst={isFirst}
      className={cn('overflow-hidden', isFirst ? 'pt-24 pb-20 md:pt-28 md:pb-24' : undefined)}
    >
      <div
        className={cn(
          'grid items-start gap-10',
          hasImage && 'md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]',
        )}
      >
        <div className="max-w-xl">
          {data.showAvailability && site.isAvailable ? (
            <div className="mb-7" data-reveal>
              <AvailabilityBadge />
            </div>
          ) : null}

          {data.eyebrow ? (
            <p className="mb-4 text-h3 text-ink-soft" data-reveal>
              {data.eyebrow}{' '}
              <span aria-hidden className="wave">
                &#x1F44B;
              </span>
            </p>
          ) : null}

          <h1 className="text-display text-ink" data-reveal="words">
            <SplitWords
              text={data.headline}
              accent={data.headlineAccent}
              accentClassName="text-ink-muted"
            />
          </h1>

          {data.body ? (
            <p className="mt-7 max-w-[56ch] text-ink-muted" data-reveal>
              {data.body}
            </p>
          ) : null}
          {data.secondaryBody ? (
            <p className="mt-3 max-w-[56ch] text-ink-muted" data-reveal>
              {data.secondaryBody}
            </p>
          ) : null}

          {data.ctas.length > 0 ? (
            <div className="mt-9 flex flex-wrap items-center gap-3" data-reveal>
              {data.ctas.map((cta) => (
                <CtaButton key={cta.label + cta.href} cta={cta} />
              ))}
            </div>
          ) : null}

          {data.location ? (
            <p className="mt-8 inline-flex items-start gap-2 text-sm text-ink-muted" data-reveal>
              <MapPin aria-hidden weight="fill" className="mt-0.5 size-4 shrink-0 text-accent" />
              {data.location}
            </p>
          ) : null}
        </div>

        {data.image ? (
          <div className="relative -mt-28 hidden self-stretch md:block" data-reveal>
            <LanyardBadge
              image={data.image}
              name={site.ownerName}
              role={site.jobTitle}
              priority={isFirst}
            />
          </div>
        ) : null}
      </div>
    </SectionShell>
  )
}
