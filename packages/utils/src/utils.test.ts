import { describe, expect, it } from 'vitest'
import {
  durationLabel,
  formatDateRange,
  formatYearMonth,
  indexLabel,
  isSafeHref,
  joinUrl,
  monthsBetween,
  slugify,
  stripHtml,
  truncate,
  uniqueBy,
} from './index'

describe('strings', () => {
  it('slugifies titles', () => {
    expect(slugify('Retiro Del Rocio')).toBe('retiro-del-rocio')
    expect(slugify('  Nexryl EstateOS & AI! ')).toBe('nexryl-estateos-and-ai')
    expect(slugify('Caf\u00e9 D\u00e9j\u00e0')).toBe('cafe-deja')
  })

  it('truncates with an ellipsis', () => {
    expect(truncate('hello world', 5)).toBe('hell\u2026')
    expect(truncate('hi', 5)).toBe('hi')
  })

  it('formats index labels', () => {
    expect(indexLabel(0)).toBe('01')
    expect(indexLabel(11)).toBe('12')
  })

  it('dedupes by key', () => {
    expect(uniqueBy([{ a: '1' }, { a: '1' }, { a: '2' }], (x) => x.a)).toHaveLength(2)
  })

  it('strips html', () => {
    expect(stripHtml('<p>Hello <strong>there</strong></p>')).toBe('Hello there')
  })
})

describe('dates', () => {
  it('formats year-month values', () => {
    expect(formatYearMonth('2026-04')).toBe('Apr 2026')
    expect(formatYearMonth('2026-04', true)).toBe('April 2026')
    expect(formatYearMonth('bad')).toBe('bad')
  })

  it('formats ranges', () => {
    expect(formatDateRange('2026-04', '2026-09', { long: true })).toBe(
      'April 2026 \u2013 September 2026',
    )
    expect(formatDateRange('2026-04', null)).toBe('Apr 2026 \u2013 Present')
  })

  it('counts months inclusively', () => {
    expect(monthsBetween('2026-04', '2026-09')).toBe(6)
    expect(monthsBetween('2025-01', '2025-02')).toBe(2)
  })

  it('builds duration labels', () => {
    expect(durationLabel('2026-04', '2026-09')).toBe('6 mos')
    expect(durationLabel('2023-01', '2024-01')).toBe('1 yr 1 mo')
  })
})

describe('urls', () => {
  it('accepts safe hrefs only', () => {
    expect(isSafeHref('/projects')).toBe(true)
    expect(isSafeHref('https://x.com')).toBe(true)
    expect(isSafeHref('mailto:a@b.com')).toBe(true)
    expect(isSafeHref('javascript:alert(1)')).toBe(false)
    expect(isSafeHref('//evil.com')).toBe(false)
  })

  it('joins urls', () => {
    expect(joinUrl('https://api.test/', '/api/v1')).toBe('https://api.test/api/v1')
  })
})
