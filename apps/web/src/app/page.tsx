import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPage, getSettings } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { SectionRenderer } from '@/components/sections/registry'

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([getSettings(), getPage('home')])
  const metadata = buildMetadata({
    settings,
    path: '/',
    seo: page?.seo,
    title: settings.defaultSeo.title,
  })
  return {
    ...metadata,
    title: { absolute: page?.seo.title || settings.defaultSeo.title || settings.ownerName },
  }
}

export default async function HomePage() {
  const [settings, page] = await Promise.all([getSettings(), getPage('home')])
  if (!page) notFound()
  return <SectionRenderer sections={page.sections} site={settings} />
}
