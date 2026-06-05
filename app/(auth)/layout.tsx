import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <main className="grid min-h-screen lg:grid-cols-[0.92fr_1fr]">
      {/* ━━━━━━━━━━━━━━━ LEFT PANEL — hidden on mobile ━━━━━━━━━━━━━━━ */}
      <div className="relative hidden overflow-hidden bg-muted lg:flex lg:flex-col lg:justify-between">
        {/* Image inset */}
        <div className="absolute inset-5 overflow-hidden rounded-none">
          <Image
            src="/auth/auth-layout-image.png"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="38vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Decorative teal glow */}
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-primary/15 blur-[128px]" />

        {/* Logo */}
        <div className="relative z-10 p-9">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo.webp"
              alt="Creonex"
              width={30}
              height={30}
              className="size-[30px] object-contain"
            />
            <span className="font-display text-lg font-bold tracking-tight text-black">
              Creonex
            </span>
          </Link>
        </div>

        {/* Tagline */}
        <div className="relative z-10 p-9">
          <h2 className="max-w-sm font-display text-[1.75rem] font-bold leading-snug tracking-tight text-white">
            Learn from the best.
            <br />
            Teach what you know.
          </h2>
          <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-white/50">
            Whether you&apos;re here to grow your skills or build your creator
            business — Creonex is your platform.
          </p>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━ RIGHT PANEL — form slot ━━━━━━━━━━━━━━━ */}
      <div className="flex flex-col items-center justify-center px-6 py-16 sm:px-10 lg:px-24">
        {/* Mobile-only logo */}
        <Link
          href="/"
          className="mb-10 flex items-center gap-2.5 transition-opacity hover:opacity-80 lg:hidden"
        >
          <Image
            src="/logo.webp"
            alt="Creonex"
            width={36}
            height={36}
            className="size-9 object-contain"
            priority
          />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Creonex
          </span>
        </Link>

        {children}
      </div>
    </main>
  )
}
