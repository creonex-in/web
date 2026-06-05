import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

export default function CreatorButton(): React.ReactElement {
  return (
    <section className="dark section-py bg-background relative">

      {/* Ambient teal glows */}
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-primary/15 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary/10 blur-xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-8 -left-12 h-40 w-40 rounded-full bg-primary/8 blur-xl" />

      <div className="page-container relative">
        {/* Label — outside image, centered */}
        <p className="text-label text-primary mb-8 text-center">For Creators</p>

        <div className="relative min-h-[400px] overflow-hidden rounded-3xl border border-white/10 sm:min-h-[460px]">
          {/* Background image */}
          <Image
            src="/showcase/start-teaching-today.png"
            alt="Creators teaching on Creonex"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 1200px, 100vw"
          />

          {/* Content — left aligned */}
          <div className="relative flex min-h-[400px] items-center sm:min-h-[460px]">
            <div className="max-w-xl px-8 py-10 sm:px-14 lg:px-20">
              <h2 className="text-h1 text-balance text-black">
                Your knowledge is worth{" "}
                <span className="text-primary">more than you think.</span>
              </h2>

              <div className="mt-8">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href="/creator" />}
                  className="group/button rounded-full px-8"
                >
                  Start Teaching Today
                  <FontAwesomeIcon
                    icon={faArrowRightLong}
                    className="ml-2 transition-transform duration-300 group-hover/button:translate-x-1"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
