import type { SimpleIcon } from 'simple-icons'
import { TechLogo } from './tech-logo'

/** Two counter-scrolling rows of tech logos. Pauses on hover; static under reduced motion. */
export function TechMarquee({ icons }: { icons: SimpleIcon[] }) {
  if (icons.length === 0) return null
  const half = Math.ceil(icons.length / 2)
  const rows = [icons.slice(0, half), icons.slice(half)]
  return (
    <div className="marquee grid gap-4 overflow-hidden py-1" aria-label="Technologies I work with">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="marquee-track gap-4"
          data-direction={rowIndex === 1 ? 'reverse' : undefined}
          style={{ ['--marquee-duration' as string]: row.length * 3.2 + 's' }}
        >
          {row.map((icon) => (
            <TechLogo key={icon.slug} icon={icon} />
          ))}
          <div aria-hidden className="flex gap-4">
            {row.map((icon) => (
              <TechLogo key={icon.slug + '-copy'} icon={icon} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
