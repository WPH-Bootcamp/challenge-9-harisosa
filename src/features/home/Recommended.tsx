"use client";

import { useRecommendations } from "@/services/queries/useRecommendations";
import { RestaurantCard } from "../../components/RestaurantCard";
import { Skeleton } from "@/ui/skeleton";


export const Recommended : React.FC = () => {
  const { data, isLoading, isError } = useRecommendations();

  const recommendations = data?.data?.data?.recommendations ?? [];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">Recommended</h2>
        <button className="text-sm font-semibold text-red-500 hover:underline">
          See All
        </button>
      </div>
 
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border p-4 space-y-3"
            >
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}

        {!isLoading &&
          !isError &&
          recommendations.map((item) => (
            <RestaurantCard key={item.id} data={item}/>
          ))}
      </div>

      {!isLoading && !isError && recommendations.length > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="
              h-10 rounded-full bg-white px-10
              text-sm font-medium text-black/70
              border border-black/10
              shadow-sm
              hover:bg-black/2
              transition
            "
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}
