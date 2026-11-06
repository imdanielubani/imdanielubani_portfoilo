import type { Section } from '@du/schemas'
import type { SiteSettings } from '@du/types'
import { PageMotion } from '@/components/motion/motion-root'
import { ContactFormSection } from './contact-form-section'
import { CtaSection } from './cta-section'
import { CustomSection } from './custom-section'
import { ExperienceTimelineSection } from './experience-timeline-section'
import { FaqSection } from './faq-section'
import { FeaturedProjectSection } from './featured-project-section'
import { FullWidthImageSection } from './full-width-image-section'
import { GallerySection } from './gallery-section'
import { HeroSection } from './hero-section'
import { ImageTextSection } from './image-text-section'
import { LogoCloudSection } from './logo-cloud-section'
import { ProjectGridSection } from './project-grid-section'
import { RichTextSection } from './rich-text-section'
import { ServicesSection } from './services-section'
import { SkillsGridSection } from './skills-grid-section'
import { StatisticsSection } from './statistics-section'
import { TestimonialsSection } from './testimonials-section'
import { VideoSection } from './video-section'

interface RenderContext {
  site: SiteSettings
  isFirst: boolean
}

/**
 * Maps a validated section to its renderer. The switch is exhaustive over the
 * schema union, so adding a section type without a renderer fails type-checking.
 */
export function renderSection(section: Section, { site, isFirst }: RenderContext) {
  switch (section.type) {
    case 'hero':
      return <HeroSection section={section} site={site} isFirst={isFirst} />
    case 'richText':
      return <RichTextSection section={section} />
    case 'imageText':
      return <ImageTextSection section={section} site={site} isFirst={isFirst} />
    case 'fullWidthImage':
      return <FullWidthImageSection section={section} />
    case 'gallery':
      return <GallerySection section={section} />
    case 'projectGrid':
      return <ProjectGridSection section={section} />
    case 'featuredProject':
      return <FeaturedProjectSection section={section} />
    case 'skillsGrid':
      return <SkillsGridSection section={section} />
    case 'experienceTimeline':
      return <ExperienceTimelineSection section={section} />
    case 'statistics':
      return <StatisticsSection section={section} />
    case 'testimonials':
      return <TestimonialsSection section={section} />
    case 'services':
      return <ServicesSection section={section} />
    case 'cta':
      return <CtaSection section={section} site={site} />
    case 'contactForm':
      return <ContactFormSection section={section} />
    case 'video':
      return <VideoSection section={section} />
    case 'faq':
      return <FaqSection section={section} />
    case 'logoCloud':
      return <LogoCloudSection section={section} />
    case 'custom':
      return <CustomSection section={section} />
    default: {
      const unreachable: never = section
      return unreachable
    }
  }
}

export function SectionRenderer({ sections, site }: { sections: Section[]; site: SiteSettings }) {
  return (
    <>
      {sections.map((section, index) => (
        <div key={section.id} data-section-type={section.type}>
          {renderSection(section, { site, isFirst: index === 0 })}
        </div>
      ))}
      <PageMotion />
    </>
  )
}
