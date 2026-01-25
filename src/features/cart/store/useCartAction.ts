"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { useCart } from "@/services/queries/useCart";
import {
  useAddToCart,
  useUpdateCartQuantity,
  useDeleteCartItem,
} from "@/services/queries";

type AddArgs = { menuId: number };
type ChangeArgs = { menuId: number; currentQty: number, restaurantId? : number };

export function useCartActions() {
  const currentRestaurantId = useSelector(
    (s: RootState) => s.cart.currentRestaurantId
  );

  const { data } = useCart();
  const addMut = useAddToCart();
  const updMut = useUpdateCartQuantity();
  const delMut = useDeleteCartItem();

  const getCartItemId = (menuId: number): number | null => {
    const groups = data?.cart ?? [];

    if (currentRestaurantId != null) {
      const group = groups.find((g) => g.restaurant.id === currentRestaurantId);
      const found = group?.items?.find((it) => it.menu.id === menuId);
      if (found?.id != null) return found.id;
    }

    for (const g of groups) {
      const found = g.items?.find((it) => it.menu.id === menuId);
      if (found?.id != null) return found.id;
    }

    return null;
  };

  const add = ({ menuId }: AddArgs) => {
    if (currentRestaurantId == null) return;
    addMut.mutate({ restaurantId: currentRestaurantId, menuId, quantity: 1 });
  };

  const increase = ({ menuId, currentQty, restaurantId }: ChangeArgs) => {
    const selectedRestaurant = restaurantId ?? currentRestaurantId;
    if (!selectedRestaurant) return;

    const cartItemId = getCartItemId(menuId);
    if (cartItemId == null) {
      addMut.mutate({ restaurantId: selectedRestaurant, menuId, quantity: 1 });
      return;
    }

    updMut.mutate({ cartItemId, quantity: currentQty + 1 });
  };

  const decrease = ({ menuId, currentQty, restaurantId }: ChangeArgs) => {
    const selectedRestaurant = restaurantId ?? currentRestaurantId;
    if (!selectedRestaurant) return;

    const cartItemId = getCartItemId(menuId);
    if (cartItemId == null) return;

    const newQty = Math.max(0, currentQty - 1);

    if (newQty === 0) {
      delMut.mutate(cartItemId);
      return;
    }

    updMut.mutate({ cartItemId, quantity: newQty });
  };

  const remove = ({ menuId }: { menuId: number }) => {
    const cartItemId = getCartItemId(menuId);
    if (cartItemId == null) return;
    delMut.mutate(cartItemId);
  };

  return {
    add,
    increase,
    decrease,
    remove,
    isPending: addMut.isPending || updMut.isPending || delMut.isPending,
  };
}
