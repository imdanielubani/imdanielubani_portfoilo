import 'server-only'
import type { ApiResponse } from '@du/types'
import { joinUrl } from '@du/utils'
import { ContentError } from './errors'

interface ApiGetOptions {
  baseUrl: string
  tags: string[]
  revalidate: number
}

const REQUEST_TIMEOUT_MS = 8000

/** GETs an API endpoint and unwraps the standard response envelope. */
export async function apiGet<T>(path: string, options: ApiGetOptions): Promise<T> {
  const url = joinUrl(options.baseUrl, '/api/v1' + path)
  let response: Response
  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: options.revalidate, tags: options.tags },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'network error'
    throw new ContentError('Content API unreachable: ' + reason, null, path)
  }

  if (response.status === 404) throw new ContentError('Not found', 404, path)
  if (!response.ok) throw new ContentError('Content API responded ' + response.status, response.status, path)

  let body: ApiResponse<T>
  try {
    body = (await response.json()) as ApiResponse<T>
  } catch {
    throw new ContentError('Content API returned invalid JSON', response.status, path)
  }
  if (!body.success || body.data === null) {
    throw new ContentError(body.error?.message ?? 'Content API returned an error', response.status, path)
  }
  return body.data
}
