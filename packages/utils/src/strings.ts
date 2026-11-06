/** Converts arbitrary text into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

export function truncate(input: string, max: number): string {
  if (input.length <= max) return input
  return input.slice(0, Math.max(0, max - 1)).trimEnd() + '\u2026'
}

/** Pads an index as a two-digit label: 0 becomes "01". */
export function indexLabel(index: number): string {
  return String(index + 1).padStart(2, '0')
}

export function uniqueBy<T>(items: readonly T[], key: (item: T) => string): T[] {
  const seen = new Set<string>()
  return items.filter((item) => {
    const k = key(item)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

/** Strips HTML tags, used for meta descriptions derived from rich text. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
