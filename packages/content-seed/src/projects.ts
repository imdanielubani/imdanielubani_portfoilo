import type { MediaAsset } from '@du/schemas'
import type { Project, ProjectCategory, Technology } from '@du/types'
import { media } from './media'
import { slugify } from './slug'

/*
 * Seed projects are written strictly from the CV. Fields the CV does not cover
 * (exact timelines, screenshots, lessons learned, links) are left empty so they
 * can be completed from the CMS; empty fields are hidden on the website.
 */

export const projectCategories: ProjectCategory[] = [
  { slug: 'fintech', name: 'Fintech' },
  { slug: 'hospitality', name: 'Hospitality' },
  { slug: 'healthcare', name: 'Healthcare' },
  { slug: 'proptech', name: 'PropTech & AI' },
]

function category(slug: string): ProjectCategory {
  const found = projectCategories.find((c) => c.slug === slug)
  if (!found) throw new Error('Unknown project category: ' + slug)
  return found
}

function tech(names: string[]): Technology[] {
  return names.map((name) => ({ name, slug: slugify(name) }))
}

function withAlt(asset: MediaAsset, alt: string): MediaAsset {
  return { ...asset, alt }
}

const UPDATED = '2026-11-06T00:00:00.000Z'
const NO_SEO = { twitterCard: 'summary_large_image', noIndex: false, noFollow: false } as const

