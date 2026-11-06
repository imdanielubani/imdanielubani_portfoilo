import type { SVGProps } from 'react'

export interface LogoMarkProps extends SVGProps<SVGSVGElement> {
  size?: number
  /** Accessible title; omit when the mark sits next to visible text. */
  title?: string
}

/**
 * The imdanielubani monogram: a lowercase "du" drawn with a single stroke weight
 * on a deep-teal tile, with an orange signal dot.
 */
export function LogoMark({ size = 32, title, ...props }: LogoMarkProps) {
  const labelled = Boolean(title)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={labelled ? 'img' : undefined}
      aria-hidden={labelled ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <rect width="32" height="32" rx="9" fill="var(--logo-tile, #1B3A4B)" />
      <g
        stroke="var(--logo-ink, #FAF9F7)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10.6" cy="18.6" r="4.1" />
        <path d="M14.7 9.4V22.7" />
        <path d="M18.9 14.5V18.6A3.25 3.25 0 0 0 25.4 18.6V14.5M25.4 18.6V22.7" />
      </g>
      <circle cx="22.15" cy="9.3" r="2" fill="var(--logo-dot, #FF5C00)" />
    </svg>
  )
}

export interface LogoProps {
  className?: string
  markSize?: number
  showWordmark?: boolean
}

/** Mark plus the "imdanielubani" wordmark. The wordmark inherits the surrounding font. */
export function Logo({ className, markSize = 30, showWordmark = true }: LogoProps) {
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', lineHeight: 1 }}
    >
      <LogoMark size={markSize} />
      {showWordmark ? (
        <span style={{ fontWeight: 600, letterSpacing: '-0.03em', fontSize: '1.0625rem' }}>
          <span style={{ opacity: 0.55 }}>im</span>
          danielubani
        </span>
      ) : null}
    </span>
  )
}
