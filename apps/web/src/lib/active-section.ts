/**
 * Sections count as "in view" when they cross a thin line this far down the viewport,
 * so the highlighted menu item changes as a section's heading reaches the reading area.
 */
export const ACTIVE_LINE_ROOT_MARGIN = '-40% 0px -59% 0px'

/**
 * Picks the active section from the ids currently crossing the active line, preferring
 * the latest in document order. That keeps a nested target (such as the contact panel
 * inside "How it works") active instead of its parent, and is stable when two sibling
 * sections touch the line at once.
 */
export function pickActiveSection(
  orderedIds: readonly string[],
  crossing: ReadonlySet<string>,
): string | null {
  for (let index = orderedIds.length - 1; index >= 0; index -= 1) {
    const id = orderedIds[index]
    if (id !== undefined && crossing.has(id)) return id
  }
  return null
}
