import { FaStar } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ExpertCardProps {
  name: string;
  title: string;
  avatar: string;
  domain: string;
  rating: number;
  sessions: number;
}

export default function ExpertCard({
  name,
  title,
  avatar,
  domain,
  rating,
  sessions,
}: ExpertCardProps) {
  return (
    <div className="card-feature hover:shadow-lg flex flex-col items-center text-center gap-4 cursor-pointer">
      <Avatar className="size-16">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 w-full">
        <h4 className="text-[16px] font-semibold text-foreground line-clamp-1">{name}</h4>
        <p className="text-[13px] text-muted-foreground line-clamp-2 min-h-[2.5rem] leading-[1.4]">
          {title}
        </p>
      </div>
      <Badge variant="secondary" className="text-xs">{domain}</Badge>
      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <FaStar className="size-3 text-yellow-400" />
          {rating}
        </span>
        <span>{sessions} sessions</span>
      </div>
      <Button variant="brand" size="md" className="w-full mt-1">
        Book Session
      </Button>
    </div>
  );
}
