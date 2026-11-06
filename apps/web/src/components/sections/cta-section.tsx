import type { SectionOf } from '@du/schemas'
import { cn } from '@/lib/cn'
import { SectionShell } from '@/components/layout/section-shell'
import { AccentText } from '@/components/typography/accent-text'
import { CtaButton } from '@/components/ui/cta-button'

export function CtaSection({ section }: { section: SectionOf<'cta'> }) {
  const { data, settings } = section
  const isLarge = data.variant === 'large'
  return (
    <SectionShell settings={settings}>
      <div
        className={cn(
          'on-dark relative isolate overflow-hidden rounded-[calc(var(--radius-xl)*1.5)] bg-teal-900 px-6 py-16 text-on-teal md:px-16',
          isLarge ? 'md:py-28' : 'md:py-20',
        )}
        data-reveal
      >
        <div
          aria-hidden
          className="absolute -right-24 -bottom-40 -z-10 size-[30rem] rounded-full bg-accent/25 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -top-32 -left-24 -z-10 size-[24rem] rounded-full bg-teal-600/30 blur-3xl"
        />
        <div className="max-w-4xl">
          {data.eyebrow ? <p className="eyebrow mb-6">{data.eyebrow}</p> : null}
          <h2 className={cn('font-medium text-on-teal', isLarge ? 'text-display' : 'text-h2')}>
            <AccentText text={data.heading} accent={data.headingAccent} />
          </h2>
          {data.body ? (
            <p className="mt-6 max-w-xl text-lead text-on-teal-muted">{data.body}</p>
          ) : null}
          {data.ctas.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-3">
              {data.ctas.map((cta) => (
                <CtaButton key={cta.label + cta.href} cta={cta} onDark size="lg" />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </SectionShell>
  )
}
