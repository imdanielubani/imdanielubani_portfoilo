/** True when the current path is the link target or one of its children. */
export function isActivePath(pathname: string, href: string): boolean {
  if (!href.startsWith('/')) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

const SECTION_ID = /^[a-z0-9-]{1,60}$/

/**
 * Returns the section id for a home page section link ("/#about" or "#about"),
 * or null when the href points somewhere else.
 */
export function sectionIdFromHref(href: string): string | null {
  const match = /^\/?#(.+)$/.exec(href.trim())
  const id = match?.[1]
  return id && SECTION_ID.test(id) ? id : null
}
