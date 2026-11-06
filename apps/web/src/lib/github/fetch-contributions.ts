import 'server-only'
import { fromGraphqlResponse, fromPublicResponse, type ContributionCalendar } from './contributions'

const REVALIDATE_SECONDS = 60 * 60 * 6
const TIMEOUT_MS = 8000

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`

async function fromGraphql(username: string, token: string): Promise<ContributionCalendar | null> {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY, variables: { login: username } }),
    next: { revalidate: REVALIDATE_SECONDS, tags: ['github-contributions'] },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!response.ok) return null
  return fromGraphqlResponse(username, await response.json())
}

async function fromPublicMirror(username: string): Promise<ContributionCalendar | null> {
  const url =
    'https://github-contributions-api.jogruber.de/v4/' + encodeURIComponent(username) + '?y=last'
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: REVALIDATE_SECONDS, tags: ['github-contributions'] },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!response.ok) return null
  return fromPublicResponse(username, await response.json())
}

/**
 * Real contribution data for the last year. Uses GitHub's GraphQL API when
 * GITHUB_TOKEN is set, otherwise a public read-only mirror. Returns null on any
 * failure so the UI can hide the graph instead of showing made-up data.
 */
export async function getContributions(username: string): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN?.trim()
  try {
    if (token) {
      const calendar = await fromGraphql(username, token)
      if (calendar) return calendar
    }
    return await fromPublicMirror(username)
  } catch (error) {
    console.warn(
      '[github] contributions unavailable:',
      error instanceof Error ? error.message : error,
    )
    return null
  }
}
