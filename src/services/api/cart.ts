import { api } from "@/services/api/axios";
import type { AddCartResponse, AddToCartBody, UpdateCartQtyBody, ApiResponse,GetCartRawResponse } from "@/types";

export const cartApi = {
  getCart: async (signal?: AbortSignal) : Promise<GetCartRawResponse> => {
    const res = await api.get<ApiResponse<GetCartRawResponse>>("/cart", { signal });
    return res.data.data;
  },

  addToCart: async (body: AddToCartBody) => {
    const res = await api.post<ApiResponse<AddCartResponse>>("/cart", body);
    return res.data;
  },

  updateQuantity: async (cartItemId: number, body: UpdateCartQtyBody) => {
    const res = await api.put(`/cart/${cartItemId}`, body);
    return res.data;
  },

  deleteItem: async (cartItemId: number) => {
    const res = await api.delete(`/cart/${cartItemId}`);
    return res.data;
  },
};
