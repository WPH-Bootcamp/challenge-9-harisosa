"use client";

import RestaurantCard, { RestaurantVM } from "./RestaurantCard";

const MOCK_DATA: RestaurantVM[] = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i),
  name: "Burger King",
  rating: 4.9,
  location: "Jakarta Selatan",
  distanceKm: 2.4,
  logo: "/images/mock/burger-king.png",
}));

export default function Recommended() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">Recommended</h2>
        <button className="text-sm font-semibold text-red-500 hover:underline">
          See All
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {MOCK_DATA.map((item) => (
          <RestaurantCard key={item.id} data={item} />
        ))}
      </div>

      {/* Show More */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          className="
            h-10 rounded-full bg-white px-10
            text-sm font-medium text-black/70
            border border-black/10
            shadow-sm
            hover:bg-black/2
            transition
          "
        >
          Show More
        </button>
      </div>
    </section>
  );
}
