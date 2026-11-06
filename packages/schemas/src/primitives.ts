import { z } from 'zod'

const SAFE_HREF = /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i

/** Links authored in the CMS. Rejects javascript:, data: and protocol-relative URLs. */
export const hrefSchema = z
  .string()
  .trim()
  .min(1)
  .max(2048)
  .refine((value) => SAFE_HREF.test(value), { message: 'Unsupported link protocol' })

export const mediaSchema = z.object({
  id: z.string().min(1),
  url: z
    .string()
    .min(1)
    .refine((v) => v.startsWith('/') || /^https:\/\//.test(v), {
      message: 'Media URL must be relative or https',
    }),
  alt: z.string().max(300).default(''),
  title: z.string().max(200).optional(),
  kind: z.enum(['image', 'video', 'pdf']).default('image'),
  mimeType: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  /** Focal point, 0-100 (percent). Used for object-position. */
  focalX: z.number().min(0).max(100).default(50),
  focalY: z.number().min(0).max(100).default(50),
})

export const ctaLinkSchema = z.object({
  label: z.string().trim().min(1).max(80),
  href: hrefSchema,
  variant: z.enum(['primary', 'secondary', 'ghost']).default('primary'),
  external: z.boolean().default(false),
  download: z.boolean().default(false),
})

export const seoSchema = z.object({
  title: z.string().max(120).optional(),
  description: z.string().max(320).optional(),
  canonical: z.string().optional(),
  ogTitle: z.string().max(120).optional(),
  ogDescription: z.string().max(320).optional(),
  ogImage: mediaSchema.nullish(),
  twitterCard: z.enum(['summary', 'summary_large_image']).default('summary_large_image'),
  noIndex: z.boolean().default(false),
  noFollow: z.boolean().default(false),
})

export type MediaAssetInput = z.input<typeof mediaSchema>
export type MediaAsset = z.output<typeof mediaSchema>
export type CtaLinkInput = z.input<typeof ctaLinkSchema>
export type CtaLink = z.output<typeof ctaLinkSchema>
export type SeoMetaInput = z.input<typeof seoSchema>
export type SeoMeta = z.output<typeof seoSchema>
