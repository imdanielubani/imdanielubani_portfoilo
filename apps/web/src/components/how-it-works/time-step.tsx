'use client'

import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useState, useSyncExternalStore, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import {
  addDays,
  formatLongDate,
  isBookableDate,
  monthGrid,
  monthLabel,
  timeZoneLabel,
  todayInTimeZone,
  type IsoDate,
} from '@/lib/booking'
import type { BookingConfig } from './booking-widget'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

interface TimeStepProps {
  booking: BookingConfig
  date: IsoDate | null
  time: string | null
  onDateChange: (date: IsoDate) => void
  onTimeChange: (time: string) => void
  header: ReactNode
  footer: ReactNode
}

/** The calendar never changes date mid-visit in a way this widget must react to. */
function subscribeNever(): () => void {
  return () => {}
}

function fromIndex(index: number): { year: number; month: number } {
  return { year: Math.floor(index / 12), month: index % 12 }
}

function monthOf(iso: IsoDate): { year: number; month: number } {
  return { year: Number(iso.slice(0, 4)), month: Number(iso.slice(5, 7)) - 1 }
}

export function TimeStep({
  booking,
  date,
  time,
  onDateChange,
  onTimeChange,
  header,
  footer,
}: TimeStepProps) {
  // "Today" depends on the visitor's clock, so it is only known on the client.
  const today = useSyncExternalStore(
    subscribeNever,
    () => todayInTimeZone(booking.timezone),
    () => null,
  )
  /** Months navigated away from the month of the selected (or first bookable) day. */
  const [shift, setShift] = useState(0)

  const base = today ? monthOf(date ?? addDays(today, booking.minNoticeDays)) : null
  const view = base ? fromIndex(base.year * 12 + base.month + shift) : null
  const weeks = view ? monthGrid(view.year, view.month) : []

  if (!today || !view) {
    return (
      <div className="flex flex-1 flex-col" aria-busy="true">
        {header}
        <div className="h-64 animate-pulse rounded-[18px] bg-surface" />
      </div>
    )
  }

  const first = monthOf(today)
  const last = monthOf(addDays(today, booking.daysAhead))
  const canGoBack = view.year * 12 + view.month > first.year * 12 + first.month
  const canGoForward = view.year * 12 + view.month < last.year * 12 + last.month
  const shiftMonth = (delta: number) => setShift((current) => current + delta)

  return (
    <div className="flex flex-1 flex-col">
      {header}
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-3 flex items-center justify-between">
          <MonthButton label="Previous month" disabled={!canGoBack} onClick={() => shiftMonth(-1)}>
            <CaretLeft aria-hidden className="size-4" />
          </MonthButton>
          <p className="font-medium text-ink" aria-live="polite">
            {monthLabel(view.year, view.month)}
          </p>
          <MonthButton label="Next month" disabled={!canGoForward} onClick={() => shiftMonth(1)}>
            <CaretRight aria-hidden className="size-4" />
          </MonthButton>
        </div>

        <table
          className="w-full table-fixed border-separate border-spacing-y-1 text-center"
          role="grid"
        >
          <thead>
            <tr>
              {WEEKDAYS.map((day) => (
                <th
                  key={day}
                  scope="col"
                  className="pb-1 text-[0.7rem] font-normal text-ink-subtle"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => {
                  if (!day) return <td key={dayIndex} />
                  const bookable = isBookableDate(day, today, booking)
                  const selected = day === date
                  return (
                    <td key={day}>
                      <button
                        type="button"
                        disabled={!bookable}
                        aria-pressed={selected}
                        aria-label={formatLongDate(day) + (bookable ? '' : ', unavailable')}
                        onClick={() => {
                          setShift(0)
                          onDateChange(day)
                        }}
                        className={cn(
                          'relative mx-auto flex size-9 items-center justify-center rounded-full text-sm tabular-nums transition-[background-color,color,transform] duration-150 active:scale-95',
                          selected && 'bg-accent text-accent-ink',
                          !selected && bookable && 'text-ink hover:bg-surface',
                          !bookable && 'cursor-default text-ink-subtle/60',
                          day === today && !selected && 'ring-1 ring-line-strong',
                        )}
                      >
                        {Number(day.slice(8, 10))}
                        {bookable && !selected ? (
                          <span
                            aria-hidden
                            className="absolute bottom-1 size-1 rounded-full bg-accent"
                          />
                        ) : null}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 border-t border-line pt-4">
        {date ? (
          <fieldset>
            <legend className="mb-3 text-sm text-ink-muted">
              {formatLongDate(date)}, times in {timeZoneLabel(booking.timezone)}
            </legend>
            <div className="flex flex-wrap gap-2">
              {booking.slotTimes.map((slot) => {
                const checked = slot === time
                return (
                  <label
                    key={slot}
                    className={cn(
                      'cursor-pointer rounded-full border px-3.5 py-1.5 text-sm tabular-nums transition-[border-color,background-color,color] duration-150 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent',
                      checked
                        ? 'border-accent bg-accent text-accent-ink'
                        : 'border-line text-ink hover:border-line-strong',
                    )}
                  >
                    <input
                      type="radio"
                      name="booking-time"
                      value={slot}
                      checked={checked}
                      onChange={() => onTimeChange(slot)}
                      className="sr-only"
                    />
                    {slot}
                  </label>
                )
              })}
            </div>
          </fieldset>
        ) : (
          <p className="text-sm text-ink-muted">
            Pick a day marked with a dot to see available times.
          </p>
        )}
      </div>
      <div className="mt-auto flex justify-center pt-6">{footer}</div>
    </div>
  )
}

function MonthButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex size-9 items-center justify-center rounded-[10px] border border-line text-ink transition-[border-color,opacity] hover:border-line-strong disabled:opacity-40"
    >
      {children}
    </button>
  )
}
