"use client";

import { useMemo, useState } from "react";
import { Button } from "@/ui/button";
import type { RestaurantReview } from "@/types/restaurant";
import { ReviewCard } from "@/components/ReviewCard";


type ReviewSectionProps = {
  averageRating: number;   // 4.9
  totalReviews: number;    // 24
  reviews: RestaurantReview[];
  initialCount?: number;   // default 6
  step?: number;           // default 4
};

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  averageRating,
  totalReviews,
  reviews,
  initialCount = 6,
  step = 4,
}) => {
  const [visible, setVisible] = useState(initialCount);

  const visibleReviews = useMemo(() => reviews.slice(0, visible), [reviews, visible]);
  const canShowMore = visible < reviews.length;

  return (
    <section className="space-y-4 py-8">

      <div className="space-y-1">
        <h2 className="text-4xl font-semibold">Review</h2>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-yellow-500">★</span>
          <span>{averageRating.toFixed(1)}</span>
          <span className="text-muted-foreground font-normal">
            ({totalReviews} Ulasan)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleReviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>

      {canShowMore ? (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            className="rounded-full px-10 h-12"
            onClick={() => setVisible((v) => Math.min(v + step, reviews.length))}
          >
            Show More
          </Button>
        </div>
      ) : null}
    </section>
  );
}
