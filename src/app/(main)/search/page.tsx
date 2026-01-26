"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { RestaurantFilter } from "@/features/search/RestaurantFilter";
import { MobileFilter } from "@/features/search/MobileFilter";
import { RestaurantGrid } from "@/features/search/RestaurantGrid";

import { searchFilterInitData, SearchFilters } from "@/types/filter";
import { RestaurantTab } from "@/types";

import { normalizeTab } from "@/lib/NormalizeTab";
import { toInt } from "@/lib/toInt";

import { useNearbyRestaurants } from "@/services/queries/useNearbyRestaurants";
import { useBestSellerRestaurants } from "@/services/queries/useBestSellerRestaurants";
import { useRestaurants } from "@/services/queries/useRestaurants";

export default function RestaurantSearchPage() {
  const sp = useSearchParams();

  const tab: RestaurantTab = useMemo(
    () => normalizeTab(sp.get("tab")),
    [sp]
  );

  const page = useMemo(() => toInt(sp.get("page"), 1), [sp]);
  const limit = useMemo(() => toInt(sp.get("limit"), 20), [sp]);

  const [filters, setFilters] = useState<SearchFilters>({
    ...searchFilterInitData,
    page,
    limit,
  });

  const nearbyQ = useNearbyRestaurants(page, limit,tab === "nearby",);

  const bestSellerQ = useBestSellerRestaurants(page,tab === "best-seller");

  const allQ = useRestaurants(
    {
      ...filters,
      page,
      limit,
    },
    {
      enabled: tab === "all",
    }
  );
  const { items, isLoading, isError } = useMemo(() => {
    switch (tab) {
      case "nearby":
        return {
          items: nearbyQ.data?.data.restaurants ?? [],
          isLoading: nearbyQ.isLoading,
          isError: nearbyQ.isError,
        };

      case "best-seller":
        return {
          items: bestSellerQ.data?.data.restaurants ?? [],
          isLoading: bestSellerQ.isLoading,
          isError: bestSellerQ.isError,
        };

      case "all":
      default:
        return {
          items: allQ.data?.data.restaurants ?? [],
          isLoading: allQ.isLoading,
          isError: allQ.isError,
        };
    }
  }, [
    tab,
    nearbyQ.data,
    nearbyQ.isLoading,
    nearbyQ.isError,
    bestSellerQ.data,
    bestSellerQ.isLoading,
    bestSellerQ.isError,
    allQ.data,
    allQ.isLoading,
    allQ.isError,
  ]);

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6 mt-22.5">
      <h1 className="text-2xl font-semibold mb-4">
        {tab === "nearby"
          ? "Nearby"
          : tab === "best-seller"
          ? "Best Seller"
          : "All Restaurant"}
      </h1>

      <div className="lg:hidden mb-4">
        <MobileFilter value={filters} onChange={setFilters} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-24">
            <RestaurantFilter value={filters} onChange={setFilters} />
          </div>
        </aside>

        <main className="lg:col-span-8">
          {isLoading ? (
            <div className="p-6">Loading...</div>
          ) : isError ? (
            <div className="p-6">Gagal load data.</div>
          ) : (
            <RestaurantGrid items={items} />
          )}
        </main>
      </div>
    </div>
  );
}
