import { cn } from "@/lib/utils";
import { Star } from "lucide-react"

type RatingProps = {
    rating: number;
    className?: string;
}


export const Rating: React.FC<RatingProps> = ({ className, rating }) => {
    return (
        <div className={
            cn(
                "mt-1 flex items-center gap-1 text-md text-black/70", className)}>
            <Star className="text-yellow-500 fill-current" />
            <span>{rating}</span>
        </div>
    )
}