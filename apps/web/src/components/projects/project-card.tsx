import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ProjectSummary } from '@du/types'
import { cn } from '@/lib/cn'
import { CmsImage } from '@/components/media/cms-image'
import { ProjectStatusBadge } from './project-status'

interface ProjectCardProps {
  project: ProjectSummary
  index?: number
  size?: 'default' | 'large'
  headingLevel?: 'h2' | 'h3'
  className?: string
}

const MAX_TAGS = 4

export function ProjectCard({
  project,
  index,
  size = 'default',
  headingLevel = 'h3',
  className,
}: ProjectCardProps) {
  const Heading = headingLevel
  const extra = project.technologies.length - MAX_TAGS
  return (
    <article className={cn('group relative', className)} data-reveal>
      <Link
        href={'/projects/' + project.slug}
        className="block rounded-[var(--radius-xl)] focus-visible:outline-offset-4"
        data-cursor="View"
        aria-label={project.title + ' \u2014 ' + project.subtitle}
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-[var(--radius-xl)] bg-surface',
            size === 'large' ? 'aspect-[16/10]' : 'aspect-[4/3]',
          )}
        >
          <CmsImage
            media={project.thumbnail}
            sizes={
              size === 'large'
                ? '(min-width: 1024px) 66vw, 100vw'
                : '(min-width: 768px) 50vw, 100vw'
            }
            className="transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute top-4 left-4 flex gap-2">
            <ProjectStatusBadge status={project.status} />
          </div>
          <span className="absolute right-4 bottom-4 inline-flex size-12 translate-y-3 items-center justify-center rounded-full bg-accent text-accent-ink opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight aria-hidden className="size-5" />
          </span>
        </div>
      </Link>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="mb-2 font-mono text-[0.7rem] tracking-wider text-ink-subtle uppercase">
            {typeof index === 'number' ? String(index + 1).padStart(2, '0') + ' \u00b7 ' : ''}
            {project.category.name}
            {project.timeline ? ' \u00b7 ' + project.timeline : ''}
          </p>
          <Heading className="text-h3 font-medium">
            <Link
              href={'/projects/' + project.slug}
              className="transition-colors hover:text-accent"
            >
              {project.title}
            </Link>
          </Heading>
          <p className="mt-1 text-ink-muted">{project.subtitle}</p>
        </div>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
        {project.technologies.slice(0, MAX_TAGS).map((tech) => (
          <li
            key={tech.slug}
            className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted"
          >
            {tech.name}
          </li>
        ))}
        {extra > 0 ? (
          <li className="rounded-full px-2 py-1 text-xs text-ink-subtle">+{extra}</li>
        ) : null}
      </ul>
    </article>
  )
}
