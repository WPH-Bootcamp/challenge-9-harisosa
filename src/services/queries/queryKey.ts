export const queryKeys = {
  all: ["restaurant"] as const,

  collections: {
    all: () => [...queryKeys.all, "collections"] as const,
    recommended: (page: number, limit: number) =>
      [...queryKeys.collections.all(), "recommended", page, limit] as const,
    nearby: (page: number, limit: number) =>
      [...queryKeys.collections.all(), "nearby", page, limit] as const,
    bestSeller: (page: number, limit: number) =>
      [...queryKeys.collections.all(), "best-seller", page, limit] as const,
  },

  menu: {
    all: () => [...queryKeys.all, "menu"] as const,
    list: (params: { q?: string; category?: string; sort?: string }) =>
      [...queryKeys.menu.all(), "list", params] as const,
    detail: (id: number | string) =>
      [...queryKeys.menu.all(), "detail", id] as const,
  },

  restaurant: {
    list: (params: Record<string, unknown>) =>
      [...queryKeys.all, "list", params] as const,
    detail: (id: number | string) =>
      [...queryKeys.all, "detail", id] as const,
  },
  orders: {
    all: () => [...queryKeys.all, "orders"] as const,
    history: (userId: string) =>
      [...queryKeys.orders.all(), "history", userId] as const,


    myOrder: (params: {
      status: string;
      page: number;
      limit: number;
    }) =>
      [...queryKeys.orders.all(), "my-order", params] as const,
  },

  checkout: {
    all: () => [...queryKeys.all, "checkout"] as const,
    last: () => [...queryKeys.checkout.all(), "last-transaction"] as const,
    transaction: (transactionId: string) =>
      [...queryKeys.checkout.all(), "transaction", transactionId] as const,
  },
  cart: {
    all: () => [...queryKeys.all, "cart"] as const,

    // GET ALL cart (single source of truth)
    detail: () => [...queryKeys.cart.all(), "detail"] as const,

    // derived view (optional)
    byRestaurant: (restaurantId: number | string) =>
      [...queryKeys.cart.all(), "by-restaurant", restaurantId] as const,
  },

  auth: {
    all: () => [...queryKeys.all, "auth"] as const,
    profile: () => [...queryKeys.auth.all(), "profile"] as const,
  },
} as const;
