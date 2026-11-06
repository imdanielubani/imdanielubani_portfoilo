import type { SectionOf } from '@du/schemas'
import { cn } from '@/lib/cn'
import { CmsImage } from '@/components/media/cms-image'
import { SectionShell, isDarkBackground } from '@/components/layout/section-shell'
import { AccentText } from '@/components/typography/accent-text'
import { RichText } from '@/components/typography/rich-text'
import { CtaButton } from '@/components/ui/cta-button'

export function ImageTextSection({
  section,
  isFirst,
}: {
  section: SectionOf<'imageText'>
  isFirst?: boolean
}) {
  const { data, settings } = section
  const onDark = isDarkBackground(settings)
  const imageRight = data.imagePosition === 'right'
  return (
    <SectionShell settings={settings} className={cn(isFirst && 'pt-32 md:pt-40')}>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div
          className={cn('lg:col-span-5', imageRight && 'lg:order-2 lg:col-start-8')}
          data-reveal="image"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-surface shadow-float">
            <div className="absolute inset-[-6%]" data-parallax="0.1">
              <CmsImage
                media={data.image}
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority={isFirst}
              />
            </div>
          </div>
        </div>
        <div
          className={cn(
            'lg:col-span-7',
            imageRight ? 'lg:order-1' : 'lg:col-start-7 lg:col-span-6',
          )}
        >
          {data.eyebrow ? (
            <p className="eyebrow mb-5" data-reveal>
              {data.eyebrow}
            </p>
          ) : null}
          {isFirst ? (
            <h1
              className={cn('text-h2 font-medium', onDark && 'text-on-teal')}
              data-reveal="heading"
            >
              <AccentText text={data.heading} accent={data.headingAccent} />
            </h1>
          ) : (
            <h2
              className={cn('text-h2 font-medium', onDark && 'text-on-teal')}
              data-reveal="heading"
            >
              <AccentText text={data.heading} accent={data.headingAccent} />
            </h2>
          )}
          <div className="mt-8" data-reveal>
            <RichText html={data.html} />
          </div>
          {data.ctas.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-3" data-reveal>
              {data.ctas.map((cta) => (
                <CtaButton key={cta.label + cta.href} cta={cta} onDark={onDark} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </SectionShell>
  )
}
