'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { Sparkle } from '@phosphor-icons/react'
import { useRef, useState, type PointerEvent } from 'react'
import type { SectionData } from '@du/schemas'
import { cn } from '@/lib/cn'
import { CmsImage } from '@/components/media/cms-image'
import { Accordion } from '@/components/ui/accordion'

type ServiceItem = SectionData<'services'>['items'][number]

/** Preview card size and tilt, measured from the reference. */
const CARD_WIDTH = 208
const CARD_HEIGHT = 255
const CARD_TILT_DEG = 4
const FOLLOW_SPRING = { stiffness: 320, damping: 32, mass: 0.6 }

interface ServicesListProps {
  items: ServiceItem[]
}

/**
 * Numbered service accordion. On devices with a fine pointer, hovering a row shows
 * that service's image in a tilted card that follows the cursor.
 */
export function ServicesList({ items }: ServicesListProps) {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, FOLLOW_SPRING)
  const springY = useSpring(pointerY, FOLLOW_SPRING)

  const hasImages = items.some((item) => item.image)
  const activeItem = activeIndex === null ? null : items[activeIndex]
  const isVisible = Boolean(activeItem?.image)

  function trackPointer(event: PointerEvent<HTMLDivElement>, jump: boolean) {
    const container = containerRef.current
    if (!container || event.pointerType !== 'mouse') return
    const rect = container.getBoundingClientRect()
    const x = event.clientX - rect.left - CARD_WIDTH / 2
    const y = event.clientY - rect.top - CARD_HEIGHT / 2
    if (jump) {
      // Start at the cursor instead of flying in from the previous position.
      springX.jump(x)
      springY.jump(y)
    }
    pointerX.set(x)
    pointerY.set(y)

    const row = (event.target as HTMLElement).closest<HTMLElement>('[data-accordion-index]')
    const index = row ? Number(row.dataset.accordionIndex) : null
    if (index !== activeIndex) setActiveIndex(index)
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onPointerEnter={hasImages ? (event) => trackPointer(event, true) : undefined}
      onPointerMove={hasImages ? (event) => trackPointer(event, !isVisible) : undefined}
      onPointerLeave={hasImages ? () => setActiveIndex(null) : undefined}
    >
      <Accordion
        items={items.map((item) => ({
          id: item.title,
          title: item.title,
          content: <ServiceDetails item={item} />,
        }))}
      />

      {hasImages ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-20 hidden [@media(hover:hover)_and_(pointer:fine)]:block"
          style={{
            x: reduceMotion ? pointerX : springX,
            y: reduceMotion ? pointerY : springY,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
          }}
        >
          <motion.div
            className="relative size-full rounded-[8px] bg-white/90 p-1 shadow-float"
            style={{ rotate: CARD_TILT_DEG }}
            initial={false}
            // Same values on server and client; reduced motion only removes the duration,
            // so hydration matches and the card still appears without movement.
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
            }
          >
            <div className="relative size-full overflow-hidden rounded-[6px] bg-surface">
              {items.map((item, index) =>
                item.image ? (
                  <div
                    key={item.title}
                    className={cn(
                      'absolute inset-0 transition-opacity duration-200',
                      index === activeIndex ? 'opacity-100' : 'opacity-0',
                    )}
                  >
                    <CmsImage media={item.image} sizes={CARD_WIDTH + 'px'} />
                  </div>
                ) : null,
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  )
}

function ServiceDetails({ item }: { item: ServiceItem }) {
  return (
    <div className="grid gap-3">
      {item.timeline ? (
        <p className="text-sm font-medium tracking-wide text-ink uppercase">{item.timeline}</p>
      ) : null}
      {item.tags.length > 0 ? (
        <ul
          className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm tracking-wide text-ink uppercase"
          aria-label="Tools"
        >
          {item.tags.map((tag, index) => (
            <li key={tag} className="flex items-center gap-3">
              {index > 0 ? (
                <Sparkle aria-hidden weight="fill" className="size-3 text-accent" />
              ) : null}
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      <p>{item.description}</p>
    </div>
  )
}
