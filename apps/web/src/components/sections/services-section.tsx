import type { SectionOf } from '@du/schemas'
import { indexLabel } from '@du/utils'
import { cn } from '@/lib/cn'
import { FeatureIcon } from '@/components/icons/feature-icon'
import { SectionShell, isDarkBackground } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'

export function ServicesSection({ section }: { section: SectionOf<'services'> }) {
  const { data, settings } = section
  const onDark = isDarkBackground(settings)
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
        description={data.description}
        onDark={onDark}
      />
      <ol className="grid gap-4 md:grid-cols-2">
        {data.items.map((item, index) => (
          <li
            key={item.title}
            className={cn(
              'group relative overflow-hidden rounded-[var(--radius-xl)] border p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 md:p-9',
              onDark
                ? 'border-on-teal/15 hover:border-on-teal/40'
                : 'border-line bg-surface-2 hover:border-ink',
            )}
            data-reveal
          >
            <div className="flex items-start justify-between gap-6">
              <span
                className={cn(
                  'inline-flex size-12 items-center justify-center rounded-2xl transition-colors duration-500',
                  onDark
                    ? 'bg-on-teal/10 text-on-teal'
                    : 'bg-surface text-ink group-hover:bg-accent group-hover:text-accent-ink',
                )}
              >
                <FeatureIcon name={item.icon} className="size-5" />
              </span>
              <span className="font-mono text-xs text-ink-subtle">{indexLabel(index)}</span>
            </div>
            <h3 className={cn('mt-10 text-h3 font-medium', onDark ? 'text-on-teal' : 'text-ink')}>
              {item.title}
            </h3>
            <p className={cn('mt-3 max-w-md', onDark ? 'text-on-teal-muted' : 'text-ink-muted')}>
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}
