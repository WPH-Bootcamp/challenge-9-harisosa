import { useQuery } from "@tanstack/react-query";
import { MyOrdersParams } from "@/types/order";
import { orderApi } from "../api";
import { queryKeys } from "./queryKey";

export function useMyOrders(params: MyOrdersParams) {
  return useQuery({
    queryKey: queryKeys.orders.myOrder(params),
    queryFn: ({ signal }) => orderApi.orders(params, signal),
    staleTime: 10_000,
  });
}
