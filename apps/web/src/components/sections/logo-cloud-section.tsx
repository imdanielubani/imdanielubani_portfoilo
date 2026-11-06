import Image from 'next/image'
import type { SectionOf } from '@du/schemas'
import { isExternalHref, isSafeHref } from '@du/utils'
import { cn } from '@/lib/cn'
import { SectionShell, isDarkBackground } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'

export function LogoCloudSection({ section }: { section: SectionOf<'logoCloud'> }) {
  const { data, settings } = section
  const onDark = isDarkBackground(settings)
  return (
    <SectionShell settings={settings}>
      <SectionHeader eyebrow={data.eyebrow} heading={data.heading} onDark={onDark} />
      <ul
        className={cn(
          'grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-xl)] sm:grid-cols-3 lg:grid-cols-5',
          onDark ? 'bg-on-teal/15' : 'bg-line',
        )}
      >
        {data.items.map((item) => {
          const content = item.logo ? (
            <Image
              src={item.logo.url}
              alt={item.logo.alt || item.name}
              width={140}
              height={48}
              className="h-8 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ) : (
            <span className="text-lg font-medium tracking-tight">{item.name}</span>
          )
          return (
            <li
              key={item.name}
              className={cn(
                'flex min-h-28 items-center justify-center p-6 text-center',
                onDark ? 'bg-teal-900' : 'bg-canvas',
              )}
              data-reveal
            >
              {item.url && isSafeHref(item.url) ? (
                <a
                  href={item.url}
                  {...(isExternalHref(item.url)
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          )
        })}
      </ul>
    </SectionShell>
  )
}
