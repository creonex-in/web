import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}): Promise<React.ReactElement> {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="flex h-14 shrink-0 items-center border-b border-border bg-background px-6">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
        >
          <Image
            src="/logo.webp"
            alt="Creonex"
            width={28}
            height={28}
            className="size-7 object-contain"
          />
          <span className="text-base font-bold tracking-tight">Creonex</span>
        </Link>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-10">
        <div className="w-full max-w-[28rem]">{children}</div>
      </main>
    </div>
  )
}
