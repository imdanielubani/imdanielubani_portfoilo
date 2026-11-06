import { Fragment } from 'react'

interface SplitWordsProps {
  text: string
  accent?: string
}

function words(text: string, accent: boolean, keyPrefix: string) {
  return text
    .split(/(\s+)/)
    .filter((part) => part.length > 0)
    .map((part, index) =>
      /^\s+$/.test(part) ? (
        <Fragment key={keyPrefix + index}> </Fragment>
      ) : (
        <span
          key={keyPrefix + index}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <span
            data-word
            className={'inline-block will-change-transform' + (accent ? ' accent-serif' : '')}
          >
            {part}
          </span>
        </span>
      ),
    )
}

/**
 * Splits a headline into masked words for the staggered reveal. Rendered on the
 * server, so the full text is in the HTML for SEO and screen readers.
 */
export function SplitWords({ text, accent }: SplitWordsProps) {
  const index = accent ? text.lastIndexOf(accent) : -1
  if (!accent || index === -1) return <>{words(text, false, 'w')}</>
  return (
    <>
      {words(text.slice(0, index), false, 'a')}
      {words(accent, true, 'b')}
      {words(text.slice(index + accent.length), false, 'c')}
    </>
  )
}
