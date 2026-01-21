export const queryKeys = {
  // root
  all: ["restaurant"] as const,

  // recommended
  recommended: () => [...queryKeys.all, "recommended"] as const,

  // contoh untuk nanti (biar kebayang polanya)
  menu: {
    all: () => [...queryKeys.all, "menu"] as const,
    list: (params: { q?: string; category?: string; sort?: string }) =>
      [...queryKeys.menu.all(), "list", params] as const,
    detail: (id: number | string) =>
      [...queryKeys.menu.all(), "detail", id] as const,
  },

  restaurant: {
    detail: (id: number | string) =>
      [...queryKeys.all, "detail", id] as const,
  },

  orders: {
    all: () => [...queryKeys.all, "orders"] as const,
    history: (userId: string) =>
      [...queryKeys.orders.all(), "history", userId] as const,
  },
} as const;
