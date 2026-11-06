import type { Education, Experience } from '@du/types'

export const experience: Experience[] = [
  {
    id: 'exp-cviqli',
    company: 'Cviqli Technologies',
    role: 'Full Stack Developer',
    employmentType: 'contract',
    location: 'Lagos, Nigeria',
    startDate: '2026-04',
    endDate: '2026-09',
    isCurrent: false,
    summary:
      'Built the core web product from scratch using React and TypeScript, including streaming AI chat experiences with voice dictation, threaded mentions, and translations across five Nigerian languages. Designed Node.js and Express API services with Prisma, built administration tools, and extended the platform to iOS and Android using Flutter.',
    responsibilities: [
      'Built the core web product from scratch in React and TypeScript, including streaming AI chat (Ask, Clarify, Comprehend, Counsel) with voice dictation and threaded @mentions.',
      'Designed Node.js/Express/Prisma API services for OTP auth, AI moderation and streaming, comments, and language enforcement.',
      'Connected a React admin dashboard and deployed to production with Docker, Nginx, and Dokploy.',
      'Extended the platform to iOS and Android with Flutter, Riverpod, and go_router, sharing one design system across web and mobile.',
    ],
    achievements: ['Delivered full translation of the product across 5 Nigerian languages.'],
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'Prisma',
      'Flutter',
      'Riverpod',
      'Docker',
      'Nginx',
      'Dokploy',
    ],
    order: 1,
  },
  {
    id: 'exp-zicstack',
    company: 'Zicstack Innovation',
    role: 'Frontend Developer',
    employmentType: 'freelance',
    location: 'Lagos, Nigeria',
    startDate: '2025-01',
    endDate: '2025-02',
    isCurrent: false,
    summary:
      'Built a corporate website using React, Next.js, and Tailwind CSS, achieving a 98% Lighthouse performance score while improving responsiveness and SEO.',
    responsibilities: [
      'Built the corporate website with React, Next.js, and Tailwind CSS.',
      'Improved responsiveness and SEO across the site.',
    ],
    achievements: ['Reached a 98% Lighthouse performance score.'],
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    order: 2,
  },
]

export const education: Education[] = [
  {
    id: 'edu-noun',
    institution: 'National Open University of Nigeria (NOUN)',
    qualification: 'B.Sc. Computer Science',
    startYear: 2019,
    endYear: 2023,
  },
]
