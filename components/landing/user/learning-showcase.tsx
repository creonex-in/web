import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// ── Types ─────────────────────────────────────────────────────────────────────

type Feature = {
  id: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  imageSrc: string;
  imageAlt: string;
  reversed: boolean;
};

// ── Data ──────────────────────────────────────────────────────────────────────

const FEATURES: Feature[] = [
  {
    id: "courses",
    title: "Master skills at your own pace",
    description: "Access expert-created, highly structured video courses. Learn everything from advanced system architecture to UI/UX design on your own schedule, with lifetime access to the material.",
    linkText: "Browse courses",
    linkHref: "/top-creators?offering=courses",
    imageSrc: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Video learning dashboard",
    reversed: false,
  },
  {
    id: "sessions",
    title: "1-on-1 expert mentorship",
    description: "Stop guessing and get direct answers. Book private, face-to-face video sessions with industry leaders to solve complex problems, review your resume, or get career guidance.",
    linkText: "Find a mentor",
    linkHref: "/top-creators?offering=sessions",
    imageSrc: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "1-on-1 video session",
    reversed: true,
  },
  {
    id: "resources",
    title: "Curated learning resources",
    description: "Download premium PDF guides, Notion templates, and technical documentation crafted directly by the experts to accelerate your daily workflow.",
    linkText: "Explore resources",
    linkHref: "/top-creators?offering=resources",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Digital resources",
    reversed: false,
  },
];

// ── ShowcaseImage ─────────────────────────────────────────────────────────────

function ShowcaseImage({ src, alt }: { src: string; alt: string }): React.ReactElement {
  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[2.5rem] bg-muted/50 p-8 sm:p-12 md:aspect-[4/3] ring-1 ring-border/50">
      {/* Inner App Window Representation */}
      <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-card shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] ring-1 ring-border/20 transition-transform duration-700 ease-out hover:scale-[1.03]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

// ── FeatureBlock ──────────────────────────────────────────────────────────────

function FeatureBlock({ feature }: { feature: Feature }): React.ReactElement {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={feature.reversed ? "lg:order-last" : ""}>
        <ShowcaseImage src={feature.imageSrc} alt={feature.imageAlt} />
      </div>

      <div className="flex max-w-lg flex-col gap-5 lg:mx-auto">
        <h3 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-balance">
          {feature.title}
        </h3>
        <p className="text-lg font-medium leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
        <div className="pt-2">
          <Link
            href={feature.linkHref}
            className="group inline-flex items-center gap-2 text-base font-bold text-primary transition-colors hover:text-primary/80"
          >
            {feature.linkText}
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function LearningShowcase(): React.ReactElement {
  return (
    <section className="overflow-hidden bg-background pt-16 md:pt-24 pb-10 md:pb-16">
      <div className="page-container">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            More than just video courses. <br />
            <span className="text-primary">Real, personalized growth.</span>
          </h2>
        </div>

        {/* Feature Blocks */}
        <div className="flex flex-col gap-20 md:gap-24">
          {FEATURES.map((feature) => (
            <FeatureBlock key={feature.id} feature={feature} />
          ))}
        </div>

      </div>
    </section>
  );
}