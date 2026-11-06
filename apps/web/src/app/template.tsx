import type { ReactNode } from 'react'

/** Remounts on every navigation, giving each route a soft entrance. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>
}
