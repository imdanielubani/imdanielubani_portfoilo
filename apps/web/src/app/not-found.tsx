import { ButtonLink } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="frame-pad flex min-h-[80vh] flex-col justify-center pt-32 pb-20">
      <p className="section-label mb-4">{'// Error 404'}</p>
      <h1 className="text-display max-w-3xl text-ink">
        This page took a <span className="text-ink-muted">different route.</span>
      </h1>
      <p className="mt-6 max-w-xl text-lead text-ink-muted">
        The page you are looking for does not exist or is no longer published.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/projects" variant="secondary">
          Browse projects
        </ButtonLink>
      </div>
    </section>
  )
}
