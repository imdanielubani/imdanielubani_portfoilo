import { describe, expect, it } from 'vitest'
import { pickActiveSection } from './active-section'

const order = ['about', 'work', 'skills', 'services'] as const

describe('pickActiveSection', () => {
  it('returns null when no section crosses the active line', () => {
    expect(pickActiveSection(order, new Set())).toBeNull()
  })

  it('returns the crossing section', () => {
    expect(pickActiveSection(order, new Set(['skills']))).toBe('skills')
  })

  it('prefers the later section when two touch the line', () => {
    expect(pickActiveSection(order, new Set(['services', 'work']))).toBe('services')
  })

  it('keeps a nested target active over the section that contains it', () => {
    expect(pickActiveSection(['hire-me', 'contact'], new Set(['hire-me', 'contact']))).toBe(
      'contact',
    )
  })

  it('ignores ids that are not in the menu', () => {
    expect(pickActiveSection(order, new Set(['footer']))).toBeNull()
  })
})
