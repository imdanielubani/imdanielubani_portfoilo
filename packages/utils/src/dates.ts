const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function parseYearMonth(value: string): { year: number; month: number } | null {
  const match = /^(\d{4})-(\d{2})$/.exec(value)
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2])
  if (month < 1 || month > 12) return null
  return { year, month }
}

/** Formats 2026-04 as "Apr 2026" (or "April 2026" when long is true). */
export function formatYearMonth(value: string, long = false): string {
  const parsed = parseYearMonth(value)
  if (!parsed) return value
  const names = long ? MONTHS_LONG : MONTHS
  return names[parsed.month - 1] + ' ' + parsed.year
}

export function formatDateRange(
  start: string,
  end: string | null,
  options: { isCurrent?: boolean; long?: boolean } = {},
): string {
  const from = formatYearMonth(start, options.long)
  if (options.isCurrent || !end) return from + ' - Present'
  return from + ' - ' + formatYearMonth(end, options.long)
}

/** Inclusive month count between two YYYY-MM values, e.g. Apr to Sep is 6. */
export function monthsBetween(start: string, end: string): number {
  const a = parseYearMonth(start)
  const b = parseYearMonth(end)
  if (!a || !b) return 0
  return (b.year - a.year) * 12 + (b.month - a.month) + 1
}

export function durationLabel(start: string, end: string | null, now: Date = new Date()): string {
  const endValue = end ?? now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0')
  const months = monthsBetween(start, endValue)
  if (months <= 0) return ''
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts: string[] = []
  if (years > 0) parts.push(years + (years === 1 ? ' yr' : ' yrs'))
  if (rest > 0) parts.push(rest + (rest === 1 ? ' mo' : ' mos'))
  return parts.join(' ')
}
