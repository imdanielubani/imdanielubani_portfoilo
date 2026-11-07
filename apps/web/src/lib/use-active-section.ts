'use client'

import { useEffect, useState } from 'react'
import { ACTIVE_LINE_ROOT_MARGIN, pickActiveSection } from './active-section'

/**
 * Returns the id of the section currently in the reading area, or null (for example
 * while the hero is on screen). Pass enabled = false on pages without these sections.
 */
export function useActiveSection(ids: readonly string[], enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return
    const ordered = key.split('|').filter(Boolean)
    const elements = ordered
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const crossing = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target.id)
          else crossing.delete(entry.target.id)
        }
        setActive(pickActiveSection(ordered, crossing))
      },
      { rootMargin: ACTIVE_LINE_ROOT_MARGIN },
    )
    for (const element of elements) observer.observe(element)
    return () => observer.disconnect()
  }, [key, enabled])

  return enabled ? active : null
}
