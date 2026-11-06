import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { getNavigation, getSettings } from '@/lib/content'
import { getSiteUrl } from '@/lib/content/config'
import { fontVariables } from '@/lib/fonts'
import { personJsonLd, websiteJsonLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/json-ld'
import { ThemeScript } from '@/components/theme/theme-script'
import { MotionRoot } from '@/components/motion/motion-root'
import { Cursor } from '@/components/motion/cursor'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const title = settings.defaultSeo.title ?? settings.ownerName
  return {
    metadataBase: new URL(getSiteUrl()),
    title: { default: title, template: '%s \u2014 ' + settings.ownerName },
    description: settings.defaultSeo.description,
    applicationName: settings.siteName,
    authors: [{ name: settings.ownerName }],
    creator: settings.ownerName,
    openGraph: { siteName: settings.siteName, type: 'website', locale: 'en_US' },
    twitter: { card: 'summary_large_image' },
    formatDetection: { telephone: false },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1820' },
  ],
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [settings, navigation] = await Promise.all([getSettings(), getNavigation()])
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-canvas focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <JsonLd data={[personJsonLd(settings), websiteJsonLd(settings)]} />
        <SiteHeader items={navigation.header} isAvailable={settings.isAvailable} />
        <main id="main" className="min-h-[70vh]">
          {children}
        </main>
        <SiteFooter settings={settings} navigation={navigation} />
        <MotionRoot />
        <Cursor />
      </body>
    </html>
  )
}
