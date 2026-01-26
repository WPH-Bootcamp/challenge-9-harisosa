"use client";

import { useMemo } from "react";
import { useCartGroupByRestaurant } from "./useCartGroupByRestaurant";

export function useCheckoutSummary(restaurantId?: number | null) {
  const {
    group,
    items,
    restaurant,
    isLoading,
    isError,
    restaurantId: rid,
  } = useCartGroupByRestaurant(restaurantId);

  const summary = useMemo(() => {
    let subtotal = 0;
    let totalItems = 0;

    for (const it of items) {
      const qty = it.quantity ?? 0;
      totalItems += qty;

      const price =
        (it.menu?.price as number | undefined) ??
        (it.price as number | undefined) ??
        0;

      subtotal += price * qty;
    }

    const deliveryFeeRaw = subtotal * 0.1;
    const deliveryFee = Math.floor(deliveryFeeRaw / 10_000) * 10_000;
    const serviceFee = subtotal * 0.05;
    const total = subtotal + deliveryFee + serviceFee;

    return {
      subtotal,
      deliveryFee,
      serviceFee,
      total,
      totalItems,
    };
  }, [items]);

  return {
    restaurantId: rid,
    group,
    restaurant,
    items,
    ...summary,
    isLoading,
    isError,
  };
}
