export type { CtaLink, MediaAsset, SeoMeta, Section, SectionType } from '@du/schemas'

/** Consistent API envelope returned by every NestJS endpoint. */
export interface ApiResponse<T> {
  success: boolean
  data: T | null
  error: { code: string; message: string; details?: unknown } | null
  meta?: PaginationMeta
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface Paginated<T> {
  items: T[]
  meta: PaginationMeta
}

/** Year-month string, e.g. 2026-04. */
export type YearMonth = string

/** ISO-8601 timestamp. */
export type IsoDateTime = string
