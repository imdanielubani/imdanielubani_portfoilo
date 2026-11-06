import Image from 'next/image'
import { MapPin } from '@phosphor-icons/react/dist/ssr'
import type { SectionOf } from '@du/schemas'
import type { SiteSettings } from '@du/types'
import { SectionShell } from '@/components/layout/section-shell'
import { AccentText } from '@/components/typography/accent-text'
import { AvailabilityBadge } from '@/components/ui/availability-badge'
import { CtaButton } from '@/components/ui/cta-button'

/** Profile card + call to action, side by side, as in the reference "hire me" row. */
export function CtaSection({ section, site }: { section: SectionOf<'cta'>; site: SiteSettings }) {
  const { data, settings } = section
  const avatar = site.defaultSeo.ogImage
  return (
    <SectionShell settings={settings}>
      {data.eyebrow ? (
        <p className="section-label mb-3" data-reveal>
          {data.eyebrow}
        </p>
      ) : null}
      <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div
          className="relative rounded-[var(--radius-xl)] border border-line bg-surface-2 p-6 pt-24 shadow-card md:p-7 md:pt-28"
          data-reveal
        >
          <div className="absolute -top-6 left-5 flex w-[min(19rem,85%)] rotate-[-3deg] items-center gap-4 rounded-[18px] border border-line bg-surface-2 p-4 shadow-float transition-transform duration-500 hover:rotate-0">
            {avatar ? (
              <span className="relative size-14 shrink-0 overflow-hidden rounded-[14px]">
                <Image
                  src={avatar.url}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover object-[50%_25%]"
                />
              </span>
            ) : null}
            <span className="min-w-0">
              <span className="block truncate text-xl font-medium text-ink">{site.ownerName}</span>
              <span className="mt-0.5 flex items-center gap-1 text-sm text-ink-muted">
                <MapPin aria-hidden weight="fill" className="size-3.5 text-accent" />
                {site.location}
              </span>
            </span>
          </div>
          {site.isAvailable ? <AvailabilityBadge /> : null}
          <p className="mt-4 text-2xl text-ink">{site.jobTitle}</p>
          <p className="mt-2 text-ink-muted">{site.availability}</p>
        </div>

        <div
          className="flex flex-col justify-between gap-10 rounded-[var(--radius-xl)] border border-line bg-surface p-6 md:p-9"
          data-reveal
        >
          <h2 className="text-h2 text-ink-soft">
            <AccentText text={data.heading} accent={data.headingAccent} />
          </h2>
          <div>
            {data.body ? <p className="max-w-[48ch] text-ink-muted">{data.body}</p> : null}
            {data.ctas.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {data.ctas.map((cta) => (
                  <CtaButton key={cta.label + cta.href} cta={cta} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
