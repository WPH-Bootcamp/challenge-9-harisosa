"use client";

import Image from "next/image";
import type { RestaurantReview } from "@/types/restaurant";
import { dateFormatter } from "@/lib/dateFormatter";
import { StartRating } from "./StarRating";


type ReviewCardProps = {
  review: RestaurantReview;
};


export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted shrink-0">
          {review.user?.avatar ? (
            <Image src={review.user.avatar} alt={review.user.name} fill className="object-cover" />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="font-semibold truncate">{review.user?.name}</div>
          <div className="text-sm text-muted-foreground">
            {dateFormatter(review.createdAt)}
          </div>

          <div className="mt-3">
            <StartRating value={review.star} />
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
}
