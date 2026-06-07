import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function FinalCta(): React.ReactElement {
  return (
    <section className="bg-background py-24 md:py-32 relative border-t border-border/40">
      
      {/* Extremely Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="page-container flex flex-col items-center text-center relative z-10">
        
        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-foreground mb-6 text-balance leading-[1.15]">
          Ready to accelerate your career?
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl font-normal leading-relaxed text-balance">
          Join thousands of ambitious learners upskilling with India's top 1% experts. 
          Book your first session today.
        </p>
        
        <Button 
          size="lg" 
          nativeButton={false}
          render={<Link href="/top-creators" />}
          className="group/button h-14 rounded-full px-10 text-base font-bold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg bg-foreground text-background hover:bg-foreground/90"
        >
          Explore Top Mentors
          <FontAwesomeIcon icon={faArrowRight} className="ml-3 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
        </Button>
        
      </div>
    </section>
  );
}
