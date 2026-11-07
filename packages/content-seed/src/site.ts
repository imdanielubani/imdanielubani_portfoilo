import type { Navigation, SiteSettings } from '@du/types'
import { media } from './media'

export const siteSettings: SiteSettings = {
  siteName: 'imdanielubani',
  ownerName: 'Daniel Ubani',
  jobTitle: 'Full Stack & Mobile Engineer',
  tagline: 'I build digital products that solve real-world problems.',
  logo: null,
  email: 'danielubanid@gmail.com',
  location: 'Abuja, Nigeria',
  timezone: 'Africa/Lagos',
  availability: 'Open to onsite, remote, and hybrid opportunities.',
  isAvailable: true,
  socials: [
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/imdanielubani' },
    { platform: 'github', label: 'GitHub', url: 'https://github.com/imdanielubani' },
    { platform: 'email', label: 'Email', url: 'mailto:danielubanid@gmail.com' },
  ],
  footerHeading: 'Let\u2019s build something that works in the real world.',
  footerText:
    'Full Stack & Mobile Engineer building web, mobile and backend systems from Abuja, Nigeria.',
  copyright: 'Daniel Ubani',
  defaultSeo: {
    title: 'Daniel Ubani | Full Stack & Mobile Engineer',
    description:
      'Daniel Ubani is a Full Stack & Mobile Engineer in Abuja, Nigeria, building production web, mobile and backend systems across fintech, hospitality, healthcare and civic tech.',
    ogImage: media.portrait,
    twitterCard: 'summary_large_image',
    noIndex: false,
    noFollow: false,
  },
  globalCta: {
    heading: 'Have a product that needs to work in the real world?',
    body: 'I\u2019m open to onsite, remote and hybrid roles, as well as contract work. Tell me what you\u2019re building.',
    ctas: [
      {
        label: 'Let\u2019s work together',
        href: '/contact',
        variant: 'primary',
        external: false,
        download: false,
      },
      {
        label: 'Email me',
        href: 'mailto:danielubanid@gmail.com',
        variant: 'secondary',
        external: false,
        download: false,
      },
    ],
  },
  analytics: {},
  maintenanceMode: false,
}

export const navigation: Navigation = {
  // The side menu scrolls to sections of the home page; hrefs match the section anchors.
  header: [
    { id: 'nav-about', label: 'About', href: '/#about', icon: 'user' },
    { id: 'nav-work', label: 'Work', href: '/#work', icon: 'pen-nib' },
    { id: 'nav-skills', label: 'Skills', href: '/#skills', icon: 'stack' },
    { id: 'nav-experience', label: 'Experience', href: '/#experience', icon: 'briefcase' },
    { id: 'nav-services', label: 'Services', href: '/#services', icon: 'terminal' },
    { id: 'nav-hire-me', label: 'Hire me', href: '/#hire-me', icon: 'tag' },
  ],
  footer: [
    { id: 'foot-home', label: 'Home', href: '/' },
    { id: 'foot-work', label: 'Work', href: '/projects' },
    { id: 'foot-about', label: 'About', href: '/about' },
    { id: 'foot-experience', label: 'Experience', href: '/experience' },
    { id: 'foot-skills', label: 'Skills', href: '/skills' },
    { id: 'foot-services', label: 'Services', href: '/services' },
    { id: 'foot-resume', label: 'Resume', href: '/resume' },
    { id: 'foot-contact', label: 'Contact', href: '/contact' },
  ],
}
