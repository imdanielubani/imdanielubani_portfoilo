import { MapPin } from 'lucide-react'
import type { SectionOf } from '@du/schemas'
import type { SiteSettings } from '@du/types'
import { cn } from '@/lib/cn'
import { CmsImage } from '@/components/media/cms-image'
import { SplitWords } from '@/components/motion/split-words'
import { CtaButton } from '@/components/ui/cta-button'

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
    <section
      id={section.settings.anchor}
      className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
      data-section
    >
      <div aria-hidden className="hairline-grid absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden
        className="hero-orb absolute -top-40 right-[-10%] -z-10 size-[42rem] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_65%)] blur-2xl"
      />

      <div className={cn('container-du grid items-end gap-14', hasImage && 'lg:grid-cols-12')}>
        <div className={cn(hasImage ? 'lg:col-span-7' : 'max-w-5xl')}>
          <div className="mb-8 flex flex-wrap items-center gap-3" data-reveal>
            {data.showAvailability && site.isAvailable ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2/70 px-3 py-1.5 font-mono text-[0.7rem] tracking-wider text-ink-muted uppercase backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                Available for work
              </span>
            ) : null}
            {data.eyebrow ? <span className="eyebrow">{data.eyebrow}</span> : null}
          </div>

          <h1 className="text-display font-medium" data-reveal="words">
            <SplitWords text={data.headline} accent={data.headlineAccent} />
          </h1>

          {data.body ? (
            <p className="mt-8 max-w-2xl text-lead text-ink-muted" data-reveal>
              {data.body}
            </p>
          ) : null}
          {data.secondaryBody ? (
            <p className="mt-4 max-w-2xl text-ink-muted" data-reveal>
              {data.secondaryBody}
            </p>
          ) : null}

          {data.ctas.length > 0 ? (
            <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal>
              {data.ctas.map((cta) => (
                <CtaButton key={cta.label + cta.href} cta={cta} size="lg" />
              ))}
            </div>
          ) : null}

          {data.location ? (
            <p className="mt-10 inline-flex items-start gap-2 text-sm text-ink-muted" data-reveal>
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
              {data.location}
            </p>
          ) : null}
        </div>

        {data.image ? (
          <div className="relative lg:col-span-5" data-reveal="image">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-surface shadow-float">
              <div className="absolute inset-[-8%]" data-parallax="0.12">
                <CmsImage
                  media={data.image}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority={isFirst}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-4 text-white">
                <div>
                  <p className="font-mono text-[0.7rem] tracking-wider text-white/70 uppercase">
                    {site.ownerName}
                  </p>
                  <p className="text-sm font-medium">{site.jobTitle}</p>
                </div>
                <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[0.7rem] tracking-wider uppercase backdrop-blur">
                  {site.location}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
