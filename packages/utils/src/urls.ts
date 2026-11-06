const SAFE_HREF = /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i

export function isSafeHref(href: string | null | undefined): href is string {
  return typeof href === 'string' && SAFE_HREF.test(href.trim())
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href)
}

/** Joins a base URL and a path without doubling slashes. */
export function joinUrl(base: string, path: string): string {
  return base.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '')
}
