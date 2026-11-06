'use client'

import Image from 'next/image'
import { motion, useReducedMotion, useSpring } from 'motion/react'
import { useRef, useState, type PointerEvent } from 'react'
import type { MediaAsset } from '@du/schemas'
import { LogoMark } from '@du/ui'
import { cn } from '@/lib/cn'

interface LanyardBadgeProps {
  image: MediaAsset
  name: string
  role: string
  priority?: boolean
}

const MAX_TILT_DEG = 26
const DRAG_TO_DEG = 0.16

/**
 * An ID badge hanging from a strap. Drag it sideways and it swings back on a
 * spring; when idle it sways gently. Purely decorative, so it is aria-hidden
 * apart from the portrait alt text.
 */
export function LanyardBadge({ image, name, role, priority }: LanyardBadgeProps) {
  const reduceMotion = useReducedMotion()
  const rotate = useSpring(0, { stiffness: 140, damping: 7, mass: 0.9 })
  const startX = useRef<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return
    startX.current = event.clientX
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (startX.current === null) return
    const delta = (event.clientX - startX.current) * DRAG_TO_DEG
    rotate.set(Math.max(-MAX_TILT_DEG, Math.min(MAX_TILT_DEG, -delta)))
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    startX.current = null
    setIsDragging(false)
    rotate.set(0)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <div className="pointer-events-none relative h-full min-h-[34rem] w-full">
      <div
        className={cn(
          'absolute top-0 left-1/2 -ml-[7.5rem] w-60 origin-top',
          !isDragging && !reduceMotion && 'sway',
        )}
      >
        <motion.div style={{ rotate, transformOrigin: '50% 0%' }} className="origin-top">
          <div
            aria-hidden
            className="mx-auto h-36 w-4 bg-[linear-gradient(90deg,#2b2b2b,#4a4a4a_45%,#1f1f1f)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)] dark:bg-[linear-gradient(90deg,#0e0e0e,#2a2a2a_45%,#090909)]"
          />
          <div
            aria-hidden
            className="relative z-10 mx-auto -mt-1 h-7 w-5 rounded-b-md border-2 border-[#8a8a8a] bg-[linear-gradient(180deg,#d9d9d9,#9b9b9b)]"
          />
          <div
            className="pointer-events-auto relative -mt-1 cursor-grab touch-none overflow-hidden rounded-[18px] bg-surface-2 shadow-float select-none active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div aria-hidden className="h-2 bg-accent" />
            <div
              aria-hidden
              className="absolute top-4 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-canvas/80"
            />
            <div className="relative aspect-[4/5]">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="240px"
                preload={priority}
                draggable={false}
                className="object-cover"
                style={{ objectPosition: image.focalX + '% ' + image.focalY + '%' }}
              />
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{name}</p>
                <p className="truncate text-xs text-ink-muted">{role}</p>
              </div>
              <LogoMark size={26} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
