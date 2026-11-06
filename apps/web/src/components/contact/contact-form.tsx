'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, CheckCircle, CircleNotch, WarningCircle } from '@phosphor-icons/react'
import { useEffect, useId, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { contactFormSchema, type ContactFormValues } from '@du/schemas'
import { submitContact, type ContactFailure } from '@/lib/contact-client'
import { Button } from '@/components/ui/button'
import { FieldError, Input, Label, Select, Textarea } from '@/components/ui/field'

interface ContactFormProps {
  projectTypes: readonly string[]
  fallbackEmail: string
}

type Status = { state: 'idle' } | { state: 'success' } | { state: 'error'; failure: ContactFailure }

const EMPTY: ContactFormValues = { name: '', email: '', subject: '', projectType: '', message: '' }

export function ContactForm({ projectTypes, fallbackEmail }: ContactFormProps) {
  const formId = useId()
  const startedAt = useRef<number>(0)
  const honeypot = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: EMPTY,
    mode: 'onTouched',
  })

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  async function onSubmit(values: ContactFormValues) {
    setStatus({ state: 'idle' })
    const result = await submitContact({
      ...values,
      website: honeypot.current?.value ?? '',
      startedAt: startedAt.current || Date.now(),
    })
    if (result.ok) {
      setStatus({ state: 'success' })
      reset(EMPTY)
      startedAt.current = Date.now()
      return
    }
    setStatus({ state: 'error', failure: result })
  }

  const fieldId = (name: string) => formId + '-' + name
  const errorId = (name: string) => formId + '-' + name + '-error'
  const describe = (name: keyof ContactFormValues) => (errors[name] ? errorId(name) : undefined)

  return (
    <form onSubmit={(event) => handleSubmit(onSubmit)(event)} noValidate className="relative">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor={fieldId('name')}>Full name</Label>
          <Input
            id={fieldId('name')}
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe('name')}
            {...register('name')}
          />
          <FieldError id={errorId('name')} message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor={fieldId('email')}>Email</Label>
          <Input
            id={fieldId('email')}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe('email')}
            {...register('email')}
          />
          <FieldError id={errorId('email')} message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor={fieldId('subject')}>Subject</Label>
          <Input
            id={fieldId('subject')}
            placeholder="What is this about?"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={describe('subject')}
            {...register('subject')}
          />
          <FieldError id={errorId('subject')} message={errors.subject?.message} />
        </div>
        <div>
          <Label htmlFor={fieldId('projectType')}>Project type</Label>
          <Select
            id={fieldId('projectType')}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={describe('projectType')}
            {...register('projectType')}
          >
            <option value="" disabled>
              Choose one
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          <FieldError id={errorId('projectType')} message={errors.projectType?.message} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor={fieldId('message')}>Message</Label>
          <Textarea
            id={fieldId('message')}
            rows={7}
            placeholder="Tell me about the product, the team, the timeline..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describe('message')}
            {...register('message')}
          />
          <FieldError id={errorId('message')} message={errors.message?.message} />
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId('website')}>Website</label>
        <input
          ref={honeypot}
          id={fieldId('website')}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button type="submit" size="lg" variant="solid" disabled={isSubmitting} data-magnetic="">
          {isSubmitting ? (
            <>
              <CircleNotch aria-hidden weight="bold" className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send message
              <ArrowUpRight aria-hidden className="size-4" />
            </>
          )}
        </Button>
      </div>

      <div aria-live="polite" className="mt-6">
        <AnimatePresence mode="wait">
          {status.state === 'success' ? (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-success/30 bg-success/10 p-4 text-ink"
            >
              <CheckCircle
                aria-hidden
                weight="fill"
                className="mt-0.5 size-5 shrink-0 text-success"
              />
              Thanks, your message has been sent. I&apos;ll get back to you soon.
            </motion.p>
          ) : null}
          {status.state === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-danger/30 bg-danger/10 p-4 text-ink"
              role="alert"
            >
              <WarningCircle
                aria-hidden
                weight="fill"
                className="mt-0.5 size-5 shrink-0 text-danger"
              />
              <p>
                {status.failure.message}{' '}
                <a
                  className="underline decoration-accent underline-offset-4"
                  href={'mailto:' + fallbackEmail}
                >
                  Email {fallbackEmail}
                </a>
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  )
}
