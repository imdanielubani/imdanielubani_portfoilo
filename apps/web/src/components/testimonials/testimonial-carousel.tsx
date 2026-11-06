'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, Quotes } from '@phosphor-icons/react'
import { useState, type KeyboardEvent, type ReactNode } from 'react'
import type { SectionData } from '@du/schemas'
import { cn } from '@/lib/cn'

type Testimonial = SectionData<'testimonials'>['items'][number]

const TILE_COUNT = 9
const CENTER = 4
const EASE = [0.23, 1, 0.32, 1] as const

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

/** Avatar tile: photo when provided, otherwise initials. */
function Tile({ person, active }: { person: Testimonial | null; active: boolean }) {
  return (
    <div
      className={cn(
        'relative aspect-square overflow-hidden rounded-[14px] border border-line transition-[filter,opacity,transform] duration-500',
        active ? 'z-10 scale-110 shadow-float' : 'bg-surface-2 opacity-60 blur-[1.5px]',
      )}
    >
      {person?.avatar ? (
        <Image src={person.avatar.url} alt="" fill sizes="96px" className="object-cover" />
      ) : person ? (
        <span
          className={cn(
            'flex size-full items-center justify-center text-lg font-medium',
            active ? 'bg-accent text-accent-ink' : 'bg-surface text-ink-subtle',
          )}
        >
          {initials(person.author)}
        </span>
      ) : null}
    </div>
  )
}

/** Quote carousel in the reference "good words" layout. Keyboard: left and right arrows. */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const current = items[index]
  if (!current) return null

  const go = (delta: number) => {
    setDirection(delta)
    setIndex((value) => (value + delta + items.length) % items.length)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') go(1)
    if (event.key === 'ArrowLeft') go(-1)
  }

  // Centre tile is the active person; the others show the rest of the list.
  const others = items.filter((_, i) => i !== index)
  const tiles = Array.from({ length: TILE_COUNT }, (_, i) => {
    if (i === CENTER) return current
    const slot = i < CENTER ? i : i - 1
    return others.length > 0 ? (others[slot % others.length] ?? null) : null
  })

  const motionProps = reduceMotion
    ? {
        initial: { opacity: 0, y: 0, filter: 'blur(0px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, y: 0, filter: 'blur(0px)' },
      }
    : {
        initial: { opacity: 0, y: 12 * direction, filter: 'blur(6px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -12 * direction, filter: 'blur(6px)' },
      }

  return (
    <div
      className="grid items-center gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-14"
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        aria-hidden
        className="mx-auto grid w-full max-w-[18rem] grid-cols-3 gap-2.5 md:max-w-none"
      >
        {tiles.map((person, i) => (
          <Tile key={i} person={person} active={i === CENTER} />
        ))}
      </div>

      <div className="min-w-0">
        <Quotes aria-hidden weight="fill" className="size-10 text-accent" />
        <div aria-live="polite" className="mt-4 min-h-[12rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure key={index} {...motionProps} transition={{ duration: 0.35, ease: EASE }}>
              <blockquote className="text-[clamp(1.25rem,2vw,1.4375rem)] leading-snug text-ink">
                {current.quote}
              </blockquote>
              <figcaption className="mt-6">
                <span className="block text-ink">{current.author}</span>
                <span className="block text-sm text-ink-muted">
                  {[current.role, current.company].filter(Boolean).join(', ')}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        {items.length > 1 ? (
          <div className="mt-6 flex items-center gap-2">
            <ArrowButton label="Previous testimonial" onClick={() => go(-1)}>
              <ArrowLeft aria-hidden weight="bold" className="size-4" />
            </ArrowButton>
            <ArrowButton label="Next testimonial" onClick={() => go(1)}>
              <ArrowRight aria-hidden weight="bold" className="size-4" />
            </ArrowButton>
            <span className="ml-2 text-sm text-ink-subtle tabular-nums">
              {index + 1} / {items.length}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function ArrowButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface-2 text-accent shadow-pill transition-[transform,border-color] duration-200 hover:border-accent active:scale-95"
    >
      {children}
    </button>
  )
}
