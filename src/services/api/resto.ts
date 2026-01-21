import { ApiResponse } from "@/types/api";
import { api } from "./axios";
import { Recommendation } from "@/types/recommendation";

export async function getRecommendations() {
  const res = await api.get<ApiResponse<Recommendation>>("/resto/recommended");
  return res.data;
}
