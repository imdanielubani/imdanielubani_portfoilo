import { z } from 'zod'
import { ctaLinkSchema, hrefSchema, mediaSchema } from './primitives'

/** Bump when a breaking change is made to any section data shape. */
export const SECTION_SCHEMA_VERSION = 1

const text = (max = 200) => z.string().trim().max(max)
const optionalText = (max = 200) => text(max).optional()
/** Rich text is stored as HTML produced by the editor and sanitized on write and on render. */
const richText = z.string().max(50_000)

export const sectionSettingsSchema = z.object({
  anchor: z
    .string()
    .regex(/^[a-z0-9-]*$/, 'Anchor may only contain lowercase letters, numbers and dashes')
    .max(60)
    .optional(),
  background: z.enum(['canvas', 'surface', 'teal', 'ink']).default('canvas'),
  spacing: z.enum(['none', 'sm', 'md', 'lg']).default('lg'),
  hidden: z.boolean().default(false),
})

const heading = {
  eyebrow: optionalText(60),
  heading: text(200),
  /** Optional words rendered in the editorial italic serif; must appear inside the heading. */
  headingAccent: optionalText(80),
}

const dataSchemas = {
  hero: z.object({
    eyebrow: optionalText(60),
    headline: text(200).min(1),
    headlineAccent: optionalText(80),
    body: optionalText(600),
    secondaryBody: optionalText(600),
    location: optionalText(160),
    showAvailability: z.boolean().default(true),
    ctas: z.array(ctaLinkSchema).max(3).default([]),
    image: mediaSchema.nullish(),
  }),
  richText: z.object({
    eyebrow: optionalText(60),
    heading: optionalText(200),
    headingAccent: optionalText(80),
    html: richText,
    width: z.enum(['narrow', 'wide']).default('narrow'),
  }),
  imageText: z.object({
    ...heading,
    html: richText,
    image: mediaSchema,
    imagePosition: z.enum(['left', 'right']).default('left'),
    ctas: z.array(ctaLinkSchema).max(3).default([]),
  }),
  fullWidthImage: z.object({
    image: mediaSchema,
    caption: optionalText(240),
    parallax: z.boolean().default(true),
  }),
  gallery: z.object({
    eyebrow: optionalText(60),
    heading: optionalText(200),
    images: z.array(mediaSchema).min(1).max(40),
    layout: z.enum(['grid', 'masonry']).default('grid'),
  }),
  projectGrid: z.object({
    ...heading,
    description: optionalText(400),
    source: z.enum(['featured', 'latest', 'manual']).default('featured'),
    projectSlugs: z.array(z.string()).default([]),
    limit: z.number().int().min(1).max(24).default(4),
    cta: ctaLinkSchema.nullish(),
  }),
  featuredProject: z.object({
    eyebrow: optionalText(60),
    heading: optionalText(200),
    projectSlug: z.string().min(1),
  }),
  skillsGrid: z.object({
    ...heading,
    description: optionalText(400),
    categorySlugs: z.array(z.string()).default([]),
    cta: ctaLinkSchema.nullish(),
  }),
  experienceTimeline: z.object({
    ...heading,
    description: optionalText(400),
    limit: z.number().int().min(1).max(50).optional(),
    cta: ctaLinkSchema.nullish(),
  }),
  statistics: z.object({
    eyebrow: optionalText(60),
    heading: optionalText(200),
    headingAccent: optionalText(80),
    items: z
      .array(
        z.object({
          value: text(24).min(1),
          label: text(80).min(1),
          description: optionalText(240),
        }),
      )
      .min(1)
      .max(8),
  }),
  testimonials: z.object({
    ...heading,
    items: z
      .array(
        z.object({
          quote: text(800).min(1),
          author: text(80).min(1),
          role: optionalText(80),
          company: optionalText(80),
          avatar: mediaSchema.nullish(),
        }),
      )
      .max(24)
      .default([]),
    /** Shown instead of quotes until real testimonials are added. */
    inviteTitle: text(120).default('Worked with me?'),
    inviteBody: optionalText(400),
  }),
  services: z.object({
    ...heading,
    description: optionalText(400),
    items: z
      .array(z.object({ title: text(80).min(1), description: text(600), icon: optionalText(40) }))
      .min(1)
      .max(12),
  }),
  cta: z.object({
    ...heading,
    body: optionalText(600),
    ctas: z.array(ctaLinkSchema).max(3).default([]),
    variant: z.enum(['default', 'large']).default('default'),
  }),
  contactForm: z.object({
    ...heading,
    description: optionalText(400),
    projectTypes: z.array(text(60).min(1)).max(12).default([]),
  }),
  video: z.object({
    eyebrow: optionalText(60),
    heading: optionalText(200),
    provider: z.enum(['youtube', 'vimeo', 'file']),
    url: hrefSchema,
    poster: mediaSchema.nullish(),
    caption: optionalText(240),
  }),
  faq: z.object({
    ...heading,
    items: z
      .array(z.object({ question: text(240).min(1), answer: richText }))
      .min(1)
      .max(40),
  }),
  logoCloud: z.object({
    eyebrow: optionalText(60),
    heading: optionalText(200),
    items: z
      .array(
        z.object({
          name: text(60).min(1),
          logo: mediaSchema.nullish(),
          url: hrefSchema.optional(),
        }),
      )
      .min(1)
      .max(40),
  }),
  howItWorks: z.object({
    ...heading,
    /** Heading on the profile card, e.g. "Hire me today". */
    profileTitle: text(80).default('Hire me today'),
    /** Small factual stats on the profile card, e.g. years of experience. */
    stats: z
      .array(z.object({ value: text(12).min(1), label: text(40).min(1) }))
      .max(4)
      .default([]),
    engagement: z.object({
      title: text(80).min(1),
      description: optionalText(300),
      highlights: z.array(text(120).min(1)).max(8).default([]),
      ctaLabel: text(40).default("Let's connect"),
      ctaHref: hrefSchema.default('/contact'),
    }),
    booking: z.object({
      enabled: z.boolean().default(true),
      title: text(80).default('Book a call'),
      note: optionalText(200),
      services: z
        .array(
          z.object({
            id: z.string().regex(/^[a-z0-9-]{1,40}$/),
            title: text(80).min(1),
            durationMinutes: z.number().int().min(10).max(240),
            description: optionalText(200),
            /** Optional, e.g. "Free" or "$120". Omit to show no price. */
            priceLabel: optionalText(24),
          }),
        )
        .min(1)
        .max(6),
      /** Start times offered on bookable days, 24h "HH:MM" in the owner's timezone. */
      slotTimes: z
        .array(z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/))
        .min(1)
        .max(12),
      /** Bookable weekdays, 0 = Sunday ... 6 = Saturday. */
      workingDays: z.array(z.number().int().min(0).max(6)).min(1).max(7).default([1, 2, 3, 4, 5]),
      timezone: text(60).default('Africa/Lagos'),
      minNoticeDays: z.number().int().min(0).max(30).default(1),
      daysAhead: z.number().int().min(7).max(120).default(45),
    }),
  }),
  custom: z.object({
    eyebrow: optionalText(60),
    heading: optionalText(200),
    headingAccent: optionalText(80),
    html: richText.default(''),
    columns: z
      .array(z.object({ title: text(120), html: richText }))
      .max(4)
      .default([]),
  }),
} as const

