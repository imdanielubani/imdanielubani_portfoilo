import { z } from 'zod'

/** One day in the contribution calendar. Level follows GitHub's 0-4 intensity scale. */
export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionCalendar {
  username: string
  total: number
  days: ContributionDay[]
}

const levelSchema = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4)])

/** Response shape of the public mirror (github-contributions-api.jogruber.de). */
export const publicResponseSchema = z.object({
  total: z.record(z.string(), z.number().int().nonnegative()),
  contributions: z.array(
    z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      count: z.number().int().nonnegative(),
      level: levelSchema,
    }),
  ),
})

const GRAPHQL_LEVELS: Record<string, ContributionDay['level']> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

/** Response shape of GitHub's official GraphQL contributionsCollection query. */
export const graphqlResponseSchema = z.object({
  data: z.object({
    user: z
      .object({
        contributionsCollection: z.object({
          contributionCalendar: z.object({
            totalContributions: z.number().int().nonnegative(),
            weeks: z.array(
              z.object({
                contributionDays: z.array(
                  z.object({
                    date: z.string(),
                    contributionCount: z.number().int().nonnegative(),
                    contributionLevel: z.string(),
                  }),
                ),
              }),
            ),
          }),
        }),
      })
      .nullable(),
  }),
})

export function fromPublicResponse(username: string, raw: unknown): ContributionCalendar | null {
  const parsed = publicResponseSchema.safeParse(raw)
  if (!parsed.success) return null
  const days = parsed.data.contributions
  const total = parsed.data.total.lastYear ?? days.reduce((sum, day) => sum + day.count, 0)
  return { username, total, days }
}

export function fromGraphqlResponse(username: string, raw: unknown): ContributionCalendar | null {
  const parsed = graphqlResponseSchema.safeParse(raw)
  const calendar = parsed.success
    ? parsed.data.data.user?.contributionsCollection.contributionCalendar
    : null
  if (!calendar) return null
  const days = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: GRAPHQL_LEVELS[day.contributionLevel] ?? 0,
    })),
  )
  return { username, total: calendar.totalContributions, days }
}

/**
 * Groups days into week columns (Sunday first), padding the first week so the
 * grid lines up like GitHub's own calendar.
 */
export function toWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (days.length === 0) return []
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
  const first = sorted[0]
  const leading = first ? new Date(first.date + 'T00:00:00Z').getUTCDay() : 0
  const cells: (ContributionDay | null)[] = [...Array<null>(leading).fill(null), ...sorted]
  const weeks: (ContributionDay | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

/** Extracts a GitHub username from a profile URL such as https://github.com/name. */
export function usernameFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    if (!/(^|\.)github\.com$/.test(parsed.hostname)) return null
    const name = parsed.pathname.split('/').filter(Boolean)[0]
    return name && /^[a-z\d](?:[a-z\d-]{0,38})$/i.test(name) ? name : null
  } catch {
    return null
  }
}
