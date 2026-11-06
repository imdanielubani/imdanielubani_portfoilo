import { sanitizeRichText } from '@/lib/sanitize'
import { cn } from '@/lib/cn'

interface RichTextProps {
  html: string
  className?: string
}

/** Renders CMS rich text. Input is always passed through the allow-list sanitizer here. */
export function RichText({ html, className }: RichTextProps) {
  const clean = sanitizeRichText(html)
  if (!clean.trim()) return null
  return <div className={cn('prose-du', className)} dangerouslySetInnerHTML={{ __html: clean }} />
}
