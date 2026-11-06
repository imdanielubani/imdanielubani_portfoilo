import Link from 'next/link'
import type { Navigation, SiteSettings } from '@du/types'
import { LogoMark } from '@du/ui'
import { isExternalHref, isSafeHref } from '@du/utils'
import { SocialIcon } from './social-icon'

interface SiteFooterProps {
  settings: SiteSettings
  navigation: Navigation
}

export function SiteFooter({ settings, navigation }: SiteFooterProps) {
  const year = new Date().getFullYear()
  const socials = settings.socials.filter((s) => isSafeHref(s.url))
  return (
    <footer className="relative pb-32 lg:pb-16">
      <div className="relative flex items-center justify-center">
        <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
        <ul className="relative flex gap-2 bg-canvas px-3">
          {socials.map((social) => (
            <li key={social.url}>
              <a
                href={social.url}
                aria-label={social.label}
                title={social.label}
                className="inline-flex size-10 items-center justify-center rounded-[12px] border border-line-strong bg-surface-2 text-ink-soft shadow-pill transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-accent active:scale-[0.95]"
                {...(isExternalHref(social.url)
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <SocialIcon platform={social.platform} className="size-[18px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="frame-pad mt-16 grid items-center gap-6 text-center md:grid-cols-[1fr_auto_1fr] md:text-left">
        <p className="text-ink-muted md:text-right">Thank you for visiting</p>
        <Link
          href="/"
          aria-label="Back to home"
          className="mx-auto block rotate-[-6deg] transition-transform duration-500 hover:rotate-0"
        >
          <LogoMark size={88} className="drop-shadow-[0_14px_22px_rgb(27_58_75/0.35)]" />
        </Link>
        <p className="text-ink-muted">{settings.footerHeading}</p>
      </div>

      <div className="frame-pad mt-14 text-center">
        <p aria-hidden className="font-signature text-5xl leading-none text-ink-soft">
          {settings.ownerName}
        </p>
        <nav aria-label="Footer" className="mt-8">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink-muted">
            {navigation.footer.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-6 text-xs text-ink-subtle">
          &copy; {year} {settings.copyright}. {settings.location}.
        </p>
      </div>
    </footer>
  )
}
