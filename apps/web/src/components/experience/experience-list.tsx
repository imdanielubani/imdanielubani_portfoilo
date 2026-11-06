import { CalendarBlank, Medal, Trophy } from '@phosphor-icons/react/dist/ssr'
import type { EmploymentType, Experience } from '@du/types'
import { durationLabel, formatDateRange, indexLabel } from '@du/utils'

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
}

export function ExperienceList({ items, detailed = false }: ExperienceListProps) {
  if (items.length === 0) {
    return <p className="text-ink-muted">Experience will appear here once it is published.</p>
  }
  return (
    <ol className="grid gap-4">
      {items.map((item, index) => (
        <li
          key={item.id}
          className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-x-8"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl text-ink-subtle italic md:text-3xl">{indexLabel(index)}</span>
            <span
              aria-hidden
              className="relative mt-4 w-0.5 flex-1 overflow-hidden rounded-full bg-line"
            >
              <span
                data-progress-line
                className="absolute inset-0 origin-top rounded-full bg-accent"
              />
            </span>
          </div>

          <div className="pb-14" data-reveal>
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className="flex size-12 shrink-0 items-center justify-center rounded-[14px] border border-line bg-surface-2 text-lg font-semibold text-accent shadow-pill"
              >
                {item.company.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="text-ink-muted">{item.company}</p>
                <h3 className="text-h3 text-ink">{item.role}</h3>
              </div>
            </div>

            <dl className="mt-6 grid gap-3">
              <div className="flex items-start gap-3">
                <dt className="sr-only">Dates</dt>
                <CalendarBlank
                  aria-hidden
                  weight="duotone"
                  className="mt-0.5 size-5 shrink-0 text-accent"
                />
                <dd className="text-ink-soft">
                  {formatDateRange(item.startDate, item.endDate, { isCurrent: item.isCurrent })}
                  <span className="text-ink-muted">
                    {', '}
                    {durationLabel(item.startDate, item.isCurrent ? null : item.endDate)},{' '}
                    {EMPLOYMENT[item.employmentType]}, {item.location}
                  </span>
                </dd>
              </div>
              {item.technologies.length > 0 ? (
                <div className="flex items-start gap-3">
                  <dt className="sr-only">Technologies</dt>
                  <Medal
                    aria-hidden
                    weight="duotone"
                    className="mt-1 size-5 shrink-0 text-accent"
                  />
                  <dd>
                    <ul className="flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <li key={tech} className="chip">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ) : null}
              {item.achievements[0] ? (
                <div className="flex items-start gap-3">
                  <dt className="sr-only">Highlight</dt>
                  <Trophy
                    aria-hidden
                    weight="duotone"
                    className="mt-0.5 size-5 shrink-0 text-accent"
                  />
                  <dd className="font-medium text-ink">{item.achievements[0]}</dd>
                </div>
              ) : null}
            </dl>

            <p className="mt-4 max-w-[62ch] pl-8 text-ink-muted">{item.summary}</p>
            {detailed && item.responsibilities.length > 0 ? (
              <ul className="prose-du mt-5 pl-8 text-base">
                {item.responsibilities.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
