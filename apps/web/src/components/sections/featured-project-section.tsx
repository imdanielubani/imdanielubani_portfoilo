import type { SectionOf } from '@du/schemas'
import { getProject } from '@/lib/content'
import { toSummary } from '@/lib/content/seed-source'
import { SectionShell } from '@/components/layout/section-shell'
import { ProjectCard } from '@/components/projects/project-card'
import { SectionHeader } from '@/components/typography/section-header'

export async function FeaturedProjectSection({
  section,
}: {
  section: SectionOf<'featuredProject'>
}) {
  const { data, settings } = section
  const detail = await getProject(data.projectSlug)
  if (!detail) return null
  return (
    <SectionShell settings={settings}>
      <SectionHeader eyebrow={data.eyebrow} heading={data.heading} />
      <ProjectCard project={toSummary(detail.project)} layout="split" />
    </SectionShell>
  )
}
