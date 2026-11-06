import type { SectionOf } from '@du/schemas'
import { cn } from '@/lib/cn'
import { CmsImage } from '@/components/media/cms-image'
import { SectionShell } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'

/** Renders only real, CMS-entered testimonials. With none, the section is omitted. */
export function TestimonialsSection({ section }: { section: SectionOf<'testimonials'> }) {
  const { data, settings } = section
  if (data.items.length === 0) return null
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
      />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.items.map((item) => (
          <li key={item.author + item.quote.slice(0, 16)} data-reveal>
            <figure
              className={cn(
                'flex h-full flex-col justify-between gap-10 rounded-[var(--radius-xl)] border p-8',
                'border-line bg-surface-2',
              )}
            >
              <blockquote className={cn('text-2xl leading-snug italic', 'text-ink')}>
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                {item.avatar ? (
                  <span className="relative size-11 overflow-hidden rounded-full">
                    <CmsImage media={item.avatar} sizes="44px" />
                  </span>
                ) : null}
                <span>
                  <span className="block font-medium">{item.author}</span>
                  <span className={cn('block text-sm', 'text-ink-muted')}>
                    {[item.role, item.company].filter(Boolean).join(', ')}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
