import type { SectionOf } from '@du/schemas'
import { cn } from '@/lib/cn'
import { CmsImage } from '@/components/media/cms-image'
import { SectionShell, isDarkBackground } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'

export function GallerySection({ section }: { section: SectionOf<'gallery'> }) {
  const { data, settings } = section
  const isMasonry = data.layout === 'masonry'
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        onDark={isDarkBackground(settings)}
      />
      <div
        className={cn(
          isMasonry
            ? 'columns-1 gap-5 sm:columns-2 lg:columns-3'
            : 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {data.images.map((image, index) => (
          <figure
            key={image.id}
            className={cn(
              'overflow-hidden rounded-[var(--radius-lg)] bg-surface',
              isMasonry ? 'mb-5 break-inside-avoid' : 'relative aspect-[4/3]',
              !isMasonry && index === 0 && 'sm:col-span-2 sm:row-span-2 sm:aspect-auto',
            )}
            data-reveal="image"
          >
            <CmsImage
              media={image}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              fill={!isMasonry}
            />
          </figure>
        ))}
      </div>
    </SectionShell>
  )
}
