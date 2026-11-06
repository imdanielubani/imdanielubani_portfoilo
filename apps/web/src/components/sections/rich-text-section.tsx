import type { SectionOf } from '@du/schemas'
import { cn } from '@/lib/cn'
import { SectionShell, isDarkBackground } from '@/components/layout/section-shell'
import { AccentText } from '@/components/typography/accent-text'
import { RichText } from '@/components/typography/rich-text'

export function RichTextSection({ section }: { section: SectionOf<'richText'> }) {
  const { data, settings } = section
  const onDark = isDarkBackground(settings)
  const isWide = data.width === 'wide'
  return (
    <SectionShell settings={settings}>
      <div className={cn('grid gap-10', isWide ? 'lg:grid-cols-12' : 'mx-auto max-w-3xl')}>
        {data.eyebrow || data.heading ? (
          <div className={cn(isWide && 'lg:col-span-5')}>
            {data.eyebrow ? (
              <p className="eyebrow mb-5" data-reveal>
                {data.eyebrow}
              </p>
            ) : null}
            {data.heading ? (
              <h2
                className={cn('text-h2 font-medium', onDark ? 'text-on-teal' : 'text-ink')}
                data-reveal="heading"
              >
                <AccentText text={data.heading} accent={data.headingAccent} />
              </h2>
            ) : null}
          </div>
        ) : null}
        <div className={cn(isWide && 'lg:col-span-7 lg:pt-12')} data-reveal>
          <RichText html={data.html} />
        </div>
      </div>
    </SectionShell>
  )
}
