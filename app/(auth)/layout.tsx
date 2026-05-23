import AuthLeftPanel from "@/components/shared/auth-left-panel";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <AuthLeftPanel />

      {/* Right panel */}
      <div className="flex flex-col min-h-screen bg-background">
        {/* Mobile-only logo */}
        <div className="flex md:hidden items-center gap-2.5 px-6 py-5 border-b border-[var(--border)]">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.webp"
              alt="Creonex"
              width={30}
              height={30}
              className="size-7.5 object-contain"
              priority
            />
            <span className="text-lg font-bold tracking-tight text-foreground">Creonex</span>
          </Link>
        </div>

        {/* Clerk form centred */}
        <div className="flex-1 flex items-center justify-center px-4 py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
