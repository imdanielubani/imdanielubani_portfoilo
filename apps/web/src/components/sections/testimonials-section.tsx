import { LinkedinLogo, Quotes } from '@phosphor-icons/react/dist/ssr'
import type { SectionOf } from '@du/schemas'
import type { SiteSettings } from '@du/types'
import { isSafeHref } from '@du/utils'
import { SectionShell } from '@/components/layout/section-shell'
import { TestimonialCarousel } from '@/components/testimonials/testimonial-carousel'
import { SectionHeader } from '@/components/typography/section-header'
import { AccentDot, ButtonLink } from '@/components/ui/button'

interface TestimonialsSectionProps {
  section: SectionOf<'testimonials'>
  site: SiteSettings
}

/**
 * "Good words". Renders only real, CMS-entered testimonials. With none yet, it
 * shows an honest invitation to leave one instead of placeholder quotes.
 */
export function TestimonialsSection({ section, site }: TestimonialsSectionProps) {
  const { data, settings } = section
  const linkedin = site.socials.find((s) => s.platform === 'linkedin' && isSafeHref(s.url))
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
      />
      {data.items.length > 0 ? (
        <div data-reveal>
          <TestimonialCarousel items={data.items} />
        </div>
      ) : (
        <div
          className="flex flex-col gap-8 rounded-[var(--radius-xl)] border border-dashed border-line-strong bg-surface-2/60 p-7 md:flex-row md:items-center md:justify-between md:p-9"
          data-reveal
        >
          <div className="max-w-xl">
            <Quotes aria-hidden weight="fill" className="size-9 text-accent" />
            <p className="mt-4 text-2xl text-ink">{data.inviteTitle}</p>
            {data.inviteBody ? <p className="mt-2 text-ink-muted">{data.inviteBody}</p> : null}
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            {linkedin ? (
              <ButtonLink href={linkedin.url} external variant="primary">
                <LinkedinLogo aria-hidden weight="fill" className="size-4 text-accent" />
                Leave a recommendation
              </ButtonLink>
            ) : null}
            <ButtonLink href="/contact" variant="secondary">
              <AccentDot />
              Get in touch
            </ButtonLink>
          </div>
        </div>
      )}
    </SectionShell>
  )
}
