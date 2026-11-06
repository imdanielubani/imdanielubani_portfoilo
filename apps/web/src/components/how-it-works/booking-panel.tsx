import Image from 'next/image'
import type { SiteSettings } from '@du/types'
import { isExternalHref, isSafeHref } from '@du/utils'
import { SocialIcon } from '@/components/site/social-icon'
import { BookingWidget, type BookingConfig } from './booking-widget'

interface BookingPanelProps {
  booking: BookingConfig
  site: SiteSettings
}

/** Portrait card with availability and socials, beside the booking widget. */
export function BookingPanel({ booking, site }: BookingPanelProps) {
  const portrait = site.defaultSeo.ogImage
  const socials = site.socials.filter((s) => isSafeHref(s.url))
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-4">
      <div className="flex flex-col" data-reveal>
        <div className="relative min-h-[22rem] flex-1 overflow-hidden rounded-[var(--radius-xl)] bg-surface">
          {portrait ? (
            <Image
              src={portrait.url}
              alt={portrait.alt}
              fill
              sizes="(min-width: 768px) 440px, 100vw"
              className="media-outline object-cover"
              style={{ objectPosition: portrait.focalX + '% ' + portrait.focalY + '%' }}
            />
          ) : null}
          {site.isAvailable ? (
            <span className="absolute bottom-0 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-t-[12px] bg-canvas px-3 pt-1.5 pb-1 text-xs font-medium tracking-wider text-success uppercase">
              <span aria-hidden className="size-1.5 rounded-full bg-success" />
              Available
            </span>
          ) : null}
        </div>
        <p className="mt-4 flex items-center justify-center gap-2.5 text-ink">
          {site.ownerName}
          <span aria-hidden className="size-1.5 rounded-full bg-ink-subtle" />
          <span className="text-ink-muted">{site.jobTitle}</span>
        </p>
        <ul className="mt-3 flex justify-center gap-3 text-ink-subtle">
          {socials.map((social) => (
            <li key={social.url}>
              <a
                href={social.url}
                aria-label={social.label}
                className="transition-colors hover:text-accent"
                {...(isExternalHref(social.url)
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <SocialIcon platform={social.platform} className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div data-reveal>
        <BookingWidget booking={booking} fallbackEmail={site.email} />
      </div>
    </div>
  )
}
