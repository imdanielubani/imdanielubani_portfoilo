import type { Resume } from '@du/types'
import { education } from './experience'
import { media } from './media'

export const resume: Resume = {
  summary:
    'Daniel Ubani is a Full Stack & Mobile Engineer with 3+ years of experience building production web, mobile, and backend systems across fintech, hospitality, civic tech, and healthcare. He works across architecture, API design, database modeling, frontend development, mobile engineering, integrations, and deployment. His technical experience includes React, Next.js, TypeScript, Node.js, NestJS, Laravel, Flutter, PostgreSQL, Redis, Docker, and OpenAI API.',
  highlights: [
    'Owns delivery end to end: architecture, API design, database modeling, UI and deployment.',
    'Integrations for payments (Paystack, Reloadly), real-time features (WebSockets, Agora) and AI/LLMs (OpenAI API).',
    'Shipped products for hospitality, fintech (Nigeria & Ghana), healthcare and civic tech.',
  ],
  education,
  file: media.resume,
  updatedAt: '2026-11-06T00:00:00.000Z',
}
