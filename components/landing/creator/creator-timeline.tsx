import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";

export default function CreatorTimeline() {
  const data = [
    {
      title: "Step 1",
      content: (
        <div key="step-1" className="w-full">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">30 Seconds</span>
          </div>
          <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Choose Your Niche</h4>
          <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
            Pick from curated niches. Your selection is used to pre-fill your first offering so you can start without a blank page. Whether you teach code, fitness, or culinary arts, we have the perfect template.
          </p>
          
          {/* 2x2 Standard Grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-border/20">
               <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="Tech Setup" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-border/20">
               <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" alt="Fitness Coach" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-border/20">
               <Image src="https://images.unsplash.com/photo-1556910103-1c02745a8728?auto=format&fit=crop&w=800&q=80" alt="Culinary" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-border/20">
               <Image src="https://images.unsplash.com/photo-1516280440502-8610530737a8?auto=format&fit=crop&w=800&q=80" alt="Music" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div key="step-2" className="w-full">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">60 Seconds</span>
          </div>
          <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Confirm Your Offering</h4>
          <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
            Review the dynamically suggested title and description. Edit anything you want, adjust your pricing model, or publish it instantly as-is. Our AI ensures high-converting copy from day one.
          </p>
          
          {/* Top Heavy Grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
             <div className="col-span-2 relative aspect-[21/9] rounded-xl overflow-hidden shadow-sm border border-border/20">
                <Image src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80" alt="Review" fill className="object-cover hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-border/20">
                <Image src="https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80" alt="Pricing" fill className="object-cover hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-border/20">
                <Image src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80" alt="Details" fill className="object-cover hover:scale-105 transition-transform duration-500" />
             </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div key="step-3" className="w-full">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Immediate</span>
          </div>
          <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Go Live</h4>
          <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
            Your storefront goes live instantly. A shareable URL is generated and discovery boost is automatically activated to help buyers find you across the Creonex ecosystem.
          </p>
          
          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-2 gap-4 w-full h-[400px] md:h-[500px]">
             <div className="row-span-2 relative rounded-xl overflow-hidden shadow-sm border border-border/20">
                <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Dashboard" fill className="object-cover hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="relative rounded-xl overflow-hidden shadow-sm border border-border/20">
                <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80" alt="Share" fill className="object-cover hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="relative rounded-xl overflow-hidden shadow-sm border border-border/20">
                <Image src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80" alt="Social" fill className="object-cover hover:scale-105 transition-transform duration-500" />
             </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 4",
      content: (
        <div key="step-4" className="w-full">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Target: Within 7 Days</span>
          </div>
          <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-4">First Booking Arrives</h4>
          <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
            A buyer discovers your offering, books a session, and completes payment. Notifications and Google Meet links are generated and dispatched completely automatically.
          </p>
          
          {/* Masonry-style Grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-border/20">
               <Image src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" alt="Payment" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-border/20">
               <Image src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80" alt="Notification" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="col-span-2 relative aspect-[21/9] rounded-xl overflow-hidden shadow-sm border border-border/20">
               <Image src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" alt="Success" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 5",
      content: (
        <div key="step-5" className="w-full">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Ongoing</span>
          </div>
          <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Earn & Grow</h4>
          <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
            Complete sessions, receive 5-star reviews, improve your platform rating, and scale your income streams directly from your personalized analytics dashboard.
          </p>
          
          {/* Bottom Heavy Grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
             <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-border/20">
                <Image src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80" alt="Analytics" fill className="object-cover hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-border/20">
                <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="Growth" fill className="object-cover hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="col-span-2 relative aspect-[21/9] rounded-xl overflow-hidden shadow-sm border border-border/20">
                <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80" alt="Expansion" fill className="object-cover hover:scale-105 transition-transform duration-500" />
             </div>
          </div>
        </div>
      ),
    },
  ];

  const header = (
    <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
      <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 shadow-sm shadow-primary/20">
        <span className="h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Creator Journey</span>
      </div>
      <h2 className="text-4xl md:text-5xl lg:text-[54px] font-medium tracking-tight text-foreground mb-6 leading-tight">
        From zero to earning in 7 days.<br className="hidden md:block" /> Here&apos;s how.
      </h2>
      <p className="text-lg md:text-xl font-light text-muted-foreground max-w-2xl leading-relaxed">
        We eliminated the learning curve. Launch your creator business faster than brewing a cup of coffee.
      </p>
    </div>
  );

  return (
    <section className="bg-background pt-0 pb-24 overflow-hidden relative">
      <div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-card to-transparent pointer-events-none" />
      <Timeline data={data} header={header} />
    </section>
  );
}
