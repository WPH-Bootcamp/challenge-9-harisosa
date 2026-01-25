import { CheckoutPayload, CheckoutResponse } from "@/types/checkout";
import { api } from "./axios";

export const orderApi = {
    checkout: async (payload: CheckoutPayload) => {
      const res = await api.post<CheckoutResponse>("/order/checkout", payload);
      return res.data;
    },
}

