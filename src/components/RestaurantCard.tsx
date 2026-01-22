"use client";

import { Restaurant } from "@/types/restaurant";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Rating } from "./Rating";

type RestaurantCardProps = {
  data: Restaurant
}

export const RestaurantCard: React.FC<RestaurantCardProps> = (props) => {
  const router = useRouter();
  const { id, logo, name, star, distance, place } = props.data;
  const onClickRestaurant = () => {
    router.push(`/restaurant/${id}`);
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition"
      onClick={onClickRestaurant}
    >
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="relative h-30 w-30 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain w-full"
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="truncate text-lg font-semibold text-black">
            {name}
          </div>

          <Rating rating={star} />
          <div className="mt-1 text-md text-black/50">
            {place} · {distance} km
          </div>
        </div>
      </div>
    </div>
  );
}
