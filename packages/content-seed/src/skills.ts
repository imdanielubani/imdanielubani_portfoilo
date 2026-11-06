import type { SkillCategory } from '@du/types'
import { slugify } from './slug'

function category(order: number, name: string, description: string, skills: string[]): SkillCategory {
  const slug = slugify(name)
  return {
    id: 'skillcat-' + slug,
    slug,
    name,
    description,
    order,
    skills: skills.map((skill) => ({ id: 'skill-' + slug + '-' + slugify(skill), name: skill })),
  }
}

export const skillCategories: SkillCategory[] = [
  category(1, 'Frontend', 'Interfaces that are fast, accessible and pleasant to use.', [
    'React',
    'Next.js',
    'Vue.js',
    'JavaScript',
    'TypeScript',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Livewire',
  ]),
  category(2, 'Backend', 'APIs, data models and services built to hold up in production.', [
    'Node.js',
    'Express.js',
    'NestJS',
    'Laravel',
    'Ruby on Rails',
    'PHP',
    'REST APIs',
    'GraphQL',
    'Prisma',
    'JWT Authentication',
    'WebSockets',
    'Microservices',
    'System Design',
  ]),
  category(3, 'Mobile', 'Cross-platform apps for Android and iOS.', [
    'Flutter',
    'Dart',
    'Riverpod',
    'React Native',
  ]),
  category(4, 'Databases & DevOps', 'Storage, caching, infrastructure and delivery pipelines.', [
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Redis',
    'AWS',
    'Docker',
    'Nginx',
    'Dokploy',
    'CI/CD',
    'Vercel',
    'Netlify',
  ]),
  category(5, 'AI & Integrations', 'LLM features, payments, real-time and third-party services.', [
    'OpenAI API',
    'LLM Systems',
    'RAG',
    'Prompt Engineering',
    'Paystack',
    'Flutterwave',
    'Monnify',
    'Reloadly',
    'Firebase',
    'Cloudinary',
    'Agora',
    'Twilio',
    'Google Maps API',
  ]),
  category(6, 'Testing', 'Confidence through automated tests at every layer.', [
    'Jest',
    'RSpec',
    'Unit Testing',
    'Integration Testing',
    'API Testing',
  ]),
]
