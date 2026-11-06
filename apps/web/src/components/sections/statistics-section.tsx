import type { SectionOf } from '@du/schemas'
import { cn } from '@/lib/cn'
import { CountUp } from '@/components/motion/count-up'
import { SectionShell } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'

export function StatisticsSection({ section }: { section: SectionOf<'statistics'> }) {
  const { data, settings } = section
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
      />
      <dl className="grid gap-4 sm:grid-cols-2 md:grid-cols-6">
        {data.items.map((item, index) => (
          <div
            key={item.label}
            className={cn(
              'flex flex-col justify-between gap-8 rounded-[var(--radius-xl)] border border-line p-6 md:p-7',
              index === 0
                ? 'bg-accent-soft md:col-span-3 md:row-span-2'
                : 'bg-surface-2 shadow-card',
              index > 0 && index < 3 && 'md:col-span-3',
              index >= 3 && 'md:col-span-3',
            )}
            data-reveal
          >
            <dt className="order-2">
              <span className="block text-lg text-ink">{item.label}</span>
              {item.description ? (
                <span className="mt-1 block text-sm text-ink-muted">{item.description}</span>
              ) : null}
            </dt>
            <dd
              className={cn(
                'order-1 font-medium tracking-[-0.04em] text-ink tabular-nums',
                index === 0
                  ? 'text-[clamp(4.5rem,10vw,7.5rem)] leading-none text-accent'
                  : 'text-5xl',
              )}
            >
              <CountUp value={item.value} />
            </dd>
          </div>
        ))}
      </dl>
    </SectionShell>
  )
}
