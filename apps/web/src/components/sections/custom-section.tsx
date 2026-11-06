import type { SectionOf } from '@du/schemas'
import { cn } from '@/lib/cn'
import { SectionShell, isDarkBackground } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'
import { RichText } from '@/components/typography/rich-text'

export function CustomSection({ section }: { section: SectionOf<'custom'> }) {
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
      {data.html ? (
        <div className="mb-12 max-w-3xl" data-reveal>
          <RichText html={data.html} />
        </div>
      ) : null}
      {data.columns.length > 0 ? (
        <div
          className={cn(
            'grid gap-6',
            data.columns.length > 1 && 'md:grid-cols-2',
            data.columns.length > 2 && 'lg:grid-cols-3',
          )}
        >
          {data.columns.map((column) => (
            <div
              key={column.title}
              className={cn(
                'rounded-[var(--radius-xl)] border p-8 md:p-10',
                onDark ? 'border-on-teal/15' : 'border-line bg-surface-2',
              )}
              data-reveal
            >
              <h3 className={cn('mb-5 text-h3 font-medium', onDark && 'text-on-teal')}>
                {column.title}
              </h3>
              <RichText html={column.html} className="text-base" />
            </div>
          ))}
        </div>
      ) : null}
    </SectionShell>
  )
}
