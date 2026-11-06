export default function Loading() {
  return (
    <div className="container-du pt-40 pb-24" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <div className="h-4 w-32 animate-pulse rounded-full bg-surface" />
      <div className="mt-8 h-16 w-full max-w-3xl animate-pulse rounded-2xl bg-surface" />
      <div className="mt-4 h-16 w-2/3 max-w-2xl animate-pulse rounded-2xl bg-surface" />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="aspect-[4/3] animate-pulse rounded-3xl bg-surface" />
        <div className="aspect-[4/3] animate-pulse rounded-3xl bg-surface" />
      </div>
    </div>
  )
}
