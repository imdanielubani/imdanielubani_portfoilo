import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import type { SectionOf } from '@du/schemas'
import type { SimpleIcon } from 'simple-icons'
import { getSettings, getSkills } from '@/lib/content'
import { techIcon } from '@/lib/tech-icons'
import { SectionShell } from '@/components/layout/section-shell'
import { TechMarquee } from '@/components/skills/tech-marquee'
import { SectionHeader } from '@/components/typography/section-header'

/** "Stack" card: real tool counts, a logo marquee and the discipline breakdown. */
export async function SkillsGridSection({ section }: { section: SectionOf<'skillsGrid'> }) {
  const { data, settings } = section
  const [all, site] = await Promise.all([getSkills(), getSettings()])
  const categories =
    data.categorySlugs.length > 0 ? all.filter((c) => data.categorySlugs.includes(c.slug)) : all
  const skills = categories.flatMap((c) => c.skills)
  const icons = skills.map((s) => techIcon(s.name)).filter((i): i is SimpleIcon => Boolean(i))
  const github = site.socials.find((s) => s.platform === 'github')
  const handle = github ? '@' + github.url.replace(/\/+$/, '').split('/').pop() : site.siteName
  return (
    <SectionShell settings={settings}>
      <SectionHeader
        eyebrow={data.eyebrow}
        heading={data.heading}
        headingAccent={data.headingAccent}
        description={data.description}
      />
      <div
        className="overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface-2 shadow-card"
        data-reveal
      >
        <div className="flex flex-wrap items-end justify-between gap-4 p-6 md:p-7">
          <div>
            <p className="font-medium text-ink">{handle}</p>
            <p className="text-sm text-ink-muted">
              {skills.length} tools across {categories.length} disciplines
            </p>
          </div>
          {data.cta ? (
            <Link
              href={data.cta.href}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent"
            >
              {data.cta.label}
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          ) : null}
        </div>
        <div className="border-t border-line py-6">
          <TechMarquee icons={icons} />
        </div>
        <ul className="grid gap-px border-t border-line bg-line sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <li key={category.id} className="bg-surface-2 p-5 md:p-6">
              <p className="text-ink">{category.name}</p>
              <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
                {category.skills
                  .slice(0, 5)
                  .map((s) => s.name)
                  .join(', ')}
                {category.skills.length > 5 ? ' and ' + (category.skills.length - 5) + ' more' : ''}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}
