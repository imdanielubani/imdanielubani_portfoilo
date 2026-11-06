import { timingSafeEqual } from 'node:crypto'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  tags: z
    .array(z.string().regex(/^[a-z0-9:-]{1,120}$/i))
    .max(50)
    .default([]),
  paths: z
    .array(
      z
        .string()
        .regex(/^\/[a-z0-9/_-]*$/i)
        .max(200),
    )
    .max(50)
    .default([]),
})

function secretMatches(provided: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET
  if (!expected || expected === 'change-me' || !provided) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

/** Called by the API after content is published so pages refresh immediately. */
export async function POST(request: NextRequest) {
  if (!secretMatches(request.headers.get('x-revalidate-secret'))) {
    return NextResponse.json(
      { success: false, data: null, error: { code: 'UNAUTHORIZED', message: 'Invalid secret' } },
      { status: 401 },
    )
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, data: null, error: { code: 'BAD_JSON', message: 'Invalid JSON body' } },
      { status: 400 },
    )
  }

  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, data: null, error: { code: 'VALIDATION', message: 'Invalid payload' } },
      { status: 422 },
    )
  }

  for (const tag of parsed.data.tags) revalidateTag(tag, 'max')
  for (const path of parsed.data.paths) revalidatePath(path)

  return NextResponse.json({ success: true, data: { revalidated: parsed.data }, error: null })
}
