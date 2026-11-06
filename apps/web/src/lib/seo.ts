import type { Metadata } from 'next'
import type { MediaAsset, SeoMeta } from '@du/schemas'
import type { SiteSettings } from '@du/types'
import { getSiteUrl } from './content/config'

interface BuildMetadataInput {
  settings: SiteSettings
  path: string
  title?: string
  description?: string
  seo?: Partial<SeoMeta>
  image?: MediaAsset | null
  type?: 'website' | 'article' | 'profile'
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  return getSiteUrl() + (path.startsWith('/') ? path : '/' + path)
}

/** Merges page-level SEO with the global defaults from site settings. */
export function buildMetadata({
  settings,
  path,
  title,
  description,
  seo,
  image,
  type = 'website',
}: BuildMetadataInput): Metadata {
  const defaults = settings.defaultSeo
  const metaTitle = seo?.title || title
  const metaDescription = seo?.description || description || defaults.description
  const ogImage = seo?.ogImage ?? image ?? defaults.ogImage ?? null
  const canonical = seo?.canonical || absoluteUrl(path)
  const ogTitle = seo?.ogTitle || metaTitle || defaults.title || settings.siteName
  const images = ogImage
    ? [
        {
          url: absoluteUrl(ogImage.url),
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
        },
      ]
    : undefined

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical },
    robots: { index: !seo?.noIndex, follow: !seo?.noFollow },
    openGraph: {
      type,
      url: canonical,
      siteName: settings.siteName,
      title: ogTitle,
      description: seo?.ogDescription || metaDescription,
      images,
      locale: 'en_US',
    },
    twitter: {
      card: seo?.twitterCard ?? 'summary_large_image',
      title: ogTitle,
      description: seo?.ogDescription || metaDescription,
      images: images?.map((i) => i.url),
    },
  }
}
