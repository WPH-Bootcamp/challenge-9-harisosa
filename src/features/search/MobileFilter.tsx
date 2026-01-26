"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";
import { SearchFilters } from "@/types/filter";
import { RestaurantFilter } from "./RestaurantFilter";


type Props = {
  value: SearchFilters;
  onChange: (v: SearchFilters) => void;
};

export function MobileFilter({ value, onChange }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="w-full rounded-2xl border bg-white px-4 py-4 flex items-center justify-between"
        >
          <span className="text-sm font-semibold tracking-wide">FILTER</span>
          <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[320px] p-0">
        <div className="absolute right-3 top-3 z-10">
          <SheetClose asChild>
            <button
              type="button"
              aria-label="Close"
              className="h-10 w-10 rounded-full bg-white shadow-[0_4px_12px_rgba(203,202,202,0.25)] grid place-items-center"
            >
              <X className="h-5 w-5" />
            </button>
          </SheetClose>
        </div>
        <div className="pt-2">

          <RestaurantFilter
            value={value}
            onChange={onChange}
            variant="sheet"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
