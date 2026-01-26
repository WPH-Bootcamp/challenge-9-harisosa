// src/types/filter.ts
export type DistanceFilter = "nearby" | "1" | "3" | "5";

export type SearchFilters = {
  distance?: DistanceFilter;
  minPrice?: number;
  maxPrice?: number;
  ratings: number[];
  category?: string;
  page?: number;
  limit?: number;
};


export const searchFilterInitData: SearchFilters = {
  distance: "nearby",
  minPrice: 0,
  maxPrice: 100000,
  ratings: [],
  category: "all",
  page: 1,
  limit: 20,
};
