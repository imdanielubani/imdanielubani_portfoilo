import type { SectionOf } from '@du/schemas'
import type { SiteSettings } from '@du/types'
import { SectionShell } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'

interface HowItWorksSectionProps {
  section: SectionOf<'howItWorks'>
  site: SiteSettings
}

/** "How it works": hire-me row (profile + engagement) followed by the booking widget. */
export function HowItWorksSection({ section }: HowItWorksSectionProps) {
  const { data, settings } = section
  return (
    <SectionShell settings={settings}>
      <SectionHeader eyebrow={data.eyebrow} heading={data.heading} headingAccent={data.headingAccent} />
    </SectionShell>
  )
}
