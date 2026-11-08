import { describe, expect, it } from 'vitest'
import { pages, projects, skillCategories, experience, navigation } from './index'

describe('content seed', () => {
  it('has unique project slugs that resolve related projects', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const project of projects) {
      for (const related of project.relatedSlugs) expect(slugs).toContain(related)
    }
  })

  it('does not ship invented project years', () => {
    expect(projects.every((p) => p.year === '')).toBe(true)
  })

  it('includes the required system pages', () => {
    expect(pages.map((p) => p.slug)).toEqual(expect.arrayContaining(['home', 'about']))
  })

  it('home page has a valid hero section first', () => {
    const home = pages.find((p) => p.slug === 'home')
    expect(home?.sections[0]?.type).toBe('hero')
  })

  it('covers all six CV skill categories', () => {
    expect(skillCategories.map((c) => c.name)).toEqual([
      'Frontend',
      'Backend',
      'Mobile',
      'Databases & DevOps',
      'AI & Integrations',
      'Testing',
    ])
  })

  it('lists experience newest first', () => {
    expect(experience.map((e) => e.company)).toEqual(['Cviqli Technologies', 'Zicstack Innovation'])
  })
})

describe('home How it works', () => {
  it('offers bookable services and only real stats', () => {
    const home = pages.find((p) => p.slug === 'home')
    const section = home?.sections.find((s) => s.type === 'howItWorks')
    expect(section).toBeDefined()
    if (section?.type !== 'howItWorks') return
    expect(section.data.booking.services.length).toBeGreaterThan(0)
    expect(section.data.booking.services.every((s) => !s.priceLabel)).toBe(true)
    expect(section.data.stats.map((s) => s.value)).toEqual(['3+', '5', '4'])
    expect(section.data.booking.eyebrow).toBe('// Contact')
    expect(section.data.booking.anchor).toBe('contact')
  })
})

describe('home testimonials', () => {
  it('replaces achievements and ships only clearly marked placeholder quotes', () => {
    const home = pages.find((p) => p.slug === 'home')
    expect(home?.sections.some((s) => s.type === 'statistics')).toBe(false)
    const section = home?.sections.find((s) => s.type === 'testimonials')
    expect(section?.type).toBe('testimonials')
    if (section?.type !== 'testimonials') return
    expect(section.data.items).toHaveLength(3)
    expect(
      section.data.items.every((item) => item.quote.startsWith('Placeholder testimonial.')),
    ).toBe(true)
  })
})

describe('home services', () => {
  it('replaces the philosophy section with services that each have a hover image', () => {
    const home = pages.find((p) => p.slug === 'home')
    const types = home?.sections.map((s) => s.id) ?? []
    expect(types).not.toContain('home-philosophy')
    const section = home?.sections.find((s) => s.id === 'home-services')
    expect(section?.type).toBe('services')
    if (section?.type !== 'services') return
    expect(section.data.eyebrow).toBe('// Services i provide')
    expect(section.data.items).toHaveLength(5)
    expect(section.data.items.every((item) => item.image && item.tags.length > 0)).toBe(true)
  })

  it('keeps good words directly after the services', () => {
    const ids = pages.find((p) => p.slug === 'home')?.sections.map((s) => s.id) ?? []
    expect(ids.indexOf('home-testimonials')).toBe(ids.indexOf('home-services') + 1)
  })
})

describe('home section anchors', () => {
  it('gives each linked home section a unique anchor', () => {
    const home = pages.find((p) => p.slug === 'home')
    const anchors = (home?.sections ?? []).map((s) => s.settings.anchor).filter(Boolean)
    expect(anchors).toEqual([
      'about',
      'work',
      'skills',
      'experience',
      'services',
      'testimonials',
      'hire-me',
    ])
  })
})

describe('side menu', () => {
  it('links only to sections that exist on the home page', () => {
    const sections = pages.find((p) => p.slug === 'home')?.sections ?? []
    const anchors = new Set(sections.map((s) => s.settings.anchor))
    for (const section of sections) {
      if (section.type === 'howItWorks' && section.data.booking.anchor) {
        anchors.add(section.data.booking.anchor)
      }
    }
    expect(navigation.header.length).toBeGreaterThan(0)
    for (const item of navigation.header) {
      expect(item.href.startsWith('/#')).toBe(true)
      expect(anchors.has(item.href.slice(2))).toBe(true)
      expect(item.icon).toBeTruthy()
    }
  })
})
