import { cn } from '@/lib/cn'

/** The small green "Available" status pill (real availability state from settings). */
export function AvailabilityBadge({
  label = 'Available',
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-success shadow-pill',
        className,
      )}
    >
      <span aria-hidden className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
        <span className="relative inline-flex size-1.5 rounded-full bg-success" />
      </span>
      {label}
    </span>
  )
}
