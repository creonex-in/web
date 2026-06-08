import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

export default function CreatorRoutingBanner(): React.ReactElement {
  return (
    <div className="w-full bg-muted/40 border-b border-border/40 py-3 relative z-30 select-none">
      <div className="page-container flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/5 text-foreground shrink-0">
            <FontAwesomeIcon icon={faGraduationCap} className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Are you a creator? <span className="text-muted-foreground font-normal">Monetize your expertise, host 1:1 sessions, and teach on Creonex.</span>
            </p>
          </div>
        </div>
        
        <Link href="/creators">
          <Button 
            size="sm" 
            variant="outline"
            className="rounded-full bg-black text-white hover:bg-zinc-800 hover:text-white px-5 text-xs font-bold transition-all duration-300 ease-in-out hover:-translate-y-0.5 shadow-sm shrink-0"
          >
            Teach on Creonex
            <FontAwesomeIcon icon={faArrowRight} className="ml-1.5 h-3 w-3" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
