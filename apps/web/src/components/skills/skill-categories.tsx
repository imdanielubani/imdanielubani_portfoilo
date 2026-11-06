import type { SkillCategory } from '@du/types'
import { indexLabel } from '@du/utils'
import { cn } from '@/lib/cn'

interface SkillCategoriesProps {
  categories: SkillCategory[]
  variant?: 'bento' | 'list'
}

/** Skills grouped by category. No proficiency percentages, by design. */
export function SkillCategories({ categories, variant = 'bento' }: SkillCategoriesProps) {
  if (categories.length === 0)
    return <p className="text-ink-muted">Skills will appear here once published.</p>
  if (variant === 'list') {
    return (
      <div className="border-t border-line">
        {categories.map((category, index) => (
          <section
            key={category.id}
            id={category.slug}
            aria-labelledby={'skills-' + category.slug}
            className="grid gap-6 border-b border-line py-12 md:grid-cols-12"
            data-reveal
          >
            <div className="md:col-span-4">
              <p className="font-mono text-sm text-accent">{indexLabel(index)}</p>
              <h2 id={'skills-' + category.slug} className="mt-2 text-h3 font-medium">
                {category.name}
              </h2>
              {category.description ? (
                <p className="mt-2 text-ink-muted">{category.description}</p>
              ) : null}
            </div>
            <ul className="flex flex-wrap content-start gap-2.5 md:col-span-8">
              {category.skills.map((skill) => (
                <li
                  key={skill.id}
                  className="rounded-full border border-line bg-surface-2 px-4 py-2 text-[0.95rem] transition-colors hover:border-ink"
                  title={skill.description}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    )
  }
  return (
    <div className="grid gap-4 md:grid-cols-6">
      {categories.map((category, index) => (
        <div
          key={category.id}
          className={cn(
            'group rounded-[var(--radius-xl)] border border-line bg-canvas p-7 transition-colors duration-500 hover:border-ink md:p-8',
            index < 2 ? 'md:col-span-3' : 'md:col-span-2',
          )}
          data-reveal
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-h3 font-medium">{category.name}</h3>
            <span className="font-mono text-xs text-ink-subtle">
              {category.skills.length.toString().padStart(2, '0')}
            </span>
          </div>
          {category.description ? (
            <p className="mt-2 text-sm text-ink-muted">{category.description}</p>
          ) : null}
          <ul className="mt-6 flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <li
                key={skill.id}
                className="rounded-full bg-surface px-3 py-1.5 text-sm text-ink transition-colors group-hover:bg-surface-2"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
