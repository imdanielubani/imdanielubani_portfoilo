import type { ProjectStatus } from '@du/types'
import { cn } from '@/lib/cn'

const LABELS: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-development': 'In development',
  completed: 'Completed',
  archived: 'Archived',
}

export function ProjectStatusBadge({
  status,
  className,
}: {
  status: ProjectStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-canvas/85 px-2.5 py-1 font-mono text-[0.65rem] tracking-wider text-ink uppercase backdrop-blur',
        className,
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full',
          status === 'live' && 'bg-success',
          status === 'in-development' && 'bg-accent',
          (status === 'completed' || status === 'archived') && 'bg-ink-subtle',
        )}
      />
      {LABELS[status]}
    </span>
  )
}
