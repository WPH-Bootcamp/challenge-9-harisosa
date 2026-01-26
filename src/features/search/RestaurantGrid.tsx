"use client";

import { RestaurantCard } from "@/components/RestaurantCard";
import { Restaurant } from "@/types";
import React from "react";



export const RestaurantGrid :React.FC<{ items: Restaurant[] }> = ({ items }) =>{
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((r) => (
          <RestaurantCard key={r.id} data={r} />
        ))}
      </div>
    </div>
  );
}
