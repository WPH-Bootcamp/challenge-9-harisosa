"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { restaurantApi } from "../api";


export function useNearbyRestaurants(
  page: number = 1,
  limit: number = 20,
  enabled? : boolean,
) {
  return useQuery({
    queryKey: queryKeys.collections.nearby(page, limit),
    queryFn: () => restaurantApi.getNearBy(page, limit),
    enabled,
    staleTime: 1000 * 60 * 2, 
  });
}
