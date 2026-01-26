import { CheckoutPayload, CheckoutResponse } from "@/types/checkout";
import { api } from "./axios";
import { MyOrdersParams, MyOrdersResponse } from "@/types/order";


export const orderApi = {
    checkout: async (payload: CheckoutPayload) => {
      const res = await api.post<CheckoutResponse>("/order/checkout", payload);
      return res.data;
    },
    orders: async (payload : MyOrdersParams, signal?: AbortSignal) => {
       const res = await api.get<MyOrdersResponse>("/order/my-order", {
        params: payload,
        signal
      });
      return res.data;
    }
}

