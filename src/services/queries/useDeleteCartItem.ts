import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../api/cart";
import { queryKeys } from "./queryKey";

export function useDeleteCartItem() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: number) => cartApi.deleteItem(cartItemId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.detail() });
    },
  });
}
