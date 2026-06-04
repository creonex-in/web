export default function OnboardingLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      {children}
    </div>
  )
}
