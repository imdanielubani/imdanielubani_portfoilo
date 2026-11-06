import type { SectionOf } from '@du/schemas'
import { SectionShell } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'
import { Accordion } from '@/components/ui/accordion'

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
      <Accordion
        defaultOpen={0}
        items={data.items.map((item) => ({
          id: item.title,
          title: item.title,
          content: <p>{item.description}</p>,
        }))}
      />
    </SectionShell>
  )
}
