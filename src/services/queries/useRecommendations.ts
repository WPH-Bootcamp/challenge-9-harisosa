import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { getRecommendations } from "../api/resto";

export function useRecommendations() {
  return useQuery({
    queryKey: queryKeys.recommended(),
    queryFn: getRecommendations,
    staleTime: 1000 * 60 * 5, // 5 menit
  });
}
