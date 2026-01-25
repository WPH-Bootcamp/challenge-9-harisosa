import { AddToCartBody } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../api";
import { queryKeys } from "./queryKey";


export function useAddToCart() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: AddToCartBody) => cartApi.addToCart(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all()});
    },
  });
}

