'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor]'

/** A soft follower ring for fine pointers. The native cursor is never hidden. */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!ring || !finePointer || reduced) return

    const xTo = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })
    let visible = false

    const onMove = (event: PointerEvent) => {
      if (!visible) {
        gsap.set(ring, { x: event.clientX, y: event.clientY })
        gsap.to(ring, { autoAlpha: 1, duration: 0.3 })
        visible = true
      }
      xTo(event.clientX)
      yTo(event.clientY)
      const target = event.target instanceof Element ? event.target.closest(INTERACTIVE) : null
      const label = target instanceof HTMLElement ? target.dataset.cursor : undefined
      ring.dataset.state = label ? 'label' : target ? 'hover' : 'idle'
      ring.textContent = label ?? ''
    }
    const onLeave = () => {
      gsap.to(ring, { autoAlpha: 0, duration: 0.3 })
      visible = false
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <div ref={ringRef} aria-hidden className="du-cursor" data-state="idle" />
}
