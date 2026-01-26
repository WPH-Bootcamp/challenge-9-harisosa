import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { queryKeys } from "./queryKey";
import { useQuery } from "@tanstack/react-query";
import { cartApi } from "../api";

export function useCart() {
  const isLoggedIn = useSelector((s: RootState) => Boolean(s.auth?.token));

  return useQuery({
    queryKey: queryKeys.cart.detail(),
    queryFn: ({ signal }) => cartApi.getCart(signal),
    enabled: isLoggedIn,
    staleTime: 10_000,
  });
}
