import { z } from 'zod'

export const PROJECT_TYPES = [
  'Full-time role',
  'Contract / freelance',
  'Web application',
  'Mobile application',
  'Backend / API',
  'AI integration',
  'Consulting',
  'Something else',
] as const

/** Submissions faster than this are almost certainly automated. */
export const MIN_FORM_FILL_MS = 2500

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name').max(100, 'Name is too long'),
  email: z.email('Please enter a valid email address').max(254),
  subject: z.string().trim().min(3, 'Subject is too short').max(150, 'Subject is too long'),
  projectType: z.string().trim().min(1, 'Please choose a project type').max(60),
  message: z
    .string()
    .trim()
    .min(20, 'Tell me a little more (at least 20 characters)')
    .max(5000, 'Message is too long (5000 characters max)'),
})

/** Wire payload: the form values plus spam-protection fields. */
export const contactSubmissionSchema = contactFormSchema.extend({
  /** Honeypot. Real users never see or fill this field. */
  website: z.string().max(0, 'Spam detected').optional().default(''),
  /** Epoch ms when the form was rendered. */
  startedAt: z.number().int().positive(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>

export function isLikelyBot(
  submission: Pick<ContactSubmission, 'website' | 'startedAt'>,
  now: number = Date.now(),
): boolean {
  if (submission.website && submission.website.length > 0) return true
  return now - submission.startedAt < MIN_FORM_FILL_MS
}
