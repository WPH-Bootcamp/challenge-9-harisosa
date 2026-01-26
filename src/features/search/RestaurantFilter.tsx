"use client";

import { useMemo } from "react";
import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
import { Checkbox } from "@/ui/checkbox";
import { Separator } from "@/ui/separator";
import { Star } from "lucide-react";
import { DistanceFilter, SearchFilters } from "@/types/filter";

type RestaurantFilterProps = {
  value: SearchFilters;
  onChange: (v: SearchFilters) => void;
  variant?: "panel" | "sheet";
};

const distanceOptions: { key: DistanceFilter; label: string }[] = [
  { key: "nearby", label: "Nearby" },
  { key: "1", label: "Within 1 km" },
  { key: "3", label: "Within 3 km" },
  { key: "5", label: "Within 5 km" },
];

export const RestaurantFilter: React.FC<RestaurantFilterProps> = ({
  value,
  onChange,
  variant = "panel",
}) => {
  const ratingSet = useMemo(() => {
    return new Set<number>(value.ratings);
  }, [value.ratings]);
  const toggleRating = (rating: number) => {
    const next = new Set<number>(ratingSet);

    if (next.has(rating)) {
      next.delete(rating);
    } else {
      next.add(rating);
    }

    onChange({
      ...value,
      ratings: Array.from(next).sort((a, b) => b - a),
    });
  };

  const setDistance = (d: DistanceFilter) => {
    onChange({
      ...value,
      distance: d,
    });
  };

  const setMinPrice = (v: string) => {
    onChange({
      ...value,
      minPrice: v ? Number(v) : undefined,
    });
  };

  const setMaxPrice = (v: string) => {
    onChange({
      ...value,
      maxPrice: v ? Number(v) : undefined,
    });
  };

  const content = (
    <>
      {variant === "panel" && (
        <div className="text-sm font-semibold tracking-wide">FILTER</div>
      )}

      <div className={variant === "panel" ? "mt-4 space-y-3" : "space-y-3"}>
        <div className="text-sm font-semibold">Distance</div>

        <div className="space-y-4">
          {distanceOptions.map((opt) => (
            <label
              key={opt.key}
              className="flex items-center gap-3 text-sm"
            >
              <Checkbox
                checked={value.distance === opt.key}
                onCheckedChange={() => setDistance(opt.key)}
                className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
              />
              <span className="text-muted-foreground">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-3">
        <div className="text-sm font-semibold">Price</div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
            <div className="rounded-md bg-muted px-2 py-1 text-xs font-semibold">
              Rp
            </div>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Minimum Price"
              className="border-0 p-0 shadow-none focus-visible:ring-0"
              value={value.minPrice ?? ""}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
            <div className="rounded-md bg-muted px-2 py-1 text-xs font-semibold">
              Rp
            </div>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Maximum Price"
              className="border-0 p-0 shadow-none focus-visible:ring-0"
              value={value.maxPrice ?? ""}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator className="my-6" />
      <div className="space-y-3">
        <div className="text-sm font-semibold">Rating</div>

        <div className="space-y-4">
          {[5, 4, 3, 2, 1].map((r) => (
            <label
              key={r}
              className="flex items-center gap-3 text-sm"
            >
              <Checkbox
                checked={ratingSet.has(r)}
                onCheckedChange={() => toggleRating(r)}
              />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span>{r}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </>
  );
  if (variant === "sheet") {
    return <div className="p-6">{content}</div>;
  }

  return (
    <Card className="rounded-2xl border bg-white p-5">
      {content}
    </Card>
  );
};
