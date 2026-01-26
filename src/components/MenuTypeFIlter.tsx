"use client";

import { Button } from "@/ui/button";

export type MenuTypeFilter = "all" | "food" | "drink";

type Props = {
  type: MenuTypeFilter;
  onTypeChange: (v: MenuTypeFilter) => void;
};

export function MenuFilters({ type, onTypeChange }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <div className="flex gap-2">
        <Button variant={type === "all" ? "default" : "outline"} onClick={() => onTypeChange("all")}>
          All
        </Button>
        <Button variant={type === "food" ? "default" : "outline"} onClick={() => onTypeChange("food")}>
          Food
        </Button>
        <Button variant={type === "drink" ? "default" : "outline"} onClick={() => onTypeChange("drink")}>
          Drink
        </Button>
      </div>
    </div>
  );
}
