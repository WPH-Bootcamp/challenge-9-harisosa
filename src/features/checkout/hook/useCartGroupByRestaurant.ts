"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { useCart } from "@/services/queries/useCart";

export function useCartGroupByRestaurant(restaurantId?: number | null) {
  const currentRestaurantId = useSelector(
    (s: RootState) => s.cart.currentRestaurantId
  );

  const { data, isLoading, isError } = useCart();

  const rid = restaurantId ?? currentRestaurantId;

  const group = useMemo(() => {
    const groups = data?.cart ?? [];
    if (!rid) return null;
    return groups.find((g) => g.restaurant.id === rid) ?? null;
  }, [data?.cart, rid]);

  return {
    restaurantId: rid ?? null,
    group,
    items: group?.items ?? [],
    restaurant: group?.restaurant ?? null,
    isLoading,
    isError,
  };
}
