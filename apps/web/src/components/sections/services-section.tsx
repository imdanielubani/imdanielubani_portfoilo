import type { SectionOf } from '@du/schemas'
import { SectionShell } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'
import { ServicesList } from '@/components/services/services-list'

export function ServicesSection({ section }: { section: SectionOf<'services'> }) {
  const { data, settings } = section
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
        description={data.description}
      />
      <ServicesList items={data.items} />
    </SectionShell>
  )
}
