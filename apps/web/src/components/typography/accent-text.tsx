import { Fragment } from 'react'

interface AccentTextProps {
  text: string
  /** Substring of text rendered in the muted tone (same family, no font switch). */
  accent?: string
  accentClassName?: string
}

/** Renders text with an optional de-emphasised phrase. Plain text only; never HTML. */
export function AccentText({ text, accent, accentClassName = 'text-ink-muted' }: AccentTextProps) {
  if (!accent) return <>{text}</>
  const index = text.lastIndexOf(accent)
  if (index === -1) return <>{text}</>
  return (
    <Fragment>
      {text.slice(0, index)}
      <span className={accentClassName}>{accent}</span>
      {text.slice(index + accent.length)}
    </Fragment>
  )
}
