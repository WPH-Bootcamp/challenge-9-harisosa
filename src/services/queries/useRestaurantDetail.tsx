// src/features/restaurants/hooks/useRestaurantDetail.ts
import { useQuery } from "@tanstack/react-query";
import { getRestaurantDetail } from "../api/resto";
import { queryKeys } from "./queryKey";

export function useRestaurantDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.restaurant.detail(id),
    queryFn: () => getRestaurantDetail(id),
    enabled: !!id,
    staleTime: 60_000,
  });
}
