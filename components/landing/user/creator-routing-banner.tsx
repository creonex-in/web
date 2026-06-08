import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CreatorRoutingBanner(): React.ReactElement {
  return (
    <div className="w-full border-b border-primary/15 bg-primary/5">
      <div className="page-container flex items-center justify-between gap-4 py-2.5">

        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
            <FontAwesomeIcon icon={faChalkboardUser} className="size-3.5 text-primary" />
          </div>
          <p className="truncate text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Want to teach and earn on Creonex.</span>
          </p>
        </div>

        <Link
          href="/creators"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "shrink-0 border-primary/40 text-primary transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground",
          )}
        >
          Start Teaching
          <FontAwesomeIcon icon={faArrowRight} className="ml-1.5 size-3" />
        </Link>

      </div>
    </div>
  );
}
