import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const features = [
  "Learn from India's top creators & verified experts",
  "Book 1-on-1 mentorship sessions",
  "Structured courses with real-world projects",
];

const stats = [
  { value: "10K+", label: "Learners" },
  { value: "500+", label: "Courses" },
  { value: "50+", label: "Mentors" },
];

export default function AuthLeftPanel() {
  return (
    <aside className="relative hidden md:flex flex-col justify-between min-h-screen overflow-hidden bg-[var(--brand-faint)] px-10 xl:px-14 py-10">

      {/* Soft background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 size-80 rounded-full bg-[var(--brand-ghost)] blur-3xl opacity-70" />
        <div className="absolute bottom-1/3 -left-16 size-64 rounded-full bg-[var(--brand-ghost)] blur-3xl opacity-50" />
      </div>

      {/* Logo */}
      <Link href="/" className="relative z-10 flex items-center gap-2.5 w-fit animate-fade-up">
        <Image
          src="/logo.webp"
          alt="Creonex"
          width={36}
          height={36}
          className="size-9 object-contain"
          priority
        />
        <span className="text-xl font-bold tracking-tight text-foreground">Creonex</span>
      </Link>

      {/* Central content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center gap-8 py-10">

        {/* Doodle illustration — replace src with your image */}
        <div className="flex justify-center animate-fade-up">
          <Image
            src="/logo.webp"
            alt=""
            width={340}
            height={280}
            className="w-full max-w-[340px] h-auto object-contain drop-shadow-sm"
            priority
          />
        </div>
      </div>
    </aside>
  );
}
