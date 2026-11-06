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
function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || !hasFinePointer()) return
    const lenis = new Lenis({ duration: 1.1, anchors: true, autoRaf: false })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
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
  if (el.dataset.reveal === 'image')
    return { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, autoAlpha: 1 }
  return { y: 0, autoAlpha: 1 }
}

function hiddenVars(el: HTMLElement): gsap.TweenVars {
  const kind = el.dataset.reveal
  if (kind === 'image') return { clipPath: 'inset(12% 8% 12% 8%)', scale: 1.08, autoAlpha: 0 }
  if (kind === 'heading') return { y: 36, autoAlpha: 0 }
  return { y: 24, autoAlpha: 0 }
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
          clearProps: 'transform,clipPath',
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

function setupCounters(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>('[data-countup]', root).forEach((el) => {
    const original = el.textContent ?? ''
    const match = /^(\D*)(\d+)(.*)$/.exec(original)
    if (!match) return
    const prefix = match[1] ?? ''
    const target = Number(match[2])
    const suffix = match[3] ?? ''
    const state = { value: 0 }
    el.textContent = prefix + '0' + suffix
    gsap.to(state, {
      value: target,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = prefix + Math.round(state.value) + suffix
      },
      onComplete: () => {
        el.textContent = original
      },
    })
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

/** Re-scans the page after every navigation and wires scroll-driven motion. */
function usePageMotion(pathname: string) {
  useEffect(() => {
    const root = document.getElementById('main')
    if (!root || prefersReducedMotion()) {
      markReady()
      return
    }
    const ctx = gsap.context(() => {
      setupReveals(root)
      setupParallax(root)
      setupCounters(root)
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
}

/** Mounted once in the root layout. Renders nothing. */
export function MotionRoot() {
  const pathname = usePathname()
  useSmoothScroll()
  usePageMotion(pathname)
  return null
}
