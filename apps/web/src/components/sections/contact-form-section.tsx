import { PROJECT_TYPES, type SectionOf } from '@du/schemas'
import { getSettings } from '@/lib/content'
import { ContactForm } from '@/components/contact/contact-form'
import { SectionShell } from '@/components/layout/section-shell'
import { SectionHeader } from '@/components/typography/section-header'

export async function ContactFormSection({ section }: { section: SectionOf<'contactForm'> }) {
  const { data, settings } = section
  const site = await getSettings()
  const projectTypes = data.projectTypes.length > 0 ? data.projectTypes : PROJECT_TYPES
  return (
    <SectionShell
      settings={{
        ...settings,
        background: settings.background === 'teal' ? 'surface' : settings.background,
      }}
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader
            eyebrow={data.eyebrow}
            heading={data.heading}
            headingAccent={data.headingAccent}
            description={data.description}
            className="md:block"
          />
        </div>
        <div
          className="rounded-[var(--radius-xl)] border border-line bg-surface-2 p-6 md:p-10 lg:col-span-8"
          data-reveal
        >
          <ContactForm projectTypes={projectTypes} fallbackEmail={site.email} />
        </div>
      </div>
    </SectionShell>
  )
}
