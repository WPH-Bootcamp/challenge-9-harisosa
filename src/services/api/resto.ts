import { ApiResponse } from "@/types/api";
import { api } from "./axios";
import { RestaurantCollection } from "@/types/restaurantCollection";
import { RestaurantDetail, SearchFilters } from "@/types";

export async function getRecommendations() {
  const res = await api.get<ApiResponse<RestaurantCollection>>("/resto/recommended");
  return res.data;
}

export async function getNearBy(page : number = 1, limit: number = 20) {
  const res = await api.get<ApiResponse<RestaurantCollection>>(`/resto/nearby?range=${page}&limit=${limit}`);
  return res.data;
}

export async function getBestSeller(page : number = 1, limit: number = 20) {
  const res = await api.get<ApiResponse<RestaurantCollection>>(`/resto/best-seller?page=${page}&limit=${limit}`);
  return res.data;
}

export async function getRestaurantDetail(id: string, menu: number = 50, review: number = 50): Promise<RestaurantDetail> {
  const { data } = await api.get<ApiResponse<RestaurantDetail>>(`/resto/${id}?limitMenu=${menu}&limitReview=${review}`);
  if (!data.success) throw new Error("API returned success=false");
  return data.data;
}


export async function getRestaurants(filters: SearchFilters) {
  const params = {
    location: 0,
    range: filters.distance === "nearby" ? 20 : Number(filters.distance ?? 20),
    priceMin: filters.minPrice ?? 0,
    priceMax: filters.maxPrice ?? 10000,
    rating: filters.ratings?.[0] ?? 0,
    category: filters.category,
    page: filters.page ?? 1,
    limit: filters.limit ?? 20,
  };

  const res = await api.get<ApiResponse<RestaurantCollection>>("/resto", {
    params,
  });

  return res.data;
}
