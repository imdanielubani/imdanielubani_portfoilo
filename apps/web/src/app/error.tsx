'use client'

import { useEffect } from 'react'
import { Button, ButtonLink } from '@/components/ui/button'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[web] route error', error.digest ?? error.message)
  }, [error])

  return (
    <section className="container-du flex min-h-[80vh] flex-col justify-center pt-32 pb-20">
      <p className="eyebrow mb-6">// Something went wrong</p>
      <h1 className="text-h2 max-w-3xl font-medium">This page could not be loaded right now.</h1>
      <p className="mt-5 max-w-xl text-lead text-ink-muted">Please try again in a moment.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/" variant="secondary">
          Back to home
        </ButtonLink>
      </div>
    </section>
  )
}
