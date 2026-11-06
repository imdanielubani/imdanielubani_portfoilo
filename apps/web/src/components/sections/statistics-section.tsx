import type { SectionOf } from '@du/schemas'
import { cn } from '@/lib/cn'
import { SectionShell, isDarkBackground } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'

export function StatisticsSection({ section }: { section: SectionOf<'statistics'> }) {
  const { data, settings } = section
  const onDark = isDarkBackground(settings)
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
        onDark={onDark}
      />
      <dl
        className={cn(
          'grid gap-px overflow-hidden rounded-[var(--radius-xl)] sm:grid-cols-2 lg:grid-cols-3',
          onDark ? 'bg-on-teal/15' : 'bg-line',
        )}
      >
        {data.items.map((item, index) => (
          <div
            key={item.label}
            className={cn(
              'flex flex-col justify-between gap-10 p-8 md:p-10',
              onDark ? 'bg-teal-900' : 'bg-canvas',
              index === 0 && 'lg:row-span-2',
            )}
            data-reveal
          >
            <dt className="order-2">
              <span
                className={cn('block text-lg font-medium', onDark ? 'text-on-teal' : 'text-ink')}
              >
                {item.label}
              </span>
              {item.description ? (
                <span
                  className={cn(
                    'mt-2 block text-sm',
                    onDark ? 'text-on-teal-muted' : 'text-ink-muted',
                  )}
                >
                  {item.description}
                </span>
              ) : null}
            </dt>
            <dd
              className={cn(
                'order-1 text-[clamp(3.5rem,8vw,6rem)] leading-none font-medium tracking-[-0.05em] tabular-nums',
                onDark ? 'text-on-teal' : 'text-ink',
              )}
            >
              <span data-countup>{item.value}</span>
            </dd>
          </div>
        ))}
      </dl>
    </SectionShell>
  )
}
