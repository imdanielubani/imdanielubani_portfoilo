import { describe, expect, it } from 'vitest'
import { parseSections, sectionSchema } from './sections'
import { contactSubmissionSchema, isLikelyBot } from './contact'

describe('parseSections', () => {
  it('keeps valid sections and applies default settings', () => {
    const { sections, rejected } = parseSections([
      { id: 'a', type: 'richText', data: { html: '<p>Hi</p>' } },
    ])
    expect(rejected).toHaveLength(0)
    expect(sections[0]?.settings).toEqual({ background: 'canvas', spacing: 'lg', hidden: false })
  })

  it('drops unknown section types instead of throwing', () => {
    const { sections, rejected } = parseSections([
      { id: 'a', type: 'carousel3d', data: {} },
      { id: 'b', type: 'cta', data: { heading: 'Hello' } },
    ])
    expect(sections.map((s) => s.type)).toEqual(['cta'])
    expect(rejected[0]).toMatchObject({ index: 0, type: 'carousel3d' })
  })

  it('returns no sections for non-array input', () => {
    expect(parseSections(null).sections).toEqual([])
  })

  it('rejects javascript links in CTAs', () => {
    const result = sectionSchema.safeParse({
      id: 'x',
      type: 'cta',
      data: { heading: 'Hi', ctas: [{ label: 'Click', href: 'javascript:alert(1)' }] },
    })
    expect(result.success).toBe(false)
  })
})

describe('contact submission', () => {
  const valid = {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    subject: 'Project enquiry',
    projectType: 'Web application',
    message: 'I would like to talk about building a product together.',
    startedAt: 1_000,
  }

  it('accepts a valid submission', () => {
    expect(contactSubmissionSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects a filled honeypot', () => {
    expect(contactSubmissionSchema.safeParse({ ...valid, website: 'spam.com' }).success).toBe(false)
  })

  it('flags submissions completed too quickly', () => {
    expect(isLikelyBot({ website: '', startedAt: 1_000 }, 1_500)).toBe(true)
    expect(isLikelyBot({ website: '', startedAt: 1_000 }, 10_000)).toBe(false)
  })
})

describe('howItWorks section', () => {
  const base = {
    id: 'how',
    type: 'howItWorks',
    data: {
      heading: 'How it works',
      engagement: { title: 'Work with me' },
      booking: {
        services: [{ id: 'intro-call', title: 'Intro call', durationMinutes: 30 }],
        slotTimes: ['10:00', '14:30'],
      },
    },
  }

  it('applies booking defaults', () => {
    const { sections } = parseSections([base])
    const section = sections[0]
    expect(section?.type).toBe('howItWorks')
    if (section?.type !== 'howItWorks') return
    expect(section.data.booking.workingDays).toEqual([1, 2, 3, 4, 5])
    expect(section.data.booking.timezone).toBe('Africa/Lagos')
    expect(section.data.engagement.ctaHref).toBe('/contact')
  })

  it('rejects malformed slot times', () => {
    const bad = {
      ...base,
      data: { ...base.data, booking: { ...base.data.booking, slotTimes: ['25:00'] } },
    }
    expect(parseSections([bad]).sections).toHaveLength(0)
  })

  it('rejects a booking with no services', () => {
    const bad = { ...base, data: { ...base.data, booking: { ...base.data.booking, services: [] } } }
    expect(parseSections([bad]).sections).toHaveLength(0)
  })
})
