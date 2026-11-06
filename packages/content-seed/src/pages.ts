import { parseSections, type SectionInput } from '@du/schemas'
import type { Page } from '@du/types'
import { media } from './media'

const PUBLISHED = '2026-11-06T00:00:00.000Z'
const RESUME_URL = media.resume.url

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
        { label: 'Explore My Work', href: '/projects', variant: 'primary' },
        { label: 'Let’s Work Together', href: '/contact', variant: 'secondary' },
        { label: 'Download My Resume', href: RESUME_URL, variant: 'ghost', download: true },
      ],
    },
  },
  {
    id: 'home-intro',
    type: 'imageText',
    data: {
      eyebrow: '// About me',
      heading: 'The person behind the products.',
      headingAccent: 'behind the products.',
      image: media.portrait,
      imagePosition: 'left',
      html: '<p>I’m a Full Stack & Mobile Engineer with 3+ years of experience building production web, mobile, and backend systems across fintech, hospitality, civic tech, and healthcare.</p><p>I work across architecture, API design, database modeling, frontend development, mobile engineering, integrations, and deployment, with React, Next.js, TypeScript, Node.js, NestJS, Laravel, Flutter, PostgreSQL, Redis, Docker, and the OpenAI API.</p>',
      ctas: [{ label: 'More about me', href: '/about', variant: 'secondary' }],
    },
  },
  {
    id: 'home-projects',
    type: 'projectGrid',
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
    settings: { background: 'surface', spacing: 'lg', hidden: false },
    data: {
      eyebrow: '// Technical expertise',
      heading: 'One engineer across the whole stack.',
      headingAccent: 'whole stack.',
      description:
        'Frontend, backend, mobile, infrastructure, AI and integrations, the tools I use to ship complete products.',
      cta: { label: 'Explore skills', href: '/skills', variant: 'secondary' },
    },
  },
  {
    id: 'home-experience',
    type: 'experienceTimeline',
    data: {
      eyebrow: '// Experience',
      heading: 'Where I’ve been building.',
      headingAccent: 'building.',
      cta: { label: 'Full experience', href: '/experience', variant: 'secondary' },
    },
  },
  {
    id: 'home-achievements',
    type: 'statistics',
    settings: { background: 'canvas', spacing: 'lg', hidden: false },
    data: {
      eyebrow: '// Selected achievements',
      heading: 'Small numbers, real outcomes.',
      headingAccent: 'real outcomes.',
      items: [
        {
          value: '3+',
          label: 'Years shipping production systems',
          description: 'Web, mobile and backend across four industries.',
        },
        {
          value: '98',
          label: 'Lighthouse performance score',
          description: 'Zicstack Innovation corporate website.',
        },
        {
          value: '5',
          label: 'Nigerian languages',
          description: 'Full product translation delivered at Cviqli.',
        },
        {
          value: '2',
          label: 'Markets, one codebase',
          description: 'Pavocard serves Nigeria and Ghana.',
        },
        {
          value: '6',
          label: 'Staff departments',
          description: 'Run on the Retiro Del Rocio tablet apps.',
        },
      ],
    },
  },
  {
    id: 'home-philosophy',
    type: 'services',
    data: {
      eyebrow: '// Working philosophy',
      heading: 'How I approach engineering.',
      headingAccent: 'engineering.',
      items: [
        {
          title: 'Product mindset',
          description:
            'I care about how systems are designed, how people experience them, and how they evolve as a business grows.',
          icon: 'compass',
        },
        {
          title: 'Built for real conditions',
          description:
            'Software has to perform under real-world load, flaky networks and messy data, not just in a demo.',
          icon: 'shield',
        },
        {
          title: 'End-to-end ownership',
          description:
            'From architecture and data modeling to UI and deployment, I take responsibility for the whole outcome.',
          icon: 'layers',
        },
        {
          title: 'Clarity over cleverness',
          description:
            'Readable code, clear APIs and documented decisions make products easier to grow and hand over.',
          icon: 'sparkles',
        },
      ],
    },
  },
  {
    id: 'home-how-it-works',
    type: 'howItWorks',
    data: {
      eyebrow: '// How it works',
      heading: 'No agencies. Just me, fully in on your product.',
      headingAccent: 'fully in on your product.',
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
        ctaHref: '/contact',
      },
      booking: {
        enabled: true,
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

const aboutSections: SectionInput[] = [
  {
    id: 'about-intro',
    type: 'imageText',
    data: {
      eyebrow: '// About me',
      heading: 'The engineer behind the products.',
      headingAccent: 'behind the products.',
      image: media.portrait,
      imagePosition: 'left',
      html: '<p>I’m Daniel Ubani, a Full Stack & Mobile Engineer passionate about building technology that solves meaningful problems.</p><p>Over the past 3+ years, I’ve worked across fintech, hospitality, healthcare, and civic technology, developing web applications, mobile products, backend systems, and AI-powered solutions.</p><p>I approach engineering with a product mindset. I care about how systems are designed, how users experience them, how they perform under real-world conditions, and how they can evolve as a business grows.</p>',
      ctas: [
        { label: 'Download CV', href: RESUME_URL, variant: 'primary', download: true },
        { label: 'Get in touch', href: '/contact', variant: 'secondary' },
      ],
    },
  },
  {
    id: 'about-journey',
    type: 'richText',
    settings: { background: 'surface', spacing: 'lg', hidden: false },
    data: {
      eyebrow: '// Career journey',
      heading: 'From computer science to complete products.',
      headingAccent: 'complete products.',
      width: 'wide',
      html: '<p>I studied Computer Science at the National Open University of Nigeria (2019 to 2023). Since then I’ve focused on shipping complete products rather than isolated features.</p><p>I architected Retiro Del Rocio, a hotel operations platform with Flutter tablet apps for guests and six staff departments that now runs the hotel’s full daily operations. I built two fintech platforms: Pavocard, which serves Nigeria and Ghana from one codebase, and Cardcentrals, which I built end to end from UI design to payment services. I also built a Laravel booking system for Kedali, a US non-emergency medical transport startup.</p><p>In 2025 I built a corporate website for Zicstack Innovation that reached a 98% Lighthouse performance score. In 2026, at Cviqli Technologies, I built an AI-powered civic product from scratch: streaming AI chat with voice dictation, translation across five Nigerian languages, Node.js/Prisma services, and Flutter apps for iOS and Android.</p><p>Today I’m building Nexryl EstateOS, an AI smart estate management platform, as an ongoing personal project.</p>',
    },
  },
  {
    id: 'about-approach',
    type: 'services',
    data: {
      eyebrow: '// Engineering philosophy',
      heading: 'How I work.',
      headingAccent: 'work.',
      items: [
        {
          title: 'Start with the problem',
          description:
            'I begin with the people and the operation the software serves, then choose the architecture.',
          icon: 'compass',
        },
        {
          title: 'Design the data first',
          description:
            'Clear data models and APIs make every client (web, mobile or admin) simpler to build.',
          icon: 'database',
        },
        {
          title: 'Ship in slices',
          description: 'I deliver working, deployable increments so feedback arrives early.',
          icon: 'rocket',
        },
        {
          title: 'Own production',
          description:
            'Deployment, monitoring and reliability are part of the job, not an afterthought.',
          icon: 'server',
        },
      ],
    },
  },
  {
    id: 'about-bring',
    type: 'services',
    settings: { background: 'surface', spacing: 'lg', hidden: false },
    data: {
      eyebrow: '// What I bring to teams',
      heading: 'One engineer, many surfaces.',
      headingAccent: 'many surfaces.',
      items: [
        {
          title: 'Full-stack delivery',
          description:
            'React and Next.js frontends, Node.js, NestJS and Laravel backends, PostgreSQL and Redis.',
          icon: 'layers',
        },
        {
          title: 'Mobile engineering',
          description: 'Flutter apps for Android and iOS that share a design system with the web.',
          icon: 'smartphone',
        },
        {
          title: 'Integrations',
          description:
            'Payments (Paystack, Reloadly, Flutterwave), real-time (WebSockets, Agora) and AI (OpenAI API).',
          icon: 'plug',
        },
        {
          title: 'Deployment',
          description: 'Docker, Nginx, Dokploy, CI/CD, Vercel and AWS.',
          icon: 'server',
        },
      ],
    },
  },
  {
    id: 'about-interests',
    type: 'custom',
    data: {
      eyebrow: '// Beyond the job description',
      heading: 'Interests & aspirations.',
      headingAccent: 'aspirations.',
      columns: [
        {
          title: 'Professional interests',
          html: '<ul><li>AI and LLM-powered products</li><li>Fintech and payments infrastructure</li><li>Real-time systems</li><li>Cross-platform mobile engineering</li></ul>',
        },
        {
          title: 'Career aspirations',
          html: '<p>To keep building products that matter to the people who use them, in teams that value engineering quality, onsite, remote or hybrid.</p>',
        },
      ],
    },
  },
  {
    id: 'about-cta',
    type: 'cta',
    data: {
      eyebrow: '// Next step',
      heading: 'Let’s build something together.',
      headingAccent: 'together.',
      body: 'Tell me about your product, team or role.',
      variant: 'default',
      ctas: [
        { label: 'Contact me', href: '/contact', variant: 'primary' },
        { label: 'Download CV', href: RESUME_URL, variant: 'secondary', download: true },
      ],
    },
  },
]

const servicesSections: SectionInput[] = [
  {
    id: 'services-hero',
    type: 'hero',
    data: {
      eyebrow: '// Services',
      headline: 'What I can help you build.',
      headlineAccent: 'build.',
      body: 'Web, mobile and backend engineering for teams and founders who need products that work in the real world.',
      showAvailability: true,
      ctas: [{ label: 'Start a conversation', href: '/contact', variant: 'primary' }],
    },
  },
  {
    id: 'services-list',
    type: 'services',
    data: {
      eyebrow: '// Capabilities',
      heading: 'End-to-end product engineering.',
      headingAccent: 'product engineering.',
      items: [
        {
          title: 'Web applications',
          description: 'React and Next.js applications with TypeScript and Tailwind CSS.',
          icon: 'monitor',
        },
        {
          title: 'Mobile applications',
          description: 'Flutter apps for Android and iOS.',
          icon: 'smartphone',
        },
        {
          title: 'Backend & APIs',
          description:
            'Node.js, NestJS and Laravel services with PostgreSQL, Redis and REST or GraphQL.',
          icon: 'server',
        },
        {
          title: 'AI integrations',
          description: 'OpenAI API, LLM systems, RAG and streaming AI interfaces.',
          icon: 'sparkles',
        },
        {
          title: 'Payments & real-time',
          description: 'Paystack, Flutterwave, Monnify, Reloadly, WebSockets and Agora.',
          icon: 'plug',
        },
        {
          title: 'Admin dashboards',
          description: 'Internal tools and CMS dashboards for operations teams.',
          icon: 'layout',
        },
      ],
    },
  },
  {
    id: 'services-faq',
    type: 'faq',
    settings: { background: 'surface', spacing: 'lg', hidden: false },
    data: {
      eyebrow: '// FAQ',
      heading: 'Common questions.',
      items: [
        { question: 'Where are you based?', answer: '<p>Abuja, Nigeria.</p>' },
        {
          question: 'Do you work remotely?',
          answer: '<p>Yes. I’m open to onsite, remote, and hybrid opportunities.</p>',
        },
        {
          question: 'What is your core stack?',
          answer:
            '<p>React, Next.js, TypeScript, Node.js, NestJS, Laravel, Flutter, PostgreSQL, Redis and Docker.</p>',
        },
      ],
    },
  },
  {
    id: 'services-cta',
    type: 'cta',
    data: {
      heading: 'Have a project in mind?',
      headingAccent: 'in mind?',
      variant: 'default',
      ctas: [{ label: 'Let’s work together', href: '/contact', variant: 'primary' }],
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
  buildPage({
    id: 'page-about',
    slug: 'about',
    title: 'About',
    seo: {
      title: 'About Daniel Ubani',
      description:
        'Daniel Ubani is a Full Stack & Mobile Engineer in Abuja, Nigeria with 3+ years building web, mobile, backend and AI-powered products.',
      twitterCard: 'summary_large_image',
      noIndex: false,
      noFollow: false,
    },
    sections: aboutSections,
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
  }),
  buildPage({
    id: 'page-services',
    slug: 'services',
    title: 'Services',
    seo: {
      title: 'Services',
      description: 'Web, mobile, backend, AI and payments engineering by Daniel Ubani.',
      twitterCard: 'summary_large_image',
      noIndex: false,
      noFollow: false,
    },
    sections: servicesSections,
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
  }),
]
