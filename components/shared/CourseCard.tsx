import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface CourseCardProps {
  title: string;
  instructor: string;
  instructorAvatar?: string;
  thumbnail: string;
  category: string;
  rating: number;
  price: number;
}

export default function CourseCard({
  title,
  instructor,
  instructorAvatar,
  thumbnail,
  category,
  rating,
  price,
}: CourseCardProps) {
  return (
    <div className="card-feature hover:shadow-lg group cursor-pointer p-0 overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground border-0">
          {category}
        </Badge>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-[16px] font-semibold leading-snug line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <Avatar className="size-6">
            <AvatarImage src={instructorAvatar} />
            <AvatarFallback>{instructor[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{instructor}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm font-medium">⭐ {rating}</span>
          <span className="font-bold text-foreground">₹{price.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}
