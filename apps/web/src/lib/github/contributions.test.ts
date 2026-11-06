import { describe, expect, it } from 'vitest'
import { fromGraphqlResponse, fromPublicResponse, toWeeks, usernameFromUrl } from './contributions'

describe('fromPublicResponse', () => {
  it('maps the public mirror shape', () => {
    const calendar = fromPublicResponse('dev', {
      total: { lastYear: 3 },
      contributions: [
        { date: '2026-01-04', count: 1, level: 1 },
        { date: '2026-01-05', count: 2, level: 2 },
      ],
    })
    expect(calendar).toEqual({
      username: 'dev',
      total: 3,
      days: [
        { date: '2026-01-04', count: 1, level: 1 },
        { date: '2026-01-05', count: 2, level: 2 },
      ],
    })
  })

  it('rejects malformed payloads', () => {
    expect(fromPublicResponse('dev', { contributions: 'nope' })).toBeNull()
    expect(
      fromPublicResponse('dev', { total: {}, contributions: [{ date: 'x', count: 1, level: 9 }] }),
    ).toBeNull()
  })
})

describe('fromGraphqlResponse', () => {
  it('maps GraphQL quartiles to levels', () => {
    const calendar = fromGraphqlResponse('dev', {
      data: {
        user: {
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: 7,
              weeks: [
                {
                  contributionDays: [
                    { date: '2026-01-04', contributionCount: 0, contributionLevel: 'NONE' },
                    {
                      date: '2026-01-05',
                      contributionCount: 7,
                      contributionLevel: 'FOURTH_QUARTILE',
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    })
    expect(calendar?.total).toBe(7)
    expect(calendar?.days.map((d) => d.level)).toEqual([0, 4])
  })

  it('returns null for an unknown user', () => {
    expect(fromGraphqlResponse('ghost', { data: { user: null } })).toBeNull()
  })
})

describe('toWeeks', () => {
  it('pads the first week so days align to weekdays (Sunday first)', () => {
    // 2026-01-07 is a Wednesday: three empty cells before it.
    const weeks = toWeeks([
      { date: '2026-01-07', count: 1, level: 1 },
      { date: '2026-01-08', count: 0, level: 0 },
    ])
    expect(weeks).toHaveLength(1)
    expect(weeks[0]?.slice(0, 3)).toEqual([null, null, null])
    expect(weeks[0]?.[3]?.date).toBe('2026-01-07')
  })

  it('splits a full year into week columns', () => {
    const days = Array.from({ length: 14 }, (_, i) => ({
      date: '2026-02-' + String(i + 1).padStart(2, '0'),
      count: i,
      level: 0 as const,
    }))
    // 2026-02-01 is a Sunday, so 14 days fill exactly two weeks.
    expect(toWeeks(days)).toHaveLength(2)
  })

  it('returns no weeks for no data', () => {
    expect(toWeeks([])).toEqual([])
  })
})

describe('usernameFromUrl', () => {
  it('reads the profile name from a GitHub URL', () => {
    expect(usernameFromUrl('https://github.com/imdanielubani')).toBe('imdanielubani')
    expect(usernameFromUrl('https://github.com/imdanielubani/')).toBe('imdanielubani')
  })

  it('ignores non-GitHub or invalid URLs', () => {
    expect(usernameFromUrl('https://gitlab.com/someone')).toBeNull()
    expect(usernameFromUrl('not a url')).toBeNull()
  })
})
