import { ArrowUpRight, DownloadSimple } from '@phosphor-icons/react/dist/ssr'
import type { CtaLink } from '@du/schemas'
import { isExternalHref, isSafeHref } from '@du/utils'
import { AccentDot, ButtonLink, type ButtonVariantProps } from './button'

interface CtaButtonProps {
  cta: CtaLink
  size?: ButtonVariantProps['size']
  className?: string
}

/** Renders a CMS-authored call to action. Unsafe hrefs are dropped. */
export function CtaButton({ cta, size = 'md', className }: CtaButtonProps) {
  if (!isSafeHref(cta.href)) return null
  const external = cta.external || isExternalHref(cta.href)
  const variant =
    cta.variant === 'ghost' ? 'ghost' : cta.variant === 'secondary' ? 'secondary' : 'primary'
  return (
    <ButtonLink
      href={cta.href}
      external={external}
      download={cta.download || undefined}
      variant={variant}
      size={size}
      className={className}
      data-magnetic={variant === 'primary' ? '' : undefined}
    >
      {variant === 'primary' && !cta.download ? <AccentDot /> : null}
      <span>{cta.label}</span>
      {cta.download ? (
        <DownloadSimple
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover/btn:translate-y-0.5"
        />
      ) : variant !== 'primary' ? (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      ) : null}
    </ButtonLink>
  )
}
