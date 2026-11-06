/** Cache tags shared with the API so it can invalidate exactly what changed. */
export const CONTENT_TAGS = {
  settings: 'settings',
  navigation: 'navigation',
  pages: 'pages',
  page: (slug: string) => 'page:' + slug,
  projects: 'projects',
  project: (slug: string) => 'project:' + slug,
  experience: 'experience',
  skills: 'skills',
  resume: 'resume',
} as const
