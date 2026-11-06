import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export function Tag({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] tracking-wide text-ink-muted uppercase',
        className,
      )}
      {...props}
    />
  )
}
