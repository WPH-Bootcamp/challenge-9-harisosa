"use client";

import { RestaurantHeader } from "@/features/restaurant/RestaurantHeader";
import { RestaurantHeroGallery } from "@/features/restaurant/RestaurantHero";
import { RestaurantTabs } from "@/features/restaurant/RestaurantTab";
import { ReviewSection } from "@/features/restaurant/ReviewSection";
import { useRestaurantDetail } from "@/services/queries/useRestaurantDetail";
import { Separator } from "@/ui/separator";
import { useParams } from "next/navigation";

export default function RestaurantDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data, isLoading, isError } = useRestaurantDetail(id);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError || !data) return <div className="p-6">Gagal load restaurant detail.</div>;

  return (
    <div className="lg:px-30 pt-22.5">
      <RestaurantHeroGallery images={data.images} name={data.name} />
      <RestaurantHeader
        logo={data.logo}
        name={data.name}
        rating={data.averageRating ?? data.star}
        place={data.place}
        distanceKm={data.distance}
        onShare={() => {
          navigator.share?.({
            title: data.name,
            url: window.location.href,
          });
        }}
      />
      <Separator />
      <RestaurantTabs restaurant={data} />
      <Separator />
      <ReviewSection
        averageRating={data.averageRating}
        totalReviews={data.totalReviews}
        reviews={data.reviews}
      />
    </div>
  );
}
