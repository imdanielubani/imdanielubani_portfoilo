import { describe, expect, it } from 'vitest'
import { pages, projects, skillCategories, experience } from './index'

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
