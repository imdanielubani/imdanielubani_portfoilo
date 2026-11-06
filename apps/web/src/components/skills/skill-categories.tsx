import type { SkillCategory } from '@du/types'
import { indexLabel } from '@du/utils'
import { techIcon } from '@/lib/tech-icons'
import { TechLogo } from './tech-logo'

/** Full skills listing grouped by category. No proficiency percentages, by design. */
export function SkillCategories({ categories }: { categories: SkillCategory[] }) {
  if (categories.length === 0)
    return <p className="text-ink-muted">Skills will appear here once published.</p>
  return (
    <div className="grid gap-4">
      {categories.map((category, index) => (
        <section
          key={category.id}
          id={category.slug}
          aria-labelledby={'skills-' + category.slug}
          className="grid gap-6 rounded-[var(--radius-xl)] border border-line bg-surface-2 p-6 shadow-card md:grid-cols-[14rem_minmax(0,1fr)] md:p-8"
          data-reveal
        >
          <div>
            <p className="text-xl text-ink-subtle italic">{indexLabel(index)}</p>
            <h2 id={'skills-' + category.slug} className="mt-1 text-h3 text-ink">
              {category.name}
            </h2>
            {category.description ? (
              <p className="mt-2 text-sm text-ink-muted">{category.description}</p>
            ) : null}
          </div>
          <ul className="flex flex-wrap content-start gap-2.5">
            {category.skills.map((skill) => {
              const icon = techIcon(skill.name)
              return (
                <li
                  key={skill.id}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3.5 py-2 text-[0.95rem] text-ink-soft"
                  title={skill.description}
                >
                  {icon ? (
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden
                      className="size-4"
                      style={{ color: '#' + icon.hex }}
                    >
                      <path d={icon.path} fill="currentColor" />
                    </svg>
                  ) : null}
                  {skill.name}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}

export { TechLogo }
