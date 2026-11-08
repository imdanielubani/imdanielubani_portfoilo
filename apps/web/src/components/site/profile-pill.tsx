'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react'
import { useState, type MouseEvent } from 'react'
import { scrollToSection } from '@/components/motion/motion-root'

interface ProfilePillProps {
  name: string
  role: string
  avatarUrl: string | null
  isAvailable: boolean
}

const SHOW_AFTER_PX = 420
/** The pill opens the About section of the home page. */
const ABOUT_SECTION_ID = 'about'

/** Compact identity pill that drops in at the top once the hero is out of view. */
export function ProfilePill({ name, role, avatarUrl, isAvailable }: ProfilePillProps) {
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > SHOW_AFTER_PX
    if (next !== isVisible) setIsVisible(next)
  })

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    if (pathname === '/' && scrollToSection(ABOUT_SECTION_ID)) event.preventDefault()
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="profile-pill"
          className="fixed top-3 left-1/2 z-40 -translate-x-1/2"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, filter: 'blur(4px)' }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
        >
          <Link
            href={'/#' + ABOUT_SECTION_ID}
            onClick={handleClick}
            className="flex items-center gap-3 rounded-full border border-line bg-surface-2/95 py-1.5 pr-4 pl-1.5 shadow-pill backdrop-blur-xl transition-transform duration-200 active:scale-[0.98]"
          >
            {avatarUrl ? (
              <span className="relative size-9 overflow-hidden rounded-full">
                <Image
                  src={avatarUrl}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover object-[50%_25%]"
                />
              </span>
            ) : null}
            <span className="leading-tight">
              <span className="block text-sm font-medium whitespace-nowrap text-ink">{name}</span>
              <span className="hidden text-xs whitespace-nowrap text-ink-muted sm:block">
                {role}
              </span>
            </span>
            {isAvailable ? (
              <span className="ml-1 inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap text-success">
                <span aria-hidden className="size-1.5 rounded-full bg-success" />
                Available
              </span>
            ) : null}
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
