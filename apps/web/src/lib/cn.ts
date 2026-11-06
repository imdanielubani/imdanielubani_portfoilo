import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/** tailwind-merge must know the custom type scale, or text-h2 + text-ink-soft collide. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'h2', 'h3', 'lead'] }],
    },
  },
})

/** Merges conditional class names and resolves Tailwind conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
