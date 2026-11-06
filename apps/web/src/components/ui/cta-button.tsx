import { ArrowUpRight, Download } from 'lucide-react'
import type { CtaLink } from '@du/schemas'
import { isExternalHref, isSafeHref } from '@du/utils'
import { ButtonLink, type ButtonVariantProps } from './button'

interface CtaButtonProps {
  cta: CtaLink
  size?: ButtonVariantProps['size']
  onDark?: boolean
  className?: string
}

const darkVariant = { primary: 'onDark', secondary: 'onDarkOutline', ghost: 'onDarkOutline' } as const

/** Renders a CMS-authored call to action. Unsafe hrefs are dropped. */
export function CtaButton({ cta, size = 'md', onDark, className }: CtaButtonProps) {
  if (!isSafeHref(cta.href)) return null
  const external = cta.external || isExternalHref(cta.href)
  const variant = onDark ? darkVariant[cta.variant] : cta.variant
  return (
    <ButtonLink
      href={cta.href}
      external={external}
      download={cta.download || undefined}
      variant={variant}
      size={size}
      className={className}
      data-magnetic={cta.variant === 'primary' ? '' : undefined}
    >
      <span>{cta.label}</span>
      {cta.download ? (
        <Download
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover/btn:translate-y-0.5"
        />
      ) : (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      )}
    </ButtonLink>
  )
}
