import type { RootState } from "../../store";

export const selectCartSlice = (s: RootState) => s.cart;

export const selectCurrentRestaurantId = (s: RootState) =>
  s.cart.currentRestaurantId;

export const selectCartData = (s: RootState) => s.cart.data;

export const selectCartGroups = (s: RootState) => s.cart.data?.cart ?? [];

export const selectCartSummary = (s: RootState) => s.cart.data?.summary;

export const selectCartTotalItems = (s: RootState) =>
  s.cart.data?.summary.totalItems ?? 0;

export const selectCartGroupByRestaurantId =
  (restaurantId: number | null) => (s: RootState) => {
    if (restaurantId == null) return null;
    return (s.cart.data?.cart ?? []).find((g) => g.restaurant.id === restaurantId) ?? null;
  };

export const selectMenuQtyByRestaurant =
  (restaurantId: number | null, menuId: number) => (s: RootState) => {
    
    if (restaurantId == null) return 0;
    const group = (s.cart.data?.cart ?? []).find((g) => g.restaurant.id === restaurantId);
    const item = group?.items?.find((it) => it.menu.id === menuId);
    return item?.quantity ?? 0;
  };

export const selectMenuQtyAnyRestaurant =
  (menuId: number) => (s: RootState) => {
    for (const g of s.cart.data?.cart ?? []) {
      const item = g.items.find((it) => it.menuId === menuId);
      if (item) return item.quantity ?? 0;
    }
    return 0;
  };
