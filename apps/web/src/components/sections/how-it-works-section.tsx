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
        <HireMeRow stats={data.stats} engagement={data.engagement} site={site} />
      </div>
      {data.booking.enabled ? (
        <div className="mt-16 md:mt-20">
          <BookingPanel booking={data.booking} site={site} />
        </div>
      ) : null}
    </SectionShell>
  )
}
