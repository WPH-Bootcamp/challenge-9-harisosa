import { RestaurantTab } from "@/types/restaurantTab";

export function normalizeTab(v: string | null): RestaurantTab {
  switch (v) {
    case "nearby":
    case "best-seller":
    case "discount":
    case "delivery":
    case "lunch":
      return v;
    default:
      return "all";
  }
}
