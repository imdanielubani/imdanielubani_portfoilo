import { Globe, Mail } from 'lucide-react'
import type { SocialPlatform } from '@du/types'
import { GithubIcon, LinkedinIcon } from '@/components/icons/brand'

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform
  className?: string
}) {
  if (platform === 'github') return <GithubIcon className={className} />
  if (platform === 'linkedin') return <LinkedinIcon className={className} />
  if (platform === 'email') return <Mail className={className} aria-hidden />
  return <Globe className={className} aria-hidden />
}
