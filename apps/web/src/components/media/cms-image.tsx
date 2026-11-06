import Image from 'next/image'
import type { MediaAsset } from '@du/schemas'
import { cn } from '@/lib/cn'

interface CmsImageProps {
  media: MediaAsset
  sizes: string
  className?: string
  priority?: boolean
  /** Fill the nearest positioned parent (use with an aspect-ratio container). */
  fill?: boolean
}

/** next/image wrapper that honours the CMS focal point and alt text. */
export function CmsImage({ media, sizes, className, priority, fill = true }: CmsImageProps) {
  const style = { objectPosition: media.focalX + '% ' + media.focalY + '%' }
  if (fill) {
    return (
      <Image
        src={media.url}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', className)}
        style={style}
      />
    )
  }
  return (
    <Image
      src={media.url}
      alt={media.alt}
      width={media.width ?? 1600}
      height={media.height ?? 1000}
      sizes={sizes}
      priority={priority}
      className={cn('h-auto w-full', className)}
      style={style}
    />
  )
}
