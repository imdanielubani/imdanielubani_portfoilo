import { Clock, MapPin } from '@phosphor-icons/react/dist/ssr'
import type { SectionOf } from '@du/schemas'
import type { SiteSettings } from '@du/types'
import { cn } from '@/lib/cn'
import { CmsImage } from '@/components/media/cms-image'
import { SectionShell } from '@/components/layout/section-shell'
import { LocalTime } from '@/components/site/local-time'
import { SectionHeader } from '@/components/typography/section-header'
import { RichText } from '@/components/typography/rich-text'
import { AvailabilityBadge } from '@/components/ui/availability-badge'
import { CtaButton } from '@/components/ui/cta-button'

interface ImageTextSectionProps {
  section: SectionOf<'imageText'>
  site: SiteSettings
  isFirst?: boolean
}

/** Bento composition: portrait, story card, local-time card and availability card. */
export function ImageTextSection({ section, site, isFirst }: ImageTextSectionProps) {
  const { data, settings } = section
  const imageRight = data.imagePosition === 'right'
  return (
    <SectionShell settings={settings} isFirst={isFirst} className={cn(isFirst && 'pt-24 md:pt-28')}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
        as={isFirst ? 'h1' : 'h2'}
      />

      <div className="grid gap-4 md:grid-cols-12">
        <div
          className={cn(
            'relative min-h-[26rem] overflow-hidden rounded-[var(--radius-xl)] bg-surface md:col-span-5 md:row-span-2',
            imageRight && 'md:order-2',
          )}
          data-reveal="image"
        >
          <div className="absolute inset-[-6%]" data-parallax="0.08">
            <CmsImage
              media={data.image}
              sizes="(min-width: 768px) 40vw, 100vw"
              priority={isFirst}
              className="media-outline"
            />
          </div>
        </div>

        <div
          className="rounded-[var(--radius-xl)] border border-line bg-surface-2 p-7 shadow-card md:col-span-7 md:p-9"
          data-reveal
        >
          <RichText html={data.html} className="text-base" />
          {data.ctas.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-3">
              {data.ctas.map((cta) => (
                <CtaButton key={cta.label + cta.href} cta={cta} size="sm" />
              ))}
            </div>
          ) : null}
        </div>

        <div
          className="flex flex-col justify-between gap-6 rounded-[var(--radius-xl)] bg-accent-soft p-7 md:col-span-3"
          data-reveal
        >
          <Clock aria-hidden weight="duotone" className="size-7 text-accent" />
          <div>
            <p className="text-4xl font-medium tracking-tight text-ink tabular-nums">
              <LocalTime timeZone={site.timezone} />
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-muted">
              <MapPin aria-hidden weight="fill" className="size-3.5 text-accent" />
              {site.location}
            </p>
          </div>
        </div>

        <div
          className="flex flex-col justify-between gap-6 rounded-[var(--radius-xl)] border border-line bg-surface p-7 md:col-span-4"
          data-reveal
        >
          {site.isAvailable ? <AvailabilityBadge className="self-start" /> : null}
          <p className="text-lg leading-snug text-ink-soft">{site.availability}</p>
        </div>
      </div>
    </SectionShell>
  )
}
