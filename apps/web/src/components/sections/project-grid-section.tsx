import type { SectionOf } from '@du/schemas'
import type { ProjectSummary } from '@du/types'
import { cn } from '@/lib/cn'
import { getProjects } from '@/lib/content'
import { SectionShell, isDarkBackground } from '@/components/layout/section-shell'
import { ProjectCard } from '@/components/projects/project-card'
import { SectionHeader } from '@/components/typography/section-header'

export function selectProjects(
  all: ProjectSummary[],
  source: 'featured' | 'latest' | 'manual',
  slugs: string[],
  limit: number,
): ProjectSummary[] {
  if (source === 'manual') {
    return slugs
      .map((slug) => all.find((p) => p.slug === slug))
      .filter((p): p is ProjectSummary => Boolean(p))
      .slice(0, limit)
  }
  if (source === 'featured') {
    const featured = all.filter((p) => p.isFeatured)
    return (featured.length > 0 ? featured : all).slice(0, limit)
  }
  return all.slice(0, limit)
}

export async function ProjectGridSection({ section }: { section: SectionOf<'projectGrid'> }) {
  const { data, settings } = section
  const projects = selectProjects(await getProjects(), data.source, data.projectSlugs, data.limit)
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
      {projects.length === 0 ? (
        <p className="text-ink-muted">Projects will appear here once they are published.</p>
      ) : (
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              className={cn(index % 2 === 1 && 'md:mt-28')}
            />
          ))}
        </div>
      )}
    </SectionShell>
  )
}
