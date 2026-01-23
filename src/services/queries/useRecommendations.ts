import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { getRecommendations } from "../api/resto";

export function useRecommendations(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: queryKeys.collections.recommended(page, limit),
    queryFn: getRecommendations,
    staleTime: 1000 * 60 * 5, // 5 menit
  });
}
