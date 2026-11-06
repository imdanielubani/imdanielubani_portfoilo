import type { SimpleIcon } from 'simple-icons'
import { cn } from '@/lib/cn'

/** A grayscale brand tile that takes on the brand colour on hover. */
export function TechLogo({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <span
      title={icon.title}
      className={cn(
        'group/logo flex size-16 shrink-0 items-center justify-center rounded-[16px] border border-line bg-surface-2 text-ink-subtle shadow-pill transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-[var(--brand)]',
        className,
      )}
      style={{ ['--brand' as string]: '#' + icon.hex }}
    >
      <svg viewBox="0 0 24 24" role="img" aria-label={icon.title} className="size-7">
        <path d={icon.path} fill="currentColor" />
      </svg>
    </span>
  )
}
