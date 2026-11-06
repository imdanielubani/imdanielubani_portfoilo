import { Plus } from 'lucide-react'
import type { SectionOf } from '@du/schemas'
import { cn } from '@/lib/cn'
import { SectionShell, isDarkBackground } from '@/components/layout/section-shell'
import { AccentText } from '@/components/typography/accent-text'
import { RichText } from '@/components/typography/rich-text'

export function FaqSection({ section }: { section: SectionOf<'faq'> }) {
  const { data, settings } = section
  const onDark = isDarkBackground(settings)
  return (
    <SectionShell settings={settings}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          {data.eyebrow ? (
            <p className="eyebrow mb-5" data-reveal>
              {data.eyebrow}
            </p>
          ) : null}
          <h2 className={cn('text-h2 font-medium', onDark && 'text-on-teal')} data-reveal="heading">
            <AccentText text={data.heading} accent={data.headingAccent} />
          </h2>
        </div>
        <div className="lg:col-span-8">
          {data.items.map((item) => (
            <details
              key={item.question}
              className={cn('group border-b py-6', onDark ? 'border-on-teal/15' : 'border-line')}
              data-reveal
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  aria-hidden
                  className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <div className="pt-4">
                <RichText html={item.answer} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
