import type { SectionOf } from '@du/schemas'
import { getSkills } from '@/lib/content'
import { SectionShell, isDarkBackground } from '@/components/layout/section-shell'
import { SkillCategories } from '@/components/skills/skill-categories'
import { SectionHeader } from '@/components/typography/section-header'

export async function SkillsGridSection({ section }: { section: SectionOf<'skillsGrid'> }) {
  const { data, settings } = section
  const all = await getSkills()
  const categories =
    data.categorySlugs.length > 0 ? all.filter((c) => data.categorySlugs.includes(c.slug)) : all
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
        description={data.description}
        cta={data.cta}
        onDark={isDarkBackground(settings)}
      />
      <SkillCategories categories={categories} />
    </SectionShell>
  )
}
