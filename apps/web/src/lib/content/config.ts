import 'server-only'

export interface ContentConfig {
  apiUrl: string | null
  fallbackToSeed: boolean
  revalidateSeconds: number
}

/** Reads content configuration from the environment on every call (cheap, and test-friendly). */
export function getContentConfig(env: NodeJS.ProcessEnv = process.env): ContentConfig {
  const apiUrl = env.API_URL?.trim() || null
  const fallback = (env.CONTENT_FALLBACK ?? 'seed').trim().toLowerCase()
  const revalidate = Number(env.CONTENT_REVALIDATE_SECONDS ?? 300)
  return {
    apiUrl,
    fallbackToSeed: fallback === 'seed',
    revalidateSeconds: Number.isFinite(revalidate) && revalidate > 0 ? revalidate : 300,
  }
}

export function getSiteUrl(env: NodeJS.ProcessEnv = process.env): string {
  return (env.SITE_URL || env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001').replace(/\/+$/, '')
}
