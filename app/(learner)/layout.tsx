import { ExploreNav } from '@/components/layout/explore-nav'
import { LearnerBottomNav } from '@/components/layout/learner-bottom-nav'
import { Toaster } from '@/components/ui/sonner'

export default function LearnerLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="min-h-screen bg-background">
      <ExploreNav />
      <main className="pb-16 md:pb-0">{children}</main>
      <LearnerBottomNav />
      <Toaster position="bottom-right" />
    </div>
  )
}
