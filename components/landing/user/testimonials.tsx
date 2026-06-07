import Image from "next/image";

export interface Testimonial {
  id: string;
  name: string;
  niche: string;
  quote: string;
  avatarSrc?: string;
  initials?: string;
}

const DEFAULT_USER_TESTIMONIALS: Testimonial[] = [
  {
    id: "u1",
    name: "Ananya Joshi",
    niche: "Product Designer",
    quote: "I was very satisfied with the work. Booked a portfolio review session and got an offer at a product startup the very next week. Always available and detail orientated. Thank you again.",
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "u2",
    name: "Karan Bhatia",
    niche: "Software Engineer",
    quote: "Excellent mentor! Karan is very skilled and polite. He was very attentive to my project and helped me crack my system design round after two 1:1 sessions. Looking forward to working with him again!",
    avatarSrc: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "u3",
    name: "Meghna Pillai",
    niche: "Marketing Pro",
    quote: "Meghna is incredible! This is the second session we have done together and hope to have many more. Quick communication, very fast turnaround, great attitude to feedback - you couldn't want anything better!",
    avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "u4",
    name: "Sahil Gupta",
    niche: "CS Student",
    quote: "The React course was more useful than my entire semester. One of the sessions was very close to what we envisioned, and they quickly made the necessary adjustments to perfect it. The delivery was fast and the communication smooth.",
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "u5",
    name: "Riya Malhotra",
    niche: "Finance Analyst",
    quote: "I've gone through a lot of mentors but Riya knows what she is doing. Booked a career growth session and completely changed my trajectory. I would not hesitate to recommend her.",
    avatarSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
  },
];

interface TestimonialsProps {
  heading?: string;
  subheading?: string;
  testimonials?: Testimonial[];
}

export default function UserTestimonials({ 
  heading = "10,000+ Happy Learners", 
  subheading = "TESTIMONIALS", 
  testimonials = DEFAULT_USER_TESTIMONIALS 
}: TestimonialsProps): React.ReactElement {
  return (
    <section className="bg-background pt-16 md:pt-24 pb-10 md:pb-16 border-t border-border/10">
      <div className="page-container">
        <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-6 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
            {subheading}
          </div>
          <h2 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            {heading}
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          
          {testimonials.map((t) => (
            <div key={t.id} className="mb-6 break-inside-avoid rounded-2xl bg-card border border-border/50 p-8 shadow-sm transition-all hover:shadow-md">
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {t.quote}
              </p>
              
              <div className="mt-8 flex items-center gap-4">
                {t.avatarSrc ? (
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted border border-border/50">
                    <Image src={t.avatarSrc} alt={t.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-foreground flex items-center justify-center text-[12px] font-bold text-background shrink-0">
                    {t.initials || t.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-[13px] text-muted-foreground">{t.niche}</p>
                </div>
              </div>
            </div>
          ))}

          {/* "You?" Card */}
          <div className="mb-6 flex min-h-[200px] break-inside-avoid flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-transparent p-8 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent/30 cursor-pointer">
            <span className="text-3xl font-light">+</span>
            <span className="mt-2 text-sm font-medium">you?</span>
          </div>

        </div>
        </div>
      </div>
    </section>
  );
}
