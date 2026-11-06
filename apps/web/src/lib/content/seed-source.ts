import * as seed from '@du/content-seed'
import type {
  Experience,
  Navigation,
  Page,
  Project,
  ProjectDetail,
  ProjectSummary,
  Resume,
  SiteSettings,
  SkillCategory,
} from '@du/types'

/*
 * Mirrors the public API using the bundled seed. Used in development before the
 * API exists, and as a resilience fallback. Pure functions so they are easy to test.
 */

const RELATED_LIMIT = 3

export function toSummary(project: Project): ProjectSummary {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    summary: project.summary,
    category: project.category,
    industry: project.industry,
    role: project.role,
    projectType: project.projectType,
    year: project.year,
    timeline: project.timeline,
    status: project.status,
    isFeatured: project.isFeatured,
    technologies: project.technologies,
    thumbnail: project.thumbnail,
    order: project.order,
  }
}

function byOrder<T extends { order: number }>(a: T, b: T): number {
  return a.order - b.order
}

export function listProjects(projects: Project[] = seed.projects): ProjectSummary[] {
  return [...projects].sort(byOrder).map(toSummary)
}

export function findProjectDetail(slug: string, projects: Project[] = seed.projects): ProjectDetail | null {
  const ordered = [...projects].sort(byOrder)
  const index = ordered.findIndex((p) => p.slug === slug)
  const project = ordered[index]
  if (index === -1 || !project) return null

  const previous = ordered[index - 1] ?? null
  const next = ordered[index + 1] ?? null
  const explicit = project.relatedSlugs
    .map((s) => ordered.find((p) => p.slug === s))
    .filter((p): p is Project => Boolean(p))
  const sameCategory = ordered.filter(
    (p) => p.slug !== slug && p.category.slug === project.category.slug && !explicit.includes(p),
  )
  const related = [...explicit, ...sameCategory].slice(0, RELATED_LIMIT).map(toSummary)

  return {
    project,
    previous: previous ? toSummary(previous) : null,
    next: next ? toSummary(next) : null,
    related,
  }
}

export const seedSource = {
  settings: (): SiteSettings => seed.siteSettings,
  navigation: (): Navigation => seed.navigation,
  page: (slug: string): Page | null => seed.pages.find((p) => p.slug === slug) ?? null,
  pages: (): Page[] => seed.pages,
  projects: (): ProjectSummary[] => listProjects(),
  project: (slug: string): ProjectDetail | null => findProjectDetail(slug),
  experience: (): Experience[] => [...seed.experience].sort(byOrder),
  skills: (): SkillCategory[] => [...seed.skillCategories].sort(byOrder),
  resume: (): Resume => seed.resume,
}
