// src/features/restaurants/hooks/useRestaurantDetail.ts
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "./queryKey";
import { restaurantApi } from "../api";

export function useRestaurantDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.restaurant.detail(id),
    queryFn: () => restaurantApi.getRestaurantDetail(id),
    enabled: !!id,
    staleTime: 60_000,
  });
}
