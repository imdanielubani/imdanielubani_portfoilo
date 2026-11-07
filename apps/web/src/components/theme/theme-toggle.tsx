'use client'

import { Moon, Sun } from '@phosphor-icons/react'
import { useSyncExternalStore } from 'react'
import { cn } from '@/lib/cn'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'du-theme'

function readTheme(): Theme {
  const explicit = document.documentElement.dataset.theme
  if (explicit === 'light' || explicit === 'dark') return explicit
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function subscribe(callback: () => void): () => void {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', callback)
  return () => {
    observer.disconnect()
    media.removeEventListener('change', callback)
  }
}

/** Current theme plus a toggle that applies and remembers the other one. */
export function useTheme(): { theme: Theme; next: Theme; toggle: () => void } {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'light' as Theme)
  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  function toggle() {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }

  return { theme, next, toggle }
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, next, toggle: handleToggle } = useTheme()

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={'Switch to ' + next + ' theme'}
      title={'Switch to ' + next + ' theme'}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-full border border-line text-ink-muted transition-[color,border-color,transform] duration-200 hover:border-line-strong hover:text-ink active:scale-[0.94]',
        className,
      )}
    >
      {theme === 'dark' ? (
        <Sun aria-hidden className="size-[18px]" />
      ) : (
        <Moon aria-hidden className="size-[18px]" />
      )}
    </button>
  )
}
