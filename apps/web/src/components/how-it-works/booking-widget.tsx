'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, CaretRight } from '@phosphor-icons/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { SectionData } from '@du/schemas'
import { cn } from '@/lib/cn'
import { formatDuration, type IsoDate } from '@/lib/booking'
import { DetailsStep } from './details-step'
import { TimeStep } from './time-step'

export type BookingConfig = SectionData<'howItWorks'>['booking']
type Step = 1 | 2 | 3

const STEP_TITLES: Record<Step, string> = {
  1: 'Select service',
  2: 'Choose time',
  3: 'Your details',
}
const EASE = [0.23, 1, 0.32, 1] as const

interface BookingWidgetProps {
  booking: BookingConfig
  fallbackEmail: string
}

export function BookingWidget({ booking, fallbackEmail }: BookingWidgetProps) {
  /** When the widget became interactive; the API uses it for spam timing checks. */
  const startedAt = useRef(0)
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState(1)
  const [serviceId, setServiceId] = useState<string | null>(null)
  const [date, setDate] = useState<IsoDate | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const hasInteracted = useRef(false)

  const service = booking.services.find((s) => s.id === serviceId) ?? null

  function goTo(next: Step) {
    hasInteracted.current = true
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  // Move focus to the new step so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (hasInteracted.current) bodyRef.current?.focus({ preventScroll: true })
  }, [step])

  const slide = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: 24 * direction, filter: 'blur(4px)' },
        animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, x: -24 * direction, filter: 'blur(4px)' },
      }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface-2 shadow-card">
      <div className="bg-[linear-gradient(135deg,#ff6a1a,#e24e00)] px-6 pt-6 pb-12 text-white md:px-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-2xl font-medium tracking-tight">{STEP_TITLES[step]}</p>
            <p className="mt-0.5 text-sm text-white/85">Step {step} of 3</p>
          </div>
          <div aria-hidden className="mt-2 flex items-center gap-1.5">
            {([1, 2, 3] as Step[]).map((dot) => (
              <span
                key={dot}
                className={cn(
                  'h-1.5 rounded-full transition-[width,background-color] duration-300',
                  dot === step ? 'w-6 bg-white' : 'w-1.5 bg-white/45',
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={bodyRef}
        tabIndex={-1}
        aria-label={'Booking, step ' + step + ' of 3: ' + STEP_TITLES[step]}
        className="relative -mt-6 flex flex-1 flex-col rounded-t-[var(--radius-xl)] bg-surface-2 p-5 outline-none md:p-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            {...slide}
            transition={{ duration: 0.28, ease: EASE }}
            className="flex flex-1 flex-col"
          >
            {step === 1 ? (
              <ServiceStep
                booking={booking}
                selectedId={serviceId}
                onSelect={setServiceId}
                footer={
                  <NextButton
                    disabled={!service}
                    onClick={() => goTo(2)}
                    label="Continue to time"
                  />
                }
              />
            ) : step === 2 ? (
              <TimeStep
                booking={booking}
                date={date}
                time={time}
                onDateChange={(next) => {
                  setDate(next)
                  setTime(null)
                }}
                onTimeChange={setTime}
                header={<BackButton onClick={() => goTo(1)} />}
                footer={
                  <NextButton
                    disabled={!date || !time}
                    onClick={() => goTo(3)}
                    label="Continue to your details"
                  />
                }
              />
            ) : service && date && time ? (
              <DetailsStep
                service={service}
                date={date}
                time={time}
                timeZone={booking.timezone}
                getStartedAt={() => startedAt.current || Date.now()}
                fallbackEmail={fallbackEmail}
                header={<BackButton onClick={() => goTo(2)} />}
                onDone={() => {
                  setServiceId(null)
                  setDate(null)
                  setTime(null)
                  goTo(1)
                }}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

interface ServiceStepProps {
  booking: BookingConfig
  selectedId: string | null
  onSelect: (id: string) => void
  footer: ReactNode
}

function ServiceStep({ booking, selectedId, onSelect, footer }: ServiceStepProps) {
  return (
    <>
      <fieldset>
        <legend className="sr-only">Choose a service</legend>
        <div className="grid gap-3">
          {booking.services.map((service) => {
            const checked = service.id === selectedId
            return (
              <label
                key={service.id}
                className={cn(
                  'flex cursor-pointer gap-3 rounded-[18px] border p-4 transition-[border-color,background-color,box-shadow] duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent',
                  checked
                    ? 'border-accent bg-accent-soft/60 shadow-pill'
                    : 'border-line hover:border-line-strong',
                )}
              >
                <input
                  type="radio"
                  name="booking-service"
                  value={service.id}
                  checked={checked}
                  onChange={() => onSelect(service.id)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    'mt-1.5 size-3 shrink-0 rounded-full border-2 transition-colors',
                    checked ? 'border-accent bg-accent' : 'border-ink-subtle',
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-medium text-ink">{service.title}</span>
                    {service.priceLabel ? (
                      <span className="text-sm font-medium text-ink">{service.priceLabel}</span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-subtle">
                    {formatDuration(service.durationMinutes)}
                  </span>
                  {service.description ? (
                    <span className="mt-1 block text-sm text-ink-muted">{service.description}</span>
                  ) : null}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>
      {booking.note ? <p className="mt-4 text-xs text-ink-muted">{booking.note}</p> : null}
      <div className="mt-auto flex justify-center pt-6">{footer}</div>
    </>
  )
}

export function NextButton({
  disabled,
  onClick,
  label,
}: {
  disabled: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="inline-flex size-14 items-center justify-center rounded-full bg-accent text-accent-ink shadow-float transition-[transform,background-color] duration-200 hover:scale-105 active:scale-95 disabled:bg-line-strong disabled:text-ink-subtle disabled:shadow-none disabled:hover:scale-100"
    >
      <CaretRight aria-hidden weight="bold" className="size-5" />
    </button>
  )
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 inline-flex items-center gap-1.5 self-start rounded-full text-sm text-ink-muted transition-colors hover:text-ink"
    >
      <ArrowLeft aria-hidden className="size-4" />
      Back
    </button>
  )
}
