import type { SectionOf } from '@du/schemas'
import type { SiteSettings } from '@du/types'
import { SectionShell } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'
import { BookingPanel } from '@/components/how-it-works/booking-panel'
import { HireMeRow } from '@/components/how-it-works/hire-me-row'

interface HowItWorksSectionProps {
  section: SectionOf<'howItWorks'>
  site: SiteSettings
}

/** "How it works": hire-me row (profile + engagement) followed by the booking widget. */
export function HowItWorksSection({ section, site }: HowItWorksSectionProps) {
  const { data, settings } = section
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
      />
      <div className="pt-6">
        <HireMeRow
          title={data.profileTitle}
          stats={data.stats}
          engagement={data.engagement}
          site={site}
        />
      </div>
      {data.booking.enabled ? (
        <div
          id={data.booking.anchor || undefined}
          className="-mx-[var(--frame-pad)] mt-[var(--section-y)] border-t border-line-strong px-[var(--frame-pad)] pt-[var(--section-y)]"
        >
          {/* Full-width hairline separating the hire-me row from the booking panel. */}
          <SectionHeader
            as="h3"
            eyebrow={data.booking.eyebrow}
            heading={data.booking.heading}
            headingAccent={data.booking.headingAccent}
          />
          <BookingPanel booking={data.booking} site={site} />
        </div>
      ) : null}
    </SectionShell>
  )
}
