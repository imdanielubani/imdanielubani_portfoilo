import type { ContactSubmission } from '@du/schemas'

/** ISO calendar date, YYYY-MM-DD. All date math is done in UTC to avoid DST drift. */
export type IsoDate = string

export interface BookingRules {
  workingDays: number[]
  minNoticeDays: number
  daysAhead: number
}

const MONTHS = [
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

function toUtcDate(iso: IsoDate): Date {
  return new Date(iso + 'T00:00:00Z')
}

function toIso(date: Date): IsoDate {
  return date.toISOString().slice(0, 10)
}

/** Today's date as seen in the given IANA timezone. */
export function todayInTimeZone(timeZone: string, now: Date = new Date()): IsoDate {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

export function addDays(iso: IsoDate, days: number): IsoDate {
  const date = toUtcDate(iso)
  date.setUTCDate(date.getUTCDate() + days)
  return toIso(date)
}

export function weekdayOf(iso: IsoDate): number {
  return toUtcDate(iso).getUTCDay()
}

/** A date is bookable if it is a working day inside the notice / horizon window. */
export function isBookableDate(iso: IsoDate, today: IsoDate, rules: BookingRules): boolean {
  if (iso < addDays(today, rules.minNoticeDays)) return false
  if (iso > addDays(today, rules.daysAhead)) return false
  return rules.workingDays.includes(weekdayOf(iso))
}

/** Calendar weeks (Sunday first) for a month; cells outside the month are null. */
export function monthGrid(year: number, monthIndex: number): (IsoDate | null)[][] {
  const first = new Date(Date.UTC(year, monthIndex, 1))
  const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate()
  const cells: (IsoDate | null)[] = Array<null>(first.getUTCDay()).fill(null)
  for (let day = 1; day <= daysInMonth; day += 1)
    cells.push(toIso(new Date(Date.UTC(year, monthIndex, day))))
  while (cells.length % 7 !== 0) cells.push(null)
  const weeks: (IsoDate | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

export function monthLabel(year: number, monthIndex: number): string {
  return MONTHS[monthIndex] + ' ' + year
}

export function formatLongDate(iso: IsoDate): string {
  return toUtcDate(iso).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours === 0) return rest + ' min'
  return hours + (hours === 1 ? ' hr' : ' hrs') + (rest ? ' ' + rest + ' min' : '')
}

/** Short zone name such as "GMT+1" for display next to times. */
export function timeZoneLabel(timeZone: string, now: Date = new Date()): string {
  const part = new Intl.DateTimeFormat('en-GB', { timeZone, timeZoneName: 'short' })
    .formatToParts(now)
    .find((p) => p.type === 'timeZoneName')
  return part?.value ?? timeZone
}

export interface BookingRequest {
  serviceTitle: string
  durationMinutes: number
  date: IsoDate
  time: string
  timeZone: string
  name: string
  email: string
  notes: string
  startedAt: number
}

/**
 * Turns a booking request into a contact submission, so it travels through the
 * same validated, rate-limited and stored pipeline as the contact form.
 */
export function toContactSubmission(request: BookingRequest): ContactSubmission {
  const when = formatLongDate(request.date) + ' at ' + request.time + ' (' + request.timeZone + ')'
  const lines = [
    'Call request: ' + request.serviceTitle + ' (' + formatDuration(request.durationMinutes) + ')',
    'Requested time: ' + when,
    '',
    request.notes.trim() || 'No additional notes.',
  ]
  return {
    name: request.name.trim(),
    email: request.email.trim(),
    subject: ('Call request: ' + request.serviceTitle + ', ' + when).slice(0, 150),
    projectType: 'Call booking',
    message: lines.join('\n'),
    website: '',
    startedAt: request.startedAt,
  }
}
