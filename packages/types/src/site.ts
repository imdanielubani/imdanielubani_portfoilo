import type { CtaLink, MediaAsset, SeoMeta } from '@du/schemas'

export type SocialPlatform = 'github' | 'linkedin' | 'x' | 'email' | 'website' | 'other'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  url: string
}

export interface SiteSettings {
  siteName: string
  ownerName: string
  jobTitle: string
  tagline: string
  logo: MediaAsset | null
  email: string
  location: string
  /** IANA timezone used for the local-time widget. */
  timezone: string
  availability: string
  isAvailable: boolean
  socials: SocialLink[]
  footerHeading: string
  footerText: string
  copyright: string
  defaultSeo: SeoMeta
  globalCta: { heading: string; body: string; ctas: CtaLink[] }
  analytics: { gaMeasurementId?: string; plausibleDomain?: string }
  maintenanceMode: boolean
}

export interface NavigationItem {
  id: string
  label: string
  href: string
  external?: boolean
  children?: NavigationItem[]
}

export interface Navigation {
  header: NavigationItem[]
  footer: NavigationItem[]
}