export const projects: Project[] = [
  {
    id: 'proj-retiro',
    slug: 'retiro-del-rocio',
    title: 'Retiro Del Rocio',
    subtitle: 'Hotel Operations Platform',
    summary:
      'A full-stack hotel platform: a Laravel/Livewire administration system plus Flutter tablet apps for in-room guests and six staff departments. It now runs the hotel’s full daily operations.',
    category: category('hospitality'),
    industry: 'Hospitality',
    role: 'Full Stack Engineer & Architect',
    projectType: 'Web admin + tablet apps',
    year: '',
    timeline: '',
    status: 'live',
    isFeatured: true,
    technologies: tech(['Laravel', 'Livewire', 'Flutter', 'WebSockets', 'Agora', 'TTLock']),
    thumbnail: withAlt(media.coverA, 'Retiro Del Rocio cover (placeholder image)'),
    heroImage: withAlt(media.coverA, 'Retiro Del Rocio cover (placeholder image)'),
    order: 1,
    overview:
      '<p>Retiro Del Rocio is a hotel operations platform I architected end to end. A Laravel and Livewire administration system sits at the centre, and Flutter tablet applications serve two audiences: guests in their rooms, and the hotel’s six staff departments.</p><p>Live order boards, smart-room controls, TTLock door integration and real-time SOS and intercom (over WebSockets and Agora) connect guests and staff in one system. The platform now supports the hotel’s full daily operations.</p>',
    problem:
      'Guest requests, room controls and staff coordination need to work as one connected, real-time system rather than separate tools.',
    objectives: [
      'Give in-room guests a tablet experience for requests, room controls and help.',
      'Give each of the six staff departments a focused tablet app with live order boards.',
      'Provide administrators one Laravel/Livewire system to manage operations.',
    ],
    challenges: [
      'Keeping guest and staff tablets in sync in real time over WebSockets.',
      'Integrating hardware: TTLock smart locks and smart-room controls.',
      'Delivering reliable SOS and intercom with Agora real-time communication.',
    ],
    solution:
      '<p>A Laravel/Livewire administration system acts as the source of truth. Flutter tablet apps for guests and staff subscribe to live updates over WebSockets, so orders and requests appear on the right department’s board as they happen. TTLock and smart-room integrations handle physical access and room controls, and Agora powers voice for intercom and SOS.</p>',
    architecture: {
      description:
        '<ul><li><strong>Admin:</strong> Laravel + Livewire</li><li><strong>Clients:</strong> Flutter tablet apps (guest + 6 staff departments)</li><li><strong>Real-time:</strong> WebSockets for live order boards, Agora for intercom and SOS</li><li><strong>Hardware:</strong> TTLock smart locks and smart-room controls</li></ul>',
      diagram: null,
    },
    features: [
      { title: 'Live order boards', description: 'Department boards that update in real time as guests place requests.' },
      { title: 'Smart-room controls', description: 'Guests control their room from the in-room tablet.' },
      { title: 'TTLock integration', description: 'Smart lock integration for room access.' },
      { title: 'SOS & intercom', description: 'Real-time SOS and intercom over WebSockets and Agora.' },
    ],
    outcomes: ['The platform now runs the hotel’s full daily operations.'],
    lessons: [],
    gallery: [],
    videos: [],
    liveUrl: null,
    repoUrl: null,
    extraLinks: [],
    blocks: [],
    relatedSlugs: ['nexryl-estateos', 'kedali'],
    seo: {
      ...NO_SEO,
      title: 'Retiro Del Rocio — Hotel Operations Platform',
      description:
        'Case study: a Laravel/Livewire and Flutter hotel operations platform with live order boards, smart-room controls, TTLock, and real-time SOS/intercom.',
    },
    updatedAt: UPDATED,
  },
  {
    id: 'proj-pavocard',
    slug: 'pavocard',
    title: 'Pavocard',
    subtitle: 'Multi-Country Fintech Platform',
    summary:
      'A gift card trading and payments platform serving Nigeria and Ghana from one codebase, with Flutter apps, a Next.js web app and React/Vue admin on a Node.js backend.',
    category: category('fintech'),
    industry: 'Fintech',
    role: 'Full Stack & Mobile Engineer',
    projectType: 'Mobile + web + admin',
    year: '',
    timeline: '',
    status: 'live',
    isFeatured: true,
    technologies: tech([
      'Flutter',
      'Next.js',
      'React',
      'Vue.js',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Redis',
      'JWT',
      'Paystack',
      'Reloadly',
      'Firebase',
      'Cloudinary',
    ]),
    thumbnail: withAlt(media.coverB, 'Pavocard cover (placeholder image)'),
    heroImage: withAlt(media.coverB, 'Pavocard cover (placeholder image)'),
    order: 2,
    overview:
      '<p>Pavocard is a gift card trading and payments system that serves two markets, Nigeria and Ghana, from one codebase. I built and designed the system across Flutter mobile apps, a Next.js web app, and React and Vue administration interfaces on a Node.js/Express backend.</p>',
    problem:
      'Serve gift card trading and payments in two countries without maintaining two separate products.',
    objectives: [
      'Ship mobile (Flutter) and web (Next.js) experiences for customers.',
      'Provide React and Vue administration interfaces for operations.',
      'Support Nigeria and Ghana from a single multi-country architecture.',
    ],
    challenges: [
      'Designing a multi-country architecture that serves two markets from one codebase.',
      'Integrating payments and gift card providers (Paystack, Reloadly).',
      'Keeping the platform responsive with Redis caching.',
    ],
    solution:
      '<p>A Node.js/Express backend integrates Paystack, Reloadly, Firebase and Cloudinary, with Redis caching and JWT authentication. Country-aware configuration lets one codebase serve both markets, while Flutter, Next.js and the admin interfaces share the same API.</p>',
    architecture: {
      description:
        '<ul><li><strong>Clients:</strong> Flutter mobile apps, Next.js web app, React and Vue admin</li><li><strong>API:</strong> Node.js + Express, JWT auth</li><li><strong>Data:</strong> PostgreSQL with Redis caching</li><li><strong>Integrations:</strong> Paystack, Reloadly, Firebase, Cloudinary</li></ul>',
      diagram: null,
    },
    features: [
      { title: 'Gift card trading', description: 'Trade gift cards through mobile and web apps.' },
      { title: 'Payments', description: 'Payment flows integrated with Paystack.' },
      { title: 'Multi-country', description: 'Nigeria and Ghana served from one codebase.' },
      { title: 'Admin tooling', description: 'React and Vue administration interfaces.' },
    ],
    outcomes: [
      'Two markets (Nigeria and Ghana) served from one codebase.',
      'Available on the Play Store and the web.',
    ],
    lessons: [],
    gallery: [],
    videos: [],
    liveUrl: 'https://pavocard.com',
    repoUrl: null,
    extraLinks: [],
    blocks: [],
    relatedSlugs: ['cardcentrals', 'nexryl-estateos'],
    seo: {
      ...NO_SEO,
      title: 'Pavocard — Multi-Country Fintech Platform',
      description:
        'Case study: a gift card trading and payments platform for Nigeria and Ghana built with Flutter, Next.js, React/Vue and Node.js.',
    },
    updatedAt: UPDATED,
  },
  {
    id: 'proj-cardcentrals',
    slug: 'cardcentrals',
    title: 'Cardcentrals',
    subtitle: 'Nigerian Fintech Gift Card Platform',
    summary:
      'Built end to end, from UI design to a Flutter mobile app, Next.js web app, React admin, and Node.js/Express payment and transaction services.',
    category: category('fintech'),
    industry: 'Fintech',
    role: 'Full Stack & Mobile Engineer, UI Designer',
    projectType: 'Mobile + web + admin',
    year: '',
    timeline: '',
    status: 'completed',
    isFeatured: true,
    technologies: tech([
      'Flutter',
      'Next.js',
      'React',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Redis',
      'JWT',
      'Paystack',
      'Reloadly',
    ]),
    thumbnail: withAlt(media.coverC, 'Cardcentrals cover (placeholder image)'),
    heroImage: withAlt(media.coverC, 'Cardcentrals cover (placeholder image)'),
    order: 3,
    overview:
      '<p>Cardcentrals is a Nigerian fintech gift card platform I built end to end — from UI design to a Flutter mobile app, a Next.js web app, a React admin, and Node.js/Express payment and transaction services.</p>',
    problem: 'Deliver a complete gift card trading product, from design to payments, as a single engineer.',
    objectives: [
      'Design the product UI.',
      'Build Flutter mobile and Next.js web clients.',
      'Build payment and transaction services with Paystack and Reloadly.',
    ],
    challenges: [
      'Owning every layer, from UI design through backend services.',
      'Secure transactions with JWT authentication.',
      'Performance with Redis caching on PostgreSQL.',
    ],
    solution:
      '<p>A Node.js/Express service layer handles payments and transactions, integrating Paystack and Reloadly with JWT auth and Redis caching. Flutter, Next.js and a React admin consume the same API.</p>',
    architecture: {
      description:
        '<ul><li><strong>Clients:</strong> Flutter mobile app, Next.js web app, React admin</li><li><strong>API:</strong> Node.js + Express payment and transaction services</li><li><strong>Data:</strong> PostgreSQL + Redis</li><li><strong>Integrations:</strong> Paystack, Reloadly</li></ul>',
      diagram: null,
    },
    features: [
      { title: 'End-to-end product', description: 'UI design, mobile app, web app and admin built by one engineer.' },
      { title: 'Payments', description: 'Paystack and Reloadly integrations.' },
      { title: 'Secure auth', description: 'JWT authentication across clients.' },
    ],
    outcomes: ['Published on the Play Store with a live web app.'],
    lessons: [],
    gallery: [],
    videos: [],
    liveUrl: null,
    repoUrl: null,
    extraLinks: [],
    blocks: [],
    relatedSlugs: ['pavocard'],
    seo: {
      ...NO_SEO,
      title: 'Cardcentrals — Nigerian Fintech Gift Card Platform',
      description:
        'Case study: an end-to-end gift card platform with Flutter, Next.js, React admin and Node.js payment services.',
    },
    updatedAt: UPDATED,
  },
  {
    id: 'proj-kedali',
    slug: 'kedali',
    title: 'Kedali',
    subtitle: 'Medical Transportation Booking System',
    summary:
      'A Laravel appointment booking system and companion website for a US non-emergency medical transportation startup, integrated with a WordPress front end.',
    category: category('healthcare'),
    industry: 'Healthcare',
    role: 'Backend & Web Developer',
    projectType: 'Booking system + website',
    year: '',
    timeline: '',
    status: 'completed',
    isFeatured: false,
    technologies: tech(['Laravel', 'PHP', 'WordPress']),
    thumbnail: withAlt(media.coverD, 'Kedali cover (placeholder image)'),
    heroImage: withAlt(media.coverD, 'Kedali cover (placeholder image)'),
    order: 4,
    overview:
      '<p>Kedali is an appointment booking system and companion website for a US non-emergency medical transportation startup. I built the booking system in Laravel and integrated it with a WordPress front end for a seamless patient booking flow.</p>',
    problem: 'Patients need a simple way to book non-emergency medical transportation from the company website.',
    objectives: [
      'Build an appointment booking system in Laravel.',
      'Integrate booking with the existing WordPress front end.',
    ],
    challenges: ['Connecting a Laravel booking backend to a WordPress website without breaking the patient flow.'],
    solution:
      '<p>A Laravel application manages appointments, and the WordPress front end hands patients into the booking flow so the experience feels like one product.</p>',
    architecture: {
      description:
        '<ul><li><strong>Booking:</strong> Laravel + PHP</li><li><strong>Website:</strong> WordPress front end integrated with the booking flow</li></ul>',
      diagram: null,
    },
    features: [
      { title: 'Appointment booking', description: 'Patients book non-emergency medical transport.' },
      { title: 'WordPress integration', description: 'Booking embedded into the company website.' },
    ],
    outcomes: ['A seamless patient booking flow between the website and the booking system.'],
    lessons: [],
    gallery: [],
    videos: [],
    liveUrl: null,
    repoUrl: null,
    extraLinks: [],
    blocks: [],
    relatedSlugs: ['retiro-del-rocio'],
    seo: {
      ...NO_SEO,
      title: 'Kedali — Medical Transportation Booking System',
      description:
        'Case study: a Laravel booking system and WordPress-integrated website for a US non-emergency medical transport startup.',
    },
    updatedAt: UPDATED,
  },
  {
    id: 'proj-nexryl',
    slug: 'nexryl-estateos',
    title: 'Nexryl EstateOS',
    subtitle: 'AI Smart Estate Management System',
    summary:
      'An ongoing personal project: an AI estate platform with payments, QR visitor access, maintenance requests, SOS alerts, an AI chatbot, reminders and predictive analytics.',
    category: category('proptech'),
    industry: 'Property management',
    role: 'Founder & Engineer (personal project)',
    projectType: 'Mobile + web admin + API',
    year: '',
    timeline: 'Ongoing',
    status: 'in-development',
    isFeatured: true,
    technologies: tech(['Flutter', 'Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Firebase', 'OpenAI API']),
    thumbnail: withAlt(media.coverA, 'Nexryl EstateOS cover (placeholder image)'),
    heroImage: withAlt(media.coverA, 'Nexryl EstateOS cover (placeholder image)'),
    order: 5,
    overview:
      '<p>Nexryl EstateOS is an ongoing personal project: an AI-assisted platform for running residential estates. It combines a Flutter app for residents, a Next.js admin, and a NestJS API on PostgreSQL and Redis.</p>',
    problem:
      'Estate operations — visitors, payments, maintenance and emergencies — are usually spread across disconnected tools.',
    objectives: [
      'Bring estate payments, visitor access and maintenance into one platform.',
      'Add AI chatbot support, reminders and predictive analytics.',
    ],
    challenges: [
      'Secure QR-based visitor access.',
      'Reliable SOS alerts.',
      'Useful, grounded AI assistance with the OpenAI API.',
    ],
    solution:
      '<p>A NestJS API on PostgreSQL and Redis serves a Flutter resident app and a Next.js admin. Firebase supports notifications, and the OpenAI API powers the chatbot.</p>',
    architecture: {
      description:
        '<ul><li><strong>Clients:</strong> Flutter app, Next.js admin</li><li><strong>API:</strong> NestJS</li><li><strong>Data:</strong> PostgreSQL + Redis</li><li><strong>Services:</strong> Firebase, OpenAI API</li></ul>',
      diagram: null,
    },
    features: [
      { title: 'QR visitor access', description: 'Residents issue QR passes for visitors.' },
      { title: 'Payments', description: 'Estate payments in the app.' },
      { title: 'Maintenance requests', description: 'Raise and track maintenance issues.' },
      { title: 'SOS alerts', description: 'Emergency alerts for residents.' },
      { title: 'AI chatbot', description: 'AI support, reminders and predictive analytics.' },
    ],
    outcomes: [],
    lessons: [],
    gallery: [],
    videos: [],
    liveUrl: null,
    repoUrl: null,
    extraLinks: [],
    blocks: [],
    relatedSlugs: ['retiro-del-rocio', 'pavocard'],
    seo: {
      ...NO_SEO,
      title: 'Nexryl EstateOS — AI Smart Estate Management',
      description:
        'Case study: an AI estate management platform with Flutter, Next.js and NestJS — payments, QR visitor access, maintenance, SOS and an AI chatbot.',
    },
    updatedAt: UPDATED,
  },
]
