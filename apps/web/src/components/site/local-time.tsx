'use client'

import { useEffect, useState } from 'react'

const MINUTE_MS = 60_000

function format(timeZone: string): string {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(
    new Date(),
  )
}

/** Live local time for the owner's timezone. Renders a stable placeholder on the server. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const update = () => setTime(format(timeZone))
    update()
    const id = window.setInterval(update, MINUTE_MS / 4)
    return () => window.clearInterval(id)
  }, [timeZone])

  return (
    <time suppressHydrationWarning className="tabular-nums">
      {time ?? '--:--'}
    </time>
  )
}
