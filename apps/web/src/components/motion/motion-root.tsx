'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'expo.out'
const READY_ATTR = 'data-motion-ready'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function hasFinePointer(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function markReady() {
  document.documentElement.setAttribute(READY_ATTR, '')
}

/** Smooth scrolling (desktop only), synced with ScrollTrigger through the GSAP ticker. */
let lenisInstance: Lenis | null = null

function useSmoothScroll() {
  useEffect(() => {
    if (lenisInstance || prefersReducedMotion() || !hasFinePointer()) return
    const lenis = new Lenis({ duration: 1.1, anchors: true, autoRaf: false })
    lenisInstance = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

function animateWords(heading: HTMLElement, delay: number) {
  const words = heading.querySelectorAll<HTMLElement>('[data-word]')
  return gsap.fromTo(
    words,
    { yPercent: 110 },
    { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.06, delay },
  )
}

function revealVars(el: HTMLElement): gsap.TweenVars {
  if (el.dataset.reveal === 'image') {
    return { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, autoAlpha: 1 }
  }
  return { y: 0, autoAlpha: 1, filter: 'blur(0px)' }
}

/** Reference-style entrance: content rises slightly out of a soft blur. */
function hiddenVars(el: HTMLElement): gsap.TweenVars {
  const kind = el.dataset.reveal
  if (kind === 'image') return { clipPath: 'inset(10% 6% 10% 6%)', scale: 1.06, autoAlpha: 0 }
  if (kind === 'heading') return { y: 18, autoAlpha: 0, filter: 'blur(10px)' }
  return { y: 16, autoAlpha: 0, filter: 'blur(6px)' }
}

function setupReveals(root: HTMLElement) {
  const elements = gsap.utils.toArray<HTMLElement>('[data-reveal]', root)
  elements.forEach((el) => {
    if (el.dataset.reveal === 'words') {
      gsap.set(el, { autoAlpha: 1 })
      gsap.set(el.querySelectorAll('[data-word]'), { yPercent: 110 })
      return
    }
    gsap.set(el, hiddenVars(el))
  })

  ScrollTrigger.batch(elements, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => {
      ;(batch as HTMLElement[]).forEach((el, index) => {
        const delay = index * 0.08
        if (el.dataset.reveal === 'words') {
          animateWords(el, delay)
          return
        }
        gsap.to(el, {
          ...revealVars(el),
          duration: el.dataset.reveal === 'image' ? 1.2 : 0.9,
          ease: EASE,
          delay,
          clearProps: 'transform,clipPath,filter',
        })
      })
    },
  })
}

function setupParallax(root: HTMLElement) {
  if (!hasFinePointer()) return
  gsap.utils.toArray<HTMLElement>('[data-parallax]', root).forEach((el) => {
    const amount = Number(el.dataset.parallax) || 0.12
    gsap.fromTo(
      el,
      { yPercent: -amount * 50 },
      {
        yPercent: amount * 50,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  })
}

/** Lines marked data-progress-line draw downward as their container scrolls through. */
function setupProgressLines(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>('[data-progress-line]', root).forEach((line) => {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: line.parentElement ?? line,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true,
        },
      },
    )
  })
}

function setupMagnetic(): () => void {
  if (!hasFinePointer()) return () => {}
  const cleanups = gsap.utils.toArray<HTMLElement>('[data-magnetic]').map((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      xTo((event.clientX - (rect.left + rect.width / 2)) * 0.25)
      yTo((event.clientY - (rect.top + rect.height / 2)) * 0.35)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      gsap.set(el, { clearProps: 'transform' })
    }
  })
  return () => cleanups.forEach((fn) => fn())
}

/**
 * Wires scroll-driven motion for the page it is rendered in. Render it as the last
 * child of a page so its effect runs after that page's tree has hydrated (it sets
 * inline styles, which must not happen before hydration).
 */
export function PageMotion() {
  const pathname = usePathname()
  useEffect(() => {
    const root = document.getElementById('main')
    if (!root || prefersReducedMotion()) {
      markReady()
      return
    }
    const ctx = gsap.context(() => {
      setupReveals(root)
      setupParallax(root)
      setupProgressLines(root)
    }, root)
    const detachMagnetic = setupMagnetic()
    markReady()
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => {
      window.clearTimeout(refresh)
      detachMagnetic()
      ctx.revert()
    }
  }, [pathname])
  return null
}

/** Mounted once in the root layout: desktop smooth scrolling. Renders nothing. */
export function SmoothScroll() {
  useSmoothScroll()
  return null
}
