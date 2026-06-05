import { ExploreNav } from '@/components/layout/explore-nav'

export default function CreatorProfileLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="min-h-screen bg-background">
      <ExploreNav />
      <main>{children}</main>
    </div>
  )
}
