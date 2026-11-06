'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const PATTERN = /^(\D*)(\d+)(.*)$/

/**
 * Counts a statistic up when it scrolls into view. Server HTML and first client
 * render show the final value, so there is no hydration mismatch and no-JS
 * visitors still see the number.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const match = PATTERN.exec(value)
    if (!inView || reduceMotion || !match) return
    const prefix = match[1] ?? ''
    const target = Number(match[2])
    const suffix = match[3] ?? ''
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (latest) => setDisplay(prefix + Math.round(latest) + suffix),
      onComplete: () => setDisplay(value),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, value])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  )
}
