import type { SectionOf } from '@du/schemas'
import { SectionShell } from '@/components/layout/section-shell'
import { RichText } from '@/components/typography/rich-text'
import { SectionHeader } from '@/components/typography/section-header'

export function RichTextSection({ section }: { section: SectionOf<'richText'> }) {
  const { data, settings } = section
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
      />
      <div className={data.width === 'wide' ? 'max-w-3xl' : 'max-w-2xl'} data-reveal>
        <RichText html={data.html} />
      </div>
    </SectionShell>
  )
}
