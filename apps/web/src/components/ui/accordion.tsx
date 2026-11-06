'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Plus } from '@phosphor-icons/react'
import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface AccordionItem {
  id: string
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  numbered?: boolean
  /** Index opened initially; -1 keeps everything closed. */
  defaultOpen?: number
}

/** Numbered disclosure list in the reference style. Keyboard and screen-reader friendly. */
export function Accordion({ items, numbered = true, defaultOpen = -1 }: AccordionProps) {
  const baseId = useId()
  const reduceMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  return (
    <ul className="divide-y divide-line-strong border-y border-line-strong">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = baseId + '-panel-' + index
        const buttonId = baseId + '-button-' + index
        return (
          <li key={item.id} data-reveal>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left text-xl text-ink transition-colors hover:text-ink-soft md:text-[1.6rem]"
              >
                <span>
                  {numbered ? <span className="text-ink-subtle">{index + 1}. </span> : null}
                  {item.title}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent shadow-pill transition-transform duration-300 ease-[var(--ease-out)]',
                    isOpen && 'rotate-45',
                  )}
                >
                  <Plus weight="bold" className="size-3.5" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="panel"
                  initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-[62ch] pb-6 text-ink-muted">{item.content}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
