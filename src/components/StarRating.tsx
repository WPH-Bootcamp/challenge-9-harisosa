"use client";

import { Star } from "lucide-react";

export const StartRating : React.FC<{value : number}> = ({value}) => {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) {
          return (
            <Star
              key={i}
              className="h-4 w-4 fill-yellow-500 text-yellow-500"
            />
          );
        }

        if (i === full && hasHalf) {
          return (
            <Star
              key={i}
              className="h-4 w-4 fill-yellow-500/50 text-yellow-500"
            />
          );
        }

        return (
          <Star
            key={i}
            className="h-4 w-4 text-yellow-500/30"
          />
        );
      })}
    </div>
  );
}