import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
      <div className="flex flex-col gap-1">
        <h4>{name}</h4>
        <p className="body-sm">{title}</p>
      </div>
      <Badge variant="secondary">{domain}</Badge>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>⭐ {rating}</span>
        <span>{sessions} sessions</span>
      </div>
      <button className="btn-primary w-full mt-1">Book Session</button>
    </div>
  );
}
