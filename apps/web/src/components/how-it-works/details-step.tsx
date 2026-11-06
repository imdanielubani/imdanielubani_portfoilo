'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarCheck, CheckCircle, CircleNotch, WarningCircle } from '@phosphor-icons/react'
import { useId, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formatDuration, formatLongDate, toContactSubmission, type IsoDate } from '@/lib/booking'
import { submitContact, type ContactFailure } from '@/lib/contact-client'
import { Button } from '@/components/ui/button'
import { FieldError, Input, Label, Textarea } from '@/components/ui/field'

const detailsSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name').max(100),
  email: z.email('Please enter a valid email address').max(254),
  notes: z.string().trim().max(2000, 'Notes are too long').optional().default(''),
})
type DetailsValues = z.input<typeof detailsSchema>

interface DetailsStepProps {
  service: { title: string; durationMinutes: number }
  date: IsoDate
  time: string
  timeZone: string
  /** Read at submit time (not during render). */
  getStartedAt: () => number
  fallbackEmail: string
  header: ReactNode
  onDone: () => void
}

export function DetailsStep({
  service,
  date,
  time,
  timeZone,
  getStartedAt,
  fallbackEmail,
  header,
  onDone,
}: DetailsStepProps) {
  const formId = useId()
  const [sent, setSent] = useState(false)
  const [failure, setFailure] = useState<ContactFailure | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DetailsValues>({ resolver: zodResolver(detailsSchema), mode: 'onTouched' })

  const when = formatLongDate(date) + ' at ' + time

  async function onSubmit(values: DetailsValues) {
    setFailure(null)
    const result = await submitContact(
      toContactSubmission({
        serviceTitle: service.title,
        durationMinutes: service.durationMinutes,
        date,
        time,
        timeZone,
        name: values.name,
        email: values.email,
        notes: values.notes ?? '',
        startedAt: getStartedAt(),
      }),
    )
    if (result.ok) setSent(true)
    else setFailure(result)
  }

  if (sent) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
        <CheckCircle aria-hidden weight="fill" className="size-12 text-success" />
        <p className="mt-4 text-xl text-ink">Request sent</p>
        <p className="mt-2 max-w-[34ch] text-sm text-ink-muted">
          {service.title} on {when} ({timeZone}). I&apos;ll confirm by email.
        </p>
        <Button variant="secondary" size="sm" className="mt-6" onClick={onDone}>
          Book another time
        </Button>
      </div>
    )
  }

  const mailto =
    'mailto:' +
    fallbackEmail +
    '?subject=' +
    encodeURIComponent('Call request: ' + service.title + ', ' + when) +
    '&body=' +
    encodeURIComponent(
      'Hello,\n\nI would like to book a ' +
        service.title.toLowerCase() +
        ' on ' +
        when +
        ' (' +
        timeZone +
        ').\n\n',
    )

  return (
    <form
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      noValidate
      className="flex flex-1 flex-col"
    >
      {header}
      <div className="mb-5 flex items-start gap-3 rounded-[16px] bg-accent-soft/70 p-4">
        <CalendarCheck
          aria-hidden
          weight="duotone"
          className="mt-0.5 size-5 shrink-0 text-accent"
        />
        <p className="text-sm text-ink-soft">
          <span className="font-medium text-ink">{service.title}</span>,{' '}
          {formatDuration(service.durationMinutes)}
          <br />
          {when} ({timeZone})
        </p>
      </div>
      <div className="grid gap-4">
        <div>
          <Label htmlFor={formId + '-name'}>Full name</Label>
          <Input
            id={formId + '-name'}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? formId + '-name-error' : undefined}
            {...register('name')}
          />
          <FieldError id={formId + '-name-error'} message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor={formId + '-email'}>Email</Label>
          <Input
            id={formId + '-email'}
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? formId + '-email-error' : undefined}
            {...register('email')}
          />
          <FieldError id={formId + '-email-error'} message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor={formId + '-notes'}>
            What would you like to discuss?{' '}
            <span className="font-normal text-ink-subtle">(optional)</span>
          </Label>
          <Textarea
            id={formId + '-notes'}
            rows={3}
            className="min-h-24"
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={errors.notes ? formId + '-notes-error' : undefined}
            {...register('notes')}
          />
          <FieldError id={formId + '-notes-error'} message={errors.notes?.message} />
        </div>
      </div>

      <div aria-live="polite">
        {failure ? (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2.5 rounded-[14px] border border-danger/30 bg-danger/10 p-3 text-sm text-ink"
          >
            <WarningCircle
              aria-hidden
              weight="fill"
              className="mt-0.5 size-4 shrink-0 text-danger"
            />
            <p>
              {failure.message}{' '}
              <a href={mailto} className="underline decoration-accent underline-offset-4">
                Send the request by email
              </a>
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-auto pt-6">
        <Button type="submit" variant="solid" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <CircleNotch aria-hidden weight="bold" className="size-4 animate-spin" />
              Sending request
            </>
          ) : (
            'Request this time'
          )}
        </Button>
      </div>
    </form>
  )
}
