import {
  EnvelopeSimple,
  GithubLogo,
  Globe,
  LinkedinLogo,
  XLogo,
} from '@phosphor-icons/react/dist/ssr'
import type { SocialPlatform } from '@du/types'

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform
  className?: string
}) {
  if (platform === 'github') return <GithubLogo aria-hidden weight="fill" className={className} />
  if (platform === 'linkedin')
    return <LinkedinLogo aria-hidden weight="fill" className={className} />
  if (platform === 'x') return <XLogo aria-hidden weight="bold" className={className} />
  if (platform === 'email')
    return <EnvelopeSimple aria-hidden weight="fill" className={className} />
  return <Globe aria-hidden className={className} />
}
