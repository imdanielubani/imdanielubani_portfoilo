import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { SectionOf } from '@du/schemas'
import { getProject } from '@/lib/content'
import { CmsImage } from '@/components/media/cms-image'
import { SectionShell } from '@/components/layout/section-shell'
import { ProjectStatusBadge } from '@/components/projects/project-status'

export async function FeaturedProjectSection({
  section,
}: {
  section: SectionOf<'featuredProject'>
}) {
  const { data, settings } = section
  const detail = await getProject(data.projectSlug)
  if (!detail) return null
  const { project } = detail
  return (
    <SectionShell settings={settings}>
      {data.eyebrow ? (
        <p className="eyebrow mb-6" data-reveal>
          {data.eyebrow}
        </p>
      ) : null}
      <Link
        href={'/projects/' + project.slug}
        className="group grid overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface-2 lg:grid-cols-2"
        data-cursor="Read"
        data-reveal
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface lg:aspect-auto lg:min-h-[28rem]">
          <CmsImage
            media={project.heroImage}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="transition-transform duration-[1.2s] group-hover:scale-[1.05]"
          />
          <ProjectStatusBadge status={project.status} className="absolute top-4 left-4" />
        </div>
        <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
          <div>
            <p className="font-mono text-xs tracking-wider text-ink-subtle uppercase">
              {data.heading ?? 'Featured case study'} {'\u00b7'} {project.industry}
            </p>
            <h2 className="mt-4 text-h2 font-medium">{project.title}</h2>
            <p className="mt-2 text-lead text-ink-muted">{project.subtitle}</p>
            <p className="mt-6 text-ink-muted">{project.summary}</p>
          </div>
          <span className="inline-flex items-center gap-2 font-medium">
            Read the case study
            <ArrowUpRight
              aria-hidden
              className="size-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </SectionShell>
  )
}
