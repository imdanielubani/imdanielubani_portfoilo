import {
  ArrowUpRight,
  Compass,
  Database,
  Layers,
  LayoutDashboard,
  Monitor,
  Plug,
  Rocket,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  database: Database,
  layers: Layers,
  layout: LayoutDashboard,
  monitor: Monitor,
  plug: Plug,
  rocket: Rocket,
  server: Server,
  shield: Shield,
  smartphone: Smartphone,
  sparkles: Sparkles,
}

/** Icons selectable from the CMS by name; unknown names fall back to an arrow. */
export function FeatureIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && ICONS[name]) || ArrowUpRight
  return <Icon className={className} aria-hidden strokeWidth={1.5} />
}

export const FEATURE_ICON_NAMES = Object.keys(ICONS)
