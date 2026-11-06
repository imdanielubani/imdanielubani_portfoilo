import 'server-only'
import { cache } from 'react'
import { parseSections } from '@du/schemas'
import type {
  Experience,
  Navigation,
  Page,
  ProjectDetail,
  ProjectSummary,
  Resume,
  SiteSettings,
  SkillCategory,
} from '@du/types'
import { getContentConfig } from './config'
import { ContentError, isNotFound } from './errors'
import { apiGet } from './http'
import { seedSource } from './seed-source'
import { CONTENT_TAGS } from './tags'

/**
 * Loads content from the API, falling back to seed data when the API is not
 * configured (or unreachable) and CONTENT_FALLBACK=seed.
 */
async function load<T>(path: string, tags: string[], fromSeed: () => T): Promise<T> {
  const config = getContentConfig()
  if (!config.apiUrl) {
    if (config.fallbackToSeed) return fromSeed()
    throw new ContentError('API_URL is not configured and seed fallback is disabled', null, path)
  }
  try {
    return await apiGet<T>(path, {
      baseUrl: config.apiUrl,
      tags,
      revalidate: config.revalidateSeconds,
    })
  } catch (error) {
    if (isNotFound(error)) throw error
    if (!config.fallbackToSeed) throw error
    console.warn(
      '[content] falling back to seed for',
      path,
      error instanceof Error ? error.message : error,
    )
    return fromSeed()
  }
}

/** Loads a resource that may not exist, returning null on 404. */
async function loadOptional<T>(
  path: string,
  tags: string[],
  fromSeed: () => T | null,
): Promise<T | null> {
  try {
    return await load<T | null>(path, tags, fromSeed)
  } catch (error) {
    if (isNotFound(error)) return null
    throw error
  }
}

/** Revalidates CMS section JSON at the edge of the app; invalid sections are dropped. */
function withValidSections(page: Page): Page {
  const { sections, rejected } = parseSections(page.sections)
  if (rejected.length > 0)
    console.warn('[content] skipped invalid sections on', page.slug, rejected)
  return { ...page, sections: sections.filter((s) => !s.settings.hidden) }
}

export const getSettings = cache((): Promise<SiteSettings> =>
  load('/public/settings', [CONTENT_TAGS.settings], seedSource.settings),
)

export const getNavigation = cache((): Promise<Navigation> =>
  load('/public/navigation', [CONTENT_TAGS.navigation], seedSource.navigation),
)

export const getPage = cache(async (slug: string): Promise<Page | null> => {
  const page = await loadOptional<Page>(
    '/public/pages/' + encodeURIComponent(slug),
    [CONTENT_TAGS.pages, CONTENT_TAGS.page(slug)],
    () => seedSource.page(slug),
  )
  return page ? withValidSections(page) : null
})

/** Published pages (slug and updatedAt) for the sitemap and static params. */
export const getPageIndex = cache((): Promise<Pick<Page, 'slug' | 'updatedAt'>[]> =>
  load('/public/pages', [CONTENT_TAGS.pages], () =>
    seedSource.pages().map(({ slug, updatedAt }) => ({ slug, updatedAt })),
  ),
)

export const getProjects = cache((): Promise<ProjectSummary[]> =>
  load('/public/projects', [CONTENT_TAGS.projects], seedSource.projects),
)

export const getProject = cache((slug: string): Promise<ProjectDetail | null> =>
  loadOptional<ProjectDetail>(
    '/public/projects/' + encodeURIComponent(slug),
    [CONTENT_TAGS.projects, CONTENT_TAGS.project(slug)],
    () => seedSource.project(slug),
  ),
)

export const getExperience = cache((): Promise<Experience[]> =>
  load('/public/experience', [CONTENT_TAGS.experience], seedSource.experience),
)

export const getSkills = cache((): Promise<SkillCategory[]> =>
  load('/public/skills', [CONTENT_TAGS.skills], seedSource.skills),
)

export const getResume = cache((): Promise<Resume> =>
  load('/public/resume', [CONTENT_TAGS.resume], seedSource.resume),
)

export { CONTENT_TAGS } from './tags'
