import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../api/cart";
import { queryKeys } from "./queryKey";

export function useUpdateCartQuantity() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (args: { cartItemId: number; quantity: number }) =>
      cartApi.updateQuantity(args.cartItemId, { quantity: args.quantity }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all() });
    },
  });
}

