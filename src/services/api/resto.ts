import { ApiResponse } from "@/types/api";
import { api } from "./axios";
import { Recommendation } from "@/types/recommendation";
import { RestaurantDetail } from "@/types";

export async function getRecommendations() {
  const res = await api.get<ApiResponse<Recommendation>>("/resto/recommended");
  return res.data;
}


export async function getRestaurantDetail(id: string, menu: number = 50, review: number = 50): Promise<RestaurantDetail> {
  const { data } = await api.get<ApiResponse<RestaurantDetail>>(`/resto/${id}?limitMenu=${menu}&limitReview=${review}`);
  if (!data.success) throw new Error("API returned success=false");
  return data.data;
}
