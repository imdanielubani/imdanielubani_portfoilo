/**
 * Sections count as "in view" when they cross a thin line this far down the viewport,
 * so the highlighted menu item changes as a section's heading reaches the reading area.
 */
export const ACTIVE_LINE_ROOT_MARGIN = '-40% 0px -59% 0px'

/**
 * Picks the active section from the ids currently crossing the active line, preferring
 * document order so the result is stable when two sections touch the line at once.
 */
export function pickActiveSection(
  orderedIds: readonly string[],
  crossing: ReadonlySet<string>,
): string | null {
  return orderedIds.find((id) => crossing.has(id)) ?? null
}
