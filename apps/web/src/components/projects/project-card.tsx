import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import type { ProjectStatus, ProjectSummary } from '@du/types'
import { cn } from '@/lib/cn'
import { CmsImage } from '@/components/media/cms-image'

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-development': 'In development',
  completed: 'Completed',
  archived: 'Archived',
}

interface ProjectCardProps {
  project: ProjectSummary
  layout?: 'split' | 'stacked'
  /** For split cards: put the image on the left instead of the right. */
  imageFirst?: boolean
  headingLevel?: 'h2' | 'h3'
  className?: string
}

export function ProjectCard({
  project,
  layout = 'stacked',
  imageFirst = false,
  headingLevel = 'h3',
  className,
}: ProjectCardProps) {
  const Heading = headingLevel
  const href = '/projects/' + project.slug
  const isSplit = layout === 'split'
  return (
    <article
      className={cn(
        'group relative grid overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface-2 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-line-strong hover:shadow-float',
        isSplit && 'md:grid-cols-2',
        className,
      )}
      data-reveal
    >
      <div
        className={cn(
          'relative overflow-hidden bg-surface',
          isSplit ? 'aspect-[16/11] md:aspect-auto md:min-h-[20rem]' : 'aspect-[16/10]',
          isSplit && imageFirst && 'md:order-first',
          isSplit && !imageFirst && 'md:order-last',
        )}
      >
        <CmsImage
          media={project.thumbnail}
          sizes={isSplit ? '(min-width: 768px) 480px, 100vw' : '(min-width: 768px) 480px, 100vw'}
          className="transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-col p-6 md:p-7">
        <Heading className="text-h3 text-ink">
          {project.title}
          <span className="text-ink-muted">: {project.subtitle}</span>
        </Heading>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Project details">
          <li className="chip">{project.category.name}</li>
          <li className="chip">{STATUS_LABEL[project.status]}</li>
          {project.timeline ? <li className="chip">{project.timeline}</li> : null}
        </ul>
        <p className="mt-4 line-clamp-3 text-ink-muted">{project.summary}</p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden
              className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-accent-soft text-lg font-semibold text-accent"
            >
              {project.title.charAt(0)}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-ink">{project.industry}</span>
              <span className="block truncate text-sm text-ink-muted">{project.role}</span>
            </span>
          </div>
          {/* Only this button navigates; the rest of the card is not a link. */}
          <Link
            href={href}
            aria-label={'View case study: ' + project.title}
            title={'View case study: ' + project.title}
            data-cursor="View"
            className="group/arrow relative z-10 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface-2 shadow-pill transition-[transform,box-shadow,border-color] duration-300 hover:rotate-45 hover:border-accent hover:shadow-card focus-visible:rotate-45 active:scale-90"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform duration-300 group-hover/arrow:scale-110">
              <ArrowUpRight aria-hidden weight="bold" className="size-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}

/**
 * Lays out cards in the reference rhythm: a full-width split card, then a pair of
 * stacked cards, repeating, with split cards alternating their image side.
 */
export function ProjectCardGrid({
  projects,
  headingLevel = 'h3',
}: {
  projects: ProjectSummary[]
  headingLevel?: 'h2' | 'h3'
}) {
  const rows: { split?: ProjectSummary; pair?: ProjectSummary[] }[] = []
  let index = 0
  while (index < projects.length) {
    const current = projects[index]
    if (!current) break
    if (rows.length % 2 === 0) {
      rows.push({ split: current })
      index += 1
    } else {
      rows.push({ pair: projects.slice(index, index + 2) })
      index += 2
    }
  }
  let splitCount = 0
  return (
    <div className="grid gap-6">
      {rows.map((row) => {
        if (row.split) {
          const imageFirst = splitCount % 2 === 1
          splitCount += 1
          return (
            <ProjectCard
              key={row.split.id}
              project={row.split}
              layout="split"
              imageFirst={imageFirst}
              headingLevel={headingLevel}
            />
          )
        }
        const pair = row.pair ?? []
        return (
          <div key={pair.map((p) => p.id).join('-')} className="grid gap-6 md:grid-cols-2">
            {pair.map((project) => (
              <ProjectCard key={project.id} project={project} headingLevel={headingLevel} />
            ))}
          </div>
        )
      })}
    </div>
  )
}
