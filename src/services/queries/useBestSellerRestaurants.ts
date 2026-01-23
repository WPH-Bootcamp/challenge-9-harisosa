"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { getBestSeller } from "../api/resto";

export function useBestSellerRestaurants(
  page: number = 1,
  enabled: boolean,
  limit: number = 20
) {
  return useQuery({
    queryKey: queryKeys.collections.bestSeller(page, limit),
    queryFn: () => getBestSeller(page, limit),
    enabled,
    staleTime: 1000 * 60 * 2,
  });
}
