import { ApiResponse } from "@/types/api";
import { api } from "./axios";
import { RestaurantCollection,RecommendedCollection } from "@/types/restaurantCollection";
import { RestaurantDetail, SearchFilters } from "@/types";

export const restaurantApi = {
  getRecommendations: async () => {
    const res = await api.get<ApiResponse<RecommendedCollection>>(
      "/resto/recommended"
    );
    console.log(res.data)
    return res;
  },

  getNearBy: async (page: number = 1, limit: number = 20) => {
    const res = await api.get<ApiResponse<RestaurantCollection>>(
      `/resto/nearby?range=${page}&limit=${limit}`
    );
    return res.data;
  },

  getBestSeller: async (page: number = 1, limit: number = 20) => {
    const res = await api.get<ApiResponse<RestaurantCollection>>(
      `/resto/best-seller?page=${page}&limit=${limit}`
    );
    return res.data;
  },

  getRestaurantDetail: async (
    id: string,
    menu: number = 50,
    review: number = 50
  ): Promise<RestaurantDetail> => {
    const { data } = await api.get<ApiResponse<RestaurantDetail>>(
      `/resto/${id}?limitMenu=${menu}&limitReview=${review}`
    );

    if (!data.success) throw new Error("API returned success=false");

    return data.data;
  },

  getRestaurants: async (filters: SearchFilters) => {
    const params = {
      location: 0,
      range:
        filters.distance === "nearby"
          ? 20
          : Number(filters.distance ?? 20),
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
  },
};
