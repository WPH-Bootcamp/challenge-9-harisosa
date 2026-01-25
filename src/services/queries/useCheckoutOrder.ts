import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "../api";
import { CheckoutPayload } from "@/types/checkout";
import { queryKeys } from "./queryKey";


export function useCheckoutOrder() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CheckoutPayload) =>
      orderApi.checkout(payload),

    onSuccess: (res) => {
      const tx = res.data.transaction;

      qc.setQueryData(queryKeys.checkout.last(), tx);
      qc.setQueryData(
        queryKeys.checkout.transaction(tx.transactionId),
        tx
      );
      qc.invalidateQueries({
        queryKey: queryKeys.cart.all(),
      });
    },
  });
}
