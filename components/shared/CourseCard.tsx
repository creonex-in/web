import Image from "next/image";
import { FaStar } from "react-icons/fa";
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
    <div className="card-feature hover:shadow-lg group cursor-pointer p-0 overflow-hidden flex flex-col">
      <div className="relative h-44 w-full overflow-hidden shrink-0">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground border-0 text-xs">
          {category}
        </Badge>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-[15px] font-semibold leading-snug line-clamp-2 min-h-[2.6rem]">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <Avatar className="size-5 shrink-0">
            <AvatarImage src={instructorAvatar} />
            <AvatarFallback className="text-[10px]">{instructor[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground line-clamp-1">{instructor}</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="flex items-center gap-1 text-sm font-medium">
            <FaStar className="size-3 text-yellow-400" />
            {rating}
          </span>
          <span className="font-bold text-[15px] text-foreground">
            ₹{price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}
