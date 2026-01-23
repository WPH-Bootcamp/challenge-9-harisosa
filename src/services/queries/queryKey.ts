export const queryKeys = {
  // root
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
    detail: (id: number | string) => [...queryKeys.all, "detail", id] as const,
  },
  orders: {
    all: () => [...queryKeys.all, "orders"] as const,
    history: (userId: string) =>
      [...queryKeys.orders.all(), "history", userId] as const,
  },
} as const;
