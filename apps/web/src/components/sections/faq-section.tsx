import type { SectionOf } from '@du/schemas'
import { SectionShell } from '@/components/layout/section-shell'
import { RichText } from '@/components/typography/rich-text'
import { SectionHeader } from '@/components/typography/section-header'
import { Accordion } from '@/components/ui/accordion'

export function FaqSection({ section }: { section: SectionOf<'faq'> }) {
  const { data, settings } = section
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
      />
      <Accordion
        numbered={false}
        items={data.items.map((item) => ({
          id: item.question,
          title: item.question,
          content: <RichText html={item.answer} className="text-base" />,
        }))}
      />
    </SectionShell>
  )
}
