import type { ContributionCalendar, ContributionDay } from '@/lib/github/contributions'
import { toWeeks } from '@/lib/github/contributions'
import { cn } from '@/lib/cn'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const LEVEL_CLASS = ['bg-gh-0', 'bg-gh-1', 'bg-gh-2', 'bg-gh-3', 'bg-gh-4'] as const

function describe(day: ContributionDay): string {
  const date = new Date(day.date + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
  if (day.count === 0) return 'No contributions on ' + date
  return day.count + (day.count === 1 ? ' contribution on ' : ' contributions on ') + date
}

/** Month label for a week column when that week starts a new month. */
function monthLabels(weeks: (ContributionDay | null)[][]): (string | null)[] {
  let previous = -1
  return weeks.map((week) => {
    const first = week.find((d): d is ContributionDay => d !== null)
    if (!first) return null
    const month = Number(first.date.slice(5, 7)) - 1
    if (month === previous) return null
    previous = month
    return MONTHS[month] ?? null
  })
}

/** GitHub-style contribution calendar rendered from real data. */
export function ContributionGraph({
  calendar,
  className,
}: {
  calendar: ContributionCalendar
  className?: string
}) {
  const weeks = toWeeks(calendar.days)
  const labels = monthLabels(weeks)
  return (
    <figure className={cn('min-w-0', className)}>
      <div className="overflow-x-auto pb-2 [direction:rtl]" data-lenis-prevent>
        <div className="inline-block [direction:ltr]">
          <div aria-hidden className="mb-1.5 flex gap-[3px] text-[0.65rem] text-ink-subtle">
            {labels.map((label, index) => (
              <span key={index} className="w-[11px] shrink-0 overflow-visible whitespace-nowrap">
                {label ?? ''}
              </span>
            ))}
          </div>
          <div
            role="img"
            aria-label={calendar.total + ' contributions on GitHub in the last year'}
            className="grid grid-flow-col grid-rows-7 gap-[3px]"
          >
            {weeks.flatMap((week, weekIndex) =>
              week.map((day, dayIndex) =>
                day ? (
                  <span
                    key={day.date}
                    title={describe(day)}
                    className={cn('size-[11px] rounded-[3px]', LEVEL_CLASS[day.level])}
                  />
                ) : (
                  <span key={'pad-' + weekIndex + '-' + dayIndex} className="size-[11px]" />
                ),
              ),
            )}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
        <span>{calendar.total.toLocaleString('en-GB')} contributions in the last year</span>
        <span aria-hidden className="inline-flex items-center gap-1">
          Less
          {LEVEL_CLASS.map((level) => (
            <span key={level} className={cn('size-[11px] rounded-[3px]', level)} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  )
}
