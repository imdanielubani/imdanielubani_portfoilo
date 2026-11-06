import type { MediaAsset, SeoMeta, Section } from '@du/schemas'
import type { IsoDateTime, YearMonth } from './common'

export interface Technology {
  slug: string
  name: string
}

export interface ProjectCategory {
  slug: string
  name: string
}

export type ProjectStatus = 'live' | 'in-development' | 'completed' | 'archived'

export interface ProjectSummary {
  id: string
  slug: string
  title: string
  subtitle: string
  summary: string
  category: ProjectCategory
  industry: string
  role: string
  projectType: string
  year: string
  timeline: string
  status: ProjectStatus
  isFeatured: boolean
  technologies: Technology[]
  thumbnail: MediaAsset
  order: number
}

export interface ProjectFeature {
  title: string
  description: string
}

export interface ProjectVideo {
  title: string
  provider: 'youtube' | 'vimeo' | 'file'
  url: string
  poster?: MediaAsset | null
}

export interface ProjectLink {
  label: string
  url: string
}

export interface Project extends ProjectSummary {
  heroImage: MediaAsset
  /** Rich text (HTML). */
  overview: string
  problem: string
  objectives: string[]
  challenges: string[]
  /** Rich text (HTML). */
  solution: string
  architecture: { description: string; diagram: MediaAsset | null }
  features: ProjectFeature[]
  outcomes: string[]
  lessons: string[]
  gallery: MediaAsset[]
  videos: ProjectVideo[]
  liveUrl: string | null
  repoUrl: string | null
  extraLinks: ProjectLink[]
  /** Optional extra page-builder sections appended to the case study. */
  blocks: Section[]
  relatedSlugs: string[]
  seo: SeoMeta
  updatedAt: IsoDateTime
}

export interface ProjectDetail {
  project: Project
  previous: ProjectSummary | null
  next: ProjectSummary | null
  related: ProjectSummary[]
}

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship'

export interface Experience {
  id: string
  company: string
  role: string
  employmentType: EmploymentType
  location: string
  startDate: YearMonth
  endDate: YearMonth | null
  isCurrent: boolean
  summary: string
  responsibilities: string[]
  achievements: string[]
  technologies: string[]
  order: number
}

export interface Skill {
  id: string
  name: string
  description?: string
  icon?: string
}

export interface SkillCategory {
  id: string
  slug: string
  name: string
  description?: string
  skills: Skill[]
  order: number
}

export interface Education {
  id: string
  institution: string
  qualification: string
  startYear: number
  endYear: number
}

export interface Resume {
  summary: string
  highlights: string[]
  education: Education[]
  file: MediaAsset | null
  updatedAt: IsoDateTime
}

export interface Page {
  id: string
  slug: string
  title: string
  seo: SeoMeta
  sections: Section[]
  publishedAt: IsoDateTime
  updatedAt: IsoDateTime
}
