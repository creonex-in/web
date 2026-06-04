import { ExploreNav } from '@/components/layout/explore-nav'
import { Toaster } from '@/components/ui/sonner'

export default function LearnerLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="min-h-screen bg-background">
      <ExploreNav />
      <main>{children}</main>
      <Toaster position="bottom-right" />
    </div>
  )
}
