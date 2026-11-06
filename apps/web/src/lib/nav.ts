/** True when the current path is the link target or one of its children. */
export function isActivePath(pathname: string, href: string): boolean {
  if (!href.startsWith('/')) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}
