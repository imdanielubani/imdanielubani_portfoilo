import type { Experience, EmploymentType } from '@du/types'
import { durationLabel, formatDateRange, indexLabel } from '@du/utils'
import { cn } from '@/lib/cn'

const EMPLOYMENT: Record<EmploymentType, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  freelance: 'Freelance',
  internship: 'Internship',
}

interface ExperienceListProps {
  items: Experience[]
  detailed?: boolean
  onDark?: boolean
}

export function ExperienceList({ items, detailed = false, onDark = false }: ExperienceListProps) {
  if (items.length === 0) {
    return <p className="text-ink-muted">Experience will appear here once it is published.</p>
  }
  return (
    <ol className={cn('border-t', onDark ? 'border-on-teal/15' : 'border-line')}>
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            'group grid gap-6 border-b py-10 md:grid-cols-12 md:gap-8 md:py-12',
            onDark ? 'border-on-teal/15' : 'border-line',
          )}
          data-reveal
        >
          <div className="flex items-start gap-4 md:col-span-4">
            <span className="font-mono text-sm text-accent">{indexLabel(index)}</span>
            <div>
              <p className="font-mono text-xs tracking-wider text-ink-subtle uppercase">
                {formatDateRange(item.startDate, item.endDate, { isCurrent: item.isCurrent })}
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                {durationLabel(item.startDate, item.isCurrent ? null : item.endDate)} {' · '}
                {EMPLOYMENT[item.employmentType]}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{item.location}</p>
            </div>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-h3 font-medium">
              {item.role} <span className="text-ink-muted">at</span> {item.company}
            </h3>
            {item.achievements[0] ? (
              <p className="mt-3 inline-flex items-start gap-2 rounded-full bg-accent/10 px-3 py-1 text-sm text-ink">
                <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {item.achievements[0]}
              </p>
            ) : null}
            <p className="mt-5 max-w-3xl text-ink-muted">{item.summary}</p>
            {detailed && item.responsibilities.length > 0 ? (
              <ul className="prose-du mt-6 text-base">
                {item.responsibilities.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}
            {item.technologies.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                {item.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
