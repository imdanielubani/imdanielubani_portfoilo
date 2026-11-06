import Image from 'next/image'
import { CheckCircle, MapPin } from '@phosphor-icons/react/dist/ssr'
import type { SectionData } from '@du/schemas'
import type { SiteSettings } from '@du/types'
import { isSafeHref } from '@du/utils'
import { AccentDot, ButtonLink } from '@/components/ui/button'
import { AvailabilityBadge } from '@/components/ui/availability-badge'

interface HireMeRowProps {
  title: string
  stats: SectionData<'howItWorks'>['stats']
  engagement: SectionData<'howItWorks'>['engagement']
  site: SiteSettings
}

/** Tilted profile card with factual stats, beside the ways-to-work card. */
export function HireMeRow({ title, stats, engagement, site }: HireMeRowProps) {
  const avatar = site.defaultSeo.ogImage
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div
        className="relative rounded-[var(--radius-xl)] border border-line bg-surface-2 p-6 pt-44 shadow-card md:p-7 md:pt-48"
        data-reveal
      >
        <div className="absolute -top-5 right-4 left-4 rotate-[-3deg] rounded-[20px] border border-line bg-surface-2 p-5 shadow-float transition-transform duration-500 ease-[var(--ease-out)] hover:rotate-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              {avatar ? (
                <span className="relative size-16 shrink-0 overflow-hidden rounded-full ring-4 ring-accent-soft">
                  <Image
                    src={avatar.url}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover object-[50%_25%]"
                  />
                </span>
              ) : null}
              <span className="min-w-0">
                <span className="block truncate text-xl font-medium text-ink">
                  {site.ownerName}
                </span>
                <span className="mt-0.5 flex items-center gap-1 text-sm text-ink-muted">
                  <MapPin aria-hidden weight="fill" className="size-3.5 shrink-0 text-accent" />
                  <span className="truncate">{site.location}</span>
                </span>
              </span>
            </div>
          </div>
          {stats.length > 0 ? (
            <dl className="mt-5 grid grid-cols-3 divide-x divide-line border-t border-line pt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse px-2 text-center first:pl-0 last:pr-0"
                >
                  <dt className="text-xs text-ink-muted">{stat.label}</dt>
                  <dd className="text-2xl font-medium tracking-tight text-ink tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        {site.isAvailable ? <AvailabilityBadge /> : null}
        <p className="mt-4 text-2xl text-ink">{title}</p>
        <p className="mt-2 max-w-[42ch] text-ink-muted">{site.availability}</p>
      </div>

      <div
        className="flex flex-col rounded-[var(--radius-xl)] border border-line bg-surface p-6 md:p-8"
        data-reveal
      >
        <h3 className="text-h3 text-ink">{engagement.title}</h3>
        {engagement.description ? (
          <p className="mt-2 max-w-[52ch] text-ink-muted">{engagement.description}</p>
        ) : null}
        {engagement.highlights.length > 0 ? (
          <ul className="mt-6 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
            {engagement.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-ink-soft">
                <CheckCircle
                  aria-hidden
                  weight="fill"
                  className="mt-0.5 size-[18px] shrink-0 text-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {isSafeHref(engagement.ctaHref) ? (
          <div className="mt-auto pt-8">
            <ButtonLink href={engagement.ctaHref} data-magnetic="">
              <AccentDot />
              {engagement.ctaLabel}
            </ButtonLink>
          </div>
        ) : null}
      </div>
    </div>
  )
}
