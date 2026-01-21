"use client";

import { Restaurant } from "@/types/restaurant";
import Image from "next/image";
import React from "react";

type RestaurantCardProps = {
  data: Restaurant
}

export const RestaurantCard : React.FC<RestaurantCardProps> = (props) => {
  const {logo, name, star , distance, place} = props.data;
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#FFF3E6]">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain p-1"
            sizes="56px"
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-black">
            {name}
          </div>

          <div className="mt-1 flex items-center gap-1 text-xs text-black/70">
            <span className="text-yellow-500">★</span>
            <span>{star}</span>
          </div>

          <div className="mt-1 text-xs text-black/50">
            {place} · {distance} km
          </div>
        </div>
      </div>
    </div>
  );
}
