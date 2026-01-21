"use client";

import Image from "next/image";

export type RestaurantVM = {
  id: string;
  name: string;
  rating: number;
  location: string;
  distanceKm: number;
  logo: string;
};

export default function RestaurantCard({ data }: { data: RestaurantVM }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#FFF3E6]">
          <Image
            src={data.logo}
            alt={data.name}
            fill
            className="object-contain p-1"
            sizes="56px"
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-black">
            {data.name}
          </div>

          <div className="mt-1 flex items-center gap-1 text-xs text-black/70">
            <span className="text-yellow-500">★</span>
            <span>{data.rating}</span>
          </div>

          <div className="mt-1 text-xs text-black/50">
            {data.location} · {data.distanceKm} km
          </div>
        </div>
      </div>
    </div>
  );
}
