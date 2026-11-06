import { contactSubmissionSchema, type ContactSubmission } from '@du/schemas'
import { joinUrl } from '@du/utils'

export type ContactFailureCode =
  'NOT_CONFIGURED' | 'INVALID' | 'RATE_LIMITED' | 'SERVER' | 'NETWORK'
export interface ContactFailure {
  ok: false
  code: ContactFailureCode
  message: string
}
export type ContactResult = { ok: true } | ContactFailure

const TIMEOUT_MS = 12_000

function fail(code: ContactFailureCode, message: string): ContactFailure {
  return { ok: false, code, message }
}

/** Sends a contact submission to the NestJS API, which validates, stores and emails it. */
export async function submitContact(
  payload: ContactSubmission,
  apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL,
  fetchImpl: typeof fetch = fetch,
): Promise<ContactResult> {
  const parsed = contactSubmissionSchema.safeParse(payload)
  if (!parsed.success) return fail('INVALID', 'Please check the highlighted fields and try again.')
  if (!apiUrl) {
    return fail(
      'NOT_CONFIGURED',
      'The contact form is not connected yet. You can reach me by email instead.',
    )
  }

  let response: Response
  try {
    response = await fetchImpl(joinUrl(apiUrl, '/api/v1/public/contact'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(parsed.data),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch {
    return fail('NETWORK', 'Your message could not be sent because of a network problem.')
  }

  if (response.ok) return { ok: true }
  if (response.status === 429)
    return fail('RATE_LIMITED', 'Too many messages in a short time. Please try again later.')
  if (response.status === 400 || response.status === 422) {
    return fail('INVALID', 'Some details look invalid. Please review the form and try again.')
  }
  return fail('SERVER', 'Something went wrong on my side while sending your message.')
}
