import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'

export default function LearnerLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <SidebarProvider>
      <AppSidebar role="learner" userName="Arjun Kumar" userInitials="AK" />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
