import { describe, expect, it } from 'vitest'
import { isActivePath, sectionIdFromHref } from './nav'

describe('sectionIdFromHref', () => {
  it('reads the id from home section links', () => {
    expect(sectionIdFromHref('/#about')).toBe('about')
    expect(sectionIdFromHref('#hire-me')).toBe('hire-me')
  })

  it('ignores page links, external links and unsafe ids', () => {
    expect(sectionIdFromHref('/projects')).toBeNull()
    expect(sectionIdFromHref('https://example.com/#about')).toBeNull()
    expect(sectionIdFromHref('/#')).toBeNull()
    expect(sectionIdFromHref('/#About Me')).toBeNull()
    expect(sectionIdFromHref('/#a"]')).toBeNull()
  })
})

describe('isActivePath', () => {
  it('matches a page and its children but not section links', () => {
    expect(isActivePath('/projects/pavocard', '/projects')).toBe(true)
    expect(isActivePath('/', '/')).toBe(true)
    expect(isActivePath('/about', '/#about')).toBe(false)
  })
})
