import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Navigation, SiteSettings } from '@du/types'
import { Logo } from '@du/ui'
import { isExternalHref, isSafeHref } from '@du/utils'
import { LocalTime } from './local-time'
import { SocialIcon } from './social-icon'

interface SiteFooterProps {
  settings: SiteSettings
  navigation: Navigation
}

export function SiteFooter({ settings, navigation }: SiteFooterProps) {
  const year = new Date().getFullYear()
  const socials = settings.socials.filter((s) => isSafeHref(s.url))
  return (
    <footer className="on-dark relative overflow-hidden bg-teal-900 text-on-teal">
      <div className="container-du pt-24 pb-10 md:pt-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">// Thank you for visiting</p>
            <p className="text-h2 font-medium text-on-teal">{settings.footerHeading}</p>
            <a
              href={'mailto:' + settings.email}
              className="group mt-10 inline-flex items-center gap-3 border-b border-on-teal/25 pb-2 text-xl transition-colors hover:border-accent md:text-2xl"
              data-cursor="Write"
            >
              {settings.email}
              <ArrowUpRight
                aria-hidden
                className="size-5 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <nav aria-label="Footer">
              <p className="eyebrow mb-4">Sitemap</p>
              <ul className="space-y-2.5">
                {navigation.footer.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="text-on-teal-muted transition-colors hover:text-on-teal"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="eyebrow mb-4">Elsewhere</p>
              <ul className="space-y-2.5">
                {socials.map((social) => (
                  <li key={social.url}>
                    <a
                      href={social.url}
                      className="inline-flex items-center gap-2 text-on-teal-muted transition-colors hover:text-on-teal"
                      {...(isExternalHref(social.url)
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <SocialIcon platform={social.platform} className="size-4" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow mb-4">Based in</p>
              <p className="text-on-teal-muted">{settings.location}</p>
              <p className="mt-1 font-mono text-sm text-on-teal">
                <LocalTime timeZone={settings.timezone} />{' '}
                <span className="text-on-teal-muted">WAT</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-on-teal/15 pt-8 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            aria-label="imdanielubani, home"
            className="[--logo-tile:#0d1820] text-on-teal"
          >
            <Logo />
          </Link>
          <p className="max-w-md text-sm text-on-teal-muted">{settings.footerText}</p>
          <p className="font-mono text-xs text-on-teal-muted">
            &copy; {year} {settings.copyright}
          </p>
        </div>
      </div>
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.18em] text-center text-[19vw] leading-none font-semibold tracking-[-0.06em] whitespace-nowrap text-on-teal/[0.04] select-none"
      >
        imdanielubani
      </p>
    </footer>
  )
}
