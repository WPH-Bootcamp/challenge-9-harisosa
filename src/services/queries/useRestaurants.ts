// src/services/queries/useRestaurants.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { SearchFilters } from "@/types/filter";
import { queryKeys } from "./queryKey";
import { getRestaurants } from "../api/resto";

export function useRestaurants(
  filters: SearchFilters,
  opts?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: queryKeys.restaurant.list(filters),
    queryFn: () => getRestaurants(filters),
    enabled: opts?.enabled ?? true,
    staleTime: 1000 * 60 * 2,
  });
}
