import { CheckoutPayload } from "@/types/checkout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "../api";
import { queryKeys } from "./queryKey";
import { GetCartRawResponse } from "@/types";

export function useCheckoutOrder() {
  const qc = useQueryClient();

return useMutation({
    mutationFn: (payload: CheckoutPayload) => orderApi.checkout(payload),

    onSuccess: (res, payload) => {
      const tx = res.data.transaction;

      qc.setQueryData(queryKeys.checkout.last(), tx);
      qc.setQueryData(queryKeys.checkout.transaction(tx.transactionId), tx);

      const restaurantIds = new Set(
        payload.restaurants.map((r) => String(r.restaurantId))
      );

      qc.setQueryData<GetCartRawResponse>(queryKeys.cart.detail(), (old) => {
        if (!old) return old;

        const nextItems = old.cart.filter(
          (it) => !restaurantIds.has(String(it.restaurant.id))
        );
        return {
          ...old,
          data: {
            ...old.cart,
            cart: nextItems,
          },
        };
      });
      qc.invalidateQueries({ queryKey: queryKeys.cart.detail() });
    },
  });
}