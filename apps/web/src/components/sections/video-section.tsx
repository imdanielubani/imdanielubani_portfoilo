import type { SectionOf } from '@du/schemas'
import { SectionShell, isDarkBackground } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'
import { toEmbedUrl } from '@/lib/video'

export function VideoSection({ section }: { section: SectionOf<'video'> }) {
  const { data, settings } = section
  const embed = toEmbedUrl(data.provider, data.url)
  if (!embed) return null
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        onDark={isDarkBackground(settings)}
      />
      <figure data-reveal>
        <div className="relative aspect-video overflow-hidden rounded-[var(--radius-xl)] bg-surface">
          {data.provider === 'file' ? (
            <video
              src={embed}
              controls
              preload="none"
              poster={data.poster?.url}
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <iframe
              src={embed}
              title={data.heading ?? data.caption ?? 'Embedded video'}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 size-full"
            />
          )}
        </div>
        {data.caption ? (
          <figcaption className="mt-4 font-mono text-xs text-ink-muted">{data.caption}</figcaption>
        ) : null}
      </figure>
    </SectionShell>
  )
}
