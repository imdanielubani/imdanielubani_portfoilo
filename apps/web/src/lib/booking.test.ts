import { describe, expect, it } from 'vitest'
import { contactSubmissionSchema } from '@du/schemas'
import {
  addDays,
  formatDuration,
  formatLongDate,
  isBookableDate,
  monthGrid,
  monthLabel,
  toContactSubmission,
  todayInTimeZone,
  weekdayOf,
} from './booking'

const RULES = { workingDays: [1, 2, 3, 4, 5], minNoticeDays: 1, daysAhead: 30 }

describe('dates', () => {
  it('reads today in the owner timezone', () => {
    // 23:30 UTC on 6 Nov is already 7 Nov in Lagos (UTC+1).
    expect(todayInTimeZone('Africa/Lagos', new Date('2026-11-06T23:30:00Z'))).toBe('2026-11-07')
    expect(todayInTimeZone('UTC', new Date('2026-11-06T23:30:00Z'))).toBe('2026-11-06')
  })

  it('adds days across month and year boundaries', () => {
    expect(addDays('2026-11-30', 1)).toBe('2026-12-01')
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
  })

  it('knows the weekday', () => {
    expect(weekdayOf('2026-11-06')).toBe(5) // Friday
  })
})

describe('isBookableDate', () => {
  const today = '2026-11-06' // Friday

  it('requires the minimum notice', () => {
    expect(isBookableDate('2026-11-06', today, RULES)).toBe(false)
  })

  it('skips non-working days', () => {
    expect(isBookableDate('2026-11-07', today, RULES)).toBe(false) // Saturday
    expect(isBookableDate('2026-11-09', today, RULES)).toBe(true) // Monday
  })

  it('stops at the booking horizon', () => {
    expect(isBookableDate('2026-12-04', today, RULES)).toBe(true)
    expect(isBookableDate('2026-12-07', today, RULES)).toBe(false)
  })
})

describe('monthGrid', () => {
  it('lays out November 2026 starting on Sunday', () => {
    const weeks = monthGrid(2026, 10)
    expect(weeks[0]?.[0]).toBe('2026-11-01')
    expect(weeks.every((w) => w.length === 7)).toBe(true)
    expect(weeks.flat().filter(Boolean)).toHaveLength(30)
  })

  it('pads the first week when a month starts mid-week', () => {
    const weeks = monthGrid(2026, 11) // December 2026 starts on Tuesday
    expect(weeks[0]?.slice(0, 2)).toEqual([null, null])
    expect(weeks[0]?.[2]).toBe('2026-12-01')
  })

  it('labels months', () => {
    expect(monthLabel(2026, 10)).toBe('November 2026')
  })
})

describe('formatting', () => {
  it('formats durations', () => {
    expect(formatDuration(30)).toBe('30 min')
    expect(formatDuration(60)).toBe('1 hr')
    expect(formatDuration(90)).toBe('1 hr 30 min')
  })

  it('formats long dates', () => {
    expect(formatLongDate('2026-11-09')).toBe('Mon, 9 Nov 2026')
  })
})

describe('toContactSubmission', () => {
  it('produces a valid contact submission', () => {
    const submission = toContactSubmission({
      serviceTitle: 'Intro call',
      durationMinutes: 30,
      date: '2026-11-09',
      time: '10:00',
      timeZone: 'Africa/Lagos',
      name: '  Ada Obi ',
      email: 'ada@example.com',
      notes: '',
      startedAt: 1,
    })
    expect(contactSubmissionSchema.safeParse(submission).success).toBe(true)
    expect(submission.name).toBe('Ada Obi')
    expect(submission.subject).toContain('Mon, 9 Nov 2026 at 10:00')
    expect(submission.projectType).toBe('Call booking')
  })
})
