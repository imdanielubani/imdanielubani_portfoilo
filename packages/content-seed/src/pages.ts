import { parseSections, type SectionInput } from '@du/schemas'
import type { Page } from '@du/types'
import { media } from './media'

const PUBLISHED = '2026-11-06T00:00:00.000Z'

function buildPage(page: Omit<Page, 'sections'> & { sections: SectionInput[] }): Page {
  const { sections, rejected } = parseSections(page.sections)
  if (rejected.length > 0) {
    throw new Error('Invalid seed sections on page ' + page.slug + ': ' + JSON.stringify(rejected))
  }
  return { ...page, sections }
}

const homeSections: SectionInput[] = [
  {
    id: 'home-hero',
    type: 'hero',
    data: {
      eyebrow: 'Hi, I’m Daniel Ubani',
      headline: 'I build digital products that solve real-world problems.',
      headlineAccent: 'real-world problems.',
      body: 'I’m Daniel Ubani, a Full Stack & Mobile Engineer specializing in web, mobile, and backend systems. I turn complex ideas into scalable, reliable, and user-focused digital experiences.',
      secondaryBody:
        'From fintech platforms and AI-powered applications to hospitality systems and healthcare solutions, I build products that work in the real world.',
      location: 'Abuja, Nigeria. Open to remote, hybrid, and onsite opportunities.',
      showAvailability: true,
      image: media.portrait,
      ctas: [
        // Placeholder: replace "#" with the link to the CV from the CMS.
        { label: 'Download CV', href: '#', variant: 'secondary', download: true },
        { label: 'Let’s connect', href: '/#contact', variant: 'primary' },
      ],
    },
  },
  {
    id: 'home-intro',
    type: 'imageText',
    settings: { anchor: 'about' },
    data: {
      eyebrow: '// About me',
      heading: 'The person behind the products.',
      headingAccent: 'behind the products.',
      image: media.portrait,
      imagePosition: 'left',
      html: '<p>I’m a Full Stack & Mobile Engineer with 3+ years of experience building production web, mobile, and backend systems across fintech, hospitality, civic tech, and healthcare.</p><p>I work across architecture, API design, database modeling, frontend development, mobile engineering, integrations, and deployment, with React, Next.js, TypeScript, Node.js, NestJS, Laravel, Flutter, PostgreSQL, Redis, Docker, and the OpenAI API.</p>',
    },
  },
  {
    id: 'home-projects',
    type: 'projectGrid',
    settings: { anchor: 'work' },
    data: {
      eyebrow: '// Featured work',
      heading: 'Products built for real operations.',
      headingAccent: 'real operations.',
      description:
        'A selection of platforms across hospitality, fintech, healthcare and property management.',
      source: 'featured',
      limit: 4,
      cta: { label: 'View all projects', href: '/projects', variant: 'secondary' },
    },
  },
  {
    id: 'home-skills',
    type: 'skillsGrid',
    settings: { anchor: 'skills', background: 'surface', spacing: 'lg', hidden: false },
    data: {
      eyebrow: '// Technical expertise',
      heading: 'One engineer across the whole stack.',
      headingAccent: 'whole stack.',
      description:
        'Frontend, backend, mobile, infrastructure, AI and integrations, the tools I use to ship complete products.',
    },
  },
  {
    id: 'home-experience',
    type: 'experienceTimeline',
    settings: { anchor: 'experience' },
    data: {
      eyebrow: '// Experience',
      heading: 'Where I’ve been building.',
      headingAccent: 'building.',
    },
  },
  {
    id: 'home-services',
    type: 'services',
    settings: { anchor: 'services' },
    data: {
      eyebrow: '// Services i provide',
      heading: 'I can help you with these things',
      // Hover images reuse the placeholder covers; replace them from the CMS media library.
      items: [
        {
          title: 'Full-stack web development',
          description:
            'Complete web products, from the database and API to the interface, taken all the way through deployment.',
          tags: ['React', 'Next.js', 'Node.js', 'Laravel'],
          image: media.coverA,
        },
        {
          title: 'Mobile app development',
          description:
            'Cross-platform apps for iOS, Android and tablets from one codebase, including operations apps used by staff every day.',
          tags: ['Flutter', 'Dart', 'Riverpod', 'React Native'],
          image: media.coverB,
        },
        {
          title: 'Backend & API engineering',
          description:
            'Data models, REST and GraphQL APIs, authentication and real-time services built to hold up in production.',
          tags: ['NestJS', 'Prisma', 'PostgreSQL', 'Redis'],
          image: media.coverC,
        },
        {
          title: 'Payments & fintech integrations',
          description:
            'Payment flows and wallet features for fintech products, drawing on the Pavocard and Cardcentrals platforms I built.',
          tags: ['Paystack', 'Flutterwave', 'Monnify', 'Reloadly'],
          image: media.coverD,
        },
        {
          title: 'AI-powered product features',
          description:
            'Streaming AI chat, voice dictation, translation and retrieval features, like the civic product I built at Cviqli.',
          tags: ['OpenAI API', 'LLM Systems', 'RAG', 'Prompt Engineering'],
          image: media.coverA,
        },
      ],
    },
  },
  {
    id: 'home-testimonials',
    type: 'testimonials',
    settings: { anchor: 'testimonials' },
    data: {
      eyebrow: '// good words',
      heading: 'Some good words from people I’ve worked with.',
      headingAccent: 'people I’ve worked with.',
      // Placeholders to be replaced with real testimonials from the CMS.
      items: [
        {
          quote:
            'Placeholder testimonial. Replace this with a real quote from a client or colleague about working with Daniel.',
          author: 'Client name',
          role: 'Role',
          company: 'Company',
        },
        {
          quote:
            'Placeholder testimonial. Add a short quote about a project Daniel delivered and the difference it made.',
          author: 'Colleague name',
          role: 'Role',
          company: 'Company',
        },
        {
          quote:
            'Placeholder testimonial. Edit this entry in the CMS with a real recommendation, for example from LinkedIn.',
          author: 'Manager name',
          role: 'Role',
          company: 'Company',
        },
      ],
      inviteTitle: 'Worked with me? I’d love to hear how it went.',
      inviteBody:
        'A short recommendation helps others understand what working with me is like. It will appear here once added.',
    },
  },
  {
    id: 'home-how-it-works',
    type: 'howItWorks',
    settings: { anchor: 'hire-me' },
    data: {
      eyebrow: '// How it works',
      heading: 'No agencies. Just me, fully in on your product.',
      headingAccent: 'fully in on your product.',
      profileTitle: 'Hire me today',
      stats: [
        { value: '3+', label: 'Years shipping' },
        { value: '5', label: 'Case studies' },
        { value: '4', label: 'Industries' },
      ],
      engagement: {
        title: 'Work with me',
        description:
          'One engineer across web, mobile and backend. I design the system, build it and ship it, start to finish.',
        highlights: [
          'Full-time, contract or freelance',
          'Onsite, remote or hybrid',
          'Web, mobile and backend in one person',
          'From architecture to deployment',
        ],
        ctaLabel: 'Let’s connect',
        ctaHref: '/#contact',
      },
      booking: {
        enabled: true,
        eyebrow: '// Contact',
        heading: 'Pick a time and let’s talk.',
        headingAccent: 'let’s talk.',
        anchor: 'contact',
        title: 'Book a call',
        note: 'Pick a time that suits you. I confirm every request by email.',
        services: [
          {
            id: 'intro-call',
            title: 'Intro call',
            durationMinutes: 30,
            description: 'Talk through your product, team or role.',
          },
          {
            id: 'project-scoping',
            title: 'Project scoping',
            durationMinutes: 45,
            description: 'Walk through requirements and agree on an approach.',
          },
          {
            id: 'technical-consultation',
            title: 'Technical consultation',
            durationMinutes: 60,
            description: 'Architecture, code or delivery review.',
          },
        ],
        slotTimes: ['10:00', '11:30', '14:00', '15:30', '17:00'],
        workingDays: [1, 2, 3, 4, 5],
        timezone: 'Africa/Lagos',
        minNoticeDays: 1,
        daysAhead: 45,
      },
    },
  },
]

export const pages: Page[] = [
  buildPage({
    id: 'page-home',
    slug: 'home',
    title: 'Home',
    seo: { twitterCard: 'summary_large_image', noIndex: false, noFollow: false },
    sections: homeSections,
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
  }),
]
