import type { SectionOf } from '@du/schemas'
import { cn } from '@/lib/cn'
import { SectionShell } from '@/components/layout/section-shell'
import { RichText } from '@/components/typography/rich-text'
import { SectionHeader } from '@/components/typography/section-header'

export function CustomSection({ section }: { section: SectionOf<'custom'> }) {
  const { data, settings } = section
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
      />
      {data.html ? (
        <div className="mb-10 max-w-2xl" data-reveal>
          <RichText html={data.html} />
        </div>
      ) : null}
      {data.columns.length > 0 ? (
        <div
          className={cn(
            'grid gap-4',
            data.columns.length > 1 && 'md:grid-cols-2',
            data.columns.length > 2 && 'lg:grid-cols-3',
          )}
        >
          {data.columns.map((column, index) => (
            <div
              key={column.title}
              className={cn(
                'rounded-[var(--radius-xl)] border border-line p-7 md:p-8',
                index % 2 === 0 ? 'bg-surface-2 shadow-card' : 'bg-surface',
              )}
              data-reveal
            >
              <h3 className="mb-4 text-h3 text-ink">{column.title}</h3>
              <RichText html={column.html} className="text-base" />
            </div>
          ))}
        </div>
      ) : null}
    </SectionShell>
  )
}
