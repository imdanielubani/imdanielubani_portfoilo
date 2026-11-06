import type { SectionOf } from '@du/schemas'
import { CmsImage } from '@/components/media/cms-image'
import { SectionShell } from '@/components/layout/section-shell'

export function FullWidthImageSection({ section }: { section: SectionOf<'fullWidthImage'> }) {
  const { data, settings } = section
  return (
    <SectionShell settings={settings}>
      <figure>
        <div
          className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-xl)] bg-surface"
          data-reveal="image"
        >
          <div className="absolute inset-[-8%]" data-parallax={data.parallax ? '0.15' : undefined}>
            <CmsImage media={data.image} sizes="100vw" />
          </div>
        </div>
        {data.caption ? (
          <figcaption className="mt-4 font-mono text-xs tracking-wide text-ink-muted">
            {data.caption}
          </figcaption>
        ) : null}
      </figure>
    </SectionShell>
  )
}
