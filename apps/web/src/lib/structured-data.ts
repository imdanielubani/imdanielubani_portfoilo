import type { Project, SiteSettings } from '@du/types'
import { isExternalHref } from '@du/utils'
import { absoluteUrl } from './seo'

export function personJsonLd(settings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.ownerName,
    jobTitle: settings.jobTitle,
    email: 'mailto:' + settings.email,
    url: absoluteUrl('/'),
    image: settings.defaultSeo.ogImage ? absoluteUrl(settings.defaultSeo.ogImage.url) : undefined,
    address: { '@type': 'PostalAddress', addressLocality: 'Abuja', addressCountry: 'NG' },
    sameAs: settings.socials.map((s) => s.url).filter(isExternalHref),
  }
}

export function websiteJsonLd(settings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.siteName,
    url: absoluteUrl('/'),
  }
}

export function projectJsonLd(project: Project, settings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.title + ' \u2014 ' + project.subtitle,
    description: project.summary,
    url: absoluteUrl('/projects/' + project.slug),
    image: absoluteUrl(project.heroImage.url),
    author: { '@type': 'Person', name: settings.ownerName },
    keywords: project.technologies.map((t) => t.name).join(', '),
    dateModified: project.updatedAt,
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