export type SectionType = keyof typeof dataSchemas
export const SECTION_TYPES = Object.keys(dataSchemas) as SectionType[]

function sectionOf<T extends SectionType>(type: T) {
  return z.object({
    id: z.string().min(1),
    type: z.literal(type),
    version: z.number().int().positive().default(SECTION_SCHEMA_VERSION),
    settings: sectionSettingsSchema.default({ background: 'canvas', spacing: 'lg', hidden: false }),
    data: dataSchemas[type],
  })
}

export const sectionSchema = z.discriminatedUnion('type', [
  sectionOf('hero'),
  sectionOf('richText'),
  sectionOf('imageText'),
  sectionOf('fullWidthImage'),
  sectionOf('gallery'),
  sectionOf('projectGrid'),
  sectionOf('featuredProject'),
  sectionOf('skillsGrid'),
  sectionOf('experienceTimeline'),
  sectionOf('statistics'),
  sectionOf('testimonials'),
  sectionOf('services'),
  sectionOf('cta'),
  sectionOf('contactForm'),
  sectionOf('video'),
  sectionOf('faq'),
  sectionOf('logoCloud'),
  sectionOf('howItWorks'),
  sectionOf('custom'),
])

export type SectionInput = z.input<typeof sectionSchema>
export type Section = z.output<typeof sectionSchema>
export type SectionSettings = z.output<typeof sectionSettingsSchema>
export type SectionOf<T extends SectionType> = Extract<Section, { type: T }>
export type SectionData<T extends SectionType> = SectionOf<T>['data']

export interface ParsedSections {
  sections: Section[]
  /** Sections that failed validation or have an unknown type; never rendered. */
  rejected: { index: number; type: unknown; reason: string }[]
}

/**
 * Validates an untrusted list of sections. Invalid or unknown sections are
 * dropped and reported instead of failing the whole page.
 */
export function parseSections(input: unknown): ParsedSections {
  const list: unknown[] = Array.isArray(input) ? input : []
  const sections: Section[] = []
  const rejected: ParsedSections['rejected'] = []
  list.forEach((raw, index) => {
    const result = sectionSchema.safeParse(raw)
    if (result.success) {
      sections.push(result.data)
      return
    }
    const type =
      typeof raw === 'object' && raw !== null ? (raw as { type?: unknown }).type : undefined
    rejected.push({ index, type, reason: result.error.issues[0]?.message ?? 'Invalid section' })
  })
  return { sections, rejected }
}
