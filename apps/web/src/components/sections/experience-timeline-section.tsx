import type { SectionOf } from '@du/schemas'
import { getExperience } from '@/lib/content'
import { ExperienceList } from '@/components/experience/experience-list'
import { SectionShell, isDarkBackground } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'

export async function ExperienceTimelineSection({
  section,
}: {
  section: SectionOf<'experienceTimeline'>
}) {
  const { data, settings } = section
  const items = await getExperience()
  const onDark = isDarkBackground(settings)
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
        description={data.description}
        cta={data.cta}
        onDark={onDark}
      />
      <ExperienceList items={data.limit ? items.slice(0, data.limit) : items} onDark={onDark} />
    </SectionShell>
  )
}
